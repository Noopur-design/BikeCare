'use client';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import Icon from './Icon';

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const DOW = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
const pad = (n: number) => String(n).padStart(2, '0');
const iso = (y: number, m: number, d: number) => `${y}-${pad(m + 1)}-${pad(d)}`;
const parse = (s?: string) => {
  if (!s) return null;
  const [y, m, d] = s.split('-').map(Number);
  if (!y || !m || !d) return null;
  return { y, m: m - 1, d };
};
const display = (s: string) => {
  const p = parse(s);
  if (!p) return '';
  return `${pad(p.d)} ${MONTHS[p.m].slice(0, 3)} ${p.y}`;
};

export default function DatePicker({
  value, onChange, min, placeholder = 'Select date', ariaLabel, id, invalid = false,
}: {
  value: string; onChange: (v: string) => void; min?: string;
  placeholder?: string; ariaLabel?: string; id?: string; invalid?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [rect, setRect] = useState<{ top?: number; bottom?: number; left: number; width: number } | null>(null);
  const [view, setView] = useState(() => {
    const p = parse(value);
    const t = new Date();
    return p ? { y: p.y, m: p.m } : { y: t.getFullYear(), m: t.getMonth() };
  });
  const wrapRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => setMounted(true), []);
  useEffect(() => { const p = parse(value); if (p) setView({ y: p.y, m: p.m }); }, [value]);

  const place = () => {
    const t = triggerRef.current;
    if (!t) return;
    const r = t.getBoundingClientRect();
    const vh = window.innerHeight, vw = window.innerWidth;
    const W = Math.min(320, vw - 16);
    let left = r.left;
    if (left + W > vw - 8) left = vw - 8 - W;
    if (left < 8) left = 8;
    const need = 372;
    const below = vh - r.bottom - 10;
    const above = r.top - 10;
    if (below < need && above > below) setRect({ bottom: vh - r.top + 6, left, width: W });
    else setRect({ top: r.bottom + 6, left, width: W });
  };
  useLayoutEffect(() => { if (open) place(); }, [open]);
  useEffect(() => {
    if (!open) return;
    const onScroll = () => place();
    const onDoc = (e: MouseEvent) => {
      if (wrapRef.current && wrapRef.current.contains(e.target as Node)) return;
      const p = document.getElementById('dp-panel-open');
      if (p && p.contains(e.target as Node)) return;
      setOpen(false);
    };
    const onEsc = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    window.addEventListener('scroll', onScroll, true);
    window.addEventListener('resize', onScroll);
    document.addEventListener('mousedown', onDoc);
    document.addEventListener('keydown', onEsc);
    return () => {
      window.removeEventListener('scroll', onScroll, true);
      window.removeEventListener('resize', onScroll);
      document.removeEventListener('mousedown', onDoc);
      document.removeEventListener('keydown', onEsc);
    };
  }, [open]);

  const minP = parse(min);
  const sel = parse(value);
  const now = new Date();
  const todayISO = iso(now.getFullYear(), now.getMonth(), now.getDate());
  const before = (y: number, m: number, d: number) => {
    if (!minP) return false;
    return new Date(y, m, d) < new Date(minP.y, minP.m, minP.d);
  };

  const dim = new Date(view.y, view.m + 1, 0).getDate();
  const fd = new Date(view.y, view.m, 1).getDay();
  const cells: (number | null)[] = [];
  for (let i = 0; i < fd; i++) cells.push(null);
  for (let d = 1; d <= dim; d++) cells.push(d);

  const choose = (d: number) => { onChange(iso(view.y, view.m, d)); setOpen(false); triggerRef.current?.focus(); };
  const prev = () => setView((v) => (v.m === 0 ? { y: v.y - 1, m: 11 } : { y: v.y, m: v.m - 1 }));
  const next = () => setView((v) => (v.m === 11 ? { y: v.y + 1, m: 0 } : { y: v.y, m: v.m + 1 }));
  const goToday = () => {
    if (!before(now.getFullYear(), now.getMonth(), now.getDate())) {
      onChange(todayISO); setView({ y: now.getFullYear(), m: now.getMonth() }); setOpen(false);
    }
  };

  return (
    <div className="dd" ref={wrapRef}>
      <button
        type="button" id={id} ref={triggerRef}
        className={`dd__trigger${open ? ' is-open' : ''}${!value ? ' is-placeholder' : ''}${invalid ? ' is-invalid' : ''}`}
        aria-haspopup="dialog" aria-expanded={open} aria-label={ariaLabel}
        onClick={() => setOpen((o) => !o)}
      >
        <span>{value ? display(value) : placeholder}</span>
        <Icon name="calendar" className="dd__caret" />
      </button>

      {mounted && createPortal(
        <AnimatePresence>
          {open && rect && (
            <motion.div
              id="dp-panel-open" className="dp__panel" role="dialog" aria-label="Choose a date"
              style={{ position: 'fixed', top: rect.top, bottom: rect.bottom, left: rect.left, width: rect.width }}
              initial={{ opacity: 0, y: 8, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 6, scale: 0.98 }}
              transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="dp__head">
                <strong>{MONTHS[view.m]} {view.y}</strong>
                <div className="dp__nav">
                  <button type="button" aria-label="Previous month" onClick={prev}><span style={{ display: 'grid', transform: 'rotate(180deg)' }}><Icon name="arrow" /></span></button>
                  <button type="button" aria-label="Next month" onClick={next}><Icon name="arrow" /></button>
                </div>
              </div>
              <div className="dp__dow">{DOW.map((d) => <span key={d}>{d}</span>)}</div>
              <div className="dp__grid">
                {cells.map((d, i) => {
                  if (d === null) return <span key={'e' + i} />;
                  const dis = before(view.y, view.m, d);
                  const cellISO = iso(view.y, view.m, d);
                  const isSel = !!sel && sel.y === view.y && sel.m === view.m && sel.d === d;
                  const isToday = cellISO === todayISO;
                  return (
                    <button
                      key={cellISO} type="button" disabled={dis}
                      className={`dp__day${isSel ? ' is-selected' : ''}${isToday ? ' is-today' : ''}`}
                      onClick={() => choose(d)}
                    >{d}</button>
                  );
                })}
              </div>
              <div className="dp__foot">
                <button type="button" onClick={() => { onChange(''); setOpen(false); }}>Clear</button>
                <button type="button" onClick={goToday}>Today</button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </div>
  );
}
