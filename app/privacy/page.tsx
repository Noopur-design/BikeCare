import Link from 'next/link';
import { CONTACT } from '@/lib/data';
import Icon from '@/components/Icon';
import { Reveal } from '@/components/Motion';
import Toc, { type TocItem } from './Toc';
import styles from './page.module.css';

export const metadata = {
  title: 'Privacy Policy',
  description:
    'How BIKECARE collects, uses, protects and shares your personal information when you book a bike service, track a job or contact our team.',
};

const SECTIONS: TocItem[] = [
  { id: 'intro', label: 'Introduction' },
  { id: 'collect', label: 'Information We Collect' },
  { id: 'use', label: 'How We Use Your Information' },
  { id: 'cookies', label: 'Cookies & Tracking' },
  { id: 'sharing', label: 'How We Share Data' },
  { id: 'security', label: 'Data Security' },
  { id: 'rights', label: 'Your Rights' },
  { id: 'retention', label: 'Data Retention' },
  { id: 'children', label: "Children's Privacy" },
  { id: 'changes', label: 'Changes to This Policy' },
  { id: 'contact', label: 'Contact Us' },
];

const anchor = { scrollMarginTop: 'calc(var(--nav-h) + 24px)' } as const;

export default function PrivacyPolicy() {
  return (
    <>
      {/* PAGE HERO */}
      <section className="page-hero">
        <div className="container container--wide">
          <div className="page-hero__inner">
            <nav className="breadcrumbs" aria-label="Breadcrumb">
              <Link href="/">Home</Link>
              <span className="sep">/</span>
              <span>Privacy Policy</span>
            </nav>
            <Reveal>
              <span className="eyebrow">Your Privacy Matters</span>
            </Reveal>
            <Reveal delay={0.06}>
              <h1 className="h1 mt-1">Privacy Policy</h1>
            </Reveal>
            <Reveal delay={0.12}>
              <p className={`${styles.updated} mt-2`}>
                <Icon name="calendar" />
                Last updated: 1 October 2026
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* BODY */}
      <section className="section" style={{ paddingTop: 'clamp(1.5rem, 3vw, 2.5rem)' }}>
        <div className="container container--wide">
          <div className={styles.layout}>
            {/* Sticky table of contents (hidden on mobile) */}
            <Toc items={SECTIONS} />

            {/* Readable policy content */}
            <div className="prose" style={{ maxWidth: '76ch' }}>
              <Reveal>
                <div className={`glass ${styles.intro}`}>
                  <p style={{ margin: 0 }}>
                    At <strong>BIKECARE</strong>, keeping your ride road-ready starts with keeping your
                    information safe. This policy explains, in plain language, what we collect when you book a
                    service, track a job or reach out to us — and the choices you have over your data.
                  </p>
                  <div className={styles.introRow}>
                    <span className={styles.updated}>
                      <Icon name="shield" />
                      Written in plain English
                    </span>
                    <span className={styles.updated}>
                      <Icon name="check" />
                      No hidden data sharing
                    </span>
                  </div>
                </div>
              </Reveal>

              <Reveal as="section" id="intro" style={anchor}>
                <h2>Introduction</h2>
                <p>
                  BIKECARE (&ldquo;BIKECARE&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo; or &ldquo;our&rdquo;) operates
                  the BIKECARE website, booking platform and doorstep bike-servicing network. We are committed to
                  protecting the privacy of every rider who trusts us with their bike and their details.
                </p>
                <p>
                  This Privacy Policy describes how we collect, use, disclose and safeguard your information when you
                  visit our website, create an account, book a service, use our real-time tracking, or otherwise
                  interact with us. By using BIKECARE, you agree to the practices described here.
                </p>
              </Reveal>

              <Reveal as="section" id="collect" style={anchor}>
                <h2>Information We Collect</h2>
                <p>We only collect what we need to service your bike and give you a smooth experience:</p>
                <ul>
                  <li>
                    <span>
                      <strong>Contact &amp; account details</strong> — your name, phone number, email address and
                      service address, provided when you book, create an account or request a callback.
                    </span>
                  </li>
                  <li>
                    <span>
                      <strong>Bike &amp; service details</strong> — your bike brand, model, registration, service
                      history and the add-ons or plans you select.
                    </span>
                  </li>
                  <li>
                    <span>
                      <strong>Payment information</strong> — processed securely by our payment partners. We store only
                      the transaction status and invoice, never your full card number or UPI PIN.
                    </span>
                  </li>
                  <li>
                    <span>
                      <strong>Location data</strong> — the pickup and drop address you share, used to route our riders
                      and calculate service radius.
                    </span>
                  </li>
                  <li>
                    <span>
                      <strong>Usage &amp; device data</strong> — pages visited, features used, browser type and
                      approximate location, collected automatically to keep the platform fast and secure.
                    </span>
                  </li>
                </ul>
              </Reveal>

              <Reveal as="section" id="use" style={anchor}>
                <h2>How We Use Your Information</h2>
                <p>Your information helps us deliver and improve the BIKECARE service. Specifically, we use it to:</p>
                <ul>
                  <li><span>Schedule, complete and track your bike service, including doorstep pickup and delivery.</span></li>
                  <li><span>Send booking confirmations, service updates and delivery notifications by SMS, email or app.</span></li>
                  <li><span>Prepare transparent, itemised quotes and process your payments and invoices.</span></li>
                  <li><span>Provide customer support, warranty follow-ups and emergency roadside assistance.</span></li>
                  <li><span>Improve our services, technician training and website experience through anonymised analytics.</span></li>
                  <li><span>Send offers and reminders — only where you have opted in, and always with an easy way to opt out.</span></li>
                </ul>
              </Reveal>

              <Reveal as="section" id="cookies" style={anchor}>
                <h2>Cookies &amp; Tracking</h2>
                <p>
                  We use cookies and similar technologies to remember your preferences, keep you signed in, and
                  understand how our website is used. Essential cookies are required for the platform to function, such
                  as maintaining your booking session.
                </p>
                <p>
                  Analytics and performance cookies are optional and help us measure and improve the experience. You can
                  accept or decline non-essential cookies at any time through your browser settings or our cookie
                  banner. Declining will not affect your ability to book a service.
                </p>
              </Reveal>

              <Reveal as="section" id="sharing" style={anchor}>
                <h2>How We Share Data</h2>
                <p>
                  We never sell your personal information. We share it only with the people and partners needed to
                  complete your service:
                </p>
                <ul>
                  <li><span><strong>Service technicians &amp; pickup riders</strong> — the details needed to reach you and service your bike correctly.</span></li>
                  <li><span><strong>Payment processors</strong> — to securely handle transactions and refunds.</span></li>
                  <li><span><strong>Trusted service providers</strong> — SMS, email and analytics partners bound by confidentiality obligations.</span></li>
                  <li><span><strong>Legal authorities</strong> — where required by law, or to protect the rights, safety and property of BIKECARE and our riders.</span></li>
                </ul>
              </Reveal>

              <Reveal as="section" id="security" style={anchor}>
                <h2>Data Security</h2>
                <p>
                  We protect your information with encryption in transit, access controls, and regular security reviews.
                  Payment data is handled by PCI-compliant partners, and access to your details is limited to staff who
                  need it to serve you.
                </p>
                <p>
                  No system is ever completely secure, but we work continuously to safeguard your data and will notify
                  you promptly if a breach ever affects your personal information.
                </p>
              </Reveal>

              <Reveal as="section" id="rights" style={anchor}>
                <h2>Your Rights</h2>
                <p>You are in control of your information. At any time, you may:</p>
                <ul>
                  <li><span>Access the personal data we hold about you and request a copy.</span></li>
                  <li><span>Correct any inaccurate or outdated details in your account.</span></li>
                  <li><span>Request deletion of your data, subject to legal and warranty record-keeping requirements.</span></li>
                  <li><span>Withdraw consent for marketing communications with a single tap.</span></li>
                  <li><span>Object to or restrict certain processing of your information.</span></li>
                </ul>
                <p>To exercise any of these rights, simply contact us using the details below and we will respond within 30 days.</p>
              </Reveal>

              <Reveal as="section" id="retention" style={anchor}>
                <h2>Data Retention</h2>
                <p>
                  We keep your information only as long as needed to provide our services and meet our legal, tax and
                  warranty obligations. Service and invoice records are typically retained for the duration of your
                  applicable warranty and any statutory period thereafter.
                </p>
                <p>
                  When your data is no longer required, we securely delete or anonymise it so it can no longer be linked
                  to you.
                </p>
              </Reveal>

              <Reveal as="section" id="children" style={anchor}>
                <h2>Children&rsquo;s Privacy</h2>
                <p>
                  BIKECARE is intended for riders aged 18 and above. We do not knowingly collect personal information
                  from children. If you believe a minor has provided us with their data, please contact us and we will
                  promptly remove it.
                </p>
              </Reveal>

              <Reveal as="section" id="changes" style={anchor}>
                <h2>Changes to This Policy</h2>
                <p>
                  We may update this Privacy Policy from time to time to reflect changes in our services or legal
                  requirements. When we do, we will revise the &ldquo;Last updated&rdquo; date at the top of this page
                  and, for significant changes, notify you directly.
                </p>
                <p>We encourage you to review this policy periodically to stay informed about how we protect your data.</p>
              </Reveal>

              <Reveal as="section" id="contact" style={anchor}>
                <h2>Contact Us</h2>
                <p>
                  Questions about this policy or how we handle your data? Our team is happy to help — reach out any time:
                </p>
                <div className={`glass ${styles.contactCard}`}>
                  <a className={styles.contactRow} href={`mailto:${CONTACT.email}`}>
                    <Icon name="mail" />
                    <span>{CONTACT.email}</span>
                  </a>
                  <a className={styles.contactRow} href={`tel:${CONTACT.phone.replace(/\s+/g, '')}`}>
                    <Icon name="phone" />
                    <span>{CONTACT.phone}</span>
                  </a>
                  <div className={styles.contactRow}>
                    <Icon name="pin" />
                    <span>{CONTACT.address}</span>
                  </div>
                </div>
                <p style={{ marginTop: '1.4rem' }}>
                  Prefer to get things moving instead?{' '}
                  <Link href="/contact">Visit our contact page</Link> or{' '}
                  <Link href="/book">book a service</Link> in under two minutes.
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
