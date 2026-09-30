import Link from 'next/link';
import { IMG, WHY, type IconName } from '@/lib/data';
import Icon from '@/components/Icon';
import { Reveal, Stagger, Item, Counter } from '@/components/Motion';

export const metadata = {
  title: 'How It Works',
  description:
    'From your doorstep and back — the full BIKECARE journey in eight transparent stages: selection, service, scheduling, pickup, inspection, repair, quality check and delivery.',
};

type Stage = {
  n: string;
  kicker: string;
  icon: IconName;
  title: string;
  desc: string;
  img: string;
  points: string[];
};

const STAGES: Stage[] = [
  {
    n: '01',
    kicker: 'Get started',
    icon: 'bike',
    title: 'Bike Selection',
    desc: 'Tell us what you ride. Pick your brand, model and registration in seconds — we instantly load the right service schedule, genuine-parts catalogue and pricing tuned to your exact machine.',
    img: IMG.heroAlt,
    points: [
      'Every major brand — Royal Enfield to BMW',
      'Sports, street, cruiser, adventure & scooters',
      'Model-specific history saved to your profile',
    ],
  },
  {
    n: '02',
    kicker: 'Your call',
    icon: 'wrench',
    title: 'Service Selection',
    desc: 'Choose exactly the care your bike needs — from a quick oil change to a complete engine overhaul. Every service is itemised upfront, with add-ons you can bundle in a single tap.',
    img: IMG.workshop,
    points: [
      'Eight core services and six premium add-ons',
      'Transparent, itemised pricing — no surprises',
      'Smart suggestions based on your mileage',
    ],
  },
  {
    n: '03',
    kicker: 'On your time',
    icon: 'calendar',
    title: 'Scheduling',
    desc: 'Book a slot that fits your day, not ours. Same-day and next-morning windows are available, and you can reschedule free of charge up to four hours before pickup.',
    img: IMG.garage,
    points: [
      'Same-day and next-morning slots',
      'Free rescheduling up to four hours prior',
      'Instant confirmation to your phone',
    ],
  },
  {
    n: '04',
    kicker: 'We come to you',
    icon: 'truck',
    title: 'Pickup',
    desc: "Stay exactly where you are. A BIKECARE rider collects your bike from your doorstep, free of charge, and you'll get a live notification the moment we're on the way.",
    img: IMG.road,
    points: [
      'Free doorstep pickup within your plan radius',
      'Real-time rider location updates',
      'Contactless handover with a digital checklist',
    ],
  },
  {
    n: '05',
    kicker: 'Full transparency',
    icon: 'search',
    title: 'Inspection',
    desc: 'Before a single spanner turns, our technicians run a detailed multi-point inspection and share a photo-backed diagnostic report — so you approve the work before it begins.',
    img: IMG.mechanic,
    points: [
      '20 to 50-point inspection, by plan',
      'Photo and video diagnostic report',
      'Nothing proceeds without your approval',
    ],
  },
  {
    n: '06',
    kicker: 'Expert hands',
    icon: 'gear',
    title: 'Repair',
    desc: 'Factory-trained specialists get to work with genuine, manufacturer-approved parts. Precision tuning, fluid replacement and component care — done right the first time.',
    img: IMG.engine,
    points: [
      'Certified technicians, genuine OEM parts',
      'Precision engine and brake tuning',
      'Every job logged to your service history',
    ],
  },
  {
    n: '07',
    kicker: 'Zero compromise',
    icon: 'shield',
    title: 'Quality Check',
    desc: "Every bike passes a final quality gate — a short road test and a second technician's sign-off — before it earns its place back on the road, backed by our written service warranty.",
    img: IMG.mechanic2,
    points: [
      'Independent second-technician sign-off',
      'A short road test for every service',
      'Written warranty on workmanship and parts',
    ],
  },
  {
    n: '08',
    kicker: 'Back to you',
    icon: 'flag',
    title: 'Delivery',
    desc: 'Your bike returns road-ready, cleaned and gleaming, at a time that suits you. Settle up digitally or on delivery, then rate your experience — we read every review.',
    img: IMG.detailing,
    points: [
      'Doorstep drop, washed and polished',
      'Pay digitally or on delivery',
      'Rate your service in a tap',
    ],
  },
];

