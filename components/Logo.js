const tiles = [
  { cx: 270, cy: 140, color: "#22d3ee" },
  { cx: 214.7, cy: 216.1, color: "#f472b6" },
  { cx: 125.3, cy: 187, color: "#a3e635" },
  { cx: 125.3, cy: 93, color: "#f97316" },
  { cx: 214.7, cy: 63.9, color: "#818cf8" },
];

export default function Logo({ size = 200, className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="95 45 190 190"
      role="img"
      aria-label="Logo AppHub"
      className={className}
    >
      <circle cx="190" cy="140" r="40" fill="none" stroke="#22d3ee" strokeWidth="2">
        <animate attributeName="r" values="40;66" dur="2.4s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.7;0" dur="2.4s" repeatCount="indefinite" />
      </circle>
      <circle cx="190" cy="140" r="40" fill="none" stroke="#f472b6" strokeWidth="2">
        <animate attributeName="r" values="40;66" dur="2.4s" begin="1.2s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.7;0" dur="2.4s" begin="1.2s" repeatCount="indefinite" />
      </circle>

      <circle cx="190" cy="140" r="80" fill="none" stroke="#3f3f46" strokeWidth="1" strokeDasharray="3 7">
        <animateTransform
          attributeName="transform"
          type="rotate"
          from="360 190 140"
          to="0 190 140"
          dur="30s"
          repeatCount="indefinite"
        />
      </circle>

      <g>
        <animateTransform
          attributeName="transform"
          type="rotate"
          from="0 190 140"
          to="360 190 140"
          dur="14s"
          repeatCount="indefinite"
        />
        {tiles.map((t) => (
          <rect
            key={t.color}
            x={t.cx - 13}
            y={t.cy - 13}
            width="26"
            height="26"
            rx="7"
            fill={t.color}
          >
            <animateTransform
              attributeName="transform"
              type="rotate"
              from={`0 ${t.cx} ${t.cy}`}
              to={`-360 ${t.cx} ${t.cy}`}
              dur="14s"
              repeatCount="indefinite"
            />
          </rect>
        ))}
      </g>

      <polygon
        points="190,106 219.4,123 219.4,157 190,174 160.6,157 160.6,123"
        fill="#18181b"
        stroke="#22d3ee"
        strokeWidth="2.5"
        strokeLinejoin="round"
      >
        <animate
          attributeName="stroke"
          values="#22d3ee;#f472b6;#f97316;#22d3ee"
          dur="6s"
          repeatCount="indefinite"
        />
      </polygon>
      <path
        d="M178 158 L190 122 L202 158"
        fill="none"
        stroke="#fafafa"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M182.5 147 L197.5 147" fill="none" stroke="#f472b6" strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
}
