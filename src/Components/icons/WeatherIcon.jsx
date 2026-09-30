import { useId } from "react";

/* ─────────────────────────────────────────────────────────────
   Illustrated weather icons (64×64) + line metric icons (24×24).
   Built from small parts (Sun, Moon, Cloud, Drop, Flake, Bolt)
   so every condition shares the same look.
   Colors are chosen to read on both the light glass card and the
   dark #0a1728 night background.
   ───────────────────────────────────────────────────────────── */

/* Line icons (stroke = currentColor → follows the text color / theme) */
const OUTLINE = {
  humidity: <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />,
  wind: (
    <path d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2" />
  ),
  cloud: <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />,
  pressure: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M7.5 14.5a5 5 0 0 1 9 0" />
      <path d="M12 14l2.6-3.4" />
    </>
  ),
  visibility: (
    <>
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </>
  ),
  "temp-max": (
    <path d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z" />
  ),
  "temp-min": (
    <path d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z" />
  ),
};

const DEFAULT_COLOR = { "temp-max": "#EF4444", "temp-min": "#3B82F6" };

const TONES = {
  white: "cWhite",
  blue: "cBlue",
  rain: "cRain",
  storm: "cStorm",
  mist: "cMist",
};

/* ── Gradients (ids are prefixed per instance so they never collide) ── */
function Defs({ u }) {
  const v = (name, fallback) => `var(--ic-${name}, ${fallback})`;
  const lin = (id, a, b, diagonal = false) => (
    <linearGradient
      id={`${u}${id}`}
      x1="0"
      y1="0"
      x2={diagonal ? "1" : "0"}
      y2="1"
    >
      <stop offset="0" style={{ stopColor: a }} />
      <stop offset="1" style={{ stopColor: b }} />
    </linearGradient>
  );
  return (
    <defs>
      <radialGradient id={`${u}sun`} cx="38%" cy="34%" r="70%">
        <stop offset="0" stopColor="#FFF1AD" />
        <stop offset="0.55" stopColor="#FFC933" />
        <stop offset="1" stopColor="#FF9A1F" />
      </radialGradient>
      <radialGradient id={`${u}dusk`} cx="40%" cy="30%" r="80%">
        <stop offset="0" stopColor="#FFD68A" />
        <stop offset="0.55" stopColor="#FF8A45" />
        <stop offset="1" stopColor="#F2555A" />
      </radialGradient>
      {lin("cWhite", v("cloud-a", "#FFFFFF"), v("cloud-b", "#D3E1F3"))}
      {lin("cBlue", v("over-a", "#B9D6FB"), v("over-b", "#6A9AE2"))}
      {lin("cRain", v("rain-a", "#AEC3E0"), v("rain-b", "#6B87B2"))}
      {lin("cStorm", v("storm-a", "#8E9DB8"), v("storm-b", "#55678C"))}
      {lin("cMist", v("mist-a", "#F1F5FA"), v("mist-b", "#BCC9DA"))}
      {lin("drop", v("drop-a", "#94D4FF"), v("drop-b", "#2E84E6"))}
      {lin("bolt", "#FFE45C", "#FF9A1C")}
      {lin("moon", v("moon-a", "#E3EAFF"), v("moon-b", "#8CA3EE"), true)}
    </defs>
  );
}

/* ── Parts ── */
function Sun({ f, cx, cy, r, fill = "sun", ray = "#FFC62E" }) {
  return (
    <g>
      <circle cx={cx} cy={cy} r={r * 1.9} fill={ray} opacity="0.14" />
      {Array.from({ length: 8 }, (_, i) => (
        <line
          key={i}
          x1={cx}
          x2={cx}
          y1={cy - r * 1.35}
          y2={cy - r * 1.75}
          stroke={ray}
          strokeWidth={Math.max(2.4, r * 0.28)}
          strokeLinecap="round"
          transform={`rotate(${i * 45} ${cx} ${cy})`}
        />
      ))}
      <circle cx={cx} cy={cy} r={r} fill={f(fill)} />
    </g>
  );
}