const ASSURE: { num: React.ReactNode; label: string }[] = [
  { num: <Counter to={2} />, label: 'Minutes to book online' },
  { num: 'Free', label: 'Doorstep pickup & drop' },
  { num: 'Live', label: 'Real-time service tracking' },
];

export default function HowItWorksPage() {
  return (
    <>
      {/* HERO */}
      <section className="page-hero page-hero--center">
        <div className="container container--wide">
          <div className="page-hero__inner">
            <Reveal as="div">
              <nav className="breadcrumbs" style={{ justifyContent: 'center' }} aria-label="Breadcrumb">
                <Link href="/">Home</Link>
                <span className="sep">/</span>
                <span>How It Works</span>
              </nav>
            </Reveal>
            <Reveal delay={0.05}><span className="eyebrow eyebrow--center">How It Works</span></Reveal>
            <Reveal delay={0.12}><h1 className="h1 mt-1 balance">From your doorstep, and back — better.</h1></Reveal>
            <Reveal delay={0.2}>
              <p className="lead mt-2 pretty">
                A premium bike service should feel effortless. Here is the full BIKECARE journey — eight
                transparent stages you can follow live, from the moment you book to the moment your ride
                returns gleaming.
              </p>
            </Reveal>
            <Reveal delay={0.28}>
              <div className="cluster mt-3" style={{ justifyContent: 'center', gap: '0.85rem' }}>
                <Link className="btn btn--primary btn--lg" href="/book">Book a Service <span className="btn__arrow" aria-hidden="true">→</span></Link>
                <Link className="btn btn--secondary btn--lg" href="/track">Track a Service <span className="btn__arrow" aria-hidden="true">→</span></Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ASSURANCE STRIP */}
      <section className="section section--tight" style={{ paddingTop: 0 }}>
        <div className="container container--wide">
          <Reveal dir="scale">
            <div className="glass" style={{ padding: 'clamp(1.75rem, 3.5vw, 2.75rem)' }}>
              <Stagger className="grid grid--3" gap={0.1}>
                {ASSURE.map((a) => (
                  <Item key={a.label}>
                    <div className="stat">
                      <div className="stat__num">{a.num}</div>
                      <div className="stat__label">{a.label}</div>
                    </div>
                  </Item>
                ))}
              </Stagger>
            </div>
          </Reveal>
        </div>
      </section>

      {/* THE FULL JOURNEY — alternating editorial rows */}
      <section className="section">
        <div className="container container--wide">
          <Reveal>
            <div className="section-head section-head--center">
              <span className="eyebrow eyebrow--center">The Full Journey</span>
              <h2 className="h2">Eight stages, one seamless experience.</h2>
              <p className="lead">No black boxes and no guesswork — every step is designed around your time, with full visibility from selection to delivery.</p>
            </div>
          </Reveal>

          <div className="stack" style={{ gap: 'clamp(3.5rem, 7vw, 6rem)' }}>
            {STAGES.map((stage, i) => {
              const imageLeft = i % 2 === 0;
              const imageBlock = (
                <Reveal dir={imageLeft ? 'left' : 'right'}>
                  <div
                    className="photo"
                    style={{ borderRadius: 'var(--r-xl)', aspectRatio: '4/5', boxShadow: 'var(--shadow-lg)' }}
                  >
                    <img src={stage.img} alt={`${stage.title} — BIKECARE`} loading="lazy" />
                  </div>
                </Reveal>
              );
              const textBlock = (
                <Reveal dir={imageLeft ? 'right' : 'left'}>
                  <div>
                    <span className="eyebrow">{stage.kicker}</span>
                    <div className="cluster" style={{ gap: '1.1rem', margin: '1rem 0 0.5rem', alignItems: 'center' }}>
                      <span className="icon-badge icon-badge--lg"><Icon name={stage.icon} /></span>
                      <span
                        className="serif"
                        style={{ fontSize: 'clamp(2.6rem, 5vw, 3.6rem)', fontWeight: 500, lineHeight: 1, color: 'var(--accent)' }}
                      >
                        {stage.n}
                      </span>
                    </div>
                    <h3 className="h2">{stage.title}</h3>
                    <p className="lead mt-2 pretty">{stage.desc}</p>
                    <ul className="plan__features">
                      {stage.points.map((p) => (
                        <li key={p}><Icon name="check" />{p}</li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              );
              return (
                <div className="split" key={stage.n}>
                  {imageLeft ? <>{imageBlock}{textBlock}</> : <>{textBlock}{imageBlock}</>}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* AT A GLANCE — compact horizontal timeline */}
      <section className="section section--beige">
        <div className="container container--wide">
          <Reveal>
            <div className="section-head section-head--center">
              <span className="eyebrow eyebrow--center">At a Glance</span>
              <h2 className="h2">The whole journey, start to finish.</h2>
            </div>
          </Reveal>
          <Reveal>
            <div className="timeline timeline--h">
              {STAGES.map((stage) => (
                <div className="tl-step" key={stage.n}>
                  <div className="tl-step__dot"><Icon name={stage.icon} /></div>
                  <div className="tl-step__num">{stage.n}</div>
                  <h3 className="tl-step__title">{stage.title}</h3>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* WHY THIS WORKS */}
      <section className="section">
        <div className="container container--wide">
          <Reveal>
            <div className="section-head section-head--center">
              <span className="eyebrow eyebrow--center">Why This Works</span>
              <h2 className="h2">Built around trust, not guesswork.</h2>
              <p className="lead">The reasons riders keep coming back — the same principles guide every stage above.</p>
            </div>
          </Reveal>
          <Stagger className="grid grid--3" gap={0.08}>
            {WHY.slice(0, 3).map((w) => (
              <Item key={w.title}>
                <div className="card card--pad card--hover" style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem', height: '100%' }}>
                  <span className="icon-badge icon-badge--lg"><Icon name={w.icon} /></span>
                  <div>
                    <h3 className="feature__title">{w.title}</h3>
                    <p className="feature__desc">{w.desc}</p>
                  </div>
                </div>
              </Item>
            ))}
          </Stagger>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="section section--tight">
        <div className="container container--wide">
          <Reveal dir="scale">
            <div className="offer-banner" style={{ background: 'var(--ink)' }}>
              <div className="offer-banner__bg" style={{ opacity: 0.3 }}>
                <img src={IMG.road} alt="" data-fb loading="lazy" />
              </div>
              <div className="offer-banner__inner" style={{ gridTemplateColumns: '1fr', textAlign: 'center', justifyItems: 'center' }}>
                <div>
                  <span className="eyebrow eyebrow--center" style={{ color: 'var(--accent-2)' }}>Ready when you are</span>
                  <h2 className="h2" style={{ margin: '1rem 0 0.75rem', fontSize: 'clamp(2.2rem, 5vw, 3.6rem)' }}>Start your service journey today.</h2>
                  <p style={{ color: 'rgba(255,255,255,.82)', fontSize: '1.15rem', maxWidth: '48ch', margin: '0 auto 2rem' }}>
                    Book in under two minutes, or follow an existing service live from pickup to delivery.
                  </p>
                  <div className="cluster" style={{ justifyContent: 'center', gap: '.85rem' }}>
                    <Link className="btn btn--primary btn--lg" href="/book">Book a Service <span className="btn__arrow" aria-hidden="true">→</span></Link>
                    <Link className="btn btn--secondary btn--lg" href="/track" style={{ background: 'rgba(255,255,255,.08)', color: '#fff', borderColor: 'rgba(255,255,255,.28)' }}>Track Your Service <span className="btn__arrow" aria-hidden="true">→</span></Link>
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
