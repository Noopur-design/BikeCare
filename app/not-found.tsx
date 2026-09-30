import Link from 'next/link';
import { IMG } from '@/lib/data';
import Icon from '@/components/Icon';
import { Reveal, Magnetic } from '@/components/Motion';

export const metadata = {
  title: '404 — Page Not Found',
  description:
    "Looks like you've taken the wrong turn. Let's get you back on the road with premium bike service from BIKECARE.",
};

const QUICK: { href: string; label: string }[] = [
  { href: '/services', label: 'Services' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/track', label: 'Track Service' },
];

export default function NotFound() {
  return (
    <section
      className="section"
      style={{
        minHeight: '100vh',
        display: 'grid',
        placeItems: 'center',
        paddingTop: 'calc(var(--nav-h) + clamp(2rem, 6vw, 4.5rem))',
        paddingBottom: 'clamp(3rem, 6vw, 5rem)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Soft ambient accent glow behind the composition */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '18%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: 'min(720px, 90vw)',
          height: 'min(720px, 90vw)',
          background:
            'radial-gradient(circle, rgba(201,106,61,0.14), transparent 62%)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      <div
        className="container container--narrow center"
        style={{ position: 'relative', zIndex: 1 }}
      >
        <Reveal>
          <span className="badge badge--dot" style={{ marginBottom: '0.4rem' }}>
            Error 404 · Off the map
          </span>
        </Reveal>

        {/* Giant serif 404 with a slow-spinning dashed wheel ring behind it */}
        <Reveal dir="scale" delay={0.06}>
          <div
            style={{
              position: 'relative',
              display: 'inline-flex',
              justifyContent: 'center',
              margin: '0.6rem auto 0',
            }}
          >
            <span
              aria-hidden="true"
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                width: 'clamp(13rem, 42vw, 24rem)',
                height: 'clamp(13rem, 42vw, 24rem)',
                transform: 'translate(-50%, -50%)',
                borderRadius: '50%',
                border: '2px dashed var(--border-strong)',
                opacity: 0.5,
                animation: 'spin 34s linear infinite',
                pointerEvents: 'none',
              }}
            />
            <h1
              className="display"
              aria-label="404"
              style={{
                position: 'relative',
                fontSize: 'clamp(5rem, 21vw, 13.5rem)',
                lineHeight: 0.9,
                letterSpacing: '-0.05em',
                margin: 0,
              }}
            >
              4<span className="accent-text">0</span>4
            </h1>
          </div>
        </Reveal>

        <Reveal delay={0.14}>
          <h2
            className="h1 balance"
            style={{ margin: '0.6rem auto 0', maxWidth: '18ch' }}
          >
            Looks like you&rsquo;ve taken the wrong turn.
          </h2>
        </Reveal>

        <Reveal delay={0.2}>
          <p
            className="lead balance"
            style={{ margin: '1.1rem auto 0', maxWidth: '52ch' }}
          >
            This page must have slipped off the service ramp. The road you&rsquo;re
            looking for doesn&rsquo;t exist &mdash; but your ride can still get the
            expert care it deserves.
          </p>
        </Reveal>

        {/* Stylish motorcycle visual — an open road disappearing off-route */}
        <Reveal dir="up" delay={0.26}>
          <div
            style={{
              position: 'relative',
              maxWidth: 660,
              margin: '2.4rem auto 0',
            }}
          >
            <div
              className="photo"
              style={{
                borderRadius: 'var(--r-xl)',
                aspectRatio: '16 / 8',
                boxShadow: 'var(--shadow-lg)',
                border: '1px solid var(--border)',
              }}
            >
              <img
                src={IMG.road}
                alt="An open motorcycle road winding into the distance"
              />
              <span
                aria-hidden="true"
                style={{
                  position: 'absolute',
                  inset: 0,
                  background:
                    'linear-gradient(180deg, rgba(22,22,22,0) 42%, rgba(22,22,22,0.6))',
                }}
              />
              <span
                className="badge badge--dot"
                style={{
                  position: 'absolute',
                  left: '1rem',
                  bottom: '1rem',
                  background: 'var(--glass-strong)',
                  backdropFilter: 'blur(10px)',
                  WebkitBackdropFilter: 'blur(10px)',
                }}
              >
                You&rsquo;re somewhere off-route
              </span>
            </div>

            {/* Floating gear — the mechanical wink */}
            <span
              className="icon-badge icon-badge--lg float-anim"
              aria-hidden="true"
              style={{
                position: 'absolute',
                top: -22,
                right: -14,
                background: 'var(--glass-strong)',
                boxShadow: 'var(--shadow-md)',
              }}
            >
              <Icon name="gear" />
            </span>
          </div>
        </Reveal>

        <Reveal delay={0.34}>
          <div
            className="cluster"
            style={{
              justifyContent: 'center',
              gap: '0.85rem',
              marginTop: '2.4rem',
            }}
          >
            <Magnetic>
              <Link className="btn btn--primary btn--lg" href="/">
                Back to Home{' '}
                <span className="btn__arrow" aria-hidden="true">
                  &rarr;
                </span>
              </Link>
            </Magnetic>
            <Link className="btn btn--secondary btn--lg" href="/book">
              Book a Service{' '}
              <span className="btn__arrow" aria-hidden="true">
                &rarr;
              </span>
            </Link>
          </div>
        </Reveal>

        <Reveal delay={0.42}>
          <div style={{ marginTop: '2.4rem' }}>
            <p
              className="tag"
              style={{ marginBottom: '0.9rem', color: 'var(--ink-2)' }}
            >
              Popular routes
            </p>
            <div
              className="cluster"
              style={{ justifyContent: 'center', gap: '0.6rem' }}
            >
              {QUICK.map((q) => (
                <Link className="chip" href={q.href} key={q.href}>
                  {q.label}{' '}
                  <span className="btn__arrow" aria-hidden="true">
                    &rarr;
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
