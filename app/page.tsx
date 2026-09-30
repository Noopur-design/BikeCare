import Link from 'next/link';
import { IMG, SERVICES, STATS, WHY, STEPS, BRANDS, PLANS, TESTIMONIALS, FAQS, money } from '@/lib/data';
import Icon from '@/components/Icon';
import { Reveal, Stagger, Item, Counter, Marquee } from '@/components/Motion';
import { ServiceCard, PlanCard, TestimonialCard } from '@/components/UI';
import HeroBooking from '@/components/HeroBooking';
import Countdown from '@/components/Countdown';
import Carousel from '@/components/Carousel';
import Accordion from '@/components/Accordion';

const TRUST: { icon: any; label: string }[] = [
  { icon: 'shield', label: 'Genuine Parts' },
  { icon: 'badge', label: 'Certified Technicians' },
  { icon: 'truck', label: 'Free Pickup & Drop' },
  { icon: 'tag', label: 'Transparent Pricing' },
];

export default function Home() {
  return (
    <>
      {/* HERO */}
      <header className="hero">
        <div className="container container--wide">
          <div className="hero__grid">
            <div>
              <Reveal><span className="eyebrow">Keep Your Ride Running Perfect</span></Reveal>
              <Reveal delay={0.08}><h1 className="display" style={{ margin: '1.4rem 0 1.5rem' }}>Premium Bike Service.<br /><span className="accent-text">Zero Downtime.</span></h1></Reveal>
              <Reveal delay={0.16}><p className="lead hero__sub" style={{ marginBottom: '2rem' }}>Expert care, genuine parts and doorstep service to keep your ride road-ready — booked in minutes, tracked in real time.</p></Reveal>
              <Reveal delay={0.24}>
                <div className="cluster" style={{ gap: '0.85rem', marginBottom: '2.4rem' }}>
                  <Link className="btn btn--primary btn--lg" href="/book">Book a Service <span className="btn__arrow" aria-hidden="true">→</span></Link>
                  <Link className="btn btn--secondary btn--lg" href="/services">Explore Services <span className="btn__arrow" aria-hidden="true">→</span></Link>
                </div>
              </Reveal>
              <Reveal delay={0.32}>
                <div className="hero__trust">
                  {TRUST.map((t) => <span key={t.label} className="hero__trust-item"><Icon name={t.icon} />{t.label}</span>)}
                </div>
              </Reveal>
            </div>
            <div className="hero__visual">
              <Reveal dir="scale">
                <div className="hero__photo"><img src={IMG.heroBike} alt="Premium motorcycle in a bright workshop" /></div>
              </Reveal>
              <HeroBooking />
            </div>
          </div>
        </div>
      </header>

      {/* STATS */}
      <section className="section section--tight">
        <div className="container container--wide">
          <Stagger className="grid grid--4">
            {STATS.map((s) => (
              <Item key={s.label}><div className="stat"><div className="stat__num"><Counter to={s.target} decimals={s.decimals} suffix={s.suffix} /></div><div className="stat__label">{s.label}</div></div></Item>
            ))}
          </Stagger>
        </div>
      </section>

      {/* POPULAR SERVICES */}
      <section className="section" id="services">
        <div className="container container--wide">
          <Reveal>
            <div className="between" style={{ alignItems: 'flex-end', marginBottom: '2.5rem' }}>
              <div className="section-head" style={{ marginBottom: 0 }}>
                <span className="eyebrow">Popular Services</span>
                <h2 className="h2">Complete Care for Every Ride.</h2>
              </div>
              <Link className="link-arrow" href="/services">View all services <span className="btn__arrow" aria-hidden="true">→</span></Link>
            </div>
          </Reveal>
          <Stagger className="grid grid--4" gap={0.07}>
            {SERVICES.map((s) => <Item key={s.slug}><ServiceCard service={s} /></Item>)}
          </Stagger>
        </div>
      </section>

      {/* WHY CHOOSE */}
      <section className="section section--beige">
        <div className="container container--wide">
          <div className="split">
            <Reveal dir="left">
              <div className="photo" style={{ borderRadius: 'var(--r-xl)', aspectRatio: '4/5', boxShadow: 'var(--shadow-lg)' }}>
                <img src={IMG.mechanic} alt="Certified technician servicing a motorcycle engine" loading="lazy" />
              </div>
            </Reveal>
            <div>
              <Reveal dir="right"><span className="eyebrow">Why BIKECARE</span><h2 className="h2 mt-1">Why Choose BIKECARE?</h2><p className="lead mt-2 mb-3">We treat every bike like a flagship — with factory-trained specialists, genuine parts and a service experience engineered around your time.</p></Reveal>
              <Stagger className="grid grid--2" gap={0.06} style={{ gap: '0.9rem' }}>
                {WHY.map((w) => (
                  <Item key={w.title}>
                    <div className="card card--pad card--hover" style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', height: '100%' }}>
                      <span className="icon-badge"><Icon name={w.icon} /></span>
                      <div><h3 className="feature__title">{w.title}</h3><p className="feature__desc">{w.desc}</p></div>
                    </div>
                  </Item>
                ))}
              </Stagger>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="section">
        <div className="container container--wide">
          <Reveal><div className="section-head section-head--center"><span className="eyebrow eyebrow--center">How It Works</span><h2 className="h2">Seven steps to a perfect ride.</h2><p className="lead">From your doorstep and back again — a transparent journey you can follow at every stage.</p></div></Reveal>
          <Reveal>
            <div className="timeline timeline--h">
              {STEPS.map((s) => (
                <div className="tl-step" key={s.n}>
                  <div className="tl-step__dot"><Icon name={s.icon} /></div>
                  <div className="tl-step__num">{s.n}</div>
                  <h3 className="tl-step__title">{s.title}</h3>
                  <p className="tl-step__desc">{s.desc}</p>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal><div className="center mt-4"><Link className="btn btn--secondary" href="/how-it-works">See the full process <span className="btn__arrow" aria-hidden="true">→</span></Link></div></Reveal>
        </div>
      </section>

      {/* SPECIAL OFFER */}
      <section className="section section--tight">
        <div className="container container--wide">
          <Reveal dir="scale">
            <div className="offer-banner">
              <div className="offer-banner__bg"><img src={IMG.sport} alt="" data-fb loading="lazy" /></div>
              <div className="offer-banner__inner">
                <div>
                  <span className="badge badge--live">Limited Period</span>
                  <h2 className="h2" style={{ margin: '1rem 0 0.5rem', fontSize: 'clamp(2rem,4vw,3.2rem)' }}>Flat 20% OFF</h2>
                  <p style={{ color: 'rgba(255,255,255,.85)', fontSize: '1.1rem', maxWidth: '40ch', marginBottom: '1.75rem' }}>On Complete Bike Service. Genuine parts, premium detailing and free doorstep pickup included.</p>
                  <div className="cluster" style={{ gap: '1rem' }}>
                    <Link className="btn btn--primary btn--lg" href="/offers">Grab Offer <span className="btn__arrow" aria-hidden="true">→</span></Link>
                    <span className="offer-card__code" style={{ background: 'rgba(255,255,255,.08)', color: '#fff', borderColor: 'rgba(255,255,255,.25)' }}>WEEKDAY20</span>
                  </div>
                </div>
                <div>
                  <p style={{ color: 'rgba(255,255,255,.7)', fontSize: '.8rem', textTransform: 'uppercase', letterSpacing: '.1em', marginBottom: '.9rem' }}>Offer ends in</p>
                  <Countdown hours={48} storageKey="home" />
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* BRANDS */}
      <section className="section section--tight">
        <div className="container container--wide">
          <Reveal><div className="center mb-3"><span className="eyebrow eyebrow--center">Trusted for every brand</span><h2 className="h3 mt-1">We service them all.</h2></div></Reveal>
          <Reveal>
            <Marquee>
              {BRANDS.map((b) => (
                <Link className="brand-tile" href="/services" key={b.name}>{b.name}<small>{b.tag}</small></Link>
              ))}
            </Marquee>
          </Reveal>
        </div>
      </section>

      {/* PRICING PREVIEW */}
      <section className="section section--beige">
        <div className="container container--wide">
          <Reveal><div className="section-head section-head--center"><span className="eyebrow eyebrow--center">Transparent Pricing</span><h2 className="h2">Plans for every rider.</h2><p className="lead">Upfront pricing, genuine parts and warranty on every plan. No hidden charges, ever.</p></div></Reveal>
          <Stagger className="grid grid--4" gap={0.07}>
            {PLANS.map((p) => <Item key={p.name}><PlanCard plan={p} /></Item>)}
          </Stagger>
          <Reveal><div className="center mt-4"><Link className="btn btn--secondary" href="/pricing">Compare all plans <span className="btn__arrow" aria-hidden="true">→</span></Link></div></Reveal>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="section">
        <div className="container container--wide">
          <Reveal>
            <div className="between" style={{ alignItems: 'flex-end', marginBottom: '2rem' }}>
              <div className="section-head" style={{ marginBottom: 0 }}><span className="eyebrow">Loved by riders</span><h2 className="h2">4.9/5 from 10,000+ riders.</h2></div>
              <Link className="link-arrow" href="/testimonials">Read all reviews <span className="btn__arrow" aria-hidden="true">→</span></Link>
            </div>
          </Reveal>
          <Reveal>
            <Carousel perView={3} autoplay>
              {TESTIMONIALS.map((t) => <TestimonialCard key={t.name} t={t} />)}
            </Carousel>
          </Reveal>
        </div>
      </section>

      {/* FAQ PREVIEW */}
      <section className="section section--tight">
        <div className="container">
          <Reveal><div className="section-head section-head--center"><span className="eyebrow eyebrow--center">FAQ</span><h2 className="h2">Questions, answered.</h2></div></Reveal>
          <Reveal><Accordion single defaultOpen={0} items={FAQS.slice(0, 5).map((f) => ({ q: f.q, a: f.a }))} /></Reveal>
          <Reveal><div className="center mt-4"><Link className="btn btn--secondary" href="/faq">View all FAQs <span className="btn__arrow" aria-hidden="true">→</span></Link></div></Reveal>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="section">
        <div className="container container--wide">
          <Reveal dir="scale">
            <div className="offer-banner" style={{ background: 'var(--ink)' }}>
              <div className="offer-banner__bg" style={{ opacity: 0.32 }}><img src={IMG.road} alt="" data-fb loading="lazy" /></div>
              <div className="offer-banner__inner" style={{ gridTemplateColumns: '1fr', textAlign: 'center', justifyItems: 'center' }}>
                <div>
                  <span className="eyebrow eyebrow--center" style={{ color: 'var(--accent-2)' }}>Ready when you are</span>
                  <h2 className="h2" style={{ margin: '1rem 0 0.75rem', fontSize: 'clamp(2.2rem,5vw,3.6rem)' }}>Book Your Bike Service Today</h2>
                  <p style={{ color: 'rgba(255,255,255,.82)', fontSize: '1.15rem', maxWidth: '48ch', margin: '0 auto 2rem' }}>Professional service, genuine parts and a smoother ride — all just a few taps away.</p>
                  <div className="cluster" style={{ justifyContent: 'center', gap: '.85rem' }}>
                    <Link className="btn btn--primary btn--lg" href="/book">Book a Service <span className="btn__arrow" aria-hidden="true">→</span></Link>
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
