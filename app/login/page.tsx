'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import Icon from '@/components/Icon';
import { Reveal } from '@/components/Motion';
import { toast } from '@/components/Toast';

type View = 'login' | 'signup' | 'forgot' | 'otp';
type Field = 'name' | 'email' | 'phone' | 'password' | 'terms' | 'otp';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const EASE = [0.22, 1, 0.36, 1] as const;

const HEADINGS: Record<View, { eyebrow: string; title: string; lead: string }> = {
  login: {
    eyebrow: 'Welcome back',
    title: 'Log in to BIKECARE',
    lead: 'Manage your bookings, pay invoices and track every service live.',
  },
  signup: {
    eyebrow: 'Join BIKECARE',
    title: 'Create your account',
    lead: 'Doorstep pickup, genuine parts and real-time tracking — all in one place.',
  },
  forgot: {
    eyebrow: 'Password reset',
    title: 'Forgot your password?',
    lead: "Enter your email and we'll send a 6-digit code to reset it.",
  },
  otp: {
    eyebrow: 'Verify it’s you',
    title: 'Enter the 6-digit code',
    lead: 'We sent a verification code to your email. It expires in 10 minutes.',
  },
};

function GoogleG() {
  return (
    <svg viewBox="0 0 48 48" width="18" height="18" aria-hidden="true" style={{ flex: 'none' }}>
      <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
      <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
      <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.28-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
      <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
    </svg>
  );
}

