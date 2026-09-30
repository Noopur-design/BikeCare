'use client';

import { useState } from 'react';
import Link from 'next/link';
import { PLANS, ADDONS, SERVICES, FAQS, money, type IconName, type Plan } from '@/lib/data';
import Icon from '@/components/Icon';
import { Reveal, Stagger, Item, Magnetic } from '@/components/Motion';
import { PlanCard } from '@/components/UI';
import Accordion from '@/components/Accordion';
import styles from './page.module.css';

/* Reuse real service/add-on prices where they match; sensible ₹ otherwise. */
const svc = (slug: string) => SERVICES.find((s) => s.slug === slug)?.price ?? 0;
const addon = (name: string) => ADDONS.find((a) => a.name === name)?.price ?? 0;

const ADDL: { icon: IconName; name: string; desc: string; price: number }[] = [
  { icon: 'tyre', name: 'Tyre Replacement', desc: 'Genuine tyres fitted, balanced and aligned.', price: svc('tyre-replacement') },
  { icon: 'battery', name: 'Battery Replacement', desc: 'Warranty-backed battery, tested and fitted on the spot.', price: svc('battery-replacement') },
  { icon: 'disc', name: 'Brake Pads', desc: 'Front and rear pad replacement with fluid bleeding.', price: 649 },
  { icon: 'gear', name: 'Chain Kit', desc: 'Chain and sprocket kit replaced and tensioned.', price: addon('Chain Sprocket Kit') },
  { icon: 'sparkle', name: 'Bike Washing', desc: 'Foam wash, polish and a protective wax coat.', price: svc('bike-washing') },
  { icon: 'engine', name: 'Engine Tuning', desc: 'Carburettor and injector tune for smoother power.', price: 899 },
];

/* Union of every feature label across all plans, in first-seen order. */
const FEATURE_LABELS: string[] = [];
PLANS.forEach((p) => p.features.forEach(([label]) => { if (!FEATURE_LABELS.includes(label)) FEATURE_LABELS.push(label); }));
const has = (plan: Plan, label: string) => plan.features.some(([l, on]) => l === label && on);

const PRICING_FAQS = FAQS.filter((f) => ['Pricing', 'Payments', 'Warranty'].includes(f.cat));

