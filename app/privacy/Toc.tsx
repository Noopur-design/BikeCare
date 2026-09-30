'use client';
import { useEffect, useState } from 'react';
import styles from './page.module.css';

export interface TocItem { id: string; label: string; }

export default function Toc({ items }: { items: TocItem[] }) {
  const [active, setActive] = useState<string>(items[0]?.id ?? '');

  useEffect(() => {
    const els = items
      .map((it) => document.getElementById(it.id))
      .filter((el): el is HTMLElement => el !== null);
    if (!els.length) return;

    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: '-28% 0px -62% 0px', threshold: 0 }
    );

    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [items]);

  return (
    <div className={styles.tocCol}>
      <div className={`glass ${styles.tocInner}`}>
        <p className={styles.tocTitle}>On this page</p>
        <nav className={`toc ${styles.tocNav}`} aria-label="Privacy policy sections">
          {items.map((it) => (
            <a
              key={it.id}
              href={`#${it.id}`}
              className={active === it.id ? 'is-active' : ''}
              aria-current={active === it.id ? 'true' : undefined}
            >
              {it.label}
            </a>
          ))}
        </nav>
      </div>
    </div>
  );
}
