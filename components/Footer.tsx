'use client';
import Link from 'next/link';
import Logo from './Logo';
import Icon from './Icon';
import { CONTACT } from '@/lib/data';
import { toast } from './Toast';
import { useState } from 'react';

const SOCIAL: Record<string, string> = {
  instagram: '<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1"/>',
  facebook: '<path d="M14 8h3V4h-3a4 4 0 0 0-4 4v2H7v4h3v8h4v-8h3l1-4h-4V8a1 1 0 0 1 1-1z"/>',
  twitter: '<path d="M4 4l7 9-7 7h2l6-6 5 6h4l-8-10 7-6h-2l-5 5-4-5z"/>',
  youtube: '<rect x="3" y="6" width="18" height="12" rx="4"/><path d="m11 9 4 3-4 3z" fill="currentColor" stroke="none"/>',
};

export default function Footer() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const subscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) { toast('Please enter a valid email address.', { type: 'error' }); return; }
    setLoading(true);
    setTimeout(() => { setLoading(false); setEmail(''); toast('You are subscribed! Watch your inbox for exclusive offers.', { title: 'Subscribed' }); }, 900);
  };
  return (
    <footer className="footer">
      <div className="container container--wide">
        <div className="footer__grid">
          <div className="footer__brand">
            <Logo footer />
            <p className="footer__desc">Premium bike service with genuine parts, certified technicians and free doorstep pickup. Keeping your ride running perfect since 2013.</p>
            <div className="footer__social">
              {Object.keys(SOCIAL).map((s) => (
                <a key={s} href="#" aria-label={s} onClick={(e) => { e.preventDefault(); toast(`Follow BIKECARE on ${s}.`, { type: 'info', title: 'Social' }); }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" dangerouslySetInnerHTML={{ __html: SOCIAL[s] }} />
                </a>
              ))}
            </div>
          </div>
          <div className="footer__col">
            <h4>Quick Links</h4>
            <ul>
              <li><Link href="/">Home</Link></li>
              <li><Link href="/about">About</Link></li>
              <li><Link href="/services">Services</Link></li>
              <li><Link href="/pricing">Pricing</Link></li>
              <li><Link href="/offers">Offers</Link></li>
              <li><Link href="/contact">Contact</Link></li>
            </ul>
          </div>
          <div className="footer__col">
            <h4>Services</h4>
            <ul>
              <li><Link href="/services/general-service">General Service</Link></li>
              <li><Link href="/services/engine-service">Engine Service</Link></li>
              <li><Link href="/services/brake-service">Brake Service</Link></li>
              <li><Link href="/services/tyre-replacement">Tyre Replacement</Link></li>
              <li><Link href="/services/battery-replacement">Battery</Link></li>
              <li><Link href="/services/bike-washing">Bike Washing</Link></li>
            </ul>
          </div>
          <div className="footer__col">
            <h4>Support</h4>
            <ul>
              <li><Link href="/faq">FAQ</Link></li>
              <li><Link href="/track">Track Service</Link></li>
              <li><Link href="/privacy">Privacy Policy</Link></li>
              <li><Link href="/terms">Terms &amp; Conditions</Link></li>
              <li><Link href="/terms#refund">Refund Policy</Link></li>
            </ul>
          </div>
          <div className="footer__col footer__contact">
            <h4>Get in touch</h4>
            <ul>
              <li><Icon name="pin" /><span>{CONTACT.address}</span></li>
              <li><Icon name="phone" /><a href={`tel:${CONTACT.phone.replace(/\s/g, '')}`}>{CONTACT.phone}</a></li>
              <li><Icon name="mail" /><a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a></li>
              <li><Icon name="clock" /><span>{CONTACT.hours}</span></li>
            </ul>
            <form className="footer__news" onSubmit={subscribe}>
              <input type="email" placeholder="Your email" aria-label="Email for newsletter" value={email} onChange={(e) => setEmail(e.target.value)} required />
              <button className={`btn btn--primary btn--icon${loading ? ' is-loading' : ''}`} type="submit" aria-label="Subscribe"><Icon name="arrow" /></button>
            </form>
          </div>
        </div>
        <div className="footer__bottom">
          <p>© 2013–2026 BIKECARE. All rights reserved. Keep Your Ride Running Perfect.</p>
          <div className="footer__legal">
            <Link href="/privacy">Privacy</Link>
            <Link href="/terms">Terms</Link>
            <Link href="/terms#refund">Refund Policy</Link>
            <Link href="/contact">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
