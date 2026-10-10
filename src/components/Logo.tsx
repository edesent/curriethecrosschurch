import Image from "next/image";

/** Currie The Cross Church's supplied emblem, cleaned for web use. */
export function Mark({ className = "h-12 w-12" }: { className?: string }) {
  return (
    <Image
      src="/brand/currie-the-cross-emblem.png"
      alt=""
      aria-hidden
      width={64}
      height={64}
      className={`${className} shrink-0 object-contain`}
    />
  );
}

export default function Logo({ light = true }: { light?: boolean }) {
  return (
    <span className="flex items-center gap-3">
      <Mark />
      <span className="leading-none">
        <span className={`display block text-[1.45rem] ${light ? "text-white" : "text-text"}`}>Currie The Cross</span>
        <span className={`mt-1 block text-[0.62rem] font-bold tracking-[0.3em] ${light ? "text-brass-soft" : "text-royal"}`}>CHURCH · ST. LOUIS</span>
      </span>
    </span>
  );
}