function Moon({ f, cx, cy, r }) {
  // Crescent = big circle minus a cutter circle, drawn as one path (no masks).
  const r2 = r * 0.82;
  const cx2 = cx + r * 0.55;
  const cy2 = cy - r * 0.4;
  const dx = cx2 - cx;
  const dy = cy2 - cy;
  const d = Math.hypot(dx, dy);
  const a = (r * r - r2 * r2 + d * d) / (2 * d);
  const h = Math.sqrt(Math.max(r * r - a * a, 0));
  const mx = cx + (a * dx) / d;
  const my = cy + (a * dy) / d;
  const p1 = [mx + (h * dy) / d, my - (h * dx) / d];
  const p2 = [mx - (h * dy) / d, my + (h * dx) / d];
  const t = (n) => n.toFixed(2);
  const path =
    `M${t(p1[0])} ${t(p1[1])}` +
    `A${r} ${r} 0 1 0 ${t(p2[0])} ${t(p2[1])}` +
    `A${r2} ${r2} 0 0 1 ${t(p1[0])} ${t(p1[1])}Z`;
  return (
    <g>
      <circle cx={cx} cy={cy} r={r * 1.45} fill="#9DB4FF" opacity="0.09" />
      <path d={path} fill={f("moon")} />
    </g>
  );
}

function Cloud({ f, x, y, s, tone = "white" }) {
  return (
    <path
      d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"
      transform={`translate(${x} ${y}) scale(${s}) translate(-1 -4)`}
      fill={f(TONES[tone])}
      strokeWidth="0.6"
      strokeLinejoin="round"
      style={{ stroke: "var(--ic-stroke, rgba(90,120,170,0.38))" }}
    />
  );
}

function Drop({ f, x, y, s = 1 }) {
  return (
    <path
      d="M0 -4.5C2.6 -1 3.6 0.9 3.6 2.4A3.6 3.6 0 0 1 -3.6 2.4C-3.6 0.9 -2.6 -1 0 -4.5Z"
      transform={`translate(${x} ${y}) scale(${s})`}
      fill={f("drop")}
    />
  );
}

function Flake({ x, y, s = 1 }) {
  const arms = [0, 60, 120].map((a) => (
    <line key={a} x1="0" y1="-3.6" x2="0" y2="3.6" transform={`rotate(${a})`} />
  ));
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} strokeLinecap="round">
      <g
        strokeWidth="3.6"
        style={{ stroke: "var(--ic-flake-under, transparent)" }}
      >
        {arms}
      </g>
      <g stroke="#FFFFFF" strokeWidth="1.8">
        {arms}
      </g>
    </g>
  );
}

function Bolt({ f }) {
  return (
    <path
      d="M36 36L27 51H33.5L30 62L44 44H37L43 36Z"
      fill={f("bolt")}
      stroke="#D97706"
      strokeWidth="0.6"
      strokeLinejoin="round"
    />
  );
}

function Horizon({ f, rising }) {
  const dusk = !rising;
  return (
    <g>
      {[-72, -36, 0, 36, 72].map((a) => (
        <line
          key={a}
          x1="32"
          x2="32"
          y1="26"
          y2="21"
          stroke={dusk ? "#FF7A45" : "#FFC62E"}
          strokeWidth="3"
          strokeLinecap="round"
          transform={`rotate(${a} 32 42)`}
        />
      ))}
      <path d="M20 42A12 12 0 0 1 44 42Z" fill={f(dusk ? "dusk" : "sun")} />
      <path
        d="M10 46H54"
        style={{ stroke: "var(--ic-line, #9DB2CC)" }}
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d={rising ? "M26 58L32 52L38 58" : "M26 52L32 58L38 52"}
        fill="none"
        stroke={dusk ? "#FF6B4A" : "#FF9A1F"}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
  );
}

