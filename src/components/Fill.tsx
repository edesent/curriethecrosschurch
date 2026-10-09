/**
 * Shows a value from site.ts, or a dashed "fill in" blank while it's empty.
 * The label says what belongs there.
 */
export function Blank({ children }: { children: React.ReactNode }) {
  return (
    <span className="blank" title="To be filled in by the church">
      <svg aria-hidden viewBox="0 0 16 16" className="h-[0.9em] w-[0.9em]" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M10.5 2.5l3 3L6 13H3v-3z" strokeLinejoin="round" />
      </svg>
      {children}
    </span>
  );
}

export function Fill({ value, label }: { value: string; label: string }) {
  return value ? <>{value}</> : <Blank>{label}</Blank>;
}
