import Image from "next/image";
import Link from "next/link";
import { CashTag } from "@/components/CashTag";
import Countdown from "@/components/Countdown";
import DestinationSign from "@/components/DestinationSign";
import { Blank, Fill } from "@/components/Fill";
import { Mark } from "@/components/Logo";
import Phone from "@/components/Phone";
import RouteMap from "@/components/RouteMap";
import { church, family, giving, leaders, prettyDate, turkey, turkeyIsPast, van, weekly } from "@/lib/site";

const signMessages = ["4301 PAGE BLVD", "NO UBER NEEDED", "SUNDAY 11:30 AM", "THURSDAY 6 PM", "TURKEYS NOV 21", "ALL ARE WELCOME"];

export default function Home() {
  const showTurkey = !turkeyIsPast();
  return (
    <>
      {/* ---------------- Hero: the van's route to Page & Pendleton ---------------- */}
      <section className="relative overflow-hidden bg-night text-white">
        <RouteMap uid="hero" className="pointer-events-none absolute -right-[22%] top-1/2 hidden h-[120%] w-auto max-w-none -translate-y-1/2 opacity-60 md:block lg:-right-[6%] lg:opacity-100" />
        <div aria-hidden className="absolute inset-0 bg-[linear-gradient(90deg,var(--night)_0%,rgb(10_20_48/0.92)_38%,rgb(10_20_48/0.35)_70%,transparent)]" />
        <div className="wrap relative pb-20 pt-10 md:pb-28 md:pt-14">
          <div className="max-w-[40rem]">
            <DestinationSign messages={signMessages} />
            <h1 className="display mt-10 text-[clamp(4.2rem,15vw,10rem)] drop-shadow-[0_6px_30px_rgb(0_0_0/0.5)]">
              No Uber
              <br />
              <span className="text-red">Needed.</span>
            </h1>
            <p className="serif mt-5 text-[clamp(1.7rem,4vw,2.6rem)] leading-[1.1] text-brass-soft">Christ has already picked you up.</p>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/80">
              Now let us come get you. {church.name} worships every Sunday at 11:30 AM at {church.corner}, in the heart of St. Louis’ {church.neighborhood}
              {" "}neighborhood, and our church van is getting ready to roll through these streets to bring our neighbors in.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/ride" className="btn btn-red">
                Save me a seat in the van
              </Link>
              <Link href="/visit" className="btn btn-ghost">
                Plan your first Sunday
              </Link>
            </div>
            <RouteMap uid="hero-sm" className="-mx-4 mt-10 w-[calc(100%+2rem)] md:hidden" />
          </div>
        </div>
      </section>

      {/* ---------------- Timetable ---------------- */}
      <section className="relative z-10 -mt-10">
        <div className="wrap">
          <div className="grid overflow-hidden rounded-2xl bg-white shadow-[0_30px_80px_-30px_rgb(10_20_48/0.45)] md:grid-cols-3">
            {weekly.map((s, i) => (
              <div key={s.name} className={`relative p-7 md:p-8 ${i > 0 ? "border-t border-line md:border-l md:border-t-0" : ""}`}>
                <p className="eyebrow text-royal">{s.day}</p>
                <p className="display mt-3 text-6xl text-text">{s.time}</p>
                <p className="mt-2 font-bold">{s.name}</p>
                <p className="mt-1 text-sm leading-relaxed text-muted">{s.note}</p>
              </div>
            ))}
            <a href={church.facebook} className="group relative border-t border-line bg-royal p-7 text-white md:border-l md:border-t-0 md:p-8">
              <p className="eyebrow flex items-center gap-2 text-white/80">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red opacity-75" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-red" />
                </span>
                Can’t make it in?
              </p>
              <p className="display mt-3 text-6xl">Live</p>
              <p className="mt-2 font-bold">On Facebook, every service</p>
              <p className="mt-1 text-sm leading-relaxed text-white/75">Sundays and Thursdays, start to finish. Watch with us and drop an amen in the comments.</p>
              <span className="mt-4 inline-block font-bold underline-offset-4 group-hover:underline">Watch now →</span>
            </a>
          </div>
        </div>
      </section>

      {/* ---------------- Welcome from the Curries ---------------- */}
      <section className="py-24 md:py-32">
        <div className="wrap grid items-center gap-14 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="relative mx-auto w-full max-w-md" data-reveal>
            <div className="absolute -left-4 -top-4 h-full w-full rounded-2xl bg-royal" aria-hidden />
            <Image
              src="/photos/curries-collars.webp"
              alt="Apostle Marlowe Currie and First Lady Currie in clerical collars, smiling in the fellowship hall"
              width={720}
              height={960}
              className="relative rounded-2xl object-cover shadow-xl"
              sizes="(min-width: 1024px) 28rem, 90vw"
            />
            <div className="absolute -bottom-6 -right-3 rounded-xl bg-red px-5 py-3 text-white shadow-lg sm:-right-8">
              <p className="eyebrow text-white/80">Pastoring since</p>
              <p className="display text-4xl">{leaders.pastoringSince}</p>
            </div>
          </div>
          <div data-reveal="1">
            <Mark size={320} alt="Currie The Cross Church emblem" className="h-36 w-36 drop-shadow-xl sm:h-44 sm:w-44" />
            <p className="eyebrow mt-8 text-royal">Welcome home</p>
            <h2 className="display mt-4 text-[clamp(3rem,7vw,5.2rem)]">
              We love the Lord God <span className="text-red">&</span> the people of the Lord God.
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-muted">
              {church.name} is a family. {leaders.apostle.title} {leaders.apostle.name} and {leaders.lady.title} {leaders.lady.name} pastor it together, and they will
              know your name before you leave. Our mission is the Great Commission: go out and make more disciples. That starts on our own block.
            </p>
            <figure className="mt-8 border-l-4 border-red pl-6">
              <blockquote className="serif text-[1.75rem] leading-snug text-text">
                “I was afraid to speak. I once thought I wasn’t qualified to do anything connected to my purpose. It wasn’t until I gave the Lord God my complete, unashamed <em>yes!</em>”
              </blockquote>
              <figcaption className="mt-3 text-sm font-bold text-muted">Apostle Marlowe Currie</figcaption>
            </figure>
            <Link href="/about" className="btn btn-royal mt-9">
              Meet the Curries
            </Link>
          </div>
        </div>
      </section>

      {/* ---------------- The van ---------------- */}
      <section className="relative overflow-hidden bg-maroon text-white">
        <div aria-hidden className="absolute inset-0 opacity-[0.08]" style={{ backgroundImage: "repeating-linear-gradient(90deg, #fff 0 2px, transparent 2px 22px)" }} />
        <div className="wrap relative grid gap-12 py-24 md:py-32 lg:grid-cols-[1fr_1.05fr] lg:items-center">
          <div data-reveal>
            <p className="eyebrow text-amber">The church van</p>
            <h2 className="display mt-4 text-[clamp(3.2rem,8vw,6rem)]">
              Nobody misses church
              <br />
              for want of a ride.
            </h2>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/80">
              That’s the plan. Our {van.what} is how we bring the community to the house of God, and right now it needs work to get back on the road. Once it’s running,
              it will run a Sunday pickup loop through the neighborhood, and to Thursday nights and the November 21 giveaway too.
            </p>
            <ul className="mt-8 grid gap-3 sm:grid-cols-3">
              {van.needs.map((n, i) => (
                <li key={i} className="rounded-xl bg-white/[0.08] px-4 py-3 text-sm font-semibold">
                  <span className="mb-1 block text-xs uppercase tracking-widest text-amber">Needs #{i + 1}</span>
                  <Fill value={n} label="what it needs" />
                </li>
              ))}
            </ul>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link href="/ride" className="btn btn-amber">
                Put my name on the van list
              </Link>
              <Link href="/give#van" className="btn btn-ghost">
                Help fuel the van
              </Link>
            </div>
          </div>
          <div className="relative" data-reveal="1">
            <Image
              src="/photos/van-team.webp"
              alt="Four members of Currie The Cross Church standing beside the church’s maroon passenger van"
              width={1350}
              height={1800}
              className="aspect-[4/5] w-full rounded-2xl object-cover object-[50%_45%] shadow-2xl"
              sizes="(min-width: 1024px) 38rem, 92vw"
            />
            <div className="ticket absolute -bottom-7 left-4 right-4 flex items-center justify-between gap-4 bg-paper px-8 py-4 text-text shadow-xl sm:left-auto sm:right-8 sm:w-80">
              <div>
                <p className="eyebrow text-muted">Route</p>
                <p className="display text-3xl text-red">CTCC</p>
              </div>
              <div className="text-right">
                <p className="eyebrow text-muted">Fare</p>
                <p className="display text-3xl">Free</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- Nov 21 ---------------- */}
      {showTurkey && (
        <section className="py-24 md:py-32">
          <div className="wrap">
            <div className="grid overflow-hidden rounded-3xl bg-white shadow-[0_40px_90px_-40px_rgb(10_20_48/0.4)] lg:grid-cols-[1.1fr_1fr]">
              <div className="relative p-8 sm:p-12" data-reveal>
                <p className="eyebrow flex flex-wrap items-center gap-3 text-red">
                  {prettyDate(turkey.date)}
                  <Countdown date={turkey.date} className="rounded-full bg-red px-3 py-1 text-[0.68rem] text-white" />
                </p>
                <h2 className="display mt-4 text-[clamp(3.2rem,8vw,6rem)]">
                  Turkey Giveaway
                  <br />
                  <span className="text-royal">& Coat Drive</span>
                </h2>
                <p className="mt-6 max-w-lg text-lg leading-relaxed text-muted">
                  A turkey for your Thanksgiving table and a warm coat before the St. Louis winter sets in. Free for our neighbors, no questions asked. Need a ride? The van list
                  covers this day too.
                </p>
                <dl className="mt-8 grid gap-4 sm:grid-cols-2">
                  <div>
                    <dt className="eyebrow text-muted">When</dt>
                    <dd className="mt-1 font-bold">
                      Saturday, Nov 21 · <Fill value={turkey.time} label="time" />
                    </dd>
                  </div>
                  <div>
                    <dt className="eyebrow text-muted">Where</dt>
                    <dd className="mt-1 font-bold">{turkey.where}</dd>
                  </div>
                </dl>
              </div>
              <div className="grid bg-night text-white">
                {[
                  ["Sign up for a turkey or coat", "Tell us your household size and coat sizes so we have enough.", "/turkey-giveaway#signup"],
                  ["Bring a coat", "New or gently worn, every size, especially kids’. Gloves and hats welcome.", "/turkey-giveaway#coats"],
                  ["Serve on the day", "Hand out turkeys, size coats, greet families, or drive.", "/turkey-giveaway#serve"],
                ].map(([t, d, h], i) => (
                  <Link key={h} href={h} className="group flex items-start gap-5 border-b border-white/10 p-8 transition-colors last:border-0 hover:bg-white/[0.04] sm:px-10" data-reveal={i + 1}>
                    <span className="display text-5xl text-amber">0{i + 1}</span>
                    <span>
                      <span className="block text-xl font-bold group-hover:text-amber">{t} →</span>
                      <span className="mt-1 block text-white/65">{d}</span>
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ---------------- The house at Page & Pendleton ---------------- */}
      <section className={`bg-paper-2 ${showTurkey ? "" : "mt-0"}`}>
        <div className="wrap grid gap-12 py-24 md:py-32 lg:grid-cols-[1.15fr_1fr] lg:items-center">
          <div className="relative" data-reveal>
            <Image
              src="/photos/sanctuary-worship.webp"
              alt="The sanctuary at 4301 Page Blvd: a brass cross in a tall arch, stained glass, and the worship team on the blue-carpeted platform"
              width={768}
              height={432}
              className="w-full rounded-2xl object-cover shadow-xl"
              sizes="(min-width: 1024px) 40rem, 92vw"
            />
            <p className="absolute -bottom-5 left-6 rounded-lg bg-text px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-brass-soft">Inside 4301 Page Blvd.</p>
          </div>
          <div data-reveal="1">
            <p className="eyebrow text-royal">Our house</p>
            <h2 className="display mt-4 text-[clamp(3rem,7vw,5rem)]">A house of prayer on this corner since 1905.</h2>
            <p className="mt-6 text-lg leading-relaxed text-muted">
              Our home is the church building at Page & Pendleton, raised in 1905. Inside: a brass cross in a tall white arch, stained glass, and a room that is
              ready to be full again. Come as you are. Jeans or Sunday best, you’ll fit right in.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/visit" className="btn btn-royal">
                What to expect
              </Link>
              <a href={church.directions} className="btn btn-ghost text-text">
                Directions
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- Kingdom family ---------------- */}
      <section className="py-24 md:py-32">
        <div className="wrap">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="eyebrow text-royal">Established by Kingdom</p>
              <h2 className="display mt-4 text-[clamp(3rem,7vw,5rem)]">More than Sunday.</h2>
            </div>
            <p className="max-w-md text-muted">The Curries’ ministry reaches into school, scholarship, counseling, and even the clothes on your back.</p>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {family.map((f, i) => (
              <div key={f.name} className="flex flex-col rounded-2xl border border-line bg-white p-7" data-reveal={i}>
                <span className={`h-1.5 w-12 rounded-full ${["bg-royal", "bg-red", "bg-brass", "bg-maroon"][i]}`} />
                <h3 className="mt-5 text-xl font-extrabold">{f.name}</h3>
                <p className="mt-2 flex-1 text-[0.95rem] leading-relaxed text-muted">{f.what}</p>
                {f.href ? (
                  <a href={f.href} className="mt-5 text-sm font-bold text-royal underline-offset-4 hover:underline">
                    Visit →
                  </a>
                ) : (
                  <span className="mt-5 text-sm text-muted">
                    <Blank>link</Blank>
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- Give ---------------- */}
      <section className="bg-royal text-white">
        <div className="wrap grid gap-10 py-20 md:py-24 lg:grid-cols-[1.2fr_1fr] lg:items-center">
          <div>
            <p className="eyebrow text-brass-soft">Give</p>
            <h2 className="display mt-4 text-[clamp(3rem,7vw,5rem)]">Your gift keeps the van rolling.</h2>
            <p className="mt-5 max-w-xl text-lg text-white/80">Tithes and offerings carry the ministry: the van, the giveaway, and the doors on Page Blvd. Give the way that’s easiest for you.</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <a href={giving.givelify} className="group rounded-2xl bg-white p-6 text-text transition-transform hover:-translate-y-1">
              <p className="eyebrow text-muted">Givelify</p>
              <p className="display mt-2 text-4xl text-royal">Give online</p>
              <p className="mt-2 text-sm text-muted">Card, bank, Apple Pay. Takes a minute.</p>
            </a>
            <a href={giving.cashApp} className="group rounded-2xl bg-[#00d64f] p-6 text-night transition-transform hover:-translate-y-1">
              <p className="eyebrow text-night/70">Cash App</p>
              <CashTag className="display mt-2 block text-[2rem] normal-case leading-none" />
              <p className="mt-2 text-sm text-night/75">Send to our $cashtag.</p>
            </a>
          </div>
        </div>
      </section>

      {/* ---------------- Final call ---------------- */}
      <section className="relative overflow-hidden bg-night py-24 text-center text-white md:py-32">
        <RouteMap uid="end" showLabels={false} className="pointer-events-none absolute left-1/2 top-1/2 h-[140%] w-auto max-w-none -translate-x-1/2 -translate-y-1/2 opacity-30" />
        <div className="wrap relative">
          <p className="serif text-3xl text-brass-soft">See you Sunday.</p>
          <h2 className="display mx-auto mt-4 max-w-4xl text-[clamp(3.4rem,10vw,7.5rem)]">
            We’ll save you
            <br />a seat.
          </h2>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Link href="/ride" className="btn btn-red">
              Get a ride to church
            </Link>
            <Phone className="btn btn-ghost" fallback="Call the church" />
          </div>
        </div>
      </section>
    </>
  );
}
