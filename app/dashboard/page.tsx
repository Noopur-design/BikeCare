'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import Logo from '@/components/Logo';
import Icon from '@/components/Icon';
import Select from '@/components/Select';
import { toast } from '@/components/Toast';
import { Stagger, Item, Counter } from '@/components/Motion';
import { OFFERS, IMG, money, type IconName } from '@/lib/data';
import styles from './page.module.css';

/* ---------- panel registry ---------- */
type PanelKey =
  | 'overview' | 'upcoming' | 'status' | 'history' | 'saved'
  | 'invoices' | 'offers' | 'addresses' | 'notifications' | 'profile';

const NAV: { key: PanelKey; label: string; icon: IconName }[] = [
  { key: 'overview', label: 'Overview', icon: 'grid' },
  { key: 'upcoming', label: 'Upcoming Service', icon: 'calendar' },
  { key: 'status', label: 'Service Status', icon: 'truck' },
  { key: 'history', label: 'Service History', icon: 'clock' },
  { key: 'saved', label: 'Saved Bikes', icon: 'heart' },
  { key: 'invoices', label: 'Invoices', icon: 'receipt' },
  { key: 'offers', label: 'Offers', icon: 'gift' },
  { key: 'addresses', label: 'Addresses', icon: 'pin' },
  { key: 'notifications', label: 'Notifications', icon: 'bell' },
  { key: 'profile', label: 'Profile', icon: 'user' },
];

const BOTTOM: PanelKey[] = ['overview', 'upcoming', 'status', 'offers', 'profile'];

const TITLES: Record<PanelKey, string> = {
  overview: 'Overview',
  upcoming: 'Upcoming Service',
  status: 'Service Status',
  history: 'Service History',
  saved: 'Saved Bikes',
  invoices: 'Invoices',
  offers: 'Offers & Rewards',
  addresses: 'Saved Addresses',
  notifications: 'Notifications',
  profile: 'My Profile',
};

