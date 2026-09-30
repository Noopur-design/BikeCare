'use client';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';

type ToastType = 'success' | 'error' | 'info';
interface T { id: number; message: string; type: ToastType; title?: string; duration: number; }

let listeners: ((t: T) => void)[] = [];
let counter = 0;

export function toast(message: string, opts: { type?: ToastType; title?: string; duration?: number } = {}) {
  const t: T = {
    id: ++counter,
    message,
    type: opts.type || 'success',
    title: opts.title,
    duration: opts.duration ?? 4200,
  };
  listeners.forEach((l) => l(t));
}

const ICONS: Record<ToastType, string> = {
  success: '<path d="m5 12 5 5L20 7"/>',
  error: '<path d="M18 6 6 18M6 6l12 12"/>',
  info: '<path d="M12 8h.01M11 12h1v5h1"/>',
};
const TITLES: Record<ToastType, string> = { success: 'Success', error: 'Something went wrong', info: 'Heads up' };

export function Toaster() {
  const [items, setItems] = useState<T[]>([]);
  useEffect(() => {
    const l = (t: T) => {
      setItems((p) => [...p, t]);
      if (t.duration) setTimeout(() => setItems((p) => p.filter((x) => x.id !== t.id)), t.duration);
    };
    listeners.push(l);
    return () => { listeners = listeners.filter((x) => x !== l); };
  }, []);
  const close = (id: number) => setItems((p) => p.filter((x) => x.id !== id));
  return (
    <div className="toast-stack">
      <AnimatePresence>
        {items.map((t) => (
          <motion.div
            key={t.id}
            className={`toast toast--${t.type}`}
            role="status"
            initial={{ opacity: 0, x: 140, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 140, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 320, damping: 28 }}
          >
            <span className="toast__ico">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" dangerouslySetInnerHTML={{ __html: ICONS[t.type] }} />
            </span>
            <div className="toast__body">
              <strong>{t.title || TITLES[t.type]}</strong>
              <span>{t.message}</span>
            </div>
            <button className="toast__close" aria-label="Dismiss" onClick={() => close(t.id)}>&times;</button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
