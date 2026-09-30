'use client';

import { useState } from 'react';
import Link from 'next/link';
import Icon from '@/components/Icon';
import { Reveal, Stagger, Item } from '@/components/Motion';
import { toast } from '@/components/Toast';
import Select from '@/components/Select';
import { CONTACT, IMG, type IconName } from '@/lib/data';

type Field = 'name' | 'email' | 'phone' | 'subject' | 'message';
type FormState = Record<Field, string>;

const EMPTY: FormState = { name: '', email: '', phone: '', subject: '', message: '' };

const SUBJECTS = ['General Enquiry', 'Booking Help', 'Feedback', 'Partnership'];

const INFO: { icon: IconName; label: string; value: string; href?: string; note?: string }[] = [
  { icon: 'phone', label: 'Call us', value: CONTACT.phone, href: `tel:${CONTACT.phone.replace(/\s/g, '')}`, note: 'Speak to a service advisor' },
  { icon: 'mail', label: 'Email us', value: CONTACT.email, href: `mailto:${CONTACT.email}`, note: 'We reply within 24 hours' },
  { icon: 'pin', label: 'Visit the workshop', value: CONTACT.address, note: 'Free parking on-site' },
  { icon: 'clock', label: 'Business hours', value: CONTACT.hours, note: 'Emergency support 24/7' },
];

const SOCIALS: { icon: IconName; label: string }[] = [
  { icon: 'sparkle', label: 'Instagram' },
  { icon: 'users', label: 'Facebook' },
  { icon: 'phone', label: 'WhatsApp' },
  { icon: 'flag', label: 'YouTube' },
];

