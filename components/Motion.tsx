'use client';
import { motion, useInView, type Variants } from 'framer-motion';
import { useEffect, useRef, useState, type ReactNode } from 'react';

const EASE = [0.22, 1, 0.36, 1] as const;

type Dir = 'up' | 'down' | 'left' | 'right' | 'scale' | 'none';
const offset = (d: Dir) => {
  switch (d) {
    case 'up': return { y: 28 };
    case 'down': return { y: -28 };
    case 'left': return { x: -34 };
    case 'right': return { x: 34 };
    case 'scale': return { scale: 0.94 };
    default: return {};
  }
};

export function Reveal({
  children, className, dir = 'up', delay = 0, duration = 0.7, as = 'div', style, id,
}: {
  children: ReactNode; className?: string; dir?: Dir; delay?: number; duration?: number;
  as?: 'div' | 'section' | 'span' | 'li' | 'article' | 'header'; style?: React.CSSProperties; id?: string;
}) {
  const MComp = (motion as any)[as] || motion.div;
  return (
    <MComp
      id={id}
      className={className}
      style={style}
      initial={{ opacity: 0, ...offset(dir) }}
      whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '0px 0px -8% 0px' }}
      transition={{ duration, ease: EASE, delay }}
    >
      {children}
    </MComp>
  );
}

export function Stagger({
  children, className, gap = 0.09, as = 'div', style, id,
}: {
  children: ReactNode; className?: string; gap?: number; as?: 'div' | 'section' | 'ul';
  style?: React.CSSProperties; id?: string;
}) {
  const MComp = (motion as any)[as] || motion.div;
  const variants: Variants = { hidden: {}, show: { transition: { staggerChildren: gap } } };
  return (
    <MComp
      id={id}
      className={className}
      style={style}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '0px 0px -6% 0px' }}
      variants={variants}
    >
      {children}
    </MComp>
  );
}

export function Item({
  children, className, dir = 'up', as = 'div', style,
}: {
  children: ReactNode; className?: string; dir?: Dir;
  as?: 'div' | 'li' | 'article'; style?: React.CSSProperties;
}) {
  const MComp = (motion as any)[as] || motion.div;
  const variants: Variants = {
    hidden: { opacity: 0, ...offset(dir) },
    show: { opacity: 1, x: 0, y: 0, scale: 1, transition: { duration: 0.6, ease: EASE } },
  };
  return <MComp className={className} style={style} variants={variants}>{children}</MComp>;
}

export function Counter({
  to, decimals = 0, prefix = '', suffix = '', duration = 1.7,
}: { to: number; decimals?: number; prefix?: string; suffix?: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-15%' });
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / (duration * 1000), 1);
      const e = 1 - Math.pow(1 - p, 3);
      setVal(to * e);
      if (p < 1) raf = requestAnimationFrame(tick);
      else setVal(to);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, duration]);
  return (
    <span ref={ref}>
      {prefix}{val.toLocaleString('en-IN', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}
      <span className="suffix">{suffix}</span>
    </span>
  );
}

export function Marquee({ children, speed = 40 }: { children: ReactNode; speed?: number }) {
  return (
    <div className="marquee">
      <motion.div
        className="marquee__track"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: speed, ease: 'linear', repeat: Infinity }}
      >
        <div className="marquee__group">{children}</div>
        <div className="marquee__group" aria-hidden="true">{children}</div>
      </motion.div>
    </div>
  );
}

export function Magnetic({
  children, className, strength = 0.3,
}: { children: ReactNode; className?: string; strength?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const onMove = (e: React.MouseEvent) => {
    const el = ref.current; if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left - r.width / 2) * strength;
    const y = (e.clientY - r.top - r.height / 2) * strength;
    el.style.transform = `translate(${x}px, ${y}px)`;
  };
  const reset = () => { if (ref.current) ref.current.style.transform = ''; };
  return (
    <div
      ref={ref}
      className={className}
      onMouseMove={onMove}
      onMouseLeave={reset}
      style={{ display: 'inline-flex', transition: 'transform 0.35s cubic-bezier(0.22,1,0.36,1)' }}
    >
      {children}
    </div>
  );
}

export function Tilt({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      className={className}
      whileHover={{ y: -8, rotateX: 2, rotateY: -2 }}
      transition={{ type: 'spring', stiffness: 260, damping: 20 }}
      style={{ transformStyle: 'preserve-3d', height: '100%' }}
    >
      {children}
    </motion.div>
  );
}
