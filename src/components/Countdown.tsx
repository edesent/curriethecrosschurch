"use client";

import { useEffect, useState } from "react";
import { TZ } from "@/lib/site";

/** Days until a YYYY-MM-DD date in St. Louis time. Renders nothing until mounted, and nothing once the day has passed. */
export default function Countdown({ date, className = "" }: { date: string; className?: string }) {
  const [days, setDays] = useState<number | null>(null);

  useEffect(() => {
    const today = new Intl.DateTimeFormat("en-CA", { timeZone: TZ }).format(new Date());
    const ms = Date.parse(`${date}T00:00:00Z`) - Date.parse(`${today}T00:00:00Z`);
    setDays(Math.round(ms / 86400000));
  }, [date]);

  if (days === null || days < 0) return null;
  return (
    <span className={className}>
      {days === 0 ? "Today!" : days === 1 ? "Tomorrow" : `${days} days away`}
    </span>
  );
}
