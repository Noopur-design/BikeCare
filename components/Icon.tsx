import type { IconName } from '@/lib/data';

const P: Record<string, string> = {
  wrench: '<path d="M14.7 6.3a4 4 0 0 0-5.4 5.3L3 18v3h3l6.4-6.3a4 4 0 0 0 5.3-5.4l-2.6 2.6-2-2z"/>',
  droplet: '<path d="M12 3s6 5.7 6 10a6 6 0 0 1-12 0c0-4.3 6-10 6-10z"/>',
  engine: '<path d="M6 9h3l2-2h2v3h4l2 2h1v4h-2l-2 2h-6l-2-2H6v-3H4v-2h2z"/><path d="M11 4h4"/>',
  disc: '<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="2.5"/><path d="M12 4v3M12 17v3M4 12h3M17 12h3"/>',
  tyre: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="4"/><path d="M12 3v5M12 16v5M3 12h5M16 12h5"/>',
  battery: '<rect x="3" y="8" width="16" height="10" rx="2"/><path d="M21 11v4M7 6V4M13 6V4M7 13h2M8 12v2"/>',
  sparkle: '<path d="M12 3l1.8 4.9L19 9.6l-4.2 2.5L13 17l-3.2-4-5 .6 3.8-3.3L7 5.7 12 8z"/><path d="M19 15l.8 2 2 .8-2 .8-.8 2-.8-2-2-.8 2-.8z"/>',
  sparkles: '<path d="M12 3l1.8 4.9L19 9.6l-4.2 2.5L13 17l-3.2-4-5 .6 3.8-3.3L7 5.7 12 8z"/>',
  bolt: '<path d="M13 2 4 14h7l-1 8 9-12h-7z"/>',
  zap: '<path d="M13 2 4 14h7l-1 8 9-12h-7z"/>',
  gear: '<circle cx="12" cy="12" r="3.2"/><path d="M12 2v3M12 19v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M2 12h3M19 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1"/>',
  truck: '<path d="M3 6h11v9H3zM14 9h4l3 3v3h-7z"/><circle cx="7" cy="18" r="1.6"/><circle cx="17.5" cy="18" r="1.6"/>',
  shield: '<path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6z"/><path d="m9 12 2 2 4-4"/>',
  badge: '<circle cx="12" cy="9" r="5"/><path d="m8.5 13-1.5 8 5-3 5 3-1.5-8"/>',
  tag: '<path d="M3 12V4h8l9 9-8 8-9-9z"/><circle cx="7.5" cy="7.5" r="1.3"/>',
  phone: '<path d="M4 4h4l2 5-3 2a12 12 0 0 0 6 6l2-3 5 2v4a2 2 0 0 1-2 2A17 17 0 0 1 2 6a2 2 0 0 1 2-2z"/>',
  calendar: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 9h18M8 3v4M16 3v4"/>',
  check: '<path d="m5 12 5 5L20 7"/>',
  bike: '<circle cx="5.5" cy="17" r="3.3"/><circle cx="18.5" cy="17" r="3.3"/><path d="M5.5 17h6l3-5h4M9 7h3l2.5 5M14.5 12 12 7"/>',
  flag: '<path d="M5 21V4M5 4h11l-2 4 2 4H5"/>',
  star: '<path d="M12 3l2.6 6.3L21 10l-5 4.2L17.5 21 12 17.3 6.5 21 8 14.2 3 10l6.4-.7z"/>',
  gift: '<rect x="3" y="9" width="18" height="12" rx="1.5"/><path d="M3 13h18M12 9v12M8 9a2.5 2.5 0 1 1 4-2c2-1 4 0 4 2"/>',
  layers: '<path d="m12 3 9 5-9 5-9-5z"/><path d="m3 13 9 5 9-5M3 17l9 5 9-5"/>',
  sun: '<circle cx="12" cy="12" r="4.5"/><path d="M12 2v2M12 20v2M4 12H2M22 12h-2M5 5l1.5 1.5M17.5 17.5 19 19M19 5l-1.5 1.5M6.5 17.5 5 19"/>',
  users: '<circle cx="9" cy="8" r="3.2"/><path d="M3 20a6 6 0 0 1 12 0"/><path d="M16 5.5a3 3 0 0 1 0 5.8M21 20a6 6 0 0 0-4-5.6"/>',
  search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>',
  map: '<path d="M9 4 3 6v14l6-2 6 2 6-2V4l-6 2-6-2z"/><path d="M9 4v14M15 6v14"/>',
  pin: '<path d="M12 21s7-6 7-11a7 7 0 0 0-14 0c0 5 7 11 7 11z"/><circle cx="12" cy="10" r="2.5"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  grid: '<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>',
  car: '<path d="M5 13l1.5-5h11L19 13M5 13h14v4H5zM5 13H3M19 13h2"/><circle cx="7.5" cy="17" r="1.4"/><circle cx="16.5" cy="17" r="1.4"/>',
  receipt: '<path d="M6 3h12v18l-3-2-3 2-3-2-3 2zM9 8h6M9 12h6"/>',
  bell: '<path d="M6 9a6 6 0 0 1 12 0c0 6 2 7 2 7H4s2-1 2-7z"/><path d="M10 20a2 2 0 0 0 4 0"/>',
  home: '<path d="m3 11 9-8 9 8M5 10v10h14V10"/>',
  user: '<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',
  heart: '<path d="M12 20s-7-4.6-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.4-7 10-7 10z"/>',
  sport: '<circle cx="5.5" cy="17" r="3"/><circle cx="18.5" cy="17" r="3"/><path d="M5.5 17 10 9h5l2 4M8 9h7"/>',
  street: '<circle cx="6" cy="17" r="2.8"/><circle cx="18" cy="17" r="2.8"/><path d="M6 17h5l4-6h3M10 8h4"/>',
  cruiser: '<circle cx="6" cy="16" r="3"/><circle cx="18" cy="16" r="3"/><path d="M6 16h7l3-4h4M9 9h5"/>',
  adventure: '<circle cx="6" cy="16.5" r="3"/><circle cx="18" cy="16.5" r="3"/><path d="M6 16.5 10 8h4l3 5M8 8h6M12 5v3"/>',
  scooter: '<circle cx="6" cy="17" r="2.6"/><circle cx="18" cy="17" r="2.6"/><path d="M6 17h8l2-9h2M12 11h3"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  chevron: '<path d="m6 9 6 6 6-6"/>',
  logo: '<circle cx="6" cy="16" r="2.6"/><circle cx="17" cy="16" r="2.6"/><path d="M6 16h6l3-6h3M10 8h3l2 4"/>',
};

export default function Icon({ name, className, filled }: { name: IconName; className?: string; filled?: boolean }) {
  return (
    <svg
      className={className}
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill={filled ? 'currentColor' : 'none'}
      stroke={filled ? 'none' : 'currentColor'}
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      dangerouslySetInnerHTML={{ __html: P[name] || P.wrench }}
    />
  );
}
