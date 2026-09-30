'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Icon from './Icon';
import Logo from './Logo';
import { SERVICES, BIKE_TYPES, IMG, type IconName } from '@/lib/data';

const NAV = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services', menu: 'services' as const },
  { label: 'Bike Types', href: '/services', menu: 'types' as const },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Offers', href: '/offers' },
  { label: 'How It Works', href: '/how-it-works' },
];

const SEARCH_INDEX: [string, string, IconName][] = [
  ['Home', '/', 'home'], ['All Services', '/services', 'wrench'], ['Pricing Plans', '/pricing', 'tag'],
  ['Special Offers', '/offers', 'gift'], ['How It Works', '/how-it-works', 'grid'],
  ['Book a Service', '/book', 'calendar'], ['Track Service', '/track', 'pin'], ['About Us', '/about', 'users'],
  ['Testimonials', '/testimonials', 'star'], ['FAQ', '/faq', 'search'], ['Contact', '/contact', 'phone'],
  ['Customer Dashboard', '/dashboard', 'user'], ['Login / Signup', '/login', 'user'],
  ...SERVICES.map((s) => [s.name, `/services/${s.slug}`, s.icon] as [string, string, IconName]),
];

const EASE = [0.22, 1, 0.36, 1] as const;

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState<string | null>(null);
  const [mobile, setMobile] = useState(false);
  const [mobileAcc, setMobileAcc] = useState<string | null>(null);
  const [search, setSearch] = useState(false);
  const [q, setQ] = useState('');
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24);
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);

  useEffect(() => { setMobile(false); setOpen(null); setSearch(false); }, [pathname]);
  useEffect(() => {
    document.body.style.overflow = mobile || search ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobile, search]);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { setSearch(false); setMobile(false); setOpen(null); }
      if ((e.key === '/' || (e.key.toLowerCase() === 'k' && (e.metaKey || e.ctrlKey)))
        && !/input|textarea/i.test((document.activeElement?.tagName) || '')) { e.preventDefault(); setSearch(true); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const enter = (menu: string) => { if (closeTimer.current) clearTimeout(closeTimer.current); setOpen(menu); };
  const leave = () => { closeTimer.current = setTimeout(() => setOpen(null), 120); };

  const isActive = (href: string) => href === '/' ? pathname === '/' : pathname.startsWith(href);

  const results = q.trim()
    ? SEARCH_INDEX.filter((i) => i[0].toLowerCase().includes(q.trim().toLowerCase()))
    : SEARCH_INDEX.slice(0, 7);

  return (
    <>
      <nav className={`nav${scrolled ? ' is-scrolled' : ''}`} aria-label="Primary">
        <div className="container container--wide nav__inner">
          <Logo />
          <ul className="nav__menu">
            {NAV.map((item) => (
              <li
                key={item.label}
                className="nav__item"
                data-open={open === item.menu}
                onMouseEnter={() => item.menu && enter(item.menu)}
                onMouseLeave={() => item.menu && leave()}
              >
                <Link
                  className={`nav__link${isActive(item.href) && !item.menu ? ' is-active' : ''}`}
                  href={item.href}
                  aria-haspopup={item.menu ? 'true' : undefined}
                  aria-expanded={item.menu ? open === item.menu : undefined}
                >
                  {item.label}
                  {item.menu && <Icon name="chevron" className="caret" />}
                </Link>

                <AnimatePresence>
                  {item.menu && open === item.menu && (
                    <motion.div
                      className={item.menu === 'services' ? 'mega mega--left' : 'mega'}
                      initial={{ opacity: 0, y: 12, filter: 'blur(6px)' }}
                      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                      exit={{ opacity: 0, y: 8, filter: 'blur(6px)' }}
                      transition={{ duration: 0.28, ease: EASE }}
                      onMouseEnter={() => enter(item.menu!)}
                      onMouseLeave={leave}
                    >
                      {item.menu === 'services' ? <ServicesMega /> : <TypesMega />}
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            ))}
          </ul>

          <div className="nav__right">
            <button className="nav__icon-btn" aria-label="Search" onClick={() => setSearch(true)}><Icon name="search" /></button>
            <Link className="nav__track" href="/track">Track Service</Link>
            <Link className="btn btn--primary btn--sm nav__cta" href="/book">Book a Service <span className="btn__arrow" aria-hidden="true">→</span></Link>
            <button className="nav__burger" aria-label="Menu" aria-expanded={mobile} data-open={mobile} onClick={() => setMobile((v) => !v)}><span /></button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobile && (
          <motion.div
            className="mobile-menu"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35, ease: EASE }}
          >
            <Link className="mobile-menu__link" href="/">Home</Link>
            <MobileAcc label="Services" open={mobileAcc === 'services'} onToggle={() => setMobileAcc(mobileAcc === 'services' ? null : 'services')}>
              {SERVICES.map((s) => (
                <Link key={s.slug} href={`/services/${s.slug}`}><Icon name={s.icon} /> {s.name}</Link>
              ))}
              <Link href="/services"><Icon name="grid" /> View all services</Link>
            </MobileAcc>
            <MobileAcc label="Bike Types" open={mobileAcc === 'types'} onToggle={() => setMobileAcc(mobileAcc === 'types' ? null : 'types')}>
              {BIKE_TYPES.map((t) => (
                <Link key={t.slug} href={`/services#${t.slug}`}><Icon name={t.icon} /> {t.name}</Link>
              ))}
            </MobileAcc>
            <Link className="mobile-menu__link" href="/pricing">Pricing</Link>
            <Link className="mobile-menu__link" href="/offers">Offers</Link>
            <Link className="mobile-menu__link" href="/how-it-works">How It Works</Link>
            <MobileAcc label="More" open={mobileAcc === 'more'} onToggle={() => setMobileAcc(mobileAcc === 'more' ? null : 'more')}>
              <Link href="/about"><Icon name="users" /> About Us</Link>
              <Link href="/testimonials"><Icon name="star" /> Testimonials</Link>
              <Link href="/faq"><Icon name="search" /> FAQ</Link>
              <Link href="/contact"><Icon name="phone" /> Contact</Link>
              <Link href="/track"><Icon name="pin" /> Track Service</Link>
              <Link href="/login"><Icon name="user" /> Login / Signup</Link>
            </MobileAcc>
            <div className="mobile-menu__cta">
              <Link className="btn btn--secondary btn--block" href="/track">Track Service <span className="btn__arrow" aria-hidden="true">→</span></Link>
              <Link className="btn btn--primary btn--block btn--lg" href="/book">Book a Service <span className="btn__arrow" aria-hidden="true">→</span></Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Search overlay */}
      <AnimatePresence>
        {search && (
          <motion.div
            className="search-overlay"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => { if (e.target === e.currentTarget) setSearch(false); }}
          >
            <motion.div className="search-box" initial={{ y: -16, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -16, opacity: 0 }} transition={{ duration: 0.28, ease: EASE }}>
              <div className="search-box__field">
                <Icon name="search" />
                {/* eslint-disable-next-line jsx-a11y/no-autofocus */}
                <input autoFocus type="text" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search services, pages, bikes…" aria-label="Search" />
                <button className="chip" onClick={() => setSearch(false)}>Esc</button>
              </div>
              <div className="search-box__results">
                {results.length ? results.map(([name, href, ic]) => (
                  <Link key={name + href} href={href} onClick={() => setSearch(false)}><Icon name={ic} /><span>{name}</span></Link>
                )) : (
                  <div style={{ padding: '1.5rem', textAlign: 'center', color: 'var(--ink-2)' }}>No results for “{q}”. Try “oil” or “brake”.</div>
                )}
              </div>
              <p className="search-box__hint">Search across BIKECARE — services, offers, pages and more.</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function ServicesMega() {
  return (
    <div className="mega__panel">
      <Link className="mega__feature" href="/services">
        <img src={IMG.workshop} alt="BIKECARE workshop" />
        <span className="eyebrow">Popular</span>
        <h4>Complete care for every ride</h4>
        <p>8 expert services, genuine parts and free doorstep pickup.</p>
        <span className="btn btn--primary btn--sm">Explore all <span className="btn__arrow" aria-hidden="true">→</span></span>
      </Link>
      <div className="mega__links">
        {SERVICES.map((s) => (
          <Link key={s.slug} className="mega__link" href={`/services/${s.slug}`}>
            <span className="mega__ico"><Icon name={s.icon} /></span>
            <span className="mega__txt"><strong>{s.name}</strong><span>from ₹{s.price}</span></span>
          </Link>
        ))}
      </div>
    </div>
  );
}

function TypesMega() {
  return (
    <div className="mega__panel">
      <Link className="mega__feature" href="/services">
        <img src={IMG.sport} alt="Motorcycle types" />
        <span className="eyebrow">Any machine</span>
        <h4>Find your ride</h4>
        <p>Sports, street, cruiser, adventure and scooters — we service them all.</p>
        <span className="btn btn--primary btn--sm">Browse types <span className="btn__arrow" aria-hidden="true">→</span></span>
      </Link>
      <div className="mega__links mega__links--one">
        {BIKE_TYPES.map((t) => (
          <Link key={t.slug} className="mega__link" href={`/services#${t.slug}`}>
            <span className="mega__ico"><Icon name={t.icon} /></span>
            <span className="mega__txt"><strong>{t.name}</strong><span>{t.desc.split(' ').slice(0, 5).join(' ')}…</span></span>
          </Link>
        ))}
      </div>
    </div>
  );
}

function MobileAcc({ label, open, onToggle, children }: { label: string; open: boolean; onToggle: () => void; children: React.ReactNode }) {
  return (
    <div>
      <button className="mobile-menu__link" onClick={onToggle} aria-expanded={open}>
        {label}
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.3 }} style={{ display: 'grid' }}>
          <Icon name="chevron" className="caret" />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: EASE }} style={{ overflow: 'hidden' }}
          >
            <div className="mobile-menu__sub">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
