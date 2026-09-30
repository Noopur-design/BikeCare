'use client';
import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';
import { BRANDS, MODELS, SERVICES } from '@/lib/data';
import { toast } from './Toast';
import Select from './Select';
import DatePicker from './DatePicker';

export default function HeroBooking() {
  const router = useRouter();
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [service, setService] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [pickup, setPickup] = useState('Home Pickup');
  const today = useMemo(() => new Date().toISOString().split('T')[0], []);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!brand || !service || !date) { toast('Please complete brand, service and date to continue.', { type: 'error' }); return; }
    const q = new URLSearchParams({ brand, model, service, date, time, pickup });
    toast('Taking you to checkout…', { title: 'Slot selected' });
    setTimeout(() => router.push('/book?' + q.toString()), 600);
  };

  return (
    <div className="glass float-anim hero__booking">
      <div className="between" style={{ marginBottom: '0.9rem' }}>
        <strong style={{ fontSize: '1.02rem' }}>Quick Booking</strong>
        <span className="badge badge--live badge--dot">Live slots</span>
      </div>
      <form className="form" style={{ gap: '0.7rem' }} onSubmit={submit}>
        <div className="field">
          <Select ariaLabel="Select brand" placeholder="Select Brand" value={brand}
            onChange={(v) => { setBrand(v); setModel(''); }}
            options={BRANDS.map((b) => b.name)} />
        </div>
        <div className="field">
          <Select ariaLabel="Select model" placeholder={brand ? 'Select Model' : 'Choose a brand first'} value={model}
            onChange={setModel} disabled={!brand} options={MODELS[brand] || []} />
        </div>
        <div className="field">
          <Select ariaLabel="Service type" placeholder="Service Type" value={service}
            onChange={setService} options={SERVICES.map((s) => ({ value: s.slug, label: s.name }))} />
        </div>
        <div className="form-row" style={{ gap: '0.7rem' }}>
          <div className="field"><DatePicker ariaLabel="Date" placeholder="Select date" min={today} value={date} onChange={setDate} /></div>
          <div className="field">
            <Select ariaLabel="Time" placeholder="Time" value={time} onChange={setTime}
              options={['09:00 AM', '11:00 AM', '01:00 PM', '03:00 PM', '05:00 PM']} />
          </div>
        </div>
        <div className="tabs" role="group" aria-label="Pickup or drop">
          {['Home Pickup', 'Workshop Drop'].map((p) => (
            <button type="button" key={p} className={`chip${pickup === p ? ' is-active' : ''}`} onClick={() => setPickup(p)}>{p}</button>
          ))}
        </div>
        <button className="btn btn--primary btn--block" type="submit">Book Now <span className="btn__arrow" aria-hidden="true">→</span></button>
      </form>
    </div>
  );
}
