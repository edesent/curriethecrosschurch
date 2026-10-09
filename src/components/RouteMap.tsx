import { church, majorRoads, MAP_H, MAP_W, minorRoads, parks, pickups, vanRoute } from "@/lib/map";

/**
 * The real streets around Page & Pendleton (OpenStreetMap), with the Sunday
 * pickup loop drawing itself in and the church van driving it to the front
 * door at 4301 Page Blvd. Pure SVG: SMIL moves the van, CSS draws the line.
 */

const labels: { t: string; x: number; y: number; r: number; big?: boolean }[] = [
  { t: "PAGE BLVD", x: 250, y: 200, r: 29.4, big: true },
  { t: "MARTIN LUTHER KING DR", x: 690, y: 262, r: 29.4 },
  { t: "COOK AVE", x: 700, y: 548, r: 29.4 },
  { t: "PENDLETON AVE", x: 655, y: 312, r: -60.9 },
  { t: "NEWSTEAD AVE", x: 470, y: 316, r: -60.9 },
  { t: "WHITTIER ST", x: 866, y: 393, r: -60.9 },
  { t: "SARAH ST", x: 905, y: 548, r: -60.9 },
];

const ease = "0.45 0.05 0.4 1";

export default function RouteMap({ className = "", showLabels = true, uid = "m" }: { className?: string; showLabels?: boolean; /** Unique per map on a page (SVG ids are global). */ uid?: string }) {
  return (
    <svg viewBox={`0 0 ${MAP_W} ${MAP_H}`} className={className} role="img" aria-label="Map of the streets around Page Blvd and Pendleton Ave, with the church van's pickup route ending at Currie The Cross Church">
      <defs>
        <radialGradient id={`map-fade-${uid}`} cx="0.55" cy="0.5" r="0.62">
          <stop offset="0.55" stopColor="#fff" />
          <stop offset="1" stopColor="#000" />
        </radialGradient>
        <mask id={`map-mask-${uid}`}>
          <rect width={MAP_W} height={MAP_H} fill={`url(#map-fade-${uid})`} />
        </mask>
        <filter id={`route-glow-${uid}`} x="-10%" y="-10%" width="120%" height="120%">
          <feGaussianBlur stdDeviation="6" />
        </filter>
      </defs>

      <g mask={`url(#map-mask-${uid})`}>
        {parks.map((p) => (
          <path key={p.name} d={p.d} fill="#15296a" />
        ))}
        <g fill="none" strokeLinecap="round" strokeLinejoin="round">
          {minorRoads.map((d, i) => (
            <path key={i} d={d} stroke="#22397f" strokeWidth={2.2} />
          ))}
          {majorRoads.map((d, i) => (
            <path key={i} d={d} stroke="#3a58b4" strokeWidth={5} />
          ))}
        </g>

        {showLabels && (
          <g fill="#8ea6ec" fillOpacity={0.55} fontWeight={700} style={{ fontStretch: "75%" }}>
            {labels.map((l) => (
              <text key={l.t} x={l.x} y={l.y} fontSize={l.big ? 19 : 13} letterSpacing={l.big ? 5 : 3} textAnchor="middle" transform={`rotate(${l.r} ${l.x} ${l.y})`}>
                {l.t}
              </text>
            ))}
          </g>
        )}

        {/* The route: a soft glow under a crisp amber line, both drawn in. */}
        <path d={vanRoute} pathLength={1} className="route-line" fill="none" stroke="#ffb01f" strokeOpacity={0.55} strokeWidth={14} filter={`url(#route-glow-${uid})`} strokeLinecap="round" strokeLinejoin="round" />
        <path id={`van-route-${uid}`} d={vanRoute} pathLength={1} className="route-line" fill="none" stroke="#ffb01f" strokeWidth={5} strokeLinecap="round" strokeLinejoin="round" />

        {pickups.map((p, i) => (
          <g key={p.label}>
            <circle cx={p.x} cy={p.y} r={9} fill="none" stroke="#fff" strokeWidth={2} className="pickup" style={{ "--d": `${i * 0.6}s` } as React.CSSProperties} />
            <circle cx={p.x} cy={p.y} r={6.5} fill="#fff" stroke="#0a1430" strokeWidth={2.5} />
          </g>
        ))}
      </g>

      {/* The church: a brass pin with a cross, glowing. */}
      <g transform={`translate(${church.x} ${church.y})`}>
        <circle r={30} fill="#c9a24b" opacity={0.25} className="church-glow" />
        <circle r={19} fill="#c9a24b" stroke="#fff" strokeWidth={3} />
        <path d="M-2.4 -11h4.8v6.2h6.2v4.8h-6.2v12h-4.8v-12h-6.2v-4.8h6.2z" fill="#0a1430" />
      </g>
      {showLabels && (
      <g transform={`translate(${church.x + 30} ${church.y + 46})`}>
        <rect x={0} y={-17} width={178} height={44} rx={6} fill="#0a1430" stroke="#c9a24b" strokeWidth={1.5} />
        <text x={12} y={0} fill="#ecd79e" fontSize={13} fontWeight={800} letterSpacing={2.5}>
          4301 PAGE BLVD
        </text>
        <text x={12} y={18} fill="#fff" fillOpacity={0.7} fontSize={12} fontWeight={600} letterSpacing={1}>
          Page & Pendleton
        </text>
      </g>
      )}

      {/* The van, top-down, nose pointing along the route. */}
      <g>
        <g transform="scale(1.35)">
          <rect x={-15} y={-8} width={30} height={16} rx={3.5} fill="#7a1d2a" stroke="#fff" strokeWidth={1.4} />
          <rect x={5} y={-6.5} width={5.5} height={13} rx={1.5} fill="#bcd2ff" />
          <rect x={-11} y={-5} width={13} height={10} rx={1.5} fill="#92293a" />
          <circle cx={15} cy={-5} r={1.6} fill="#ffe08a" />
          <circle cx={15} cy={5} r={1.6} fill="#ffe08a" />
        </g>
        <animateMotion dur="7s" begin="0s" fill="freeze" rotate="auto" calcMode="spline" keyTimes="0;1" keyPoints="0;0.975" keySplines={ease}>
          <mpath href={`#van-route-${uid}`} />
        </animateMotion>
      </g>
    </svg>
  );
}
