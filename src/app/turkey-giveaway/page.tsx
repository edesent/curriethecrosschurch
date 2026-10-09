import type { Metadata } from "next";
import Link from "next/link";
import Countdown from "@/components/Countdown";
import { Fill } from "@/components/Fill";
import { CoatForm, ServeForm, TurkeyForm } from "@/components/Forms";
import PageHead from "@/components/PageHead";
import Phone from "@/components/Phone";
import { giving, prettyDate, turkey, turkeyIsPast } from "@/lib/site";

export const metadata: Metadata = {
  title: "Turkey Giveaway & Coat Drive · Saturday, November 21",
  description:
    "Free turkeys and warm coats for our neighbors on Saturday, November 21, 2026 at Currie The Cross Church, 4301 Page Blvd., St. Louis. Sign up, donate a coat, or serve.",
};

const roles = ["Handing out turkeys", "Sizing & handing out coats", "Greeting families", "Driving (van or my own car)", "Setup the day before", "Wherever you need me"];

export default function TurkeyPage() {
  if (turkeyIsPast())
    return (
      <PageHead eyebrow={prettyDate(turkey.date, { month: "long", day: "numeric", year: "numeric" })} title="Thank you, St. Louis.">
        <p>
          The Turkey Giveaway & Coat Drive is done for this year. Thank you to every family who came, every neighbor who brought a coat, and everyone who served. Watch
          our Facebook page for photos and for next year’s date.
        </p>
        <Link href="/" className="btn btn-amber mt-8">
          Back home
        </Link>
      </PageHead>
    );

  return (
    <>
      <PageHead
        eyebrow="Saturday, November 21, 2026"
        title={
          <>
            Turkey Giveaway
            <br />
            <span className="text-amber">& Coat Drive</span>
          </>
        }
        aside={
          <div className="rounded-2xl bg-white/[0.06] p-7 ring-1 ring-white/10">
            <Countdown date={turkey.date} className="display block text-6xl text-amber" />
            <dl className="mt-5 space-y-4">
              <div>
                <dt className="eyebrow text-white/50">When</dt>
                <dd className="mt-1 text-lg font-bold">
                  {prettyDate(turkey.date)} · <Fill value={turkey.time} label="time" />
                </dd>
              </div>
              <div>
                <dt className="eyebrow text-white/50">Where</dt>
                <dd className="mt-1 text-lg font-bold">{turkey.where}</dd>
              </div>
              <div>
                <dt className="eyebrow text-white/50">Cost</dt>
                <dd className="mt-1 text-lg font-bold">Free. No questions asked.</dd>
              </div>
            </dl>
          </div>
        }
      >
        <p>A turkey for your Thanksgiving table and a warm coat before winter. Our church family would love to bless yours, and if you need a ride, the church van list covers this day too.</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a href="#signup" className="btn btn-red">
            Sign up my family
          </a>
          <a href="#coats" className="btn btn-ghost">
            Donate a coat
          </a>
          <a href="#serve" className="btn btn-ghost">
            Serve
          </a>
        </div>
      </PageHead>

      <section id="signup" className="scroll-mt-24 py-20 md:py-24">
        <div className="wrap grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <p className="display text-8xl text-red">01</p>
            <h2 className="display mt-2 text-[clamp(2.6rem,5vw,4rem)]">Get a turkey & coats for your family</h2>
            <p className="mt-5 text-lg leading-relaxed text-muted">
              Signing up helps us buy enough turkeys and find the right coat sizes. Walk-ups are welcome too, while supplies last.
            </p>
            <p className="mt-5 text-muted">
              Questions? <Phone className="font-bold text-royal underline" />
            </p>
          </div>
          <div className="rounded-2xl bg-white p-6 shadow-[0_30px_70px_-40px_rgb(10_20_48/0.45)] sm:p-8">
            <TurkeyForm />
          </div>
        </div>
      </section>

      <section id="coats" className="scroll-mt-24 bg-royal py-20 text-white md:py-24">
        <div className="wrap grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <p className="display text-8xl text-brass-soft">02</p>
            <h2 className="display mt-2 text-[clamp(2.6rem,5vw,4rem)]">Bring a coat</h2>
            <p className="mt-5 text-lg leading-relaxed text-white/80">
              New or gently worn coats in every size, especially children’s. Hats, gloves and scarves are welcome too. Last day to drop off:{" "}
              <strong>
                <Fill value={turkey.coatDropOff} label="drop-off deadline" />
              </strong>
              .
            </p>
            <p className="mt-5 text-white/80">
              Rather give money for turkeys? Use{" "}
              <a href={giving.givelify} className="font-bold underline">
                Givelify
              </a>{" "}
              or{" "}
              <a href={giving.cashApp} className="font-bold underline">
                Cash App {giving.cashtag}
              </a>{" "}
              and add “Turkeys” in the note.
            </p>
          </div>
          <div className="rounded-2xl bg-white p-6 text-text sm:p-8">
            <CoatForm />
          </div>
        </div>
      </section>

      <section id="serve" className="scroll-mt-24 py-20 md:py-24">
        <div className="wrap grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <p className="display text-8xl text-red">03</p>
            <h2 className="display mt-2 text-[clamp(2.6rem,5vw,4rem)]">Serve on the day</h2>
            <p className="mt-5 text-lg leading-relaxed text-muted">Many hands, light work. Members, friends, neighbors: everyone is welcome to help.</p>
          </div>
          <div className="rounded-2xl bg-white p-6 shadow-[0_30px_70px_-40px_rgb(10_20_48/0.45)] sm:p-8">
            <ServeForm roles={roles} />
          </div>
        </div>
      </section>
    </>
  );
}
