import type { Metadata } from "next";
import Link from "next/link";
import { CashTag } from "@/components/CashTag";
import PageHead from "@/components/PageHead";
import { giving } from "@/lib/site";

export const metadata: Metadata = {
  title: "Give",
  description: "Give to Currie The Cross Church through Givelify or Cash App ($curriethecrosschurch). Your gift fuels the church van, the Turkey Giveaway & Coat Drive, and the ministry on Page Blvd.",
};

export default function GivePage() {
  return (
    <>
      <PageHead eyebrow="Give" title={<>Every gift <span className="text-amber">goes somewhere.</span></>}>
        <p>
          “Every man according as he purposeth in his heart, so let him give; not grudgingly, or of necessity: for God loveth a cheerful giver.”{" "}
          <span className="whitespace-nowrap text-white/50">2 Corinthians 9:7</span>
        </p>
      </PageHead>

      <section className="py-20 md:py-24">
        <div className="wrap grid gap-6 md:grid-cols-2">
          <a href={giving.givelify} className="group flex flex-col rounded-3xl bg-white p-8 shadow-[0_30px_70px_-40px_rgb(10_20_48/0.45)] transition-transform hover:-translate-y-1 sm:p-10">
            <p className="eyebrow text-muted">Online · card, bank, Apple Pay, Google Pay</p>
            <p className="display mt-4 text-7xl text-royal">Givelify</p>
            <p className="mt-4 flex-1 text-lg text-muted">Give once or set up a recurring gift. You can pick tithe, offering, or a special gift, and you’ll get a receipt for your records.</p>
            <span className="btn btn-royal mt-8 self-start">Give with Givelify →</span>
          </a>
          <a href={giving.cashApp} className="group flex flex-col rounded-3xl bg-[#00d64f] p-8 text-night transition-transform hover:-translate-y-1 sm:p-10">
            <p className="eyebrow text-night/70">From your phone</p>
            <CashTag className="display mt-4 block text-[clamp(2.6rem,6vw,4.4rem)] normal-case leading-none" />
            <p className="mt-4 flex-1 text-lg text-night/80">Open Cash App, tap “Pay”, and send to our $cashtag. Add a note like “Tithe”, “Van” or “Turkeys” so we know where it goes.</p>
            <span className="btn mt-8 self-start bg-night text-white">Open Cash App →</span>
          </a>
        </div>
      </section>

      <section id="van" className="scroll-mt-24 bg-maroon py-20 text-white md:py-24">
        <div className="wrap grid gap-10 lg:grid-cols-3">
          {[
            ["The van", "Repairs, insurance and gas so the church van can bring neighbors to worship.", "Note: “Van”", "/ride"],
            ["The giveaway", "Turkeys for Thanksgiving tables and coats for the winter, November 21.", "Note: “Turkeys”", "/turkey-giveaway"],
            ["The house", "Keeping the doors open and the lights on at 4301 Page Blvd.", "Tithes & offerings", "/visit"],
          ].map(([t, d, n, h]) => (
            <div key={t} className="border-t-4 border-amber pt-6">
              <h2 className="display text-5xl">{t}</h2>
              <p className="mt-3 text-white/80">{d}</p>
              <p className="mt-4 text-sm font-bold uppercase tracking-[0.18em] text-amber">{n}</p>
              <Link href={h} className="mt-3 inline-block text-sm font-bold underline-offset-4 hover:underline">
                Learn more →
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section className="py-16">
        <div className="wrap text-center text-muted">
          <p>Prefer to give in person? The offering is received during every Sunday service at 4301 Page Blvd.</p>
        </div>
      </section>
    </>
  );
}
