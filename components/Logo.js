export default function Logo({ size = 32, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" role="img" aria-label="AppHub" className={className}>
      <rect width="32" height="32" rx="7" fill="#18181b" />
      <path d="M9 23 L16 8 L23 23 M11.8 18 H20.2" fill="none" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
