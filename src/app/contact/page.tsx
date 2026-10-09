import type { Metadata } from "next";
import { ContactForm, PrayerForm } from "@/components/Forms";
import PageHead from "@/components/PageHead";
import Phone from "@/components/Phone";
import { church } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact & Prayer",
  description: "Call, message, or send a prayer request to Currie The Cross Church, 4301 Page Blvd., St. Louis, MO 63113.",
};

export default function ContactPage() {
  return (
    <>
      <PageHead
        eyebrow="Contact & prayer"
        title={
          <>
            We’d love to
            <br />
            <span className="text-amber">hear from you.</span>
          </>
        }
        aside={
          <div className="grid gap-3">
            <div className="rounded-xl bg-white/[0.06] px-6 py-5 ring-1 ring-white/10">
              <p className="eyebrow text-white/50">Call or text</p>
              <Phone className="display mt-1 block text-4xl text-amber" />
            </div>
            <div className="rounded-xl bg-white/[0.06] px-6 py-5 ring-1 ring-white/10">
              <p className="eyebrow text-white/50">Visit</p>
              <p className="mt-1 text-lg font-bold">
                {church.street} {church.city}, {church.stateCode} {church.zip}
              </p>
            </div>
            <a href={church.facebook} className="rounded-xl bg-white/[0.06] px-6 py-5 ring-1 ring-white/10 hover:bg-white/10">
              <p className="eyebrow text-white/50">Facebook</p>
              <p className="mt-1 text-lg font-bold">facebook.com/curriethecrosschurch →</p>
            </a>
          </div>
        }
      />

      <section className="py-20 md:py-24">
        <div className="wrap grid gap-10 lg:grid-cols-2">
          <div id="prayer" className="scroll-mt-24 rounded-2xl bg-night p-6 text-white sm:p-9">
            <p className="eyebrow text-amber">Prayer</p>
            <h2 className="display mt-3 text-5xl">How can we pray for you?</h2>
            <p className="mb-7 mt-3 text-white/70">The Apostle, First Lady and our prayer team pray over every request.</p>
            <div className="rounded-xl bg-white p-5 text-text sm:p-6">
              <PrayerForm />
            </div>
          </div>
          <div className="rounded-2xl bg-white p-6 sm:p-9">
            <p className="eyebrow text-royal">Message</p>
            <h2 className="display mt-3 text-5xl">Send us a note</h2>
            <p className="mb-7 mt-3 text-muted">Questions about the church, the van, the school, or anything else.</p>
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
