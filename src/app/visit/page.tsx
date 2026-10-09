import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Fill } from "@/components/Fill";
import { VisitForm } from "@/components/Forms";
import PageHead from "@/components/PageHead";
import Phone from "@/components/Phone";
import { church, weekly } from "@/lib/site";

export const metadata: Metadata = {
  title: "Plan a Visit",
  description: "Visit Currie The Cross Church at 4301 Page Blvd. (Page & Pendleton), St. Louis. Sunday Worship 11:30 AM, Thursday Night Service 6 PM. Come as you are.",
};

/** Fill in once the church tells us. */
const parking = "";

export default function VisitPage() {
  return (
    <>
      <PageHead
        eyebrow="Plan a visit"
        title={
          <>
            Come as
            <br />
            <span className="text-amber">you are.</span>
          </>
        }
        aside={
          <div className="space-y-3">
            {weekly.map((s) => (
              <div key={s.name} className="flex items-center justify-between gap-4 rounded-xl bg-white/[0.06] px-6 py-5 ring-1 ring-white/10">
                <span>
                  <span className="eyebrow block text-white/50">{s.day}</span>
                  <span className="text-lg font-bold">{s.name}</span>
                </span>
                <span className="display text-5xl text-amber">{s.time}</span>
              </div>
            ))}
          </div>
        }
      >
        <p>First time? Here’s everything you need to know before you walk through the doors at {church.street}. And if getting here is the hard part, we’ll come get you.</p>
      </PageHead>

      <section className="py-20 md:py-24">
        <div className="wrap grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {[
            ["What should I wear?", "Whatever you have. You’ll see suits and collars, and you’ll see jeans and a CTCC hoodie. God looks at the heart."],
            ["How long is service?", "Plan on about two hours on Sunday. We take our time in praise, we preach the Word, and we pray at the altar."],
            ["What’s it like?", "Spirit-filled and warm. Expect lifted hands, a strong word from the Apostle, and people who are genuinely glad you came."],
            ["Do you have something for kids?", "Children are welcome in service with their families. Ask a greeter what’s happening for kids that week."],
            ["Where do I park?", parking],
            ["I don’t have a ride.", "That’s what the van is for. Put your name on the van list and we’ll plan a pickup."],
          ].map(([q, a]) => (
            <div key={q} className="rounded-2xl border border-line bg-white p-7">
              <h2 className="text-xl font-extrabold">{q}</h2>
              <p className="mt-2 leading-relaxed text-muted">
                <Fill value={a} label="parking details" />
              </p>
              {q === "I don’t have a ride." && (
                <Link href="/ride" className="mt-3 inline-block text-sm font-bold text-red underline-offset-4 hover:underline">
                  Get on the van list →
                </Link>
              )}
            </div>
          ))}
        </div>
      </section>

      <section className="bg-paper-2 py-20 md:py-24">
        <div className="wrap grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-center">
          <div>
            <Image
              src="/photos/sanctuary.webp"
              alt="The sanctuary at 4301 Page Blvd: a brass cross in a white arch above a blue-carpeted platform with a white pulpit"
              width={768}
              height={432}
              className="w-full rounded-2xl shadow-xl"
              sizes="(min-width: 1024px) 36rem, 92vw"
            />
          </div>
          <div>
            <p className="eyebrow text-royal">Find us</p>
            <h2 className="display mt-3 text-[clamp(2.8rem,6vw,4.4rem)]">
              {church.street}
              <br />
              <span className="text-royal">at {church.corner}</span>
            </h2>
            <p className="mt-5 text-lg text-muted">
              {church.city}, {church.stateCode} {church.zip}, in the {church.neighborhood} neighborhood, a few blocks from Tandy Park and Annie Malone Drive.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={church.directions} className="btn btn-royal">
                Get directions
              </a>
              <Phone className="btn btn-ghost" fallback="Call the church" />
            </div>
          </div>
        </div>
      </section>

      <section id="plan" className="scroll-mt-24 py-20 md:py-24">
        <div className="wrap grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <p className="eyebrow text-royal">Let us know you’re coming</p>
            <h2 className="display mt-3 text-[clamp(2.8rem,6vw,4.4rem)]">We’ll be looking for you.</h2>
            <p className="mt-5 text-lg leading-relaxed text-muted">Totally optional, but if you tell us you’re coming, someone will meet you at the door and save you a seat.</p>
          </div>
          <div className="rounded-2xl bg-white p-6 shadow-[0_30px_70px_-40px_rgb(10_20_48/0.45)] sm:p-8">
            <VisitForm />
          </div>
        </div>
      </section>
    </>
  );
}
