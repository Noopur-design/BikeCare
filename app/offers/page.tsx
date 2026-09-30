'use client';

import { useState } from 'react';
import Link from 'next/link';
import { IMG, OFFERS, CONTACT, type Offer } from '@/lib/data';
import Icon from '@/components/Icon';
import { Reveal, Stagger, Item, Magnetic } from '@/components/Motion';
import Countdown from '@/components/Countdown';
import { toast } from '@/components/Toast';

/* Codes that carry a live inline countdown on their card */
const TIMED: Record<string, { hours: number; key: string }> = {
  MONSOON30: { hours: 72, key: 'offers-monsoon' },
  WEEKDAY20: { hours: 48, key: 'offers-weekday' },
};

export default function OffersPage() {
  const [code, setCode] = useState('');
  const [applied, setApplied] = useState<Offer | null>(null);
  const [copied, setCopied] = useState<string | null>(null);
  const [filter, setFilter] = useState('All');

  const tags = ['All', ...Array.from(new Set(OFFERS.map((o) => o.tag)))];
  const shown = filter === 'All' ? OFFERS : OFFERS.filter((o) => o.tag === filter);

  const applyCoupon = () => {
    const entry = code.trim();
    if (!entry) {
      toast('Enter a coupon code to apply.', { type: 'info' });
      return;
    }
    const match = OFFERS.find((o) => o.code.toLowerCase() === entry.toLowerCase());
    if (match) {
      setApplied(match);
      setCode(match.code);
      toast(`Coupon ${match.code} applied — ${match.discount}!`, { type: 'success', title: 'Coupon applied' });
    } else {
      setApplied(null);
      toast('Invalid coupon code', { type: 'error' });
    }
  };

  const copyCode = async (c: string) => {
    try {
      await navigator.clipboard.writeText(c);
    } catch {
      /* clipboard may be unavailable — still confirm to the rider */
    }
    setCopied(c);
    toast(`Code ${c} copied — paste it above to apply.`, { type: 'success', title: 'Copied' });
    setTimeout(() => setCopied((cur) => (cur === c ? null : cur)), 1800);
  };

  return (
    <>
      {/* PAGE HERO */}
      <section className="page-hero">
        <div className="container container--wide">
          <div className="page-hero__inner">
            <nav className="breadcrumbs">
              <Link href="/">Home</Link>
              <span className="sep">/</span>
              <span>Offers</span>
            </nav>
            <Reveal><span className="eyebrow">Deals</span></Reveal>
            <Reveal delay={0.08}><h1 className="h1 mt-1">Offers worth the ride.</h1></Reveal>
            <Reveal delay={0.16}>
              <p className="lead mt-2">
                Genuine savings on genuine service. Stack a seasonal deal, refer a friend or grab a
                weekday express slot — every offer includes the same certified care, real parts and
                written warranty. No fine print, no surprises.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* HERO OFFER BANNER */}
      <section className="section section--tight" style={{ paddingTop: 0 }}>
        <div className="container container--wide">
          <Reveal dir="scale">
            <div className="offer-banner">
              <div className="offer-banner__bg"><img src={IMG.sport} alt="" loading="lazy" /></div>
              <div className="offer-banner__inner">
                <div>
                  <span className="badge badge--live">Limited Period</span>
                  <h2 className="h2" style={{ margin: '1rem 0 0.5rem', fontSize: 'clamp(2.4rem,5vw,3.6rem)' }}>Flat 20% OFF</h2>
                  <p style={{ color: 'rgba(255,255,255,.85)', fontSize: '1.1rem', maxWidth: '42ch', marginBottom: '1.75rem' }}>
                    On every premium bike service booked Monday to Thursday. Genuine parts, premium
                    detailing and free doorstep pickup — all included.
                  </p>
                  <div className="cluster" style={{ gap: '1rem' }}>
                    <Magnetic>
                      <Link className="btn btn--primary btn--lg" href="/book">Grab Offer <span className="btn__arrow" aria-hidden="true">→</span></Link>
                    </Magnetic>
                    <span className="offer-card__code" style={{ background: 'rgba(255,255,255,.08)', color: '#fff', borderColor: 'rgba(255,255,255,.25)' }}>WEEKDAY20</span>
                  </div>
                </div>
                <div>
                  <p style={{ color: 'rgba(255,255,255,.7)', fontSize: '.8rem', textTransform: 'uppercase', letterSpacing: '.1em', marginBottom: '.9rem' }}>Offer ends in</p>
                  <Countdown hours={48} storageKey="offers-hero" />
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* COUPON BAR */}
      <section className="section section--tight" style={{ paddingTop: 0 }}>
        <div className="container container--narrow">
          <Reveal>
            <div className="glass" style={{ padding: 'clamp(1.5rem,3vw,2.25rem)' }}>
              <div className="between" style={{ marginBottom: '1.15rem', alignItems: 'flex-start' }}>
                <div>
                  <span className="eyebrow">Have a code?</span>
                  <h2 className="h3 mt-1">Apply a coupon</h2>
                </div>
                {applied && (
                  <span className="badge badge--live badge--dot">{applied.code} · {applied.discount}</span>
                )}
              </div>
              <div className="cluster" style={{ gap: '0.75rem', flexWrap: 'nowrap' }}>
                <div className="input-group" style={{ flex: 1 }}>
                  <span className="input-group__ico"><Icon name="tag" /></span>
                  <input
                    className="input"
                    placeholder="Enter coupon code"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    onKeyDown={(e) => { if (e.key === 'Enter') applyCoupon(); }}
                    aria-label="Coupon code"
                    autoComplete="off"
                  />
                </div>
                <button className="btn btn--primary" onClick={applyCoupon} type="button">Apply</button>
              </div>
              <p className="field__hint mt-2">
                Tip: every code lives on an offer card below — copy one and paste it here to apply.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* OFFER CARDS */}
      <section className="section" style={{ paddingTop: 'clamp(2rem,4vw,3rem)' }}>
        <div className="container container--wide">
          <Reveal>
            <div className="section-head" style={{ marginBottom: '1.6rem' }}>
              <span className="eyebrow">All Offers</span>
              <h2 className="h2">Save on every kind of ride.</h2>
              <p className="lead">From your very first check-up to loyalty rewards — pick the deal that fits your ride today.</p>
            </div>
          </Reveal>

          <Reveal>
            <div className="cluster mb-3" role="group" aria-label="Filter offers by category">
              {tags.map((t) => (
                <button
                  key={t}
                  type="button"
                  className={`chip${filter === t ? ' is-active' : ''}`}
                  onClick={() => setFilter(t)}
                  aria-pressed={filter === t}
                >
                  {t}
                </button>
              ))}
            </div>
          </Reveal>

          <Stagger className="grid grid--3" gap={0.07} key={filter}>
            {shown.map((o) => {
              const timed = TIMED[o.code];
              const isCopied = copied === o.code;
              return (
                <Item key={o.code} as="article">
                  <div className="offer-card card card--hover">
                    <div className="between" style={{ marginBottom: '1.1rem' }}>
                      <span className="icon-badge"><Icon name={o.icon} /></span>
                      <span className="tag">{o.tag}</span>
                    </div>
                    <div className="offer-card__discount">{o.discount}</div>
                    <h3 className="h4 mt-1">{o.title}</h3>
                    <p className="muted small mt-1" style={{ flex: 1 }}>{o.desc}</p>

                    {timed && (
                      <div style={{ marginTop: '1.1rem', background: 'var(--ink)', borderRadius: 'var(--r-md)', padding: '0.85rem 0.9rem' }}>
                        <p style={{ color: 'rgba(255,255,255,.65)', fontSize: '.64rem', textTransform: 'uppercase', letterSpacing: '.12em', marginBottom: '.55rem' }}>Ends in</p>
                        <Countdown hours={timed.hours} storageKey={timed.key} />
                      </div>
                    )}

                    <div className="offer-card__code" style={{ width: '100%', marginTop: '1.25rem', justifyContent: 'space-between' }}>
                      {o.code}
                      <button
                        type="button"
                        className={`offer-card__copy${isCopied ? ' is-copied' : ''}`}
                        onClick={() => copyCode(o.code)}
                      >
                        {isCopied ? 'Copied!' : 'Copy'}
                      </button>
                    </div>
                  </div>
                </Item>
              );
            })}
          </Stagger>

          {shown.length === 0 && (
            <div className="empty">
              <div className="empty__ico"><Icon name="gift" /></div>
              <h3 className="h3">No offers in this category yet.</h3>
              <p className="muted mt-1">Try another category — new deals drop every season.</p>
              <button className="btn btn--secondary mt-3" type="button" onClick={() => setFilter('All')}>View all offers <span className="btn__arrow" aria-hidden="true">→</span></button>
            </div>
          )}
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="section">
        <div className="container container--wide">
          <Reveal dir="scale">
            <div className="offer-banner" style={{ background: 'var(--ink)' }}>
              <div className="offer-banner__bg" style={{ opacity: 0.3 }}><img src={IMG.road} alt="" loading="lazy" /></div>
              <div className="offer-banner__inner" style={{ gridTemplateColumns: '1fr', textAlign: 'center', justifyItems: 'center' }}>
                <div>
                  <span className="eyebrow eyebrow--center" style={{ color: 'var(--accent-2)' }}>Ready when you are</span>
                  <h2 className="h2" style={{ margin: '1rem 0 0.75rem', fontSize: 'clamp(2rem,5vw,3.4rem)' }}>Book now and stack your savings.</h2>
                  <p style={{ color: 'rgba(255,255,255,.82)', fontSize: '1.12rem', maxWidth: '46ch', margin: '0 auto 2rem' }}>
                    Apply any active code at checkout and enjoy the full BIKECARE experience — certified
                    technicians, genuine parts and free doorstep pickup.
                  </p>
                  <div className="cluster" style={{ justifyContent: 'center', gap: '.85rem' }}>
                    <Link className="btn btn--primary btn--lg" href="/book">Book a Service <span className="btn__arrow" aria-hidden="true">→</span></Link>
                    <a
                      className="btn btn--secondary btn--lg"
                      href={`tel:${CONTACT.phone.replace(/\s/g, '')}`}
                      style={{ background: 'rgba(255,255,255,.08)', color: '#fff', borderColor: 'rgba(255,255,255,.28)' }}
                    >
                      Call {CONTACT.phone} <span className="btn__arrow" aria-hidden="true">→</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