export default function ContactPage() {
  const [form, setForm] = useState<FormState>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<Field, string>>>({});
  const [loading, setLoading] = useState(false);

  const set =
    (k: Field) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const v = e.target.value;
      setForm((f) => ({ ...f, [k]: v }));
      setErrors((x) => {
        if (!x[k]) return x;
        const n = { ...x };
        delete n[k];
        return n;
      });
    };

  const validate = (): Partial<Record<Field, string>> => {
    const e: Partial<Record<Field, string>> = {};
    if (!form.name.trim()) e.name = 'Please enter your name.';
    if (!form.email.trim()) e.email = 'Please enter your email.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) e.email = 'Enter a valid email address.';
    if (!form.phone.trim()) e.phone = 'Please enter a phone number.';
    if (!form.subject) e.subject = 'Please choose a subject.';
    if (!form.message.trim()) e.message = 'Please tell us how we can help.';
    return e;
  };

  const onSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length) {
      toast('Please fix the highlighted fields.', { type: 'error' });
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast("Message sent — we'll reply within 24 hours.", { type: 'success', title: 'Thank you!' });
      setForm(EMPTY);
      setErrors({});
    }, 1000);
  };

  return (
    <>
      {/* HERO */}
      <section className="page-hero">
        <div className="container container--wide">
          <div className="page-hero__inner">
            <Reveal>
              <nav className="breadcrumbs">
                <Link href="/">Home</Link>
                <span className="sep">/</span>
                <span>Contact</span>
              </nav>
            </Reveal>
            <Reveal delay={0.06}><span className="eyebrow">Get in touch</span></Reveal>
            <Reveal delay={0.12}><h1 className="h1 mt-1">We&rsquo;re here to help.</h1></Reveal>
            <Reveal delay={0.18}>
              <p className="lead mt-2">
                Questions about a service, a booking or your bike? Drop us a message, call the workshop, or
                pop in for a chat — our advisors reply fast and speak plain, honest bike.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* FORM + INFO */}
      <section className="section section--tight">
        <div className="container container--wide">
          <div className="split" style={{ alignItems: 'start' }}>
            {/* LEFT — form */}
            <Reveal dir="left">
              <div className="card card--pad">
                <span className="eyebrow">Send a message</span>
                <h2 className="h3 mt-1" style={{ marginBottom: '0.4rem' }}>Tell us how we can help.</h2>
                <p className="muted small" style={{ marginBottom: '1.6rem' }}>
                  Fields marked <span className="accent-text">*</span> are required.
                </p>

                <form className="form" onSubmit={onSubmit} noValidate>
                  <div className="form-row">
                    <div className={`field${errors.name ? ' has-error' : ''}`}>
                      <label className="field__label" htmlFor="c-name">Full Name <span className="req">*</span></label>
                      <input id="c-name" className="input" type="text" autoComplete="name" placeholder="e.g. Arjun Mehta" value={form.name} onChange={set('name')} />
                      <span className="field__error"><Icon name="bell" />{errors.name}</span>
                    </div>
                    <div className={`field${errors.email ? ' has-error' : ''}`}>
                      <label className="field__label" htmlFor="c-email">Email <span className="req">*</span></label>
                      <input id="c-email" className="input" type="email" autoComplete="email" placeholder="you@example.com" value={form.email} onChange={set('email')} />
                      <span className="field__error"><Icon name="bell" />{errors.email}</span>
                    </div>
                  </div>

                  <div className="form-row">
                    <div className={`field${errors.phone ? ' has-error' : ''}`}>
                      <label className="field__label" htmlFor="c-phone">Phone <span className="req">*</span></label>
                      <input id="c-phone" className="input" type="tel" autoComplete="tel" placeholder="+91 98765 43210" value={form.phone} onChange={set('phone')} />
                      <span className="field__error"><Icon name="bell" />{errors.phone}</span>
                    </div>
                    <div className={`field${errors.subject ? ' has-error' : ''}`}>
                      <label className="field__label" htmlFor="c-subject">Subject <span className="req">*</span></label>
                      <Select id="c-subject" ariaLabel="Subject" placeholder="Choose a topic…" value={form.subject}
                        invalid={!!errors.subject}
                        onChange={(v) => { setForm((f) => ({ ...f, subject: v })); setErrors((x) => { if (!x.subject) return x; const n = { ...x }; delete n.subject; return n; }); }}
                        options={SUBJECTS} />
                      <span className="field__error"><Icon name="bell" />{errors.subject}</span>
                    </div>
                  </div>

                  <div className={`field${errors.message ? ' has-error' : ''}`}>
                    <label className="field__label" htmlFor="c-message">Message <span className="req">*</span></label>
                    <textarea id="c-message" className="textarea" placeholder="Tell us about your bike and what you need…" value={form.message} onChange={set('message')} />
                    <span className="field__error"><Icon name="bell" />{errors.message}</span>
                  </div>

                  <button type="submit" className={`btn btn--primary btn--lg btn--block${loading ? ' is-loading' : ''}`}>
                    Send Message <span className="btn__arrow" aria-hidden="true">→</span>
                  </button>
                  <p className="tiny muted center" style={{ marginTop: '0.4rem' }}>
                    We&rsquo;ll never share your details. Expect a reply within one business day.
                  </p>
                </form>
              </div>
            </Reveal>

            {/* RIGHT — info */}
            <Reveal dir="right">
              <div className="stack" style={{ gap: '1rem' }}>
                <Stagger className="stack" gap={0.07} style={{ gap: '1rem' }}>
                  {INFO.map((c) => {
                    const inner = (
                      <>
                        <span className="icon-badge"><Icon name={c.icon} /></span>
                        <div>
                          <div className="small" style={{ fontWeight: 700, marginBottom: 2 }}>{c.label}</div>
                          <div style={{ fontWeight: 600 }}>{c.value}</div>
                          {c.note && <div className="tiny muted" style={{ marginTop: 4 }}>{c.note}</div>}
                        </div>
                      </>
                    );
                    return (
                      <Item key={c.label}>
                        {c.href ? (
                          <a className="glass card--hover" href={c.href} style={{ display: 'flex', gap: '1rem', alignItems: 'center', padding: '1.15rem 1.3rem' }}>
                            {inner}
                          </a>
                        ) : (
                          <div className="glass" style={{ display: 'flex', gap: '1rem', alignItems: 'center', padding: '1.15rem 1.3rem' }}>
                            {inner}
                          </div>
                        )}
                      </Item>
                    );
                  })}
                </Stagger>

                <div className="glass" style={{ padding: '1.15rem 1.3rem' }}>
                  <div className="small" style={{ fontWeight: 700, marginBottom: '0.8rem' }}>Follow the ride</div>
                  <div className="cluster">
                    {SOCIALS.map((s) => (
                      <button
                        key={s.label}
                        type="button"
                        className="btn btn--secondary btn--sm"
                        onClick={() => toast(`Opening BIKECARE on ${s.label}…`, { type: 'info' })}
                      >
                        <Icon name={s.icon} />{s.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* EMERGENCY ROADSIDE */}
      <section className="section section--tight">
        <div className="container container--wide">
          <Reveal dir="scale">
            <div className="offer-banner" style={{ background: 'var(--ink)' }}>
              <div className="offer-banner__bg" style={{ opacity: 0.28 }}>
                <img src={IMG.road} alt="" data-fb loading="lazy" />
              </div>
              <div className="offer-banner__inner">
                <div>
                  <span className="badge badge--live"><Icon name="bolt" />24/7 Support</span>
                  <h2 className="h2" style={{ margin: '1rem 0 0.6rem', fontSize: 'clamp(1.9rem,4vw,3rem)' }}>
                    24/7 Emergency Roadside Assistance
                  </h2>
                  <p style={{ color: 'rgba(255,255,255,.82)', fontSize: '1.08rem', maxWidth: '46ch' }}>
                    Broken down or stranded? Our rapid-response riders reach you across the city — any hour,
                    any day. One call and help is on the way.
                  </p>
                </div>
                <div className="center">
                  <p style={{ color: 'rgba(255,255,255,.7)', fontSize: '.78rem', textTransform: 'uppercase', letterSpacing: '.1em', marginBottom: '.9rem' }}>
                    Emergency helpline
                  </p>
                  <a className="btn btn--primary btn--lg" href={`tel:${CONTACT.emergency.replace(/\s/g, '')}`}>
                    <Icon name="phone" />{CONTACT.emergency}
                  </a>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* MAP */}
      <section className="section section--tight">
        <div className="container container--wide">
          <Reveal>
            <div className="between" style={{ alignItems: 'flex-end', marginBottom: '1.75rem' }}>
              <div className="section-head" style={{ marginBottom: 0 }}>
                <span className="eyebrow">Find us</span>
                <h2 className="h2">Our Indiranagar workshop.</h2>
              </div>
              <span className="cluster small muted" style={{ gap: '0.5rem' }}>
                <Icon name="pin" />{CONTACT.address}
              </span>
            </div>
          </Reveal>
          <Reveal dir="scale">
            <div className="map">
              <iframe
                title="BIKECARE workshop location in Indiranagar, Bengaluru"
                src="https://www.openstreetmap.org/export/embed.html?bbox=77.630%2C12.965%2C77.650%2C12.980&layer=mapnik&marker=12.9719%2C77.6412"
                loading="lazy"
              />
            </div>
          </Reveal>
          <Reveal>
            <div className="center mt-4">
              <p className="lead" style={{ marginBottom: '1.1rem' }}>Prefer to book straight away?</p>
              <div className="cluster" style={{ justifyContent: 'center', gap: '0.85rem' }}>
                <Link className="btn btn--primary btn--lg" href="/book">Book a Service <span className="btn__arrow" aria-hidden="true">→</span></Link>
                <Link className="btn btn--secondary btn--lg" href="/services">Explore Services <span className="btn__arrow" aria-hidden="true">→</span></Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
