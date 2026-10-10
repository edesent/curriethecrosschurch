import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Blank } from "@/components/Fill";
import PageHead from "@/components/PageHead";
import Phone from "@/components/Phone";
import { church, family, leaders } from "@/lib/site";

export const metadata: Metadata = {
  title: "About · Apostle Marlowe & First Lady Currie",
  description:
    "Currie The Cross Church is pastored by Apostle Marlowe Currie and First Lady Dr. Alisha Currie at 4301 Page Blvd., St. Louis. Our mission is the Great Commission.",
};

export default function AboutPage() {
  return (
    <>
      <PageHead
        eyebrow="About us"
        title={
          <>
            Established
            <br />
            <span className="text-red">by Kingdom.</span>
          </>
        }
      >
        <p>
          {church.name} is a family of believers on Page Blvd. in St. Louis. We love the Lord God, as well as the people of the Lord God, and our mission is the Great
          Commission: go out and make more disciples.
        </p>
      </PageHead>

      {/* The Curries */}
      <section className="py-20 md:py-28">
        <div className="wrap grid gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div className="grid grid-cols-[1.3fr_1fr] gap-4">
            <Image
              src="/photos/apostle-preaching.webp"
              alt="Apostle Marlowe Currie preaching from the white pulpit with a cross cut through it"
              width={742}
              height={901}
              className="row-span-2 h-full w-full rounded-2xl object-cover"
              sizes="(min-width: 1024px) 22rem, 55vw"
            />
            <Image src="/photos/curries-selfie.webp" alt="Apostle and First Lady Currie, smiling together" width={720} height={720} className="w-full rounded-2xl object-cover" sizes="(min-width: 1024px) 16rem, 40vw" />
            <Image
              src="/photos/apostle-pointing.webp"
              alt="Apostle Currie at the pulpit, pointing toward the congregation"
              width={957}
              height={959}
              className="w-full rounded-2xl object-cover"
              sizes="(min-width: 1024px) 16rem, 40vw"
            />
          </div>
          <div>
            <p className="eyebrow text-royal">Our pastors</p>
            <h2 className="display mt-4 text-[clamp(2.8rem,6vw,4.6rem)]">
              {leaders.apostle.title} {leaders.apostle.name}
              <br />
              <span className="text-royal">
                & {leaders.lady.title} {leaders.lady.name}
              </span>
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-muted">
              The Curries have pastored together since {leaders.pastoringSince}. Both hold doctorates, and together they lead {church.name}’s ministry and schools. Apostle
              Currie’s main focus is delivering the gospel and, in his words, “to continue to shine this little light of mine.” {leaders.lady.name} leads Elevated Minds Christian
              School, where every child is pushed to be great.
            </p>
            <figure className="mt-8 rounded-2xl bg-night p-7 text-white">
              <blockquote className="serif text-2xl leading-snug">
                “Our brother Moses had a confidence issue, similar to my own. I was afraid to speak. I once thought I wasn’t qualified to speak or to do anything that was
                connected to my purpose. It wasn’t until I gave the Lord God my complete, unashamed yes! This is when my confidence was birthed. I can do all things through
                Christ, who strengthens me.”
              </blockquote>
              <figcaption className="mt-4 text-sm font-bold text-brass-soft">Apostle Marlowe Currie, Bold Journey, 2025</figcaption>
            </figure>
            <p className="mt-6 text-muted">
              <Blank>First Lady’s story, in her words</Blank>
            </p>
          </div>
        </div>
      </section>

      {/* Three things */}
      <section className="bg-royal py-20 text-white md:py-24">
        <div className="wrap">
          <p className="eyebrow text-brass-soft">What carries us</p>
          <div className="mt-8 grid gap-10 md:grid-cols-3">
            {[
              ["Trust the Lord", "He orders our steps. We don’t have to see the whole road to take the next step on it."],
              ["Believe in the Lord God", "Belief is where it starts, for the seasoned saint and for the one walking in for the first time."],
              ["Have faith in the Lord God", "Faith over fear, and faith over finances. He is able."],
            ].map(([t, d], i) => (
              <div key={t}>
                <p className="display text-7xl text-red">{i + 1}</p>
                <h3 className="display mt-3 text-4xl">{t}</h3>
                <p className="mt-3 text-white/80">{d}</p>
              </div>
            ))}
          </div>
          <figure className="mt-16 border-l-4 border-amber pl-6 md:max-w-3xl">
            <blockquote className="serif text-[1.7rem] leading-snug">
              “The Samaritan woman had a rough journey, but one day she decided to take another path, and that path led her to Jesus. If we want to experience a divine shift,
              we must allow Him to order our steps.”
            </blockquote>
            <figcaption className="mt-3 text-sm font-bold text-white/70">Apostle Marlowe Currie</figcaption>
          </figure>
        </div>
      </section>

      {/* Leadership */}
      <section className="py-20 md:py-28">
        <div className="wrap grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
          <Image
            src="/photos/leadership.webp"
            alt="The leadership of Currie The Cross Church together, many in black clerical shirts and collars"
            width={1800}
            height={1315}
            className="w-full rounded-2xl shadow-xl"
            sizes="(min-width: 1024px) 42rem, 92vw"
          />
          <div>
            <p className="eyebrow text-royal">The house at Page & Pendleton</p>
            <h2 className="display mt-4 text-[clamp(2.8rem,6vw,4.4rem)]">A new chapter in an old house of prayer.</h2>
            <p className="mt-5 text-lg leading-relaxed text-muted">
              Our church home at 4301 Page Blvd. went up in 1905, when a Methodist congregation founded in 1841 built a new church at Page & Pendleton. For more than a
              century since, the corner has kept its doors open to worship. Now it’s our turn to fill it.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-muted">We moved in recently, and we’re making it home, one service, one family and one van ride at a time.</p>
          </div>
        </div>
      </section>

      {/* Family of ministries */}
      <section id="family" className="scroll-mt-24 bg-paper-2 py-20 md:py-24">
        <div className="wrap">
          <p className="eyebrow text-royal">Our family of ministries</p>
          <h2 className="display mt-3 text-[clamp(2.8rem,6vw,4.4rem)]">More than Sunday</h2>
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {family.map((f) => (
              <div key={f.name} className="rounded-2xl bg-white p-7">
                <h3 className="text-2xl font-extrabold">{f.name}</h3>
                <p className="mt-2 text-muted">{f.what}</p>
                <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm font-bold">
                  {f.href ? (
                    <a href={f.href} className="text-royal underline-offset-4 hover:underline">
                      Visit the site →
                    </a>
                  ) : (
                    <Blank>link</Blank>
                  )}
                  {f.phoneB64 && <Phone b64={f.phoneB64} className="text-royal" fallback="" />}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link href="/visit" className="btn btn-red">
              Come worship with us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
