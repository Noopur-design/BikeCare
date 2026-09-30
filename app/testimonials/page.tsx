'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { TESTIMONIALS, type Testimonial } from '@/lib/data';
import Icon from '@/components/Icon';
import { Reveal, Stagger, Item, Counter } from '@/components/Motion';
import { Stars, TestimonialCard } from '@/components/UI';
import Carousel from '@/components/Carousel';
import Select from '@/components/Select';
import { toast } from '@/components/Toast';

const EASE = [0.22, 1, 0.36, 1] as const;

/* Distinct review categories, in the order the brief specifies */
const CATS = ['General Service', 'Bike Washing', 'Engine Service', 'Oil Change', 'Brake Service', 'Complete Care'];
const FILTERS = ['All', ...CATS];

/* Rating breakdown (share of all reviews) */
const BREAKDOWN: { star: number; pct: number }[] = [
  { star: 5, pct: 82 },
  { star: 4, pct: 13 },
  { star: 3, pct: 3 },
  { star: 2, pct: 1 },
  { star: 1, pct: 1 },
];

/* Three standout 5-star reviews for the featured carousel */
const FEATURED: Testimonial[] = [TESTIMONIALS[0], TESTIMONIALS[2], TESTIMONIALS[5]];

/* Fill the masonry by rendering the set a few times in varied order.
   Filtering by chip still works because we filter this expanded pool by cat. */
const POOL: Testimonial[] = [
  ...TESTIMONIALS,
  ...TESTIMONIALS.slice(3), ...TESTIMONIALS.slice(0, 3),
  ...[...TESTIMONIALS].reverse(),
];

const SORTS = [
  { value: 'featured', label: 'Featured first' },
  { value: 'top', label: 'Highest rated' },
  { value: 'bike', label: 'By bike (A–Z)' },
];

