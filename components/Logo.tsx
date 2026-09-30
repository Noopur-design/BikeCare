import Link from 'next/link';

export default function Logo({ footer = false }: { footer?: boolean }) {
  return (
    <Link href="/" className={`logo${footer ? ' logo--footer' : ''}`} aria-label="BIKECARE home">
      <span className="logo__mark" aria-hidden="true">
        <svg viewBox="0 0 44 44" width="40" height="40">
          <defs>
            <linearGradient id="bcLogoGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#E9A77A" />
              <stop offset="0.5" stopColor="#C96A3D" />
              <stop offset="1" stopColor="#A9532C" />
            </linearGradient>
          </defs>
          <rect x="1" y="1" width="42" height="42" rx="13" fill="url(#bcLogoGrad)" />
          <rect x="1" y="1" width="42" height="42" rx="13" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="1" />
          {/* wheel */}
          <g className="logo__wheel" stroke="#fff" strokeWidth="1.7" fill="none" strokeLinecap="round">
            <circle cx="22" cy="22" r="10.5" />
            <g strokeWidth="1.4">
              <line x1="22" y1="12" x2="22" y2="32" />
              <line x1="12" y1="22" x2="32" y2="22" />
              <line x1="15" y1="15" x2="29" y2="29" />
              <line x1="29" y1="15" x2="15" y2="29" />
            </g>
          </g>
          <circle cx="22" cy="22" r="3" fill="#fff" />
          <circle cx="22" cy="22" r="1.3" fill="#C96A3D" />
          {/* speed spark */}
          <circle cx="35" cy="9" r="2.4" fill="#fff" />
        </svg>
      </span>
      <span className="logo__word">
        <b>BIKE</b><span>CARE</span><i className="logo__dot" aria-hidden="true" />
      </span>
    </Link>
  );
}
