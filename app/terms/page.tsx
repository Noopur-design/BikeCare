import Link from 'next/link';
import type { ReactNode } from 'react';
import { CONTACT } from '@/lib/data';
import Icon from '@/components/Icon';
import { Reveal } from '@/components/Motion';
import styles from './page.module.css';

export const metadata = {
  title: 'Terms & Conditions',
  description:
    'The terms that govern your use of BIKECARE — booking, service, payment, cancellation, warranty, pickup & delivery, liability, refunds and governing law (Bengaluru, India).',
};

const LAST_UPDATED = '1 October 2026';

type Section = { id: string; nav: string; heading: string; body: ReactNode };

const SECTIONS: Section[] = [
  {
    id: 'acceptance',
    nav: 'Acceptance of Terms',
    heading: 'Acceptance of Terms',
    body: (
      <>
        <p>
          These Terms &amp; Conditions (the &ldquo;Terms&rdquo;) form a binding agreement between you and
          BIKECARE (&ldquo;BIKECARE&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo; or &ldquo;our&rdquo;). They
          govern your access to and use of our website, mobile experiences and bike-service offerings across
          Bengaluru. By booking a service, creating an account or otherwise using BIKECARE, you confirm that
          you have read, understood and agreed to these Terms.
        </p>
        <ul>
          <li>You must be at least 18 years of age and legally able to enter into a contract.</li>
          <li>You must be the owner of the bike, or authorised by the owner to book service on their behalf.</li>
          <li>You agree to provide accurate booking, vehicle and contact information at all times.</li>
        </ul>
        <p>
          We may update these Terms from time to time. Material changes will be posted here with a revised
          &ldquo;last updated&rdquo; date, and your continued use of BIKECARE after any change constitutes
          acceptance of the updated Terms.
        </p>
      </>
    ),
  },
  {
    id: 'booking',
    nav: 'Booking Terms',
    heading: 'Booking Terms',
    body: (
      <>
        <p>
          A booking is a request for service at a chosen date and time slot. Slots are subject to
          availability and are confirmed only once you receive a booking confirmation from BIKECARE.
        </p>
        <ul>
          <li>Estimated prices shown at booking are indicative and based on the service and add-ons you select.</li>
          <li>
            Final charges are shared as an itemised quote after inspection. No additional work begins without
            your approval of that quote.
          </li>
          <li>
            You may reschedule free of charge up to four hours before your slot, from your dashboard or by
            contacting support.
          </li>
          <li>You are responsible for removing personal belongings and valuables before pickup.</li>
        </ul>
      </>
    ),
  },
  {
    id: 'service',
    nav: 'Service Terms',
    heading: 'Service Terms',
    body: (
      <>
        <p>
          BIKECARE services are performed by trained technicians using genuine, manufacturer-approved parts
          wherever applicable. We aim to complete every service within the estimated duration communicated at
          booking, though timelines may vary with the condition of the bike and parts availability.
        </p>
        <ul>
          <li>
            Diagnostic findings are shared with a photo or video report before repairs proceed on
            chargeable work.
          </li>
          <li>
            Where a fault falls outside the scope of the booked service, we will recommend the appropriate
            work and price it separately for your approval.
          </li>
          <li>
            Bikes presented with pre-existing damage, unauthorised modifications or safety defects may be
            declined, or serviced only after written acknowledgement of their condition.
          </li>
          <li>Service history and job cards are logged to your BIKECARE profile for future reference.</li>
        </ul>
      </>
    ),
  },
  {
    id: 'payment',
    nav: 'Payment',
    heading: 'Payment',
    body: (
      <>
        <p>
          Payment is due on completion of service unless a different arrangement is confirmed in writing. You
          may settle your invoice digitally through your dashboard or on delivery.
        </p>
        <ul>
          <li>We accept UPI, all major credit and debit cards, net banking and cash on delivery.</li>
          <li>All prices are quoted in Indian Rupees (₹) and are inclusive of applicable taxes unless stated otherwise.</li>
          <li>Digital payments are processed through secure, PCI-compliant payment partners; BIKECARE does not store your card details.</li>
          <li>Promotional codes are subject to their own eligibility rules and cannot be combined unless expressly permitted.</li>
        </ul>
      </>
    ),
  },
  {
    id: 'cancellation',
    nav: 'Cancellation Policy',
    heading: 'Cancellation Policy',
    body: (
      <>
        <p>
          Plans change, and we keep cancellations simple. You can cancel any booking directly from your
          dashboard or by contacting our support team.
        </p>
        <ul>
          <li>Cancel free of charge up to four hours before your scheduled slot.</li>
          <li>
            Cancellations made after your bike has been picked up may incur a nominal logistics fee to cover
            doorstep collection.
          </li>
          <li>
            If work has already begun with your approval, charges for completed labour and fitted parts will
            apply.
          </li>
          <li>Repeated no-shows may affect future slot availability.</li>
        </ul>
      </>
    ),
  },
  {
    id: 'warranty',
    nav: 'Warranty',
    heading: 'Warranty',
    body: (
      <>
        <p>
          Every BIKECARE service is backed by a written warranty covering the workmanship performed and the
          genuine parts we fit. Warranty duration depends on your plan and ranges from 15 to 90 days.
        </p>
        <ul>
          <li>The warranty covers defects in the specific workmanship and parts supplied by BIKECARE.</li>
          <li>
            It does not cover normal wear and tear, consumables, accidental damage, misuse, tampering, or
            faults arising from work carried out by a third party after our service.
          </li>
          <li>
            Warranty claims must be raised through your dashboard or support, with your service reference, and
            may require inspection at a BIKECARE facility.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: 'delivery',
    nav: 'Pickup & Delivery',
    heading: 'Pickup & Delivery',
    body: (
      <>
        <p>
          Free doorstep pickup and drop is included on Standard plans and above, within the pickup radius of
          your selected plan; Basic-plan pickups are available for a nominal fee. You can follow every stage
          of your service live, from pickup to delivery.
        </p>
        <ul>
          <li>
            Please ensure the bike is accessible at the confirmed address, with keys and any required
            documents handed over at collection.
          </li>
          <li>
            Fuel level, odometer reading and visible condition are noted on a digital checklist at both pickup
            and delivery.
          </li>
          <li>
            Delivery times are estimates and may be affected by traffic, weather or circumstances beyond our
            reasonable control.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: 'liability',
    nav: 'Liability',
    heading: 'Liability',
    body: (
      <>
        <p>
          BIKECARE takes every reasonable care of your bike while it is with us. To the fullest extent
          permitted by law, our total liability arising from any service is limited to the value of that
          service.
        </p>
        <ul>
          <li>
            We are not liable for pre-existing conditions, latent defects, or issues unrelated to the work we
            performed.
          </li>
          <li>
            We are not liable for loss of personal items left on or in the bike; please remove all belongings
            before pickup.
          </li>
          <li>
            We are not responsible for delays or non-performance caused by events beyond our reasonable
            control, including supply shortages, strikes or force majeure.
          </li>
        </ul>
        <p>Nothing in these Terms excludes any liability that cannot be excluded under applicable law.</p>
      </>
    ),
  },
  {
    id: 'refund',
    nav: 'Refund Policy',
    heading: 'Refund Policy',
    body: (
      <>
        <p>
          Where a refund is due — for an eligible cancellation, a duplicate payment or a service not rendered
          — it will be processed to your original payment method.
        </p>
        <ul>
          <li>Approved refunds are typically processed within 5&ndash;7 business days.</li>
          <li>
            Refunds are net of any charges already incurred for completed labour, fitted parts or doorstep
            logistics.
          </li>
          <li>
            If you are dissatisfied with a service, contact us within 48 hours of delivery so we can inspect
            and make it right — a re-service is often the fastest resolution.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: 'ip',
    nav: 'Intellectual Property',
    heading: 'Intellectual Property',
    body: (
      <>
        <p>
          The BIKECARE name, logo, website, content, designs and software are the property of BIKECARE and are
          protected by applicable intellectual-property laws. You are granted a limited, personal,
          non-transferable licence to use our website and services for their intended purpose.
        </p>
        <ul>
          <li>You may not copy, reproduce, modify or distribute our content without prior written consent.</li>
          <li>You may not use our branding in a way that suggests endorsement or affiliation without permission.</li>
        </ul>
      </>
    ),
  },
  {
    id: 'law',
    nav: 'Governing Law',
    heading: 'Governing Law',
    body: (
      <>
        <p>
          These Terms are governed by and construed in accordance with the laws of India. Any dispute arising
          out of or in connection with these Terms or our services shall be subject to the exclusive
          jurisdiction of the competent courts at Bengaluru, Karnataka.
        </p>
        <p>
          We encourage you to contact us first — most concerns are resolved quickly and amicably through our
          support team before any formal step is needed.
        </p>
      </>
    ),
  },
  {
    id: 'contact',
    nav: 'Contact',
    heading: 'Contact',
    body: (
      <>
        <p>
          Questions about these Terms? Our team is happy to help. Reach us through any of the channels below.
        </p>
        <ul>
          <li>Phone: <a href={`tel:${CONTACT.phone.replace(/\s+/g, '')}`}>{CONTACT.phone}</a></li>
          <li>Email: <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a></li>
          <li>Address: {CONTACT.address}</li>
          <li>Hours: {CONTACT.hours}</li>
        </ul>
      </>
    ),
  },
];

export default function TermsPage() {
  return (
    <>
      {/* PAGE HERO */}
      <section className="page-hero">
        <div className="container container--wide">
          <div className="page-hero__inner">
            <Reveal as="div">
              <nav className="breadcrumbs" aria-label="Breadcrumb">
                <Link href="/">Home</Link>
                <span className="sep">/</span>
                <span>Terms &amp; Conditions</span>
              </nav>
            </Reveal>
            <Reveal delay={0.05}><span className="eyebrow">Legal</span></Reveal>
            <Reveal delay={0.12}><h1 className="h1 mt-1 balance">Terms &amp; Conditions</h1></Reveal>
            <Reveal delay={0.2}>
              <p className="lead mt-2 pretty">
                The terms below govern your use of BIKECARE and the services we provide. Please read them
                carefully — booking a service means you agree to them.
              </p>
            </Reveal>
            <Reveal delay={0.28}>
              <span className={styles.updated} style={{ marginTop: '1.4rem' }}>
                <Icon name="calendar" />Last updated: {LAST_UPDATED}
              </span>
            </Reveal>
          </div>
        </div>
      </section>

      {/* BODY — sticky TOC + prose */}
      <section className="section" style={{ paddingTop: 'clamp(2rem, 4vw, 3rem)' }}>
        <div className="container container--wide">
          <div className={styles.layout}>
            {/* TOC */}
            <aside className={styles.side}>
              <div className="glass" style={{ padding: '1.25rem' }}>
                <span className={`eyebrow ${styles.tocHead}`}>On this page</span>
                <nav className="toc" aria-label="Table of contents">
                  {SECTIONS.map((s) => (
                    <a key={s.id} href={`#${s.id}`}>{s.nav}</a>
                  ))}
                </nav>
              </div>
            </aside>

            {/* PROSE */}
            <div className="prose">
              <Reveal>
                <p className="lead" style={{ marginBottom: '0.5rem' }}>
                  Welcome to BIKECARE. These Terms &amp; Conditions set out the rules for booking and receiving
                  our premium bike-service experience, and the commitments we make to you in return.
                </p>
              </Reveal>

              {SECTIONS.map((s) => (
                <Reveal key={s.id}>
                  <div>
                    <h2 id={s.id}>{s.heading}</h2>
                    {s.body}
                  </div>
                </Reveal>
              ))}

              {/* Contact CTA */}
              <Reveal>
                <div className={`glass ${styles.contactBox}`} style={{ padding: 'clamp(1.5rem, 3vw, 2.25rem)' }}>
                  <div className="between" style={{ gap: '1.25rem' }}>
                    <div>
                      <h3 className="h4" style={{ marginBottom: '0.35rem' }}>Still have questions?</h3>
                      <p className="muted small" style={{ margin: 0 }}>
                        Talk to our team about anything in these Terms.
                      </p>
                    </div>
                    <Link className="btn btn--primary" href="/contact">
                      Contact Us <span className="btn__arrow" aria-hidden="true">→</span>
                    </Link>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