export default function TestimonialsPage() {
  const [filter, setFilter] = useState('All');
  const [sort, setSort] = useState('featured');

  const shown = useMemo(() => {
    let list = POOL.filter((t) => filter === 'All' || t.cat === filter);
    if (sort === 'top') list = [...list].sort((a, b) => b.rating - a.rating);
    else if (sort === 'bike') list = [...list].sort((a, b) => a.bike.localeCompare(b.bike));
    return list;
  }, [filter, sort]);

  const shareReview = () =>
    toast('Your review helps thousands of riders choose with confidence. We just need a quick sign-in.', {
      type: 'success',
      title: 'Thanks for sharing!',
    });

  return (
    <>
      {/* HERO */}
      <section className="page-hero page-hero--center">
        <div className="container container--wide">
          <div className="page-hero__inner">
            <Reveal>
              <nav className="breadcrumbs" aria-label="Breadcrumb" style={{ justifyContent: 'center' }}>
                <Link href="/">Home</Link>
                <span className="sep">/</span>
                <span>Testimonials</span>
              </nav>
            </Reveal>
            <Reveal delay={0.06}><span className="eyebrow eyebrow--center">Testimonials</span></Reveal>
            <Reveal delay={0.12}><h1 className="h1 mt-1">Loved by 10,000+ riders.</h1></Reveal>
            <Reveal delay={0.18}>
              <p className="lead mt-2">
                Real stories from the riders who trust BIKECARE with their machines — from daily commuters
                to weekend tourers. Genuine parts, certified technicians and a service experience worth talking about.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* RATING STATS BAND */}
      <section className="section section--tight" style={{ paddingTop: 0 }}>
        <div className="container container--wide">
          <Reveal dir="scale">
            <div className="glass" style={{ padding: 'clamp(1.6rem, 3.4vw, 3rem)' }}>
              <div className="split" style={{ alignItems: 'center', gap: 'clamp(2rem, 5vw, 4.5rem)' }}>
                {/* Aggregate score */}
                <div className="center">
                  <div className="serif" style={{ fontSize: 'clamp(3.4rem, 8vw, 5rem)', fontWeight: 500, lineHeight: 1, letterSpacing: '-0.03em' }}>
                    4.9
                  </div>
                  <div className="mt-2" style={{ display: 'flex', justifyContent: 'center' }}><Stars n={5} /></div>
                  <p className="muted small mt-1" style={{ margin: '0.5rem 0 0' }}>out of 5</p>
                  <p className="small mt-2" style={{ margin: '0.75rem 0 0' }}>
                    Based on <b style={{ color: 'var(--ink)' }}><Counter to={10} suffix="K+" /></b> verified reviews
                  </p>
                </div>

                {/* Rating breakdown bars */}
                <div style={{ display: 'grid', gap: '0.7rem' }}>
                  {BREAKDOWN.map((b) => (
                    <div key={b.star} style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                      <span className="small" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem', width: 42, fontWeight: 600, flex: 'none' }}>
                        {b.star}
                        <span className="stars"><Icon name="star" filled /></span>
                      </span>
                      <div style={{ flex: 1, height: 9, borderRadius: 999, background: 'var(--border-strong)', overflow: 'hidden' }}>
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${b.pct}%` }}
                          viewport={{ once: true, margin: '-8%' }}
                          transition={{ duration: 1.1, ease: EASE, delay: 0.15 }}
                          style={{ height: '100%', borderRadius: 999, background: 'linear-gradient(90deg, var(--accent-2), var(--accent))' }}
                        />
                      </div>
                      <span className="small muted" style={{ width: 40, textAlign: 'right', flex: 'none' }}>{b.pct}%</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick stats */}
              <div className="grid grid--3" style={{ marginTop: 'clamp(1.6rem, 3vw, 2.4rem)', paddingTop: 'clamp(1.6rem, 3vw, 2.4rem)', borderTop: '1px solid var(--border)' }}>
                <div className="stat">
                  <div className="stat__num"><Counter to={98} suffix="%" /></div>
                  <div className="stat__label">Would recommend us</div>
                </div>
                <div className="stat">
                  <div className="stat__num"><Counter to={4.8} decimals={1} suffix="/5" /></div>
                  <div className="stat__label">Google &amp; app store rating</div>
                </div>
                <div className="stat">
                  <div className="stat__num"><Counter to={12} suffix="K+" /></div>
                  <div className="stat__label">Bikes serviced &amp; counting</div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FEATURED QUOTES CAROUSEL */}
      <section className="section section--beige">
        <div className="container container--wide">
          <Reveal>
            <div className="section-head section-head--center">
              <span className="eyebrow eyebrow--center">In their words</span>
              <h2 className="h2">Stories from the saddle.</h2>
              <p className="lead">The moments that turned first-time bookings into riders for life.</p>
            </div>
          </Reveal>
          <Reveal dir="scale">
            <Carousel perView={1} autoplay>
              {FEATURED.map((t) => (
                <div key={t.name} className="glass" style={{ padding: 'clamp(1.8rem, 4vw, 3.4rem)', textAlign: 'center', maxWidth: 880, margin: '0 auto' }}>
                  <div className="serif accent-text" aria-hidden="true" style={{ fontSize: 'clamp(3.5rem, 7vw, 5.5rem)', lineHeight: 0.6, height: '0.5em' }}>“</div>
                  <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.25rem' }}><Stars n={t.rating} /></div>
                  <p className="serif balance" style={{ fontSize: 'clamp(1.35rem, 2.6vw, 2.1rem)', fontWeight: 500, lineHeight: 1.35, letterSpacing: '-0.02em', marginBottom: '2rem' }}>
                    {t.text}
                  </p>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.85rem' }}>
                    <span className="testimonial__avatar" style={{ width: 56, height: 56 }}>
                      <img src={t.avatar} alt={t.name} loading="lazy" />
                    </span>
                    <span style={{ textAlign: 'left' }}>
                      <strong style={{ display: 'block' }}>{t.name}</strong>
                      <span className="small muted">{t.bike}</span>
                    </span>
                  </div>
                </div>
              ))}
            </Carousel>
          </Reveal>
        </div>
      </section>

      {/* ALL REVIEWS — FILTER + MASONRY */}
      <section className="section">
        <div className="container container--wide">
          <Reveal>
            <div className="between" style={{ alignItems: 'flex-end', marginBottom: '1.75rem' }}>
              <div className="section-head" style={{ marginBottom: 0 }}>
                <span className="eyebrow">Every review</span>
                <h2 className="h2">Browse by service.</h2>
              </div>
              <div className="field" style={{ flex: '0 1 240px', minWidth: 200 }}>
                <Select ariaLabel="Sort reviews" value={sort} onChange={setSort} options={SORTS} />
              </div>
            </div>
          </Reveal>

          <Reveal>
            <div className="tabs tabs--scroll mb-3" role="tablist" aria-label="Filter reviews by service category">
              {FILTERS.map((f) => (
                <button
                  key={f}
                  type="button"
                  role="tab"
                  aria-selected={filter === f}
                  className={`chip${filter === f ? ' is-active' : ''}`}
                  onClick={() => setFilter(f)}
                >
                  {f}
                </button>
              ))}
            </div>
          </Reveal>

          <Stagger key={`${filter}-${sort}`} className="masonry" gap={0.05}>
            {shown.map((t, i) => (
              <Item key={`${t.name}-${i}`}>
                <TestimonialCard t={t} showTag />
              </Item>
            ))}
          </Stagger>
        </div>
      </section>

      {/* SHARE + BOOK CTA */}
      <section className="section section--tight">
        <div className="container container--wide">
          <Reveal dir="scale">
            <div className="offer-banner" style={{ background: 'var(--ink)' }}>
              <div className="offer-banner__bg" style={{ opacity: 0.3 }}>
                <img src={TESTIMONIALS[4].avatar} alt="" data-fb loading="lazy" />
              </div>
              <div className="offer-banner__inner" style={{ gridTemplateColumns: '1fr', textAlign: 'center', justifyItems: 'center' }}>
                <div>
                  <span className="eyebrow eyebrow--center" style={{ color: 'var(--accent-2)' }}>Serviced with us?</span>
                  <h2 className="h2" style={{ margin: '1rem 0 0.75rem', fontSize: 'clamp(2rem, 5vw, 3.4rem)' }}>Share your experience</h2>
                  <p style={{ color: 'rgba(255,255,255,.82)', fontSize: '1.12rem', maxWidth: '48ch', margin: '0 auto 2rem' }}>
                    Your story helps fellow riders choose with confidence — and takes less than two minutes.
                  </p>
                  <div className="cluster" style={{ justifyContent: 'center', gap: '.85rem' }}>
                    <button type="button" className="btn btn--primary btn--lg" onClick={shareReview}>
                      Share your experience <span className="btn__arrow" aria-hidden="true">→</span>
                    </button>
                    <Link
                      className="btn btn--secondary btn--lg"
                      href="/book"
                      style={{ background: 'rgba(255,255,255,.08)', color: '#fff', borderColor: 'rgba(255,255,255,.28)' }}
                    >
                      Book a Service <span className="btn__arrow" aria-hidden="true">→</span>
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
