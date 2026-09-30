import Link from 'next/link';
import { IMG, STATS, TESTIMONIALS, type IconName } from '@/lib/data';
import Icon from '@/components/Icon';
import { Reveal, Stagger, Item, Counter } from '@/components/Motion';
import { SectionHead, TestimonialCard, Stars } from '@/components/UI';
import styles from './page.module.css';

export const metadata = {
  title: 'Our Story',
  description:
    'Since 2013, BIKECARE has treated every bike like a flagship — factory-trained specialists, genuine parts and doorstep service across the city.',
};

const MILESTONES: { year: string; icon: IconName; title: string; desc: string }[] = [
  { year: '2013', icon: 'flag', title: 'The first workshop', desc: 'BIKECARE opens its doors in Indiranagar, Bengaluru with three technicians and one promise — honest, expert care.' },
  { year: '2016', icon: 'truck', title: 'Doorstep pickup arrives', desc: 'We put our first pickup riders on the road, so a service no longer meant losing a day off work.' },
  { year: '2019', icon: 'map', title: 'Ten workshops city-wide', desc: 'Demand outgrew a single garage. We scaled to ten fully-equipped workshops without diluting the craft.' },
  { year: '2022', icon: 'phone', title: 'Live digital tracking', desc: 'Every rider could now follow their bike from pickup to delivery, stage by stage, on their phone.' },
  { year: '2024', icon: 'users', title: '50+ certified technicians', desc: 'Our bench of factory-trained specialists crossed fifty, covering every major brand and bike type.' },
  { year: '2026', icon: 'bike', title: '10,000+ bikes serviced', desc: 'Ten thousand rides restored and counting — held to a 4.9/5 rating by the people who ride them.' },
];

const TEAM: { name: string; role: string; note: string; avatar: string }[] = [
  { name: 'Rohan Kulkarni', role: 'Lead Engine Specialist', note: '18 years under the tank. Rebuilds a top-end the way others change a tyre.', avatar: TESTIMONIALS[4].avatar },
  { name: 'Meera Nair', role: 'Head of Detailing', note: 'Turns tired commuters into showroom-fresh rides, one foam pass at a time.', avatar: TESTIMONIALS[5].avatar },
  { name: 'Vikas Deshmukh', role: 'Master Technician — Brakes & Suspension', note: 'If it should feel razor-sharp and planted, it goes through Vikas first.', avatar: TESTIMONIALS[2].avatar },
  { name: 'Aisha Khan', role: 'Electrical Systems Lead', note: 'Chases down the gremlins no one else can find in the wiring loom.', avatar: TESTIMONIALS[1].avatar },
];

const CERTS: { icon: IconName; label: string }[] = [
  { icon: 'badge', label: 'OEM Certified' },
  { icon: 'shield', label: 'ISO 9001' },
  { icon: 'gear', label: 'Genuine Parts Partner' },
  { icon: 'droplet', label: 'Eco-Safe Disposal' },
];

