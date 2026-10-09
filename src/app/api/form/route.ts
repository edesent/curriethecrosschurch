import { createHmac, randomBytes, timingSafeEqual } from "crypto";
import { NextResponse } from "next/server";
import { church } from "@/lib/site";

/**
 * One endpoint for every form on the site: van rides, the Turkey Giveaway &
 * Coat Drive (sign up / donate a coat / serve), plan-a-visit, prayer, contact.
 *
 * Messages go to FORM_WEBHOOK_URL — a Slack (or Teams) incoming webhook — so
 * they reach the church's phone in seconds. Until that is set the endpoint
 * answers 503 and the form honestly tells people to call the church.
 *
 * Spam defences: a signed load-time token (GET) that must be at least 3
 * seconds old, a honeypot field, a per-IP rate limit, and a rule that
 * free-text answers may not contain links. Anything that trips a defence gets
 * a fake success and is dropped. Email addresses are allowed in contact fields.
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const SECRET = process.env.FORM_SECRET || process.env.FORM_WEBHOOK_URL || "";
const MIN_FILL_MS = 3000;
const MAX_AGE_MS = 1000 * 60 * 60 * 6;

function sign(ts: string) {
  return createHmac("sha256", SECRET).update(ts).digest("hex");
}

function tokenOk(token: unknown) {
  if (!SECRET) return true; // nothing to sign with yet; the webhook is unset too
  if (typeof token !== "string") return false;
  const [ts, sig] = token.split(".");
  if (!ts || !sig) return false;
  const expected = Buffer.from(sign(ts));
  const given = Buffer.from(sig);
  if (expected.length !== given.length || !timingSafeEqual(expected, given)) return false;
  const age = Date.now() - Number(ts);
  return age >= MIN_FILL_MS && age <= MAX_AGE_MS;
}

export async function GET() {
  const ts = String(Date.now());
  return NextResponse.json(
    { token: SECRET ? `${ts}.${sign(ts)}` : `${ts}.${randomBytes(8).toString("hex")}` },
    { headers: { "Cache-Control": "no-store" } },
  );
}

// Best-effort, per serverless instance.
const hits = new Map<string, number[]>();
function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < 10 * 60 * 1000);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > 6;
}

const clean = (v: unknown, max = 2000) =>
  typeof v === "string" ? v.replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/g, "").trim().slice(0, max) : "";
const on = (v: unknown) => v === true || v === "on" || v === "Yes";
const hasLink = (s: string) => /(https?:\/\/|www\.|\.(com|net|ru|xyz|top)\b)/i.test(s);
// A "phone or email" answer: an email address is fine, a URL is not.
const badContact = (s: string) => /(https?:\/\/|www\.)/i.test(s) || (/\.(com|net|ru|xyz|top)\b/i.test(s) && !s.includes("@"));
const fake = () => NextResponse.json({ ok: true });

type Body = Record<string, unknown>;
type Built = { text: string } | { error: string } | { spam: true };

function base(b: Body, need: { contact?: boolean; fullName?: boolean } = {}) {
  const name = clean(b.name, 80);
  const contact = clean(b.contact, 120);
  if (!name) return { error: "Please give your name." } as const;
  if (need.fullName && name.split(/\s+/).filter(Boolean).length < 2) return { error: "Please give your first and last name." } as const;
  if (need.contact && !contact) return { error: "Leave a phone number or email so we can reach you." } as const;
  if (hasLink(name) || badContact(contact)) return { spam: true } as const;
  return { name, contact } as const;
}

const quote = (s: string) => s && `>${s.replace(/\n/g, "\n>")}`;
const join = (lines: (string | false | undefined)[]) => lines.filter(Boolean).join("\n");

const builders: Record<string, (b: Body) => Built> = {
  ride(b) {
    const who = base(b, { contact: true, fullName: true });
    if (!("name" in who)) return who;
    const pickup = clean(b.pickup, 200);
    const service = clean(b.service, 60);
    const seats = clean(b.seats, 3);
    const note = clean(b.note, 1000);
    if (!pickup) return { error: "Where should the van pick you up? A street address or cross streets is fine." };
    if (!/^[1-9]\+?$/.test(seats)) return { error: "How many seats do you need?" };
    if ([pickup, note].some(hasLink)) return { spam: true };
    return {
      text: join([
        `*🚐 Save me a seat — ${church.short} website*`,
        `*${who.name}* · ${seats} seat${seats === "1" ? "" : "s"}${service ? ` · for ${service}` : ""}`,
        `*Pickup:* ${pickup}`,
        `*Contact:* ${who.contact}`,
        on(b.mobility) && "♿ *Needs help getting in (walker / wheelchair / step)*",
        on(b.kids) && "🧒 *Bringing children*",
        quote(note),
      ]),
    };
  },
  turkey(b) {
    const who = base(b, { contact: true, fullName: true });
    if (!("name" in who)) return who;
    const household = clean(b.household, 3);
    const coats = clean(b.coats, 300);
    const note = clean(b.note, 800);
    if (!/^([1-9]|1[0-2])\+?$/.test(household)) return { error: "How many people are in your household?" };
    if ([coats, note].some(hasLink)) return { spam: true };
    return {
      text: join([
        `*🦃 Turkey Giveaway sign-up — ${church.short} website*`,
        `*${who.name}* · household of ${household}`,
        `*Contact:* ${who.contact}`,
        coats && `🧥 *Coats needed:* ${coats}`,
        on(b.ride) && "🚐 *Needs a ride to the church*",
        quote(note),
      ]),
    };
  },
  coat(b) {
    const who = base(b, { contact: true });
    if (!("name" in who)) return who;
    const what = clean(b.what, 300);
    const how = clean(b.how, 60);
    if (!what) return { error: "Tell us roughly what you’re bringing." };
    if (hasLink(what)) return { spam: true };
    return {
      text: join([`*🧥 Coat donation — ${church.short} website*`, `*${who.name}*`, `*Contact:* ${who.contact}`, `*Bringing:* ${what}`, how && `*How:* ${how}`]),
    };
  },
  serve(b) {
    const who = base(b, { contact: true });
    if (!("name" in who)) return who;
    const role = clean(b.role, 80);
    const note = clean(b.note, 600);
    if (hasLink(note)) return { spam: true };
    return {
      text: join([`*🙌 Wants to serve — ${church.short} website*`, `*${who.name}*`, `*Contact:* ${who.contact}`, role && `*Where:* ${role}`, quote(note)]),
    };
  },
  visit(b) {
    const who = base(b, { fullName: true });
    if (!("name" in who)) return who;
    const day = clean(b.day, 10);
    const party = clean(b.party, 3);
    const note = clean(b.note, 1000);
    if (!/^\d{4}-\d{2}-\d{2}$/.test(day)) return { error: "Please pick a day." };
    if (!/^[1-8]\+?$/.test(party)) return { error: "Please say how many are coming." };
    if (hasLink(note)) return { spam: true };
    const when = new Date(`${day}T12:00:00Z`).toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", timeZone: "UTC" });
    return {
      text: join([
        `*👋 Planning a visit — ${church.short} website*`,
        `*${who.name}* is coming *${when}* (party of ${party})`,
        who.contact && `*Contact:* ${who.contact}`,
        on(b.ride) && "🚐 *Would like a ride*",
        quote(note),
      ]),
    };
  },
  prayer(b) {
    const request = clean(b.request, 3000);
    const name = clean(b.name, 80);
    const contact = clean(b.contact, 120);
    if (!request) return { error: "Please tell us what we can pray about." };
    if ([request, name].some(hasLink) || badContact(contact)) return { spam: true };
    if (on(b.wantsCall) && !contact) return { error: "Leave a phone number or email so we can reach you." };
    return {
      text: join([
        `*🙏 Prayer request — ${church.short} website*`,
        on(b.confidential) && "_Apostle & First Lady only — please keep confidential_",
        quote(request),
        name && `*Name:* ${name}`,
        contact && `*Contact:* ${contact}`,
        on(b.wantsCall) && "📞 *Would like someone to call*",
      ]),
    };
  },
  contact(b) {
    const who = base(b, { contact: true, fullName: true });
    if (!("name" in who)) return who;
    const message = clean(b.message, 4000);
    const topic = clean(b.topic, 60);
    if (!message) return { error: "Please write a message." };
    if ([message, topic].some(hasLink)) return { spam: true };
    return { text: join([`*✉️ New message — ${church.short} website*`, `*${who.name}*`, `*Contact:* ${who.contact}`, topic && `*About:* ${topic}`, "", message]) };
  },
};

export async function POST(request: Request) {
  const raw = await request.text();
  if (raw.length > 12_000) return NextResponse.json({ error: "Too long." }, { status: 413 });

  let body: Body;
  try {
    body = JSON.parse(raw);
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  if (body.website || body.company) return fake();
  if (!tokenOk(body.token)) return fake();

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (rateLimited(`${body.kind}:${ip}`)) return fake();

  const build = typeof body.kind === "string" ? builders[body.kind] : undefined;
  if (!build) return NextResponse.json({ error: "Unknown form." }, { status: 400 });
  const built = build(body);
  if ("spam" in built) return fake();
  if ("error" in built) return NextResponse.json({ error: built.error }, { status: 400 });

  const webhook = process.env.FORM_WEBHOOK_URL;
  if (!webhook) {
    return NextResponse.json(
      { error: "Our online form isn’t connected yet. Please call the church — we’d love to hear from you." },
      { status: 503 },
    );
  }

  try {
    const res = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: built.text }),
    });
    if (!res.ok) throw new Error(String(res.status));
  } catch {
    return NextResponse.json({ error: "We couldn’t send that just now. Please call the church instead." }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}