/* ---------- demo customer data ---------- */
const USER = { name: 'Arjun Mehta', email: 'arjun.mehta@gmail.com', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80' };

const TRACK: { title: string; time: string; state: 'is-done' | 'is-current' | 'is-upcoming'; icon: IconName }[] = [
  { title: 'Booking Confirmed', time: 'Today · 9:12 AM', state: 'is-done', icon: 'check' },
  { title: 'Rider Picked Up', time: 'Today · 10:45 AM', state: 'is-done', icon: 'truck' },
  { title: 'In Workshop — Servicing', time: 'In progress', state: 'is-current', icon: 'wrench' },
  { title: 'Quality Check', time: 'Est. 3:30 PM', state: 'is-upcoming', icon: 'shield' },
  { title: 'Out for Delivery', time: 'Est. 5:00 PM', state: 'is-upcoming', icon: 'flag' },
];

const HISTORY: { id: string; date: string; service: string; bike: string; amount: number; status: 'Completed' | 'Cancelled' }[] = [
  { id: 'INV-2091', date: '18 Sep 2026', service: 'Premium Service', bike: 'RE Classic 350', amount: 1499, status: 'Completed' },
  { id: 'INV-2044', date: '02 Aug 2026', service: 'Oil Change', bike: 'Honda Activa 6G', amount: 399, status: 'Completed' },
  { id: 'INV-1998', date: '20 Jun 2026', service: 'Brake Service', bike: 'RE Classic 350', amount: 599, status: 'Completed' },
  { id: 'INV-1952', date: '11 May 2026', service: 'General Service', bike: 'KTM Duke 390', amount: 499, status: 'Completed' },
  { id: 'INV-1907', date: '28 Mar 2026', service: 'Bike Washing', bike: 'Honda Activa 6G', amount: 299, status: 'Cancelled' },
];

const SAVED_BIKES: { brand: string; model: string; reg: string; img: string; icon: IconName }[] = [
  { brand: 'Royal Enfield', model: 'Classic 350', reg: 'KA 01 AB 1234', img: IMG.cruiser, icon: 'cruiser' },
  { brand: 'Honda', model: 'Activa 6G', reg: 'KA 05 XY 7788', img: IMG.scooter, icon: 'scooter' },
  { brand: 'KTM', model: 'Duke 390', reg: 'KA 03 ZZ 4567', img: IMG.sport, icon: 'sport' },
];

const ADDRESSES: { label: string; icon: IconName; line: string }[] = [
  { label: 'Home', icon: 'home', line: '14 Jasmine Residency, 5th Cross, Indiranagar, Bengaluru 560038' },
  { label: 'Work', icon: 'map', line: 'Level 3, Prestige Tech Park, Marathahalli, Bengaluru 560103' },
];

const NOTIFS: { icon: IconName; text: string; time: string; unread: boolean }[] = [
  { icon: 'truck', text: 'Your rider Suresh has picked up your Classic 350 for servicing.', time: '25 min ago', unread: true },
  { icon: 'wrench', text: 'Servicing has started — engine oil and 40-point inspection underway.', time: '1 hr ago', unread: true },
  { icon: 'gift', text: 'New offer unlocked: 20% off your next premium service with WEEKDAY20.', time: 'Yesterday', unread: false },
  { icon: 'receipt', text: 'Invoice INV-2091 for your Premium Service is ready to download.', time: '2 days ago', unread: false },
  { icon: 'star', text: 'You earned 45 loyalty points from your last service. Keep it up!', time: '5 days ago', unread: false },
];

const CITIES = ['Bengaluru', 'Mumbai', 'Delhi', 'Hyderabad', 'Pune', 'Chennai', 'Kolkata'];

const emailOk = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
const phoneOk = (v: string) => v.replace(/\D/g, '').length >= 10;

function Panel({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function TrackTimeline({ steps }: { steps: typeof TRACK }) {
  return (
    <div className="track-timeline">
      {steps.map((s) => (
        <div className={`track-step ${s.state}`} key={s.title}>
          <span className="track-step__dot"><Icon name={s.icon} /></span>
          <div>
            <div className="track-step__title">{s.title}</div>
            <div className="track-step__time">{s.time}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function DashboardPage() {
  const router = useRouter();
  const [active, setActive] = useState<PanelKey>('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  /* profile form */
  const [pName, setPName] = useState(USER.name);
  const [pEmail, setPEmail] = useState(USER.email);
  const [pPhone, setPPhone] = useState('+91 98765 43210');
  const [pCity, setPCity] = useState('Bengaluru');
  const [pErr, setPErr] = useState<Record<string, string>>({});

  /* mobile off-canvas: toggle a body class so globals.css can slide the sidebar */
  useEffect(() => {
    document.body.classList.toggle('dash-open', sidebarOpen);
    return () => document.body.classList.remove('dash-open');
  }, [sidebarOpen]);

  const go = (key: PanelKey) => {
    setActive(key);
    setSidebarOpen(false);
    if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const logout = () => {
    toast('You have been logged out. Ride safe!', { type: 'info', title: 'Logged out' });
    router.push('/');
  };

  const saveProfile = () => {
    const e: Record<string, string> = {};
    if (!pName.trim()) e.name = 'Enter your full name';
    if (!pEmail.trim()) e.email = 'Enter your email';
    else if (!emailOk(pEmail)) e.email = 'Enter a valid email address';
    if (!pPhone.trim()) e.phone = 'Enter your phone number';
    else if (!phoneOk(pPhone)) e.phone = 'Enter a valid phone number';
    if (!pCity) e.city = 'Select your city';
    setPErr(e);
    if (Object.keys(e).length) {
      toast('Please fix the highlighted fields before saving.', { type: 'error', title: 'Check your details' });
      return;
    }
    toast('Your profile has been updated successfully.', { type: 'success', title: 'Profile saved' });
  };

  return (
    <div className="dash">
      {/* ============ SIDEBAR ============ */}
      <aside className={`dash__side ${styles.side}`}>
        <button type="button" className={styles.closeBtn} aria-label="Close menu" onClick={() => setSidebarOpen(false)}>
          <span style={{ display: 'grid', transform: 'rotate(45deg)' }}><Icon name="plus" /></span>
        </button>

        <Logo />

        <div className={styles.profile}>
          <span className={styles.avatar}><img src={USER.avatar} alt={USER.name} /></span>
          <span className={styles.profileMeta}>
            <strong>{USER.name}</strong>
            <span>{USER.email}</span>
          </span>
        </div>

        <div className={styles.navScroll}>
          <nav className="dash__nav" aria-label="Dashboard sections">
            {NAV.map((n) => (
              <button
                type="button"
                key={n.key}
                className={active === n.key ? 'is-active' : ''}
                aria-current={active === n.key ? 'page' : undefined}
                onClick={() => go(n.key)}
              >
                <Icon name={n.icon} />
                {n.label}
              </button>
            ))}
          </nav>
        </div>

        <button type="button" className={styles.logout} onClick={logout}>
          <Icon name="arrow" />
          Log out
        </button>
      </aside>

      {/* ============ SCRIM (mobile) ============ */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            className={styles.scrim}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSidebarOpen(false)}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      {/* ============ MAIN ============ */}
      <div className="dash__main">
        <div className={styles.topbar}>
          <button
            type="button"
            className={styles.menuBtn}
            aria-label="Open menu"
            aria-expanded={sidebarOpen}
            onClick={() => setSidebarOpen((o) => !o)}
          >
            <Icon name="grid" />
          </button>
          <div className={styles.topbarTitle}>
            <span className="eyebrow">Dashboard</span>
            <h1>{TITLES[active]}</h1>
          </div>
          <Link className="btn btn--primary" href="/book">
            Book a Service <span className="btn__arrow" aria-hidden="true">→</span>
          </Link>
        </div>

        <AnimatePresence mode="wait">
          <Panel key={active}>
            {active === 'overview' && (
              <div className="stack" style={{ gap: '2rem' }}>
                <div>
                  <h2 className="h3">Welcome back, {USER.name.split(' ')[0]} 👋</h2>
                  <p className="muted mt-1">Here&rsquo;s what&rsquo;s happening with your rides today.</p>
                </div>

                <Stagger className="grid grid--4">
                  {[
                    { icon: 'calendar' as IconName, num: 1, label: 'Upcoming' },
                    { icon: 'wrench' as IconName, num: 1, label: 'In Progress' },
                    { icon: 'receipt' as IconName, num: 14, label: 'Total Services' },
                    { icon: 'star' as IconName, num: 320, label: 'Loyalty Points' },
                  ].map((s) => (
                    <Item key={s.label}>
                      <div className="card dash-card">
                        <span className="icon-badge"><Icon name={s.icon} /></span>
                        <div className="dash-stat__num mt-2"><Counter to={s.num} /></div>
                        <div className="muted small">{s.label}</div>
                      </div>
                    </Item>
                  ))}
                </Stagger>

                <div className="split" style={{ alignItems: 'start', gap: '1.5rem' }}>
                  <div className="card card--pad">
                    <div className="between" style={{ marginBottom: '1.25rem' }}>
                      <h3 className="h4">Current Service</h3>
                      <span className="badge badge--live badge--dot">Live</span>
                    </div>
                    <p className="muted small" style={{ marginBottom: '1.5rem' }}>
                      Royal Enfield Classic 350 · Premium Service · <b>{money(1499)}</b>
                    </p>
                    <TrackTimeline steps={TRACK.slice(0, 4)} />
                    <button type="button" className="btn btn--secondary btn--block mt-3" onClick={() => go('status')}>
                      View full status <span className="btn__arrow" aria-hidden="true">→</span>
                    </button>
                  </div>

                  <div className="card card--pad">
                    <h3 className="h4" style={{ marginBottom: '1.25rem' }}>Quick Actions</h3>
                    <div className="stack" style={{ gap: '0.75rem' }}>
                      <Link className="btn btn--primary btn--block" href="/book">Book a Service <span className="btn__arrow" aria-hidden="true">→</span></Link>
                      <button type="button" className="btn btn--secondary btn--block" onClick={() => go('status')}>Track My Bike <span className="btn__arrow" aria-hidden="true">→</span></button>
                      <button type="button" className="btn btn--secondary btn--block" onClick={() => go('offers')}>View Offers <span className="btn__arrow" aria-hidden="true">→</span></button>
                      <button type="button" className="btn btn--secondary btn--block" onClick={() => go('saved')}>Manage Bikes <span className="btn__arrow" aria-hidden="true">→</span></button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {active === 'upcoming' && (
              <div className="card card--pad" style={{ maxWidth: 720 }}>
                <div className="between" style={{ marginBottom: '1.5rem' }}>
                  <div>
                    <span className="badge badge--dot">Scheduled</span>
                    <h2 className="h3 mt-2">Premium Service</h2>
                    <p className="muted mt-1">Royal Enfield Classic 350 · KA 01 AB 1234</p>
                  </div>
                  <span className="icon-badge icon-badge--lg"><Icon name="calendar" /></span>
                </div>

                <div className="grid grid--2" style={{ gap: '1rem' }}>
                  {[
                    ['Date', 'Fri, 03 Oct 2026'],
                    ['Time Slot', '10:00 AM'],
                    ['Pickup', 'Home Pickup (Free)'],
                    ['Estimate', money(1499)],
                  ].map(([k, v]) => (
                    <div className="glass" key={k} style={{ padding: '1rem 1.15rem', borderRadius: 'var(--r-md)' }}>
                      <div className="tag">{k}</div>
                      <div className="serif" style={{ fontSize: '1.15rem', fontWeight: 600, marginTop: '0.25rem' }}>{v}</div>
                    </div>
                  ))}
                </div>

                <div className="cluster mt-4" style={{ gap: '0.75rem' }}>
                  <button type="button" className="btn btn--primary" onClick={() => toast('Reschedule request sent — we&rsquo;ll confirm your new slot shortly.', { type: 'success', title: 'Reschedule requested' })}>
                    Reschedule <span className="btn__arrow" aria-hidden="true">→</span>
                  </button>
                  <button type="button" className="btn btn--secondary" onClick={() => toast('Your upcoming service has been cancelled. Any refund is processed in 5–7 days.', { type: 'info', title: 'Booking cancelled' })}>
                    Cancel booking
                  </button>
                </div>
              </div>
            )}

            {active === 'status' && (
              <div className="card card--pad" style={{ maxWidth: 720 }}>
                <div className="between" style={{ marginBottom: '1.75rem' }}>
                  <div>
                    <h2 className="h4">Royal Enfield Classic 350</h2>
                    <p className="muted small mt-1">Premium Service · Booking ID BC-482910</p>
                  </div>
                  <span className="badge badge--live">In Progress</span>
                </div>
                <TrackTimeline steps={TRACK} />
                <div className="glass mt-3" style={{ padding: '1rem 1.15rem', borderRadius: 'var(--r-md)', display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                  <span className="icon-badge"><Icon name="phone" /></span>
                  <div>
                    <div style={{ fontWeight: 600 }}>Need help with this service?</div>
                    <div className="muted small">Call our team on +91 98765 43210</div>
                  </div>
                </div>
              </div>
            )}

            {active === 'history' && (
              <div className="card" style={{ overflow: 'hidden' }}>
                <div className="compare-wrap" style={{ border: 'none', borderRadius: 0, background: 'transparent' }}>
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Date</th><th>Service</th><th>Bike</th><th>Amount</th><th>Status</th><th>Invoice</th>
                      </tr>
                    </thead>
                    <tbody>
                      {HISTORY.map((h) => (
                        <tr key={h.id}>
                          <td>{h.date}</td>
                          <td style={{ fontWeight: 600 }}>{h.service}</td>
                          <td className="muted">{h.bike}</td>
                          <td className="serif" style={{ fontWeight: 600 }}>{money(h.amount)}</td>
                          <td>
                            <span className={`badge ${h.status === 'Completed' ? '' : 'badge--ink'}`}>{h.status}</span>
                          </td>
                          <td>
                            <button type="button" className="link-arrow" onClick={() => toast(`Downloading invoice ${h.id}…`, { type: 'success', title: 'Invoice' })}>
                              Download <span className="btn__arrow" aria-hidden="true">→</span>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {active === 'saved' && (
              <div className="stack" style={{ gap: '1.5rem' }}>
                <Stagger className="grid grid--3">
                  {SAVED_BIKES.map((b) => (
                    <Item key={b.reg}>
                      <article className="card card--hover" style={{ overflow: 'hidden', height: '100%' }}>
                        <div className="card__media"><img src={b.img} alt={`${b.brand} ${b.model}`} loading="lazy" /></div>
                        <div className="card--pad" style={{ display: 'grid', gap: '0.4rem' }}>
                          <div className="between">
                            <h3 className="h4">{b.model}</h3>
                            <span className="icon-badge"><Icon name={b.icon} /></span>
                          </div>
                          <p className="muted small">{b.brand}</p>
                          <span className="tag" style={{ letterSpacing: '0.08em' }}>{b.reg}</span>
                          <div className="cluster mt-2" style={{ gap: '0.5rem' }}>
                            <Link className="btn btn--primary btn--sm" href="/book">Book Service</Link>
                            <button type="button" className="btn btn--secondary btn--sm" onClick={() => toast(`${b.brand} ${b.model} removed from saved bikes.`, { type: 'info', title: 'Bike removed' })}>Remove</button>
                          </div>
                        </div>
                      </article>
                    </Item>
                  ))}
                </Stagger>
                <button type="button" className="btn btn--secondary" style={{ width: 'fit-content' }} onClick={() => toast('Add a new bike to your garage to book faster next time.', { type: 'info', title: 'Add bike' })}>
                  <span aria-hidden="true">＋</span> Add a bike
                </button>
              </div>
            )}

            {active === 'invoices' && (
              <div className="card" style={{ overflow: 'hidden' }}>
                {HISTORY.filter((h) => h.status === 'Completed').map((h) => (
                  <div className={styles.invoiceRow} key={h.id}>
                    <span className="icon-badge"><Icon name="receipt" /></span>
                    <div style={{ marginRight: 'auto', minWidth: 0 }}>
                      <div style={{ fontWeight: 600 }}>{h.id}</div>
                      <div className="muted small">{h.date} · {h.service}</div>
                    </div>
                    <span className="serif" style={{ fontWeight: 600, fontSize: '1.1rem' }}>{money(h.amount)}</span>
                    <button type="button" className="btn btn--secondary btn--sm" onClick={() => toast(`Downloading invoice ${h.id}…`, { type: 'success', title: 'Invoice ready' })}>
                      Download
                    </button>
                  </div>
                ))}
              </div>
            )}

            {active === 'offers' && (
              <Stagger className="grid grid--3">
                {OFFERS.map((o) => (
                  <Item key={o.code} as="article">
                    <div className="offer-card card card--hover">
                      <div className="between" style={{ marginBottom: '1.1rem' }}>
                        <span className="icon-badge"><Icon name={o.icon} /></span>
                        <span className="tag">{o.tag}</span>
                      </div>
                      <div className="offer-card__discount">{o.discount}</div>
                      <h3 className="h4 mt-1">{o.title}</h3>
                      <p className="muted small mt-1" style={{ flex: 1 }}>{o.desc}</p>
                      <div className="offer-card__code" style={{ width: '100%', marginTop: '1.25rem', justifyContent: 'space-between' }}>
                        {o.code}
                        <button type="button" className="offer-card__copy" onClick={() => { navigator.clipboard?.writeText(o.code).catch(() => {}); toast(`Coupon ${o.code} copied to clipboard.`, { type: 'success', title: 'Copied' }); }}>
                          Copy
                        </button>
                      </div>
                    </div>
                  </Item>
                ))}
              </Stagger>
            )}

            {active === 'addresses' && (
              <div className="stack" style={{ gap: '1.5rem' }}>
                <div className="grid grid--2">
                  {ADDRESSES.map((a) => (
                    <div className="card card--pad" key={a.label}>
                      <div className="between" style={{ marginBottom: '0.85rem' }}>
                        <span className="cluster" style={{ gap: '0.6rem' }}>
                          <span className="icon-badge"><Icon name={a.icon} /></span>
                          <strong>{a.label}</strong>
                        </span>
                        <span className="badge">Default</span>
                      </div>
                      <p className="muted">{a.line}</p>
                      <div className="cluster mt-3" style={{ gap: '0.5rem' }}>
                        <button type="button" className="btn btn--secondary btn--sm" onClick={() => toast(`Edit your ${a.label.toLowerCase()} address.`, { type: 'info', title: 'Edit address' })}>Edit</button>
                        <button type="button" className="btn btn--secondary btn--sm" onClick={() => toast(`${a.label} address removed.`, { type: 'info', title: 'Address removed' })}>Remove</button>
                      </div>
                    </div>
                  ))}
                </div>
                <button type="button" className="btn btn--secondary" style={{ width: 'fit-content' }} onClick={() => toast('Add a new pickup address to your account.', { type: 'info', title: 'Add address' })}>
                  <span aria-hidden="true">＋</span> Add new address
                </button>
              </div>
            )}

            {active === 'notifications' && (
              <div className="card" style={{ overflow: 'hidden' }}>
                {NOTIFS.map((n, i) => (
                  <div className={`${styles.notifRow}${n.unread ? ' ' + styles.unread : ''}`} key={i}>
                    <span className="icon-badge"><Icon name={n.icon} /></span>
                    <div style={{ minWidth: 0 }}>
                      <p>{n.text}</p>
                      <div className="muted tiny mt-1">{n.time}</div>
                    </div>
                    {n.unread && <span className={styles.notifDot} aria-label="Unread" />}
                  </div>
                ))}
              </div>
            )}

            {active === 'profile' && (
              <div className="card card--pad" style={{ maxWidth: 640 }}>
                <div className="form">
                  <div className="form-row">
                    <div className={`field${pErr.name ? ' has-error' : ''}`}>
                      <label className="field__label" htmlFor="pname">Full Name <span className="req">*</span></label>
                      <input id="pname" className="input" value={pName} onChange={(e) => { setPName(e.target.value); setPErr((p) => ({ ...p, name: '' })); }} />
                      <span className="field__error">{pErr.name || 'This field is required'}</span>
                    </div>
                    <div className={`field${pErr.phone ? ' has-error' : ''}`}>
                      <label className="field__label" htmlFor="pphone">Phone <span className="req">*</span></label>
                      <input id="pphone" type="tel" className="input" value={pPhone} onChange={(e) => { setPPhone(e.target.value); setPErr((p) => ({ ...p, phone: '' })); }} />
                      <span className="field__error">{pErr.phone || 'This field is required'}</span>
                    </div>
                  </div>
                  <div className={`field${pErr.email ? ' has-error' : ''}`}>
                    <label className="field__label" htmlFor="pemail">Email <span className="req">*</span></label>
                    <input id="pemail" type="email" className="input" value={pEmail} onChange={(e) => { setPEmail(e.target.value); setPErr((p) => ({ ...p, email: '' })); }} />
                    <span className="field__error">{pErr.email || 'This field is required'}</span>
                  </div>
                  <div className={`field${pErr.city ? ' has-error' : ''}`}>
                    <label className="field__label" htmlFor="pcity">City <span className="req">*</span></label>
                    <Select id="pcity" ariaLabel="City" placeholder="Select city" value={pCity} invalid={!!pErr.city} onChange={(v) => { setPCity(v); setPErr((p) => ({ ...p, city: '' })); }} options={CITIES} />
                    <span className="field__error">{pErr.city || 'This field is required'}</span>
                  </div>
                  <label className="checkbox" style={{ marginTop: '0.25rem' }}>
                    <input type="checkbox" defaultChecked />
                    <span className="checkbox__box"><Icon name="check" /></span>
                    <span>Send me service reminders &amp; exclusive offers</span>
                  </label>
                  <div className="cluster" style={{ gap: '0.75rem', marginTop: '0.5rem' }}>
                    <button type="button" className="btn btn--primary" onClick={saveProfile}>
                      Save Changes <span className="btn__arrow" aria-hidden="true">→</span>
                    </button>
                    <button type="button" className="btn btn--secondary" onClick={() => { setPName(USER.name); setPEmail(USER.email); setPPhone('+91 98765 43210'); setPCity('Bengaluru'); setPErr({}); toast('Changes discarded.', { type: 'info', title: 'Reset' }); }}>
                      Reset
                    </button>
                  </div>
                </div>
              </div>
            )}
          </Panel>
        </AnimatePresence>
      </div>

      {/* ============ MOBILE BOTTOM NAV ============ */}
      <nav className="dash__bottom-nav" aria-label="Quick navigation">
        {BOTTOM.map((key) => {
          const item = NAV.find((n) => n.key === key)!;
          return (
            <button
              type="button"
              key={key}
              className={active === key ? 'is-active' : ''}
              aria-current={active === key ? 'page' : undefined}
              onClick={() => go(key)}
            >
              <Icon name={item.icon} />
              {item.label.replace(' Service', '')}
            </button>
          );
        })}
      </nav>
    </div>
  );
}
