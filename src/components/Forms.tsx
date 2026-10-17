"use client";

import { useMemo, useState } from "react";
import Phone from "./Phone";
import { useForm, type FormKind } from "./useFormToken";
import { TZ } from "@/lib/site";

function Shell({
  kind,
  done,
  button,
  children,
  dark = false,
}: {
  kind: FormKind;
  done: React.ReactNode;
  button: string;
  children: React.ReactNode;
  dark?: boolean;
}) {
  const { submit, status, error } = useForm(kind);
  if (status === "sent")
    return (
      <div className={`rounded-2xl p-7 ${dark ? "bg-white/[0.06] text-white" : "bg-white"}`}>
        <p className="display text-4xl">Got it. Thank you.</p>
        <p className={`mt-3 ${dark ? "text-white/75" : "text-muted"}`}>{done}</p>
      </div>
    );
  return (
    <form
      className="space-y-4"
      onSubmit={(e) => {
        e.preventDefault();
        const fd = new FormData(e.currentTarget);
        const o: Record<string, unknown> = {};
        fd.forEach((v, k) => (o[k] = v));
        submit(o);
      }}
    >
      {/* Honeypot: people never see this. */}
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
      {children}
      {error && (
        <p role="alert" className="rounded-xl bg-red/10 px-4 py-3 text-sm font-semibold text-red">
          {error} <Phone className="underline" fallback="" />
        </p>
      )}
      <button className="btn btn-red" disabled={status === "sending"}>
        {status === "sending" ? "Sending…" : button}
      </button>
    </form>
  );
}

function F({
  label,
  name,
  type = "text",
  required,
  placeholder,
  hint,
  dark,
  autoComplete,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
  hint?: string;
  dark?: boolean;
  autoComplete?: string;
}) {
  return (
    <label className="block">
      <span className="label">
        {label}
        {!required && <span className={`font-normal ${dark ? "text-white/50" : "text-muted"}`}> (optional)</span>}
      </span>
      <input className="field" name={name} type={type} required={required} placeholder={placeholder} autoComplete={autoComplete} />
      {hint && <span className={`mt-1 block text-xs ${dark ? "text-white/55" : "text-muted"}`}>{hint}</span>}
    </label>
  );
}

function T({ label, name, required, rows = 3, placeholder, dark }: { label: string; name: string; required?: boolean; rows?: number; placeholder?: string; dark?: boolean }) {
  return (
    <label className="block">
      <span className="label">
        {label}
        {!required && <span className={`font-normal ${dark ? "text-white/50" : "text-muted"}`}> (optional)</span>}
      </span>
      <textarea className="field" name={name} rows={rows} required={required} placeholder={placeholder} />
    </label>
  );
}

function Check({ name, children }: { name: string; children: React.ReactNode }) {
  return (
    <label className="flex items-start gap-3 text-[0.95rem]">
      <input type="checkbox" name={name} className="mt-1 h-4 w-4 accent-[var(--red)]" />
      <span>{children}</span>
    </label>
  );
}

/** Big tappable number buttons, for people filling this in on a phone. */
function Count({ name, label, max = 8, dark }: { name: string; label: string; max?: number; dark?: boolean }) {
  const [v, setV] = useState("1");
  const opts = [...Array(max).keys()].map((i) => String(i + 1)).concat(`${max}+`);
  return (
    <fieldset>
      <legend className="label">{label}</legend>
      <input type="hidden" name={name} value={v} />
      <div className="flex flex-wrap gap-2">
        {opts.map((o) => (
          <button
            type="button"
            key={o}
            onClick={() => setV(o)}
            aria-pressed={v === o}
            className={`h-11 min-w-11 rounded-lg px-3 text-base font-bold transition-colors ${
              v === o ? "bg-red text-white" : dark ? "bg-white/10 text-white hover:bg-white/20" : "bg-paper-2 text-text hover:bg-line"
            }`}
          >
            {o}
          </button>
        ))}
      </div>
    </fieldset>
  );
}

export function RideForm({ dark = false }: { dark?: boolean }) {
  return (
    <Shell
      kind="ride"
      dark={dark}
      button="Save me a seat"
      done="Your name is on the van list. Someone from Currie The Cross Church will call you to set up the pickup."
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <F label="Your name" name="name" required dark={dark} autoComplete="name" />
        <F label="Phone (best for a driver)" name="contact" type="tel" required dark={dark} autoComplete="tel" />
      </div>
      <F label="Where should we pick you up?" name="pickup" required dark={dark} placeholder="Street address, or cross streets like “Cook & Sarah”" />
      <label className="block">
        <span className="label">For which service?</span>
        <select name="service" className="field">
          <option>Sunday Worship, 11:00 AM</option>
          <option>Thursday Night Service, 6:00 PM</option>
          <option>Turkey Giveaway & Coat Drive, Nov 21</option>
          <option>Every Sunday</option>
        </select>
      </label>
      <Count name="seats" label="How many seats?" max={6} dark={dark} />
      <div className="space-y-2">
        <Check name="mobility">Someone needs help getting in (walker, wheelchair, or a high step)</Check>
        <Check name="kids">Children are riding with me</Check>
      </div>
      <T label="Anything the driver should know?" name="note" dark={dark} />
    </Shell>
  );
}

