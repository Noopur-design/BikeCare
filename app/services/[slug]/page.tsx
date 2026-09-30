'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import {
  SERVICES, FAQS, TESTIMONIALS, CONTACT, IMG, money,
  type IconName, type Service,
} from '@/lib/data';
import Icon from '@/components/Icon';
import { Reveal, Stagger, Item } from '@/components/Motion';
import { SectionHead, ServiceCard, TestimonialCard } from '@/components/UI';
import Accordion from '@/components/Accordion';
import { toast } from '@/components/Toast';
import styles from './page.module.css';

const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

const PROCESS: { n: string; icon: IconName; title: string; desc: string }[] = [
  { n: '01', icon: 'truck', title: 'Free Doorstep Pickup', desc: 'Our rider collects your bike from your home or office at a slot that suits you.' },
  { n: '02', icon: 'search', title: 'Inspection & Diagnosis', desc: 'A certified technician runs a multi-point check and shares an itemised quote for approval.' },
  { n: '03', icon: 'wrench', title: 'Service with Genuine Parts', desc: 'The work is carried out with OEM-approved parts and workshop-grade tooling.' },
  { n: '04', icon: 'shield', title: 'Quality Check & Delivery', desc: 'A final road test and quality inspection, then your bike returns road-ready and sparkling.' },
];

