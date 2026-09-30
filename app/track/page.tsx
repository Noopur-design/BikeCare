'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Icon from '@/components/Icon';
import { Reveal, Stagger, Item } from '@/components/Motion';
import { toast } from '@/components/Toast';
import { CONTACT, IMG, type IconName } from '@/lib/data';

const EASE = [0.22, 1, 0.36, 1] as const;

type StepStatus = 'done' | 'current' | 'upcoming';
interface TrackStep {
  icon: IconName;
  title: string;
  time: string;
  note: string;
  status: StepStatus;
}

const TIMELINE: TrackStep[] = [
  { icon: 'calendar', title: 'Booking Confirmed', time: 'Today, 9:12 AM', note: 'Your slot is locked in with our Indiranagar workshop.', status: 'done' },
  { icon: 'truck', title: 'Bike Picked Up', time: 'Today, 10:05 AM', note: 'Collected from your doorstep by rider Imran.', status: 'done' },
  { icon: 'search', title: 'Inspection', time: 'Today, 11:20 AM', note: '30-point diagnostic completed, quote approved.', status: 'done' },
  { icon: 'wrench', title: 'Service in Progress', time: 'Today, 1:45 PM', note: 'Oil, filter and chain care underway.', status: 'done' },
  { icon: 'shield', title: 'Quality Check', time: 'In progress', note: 'Final multi-point road-readiness inspection.', status: 'current' },
  { icon: 'badge', title: 'Ready for Delivery', time: 'Est. 6:00 PM', note: 'Bike cleaned, polished and prepped for handover.', status: 'upcoming' },
  { icon: 'flag', title: 'Delivered', time: 'Est. 6:30 PM', note: 'Back at your doorstep, road-ready.', status: 'upcoming' },
];

const PROGRESS = 72;

