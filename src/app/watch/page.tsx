import type { Metadata } from "next";
import Image from "next/image";
import PageHead from "@/components/PageHead";
import { church, podcastEpisodes, weekly } from "@/lib/site";

export const metadata: Metadata = {
  title: "Watch & Listen",
  description: "Watch Currie The Cross Church live on Facebook every Sunday at 11:00 AM and Thursday at 6 PM, or listen to the podcast.",
};

export default function WatchPage() {
  return (
    <>
      <PageHead eyebrow="Watch & listen" title={<>Church, <span className="text-red">wherever you are.</span></>}>
        <p>Every service goes live on our Facebook page, start to finish: the praise, the Word, and the altar. Sit in from your couch, your break room or your hospital bed.</p>
        <a href={church.facebook} className="btn btn-red mt-8">
          Watch on Facebook
        </a>
      </PageHead>

      <section className="py-20 md:py-24">
        <div className="wrap grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:items-center">
          <a href={church.facebook} className="group relative block overflow-hidden rounded-2xl bg-night shadow-xl">
            <Image
              src="/photos/sanctuary.webp"
              alt="The sanctuary platform at 4301 Page Blvd, the camera’s view for every Facebook Live"
              width={768}
              height={432}
              className="w-full opacity-80 transition-opacity group-hover:opacity-100"
              sizes="(min-width: 1024px) 42rem, 92vw"
            />
            <span className="absolute left-4 top-4 flex items-center gap-2 rounded-md bg-red px-3 py-1.5 text-xs font-extrabold uppercase tracking-[0.2em] text-white">
              <span className="h-2 w-2 animate-pulse rounded-full bg-white" /> Live
            </span>
            <span className="absolute inset-0 grid place-items-center">
              <span className="grid h-20 w-20 place-items-center rounded-full bg-white/90 text-night shadow-xl transition-transform group-hover:scale-110">
                <svg viewBox="0 0 24 24" className="ml-1 h-8 w-8" fill="currentColor" aria-hidden>
                  <path d="M8 5v14l11-7z" />
                </svg>
              </span>
            </span>
          </a>
          <div>
            <p className="eyebrow text-royal">Live schedule</p>
            <ul className="mt-5 divide-y divide-line border-y border-line">
              {weekly.map((s) => (
                <li key={s.name} className="flex items-baseline justify-between gap-4 py-5">
                  <span>
                    <span className="block text-xl font-extrabold">{s.name}</span>
                    <span className="text-sm text-muted">{s.note}</span>
                  </span>
                  <span className="display shrink-0 text-4xl text-red">{s.time}</span>
                </li>
              ))}
            </ul>
            <p className="mt-5 text-sm text-muted">Missed it? Past services stay on the Facebook page under Videos.</p>
          </div>
        </div>
      </section>

      <section className="bg-paper-2 py-20 md:py-24">
        <div className="wrap">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="eyebrow text-royal">The podcast</p>
              <h2 className="display mt-3 text-[clamp(2.8rem,6vw,4.4rem)]">From the archive</h2>
            </div>
            <a href={church.podcast} className="btn btn-royal">
              Listen on Apple Podcasts
            </a>
          </div>
          <ol className="mt-10 grid gap-4 md:grid-cols-2">
            {podcastEpisodes.map((e) => (
              <li key={e.title}>
                <a href={church.podcast} className="flex items-center gap-5 rounded-2xl bg-white p-5 transition-transform hover:-translate-y-0.5">
                  <span className="grid h-14 w-14 shrink-0 place-items-center rounded-xl bg-royal text-white">
                    <svg viewBox="0 0 24 24" className="ml-0.5 h-6 w-6" fill="currentColor" aria-hidden>
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </span>
                  <span className="min-w-0">
                    <span className="block text-lg font-extrabold leading-tight">{e.title}</span>
                    <span className="mt-1 block text-sm text-muted">
                      {e.who} · {e.date} · {e.mins} min
                    </span>
                  </span>
                </a>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </>
  );
}