export function TurkeyForm() {
  return (
    <Shell
      kind="turkey"
      button="Sign my family up"
      done="You’re on the list for November 21. We’ll call or text a few days before to confirm your pickup time."
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <F label="Your name" name="name" required autoComplete="name" />
        <F label="Phone or email" name="contact" required autoComplete="tel" />
      </div>
      <Count name="household" label="How many people in your household?" max={10} />
      <F label="Coats needed (sizes)" name="coats" placeholder="e.g. Women’s L, Boys 10–12, Men’s XL" hint="Leave blank if you only need a turkey." />
      <Check name="ride">I’ll need a ride to the church</Check>
      <T label="Anything else?" name="note" rows={2} />
    </Shell>
  );
}

export function CoatForm() {
  return (
    <Shell kind="coat" button="I’m bringing coats" done="Thank you! Someone will reach out about the drop-off. Every coat is a warm winter for someone on Page Blvd.">
      <div className="grid gap-4 sm:grid-cols-2">
        <F label="Your name" name="name" required autoComplete="name" />
        <F label="Phone or email" name="contact" required />
      </div>
      <F label="What are you bringing?" name="what" required placeholder="e.g. 4 adult coats, 2 kids’ jackets, a box of gloves" />
      <label className="block">
        <span className="label">How will it get to us?</span>
        <select name="how" className="field">
          <option>I’ll drop it at the church</option>
          <option>Please pick it up</option>
          <option>I’ll bring it on November 21</option>
        </select>
      </label>
    </Shell>
  );
}

export function ServeForm({ roles }: { roles: string[] }) {
  return (
    <Shell kind="serve" button="Count me in" done="Thank you for serving. We’ll be in touch with the plan for the day.">
      <div className="grid gap-4 sm:grid-cols-2">
        <F label="Your name" name="name" required autoComplete="name" />
        <F label="Phone or email" name="contact" required />
      </div>
      <label className="block">
        <span className="label">Where can you help?</span>
        <select name="role" className="field">
          {roles.map((r) => (
            <option key={r}>{r}</option>
          ))}
        </select>
      </label>
      <T label="Anything else?" name="note" rows={2} />
    </Shell>
  );
}

function nextDays(n: number) {
  const out: { iso: string; label: string }[] = [];
  const now = new Date();
  for (let i = 0; out.length < n && i < 60; i++) {
    const d = new Date(now.getTime() + i * 86400000);
    const wd = d.toLocaleDateString("en-US", { weekday: "long", timeZone: TZ });
    if (wd !== "Sunday" && wd !== "Thursday") continue;
    const iso = new Intl.DateTimeFormat("en-CA", { timeZone: TZ }).format(d);
    out.push({ iso, label: d.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric", timeZone: TZ }) + (wd === "Sunday" ? " · 11:00 AM" : " · 6 PM") });
  }
  return out;
}

export function VisitForm() {
  const days = useMemo(() => nextDays(6), []);
  const [day, setDay] = useState("");
  return (
    <Shell kind="visit" button="Let them know I’m coming" done="We can’t wait to meet you. Look for a greeter at the front doors on Page Blvd.">
      <div className="grid gap-4 sm:grid-cols-2">
        <F label="Your name" name="name" required autoComplete="name" />
        <F label="Phone or email" name="contact" hint="So we can say hello first." />
      </div>
      <fieldset>
        <legend className="label">Which day?</legend>
        <input type="hidden" name="day" value={day} />
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          {days.map((d) => (
            <button
              type="button"
              key={d.iso}
              onClick={() => setDay(d.iso)}
              aria-pressed={day === d.iso}
              suppressHydrationWarning
              className={`rounded-lg px-3 py-3 text-left text-sm font-bold transition-colors ${day === d.iso ? "bg-royal text-white" : "bg-paper-2 hover:bg-line"}`}
            >
              {d.label}
            </button>
          ))}
        </div>
      </fieldset>
      <Count name="party" label="How many of you?" />
      <Check name="ride">We’d like a ride</Check>
      <T label="Anything we should know?" name="note" rows={2} />
    </Shell>
  );
}

export function PrayerForm() {
  return (
    <Shell kind="prayer" button="Send my prayer request" done="We are praying with you. If you asked for a call, expect one soon.">
      <T label="What can we pray about?" name="request" required rows={5} />
      <div className="grid gap-4 sm:grid-cols-2">
        <F label="Your name" name="name" />
        <F label="Phone or email" name="contact" />
      </div>
      <div className="space-y-2">
        <Check name="confidential">Keep this between me and the Apostle & First Lady</Check>
        <Check name="wantsCall">I’d like someone to call me</Check>
      </div>
    </Shell>
  );
}

export function ContactForm() {
  return (
    <Shell kind="contact" button="Send message" done="Thanks for reaching out. We’ll get back to you soon.">
      <div className="grid gap-4 sm:grid-cols-2">
        <F label="Your name" name="name" required autoComplete="name" />
        <F label="Phone or email" name="contact" required />
      </div>
      <label className="block">
        <span className="label">About</span>
        <select name="topic" className="field">
          <option>A question</option>
          <option>Joining the church</option>
          <option>The van / a ride</option>
          <option>Turkey Giveaway & Coat Drive</option>
          <option>Elevated Minds Christian School</option>
          <option>Counseling</option>
          <option>Something else</option>
        </select>
      </label>
      <T label="Message" name="message" required rows={5} />
    </Shell>
  );
}
