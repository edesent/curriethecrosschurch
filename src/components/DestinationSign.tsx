"use client";

import { useEffect, useState } from "react";

/**
 * The amber dot-matrix destination sign off the front of a church van.
 * Left panel: the route ("CTCC"). Right panel: flips through `messages`.
 * Hand-built 5×7 font, proportional (blank columns trimmed), so it reads like the real thing.
 */

const G: Record<string, string> = {
  A: "01110,10001,10001,11111,10001,10001,10001",
  B: "11110,10001,10001,11110,10001,10001,11110",
  C: "01110,10001,10000,10000,10000,10001,01110",
  D: "11110,10001,10001,10001,10001,10001,11110",
  E: "11111,10000,10000,11110,10000,10000,11111",
  F: "11111,10000,10000,11110,10000,10000,10000",
  G: "01110,10001,10000,10111,10001,10001,01111",
  H: "10001,10001,10001,11111,10001,10001,10001",
  I: "111,010,010,010,010,010,111",
  J: "00111,00010,00010,00010,00010,10010,01100",
  K: "10001,10010,10100,11000,10100,10010,10001",
  L: "10000,10000,10000,10000,10000,10000,11111",
  M: "10001,11011,10101,10101,10001,10001,10001",
  N: "10001,10001,11001,10101,10011,10001,10001",
  O: "01110,10001,10001,10001,10001,10001,01110",
  P: "11110,10001,10001,11110,10000,10000,10000",
  Q: "01110,10001,10001,10001,10101,10010,01101",
  R: "11110,10001,10001,11110,10100,10010,10001",
  S: "01111,10000,10000,01110,00001,00001,11110",
  T: "11111,00100,00100,00100,00100,00100,00100",
  U: "10001,10001,10001,10001,10001,10001,01110",
  V: "10001,10001,10001,10001,10001,01010,00100",
  W: "10001,10001,10001,10101,10101,10101,01010",
  X: "10001,10001,01010,00100,01010,10001,10001",
  Y: "10001,10001,01010,00100,00100,00100,00100",
  Z: "11111,00001,00010,00100,01000,10000,11111",
  "0": "01110,10001,10011,10101,11001,10001,01110",
  "1": "010,110,010,010,010,010,111",
  "2": "01110,10001,00001,00010,00100,01000,11111",
  "3": "11111,00010,00100,00010,00001,10001,01110",
  "4": "00010,00110,01010,10010,11111,00010,00010",
  "5": "11111,10000,11110,00001,00001,10001,01110",
  "6": "00110,01000,10000,11110,10001,10001,01110",
  "7": "11111,00001,00010,00100,01000,01000,01000",
  "8": "01110,10001,10001,01110,10001,10001,01110",
  "9": "01110,10001,10001,01111,00001,00010,01100",
  ":": "0,1,1,0,1,1,0",
  ".": "0,0,0,0,0,1,1",
  "!": "1,1,1,1,1,0,1",
  "&": "01100,10010,10100,01000,10101,10010,01101",
  "-": "000,000,000,111,000,000,000",
  ">": "1000,0100,0010,0001,0010,0100,1000",
  "/": "001,001,010,010,010,100,100",
  // A cross.
  "+": "00100,00100,11111,00100,00100,00100,00100",
  " ": "00,00,00,00,00,00,00",
};

const ROWS = 7;

function render(text: string) {
  const cols: boolean[][] = [];
  [...text.toUpperCase()].forEach((ch, i) => {
    const rows = (G[ch] ?? G[" "]).split(",");
    if (i > 0) cols.push(Array(ROWS).fill(false));
    for (let c = 0; c < rows[0].length; c++) cols.push(rows.map((r) => r[c] === "1"));
  });
  return cols;
}

function Panel({ text, width, rows, className = "" }: { text: string; width: number; rows: number; className?: string }) {
  const cols = render(text);
  const pad = Math.max(0, Math.floor((width - cols.length) / 2));
  const S = 10;
  const dots: React.ReactNode[] = [];
  for (let x = 0; x < width; x++) {
    const col = cols[x - pad];
    for (let y = 0; y < ROWS; y++) {
      const lit = !!col?.[y] && y < rows;
      dots.push(<circle key={`${x}.${y}`} cx={x * S + S / 2} cy={(y + 1) * S + S / 2} r={3.7} fill={lit ? "url(#led-on)" : "#2a1c06"} />);
    }
  }
  return (
    <svg viewBox={`0 0 ${width * S} ${(ROWS + 2) * S}`} className={className} aria-hidden>
      <defs>
        <radialGradient id="led-on">
          <stop offset="0" stopColor="#fff3c4" />
          <stop offset="0.45" stopColor="#ffb01f" />
          <stop offset="1" stopColor="#d97a00" />
        </radialGradient>
      </defs>
      {dots}
    </svg>
  );
}

export default function DestinationSign({ messages, route = "CTCC" }: { messages: string[]; route?: string }) {
  const [i, setI] = useState(0);
  const [rows, setRows] = useState(ROWS);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let flip: ReturnType<typeof setInterval> | undefined;
    const tick = setInterval(() => {
      setI((n) => (n + 1) % messages.length);
      if (reduce) return;
      setRows(0);
      let r = 0;
      clearInterval(flip);
      flip = setInterval(() => {
        r += 1;
        setRows(r);
        if (r >= ROWS) clearInterval(flip);
      }, 45);
    }, 2800);
    return () => {
      clearInterval(tick);
      clearInterval(flip);
    };
  }, [messages.length]);

  return (
    <div className="led-face flex items-stretch gap-[3px] rounded-lg p-2 sm:p-2.5">
      <div className="min-w-0 rounded-[4px] bg-black/60 px-1" style={{ flex: "25 1 0" }}>
        <Panel text={route} width={25} rows={ROWS} className="block h-auto w-full" />
      </div>
      <div className="min-w-0 rounded-[4px] bg-black/60 px-1" style={{ flex: "84 1 0" }}>
        <Panel text={messages[i]} width={84} rows={rows} className="block h-auto w-full" />
      </div>
      <span className="sr-only" aria-live="polite">
        {messages[i]}
      </span>
    </div>
  );
}
