'use client';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Icon from './Icon';

/* Attaches a graceful branded fallback to any image that fails to load,
   site-wide, and re-scans on client navigation. */
export function ImageFallback() {
  useEffect(() => {
    const fb = (img: HTMLImageElement) => {
      const w = img.closest(
        '.photo, .card__media, .hero__photo, .testimonial__avatar, .gallery__item, .offer-banner__bg, .ba, .mega__feature'
      );
      if (w) w.classList.add('photo--fallback');
    };
    const apply = (img: HTMLImageElement) => {
      if (img.dataset.fb) return;
      img.dataset.fb = '1';
      if (img.complete && img.naturalWidth === 0) fb(img);
      img.addEventListener('error', () => fb(img), { once: true });
    };
    const scan = () => document.querySelectorAll('img').forEach((i) => apply(i as HTMLImageElement));
    scan();
    const mo = new MutationObserver(scan);
    mo.observe(document.body, { childList: true, subtree: true });
    return () => mo.disconnect();
  }, []);
  return null;
}

export function MobileCTA() {
  const pathname = usePathname();
  const hide = ['/book', '/login', '/dashboard'].some((p) => pathname.startsWith(p));
  useEffect(() => {
    document.body.classList.toggle('has-mobile-cta', !hide);
    return () => document.body.classList.remove('has-mobile-cta');
  }, [hide]);
  if (hide) return null;
  return (
    <Link className="mobile-cta" href="/book">
      <span className="btn btn--primary btn--block btn--lg">Book a Service <span className="btn__arrow" aria-hidden="true">→</span></span>
    </Link>
  );
}

export function ToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const on = () => setShow(window.scrollY > 600);
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);
  return (
    <AnimatePresence>
      {show && (
        <motion.button
          className="to-top"
          aria-label="Back to top"
          initial={{ opacity: 0, y: 14, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 14, scale: 0.8 }}
          whileHover={{ y: -3 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <span style={{ display: 'grid', transform: 'rotate(-90deg)' }}><Icon name="arrow" /></span>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
