'use client';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';

export interface QA { q: string; a: string; }

export default function Accordion({ items, single = false, defaultOpen = -1 }: { items: QA[]; single?: boolean; defaultOpen?: number }) {
  const [open, setOpen] = useState<number[]>(defaultOpen >= 0 ? [defaultOpen] : []);
  const toggle = (i: number) => {
    setOpen((prev) => {
      const isOpen = prev.includes(i);
      if (single) return isOpen ? [] : [i];
      return isOpen ? prev.filter((x) => x !== i) : [...prev, i];
    });
  };
  return (
    <div className="accordion">
      {items.map((it, i) => {
        const isOpen = open.includes(i);
        return (
          <div key={i} className={`accordion__item${isOpen ? ' is-open' : ''}`}>
            <button className="accordion__trigger" aria-expanded={isOpen} onClick={() => toggle(i)}>
              {it.q}
              <span className="accordion__icon" />
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                  style={{ overflow: 'hidden' }}
                >
                  <div className="accordion__panel-inner">{it.a}</div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