export default function PricingPage() {
  const [billing, setBilling] = useState<'monthly' | 'yearly'>('monthly');
  const yearly = billing === 'yearly';

  return (
    <>
      {/* HERO */}
      <section className="page-hero page-hero--center">
        <div className="container container--wide">
          <div className="page-hero__inner">
            <Reveal><span className="eyebrow eyebrow--center">Transparent Pricing</span></Reveal>
            <Reveal delay={0.08}><h1 className="h1 mt-1">Simple, honest pricing.</h1></Reveal>
            <Reveal delay={0.16}>
              <p className="lead mt-2">
                No hidden charges, ever. Every plan includes genuine, manufacturer-approved parts and a
                written service warranty — so you always know exactly what you are paying for before we lift a spanner.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* BILLING TOGGLE + PLANS */}
      <section className="section section--tight" id="plans">
        <div className="container container--wide">
          <Reveal>
            <div className="center mb-3">
              <div className="toggle-group" role="group" aria-label="Choose billing type">
                <span style={{ fontWeight: 600, fontSize: '0.92rem', color: yearly ? 'var(--ink-2)' : 'var(--ink)' }}>Per Service</span>
                <button
                  type="button"
                  className={`toggle-switch${yearly ? ' is-on' : ''}`}
                  aria-pressed={yearly}
                  aria-label="Toggle annual care plan pricing"
                  onClick={() => setBilling((b) => (b === 'monthly' ? 'yearly' : 'monthly'))}
                />
                <span style={{ fontWeight: 600, fontSize: '0.92rem', color: yearly ? 'var(--ink)' : 'var(--ink-2)' }}>Annual Care Plan</span>
                <span className="badge">Save ~10%</span>
              </div>
            </div>
          </Reveal>

          <Stagger className="grid grid--4" gap={0.07}>
            {PLANS.map((p) => (
              <Item key={p.name}><PlanCard plan={p} billing={billing} full /></Item>
            ))}
          </Stagger>

          <Reveal>
            <p className="center muted small mt-3">
              Prices are inclusive of labour and diagnostics. Additional parts, if any, are always confirmed with you before work begins.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ADDITIONAL SERVICES */}
      <section className="section section--beige">
        <div className="container container--wide">
          <Reveal>
            <div className="section-head section-head--center">
              <span className="eyebrow eyebrow--center">À la carte</span>
              <h2 className="h2">Additional services and parts.</h2>
              <p className="lead">Need something specific? Add any of these to your booking at genuine, upfront prices.</p>
            </div>
          </Reveal>
          <Stagger className="grid grid--3" gap={0.06}>
            {ADDL.map((a) => (
              <Item key={a.name}>
                <div className="card card--pad card--hover" style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem', height: '100%' }}>
                  <span className="icon-badge icon-badge--lg"><Icon name={a.icon} /></span>
                  <div style={{ flex: 1 }}>
                    <h3 className="h4" style={{ marginBottom: '0.35rem' }}>{a.name}</h3>
                    <p className="muted small">{a.desc}</p>
                  </div>
                  <div className="between" style={{ marginTop: 'auto' }}>
                    <span>
                      <span className="tiny muted" style={{ display: 'block' }}>Starting</span>
                      <b style={{ fontFamily: 'var(--font-serif), serif', fontSize: '1.35rem', fontWeight: 600 }}>{money(a.price)}</b>
                    </span>
                    <Link className="btn btn--secondary btn--sm" href="/book">
                      Add to booking <span className="btn__arrow" aria-hidden="true">→</span>
                    </Link>
                  </div>
                </div>
              </Item>
            ))}
          </Stagger>
        </div>
      </section>

      {/* COMPARE PLANS */}
      <section className="section" id="compare">
        <div className="container container--wide">
          <Reveal>
            <div className="section-head section-head--center">
              <span className="eyebrow eyebrow--center">Compare Plans</span>
              <h2 className="h2">Everything, side by side.</h2>
              <p className="lead">See exactly what each plan includes and pick the level of care that fits your ride.</p>
            </div>
          </Reveal>

          {/* Desktop: scrollable comparison table */}
          <Reveal>
            <div className={`compare-wrap ${styles.compareDesktop}`}>
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Feature</th>
                    {PLANS.map((p) => (
                      <th scope="col" key={p.name} className={`center${p.popular ? ' table__highlight' : ''}`}>{p.name}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {FEATURE_LABELS.map((label) => (
                    <tr key={label}>
                      <td>{label}</td>
                      {PLANS.map((p) => (
                        <td key={p.name} className={`center${p.popular ? ' table__highlight' : ''}`}>
                          {has(p, label)
                            ? <Icon name="check" className="yes" />
                            : <span className="no" aria-label="Not included">–</span>}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>

          {/* Mobile (≤768px): one card per plan */}
          <div className={styles.compareCards}>
            {PLANS.map((p) => (
              <div key={p.name} className={`card card--pad ${styles.compareCard}${p.popular ? ' is-featured' : ''}`}>
                <div className="between" style={{ marginBottom: '1rem' }}>
                  <h3 className="plan__name">{p.name}</h3>
                  {p.popular && <span className="badge badge--live">Most Popular</span>}
                </div>
                <ul className="plan__features">
                  {p.features.map(([label, on]) => (
                    <li key={label} className={on ? '' : 'is-off'}>
                      <Icon name={on ? 'check' : 'plus'} />{label}
                    </li>
                  ))}
                </ul>
                <Link className={`btn ${p.popular ? 'btn--primary' : 'btn--secondary'} btn--block mt-2`} href={`/book?plan=${encodeURIComponent(p.name)}`}>
                  Choose {p.name.replace(' Service', '')} <span className="btn__arrow" aria-hidden="true">→</span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING FAQ */}
      <section className="section section--tight">
        <div className="container">
          <Reveal>
            <div className="section-head section-head--center">
              <span className="eyebrow eyebrow--center">FAQ</span>
              <h2 className="h2">Pricing, payments &amp; warranty.</h2>
            </div>
          </Reveal>
          <Reveal>
            <Accordion single defaultOpen={0} items={PRICING_FAQS.map((f) => ({ q: f.q, a: f.a }))} />
          </Reveal>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="section">
        <div className="container container--wide">
          <Reveal dir="scale">
            <div className="offer-banner" style={{ background: 'var(--ink)' }}>
              <div className="offer-banner__inner" style={{ gridTemplateColumns: '1fr', textAlign: 'center', justifyItems: 'center' }}>
                <div>
                  <span className="eyebrow eyebrow--center" style={{ color: 'var(--accent-2)' }}>No surprises, ever</span>
                  <h2 className="h2" style={{ margin: '1rem 0 0.75rem', fontSize: 'clamp(2rem,4.5vw,3.4rem)' }}>Ready to book your service?</h2>
                  <p style={{ color: 'rgba(255,255,255,.82)', fontSize: '1.12rem', maxWidth: '46ch', margin: '0 auto 2rem' }}>
                    Pick a plan, choose a slot and we will handle the rest — genuine parts, transparent pricing and free doorstep pickup on Standard and above.
                  </p>
                  <div className="cluster" style={{ justifyContent: 'center', gap: '.85rem' }}>
                    <Magnetic>
                      <Link className="btn btn--primary btn--lg" href="/book">Book a Service <span className="btn__arrow" aria-hidden="true">→</span></Link>
                    </Magnetic>
                    <Link className="btn btn--secondary btn--lg" href="/services" style={{ background: 'rgba(255,255,255,.08)', color: '#fff', borderColor: 'rgba(255,255,255,.28)' }}>
                      Explore Services <span className="btn__arrow" aria-hidden="true">→</span>
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
