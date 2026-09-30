'use client';
import { useEffect, useRef, useState, type ReactNode } from 'react';

export default function Carousel({
  children, perView = 3, autoplay = false, gap = 0,
}: { children: ReactNode[]; perView?: number; autoplay?: boolean; gap?: number }) {
  const [pv, setPv] = useState(perView);
  const [index, setIndex] = useState(0);
  const startX = useRef(0);
  const slides = Array.isArray(children) ? children : [children];
  const maxIndex = Math.max(0, slides.length - pv);

  useEffect(() => {
    const calc = () => {
      const w = window.innerWidth;
      if (w <= 600) setPv(1);
      else if (w <= 980) setPv(Math.min(2, perView));
      else setPv(perView);
    };
    calc();
    window.addEventListener('resize', calc);
    return () => window.removeEventListener('resize', calc);
  }, [perView]);

  useEffect(() => { setIndex((i) => Math.min(i, Math.max(0, slides.length - pv))); }, [pv, slides.length]);

  useEffect(() => {
    if (!autoplay) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;
    const iv = setInterval(() => setIndex((i) => (i >= maxIndex ? 0 : i + 1)), 5000);
    return () => clearInterval(iv);
  }, [autoplay, maxIndex]);

  const go = (i: number) => setIndex(Math.max(0, Math.min(i, maxIndex)));

  return (
    <div className="carousel">
      <div
        className="carousel__viewport"
        onTouchStart={(e) => (startX.current = e.touches[0].clientX)}
        onTouchEnd={(e) => {
          const dx = e.changedTouches[0].clientX - startX.current;
          if (Math.abs(dx) > 40) go(dx < 0 ? index + 1 : index - 1);
        }}
      >
        <div
          className="carousel__track"
          style={{ transform: `translateX(-${index * (100 / pv)}%)`, transition: 'transform 0.6s cubic-bezier(0.22,1,0.36,1)' }}
        >
          {slides.map((s, i) => (
            <div className="carousel__slide" key={i} style={{ flex: `0 0 ${100 / pv}%` }}>{s}</div>
          ))}
        </div>
      </div>
      <div className="carousel__nav">
        <div className="carousel__dots">
          {Array.from({ length: maxIndex + 1 }).map((_, i) => (
            <button key={i} className={`carousel__dot${i === index ? ' is-active' : ''}`} aria-label={`Go to slide ${i + 1}`} onClick={() => go(i)} />
          ))}
        </div>
        <div className="carousel__arrows">
          <button className={`btn btn--icon btn--secondary${index === 0 ? ' is-disabled' : ''}`} aria-label="Previous" onClick={() => go(index - 1)}>‹</button>
          <button className={`btn btn--icon btn--secondary${index >= maxIndex ? ' is-disabled' : ''}`} aria-label="Next" onClick={() => go(index + 1)}>›</button>
        </div>
      </div>
    </div>
  );
}
