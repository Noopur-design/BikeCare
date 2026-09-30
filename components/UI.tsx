import Link from 'next/link';
import Icon from './Icon';
import { Tilt } from './Motion';
import { money, type Service, type Plan, type Testimonial } from '@/lib/data';

export function Stars({ n }: { n: number }) {
  return (
    <span className="stars" aria-label={`${n} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Icon key={i} name="star" filled={i < n} />
      ))}
    </span>
  );
}

export function SectionHead({
  eyebrow, title, lead, center, className,
}: { eyebrow?: string; title: React.ReactNode; lead?: string; center?: boolean; className?: string }) {
  return (
    <div className={`section-head${center ? ' section-head--center' : ''}${className ? ' ' + className : ''}`}>
      {eyebrow && <span className={`eyebrow${center ? ' eyebrow--center' : ''}`}>{eyebrow}</span>}
      <h2 className="h2">{title}</h2>
      {lead && <p className="lead">{lead}</p>}
    </div>
  );
}

export function ServiceCard({ service }: { service: Service }) {
  return (
    <Tilt>
      <article className="card card--hover service-card">
        <div className="card__media">
          <span className="service-card__icon"><Icon name={service.icon} /></span>
          <span className="badge service-card__price">{money(service.price)}+</span>
          <img src={service.img} alt={service.name} loading="lazy" />
        </div>
        <div className="service-card__body">
          <h3 className="service-card__title">{service.name}</h3>
          <p className="service-card__desc">{service.short}</p>
          <div className="service-card__meta">
            <span className="m"><Icon name="clock" />{service.duration}</span>
            <span className="m"><Icon name="shield" />Warranty</span>
          </div>
          <div className="service-card__foot">
            <span className="service-card__from">Starting<b>{money(service.price)}</b></span>
            <Link className="link-arrow" href={`/services/${service.slug}`}>View Details <span className="btn__arrow" aria-hidden="true">→</span></Link>
          </div>
        </div>
      </article>
    </Tilt>
  );
}

export function PlanCard({ plan, billing = 'monthly', full = false }: { plan: Plan; billing?: 'monthly' | 'yearly'; full?: boolean }) {
  const price = billing === 'yearly' ? plan.yearly : plan.price;
  const per = billing === 'yearly' ? 'per year' : 'per service';
  const saving = plan.price * 12 - plan.yearly;
  const feats = full ? plan.features : plan.features.slice(0, 5);
  return (
    <Tilt>
      <article className={`card plan${plan.popular ? ' is-featured' : ''}`}>
        {plan.popular && <span className="badge badge--live plan__badge">Most Popular</span>}
        <h3 className="plan__name">{plan.name}</h3>
        <p className="plan__desc">{plan.desc}</p>
        <div className="plan__price"><sup>₹</sup>{price.toLocaleString('en-IN')}</div>
        <span className="plan__per">{per}</span>
        {billing === 'yearly' && <div className="small accent-text" style={{ marginTop: 4, fontWeight: 600 }}>Save {money(saving)} a year</div>}
        <ul className="plan__features">
          {feats.map(([label, on]) => (
            <li key={label} className={on ? '' : 'is-off'}><Icon name={on ? 'check' : 'plus'} />{label}</li>
          ))}
        </ul>
        <Link className={`btn ${plan.popular ? 'btn--primary' : 'btn--secondary'} btn--block plan__cta`} href={`/book?plan=${encodeURIComponent(plan.name)}`}>
          Choose Plan <span className="btn__arrow" aria-hidden="true">→</span>
        </Link>
      </article>
    </Tilt>
  );
}

export function TestimonialCard({ t, showTag = false }: { t: Testimonial; showTag?: boolean }) {
  return (
    <div className="card card--pad testimonial">
      <div className="between" style={{ marginBottom: '0.6rem' }}>
        <Stars n={t.rating} />
        {showTag && <span className="badge">{t.cat}</span>}
      </div>
      <p className="testimonial__quote">“{t.text}”</p>
      <div className="testimonial__author">
        <span className="testimonial__avatar"><img src={t.avatar} alt={t.name} loading="lazy" /></span>
        <span className="testimonial__meta"><strong>{t.name}</strong><span>{t.bike}</span></span>
      </div>
    </div>
  );
}