/* ── Scenes ── */
function Scene({ kind, night, f }) {
  const moon = night ? <Moon f={f} cx={14} cy={14} r={7} /> : null;
  const precipCloud = (tone) => (
    <>
      {moon}
      <Cloud f={f} x={9} y={8} s={2.1} tone={tone} />
    </>
  );

  switch (kind) {
    case "clear":
      return night ? (
        <g>
          <Moon f={f} cx={30} cy={34} r={17} />
          <circle cx="47" cy="17" r="1.7" fill="#BFD0FF" />
          <circle cx="53" cy="28" r="1.3" fill="#BFD0FF" />
          <circle cx="44" cy="9" r="1.1" fill="#BFD0FF" />
        </g>
      ) : (
        <Sun f={f} cx={32} cy={32} r={12} />
      );

    case "partlyCloudy":
      return (
        <g>
          {night ? (
            <Moon f={f} cx={22} cy={22} r={10} />
          ) : (
            <Sun f={f} cx={22} cy={22} r={9} />
          )}
          <Cloud f={f} x={18} y={25} s={1.95} tone="white" />
        </g>
      );

    case "drizzle":
      return (
        <g>
          {precipCloud("rain")}
          {[
            [21, 49],
            [31, 49],
            [41, 49],
            [26, 57],
            [36, 57],
          ].map(([x, y]) => (
            <Drop key={`${x}${y}`} f={f} x={x} y={y} s={0.75} />
          ))}
        </g>
      );

    case "rain":
      return (
        <g>
          {precipCloud("rain")}
          <Drop f={f} x={22} y={50} />
          <Drop f={f} x={32} y={55} />
          <Drop f={f} x={42} y={50} />
        </g>
      );

    case "shower":
      return (
        <g>
          {precipCloud("rain")}
          <Drop f={f} x={20} y={49} s={1.1} />
          <Drop f={f} x={29} y={55} s={1.1} />
          <Drop f={f} x={38} y={49} s={1.1} />
          <Drop f={f} x={47} y={55} s={1.1} />
        </g>
      );

    case "sleet":
      return (
        <g>
          {precipCloud("rain")}
          <Drop f={f} x={22} y={50} />
          <Drop f={f} x={42} y={50} />
          <Flake x={32} y={53} />
          <Flake x={22} y={59} s={0.8} />
          <Flake x={42} y={59} s={0.8} />
        </g>
      );

    case "snow":
      return (
        <g>
          {precipCloud("mist")}
          <Flake x={20} y={51} />
          <Flake x={32} y={55} />
          <Flake x={44} y={51} />
          <Flake x={26} y={60} s={0.8} />
          <Flake x={38} y={60} s={0.8} />
        </g>
      );

    case "thunder":
      return (
        <g>
          {precipCloud("storm")}
          <Bolt f={f} />
        </g>
      );

    case "mist":
      return (
        <g>
          {night ? <Moon f={f} cx={14} cy={14} r={7} /> : null}
          <Cloud f={f} x={11} y={8} s={1.9} tone="mist" />
          {[
            [14, 50, 46],
            [20, 56, 52],
            [14, 44, 58],
          ].map(([x1, x2, y]) => (
            <line
              key={y}
              x1={x1}
              x2={x2}
              y1={y}
              y2={y}
              style={{ stroke: "var(--ic-line, #9FB3CB)" }}
              strokeWidth="3.2"
              strokeLinecap="round"
            />
          ))}
        </g>
      );

    case "sunrise":
      return <Horizon f={f} rising />;

    case "sunset":
      return <Horizon f={f} rising={false} />;

    case "clouds":
    default:
      return (
        <g>
          <Cloud f={f} x={26} y={8} s={1.5} tone="white" />
          <Cloud f={f} x={4} y={20} s={2.1} tone="blue" />
        </g>
      );
  }
}

export default function WeatherIcon({
  name = "clouds",
  size = 48,
  color,
  className,
  style,
  title,
}) {
  const u = `wi${useId().replace(/:/g, "")}`;
  const f = (id) => `url(#${u}${id})`;
  const common = {
    width: size,
    height: size,
    className,
    role: "img",
    "aria-label": title ?? name,
    "data-icon": name,
  };

  if (OUTLINE[name]) {
    return (
      <svg
        {...common}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ color: color ?? DEFAULT_COLOR[name], ...style }}
      >
        {title ? <title>{title}</title> : null}
        {OUTLINE[name]}
      </svg>
    );
  }

  const night = name.startsWith("night-");
  const kind = name.replace(/^(day|night)-/, "");

  return (
    <svg {...common} viewBox="0 0 64 64" style={style}>
      {title ? <title>{title}</title> : null}
      <Defs u={u} />
      <Scene kind={kind} night={night} f={f} u={u} />
    </svg>
  );
}
