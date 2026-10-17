import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Fill } from "@/components/Fill";
import { RideForm } from "@/components/Forms";
import PageHead from "@/components/PageHead";
import Phone from "@/components/Phone";
import RouteMap from "@/components/RouteMap";
import { pickups } from "@/lib/map";
import { giving, van } from "@/lib/site";

export const metadata: Metadata = {
  title: "The Church Van · Get a Ride",
  description:
    "Currie The Cross Church is getting its 15-passenger van back on the road to bring neighbors around Page Blvd to church. Put your name on the van list or help fuel the van.",
};

export default function RidePage() {
  const pct = van.goal > 0 ? Math.min(100, Math.round((van.raised / van.goal) * 100)) : 0;
  return (
    <>
      <PageHead
        eyebrow="The church van"
        title={
          <>
            We’ll come
            <br />
            <span className="text-red">get you.</span>
          </>
        }
        aside={<RouteMap uid="ride" className="w-full rounded-2xl" />}
      >
        <p>
          No car? No bus that runs on Sunday morning? No problem. {van.rolling ? "Our van runs" : "Our van is getting ready to run"} a pickup loop through the blocks around Page &
          Pendleton, so getting to church is never the reason you miss it.
        </p>
      </PageHead>

      {/* Status */}
      <section className="py-20 md:py-24">
        <div className="wrap grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-center">
          <div className="relative">
            <Image
              src="/photos/van.webp"
              alt="The church’s maroon 15-passenger Ford van parked on the lot"
              width={1095}
              height={532}
              className="w-full rounded-2xl shadow-xl"
              sizes="(min-width: 1024px) 36rem, 92vw"
            />
            <span className={`absolute left-4 top-4 rounded-md px-3 py-1.5 text-xs font-extrabold uppercase tracking-[0.18em] ${van.rolling ? "bg-[#00b84a] text-white" : "bg-amber text-night"}`}>
              {van.rolling ? "Rolling" : "In the shop"}
            </span>
          </div>
          <div>
            <p className="eyebrow text-royal">Where things stand</p>
            <h2 className="display mt-3 text-[clamp(2.8rem,6vw,4.4rem)]">{van.rolling ? "The van is running." : "Back on the road, one fix at a time."}</h2>
            <p className="mt-5 text-lg leading-relaxed text-muted">
              Our {van.what} carries up to 15 neighbors at a time. Here’s what it needs before it can start picking people up again:
            </p>
            <ol className="mt-6 space-y-3">
              {van.needs.map((n, i) => (
                <li key={i} className="flex items-center gap-4 rounded-xl border border-line bg-white px-5 py-4">
                  <span className="display text-3xl text-red">{i + 1}</span>
                  <span className="font-bold">
                    <Fill value={n} label="what the van needs" />
                  </span>
                </li>
              ))}
            </ol>
            {van.goal > 0 && (
              <div className="mt-8">
                <div className="flex justify-between text-sm font-bold">
                  <span>${van.raised.toLocaleString()} raised</span>
                  <span className="text-muted">Goal ${van.goal.toLocaleString()}</span>
                </div>
                <div className="mt-2 h-4 overflow-hidden rounded-full bg-paper-2">
                  <div className="h-full rounded-full bg-[linear-gradient(90deg,var(--red),var(--amber))]" style={{ width: `${pct}%` }} />
                </div>
              </div>
            )}
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/give#van" className="btn btn-red">
                Help fuel the van
              </Link>
              <a href={giving.cashApp} className="btn btn-ghost">
                Cash App {giving.cashtag}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* The route */}
      <section className="bg-paper-2 py-20 md:py-24">
        <div className="wrap">
          <p className="eyebrow text-royal">The Sunday loop</p>
          <h2 className="display mt-3 text-[clamp(2.8rem,6vw,4.4rem)]">Stops on the way to church</h2>
          <p className="mt-4 max-w-2xl text-lg text-muted">
            A sample route through the neighborhood. The real stops will be wherever the people on the van list live, so sign up and we’ll route the van past you.
          </p>
          <ol className="relative mt-12 grid gap-8 md:grid-cols-6 md:gap-4">
            <span aria-hidden className="absolute left-[0.55rem] top-2 h-[calc(100%-1rem)] w-1 rounded bg-amber md:left-0 md:top-[0.45rem] md:h-1 md:w-full" />
            {[...pickups.map((p) => p.label), "Currie The Cross Church"].map((l, i, a) => (
              <li key={l} className="relative flex items-start gap-4 md:flex-col md:gap-3">
                <span className={`stop-dot relative z-10 ${i === a.length - 1 ? "!bg-red text-red" : "text-night"}`} />
                <span>
                  <span className="block text-xs font-bold uppercase tracking-[0.2em] text-muted">{i === a.length - 1 ? "Arrive" : `Stop ${i + 1}`}</span>
                  <span className="mt-1 block text-lg font-extrabold leading-tight">{l === "Church" ? "4301 Page Blvd." : l}</span>
                  {i === a.length - 1 && <span className="text-sm text-muted">4301 Page Blvd. · in time for 11:00</span>}
                </span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Sign up */}
      <section id="list" className="bg-night py-20 text-white md:py-24">
        <div className="wrap grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="eyebrow text-amber">The van list</p>
            <h2 className="display mt-3 text-[clamp(2.8rem,6vw,4.4rem)]">Save me a seat.</h2>
            <p className="mt-5 text-lg leading-relaxed text-white/75">
              {van.rolling
                ? "Tell us where you are and which service, and a driver will call to set up your pickup."
                : "Put your name down now. The day the van is back on the road, everyone on this list gets a call first, and we’ll plan the route around you."}
            </p>
            <ul className="mt-8 space-y-3 text-white/80">
              <li>✓ Free. Always.</li>
              <li>✓ Seniors, families, and kids welcome. Tell us if you need help with a step or a chair.</li>
              <li>✓ Sundays, Thursday nights, and the November 21 giveaway.</li>
            </ul>
            <p className="mt-8 text-white/60">
              Rather talk to a person? <Phone className="font-bold text-amber underline" />
            </p>
          </div>
          <div className="rounded-2xl bg-white p-6 text-text sm:p-8">
            <RideForm />
          </div>
        </div>
      </section>
    </>
  );
}