export default function LoginPage() {
  const router = useRouter();
  const [view, setView] = useState<View>('login');
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '' });
  const [agree, setAgree] = useState(false);
  const [showPw, setShowPw] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<Field, string>>>({});
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState<string[]>(['', '', '', '', '', '']);
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

  const clearErr = (k: Field) =>
    setErrors((x) => {
      if (!x[k]) return x;
      const n = { ...x };
      delete n[k];
      return n;
    });

  const set =
    (k: 'name' | 'email' | 'phone' | 'password') =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const v = e.target.value;
      setForm((f) => ({ ...f, [k]: v }));
      clearErr(k);
    };

  const go = (v: View) => {
    setView(v);
    setErrors({});
    setLoading(false);
  };

  const finish = (fn: () => void) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      fn();
    }, 1000);
  };

  /* ---------- OTP handling ---------- */
  const onOtpChange = (i: number, val: string) => {
    const digit = val.replace(/\D/g, '').slice(-1);
    setOtp((prev) => {
      const n = [...prev];
      n[i] = digit;
      return n;
    });
    clearErr('otp');
    if (digit && i < 5) otpRefs.current[i + 1]?.focus();
  };

  const onOtpKey = (i: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[i] && i > 0) {
      e.preventDefault();
      otpRefs.current[i - 1]?.focus();
      setOtp((prev) => {
        const n = [...prev];
        n[i - 1] = '';
        return n;
      });
    } else if (e.key === 'ArrowLeft' && i > 0) {
      otpRefs.current[i - 1]?.focus();
    } else if (e.key === 'ArrowRight' && i < 5) {
      otpRefs.current[i + 1]?.focus();
    }
  };

  const onOtpPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const text = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    if (!text) return;
    e.preventDefault();
    const arr = ['', '', '', '', '', ''];
    for (let i = 0; i < text.length; i++) arr[i] = text[i];
    setOtp(arr);
    clearErr('otp');
    otpRefs.current[Math.min(text.length, 5)]?.focus();
  };

  /* ---------- Submit handlers ---------- */
  const submitLogin = (ev: React.FormEvent) => {
    ev.preventDefault();
    const e: Partial<Record<Field, string>> = {};
    if (!form.email.trim()) e.email = 'Please enter your email.';
    else if (!EMAIL_RE.test(form.email.trim())) e.email = 'Enter a valid email address.';
    if (!form.password) e.password = 'Please enter your password.';
    setErrors(e);
    if (Object.keys(e).length) {
      toast('Please fix the highlighted fields.', { type: 'error' });
      return;
    }
    finish(() => {
      toast('Welcome back to BIKECARE.', { type: 'success', title: 'Logged in' });
      router.push('/dashboard');
    });
  };

  const submitSignup = (ev: React.FormEvent) => {
    ev.preventDefault();
    const e: Partial<Record<Field, string>> = {};
    if (!form.name.trim()) e.name = 'Please enter your full name.';
    if (!form.email.trim()) e.email = 'Please enter your email.';
    else if (!EMAIL_RE.test(form.email.trim())) e.email = 'Enter a valid email address.';
    if (!form.phone.trim()) e.phone = 'Please enter a phone number.';
    else if (form.phone.replace(/\D/g, '').length < 10) e.phone = 'Enter a valid phone number.';
    if (!form.password) e.password = 'Please choose a password.';
    else if (form.password.length < 6) e.password = 'Use at least 6 characters.';
    if (!agree) e.terms = 'Please accept the Terms to continue.';
    setErrors(e);
    if (Object.keys(e).length) {
      toast('Please fix the highlighted fields.', { type: 'error' });
      return;
    }
    finish(() => {
      toast('Your BIKECARE account is ready.', { type: 'success', title: 'Account created' });
      router.push('/dashboard');
    });
  };

  const submitForgot = (ev: React.FormEvent) => {
    ev.preventDefault();
    const e: Partial<Record<Field, string>> = {};
    if (!form.email.trim()) e.email = 'Please enter your email.';
    else if (!EMAIL_RE.test(form.email.trim())) e.email = 'Enter a valid email address.';
    setErrors(e);
    if (Object.keys(e).length) {
      toast('Please enter a valid email.', { type: 'error' });
      return;
    }
    finish(() => {
      toast('Reset code sent — check your inbox.', { type: 'success', title: 'Code on its way' });
      setOtp(['', '', '', '', '', '']);
      setView('otp');
    });
  };

  const submitOtp = (ev: React.FormEvent) => {
    ev.preventDefault();
    if (otp.some((d) => !d)) {
      setErrors({ otp: 'Please enter all 6 digits.' });
      toast('Enter the full 6-digit code.', { type: 'error' });
      return;
    }
    finish(() => {
      toast('Verified — welcome to BIKECARE.', { type: 'success', title: 'All set' });
      router.push('/dashboard');
    });
  };

  const resend = () => {
    setOtp(['', '', '', '', '', '']);
    clearErr('otp');
    otpRefs.current[0]?.focus();
    toast('A fresh code is on its way.', { type: 'info', title: 'Code resent' });
  };

  const googleDemo = () =>
    toast('Google sign-in is a demo on this preview.', { type: 'info', title: 'Continue with Google' });

  const h = HEADINGS[view];
  const isAuthTab = view === 'login' || view === 'signup';

  return (
    <section className="auth">
      <Reveal dir="scale">
        <div className="auth__card glass">
          {/* Brand lockup */}
          <Link className="logo" href="/" style={{ justifyContent: 'center', width: '100%', marginBottom: '1.4rem' }}>
            <span className="logo__mark">
              <span className="icon-badge" style={{ width: 40, height: 40, borderRadius: 12 }}>
                <Icon name="logo" />
              </span>
            </span>
            <span className="logo__word">
              <b>BIKE</b>
              <span>CARE</span>
              <span className="logo__dot" />
            </span>
          </Link>

          {/* Back link for sub-flows */}
          {!isAuthTab && (
            <button
              type="button"
              className="link-arrow"
              onClick={() => go('login')}
              style={{ marginBottom: '1rem' }}
            >
              <span className="btn__arrow" aria-hidden="true" style={{ transform: 'rotate(180deg)' }}>
                →
              </span>
              Back to login
            </button>
          )}

          {/* Heading */}
          <div className="center" style={{ marginBottom: isAuthTab ? '1.5rem' : '1.75rem' }}>
            <span className="eyebrow eyebrow--center">{h.eyebrow}</span>
            <h1 className="h3 mt-1" style={{ marginBottom: '0.5rem' }}>
              {h.title}
            </h1>
            <p className="muted small" style={{ maxWidth: '34ch', marginInline: 'auto' }}>
              {h.lead}
            </p>
          </div>

          {/* Login / Signup tabs */}
          {isAuthTab && (
            <div className="auth__tabs" role="tablist" aria-label="Login or sign up">
              <button
                type="button"
                role="tab"
                aria-selected={view === 'login'}
                className={`auth__tab${view === 'login' ? ' is-active' : ''}`}
                onClick={() => go('login')}
              >
                Log in
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={view === 'signup'}
                className={`auth__tab${view === 'signup' ? ' is-active' : ''}`}
                onClick={() => go('signup')}
              >
                Sign up
              </button>
            </div>
          )}

          <AnimatePresence mode="wait">
            <motion.div
              key={view}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.28, ease: EASE }}
            >
              {/* ---------- LOGIN ---------- */}
              {view === 'login' && (
                <form className="form" onSubmit={submitLogin} noValidate>
                  <div className={`field${errors.email ? ' has-error' : ''}`}>
                    <label className="field__label" htmlFor="l-email">
                      Email <span className="req">*</span>
                    </label>
                    <div className="input-group">
                      <Icon name="mail" className="input-group__ico" />
                      <input
                        id="l-email"
                        className="input"
                        type="email"
                        autoComplete="email"
                        placeholder="you@example.com"
                        value={form.email}
                        onChange={set('email')}
                      />
                    </div>
                    <span className="field__error">
                      <Icon name="bell" />
                      {errors.email}
                    </span>
                  </div>

                  <div className={`field${errors.password ? ' has-error' : ''}`}>
                    <div className="between" style={{ marginBottom: 0 }}>
                      <label className="field__label" htmlFor="l-password">
                        Password <span className="req">*</span>
                      </label>
                      <button
                        type="button"
                        className="link-arrow small"
                        style={{ fontSize: '0.78rem' }}
                        onClick={() => go('forgot')}
                      >
                        Forgot password?
                      </button>
                    </div>
                    <div className="input-group">
                      <Icon name="shield" className="input-group__ico" />
                      <input
                        id="l-password"
                        className="input"
                        type={showPw ? 'text' : 'password'}
                        autoComplete="current-password"
                        placeholder="Enter your password"
                        value={form.password}
                        onChange={set('password')}
                        style={{ paddingRight: '3.6rem' }}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPw((s) => !s)}
                        aria-label={showPw ? 'Hide password' : 'Show password'}
                        style={{
                          position: 'absolute',
                          right: '0.4rem',
                          top: '50%',
                          transform: 'translateY(-50%)',
                          background: 'none',
                          border: 'none',
                          padding: '0.5rem 0.6rem',
                          fontSize: '0.78rem',
                          fontWeight: 600,
                          color: 'var(--ink-2)',
                        }}
                      >
                        {showPw ? 'Hide' : 'Show'}
                      </button>
                    </div>
                    <span className="field__error">
                      <Icon name="bell" />
                      {errors.password}
                    </span>
                  </div>

                  <button
                    type="submit"
                    className={`btn btn--primary btn--lg btn--block${loading ? ' is-loading' : ''}`}
                  >
                    Log in <span className="btn__arrow" aria-hidden="true">→</span>
                  </button>
                </form>
              )}

              {/* ---------- SIGNUP ---------- */}
              {view === 'signup' && (
                <form className="form" onSubmit={submitSignup} noValidate>
                  <div className={`field${errors.name ? ' has-error' : ''}`}>
                    <label className="field__label" htmlFor="s-name">
                      Full Name <span className="req">*</span>
                    </label>
                    <div className="input-group">
                      <Icon name="user" className="input-group__ico" />
                      <input
                        id="s-name"
                        className="input"
                        type="text"
                        autoComplete="name"
                        placeholder="e.g. Arjun Mehta"
                        value={form.name}
                        onChange={set('name')}
                      />
                    </div>
                    <span className="field__error">
                      <Icon name="bell" />
                      {errors.name}
                    </span>
                  </div>

                  <div className={`field${errors.email ? ' has-error' : ''}`}>
                    <label className="field__label" htmlFor="s-email">
                      Email <span className="req">*</span>
                    </label>
                    <div className="input-group">
                      <Icon name="mail" className="input-group__ico" />
                      <input
                        id="s-email"
                        className="input"
                        type="email"
                        autoComplete="email"
                        placeholder="you@example.com"
                        value={form.email}
                        onChange={set('email')}
                      />
                    </div>
                    <span className="field__error">
                      <Icon name="bell" />
                      {errors.email}
                    </span>
                  </div>

                  <div className={`field${errors.phone ? ' has-error' : ''}`}>
                    <label className="field__label" htmlFor="s-phone">
                      Phone <span className="req">*</span>
                    </label>
                    <div className="input-group">
                      <Icon name="phone" className="input-group__ico" />
                      <input
                        id="s-phone"
                        className="input"
                        type="tel"
                        autoComplete="tel"
                        placeholder="+91 98765 43210"
                        value={form.phone}
                        onChange={set('phone')}
                      />
                    </div>
                    <span className="field__error">
                      <Icon name="bell" />
                      {errors.phone}
                    </span>
                  </div>

                  <div className={`field${errors.password ? ' has-error' : ''}`}>
                    <label className="field__label" htmlFor="s-password">
                      Password <span className="req">*</span>
                    </label>
                    <div className="input-group">
                      <Icon name="shield" className="input-group__ico" />
                      <input
                        id="s-password"
                        className="input"
                        type={showPw ? 'text' : 'password'}
                        autoComplete="new-password"
                        placeholder="At least 6 characters"
                        value={form.password}
                        onChange={set('password')}
                        style={{ paddingRight: '3.6rem' }}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPw((s) => !s)}
                        aria-label={showPw ? 'Hide password' : 'Show password'}
                        style={{
                          position: 'absolute',
                          right: '0.4rem',
                          top: '50%',
                          transform: 'translateY(-50%)',
                          background: 'none',
                          border: 'none',
                          padding: '0.5rem 0.6rem',
                          fontSize: '0.78rem',
                          fontWeight: 600,
                          color: 'var(--ink-2)',
                        }}
                      >
                        {showPw ? 'Hide' : 'Show'}
                      </button>
                    </div>
                    <span className="field__error">
                      <Icon name="bell" />
                      {errors.password}
                    </span>
                  </div>

                  <div className={`field${errors.terms ? ' has-error' : ''}`} style={{ gap: '0.5rem' }}>
                    <label className="checkbox">
                      <input
                        type="checkbox"
                        checked={agree}
                        onChange={(e) => {
                          setAgree(e.target.checked);
                          clearErr('terms');
                        }}
                      />
                      <span className="checkbox__box">
                        <Icon name="check" />
                      </span>
                      <span>
                        I agree to the{' '}
                        <Link href="/about" className="accent-text" style={{ fontWeight: 600 }}>
                          Terms
                        </Link>{' '}
                        and{' '}
                        <Link href="/about" className="accent-text" style={{ fontWeight: 600 }}>
                          Privacy Policy
                        </Link>
                        .
                      </span>
                    </label>
                    <span className="field__error">
                      <Icon name="bell" />
                      {errors.terms}
                    </span>
                  </div>

                  <button
                    type="submit"
                    className={`btn btn--primary btn--lg btn--block${loading ? ' is-loading' : ''}`}
                  >
                    Create account <span className="btn__arrow" aria-hidden="true">→</span>
                  </button>
                </form>
              )}

              {/* ---------- FORGOT ---------- */}
              {view === 'forgot' && (
                <form className="form" onSubmit={submitForgot} noValidate>
                  <div className={`field${errors.email ? ' has-error' : ''}`}>
                    <label className="field__label" htmlFor="f-email">
                      Email <span className="req">*</span>
                    </label>
                    <div className="input-group">
                      <Icon name="mail" className="input-group__ico" />
                      <input
                        id="f-email"
                        className="input"
                        type="email"
                        autoComplete="email"
                        placeholder="you@example.com"
                        value={form.email}
                        onChange={set('email')}
                      />
                    </div>
                    <span className="field__error">
                      <Icon name="bell" />
                      {errors.email}
                    </span>
                  </div>

                  <button
                    type="submit"
                    className={`btn btn--primary btn--lg btn--block${loading ? ' is-loading' : ''}`}
                  >
                    Send reset link <span className="btn__arrow" aria-hidden="true">→</span>
                  </button>
                  <button
                    type="button"
                    className="btn btn--ghost btn--block"
                    onClick={() => go('login')}
                  >
                    Back to login
                  </button>
                </form>
              )}

              {/* ---------- OTP ---------- */}
              {view === 'otp' && (
                <form className="form" onSubmit={submitOtp} noValidate>
                  <div className={`field${errors.otp ? ' has-error' : ''}`} style={{ justifyItems: 'center' }}>
                    <div className="otp-inputs" onPaste={onOtpPaste}>
                      {otp.map((d, i) => (
                        <input
                          key={i}
                          ref={(el) => {
                            otpRefs.current[i] = el;
                          }}
                          type="text"
                          inputMode="numeric"
                          autoComplete="one-time-code"
                          maxLength={1}
                          aria-label={`Digit ${i + 1}`}
                          value={d}
                          onChange={(e) => onOtpChange(i, e.target.value)}
                          onKeyDown={(e) => onOtpKey(i, e)}
                        />
                      ))}
                    </div>
                    <span className="field__error" style={{ marginTop: '0.6rem' }}>
                      <Icon name="bell" />
                      {errors.otp}
                    </span>
                  </div>

                  <button
                    type="submit"
                    className={`btn btn--primary btn--lg btn--block${loading ? ' is-loading' : ''}`}
                  >
                    Verify <span className="btn__arrow" aria-hidden="true">→</span>
                  </button>
                  <div className="center small muted">
                    Didn&rsquo;t get the code?{' '}
                    <button
                      type="button"
                      className="accent-text"
                      style={{ background: 'none', border: 'none', fontWeight: 600 }}
                      onClick={resend}
                    >
                      Resend code
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Social — only on login/signup */}
          {isAuthTab && (
            <>
              <div className="divider">or continue with</div>
              <button type="button" className="btn btn--secondary btn--block" onClick={googleDemo}>
                <GoogleG />
                Continue with Google
              </button>
            </>
          )}

          {/* Footer note */}
          <p
            className="tiny muted center"
            style={{ marginTop: '1.4rem', display: 'flex', alignItems: 'center', gap: '0.4rem', justifyContent: 'center', width: '100%' }}
          >
            <span style={{ display: 'inline-flex', width: 14, height: 14, color: 'var(--accent-ink)' }}>
              <Icon name="shield" className="w-full" />
            </span>
            Secured with 256-bit encryption
          </p>
        </div>
      </Reveal>
    </section>
  );
}