export default function AboutPage() {
  return (
    <>
      {/* PAGE HERO */}
      <section className="page-hero">
        <div className="container container--wide">
          <div className="page-hero__inner">
            <Reveal as="div">
              <nav className="breadcrumbs">
                <Link href="/">Home</Link>
                <span className="sep">/</span>
                <span>About</span>
              </nav>
            </Reveal>
            <Reveal delay={0.05}><span className="eyebrow">Our Story</span></Reveal>
            <Reveal delay={0.12}><h1 className="h1 mt-1">We treat every bike like a flagship.</h1></Reveal>
            <Reveal delay={0.2}>
              <p className="lead mt-2">
                Since 2013, BIKECARE has grown from a single Bengaluru garage into a city-wide service
                network — but the obsession has never changed: give every ride, from a daily commuter to a
                track-day superbike, the care a flagship deserves.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* BRAND STORY */}
      <section className="section section--tight">
        <div className="container container--wide">
          <div className={styles.story}>
            <Reveal dir="left">
              <div className={styles.storyMedia}>
                <img src={IMG.workshop} alt="The BIKECARE workshop floor in Bengaluru" loading="lazy" />
              </div>
            </Reveal>
            <Reveal dir="right">
              <div className="glass card--pad" style={{ padding: 'clamp(1.6rem, 3vw, 2.6rem)' }}>
                <span className="eyebrow">How it started</span>
                <h2 className="h2 mt-1 mb-3">A garage built by riders, for riders.</h2>
                <p className="lead" style={{ fontSize: '1.05rem', marginBottom: '1.1rem' }}>
                  BIKECARE began in 2013 because our founders were tired of the same story — vague quotes,
                  swapped-in cheap parts and a service that ate a whole day. So they opened one small
                  workshop with a simple rule: do it right, and tell the rider exactly what you did.
                </p>
                <p className="muted" style={{ marginBottom: '1.1rem' }}>
                  That rule turned into a craft. We invested in factory training, in genuine OEM parts, and
                  in the unglamorous details — torque specs, clean bays, honest diagnostics — that separate
                  a real service from a quick wipe-down.
                </p>
                <p className="muted" style={{ marginBottom: 0 }}>
                  Thirteen years on, thousands of riders trust us with everything from their first scooter to
                  their dream superbike. The workshops are bigger and the tracking is smarter, but the
                  handshake behind every job is exactly the same.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* MISSION & VISION */}
      <section className="section section--tight">
        <div className="container container--wide">
          <Stagger className="grid grid--2">
            <Item>
              <div className="card card--pad card--hover" style={{ height: '100%' }}>
                <span className="icon-badge icon-badge--lg"><Icon name="flag" /></span>
                <h3 className="h3 mt-3 mb-2">Our Mission</h3>
                <p className="muted" style={{ marginBottom: 0 }}>
                  To make expert, honest bike care effortless — genuine parts, transparent pricing and
                  doorstep convenience — so every rider spends less time waiting and more time riding.
                </p>
              </div>
            </Item>
            <Item>
              <div className="card card--pad card--hover" style={{ height: '100%' }}>
                <span className="icon-badge icon-badge--lg"><Icon name="sparkle" /></span>
                <h3 className="h3 mt-3 mb-2">Our Vision</h3>
                <p className="muted" style={{ marginBottom: 0 }}>
                  A city where no rider settles for a rough idle, a spongy brake or a mystery invoice — where
                  premium, transparent service is simply the standard, not the exception.
                </p>
              </div>
            </Item>
          </Stagger>
        </div>
      </section>

      {/* MILESTONES TIMELINE */}
      <section className="section">
        <div className="container container--narrow">
          <Reveal>
            <SectionHead
              center
              eyebrow="Milestones"
              title="Thirteen years, one standard."
              lead="The moments that shaped how BIKECARE cares for your ride today."
            />
          </Reveal>
          <div className="timeline timeline--v">
            {MILESTONES.map((m, i) => (
              <Reveal key={m.year} dir="left" delay={i * 0.05}>
                <div className="tl-step">
                  <div className="tl-step__dot"><Icon name={m.icon} /></div>
                  <div>
                    <div className="tl-step__num">{m.year}</div>
                    <h3 className="tl-step__title">{m.title}</h3>
                    <p className="tl-step__desc">{m.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* STATISTICS BAND */}
      <section className="section section--tight">
        <div className="container container--wide">
          <Reveal dir="scale">
            <div className="glass" style={{ padding: 'clamp(2rem, 4vw, 3.25rem)' }}>
              <Stagger className="grid grid--4">
                {STATS.map((s) => (
                  <Item key={s.label}>
                    <div className="stat">
                      <div className="stat__num"><Counter to={s.target} decimals={s.decimals} suffix={s.suffix} /></div>
                      <div className="stat__label">{s.label}</div>
                    </div>
                  </Item>
                ))}
              </Stagger>
            </div>
          </Reveal>
        </div>
      </section>

      {/* TEAM */}
      <section className="section section--beige">
        <div className="container container--wide">
          <Reveal>
            <SectionHead
              center
              eyebrow="The People"
              title="Specialists, not generalists."
              lead="Factory-trained technicians who each own a craft — and sign off on every bike that leaves the bay."
            />
          </Reveal>
          <Stagger className="grid grid--4" gap={0.07}>
            {TEAM.map((p) => (
              <Item key={p.name}>
                <div className="card card--pad card--hover center" style={{ height: '100%' }}>
                  <div className={styles.avatar}><img src={p.avatar} alt={p.name} loading="lazy" /></div>
                  <h3 className="h4">{p.name}</h3>
                  <p className="small accent-text" style={{ fontWeight: 600, margin: '0.35rem 0 0.7rem' }}>{p.role}</p>
                  <p className="muted small" style={{ marginBottom: 0 }}>{p.note}</p>
                </div>
              </Item>
            ))}
          </Stagger>
        </div>
      </section>

      {/* CERTIFICATIONS */}
      <section className="section section--tight">
        <div className="container container--wide">
          <Reveal>
            <div className="center mb-3">
              <span className="eyebrow eyebrow--center">Credentials</span>
              <h2 className="h3 mt-1">Backed by the standards that matter.</h2>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="cluster" style={{ justifyContent: 'center', gap: '0.75rem' }}>
              {CERTS.map((c) => (
                <span className="pill" key={c.label}><Icon name={c.icon} />{c.label}</span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* TRUST HIGHLIGHT */}
      <section className="section section--tight">
        <div className="container container--wide">
          <div className="split">
            <Reveal dir="left">
              <div className="glass card--pad center" style={{ padding: 'clamp(2rem, 4vw, 3rem)' }}>
                <div className={styles.rating}><Counter to={4.9} decimals={1} suffix="/5" /></div>
                <div className="mt-2" style={{ display: 'flex', justifyContent: 'center' }}><Stars n={5} /></div>
                <p className="lead mt-2" style={{ marginBottom: 0 }}>
                  A 4.9 average from <b>10,000+ riders</b> who trusted us with their bikes — and came back.
                </p>
              </div>
            </Reveal>
            <Reveal dir="right">
              <TestimonialCard t={TESTIMONIALS[0]} showTag />
            </Reveal>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="section">
        <div className="container container--wide">
          <Reveal dir="scale">
            <div className="offer-banner" style={{ background: 'var(--ink)' }}>
              <div className="offer-banner__bg" style={{ opacity: 0.32 }}>
                <img src={IMG.road} alt="" loading="lazy" />
              </div>
              <div className="offer-banner__inner" style={{ gridTemplateColumns: '1fr', textAlign: 'center', justifyItems: 'center' }}>
                <div>
                  <span className="eyebrow eyebrow--center" style={{ color: 'var(--accent-2)' }}>Ride with us</span>
                  <h2 className="h2" style={{ margin: '1rem 0 0.75rem', fontSize: 'clamp(2.2rem,5vw,3.6rem)' }}>
                    Experience the BIKECARE difference.
                  </h2>
                  <p style={{ color: 'rgba(255,255,255,.82)', fontSize: '1.15rem', maxWidth: '48ch', margin: '0 auto 2rem' }}>
                    Thirteen years of craft, genuine parts and a smoother ride — book your first service and see
                    why riders keep coming back.
                  </p>
                  <div className="cluster" style={{ justifyContent: 'center', gap: '.85rem' }}>
                    <Link className="btn btn--primary btn--lg" href="/book">Book a Service <span className="btn__arrow" aria-hidden="true">→</span></Link>
                    <Link className="btn btn--secondary btn--lg" href="/services" style={{ background: 'rgba(255,255,255,.08)', color: '#fff', borderColor: 'rgba(255,255,255,.28)' }}>Explore Services <span className="btn__arrow" aria-hidden="true">→</span></Link>
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
