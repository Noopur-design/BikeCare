'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { SERVICES, BIKE_TYPES } from '@/lib/data';
import Icon from '@/components/Icon';
import { Reveal, Stagger, Item } from '@/components/Motion';
import { ServiceCard, SectionHead } from '@/components/UI';
import { toast } from '@/components/Toast';
import Select from '@/components/Select';

const FILTERS: { label: string; cat: string }[] = [
  { label: 'All Services', cat: 'all' },
  { label: 'General', cat: 'general' },
  { label: 'Engine', cat: 'engine' },
  { label: 'Brakes', cat: 'brakes' },
  { label: 'Tyres', cat: 'tyres' },
  { label: 'Battery', cat: 'battery' },
  { label: 'Electrical', cat: 'electrical' },
  { label: 'Cleaning', cat: 'cleaning' },
];

const SORTS: { value: string; label: string }[] = [
  { value: 'popular', label: 'Most Popular' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'quickest', label: 'Quickest First' },
];

/* Approximate minutes from a duration label like "3–4 hrs" / "45 mins" / "1 hr" */
const toMinutes = (d: string) => (/hr/i.test(d) ? parseFloat(d) * 60 : parseFloat(d));

export default function ServicesPage() {
  const [active, setActive] = useState('all');
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState('popular');

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = SERVICES.filter((s) => {
      const matchCat = active === 'all' || s.cat === active;
      const matchQ =
        !q || [s.name, s.short, s.desc, s.cat].some((f) => f.toLowerCase().includes(q));
      return matchCat && matchQ;
    });
    if (sort === 'price-asc') list = [...list].sort((a, b) => a.price - b.price);
    else if (sort === 'price-desc') list = [...list].sort((a, b) => b.price - a.price);
    else if (sort === 'quickest') list = [...list].sort((a, b) => toMinutes(a.duration) - toMinutes(b.duration));
    return list;
  }, [active, query, sort]);

  const activeLabel = FILTERS.find((f) => f.cat === active)?.label ?? 'All Services';

  const clearFilters = () => {
    setActive('all');
    setQuery('');
    setSort('popular');
    toast('Showing all services again.', { type: 'info', title: 'Filters cleared' });
  };

  return (
    <>
      {/* PAGE HERO */}
      <section className="page-hero">
        <div className="container container--wide">
          <div className="page-hero__inner">
            <Reveal>
              <nav className="breadcrumbs" aria-label="Breadcrumb">
                <Link href="/">Home</Link>
                <span className="sep">/</span>
                <span>Services</span>
              </nav>
            </Reveal>
            <Reveal delay={0.06}><span className="eyebrow">Our Services</span></Reveal>
            <Reveal delay={0.12}><h1 className="h1 mt-1">Our Services</h1></Reveal>
            <Reveal delay={0.18}>
              <p className="lead mt-2">
                Complete care for every ride — from quick oil changes to full engine overhauls,
                every service is handled by certified specialists with genuine parts and a written warranty.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* DIRECTORY */}
      <section className="section section--tight" style={{ paddingTop: 0 }}>
        <div className="container container--wide">
          {/* Controls bar */}
          <Reveal>
            <div className="glass" style={{ padding: 'clamp(1rem, 2.2vw, 1.5rem)', display: 'grid', gap: '1.1rem' }}>
              <div className="between" style={{ gap: '1rem' }}>
                <div className="input-group" style={{ flex: '1 1 320px' }}>
                  <span className="input-group__ico"><Icon name="search" /></span>
                  <input
                    className="input"
                    type="search"
                    placeholder="Search services…"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    aria-label="Search services"
                  />
                </div>
                <div className="field" style={{ flex: '0 1 260px', minWidth: 200 }}>
                  <Select ariaLabel="Sort services" value={sort} onChange={setSort} options={SORTS} />
                </div>
              </div>
              <div className="tabs tabs--scroll" role="tablist" aria-label="Filter services by category">
                {FILTERS.map((f) => (
                  <button
                    key={f.cat}
                    type="button"
                    role="tab"
                    aria-selected={active === f.cat}
                    className={`chip${active === f.cat ? ' is-active' : ''}`}
                    onClick={() => setActive(f.cat)}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Result count */}
          <Reveal>
            <div className="between mt-4" style={{ marginBottom: '1.6rem' }}>
              <p className="muted small" style={{ margin: 0 }}>
                Showing <b style={{ color: 'var(--ink)' }}>{results.length}</b> of {SERVICES.length} services
                {active !== 'all' ? <> in <b style={{ color: 'var(--ink)' }}>{activeLabel}</b></> : null}
                {query.trim() ? <> for “{query.trim()}”</> : null}
              </p>
              {(active !== 'all' || query.trim() || sort !== 'popular') && (
                <button type="button" className="link-arrow" onClick={clearFilters}>
                  Clear filters <span className="btn__arrow" aria-hidden="true">→</span>
                </button>
              )}
            </div>
          </Reveal>

          {/* Results grid / empty state */}
          {results.length > 0 ? (
            <Stagger key={`${active}-${sort}`} className="grid grid--3" gap={0.07}>
              {results.map((s) => (
                <Item key={s.slug}><ServiceCard service={s} /></Item>
              ))}
            </Stagger>
          ) : (
            <Reveal>
              <div className="empty glass" style={{ borderRadius: 'var(--r-lg)' }}>
                <div className="empty__ico"><Icon name="search" /></div>
                <h3 className="h3">No services match your search</h3>
                <p className="lead" style={{ maxWidth: '46ch', margin: '0.75rem auto 1.75rem' }}>
                  We couldn’t find a service for that filter. Try a different category or clear your search to see everything.
                </p>
                <button type="button" className="btn btn--secondary" onClick={clearFilters}>
                  Clear filters <span className="btn__arrow" aria-hidden="true">→</span>
                </button>
              </div>
            </Reveal>
          )}
        </div>
      </section>

      {/* BROWSE BY BIKE TYPE */}
      <section className="section section--beige">
        <div className="container container--wide">
          <Reveal>
            <SectionHead
              eyebrow="Built for your machine"
              title="Browse by bike type"
              lead="From nimble scooters to high-torque adventure tourers — our specialists tune their care to how your bike is built and how you ride it."
            />
          </Reveal>
          <Stagger className="grid grid--3" gap={0.07}>
            {BIKE_TYPES.map((t) => (
              <Item key={t.slug}>
                <Link
                  id={t.slug}
                  href="/book"
                  className="card card--hover"
                  style={{ display: 'flex', flexDirection: 'column', height: '100%' }}
                >
                  <div className="card__media">
                    <span
                      className="icon-badge"
                      style={{ position: 'absolute', top: '0.9rem', left: '0.9rem', zIndex: 2, background: 'var(--glass-strong)' }}
                    >
                      <Icon name={t.icon} />
                    </span>
                    <img src={t.img} alt={t.name} loading="lazy" />
                  </div>
                  <div style={{ padding: 'clamp(1.15rem, 2vw, 1.6rem)', display: 'flex', flexDirection: 'column', flex: 1, position: 'relative', zIndex: 1 }}>
                    <h3 className="h4">{t.name}</h3>
                    <p className="muted small" style={{ margin: '0.5rem 0 1.1rem', flex: 1 }}>{t.desc}</p>
                    <span className="link-arrow">Book a service <span className="btn__arrow" aria-hidden="true">→</span></span>
                  </div>
                </Link>
              </Item>
            ))}
          </Stagger>
        </div>
      </section>

      {/* FINAL CTA BAND */}
      <section className="section">
        <div className="container container--wide">
          <Reveal dir="scale">
            <div className="offer-banner" style={{ background: 'var(--ink)' }}>
              <div className="offer-banner__bg" style={{ opacity: 0.32 }}>
                <img src={BIKE_TYPES[0].img} alt="" data-fb loading="lazy" />
              </div>
              <div className="offer-banner__inner" style={{ gridTemplateColumns: '1fr', textAlign: 'center', justifyItems: 'center' }}>
                <div>
                  <span className="eyebrow eyebrow--center" style={{ color: 'var(--accent-2)' }}>Not sure what you need?</span>
                  <h2 className="h2" style={{ margin: '1rem 0 0.75rem', fontSize: 'clamp(2.2rem, 5vw, 3.6rem)' }}>Let’s get your bike road-ready</h2>
                  <p style={{ color: 'rgba(255,255,255,.82)', fontSize: '1.15rem', maxWidth: '48ch', margin: '0 auto 2rem' }}>
                    Book a service in minutes or compare our transparent plans — genuine parts, certified technicians and free doorstep pickup on every ride.
                  </p>
                  <div className="cluster" style={{ justifyContent: 'center', gap: '.85rem' }}>
                    <Link className="btn btn--primary btn--lg" href="/book">Book a Service <span className="btn__arrow" aria-hidden="true">→</span></Link>
                    <Link
                      className="btn btn--secondary btn--lg"
                      href="/pricing"
                      style={{ background: 'rgba(255,255,255,.08)', color: '#fff', borderColor: 'rgba(255,255,255,.28)' }}
                    >
                      View Pricing <span className="btn__arrow" aria-hidden="true">→</span>
                    </Link>
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
