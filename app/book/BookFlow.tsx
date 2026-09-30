'use client';

import { Fragment, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { Reveal, Magnetic } from '@/components/Motion';
import Icon from '@/components/Icon';
import { toast } from '@/components/Toast';
import Select from '@/components/Select';
import DatePicker from '@/components/DatePicker';
import { BRANDS, MODELS, SERVICES, ADDONS, PLANS, money, type IconName } from '@/lib/data';

/* ---------- static config ---------- */
const SLOTS = [
  '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
  '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM',
];

const STEP_DEFS: { label: string; icon: IconName }[] = [
  { label: 'Bike', icon: 'bike' },
  { label: 'Service', icon: 'wrench' },
  { label: 'Schedule', icon: 'calendar' },
  { label: 'Pickup', icon: 'truck' },
  { label: 'Details', icon: 'user' },
];

const HEAD: { t: string; d: string }[] = [
  { t: 'Tell us about your bike', d: 'Pick your brand, model and registration to get started.' },
  { t: 'Choose your service', d: 'Select a service and add any extras your ride needs.' },
  { t: 'Pick a date & time', d: 'Choose a slot that fits your schedule.' },
  { t: 'Pickup & drop', d: 'Free doorstep pickup, or drop your bike at our workshop.' },
  { t: 'Your contact details', d: 'Where should we reach you and collect the bike?' },
];

const EASE = [0.22, 1, 0.36, 1] as const;

/* ---------- helpers ---------- */
const norm = (val: string | null, allowed: string[]): string => {
  if (!val) return '';
  return allowed.find((a) => a.toLowerCase() === val.toLowerCase()) ?? '';
};
const emailOk = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
const phoneOk = (v: string) => v.replace(/\D/g, '').length >= 10;
const fmtDate = (d: string) => {
  if (!d) return '';
  const dt = new Date(d + 'T00:00:00');
  if (Number.isNaN(dt.getTime())) return d;
  return dt.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' });
};

function FieldError({ msg }: { msg?: string }) {
  return (
    <span className="field__error">
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="9" /><path d="M12 8v4" /><path d="M12 16h.01" />
      </svg>
      {msg || 'This field is required'}
    </span>
  );
}

export default function BookFlow() {
  const sp = useSearchParams();
  const today = new Date().toISOString().slice(0, 10);

  /* prefill from search params */
  const pfBrand = norm(sp.get('brand'), BRANDS.map((b) => b.name));
  const pfModel = pfBrand ? norm(sp.get('model'), MODELS[pfBrand] ?? []) : '';
  const svcParam = sp.get('service');
  const pfService = svcParam
    ? SERVICES.find((s) => s.slug === svcParam || s.name.toLowerCase() === svcParam.toLowerCase())?.slug ?? ''
    : '';
  const rawDate = sp.get('date') || '';
  const pfDate = /^\d{4}-\d{2}-\d{2}$/.test(rawDate) ? rawDate : '';
  const rawTime = sp.get('time') || '';
  const pfTime = SLOTS.includes(rawTime) ? rawTime : '';
  const rawPickup = (sp.get('pickup') || '').toLowerCase();
  const pfPickup: '' | 'home' | 'workshop' =
    rawPickup.includes('home') || rawPickup === 'pickup'
      ? 'home'
      : rawPickup.includes('work') || rawPickup.includes('drop')
        ? 'workshop'
        : '';
  const pfPlan = norm(sp.get('plan'), PLANS.map((p) => p.name));

  /* earliest incomplete step (reg/details are never prefillable, so this
     lands on the first step still needing input) */
  const initialStep = (() => {
    const checks = [
      !!(pfBrand && pfModel), // reg still required to advance
      !!pfService,
      !!(pfDate && pfTime),
      !!(pfPickup && pfPickup !== 'home'),
      false,
    ];
    const idx = checks.findIndex((c) => !c);
    return idx === -1 ? 4 : idx;
  })();

  /* ---------- state ---------- */
  const [step, setStep] = useState(initialStep);
  const [brand, setBrand] = useState(pfBrand);
  const [model, setModel] = useState(pfModel);
  const [regNo, setRegNo] = useState('');
  const [serviceSlug, setServiceSlug] = useState(pfService);
  const [addons, setAddons] = useState<string[]>([]);
  const [date, setDate] = useState(pfDate);
  const [time, setTime] = useState(pfTime);
  const [pickup, setPickup] = useState<'' | 'home' | 'workshop'>(pfPickup);
  const [pickupAddress, setPickupAddress] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [bookingId, setBookingId] = useState('');

  /* ---------- derived ---------- */
  const models = brand ? MODELS[brand] ?? [] : [];
  const service = SERVICES.find((s) => s.slug === serviceSlug) || null;
  const addonList = ADDONS.filter((a) => addons.includes(a.name));
  const total = (service?.price ?? 0) + addonList.reduce((s, a) => s + a.price, 0);

  /* ---------- actions ---------- */
  const clearErr = (k: string) => setErrors((e) => ({ ...e, [k]: '' }));
  const toggleAddon = (nm: string) =>
    setAddons((p) => (p.includes(nm) ? p.filter((x) => x !== nm) : [...p, nm]));
  const onBrand = (v: string) => {
    setBrand(v);
    setModel('');
    setErrors((e) => ({ ...e, brand: '', model: '' }));
  };

  const validateStep = (i: number): Record<string, string> => {
    const e: Record<string, string> = {};
    if (i === 0) {
      if (!brand) e.brand = 'Select your bike brand';
      if (!model) e.model = 'Select your model';
      if (!regNo.trim()) e.regNo = 'Enter your registration number';
    } else if (i === 1) {
      if (!serviceSlug) e.service = 'Please choose a service type';
    } else if (i === 2) {
      if (!date) e.date = 'Choose a service date';
      else if (date < today) e.date = 'Please choose a future date';
      if (!time) e.time = 'Select a preferred time slot';
    } else if (i === 3) {
      if (!pickup) e.pickup = 'Choose a pickup option';
      if (pickup === 'home' && !pickupAddress.trim()) e.pickupAddress = 'Enter your pickup address';
    } else if (i === 4) {
      if (!name.trim()) e.name = 'Enter your full name';
      if (!phone.trim()) e.phone = 'Enter your phone number';
      else if (!phoneOk(phone)) e.phone = 'Enter a valid phone number';
      if (!email.trim()) e.email = 'Enter your email';
      else if (!emailOk(email)) e.email = 'Enter a valid email address';
      if (!address.trim()) e.address = 'Enter your address';
    }
    return e;
  };

  const goNext = () => {
    const e = validateStep(step);
    if (Object.keys(e).length) {
      setErrors(e);
      toast('Please complete the highlighted fields to continue.', { type: 'error', title: 'Missing details' });
      return;
    }
    setErrors({});
    if (step < 4) setStep(step + 1);
    else doConfirm();
  };

  const goBack = () => {
    if (step > 0) {
      setErrors({});
      setStep(step - 1);
    }
  };

  const jumpTo = (i: number) => {
    if (i < step) {
      setErrors({});
      setStep(i);
    }
  };

  const doConfirm = () => {
    for (let i = 0; i < 5; i++) {
      const e = validateStep(i);
      if (Object.keys(e).length) {
        setErrors(e);
        setStep(i);
        toast('A few details still need your attention before we can confirm.', { type: 'error', title: 'Almost there' });
        return;
      }
    }
    setLoading(true);
    setTimeout(() => {
      setBookingId('BC' + String(Date.now()).slice(-6));
      setConfirmed(true);
      setLoading(false);
      toast('Your booking is confirmed — our rider is on the way!', { type: 'success', title: 'Booking Confirmed' });
    }, 1200);
  };

  /* ---------- summary rows (shared by panel + success recap) ---------- */
  const summaryRows = (
    <>
      <div className="summary-row">
        <span className="lbl">Bike</span>
        <span>{brand && model ? `${brand} ${model}` : 'Not selected'}</span>
      </div>
      {regNo.trim() && (
        <div className="summary-row">
          <span className="lbl">Reg. No</span>
          <span>{regNo.toUpperCase()}</span>
        </div>
      )}
      <div className="summary-row">
        <span className="lbl">Service</span>
        <span>{service ? `${service.name} · ${money(service.price)}` : 'Not selected'}</span>
      </div>
      {addonList.map((a) => (
        <div className="summary-row" key={a.name}>
          <span className="lbl">+ {a.name}</span>
          <span>{money(a.price)}</span>
        </div>
      ))}
      <div className="summary-row">
        <span className="lbl">Pickup</span>
        <span>
          {pickup === 'home' ? 'Home Pickup (Free)' : pickup === 'workshop' ? 'Workshop Drop' : 'Not selected'}
        </span>
      </div>
      <div className="summary-row">
        <span className="lbl">Date &amp; Time</span>
        <span>{date ? `${fmtDate(date)}${time ? ` · ${time}` : ''}` : 'Not selected'}</span>
      </div>
      {pfPlan && (
        <div className="summary-row">
          <span className="lbl">Plan</span>
          <span>{pfPlan}</span>
        </div>
      )}
    </>
  );

  /* ---------- success view ---------- */
  if (confirmed) {
    return (
      <section className="section" style={{ paddingTop: 'calc(var(--nav-h) + 3rem)' }}>
        <div className="container container--narrow">
          <Reveal dir="scale">
            <div className="card card--pad center" style={{ padding: 'clamp(2rem, 5vw, 3.5rem)' }}>
              <div className="success-check"><Icon name="check" /></div>
              <span className="badge badge--live badge--dot">Confirmed</span>
              <h1 className="h2 mt-2">Booking Confirmed!</h1>
              <p className="lead mt-2" style={{ maxWidth: '44ch', marginInline: 'auto' }}>
                Thank you{name ? `, ${name.split(' ')[0]}` : ''}! Your bike service is booked. We&rsquo;ve sent the
                confirmation to your phone and email.
              </p>

              <div
                className="glass"
                style={{
                  display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center',
                  gap: '0.6rem', padding: '1rem 1.4rem', margin: '1.75rem auto 0', width: 'fit-content',
                }}
              >
                <span className="tag">Booking ID</span>
                <strong className="serif" style={{ fontSize: '1.5rem', letterSpacing: '0.06em' }}>{bookingId}</strong>
              </div>

              <div style={{ textAlign: 'left', maxWidth: 460, margin: '2rem auto 0' }}>
                {summaryRows}
                <div className="summary-total">
                  <span>Estimated Total</span>
                  <span className="amt">{money(total)}</span>
                </div>
              </div>

              <div className="cluster mt-4" style={{ justifyContent: 'center', gap: '0.85rem' }}>
                <Magnetic strength={0.25}>
                  <Link className="btn btn--primary btn--lg" href="/track">
                    Track Service <span className="btn__arrow" aria-hidden="true">→</span>
                  </Link>
                </Magnetic>
                <Link className="btn btn--secondary btn--lg" href="/">
                  Back to Home <span className="btn__arrow" aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    );
  }

  /* ---------- step body ---------- */
  const stepBody = (() => {
    switch (step) {
      case 0:
        return (
          <div className="form">
            <div className="form-row">
              <div className={`field${errors.brand ? ' has-error' : ''}`}>
                <label className="field__label" htmlFor="brand">Bike Brand <span className="req">*</span></label>
                <Select id="brand" ariaLabel="Bike Brand" placeholder="Select brand" value={brand}
                  invalid={!!errors.brand} onChange={onBrand} options={BRANDS.map((b) => b.name)} />
                <FieldError msg={errors.brand} />
              </div>
              <div className={`field${errors.model ? ' has-error' : ''}`}>
                <label className="field__label" htmlFor="model">Model <span className="req">*</span></label>
                <Select id="model" ariaLabel="Model" placeholder={brand ? 'Select model' : 'Choose a brand first'}
                  value={model} disabled={!brand} invalid={!!errors.model}
                  onChange={(v) => { setModel(v); clearErr('model'); }} options={models} />
                <FieldError msg={errors.model} />
              </div>
            </div>
            <div className={`field${errors.regNo ? ' has-error' : ''}`}>
              <label className="field__label" htmlFor="reg">Registration Number <span className="req">*</span></label>
              <input
                id="reg" className="input" value={regNo} placeholder="e.g. KA 01 AB 1234"
                style={{ textTransform: 'uppercase' }}
                onChange={(e) => { setRegNo(e.target.value); clearErr('regNo'); }}
              />
              <span className="field__hint">Your bike&rsquo;s number plate — helps our rider identify it.</span>
              <FieldError msg={errors.regNo} />
            </div>
          </div>
        );

      case 1:
        return (
          <div className="stack" style={{ gap: '2rem' }}>
            <div>
              <div className="field__label" style={{ marginBottom: '0.85rem' }}>Service Type <span className="req">*</span></div>
              <div className="choice">
                {SERVICES.map((s) => {
                  const on = serviceSlug === s.slug;
                  return (
                    <motion.button
                      type="button" key={s.slug} whileHover={{ y: -3 }} whileTap={{ scale: 0.99 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                      className={`choice__card${on ? ' is-selected' : ''}`}
                      style={{ width: '100%', textAlign: 'left', minHeight: 44 }}
                      onClick={() => { setServiceSlug(s.slug); clearErr('service'); }}
                      aria-pressed={on}
                    >
                      <span className="choice__radio" />
                      <span className="icon-badge"><Icon name={s.icon} /></span>
                      <span style={{ minWidth: 0 }}>
                        <span className="choice__title" style={{ display: 'block' }}>{s.name}</span>
                        <span className="choice__desc" style={{ display: 'block' }}>{s.duration} · {s.short}</span>
                      </span>
                      <span className="choice__price">{money(s.price)}</span>
                    </motion.button>
                  );
                })}
              </div>
              {errors.service && (
                <p className="small" style={{ color: '#cf4b4b', fontWeight: 600, marginTop: '0.6rem' }}>{errors.service}</p>
              )}
            </div>

            <div>
              <div className="field__label" style={{ marginBottom: '0.85rem' }}>Add-ons <span className="field__hint" style={{ fontWeight: 500 }}>(optional)</span></div>
              <div className="grid grid--2" style={{ gap: '0.75rem' }}>
                {ADDONS.map((a) => {
                  const on = addons.includes(a.name);
                  return (
                    <motion.label
                      key={a.name} className="checkbox" whileHover={{ y: -2 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                      style={{
                        width: '100%', padding: '0.85rem 1rem', minHeight: 44,
                        border: '1px solid var(--border)', borderRadius: 'var(--r-sm)',
                        background: on ? 'var(--accent-soft)' : 'var(--glass)', alignItems: 'center',
                      }}
                    >
                      <input type="checkbox" checked={on} onChange={() => toggleAddon(a.name)} />
                      <span className="checkbox__box"><Icon name="check" /></span>
                      <span style={{ display: 'flex', justifyContent: 'space-between', flex: 1, gap: '0.5rem' }}>
                        <span>{a.name}</span>
                        <span className="muted" style={{ fontWeight: 600 }}>+{money(a.price)}</span>
                      </span>
                    </motion.label>
                  );
                })}
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="form">
            <div className={`field${errors.date ? ' has-error' : ''}`}>
              <label className="field__label" htmlFor="date">Service Date <span className="req">*</span></label>
              <DatePicker id="date" ariaLabel="Service Date" placeholder="Select a date" value={date} min={today}
                invalid={!!errors.date} onChange={(v) => { setDate(v); clearErr('date'); }} />
              <FieldError msg={errors.date} />
            </div>
            <div>
              <div className="field__label" style={{ marginBottom: '0.75rem' }}>Time Slot <span className="req">*</span></div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
                {SLOTS.map((s) => (
                  <button
                    type="button" key={s} className={`chip${time === s ? ' is-active' : ''}`}
                    style={{ minHeight: 44 }}
                    onClick={() => { setTime(s); clearErr('time'); }}
                  >
                    {s}
                  </button>
                ))}
              </div>
              {errors.time && (
                <p className="small" style={{ color: '#cf4b4b', fontWeight: 600, marginTop: '0.6rem' }}>{errors.time}</p>
              )}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="stack" style={{ gap: '1.25rem' }}>
            <div className="choice">
              {([
                { key: 'home', icon: 'truck', title: 'Home Pickup & Drop', desc: 'Our rider collects and returns your bike at your doorstep.', price: 'Free' },
                { key: 'workshop', icon: 'home', title: 'Drop at Workshop', desc: 'Ride in and drop your bike at our service centre.', price: 'Free' },
              ] as const).map((o) => {
                const on = pickup === o.key;
                return (
                  <motion.button
                    type="button" key={o.key} whileHover={{ y: -3 }} whileTap={{ scale: 0.99 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                    className={`choice__card${on ? ' is-selected' : ''}`}
                    style={{ width: '100%', textAlign: 'left', minHeight: 44 }}
                    onClick={() => { setPickup(o.key); clearErr('pickup'); }}
                    aria-pressed={on}
                  >
                    <span className="choice__radio" />
                    <span className="icon-badge"><Icon name={o.icon} /></span>
                    <span style={{ minWidth: 0 }}>
                      <span className="choice__title" style={{ display: 'block' }}>{o.title}</span>
                      <span className="choice__desc" style={{ display: 'block' }}>{o.desc}</span>
                    </span>
                    <span className="choice__price accent-text">{o.price}</span>
                  </motion.button>
                );
              })}
            </div>
            {errors.pickup && (
              <p className="small" style={{ color: '#cf4b4b', fontWeight: 600 }}>{errors.pickup}</p>
            )}
            <AnimatePresence initial={false}>
              {pickup === 'home' && (
                <motion.div
                  key="addr" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.35, ease: EASE }}
                  style={{ overflow: 'hidden' }}
                >
                  <div className={`field${errors.pickupAddress ? ' has-error' : ''}`} style={{ paddingTop: '0.25rem' }}>
                    <label className="field__label" htmlFor="paddr">Pickup Address <span className="req">*</span></label>
                    <textarea
                      id="paddr" className="textarea" value={pickupAddress}
                      placeholder="Flat / house no., street, area, city and pincode"
                      onChange={(e) => { setPickupAddress(e.target.value); clearErr('pickupAddress'); }}
                    />
                    <FieldError msg={errors.pickupAddress} />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );

      default:
        return (
          <div className="form">
            <div className="form-row">
              <div className={`field${errors.name ? ' has-error' : ''}`}>
                <label className="field__label" htmlFor="name">Full Name <span className="req">*</span></label>
                <input id="name" className="input" value={name} placeholder="e.g. Arjun Mehta"
                  onChange={(e) => { setName(e.target.value); clearErr('name'); }} />
                <FieldError msg={errors.name} />
              </div>
              <div className={`field${errors.phone ? ' has-error' : ''}`}>
                <label className="field__label" htmlFor="phone">Phone <span className="req">*</span></label>
                <input id="phone" type="tel" className="input" value={phone} placeholder="+91 98765 43210"
                  onChange={(e) => { setPhone(e.target.value); clearErr('phone'); }} />
                <FieldError msg={errors.phone} />
              </div>
            </div>
            <div className={`field${errors.email ? ' has-error' : ''}`}>
              <label className="field__label" htmlFor="email">Email <span className="req">*</span></label>
              <input id="email" type="email" className="input" value={email} placeholder="you@example.com"
                onChange={(e) => { setEmail(e.target.value); clearErr('email'); }} />
              <FieldError msg={errors.email} />
            </div>
            <div className={`field${errors.address ? ' has-error' : ''}`}>
              <label className="field__label" htmlFor="addr">Address <span className="req">*</span></label>
              <textarea id="addr" className="textarea" value={address}
                placeholder="Where can we reach you?"
                onChange={(e) => { setAddress(e.target.value); clearErr('address'); }} />
              <FieldError msg={errors.address} />
            </div>
            <div className="field">
              <label className="field__label" htmlFor="notes">Notes <span className="field__hint" style={{ fontWeight: 500 }}>(optional)</span></label>
              <textarea id="notes" className="textarea" value={notes} style={{ minHeight: 90 }}
                placeholder="Anything specific you'd like our technicians to check?"
                onChange={(e) => setNotes(e.target.value)} />
            </div>
          </div>
        );
    }
  })();

  /* ---------- main booking layout ---------- */
  return (
    <>
      <section className="page-hero page-hero--center">
        <div className="container container--wide">
          <Reveal>
            <div className="page-hero__inner">
              <nav className="breadcrumbs" style={{ justifyContent: 'center' }}>
                <Link href="/">Home</Link><span className="sep">/</span><span>Book</span>
              </nav>
              <span className="eyebrow eyebrow--center">Book Online</span>
              <h1 className="h1 mt-1">Book Your Service</h1>
              <p className="lead mt-2">
                Genuine parts, certified technicians and free doorstep pickup — booked in minutes, tracked in real time.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 'clamp(1rem, 3vw, 2rem)' }}>
        <div className="container container--wide">
          <div className="book-layout">
            {/* LEFT — form */}
            <Reveal dir="up">
              <div className="card card--pad">
                {/* stepper */}
                <div className="stepper">
                  {STEP_DEFS.map((s, i) => (
                    <Fragment key={s.label}>
                      <button
                        type="button"
                        className={`stepper__step${i === step ? ' is-active' : ''}${i < step ? ' is-done' : ''}`}
                        style={{ background: 'none', border: 'none', padding: 0, cursor: i < step ? 'pointer' : 'default' }}
                        onClick={() => jumpTo(i)}
                        aria-current={i === step ? 'step' : undefined}
                      >
                        <span className="stepper__num">
                          {i < step ? (
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round"><path d="m5 12 5 5L20 7" /></svg>
                          ) : (
                            i + 1
                          )}
                        </span>
                        <span className="stepper__label">{s.label}</span>
                      </button>
                      {i < STEP_DEFS.length - 1 && <span className="stepper__line" />}
                    </Fragment>
                  ))}
                </div>

                {/* step heading */}
                <div style={{ marginBottom: '1.5rem' }}>
                  {pfPlan && step === 0 && (
                    <span className="badge badge--dot" style={{ marginBottom: '0.75rem' }}>{pfPlan} plan selected</span>
                  )}
                  <h2 className="h3">{HEAD[step].t}</h2>
                  <p className="muted small" style={{ marginTop: '0.35rem' }}>{HEAD[step].d}</p>
                </div>

                {/* animated step content */}
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={step}
                    initial={{ opacity: 0, x: 28 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -28 }}
                    transition={{ duration: 0.4, ease: EASE }}
                  >
                    {stepBody}
                  </motion.div>
                </AnimatePresence>

                {/* controls */}
                <div className="between" style={{ marginTop: '2.25rem', gap: '1rem' }}>
                  <button
                    type="button" className={`btn btn--secondary${step === 0 ? ' is-disabled' : ''}`}
                    onClick={goBack} disabled={step === 0}
                  >
                    <span aria-hidden="true">←</span> Back
                  </button>
                  <Magnetic strength={0.25}>
                    <button
                      type="button"
                      className={`btn btn--primary btn--lg${loading ? ' is-loading' : ''}`}
                      onClick={goNext}
                    >
                      {step < 4 ? 'Continue' : 'Confirm Booking'}
                      <span className="btn__arrow" aria-hidden="true">→</span>
                    </button>
                  </Magnetic>
                </div>
              </div>
            </Reveal>

            {/* RIGHT — live order summary */}
            <aside className="sticky-panel">
              <div className="card card--pad">
                <div className="between" style={{ marginBottom: '0.5rem' }}>
                  <h3 className="h4">Order Summary</h3>
                  <span className="icon-badge"><Icon name="receipt" /></span>
                </div>
                <p className="muted small" style={{ marginBottom: '0.5rem' }}>Updates live as you build your booking.</p>
                {summaryRows}
                <div className="summary-total">
                  <span>Estimated Total</span>
                  <span className="amt">{money(total)}</span>
                </div>
                <p className="tiny muted mt-2">
                  Final amount is confirmed after inspection. Genuine parts &amp; service warranty included on every booking.
                </p>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