export default function ServiceDetail() {
  const { slug } = useParams<{ slug: string }>();
  const service: Service | undefined = SERVICES.find((s) => s.slug === slug);

  /* before / after slider */
  const baRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState(52);
  const [dragging, setDragging] = useState(false);
  const moveTo = (clientX: number) => {
    const el = baRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const p = ((clientX - r.left) / r.width) * 100;
    setPos(Math.max(2, Math.min(98, p)));
  };

  if (!service) {
    return (
      <section className="section" style={{ paddingTop: 'calc(var(--nav-h) + 4rem)' }}>
        <div className="container container--narrow">
          <div className="empty">
            <div className="empty__ico"><Icon name="search" /></div>
            <h1 className="h2">Service not found</h1>
            <p className="lead mt-2 mb-3">We couldn&rsquo;t find the service you were looking for. Browse our full range of expert bike care instead.</p>
            <Link className="btn btn--primary" href="/services">Back to all services <span className="btn__arrow" aria-hidden="true">→</span></Link>
          </div>
        </div>
      </section>
    );
  }

  const included: string[] = [
    `Complete ${service.name.toLowerCase()} by certified technicians`,
    'Genuine, manufacturer-approved parts',
    'Comprehensive multi-point safety inspection',
    'Expert diagnosis and post-service road test',
    'Chain lubrication and tension check',
    'All fluid levels checked and topped up',
    'Detailed digital service report',
    'Free doorstep pickup, drop and live tracking',
  ];

  const benefits: { icon: IconName; title: string; desc: string }[] = [
    { icon: 'badge', title: 'Factory-Trained Experts', desc: `Specialists who service your exact make and model every day — precision you can feel on the road.` },
    { icon: 'gear', title: 'Only Genuine Parts', desc: 'OEM and manufacturer-approved components fitted as standard, never a compromise.' },
    { icon: 'tag', title: 'Transparent Pricing', desc: `Starts at ${money(service.price)} with an upfront, itemised quote. No hidden charges, ever.` },
    { icon: 'truck', title: 'Doorstep Convenience', desc: 'Free pickup and drop across the city, booked around your schedule.' },
    { icon: 'shield', title: '90-Day Warranty', desc: 'Every job is backed by a written warranty on workmanship and parts.' },
    { icon: 'phone', title: 'Live Digital Tracking', desc: 'Follow every stage from pickup to delivery, right from your phone.' },
  ];

  const reviews = [0, 1, 2].map((k) => {
    const base = SERVICES.findIndex((s) => s.slug === service.slug);
    return TESTIMONIALS[(base + k) % TESTIMONIALS.length];
  });

  const related = [
    ...SERVICES.filter((s) => s.cat === service.cat && s.slug !== service.slug),
    ...SERVICES.filter((s) => s.cat !== service.cat && s.slug !== service.slug),
  ].slice(0, 3);

  const gallery = [IMG.workshop, IMG.mechanic, IMG.engine, IMG.detailing, IMG.road];
  const beforeImg = IMG.workshop;
  const afterImg = IMG.detailing;

  return (
    <>
      {/* ---------- HERO ---------- */}
      <section className="page-hero">
        <div className="container container--wide">
          <nav className="breadcrumbs">
            <Link href="/">Home</Link><span className="sep">/</span>
            <Link href="/services">Services</Link><span className="sep">/</span>
            <span>{service.name}</span>
          </nav>

          <div className="split" style={{ alignItems: 'center' }}>
            <Reveal dir="left">
              <div className="photo" style={{ borderRadius: 'var(--r-xl)', aspectRatio: '4/5', boxShadow: 'var(--shadow-lg)' }}>
                <img src={service.img} alt={service.name} />
              </div>
            </Reveal>

            <div>
              <Reveal><span className="eyebrow">{cap(service.cat)} · Bike Care</span></Reveal>
              <Reveal delay={0.06}><h1 className="h1" style={{ margin: '1.1rem 0 1.25rem' }}>{service.name}</h1></Reveal>
              <Reveal delay={0.12}><p className="lead" style={{ marginBottom: '1.6rem' }}>{service.desc}</p></Reveal>

              <Reveal delay={0.18}>
                <div className={styles.pills}>
                  <span className="pill"><Icon name="tag" />From {money(service.price)}</span>
                  <span className="pill"><Icon name="clock" />{service.duration}</span>
                  <span className="pill"><Icon name="shield" />90-day warranty</span>
                  <span className="pill"><Icon name="check" />Genuine Parts</span>
                  <span className="pill"><Icon name="badge" />Certified Technicians</span>
                </div>
              </Reveal>

              <Reveal delay={0.24}>
                <div className="cluster" style={{ gap: '0.85rem', marginTop: '2rem' }}>
                  <Link className="btn btn--primary btn--lg" href={`/book?service=${service.slug}`}>Book This Service <span className="btn__arrow" aria-hidden="true">→</span></Link>
                  <a className="btn btn--secondary btn--lg" href={`tel:${CONTACT.phone.replace(/\s/g, '')}`}>Call to enquire <span className="btn__arrow" aria-hidden="true">→</span></a>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- OVERVIEW + INCLUDED + STICKY PANEL ---------- */}
      <section className="section section--tight">
        <div className="container container--wide">
          <div className={styles.layout}>
            {/* content column */}
            <div>
              <Reveal>
                <SectionHead
                  eyebrow="Service Overview"
                  title={<>Precision care for your {service.name.toLowerCase()}.</>}
                />
              </Reveal>
              <Reveal delay={0.06}>
                <div className="prose">
                  <p>
                    Our {service.name} is one of the most requested services at BIKECARE — {service.desc.charAt(0).toLowerCase() + service.desc.slice(1)} Every
                    job is carried out by factory-trained technicians using only genuine, manufacturer-approved parts, so your
                    bike leaves our workshop performing exactly the way it should.
                  </p>
                  <p>
                    Typically completed in {service.duration}, the {service.name.toLowerCase()} starts at just {money(service.price)} with a
                    transparent, itemised quote shared before any work begins. Free doorstep pickup and drop, live digital
                    tracking and a 90-day service warranty come as standard — because premium care should never come with surprises.
                  </p>
                </div>
              </Reveal>

              <Reveal>
                <h3 className="h4" style={{ margin: '2.5rem 0 1.25rem' }}>What&rsquo;s included</h3>
              </Reveal>
              <Reveal delay={0.06}>
                <ul className={styles.incl}>
                  {included.map((item) => (
                    <li key={item} className={styles.inclItem}><Icon name="check" />{item}</li>
                  ))}
                </ul>
              </Reveal>
            </div>

            {/* sticky booking panel */}
            <Reveal dir="right" className="sticky-panel">
              <aside className="card card--pad">
                <span className="eyebrow">Book this service</span>
                <div className={styles.panelPrice}><sup>₹</sup>{service.price.toLocaleString('en-IN')}</div>
                <span className="plan__per">starting price · onwards</span>

                <div className={styles.panelMeta}>
                  <div className="summary-row"><span className="lbl">Turnaround</span><span>{service.duration}</span></div>
                  <div className="summary-row"><span className="lbl">Warranty</span><span>90 days</span></div>
                  <div className="summary-row"><span className="lbl">Category</span><span>{cap(service.cat)}</span></div>
                  <div className="summary-row"><span className="lbl">Pickup &amp; drop</span><span>Free</span></div>
                </div>

                <div className={styles.panelCtas}>
                  <Link className="btn btn--primary btn--block" href={`/book?service=${service.slug}`}>Book Now <span className="btn__arrow" aria-hidden="true">→</span></Link>
                  <button
                    className="btn btn--secondary btn--block"
                    onClick={() => toast('Our team will call you back within 15 minutes.', { type: 'success', title: 'Callback requested' })}
                  >
                    Request a callback
                  </button>
                </div>
                <p className="tiny muted" style={{ textAlign: 'center', marginTop: '0.9rem' }}>No payment required to book · Pay after service</p>
              </aside>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------- BENEFITS ---------- */}
      <section className="section section--beige">
        <div className="container container--wide">
          <Reveal>
            <SectionHead
              center
              eyebrow="Why book this service"
              title={<>The BIKECARE difference.</>}
              lead="Every service is engineered around your time, your bike and complete peace of mind."
            />
          </Reveal>
          <Stagger className="grid grid--3" gap={0.07}>
            {benefits.map((b) => (
              <Item key={b.title}>
                <div className="card card--pad card--hover" style={{ height: '100%', display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
                  <span className="icon-badge icon-badge--lg"><Icon name={b.icon} /></span>
                  <h3 className="h4">{b.title}</h3>
                  <p className="feature__desc">{b.desc}</p>
                </div>
              </Item>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ---------- PROCESS ---------- */}
      <section className="section">
        <div className="container container--wide">
          <Reveal>
            <SectionHead
              center
              eyebrow="How it works"
              title={<>Your {service.name.toLowerCase()}, in four simple steps.</>}
              lead="A transparent journey you can follow live, from your doorstep and back again."
            />
          </Reveal>
          <Reveal>
            <div className="timeline timeline--h">
              {PROCESS.map((s) => (
                <div className="tl-step" key={s.n}>
                  <div className="tl-step__dot"><Icon name={s.icon} /></div>
                  <div className="tl-step__num">{s.n}</div>
                  <h3 className="tl-step__title">{s.title}</h3>
                  <p className="tl-step__desc">{s.desc}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------- BEFORE / AFTER ---------- */}
      <section className="section section--tight">
        <div className="container container--wide">
          <Reveal>
            <SectionHead
              eyebrow="Before / After"
              title={<>See the transformation.</>}
              lead="Drag the slider to compare a bike before and after a BIKECARE service."
            />
          </Reveal>
          <Reveal dir="scale">
            <div
              ref={baRef}
              className={`ba ${styles.ba}`}
              onPointerDown={(e) => { setDragging(true); moveTo(e.clientX); }}
              onPointerMove={(e) => { if (dragging) moveTo(e.clientX); }}
              onPointerUp={() => setDragging(false)}
              onPointerLeave={() => setDragging(false)}
              onTouchMove={(e) => moveTo(e.touches[0].clientX)}
            >
              <img src={beforeImg} alt="Bike before service" draggable={false} />
              <img className="ba__after" src={afterImg} alt="Bike after service" draggable={false} style={{ clipPath: `inset(0 0 0 ${pos}%)` }} />
              <span className="ba__tag ba__tag--before">Before</span>
              <span className="ba__tag ba__tag--after">After</span>
              <div className="ba__handle" style={{ left: `${pos}%` }} role="presentation" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------- GALLERY ---------- */}
      <section className="section">
        <div className="container container--wide">
          <Reveal>
            <SectionHead
              eyebrow="From our workshop"
              title={<>Craft, care and attention to detail.</>}
            />
          </Reveal>
          <Reveal>
            <div className="gallery">
              {gallery.map((src, i) => (
                <div key={src + i} className={`gallery__item${i === 0 ? ' gallery__item--wide' : ''}`}>
                  <img src={src} alt={`${service.name} at the BIKECARE workshop`} loading="lazy" />
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------- REVIEWS ---------- */}
      <section className="section section--beige">
        <div className="container container--wide">
          <Reveal>
            <SectionHead
              center
              eyebrow="Rider stories"
              title={<>Loved by riders like you.</>}
              lead="Real reviews from riders who trust BIKECARE with their machines."
            />
          </Reveal>
          <Stagger className="grid grid--3" gap={0.08}>
            {reviews.map((t) => (
              <Item key={t.name}><TestimonialCard t={t} showTag /></Item>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ---------- FAQ ---------- */}
      <section className="section">
        <div className="container">
          <Reveal>
            <SectionHead center eyebrow="FAQ" title={<>Questions, answered.</>} />
          </Reveal>
          <Reveal>
            <Accordion single defaultOpen={0} items={FAQS.slice(0, 4).map((f) => ({ q: f.q, a: f.a }))} />
          </Reveal>
          <Reveal>
            <div className="center mt-4">
              <Link className="btn btn--secondary" href="/faq">View all FAQs <span className="btn__arrow" aria-hidden="true">→</span></Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------- RELATED SERVICES ---------- */}
      <section className="section section--tight">
        <div className="container container--wide">
          <Reveal>
            <div className="between" style={{ alignItems: 'flex-end', marginBottom: '2.5rem' }}>
              <div className="section-head" style={{ marginBottom: 0 }}>
                <span className="eyebrow">Related services</span>
                <h2 className="h2">You might also need.</h2>
              </div>
              <Link className="link-arrow" href="/services">View all services <span className="btn__arrow" aria-hidden="true">→</span></Link>
            </div>
          </Reveal>
          <Stagger className="grid grid--3" gap={0.07}>
            {related.map((s) => (
              <Item key={s.slug}><ServiceCard service={s} /></Item>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ---------- FINAL CTA ---------- */}
      <section className="section">
        <div className="container container--wide">
          <Reveal dir="scale">
            <div className="offer-banner" style={{ background: 'var(--ink)' }}>
              <div className="offer-banner__bg" style={{ opacity: 0.3 }}><img src={service.img} alt="" loading="lazy" /></div>
              <div className="offer-banner__inner" style={{ gridTemplateColumns: '1fr', textAlign: 'center', justifyItems: 'center' }}>
                <div>
                  <span className="eyebrow eyebrow--center" style={{ color: 'var(--accent-2)' }}>Ready when you are</span>
                  <h2 className="h2" style={{ margin: '1rem 0 0.75rem', fontSize: 'clamp(2rem,5vw,3.4rem)' }}>Book your {service.name.toLowerCase()} today</h2>
                  <p style={{ color: 'rgba(255,255,255,.82)', fontSize: '1.12rem', maxWidth: '46ch', margin: '0 auto 2rem' }}>Genuine parts, certified technicians and free doorstep pickup — all from {money(service.price)}.</p>
                  <div className="cluster" style={{ justifyContent: 'center', gap: '.85rem' }}>
                    <Link className="btn btn--primary btn--lg" href={`/book?service=${service.slug}`}>Book This Service <span className="btn__arrow" aria-hidden="true">→</span></Link>
                    <Link className="btn btn--secondary btn--lg" href="/pricing" style={{ background: 'rgba(255,255,255,.08)', color: '#fff', borderColor: 'rgba(255,255,255,.28)' }}>View Pricing <span className="btn__arrow" aria-hidden="true">→</span></Link>
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
