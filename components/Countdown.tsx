'use client';
import { useEffect, useState } from 'react';

export default function Countdown({ hours = 48, storageKey = 'default' }: { hours?: number; storageKey?: string }) {
  const [t, setT] = useState({ d: '00', h: '00', m: '00', s: '00' });
  useEffect(() => {
    const key = 'bc_cd_' + storageKey;
    let end = 0;
    try { end = parseInt(localStorage.getItem(key) || '0', 10); } catch {}
    const now = Date.now();
    if (!end || end < now) { end = now + hours * 3600 * 1000; try { localStorage.setItem(key, String(end)); } catch {} }
    const pad = (n: number) => String(n).padStart(2, '0');
    const tick = () => {
      let diff = Math.max(0, end - Date.now());
      const d = Math.floor(diff / 86400000); diff -= d * 86400000;
      const h = Math.floor(diff / 3600000); diff -= h * 3600000;
      const m = Math.floor(diff / 60000); diff -= m * 60000;
      const s = Math.floor(diff / 1000);
      setT({ d: pad(d), h: pad(h), m: pad(m), s: pad(s) });
    };
    tick();
    const iv = setInterval(tick, 1000);
    return () => clearInterval(iv);
  }, [hours, storageKey]);
  const box = (num: string, lbl: string) => (
    <div className="countdown__box"><div className="countdown__num">{num}</div><div className="countdown__lbl">{lbl}</div></div>
  );
  return (
    <div className="countdown">
      {box(t.d, 'Days')}{box(t.h, 'Hrs')}{box(t.m, 'Min')}{box(t.s, 'Sec')}
    </div>
  );
}
