import { giving } from "@/lib/site";

/** "$curriethecrosschurch", allowed to wrap only between its words. */
export function CashTag({ className = "" }: { className?: string }) {
  const [a, b, c] = ["$currie", "thecross", "church"];
  return giving.cashtag === `${a}${b}${c}` ? (
    <span className={className}>
      {a}
      <wbr />
      {b}
      <wbr />
      {c}
    </span>
  ) : (
    <span className={`${className} [overflow-wrap:anywhere]`}>{giving.cashtag}</span>
  );
}