export default function TrackPage() {
  const [id, setId] = useState('');
  const [tracked, setTracked] = useState<string | null>(null);

  const onTrack = (ev?: React.FormEvent) => {
    ev?.preventDefault();
    const clean = id.trim().toUpperCase();
    if (!/^BC\d+$/.test(clean)) {
      toast('Booking IDs start with "BC" followed by numbers, e.g. BC482193.', {
        type: 'error',
        title: 'Invalid Booking ID',
      });
      setTracked(null);
      return;
    }
    setTracked(clean);
    toast('Booking found — showing your live service status.', { type: 'success', title: 'Tracking live' });
  };

  const fillDemo = () => {
    setId('BC482193');
    toast('Sample Booking ID added — hit Track to see it live.', { type: 'info' });
  };

  const details: { lbl: string; val: string }[] = [
    { lbl: 'Booking ID', val: tracked || '' },
    { lbl: 'Bike', val: 'Royal Enfield Classic 350' },
    { lbl: 'Service', val: 'General Service' },
    { lbl: 'Booking date', val: '01 Oct 2026' },
  ];

  return (
    <>
      {/* HERO */}
      <section className="page-hero page-hero--center">
        <div className="container container--wide">
          <div className="page-hero__inner">
            <Reveal>
              <nav className="breadcrumbs" style={{ justifyContent: 'center' }}>
                <Link href="/">Home</Link>
                <span className="sep">/</span>
                <span>Track Service</span>
              </nav>
            </Reveal>
            <Reveal delay={0.06}><span className="eyebrow eyebrow--center">Live Tracking</span></Reveal>
            <Reveal delay={0.12}><h1 className="h1 mt-1">Track Your Service</h1></Reveal>
            <Reveal delay={0.18}>
              <p className="lead mt-2">
                Follow your bike through every stage — from doorstep pickup to a road-ready return.
                Enter your Booking ID for a real-time, transparent view of exactly where things stand.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* LOOKUP + RESULTS */}
      <section className="section section--tight">
        <div className="container">
          {/* Lookup card */}
          <Reveal dir="scale">
            <div className="glass card--pad" style={{ maxWidth: 660, margin: '0 auto' }}>
              <form className="form" onSubmit={onTrack} noValidate style={{ gap: '1rem' }}>
                <div className="field">
                  <label className="field__label" htmlFor="booking-id">Booking ID</label>
                  <div
                    className="cluster"
                    style={{ gap: '0.7rem', flexWrap: 'wrap', alignItems: 'stretch' }}
                  >
                    <div className="input-group" style={{ flex: '1 1 240px' }}>
                      <span className="input-group__ico"><Icon name="receipt" /></span>
                      <input
                        id="booking-id"
                        className="input"
                        type="text"
                        inputMode="text"
                        autoComplete="off"
                        placeholder="e.g. BC482193"
                        value={id}
                        onChange={(e) => setId(e.target.value)}
                      />
                    </div>
                    <button type="submit" className="btn btn--primary btn--lg" style={{ flex: '0 0 auto' }}>
                      Track <span className="btn__arrow" aria-hidden="true">→</span>
                    </button>
                  </div>
                </div>
                <div className="between" style={{ gap: '0.75rem' }}>
                  <button type="button" className="link-arrow" onClick={fillDemo}>
                    <Icon name="sparkle" />Try a demo booking
                  </button>
                  <span className="tiny muted">Starts with <b>BC</b> followed by digits</span>
                </div>
              </form>
            </div>
          </Reveal>

          {/* Results / empty */}
          <div className="mt-4">
            {!tracked ? (
              <Reveal>
                <div className="glass" style={{ maxWidth: 660, margin: '0 auto', padding: 'clamp(1.5rem, 4vw, 2.5rem)' }}>
                  <div className="empty">
                    <span className="empty__ico"><Icon name="map" /></span>
                    <h3 className="h4" style={{ marginBottom: '0.4rem' }}>No booking tracked yet</h3>
                    <p className="muted" style={{ maxWidth: '38ch', margin: '0 auto' }}>
                      Enter your Booking ID to see live status.
                    </p>
                  </div>
                </div>
              </Reveal>
            ) : (
              <motion.div
                key={tracked}
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: EASE }}
              >
                <div className="split" style={{ alignItems: 'start' }}>
                  {/* Status summary */}
                  <div className="glass card--pad sticky-panel">
                    <div className="between" style={{ marginBottom: '1.1rem' }}>
                      <span className="badge badge--live">
                        <motion.span
                          aria-hidden="true"
                          style={{ width: 7, height: 7, borderRadius: '50%', background: '#fff', display: 'inline-block' }}
                          animate={{ opacity: [1, 0.25, 1], scale: [1, 0.8, 1] }}
                          transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
                        />
                        Quality Check
                      </span>
                      <span className="tiny muted">#{tracked}</span>
                    </div>

                    <h2 className="h3" style={{ marginBottom: '0.3rem' }}>Almost road-ready.</h2>
                    <p className="hero__trust-item" style={{ color: 'var(--accent-ink)', marginBottom: '1.4rem' }}>
                      <Icon name="clock" />
                      Estimated delivery: Today, 6:30 PM
                    </p>

                    {/* Progress */}
                    <div className="between" style={{ marginBottom: '0.5rem' }}>
                      <span className="small" style={{ fontWeight: 600 }}>Service progress</span>
                      <span className="small accent-text" style={{ fontWeight: 700 }}>{PROGRESS}%</span>
                    </div>
                    <div
                      style={{
                        height: 10,
                        borderRadius: 'var(--r-pill)',
                        background: 'var(--beige-2)',
                        border: '1px solid var(--border)',
                        overflow: 'hidden',
                      }}
                    >
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${PROGRESS}%` }}
                        transition={{ duration: 1.1, ease: EASE, delay: 0.25 }}
                        style={{
                          height: '100%',
                          borderRadius: 'var(--r-pill)',
                          background: 'linear-gradient(90deg, var(--accent-2), var(--accent))',
                        }}
                      />
                    </div>

                    {/* Details */}
                    <div style={{ marginTop: '1.6rem' }}>
                      {details.map((d) => (
                        <div className="summary-row" key={d.lbl}>
                          <span className="lbl">{d.lbl}</span>
                          <span style={{ fontWeight: 600, textAlign: 'right' }}>{d.val}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Timeline */}
                  <div className="glass card--pad">
                    <div className="cluster" style={{ gap: '0.6rem', marginBottom: '1.6rem' }}>
                      <span className="icon-badge"><Icon name="bike" /></span>
                      <div>
                        <h3 className="h4" style={{ lineHeight: 1.1 }}>Service Timeline</h3>
                        <span className="tiny muted">Live updates as your bike moves through the workshop.</span>
                      </div>
                    </div>

                    <Stagger className="track-timeline" gap={0.09}>
                      {TIMELINE.map((s) => (
                        <Item key={s.title} className={`track-step is-${s.status}`}>
                          <span className="track-step__dot">
                            <Icon name={s.status === 'done' ? 'check' : s.icon} />
                          </span>
                          <div>
                            <div className="between" style={{ gap: '0.75rem', alignItems: 'baseline' }}>
                              <span className="track-step__title">{s.title}</span>
                              <span className="track-step__time" style={s.status === 'current' ? { color: 'var(--accent-ink)', fontWeight: 700 } : undefined}>
                                {s.time}
                              </span>
                            </div>
                            <p className="tiny muted" style={{ marginTop: '0.2rem' }}>{s.note}</p>
                          </div>
                        </Item>
                      ))}
                    </Stagger>
                  </div>
                </div>

                {/* Need help CTA */}
                <Reveal dir="scale">
                  <div className="offer-banner mt-4" style={{ background: 'var(--ink)' }}>
                    <div className="offer-banner__bg" style={{ opacity: 0.26 }}>
                      <img src={IMG.mechanic} alt="" data-fb loading="lazy" />
                    </div>
                    <div className="offer-banner__inner">
                      <div>
                        <span className="eyebrow" style={{ color: 'var(--accent-2)' }}>Need help?</span>
                        <h2 className="h2" style={{ margin: '0.9rem 0 0.5rem', fontSize: 'clamp(1.7rem,3.5vw,2.6rem)' }}>
                          Questions about your service?
                        </h2>
                        <p style={{ color: 'rgba(255,255,255,.82)', fontSize: '1.05rem', maxWidth: '44ch' }}>
                          Our service advisors are on hand to walk you through anything — timing, parts, pickup or payment.
                        </p>
                      </div>
                      <div className="cluster" style={{ gap: '0.75rem' }}>
                        <Link className="btn btn--primary btn--lg" href="/contact">
                          Contact Support <span className="btn__arrow" aria-hidden="true">→</span>
                        </Link>
                        <a
                          className="btn btn--secondary btn--lg"
                          href={`tel:${CONTACT.phone.replace(/\s/g, '')}`}
                          style={{ background: 'rgba(255,255,255,.08)', color: '#fff', borderColor: 'rgba(255,255,255,.28)' }}
                        >
                          <Icon name="phone" />Call the workshop
                        </a>
                      </div>
                    </div>
                  </div>
                </Reveal>
              </motion.div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
