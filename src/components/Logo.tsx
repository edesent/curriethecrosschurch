/** Wordmark: a cross in a road-sign roundel, then the name set like their CTCC tee. */
export function Mark({ className = "h-10 w-10" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden>
      <rect width="48" height="48" rx="11" fill="#d7262e" />
      <rect x="3" y="3" width="42" height="42" rx="8.5" fill="none" stroke="#fff" strokeOpacity="0.35" strokeWidth="1.5" />
      <path d="M21 8h6v11h11v6H27v15h-6V25H10v-6h11z" fill="#fff" />
    </svg>
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
