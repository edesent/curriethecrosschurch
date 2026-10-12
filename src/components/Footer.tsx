import Link from "next/link";
import Logo from "./Logo";
import Phone from "./Phone";
import { church, giving, leaders, weekly } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="bg-night text-white">
      <div className="h-1.5 bg-[linear-gradient(90deg,var(--royal)_0_50%,var(--red)_50%_100%)]" />
      <div className="wrap grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <Logo />
          <p className="serif mt-6 max-w-xs text-2xl leading-snug text-white/85">“{church.welcome}”</p>
          <p className="mt-4 text-sm text-white/55">
            {leaders.apostle.title} {leaders.apostle.name} & {leaders.lady.title} {leaders.lady.name}
          </p>
        </div>
        <div>
          <p className="eyebrow text-amber">Find us</p>
          <address className="mt-4 not-italic leading-relaxed text-white/80">
            {church.street}
            <br />
            {church.city}, {church.stateCode} {church.zip}
            <br />
            <span className="text-white/50">at {church.corner}</span>
          </address>
          <a href={church.directions} className="mt-3 inline-block text-sm font-bold text-amber underline-offset-4 hover:underline">
            Directions →
          </a>
          <p className="mt-4">
            <Phone className="font-bold hover:text-amber" />
          </p>
        </div>
        <div>
          <p className="eyebrow text-amber">Every week</p>
          <ul className="mt-4 space-y-3">
            {weekly.map((s) => (
              <li key={s.name}>
                <span className="block text-sm text-white/55">{s.day}</span>
                <span className="font-bold">
                  {s.time} · {s.name.replace(`${s.day} `, "")}
                </span>
              </li>
            ))}
          </ul>
          <a href={church.facebook} className="mt-4 inline-block text-sm font-bold text-amber underline-offset-4 hover:underline">
            Watch live on Facebook →
          </a>
        </div>
        <div>
          <p className="eyebrow text-amber">Around the site</p>
          <ul className="mt-4 space-y-2 text-white/80">
            {[
              ["/visit", "Plan a visit"],
              ["/ride", "The church van"],
              ["/turkey-giveaway", "Turkey Giveaway & Coat Drive"],
              ["/watch", "Watch & listen"],
              ["/about", "About us"],
              ["/contact", "Contact & prayer"],
            ].map(([h, l]) => (
              <li key={h}>
                <Link href={h} className="hover:text-white">
                  {l}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-6 flex flex-wrap gap-2">
            <a href={giving.givelify} className="btn btn-red !px-4 !py-2 !text-sm">
              Givelify
            </a>
            <a href={giving.cashApp} className="btn btn-ghost !px-4 !py-2 !text-sm">
              {giving.cashtag}
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="wrap flex flex-col gap-2 py-6 text-xs text-white/45 sm:flex-row sm:justify-between">
          <p>
            © {new Date().getFullYear()} {church.name} · {church.tagline}
          </p>
          <p>Map data © OpenStreetMap contributors</p>
          <p>
            <a href="https://elijahdesent.com/churches" className="underline-offset-4 hover:text-white hover:underline">
              Church Website Development
            </a>{" "}
            by Elijah Desent
          </p>
        </div>
      </div>
    </footer>
  );
}
