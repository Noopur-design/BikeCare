'use client';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import Icon from './Icon';

export interface Opt { value: string; label: string; }
type OptIn = Opt | string;

export default function Select({
  value, onChange, options, placeholder = 'Select', disabled = false, ariaLabel, id, invalid = false,
}: {
  value: string;
  onChange: (v: string) => void;
  options: OptIn[];
  placeholder?: string;
  disabled?: boolean;
  ariaLabel?: string;
  id?: string;
  invalid?: boolean;
}) {
  const opts: Opt[] = options.map((o) => (typeof o === 'string' ? { value: o, label: o } : o));
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);
  const [mounted, setMounted] = useState(false);
  const [rect, setRect] = useState<{ top?: number; bottom?: number; left: number; width: number; maxH: number } | null>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const selected = opts.find((o) => o.value === value);

  useEffect(() => setMounted(true), []);

  const place = () => {
    const t = triggerRef.current;
    if (!t) return;
    const r = t.getBoundingClientRect();
    const vh = window.innerHeight;
    const spaceBelow = vh - r.bottom - 10;
    const spaceAbove = r.top - 10;
    const openUp = spaceBelow < 200 && spaceAbove > spaceBelow;
    const maxH = Math.max(150, Math.min(280, openUp ? spaceAbove : spaceBelow));
    if (openUp) setRect({ bottom: vh - r.top + 6, left: r.left, width: r.width, maxH });
    else setRect({ top: r.bottom + 6, left: r.left, width: r.width, maxH });
  };

  useLayoutEffect(() => { if (open) place(); }, [open]);

  useEffect(() => {
    if (!open) { setActive(-1); return; }
    const onScroll = () => place();
    const onDoc = (e: MouseEvent) => {
      if (wrapRef.current && wrapRef.current.contains(e.target as Node)) return;
      const panel = document.getElementById('dd-panel-open');
      if (panel && panel.contains(e.target as Node)) return;
      setOpen(false);
    };
    window.addEventListener('scroll', onScroll, true);
    window.addEventListener('resize', onScroll);
    document.addEventListener('mousedown', onDoc);
    return () => {
      window.removeEventListener('scroll', onScroll, true);
      window.removeEventListener('resize', onScroll);
      document.removeEventListener('mousedown', onDoc);
    };
  }, [open]);

  const choose = (v: string) => { onChange(v); setOpen(false); triggerRef.current?.focus(); };

  const onKey = (e: React.KeyboardEvent) => {
    if (disabled) return;
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      if (open && active >= 0) choose(opts[active].value);
      else setOpen((o) => !o);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (!open) { setOpen(true); return; }
      setActive((a) => Math.min((a < 0 ? opts.findIndex((o) => o.value === value) : a) + 1, opts.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActive((a) => Math.max((a < 0 ? opts.length : a) - 1, 0));
    } else if (e.key === 'Escape') {
      setOpen(false);
    }
  };

  return (
    <div className={`dd${disabled ? ' is-disabled' : ''}`} ref={wrapRef}>
      <button
        type="button"
        id={id}
        ref={triggerRef}
        className={`dd__trigger${open ? ' is-open' : ''}${!selected ? ' is-placeholder' : ''}${invalid ? ' is-invalid' : ''}`}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={ariaLabel}
        disabled={disabled}
        onClick={() => !disabled && setOpen((o) => !o)}
        onKeyDown={onKey}
      >
        <span>{selected ? selected.label : placeholder}</span>
        <Icon name="chevron" className="dd__caret" />
      </button>

      {mounted && createPortal(
        <AnimatePresence>
          {open && rect && (
            <motion.ul
              id="dd-panel-open"
              className="dd__panel"
              role="listbox"
              aria-label={ariaLabel}
              style={{ position: 'fixed', top: rect.top, bottom: rect.bottom, left: rect.left, width: rect.width, maxHeight: rect.maxH }}
              initial={{ opacity: 0, y: 8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 6, scale: 0.98 }}
              transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
              {opts.map((o, i) => (
                <li
                  key={o.value + i}
                  role="option"
                  aria-selected={o.value === value}
                  className={`dd__option${o.value === value ? ' is-selected' : ''}${i === active ? ' is-active' : ''}`}
                  onMouseEnter={() => setActive(i)}
                  onMouseDown={(e) => { e.preventDefault(); choose(o.value); }}
                >
                  <span>{o.label}</span>
                  {o.value === value && <Icon name="check" className="dd__check" />}
                </li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>,
        document.body
      )}
    </div>
  );
}
