'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { FAQS, CONTACT } from '@/lib/data';
import Icon from '@/components/Icon';
import { Reveal } from '@/components/Motion';
import Accordion from '@/components/Accordion';
import { toast } from '@/components/Toast';

/* All + the distinct categories, in the order they first appear in the data */
const CATS = ['All', ...Array.from(new Set(FAQS.map((f) => f.cat)))];

const telHref = `tel:${CONTACT.phone.replace(/[^+\d]/g, '')}`;

export default function FaqPage() {
  const [active, setActive] = useState('All');
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return FAQS.filter((f) => {
      const matchCat = active === 'All' || f.cat === active;
      const matchQ = !q || `${f.q} ${f.a}`.toLowerCase().includes(q);
      return matchCat && matchQ;
    });
  }, [active, query]);

  const isFiltering = active !== 'All' || query.trim() !== '';

  const clear = () => {
    setActive('All');
    setQuery('');
    toast('Showing every question again.', { type: 'info', title: 'Filters cleared' });
  };

  return (
    <>
      {/* PAGE HERO */}
      <section className="page-hero page-hero--center">
        <div className="container container--wide">
          <div className="page-hero__inner">
            <Reveal>
              <nav className="breadcrumbs" aria-label="Breadcrumb" style={{ justifyContent: 'center' }}>
                <Link href="/">Home</Link>
                <span className="sep">/</span>
                <span>FAQ</span>
              </nav>
            </Reveal>
            <Reveal delay={0.06}><span className="eyebrow eyebrow--center">Support</span></Reveal>
            <Reveal delay={0.12}><h1 className="h1 mt-1">Frequently asked questions.</h1></Reveal>
            <Reveal delay={0.18}>
              <p className="lead mt-2">
                Everything you need to know about booking, servicing, pricing, pickup and warranty —
                answered in plain language. Can’t find it here? Our team is a call away.
              </p>
            </Reveal>
            <Reveal delay={0.24}>
              <div className="input-group" style={{ maxWidth: 620, margin: '2rem auto 0' }}>
                <span className="input-group__ico"><Icon name="search" /></span>
                <input
                  className="input"
                  type="search"
                  placeholder="Search questions…"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  aria-label="Search frequently asked questions"
                  style={{ padding: '1.05rem 1.2rem 1.05rem 2.9rem', fontSize: '1.05rem', borderRadius: 'var(--r-pill)' }}
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* DIRECTORY */}
      <section className="section section--tight" style={{ paddingTop: 0 }}>
        <div className="container">
          {/* Category tabs */}
          <Reveal>
            <div className="tabs tabs--scroll" role="tablist" aria-label="Filter questions by category" style={{ justifyContent: 'center' }}>
              {CATS.map((c) => (
                <button
                  key={c}
                  type="button"
                  role="tab"
                  aria-selected={active === c}
                  className={`chip${active === c ? ' is-active' : ''}`}
                  onClick={() => setActive(c)}
                >
                  {c}
                </button>
              ))}
            </div>
          </Reveal>

          {/* Match count */}
          <Reveal>
            <div className="between mt-4" style={{ marginBottom: '1.4rem' }}>
              <p className="muted small" style={{ margin: 0 }}>
                <b style={{ color: 'var(--ink)' }}>{filtered.length}</b>{' '}
                {filtered.length === 1 ? 'answer' : 'answers'}
                {active !== 'All' ? <> in <b style={{ color: 'var(--ink)' }}>{active}</b></> : null}
                {query.trim() ? <> for “{query.trim()}”</> : null}
              </p>
              {isFiltering && (
                <button type="button" className="link-arrow" onClick={clear}>
                  Clear filters <span className="btn__arrow" aria-hidden="true">→</span>
                </button>
              )}
            </div>
          </Reveal>

          {/* Accordion / empty state */}
          <div style={{ maxWidth: 860, margin: '0 auto' }}>
            {filtered.length > 0 ? (
              <Reveal key={`${active}|${query.trim()}`}>
                <Accordion items={filtered.map((f) => ({ q: f.q, a: f.a }))} />
              </Reveal>
            ) : (
              <Reveal>
                <div className="empty glass" style={{ borderRadius: 'var(--r-lg)' }}>
                  <div className="empty__ico"><Icon name="search" /></div>
                  <h3 className="h3">No answers match your search</h3>
                  <p className="lead" style={{ maxWidth: '46ch', margin: '0.75rem auto 1.75rem' }}>
                    We couldn’t find a question for that filter. Try another category, reword your search,
                    or clear the filters to browse everything.
                  </p>
                  <button type="button" className="btn btn--secondary" onClick={clear}>
                    Clear filters <span className="btn__arrow" aria-hidden="true">→</span>
                  </button>
                </div>
              </Reveal>
            )}
          </div>

          {/* Still have questions CTA */}
          <Reveal dir="scale">
            <div
              className="glass"
              style={{
                maxWidth: 860,
                margin: '3rem auto 0',
                padding: 'clamp(1.75rem, 4vw, 3rem)',
                textAlign: 'center',
              }}
            >
              <span className="icon-badge icon-badge--lg" style={{ margin: '0 auto 1.2rem' }}>
                <Icon name="phone" />
              </span>
              <h2 className="h3">Still have questions?</h2>
              <p className="lead" style={{ maxWidth: '48ch', margin: '0.75rem auto 1.75rem' }}>
                Our service advisors are happy to help you pick the right plan, book a slot or track a
                service — Mon–Sat, 8 AM to 8 PM.
              </p>
              <div className="cluster" style={{ justifyContent: 'center', gap: '0.85rem' }}>
                <Link className="btn btn--primary btn--lg" href="/contact">
                  Contact Support <span className="btn__arrow" aria-hidden="true">→</span>
                </Link>
                <a
                  className="btn btn--secondary btn--lg"
                  href={telHref}
                  onClick={() => toast(`Calling ${CONTACT.phone}`, { type: 'info', title: 'Connecting you' })}
                >
                  <Icon name="phone" /> Call {CONTACT.phone}
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
