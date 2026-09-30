/* =====================================================================
   BIKECARE — Shared data layer (typed)
   ===================================================================== */

export const U = (id: string, w = 1200) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

/* Verified on-brand motorcycle / workshop photography */
export const IMG = {
  heroBike: U('1558981403-c5f9899a28bc', 1400),
  heroAlt: U('1615172282427-9a57ef2d142e', 1400),
  workshop: U('1605152276897-4f618f831968', 1200),
  mechanic: U('1619642751034-765dfdf7c58e', 1200),
  mechanic2: U('1530046339160-ce3e530c7d2f', 1200),
  engine: U('1486262715619-67b85e0b08d3', 1000),
  detailing: U('1568772585407-9361f9bf3a87', 1000),
  road: U('1558980664-10e7170b5df9', 1400),
  cruiser: U('1558981285-6f0c94958bb6', 1000),
  sport: U('1609630875171-b1321377ee65', 1000),
  adventure: U('1449426468159-d96dbf08f19f', 1000),
  street: U('1591637333184-19aa84b3e01f', 1000),
  scooter: U('1547549082-6bc09f2049ae', 1000),
  tyre: U('1580310614729-ccd69652491d', 1000),
  brake: U('1615172282427-9a57ef2d142e', 1000),
  battery: U('1530046339160-ce3e530c7d2f', 1000),
  wash: U('1568772585407-9361f9bf3a87', 1000),
  electrical: U('1619642751034-765dfdf7c58e', 1000),
  oil: U('1487754180451-c456f719a1fc', 1000),
  garage: U('1568772585407-9361f9bf3a87', 1200),
  team: U('1605152276897-4f618f831968', 1200),
};

export type IconName =
  | 'wrench' | 'droplet' | 'engine' | 'disc' | 'tyre' | 'battery' | 'sparkle' | 'bolt'
  | 'gear' | 'truck' | 'shield' | 'badge' | 'tag' | 'phone' | 'calendar' | 'check'
  | 'bike' | 'flag' | 'star' | 'gift' | 'layers' | 'sun' | 'users' | 'search' | 'map'
  | 'pin' | 'mail' | 'clock' | 'arrow' | 'grid' | 'car' | 'receipt' | 'bell' | 'home'
  | 'user' | 'heart' | 'sport' | 'street' | 'cruiser' | 'adventure' | 'scooter'
  | 'plus' | 'chevron' | 'logo' | 'sparkles' | 'zap';

export interface Service {
  slug: string; name: string; icon: IconName; cat: string;
  price: number; duration: string; img: string; short: string; desc: string;
}

export const SERVICES: Service[] = [
  { slug: 'general-service', name: 'General Service', icon: 'wrench', cat: 'general', price: 499, duration: '3–4 hrs', img: IMG.workshop, short: 'A complete health check-up covering 20+ points to keep your bike running smooth.', desc: 'Our signature multi-point inspection — engine tuning, fluid top-ups, chain lubrication, brake check and a detailed diagnostic report.' },
  { slug: 'oil-change', name: 'Oil Change', icon: 'droplet', cat: 'general', price: 399, duration: '45 mins', img: IMG.oil, short: 'Genuine engine oil replacement with a fresh filter for peak performance.', desc: 'Drain, flush and refill with manufacturer-grade engine oil, plus a new oil filter and level calibration.' },
  { slug: 'engine-service', name: 'Engine Service', icon: 'engine', cat: 'engine', price: 1299, duration: '5–6 hrs', img: IMG.engine, short: 'Deep engine care — decarbonising, tuning and performance restoration.', desc: 'Complete engine overhaul including carburettor/injector cleaning, valve adjustment, decarbonisation and compression testing.' },
  { slug: 'brake-service', name: 'Brake Service', icon: 'disc', cat: 'brakes', price: 599, duration: '1–2 hrs', img: IMG.brake, short: 'Precision brake inspection, pad replacement and fluid bleeding for safe stops.', desc: 'Front and rear brake pad inspection, disc cleaning, fluid bleeding and lever calibration for confident braking.' },
  { slug: 'tyre-replacement', name: 'Tyre Replacement', icon: 'tyre', cat: 'tyres', price: 899, duration: '1 hr', img: IMG.tyre, short: 'Genuine tyres fitted, balanced and aligned by certified technicians.', desc: 'Professional tyre fitment with wheel balancing, alignment check and air pressure calibration using premium branded tyres.' },
  { slug: 'battery-replacement', name: 'Battery Replacement', icon: 'battery', cat: 'battery', price: 1199, duration: '30 mins', img: IMG.battery, short: 'Genuine batteries with warranty, tested and fitted on the spot.', desc: 'Battery health diagnostics, terminal cleaning and replacement with a warranty-backed genuine battery.' },
  { slug: 'bike-washing', name: 'Bike Washing', icon: 'sparkle', cat: 'cleaning', price: 299, duration: '45 mins', img: IMG.wash, short: 'Foam wash, detailing and polish that makes your ride showroom-fresh.', desc: 'Premium foam wash, chain degreasing, tyre dressing, polish and a protective wax coat for a lasting shine.' },
  { slug: 'electrical-repair', name: 'Electrical Repair', icon: 'bolt', cat: 'electrical', price: 699, duration: '1–3 hrs', img: IMG.electrical, short: 'Wiring, lights and starter diagnostics fixed by electrical specialists.', desc: 'Full electrical diagnostics — wiring, headlamps, indicators, self-start and instrument cluster troubleshooting and repair.' },
];

export const ADDONS = [
  { name: 'Chain Sprocket Kit', price: 749 },
  { name: 'Air Filter Replacement', price: 249 },
  { name: 'Spark Plug (set)', price: 199 },
  { name: 'Coolant Top-up', price: 149 },
  { name: 'Teflon Coating', price: 599 },
  { name: 'Headlamp Restoration', price: 299 },
];

export interface Plan {
  name: string; price: number; yearly: number; desc: string; popular?: boolean;
  duration: string; pickup: string; warranty: string; features: [string, boolean][];
}

export const PLANS: Plan[] = [
  { name: 'Basic Service', price: 499, yearly: 5390, desc: 'Essential upkeep for city commuters.', duration: '1–2 hrs', pickup: 'Up to 5 km', warranty: '15 days', features: [['Engine oil top-up', true], ['20-point inspection', true], ['Chain lubrication', true], ['Brake check', true], ['Basic wash', true], ['Genuine parts', false], ['Doorstep pickup', false]] },
  { name: 'Standard Service', price: 999, yearly: 10790, desc: 'Our most-loved all-round service.', popular: true, duration: '2–3 hrs', pickup: 'Up to 10 km', warranty: '30 days', features: [['Engine oil replacement', true], ['30-point inspection', true], ['Chain lubrication', true], ['Brake adjustment', true], ['Premium foam wash', true], ['Genuine parts', true], ['Doorstep pickup', true]] },
  { name: 'Premium Service', price: 1499, yearly: 16190, desc: 'Deep care with detailing included.', duration: '3–5 hrs', pickup: 'Up to 20 km', warranty: '60 days', features: [['Synthetic oil replacement', true], ['40-point inspection', true], ['Chain & sprocket care', true], ['Brake overhaul', true], ['Detailing & polish', true], ['Genuine parts', true], ['Priority pickup', true]] },
  { name: 'Complete Bike Care', price: 2499, yearly: 26990, desc: 'The full works — nothing left untouched.', duration: '6–8 hrs', pickup: 'Up to 30 km', warranty: '90 days', features: [['Full synthetic oil + filter', true], ['50-point inspection', true], ['Engine decarbonising', true], ['Complete brake service', true], ['Premium detailing', true], ['All genuine parts', true], ['Priority doorstep', true]] },
];

export const BRANDS = [
  { name: 'Royal Enfield', tag: 'Cruiser' }, { name: 'Hero', tag: 'Commuter' },
  { name: 'Honda', tag: 'Street' }, { name: 'Yamaha', tag: 'Sport' },
  { name: 'Bajaj', tag: 'Street' }, { name: 'TVS', tag: 'Commuter' },
  { name: 'KTM', tag: 'Performance' }, { name: 'Suzuki', tag: 'Sport' },
  { name: 'Kawasaki', tag: 'Superbike' }, { name: 'BMW', tag: 'Adventure' },
];

export const MODELS: Record<string, string[]> = {
  'Royal Enfield': ['Classic 350', 'Hunter 350', 'Meteor 350', 'Bullet 350', 'Himalayan', 'Continental GT 650'],
  'Hero': ['Splendor Plus', 'HF Deluxe', 'Passion Pro', 'Xtreme 160R', 'Xpulse 200'],
  'Honda': ['Activa 6G', 'Shine', 'SP 125', 'Hornet 2.0', 'CB350', 'CB300R'],
  'Yamaha': ['FZ-S', 'MT-15', 'R15 V4', 'Fascino', 'Aerox 155'],
  'Bajaj': ['Pulsar 150', 'Pulsar N160', 'Pulsar NS200', 'Dominar 400', 'Avenger'],
  'TVS': ['Apache RTR 160', 'Apache RR 310', 'Ronin', 'Jupiter', 'NTORQ'],
  'KTM': ['Duke 200', 'Duke 390', 'RC 390', 'Adventure 390'],
  'Suzuki': ['Access 125', 'Gixxer', 'Gixxer SF', 'Burgman Street', 'V-Strom SX'],
  'Kawasaki': ['Ninja 300', 'Ninja 650', 'Z900', 'Versys 650'],
  'BMW': ['G 310 R', 'G 310 GS', 'F 900 R', 'R 1250 GS'],
};

export interface BikeType { name: string; slug: string; icon: IconName; img: string; desc: string; }
export const BIKE_TYPES: BikeType[] = [
  { name: 'Sports Bikes', slug: 'sports', icon: 'sport', img: IMG.sport, desc: 'High-performance machines tuned for the track and the twisties.' },
  { name: 'Street Bikes', slug: 'street', icon: 'street', img: IMG.street, desc: 'Everyday commuters built for agility and city riding.' },
  { name: 'Cruisers', slug: 'cruisers', icon: 'cruiser', img: IMG.cruiser, desc: 'Relaxed, torque-rich rides made for the long highway.' },
  { name: 'Adventure Bikes', slug: 'adventure', icon: 'adventure', img: IMG.adventure, desc: 'Go-anywhere tourers ready for tarmac and trail alike.' },
  { name: 'Scooters', slug: 'scooters', icon: 'scooter', img: IMG.scooter, desc: 'Convenient automatics for effortless daily mobility.' },
];

export const STATS = [
  { target: 10, suffix: 'K+', label: 'Bikes Serviced', decimals: 0 },
  { target: 50, suffix: '+', label: 'Expert Technicians', decimals: 0 },
  { target: 4.9, suffix: '/5', label: 'Customer Rating', decimals: 1 },
  { target: 12, suffix: '+', label: 'Years Experience', decimals: 0 },
];

export const STEPS: { n: string; icon: IconName; title: string; desc: string }[] = [
  { n: '01', icon: 'bike', title: 'Select Your Bike', desc: 'Pick your brand, model and registration in seconds.' },
  { n: '02', icon: 'wrench', title: 'Choose Service', desc: 'Select the service and any add-ons you need.' },
  { n: '03', icon: 'calendar', title: 'Select Date & Time', desc: 'Choose a slot that fits your schedule.' },
  { n: '04', icon: 'check', title: 'Confirm Booking', desc: 'Review details and confirm instantly.' },
  { n: '05', icon: 'truck', title: 'Pickup & Service', desc: 'Free doorstep pickup by our riders.' },
  { n: '06', icon: 'shield', title: 'Quality Check', desc: 'Multi-point inspection before handover.' },
  { n: '07', icon: 'flag', title: 'Delivery', desc: 'Your bike returns road-ready and sparkling.' },
];

export const WHY: { icon: IconName; title: string; desc: string }[] = [
  { icon: 'badge', title: 'Expert Technicians', desc: 'Factory-trained, certified specialists for every bike brand.' },
  { icon: 'gear', title: 'Genuine Parts', desc: 'Only OEM and manufacturer-approved components, always.' },
  { icon: 'truck', title: 'Doorstep Service', desc: 'Free pickup and drop within the city, at your convenience.' },
  { icon: 'tag', title: 'Transparent Pricing', desc: 'Upfront quotes with zero hidden charges — ever.' },
  { icon: 'shield', title: 'Service Warranty', desc: 'Every service backed by our written warranty.' },
  { icon: 'phone', title: 'Digital Tracking', desc: 'Follow your service live, from pickup to delivery.' },
];

export interface Testimonial { name: string; bike: string; rating: number; avatar: string; cat: string; text: string; }
export const TESTIMONIALS: Testimonial[] = [
  { name: 'Arjun Mehta', bike: 'Royal Enfield Classic 350', rating: 5, avatar: U('1507003211169-0a1dd7228f2d', 120), cat: 'General Service', text: 'The doorstep pickup was seamless and my Classic runs smoother than the day I bought it. The digital tracking kept me updated at every step.' },
  { name: 'Priya Sharma', bike: 'Honda Activa 6G', rating: 5, avatar: U('1494790108377-be9c29b29330', 120), cat: 'Bike Washing', text: 'Transparent pricing, no surprises, and my scooter came back looking brand new. BIKECARE has earned a customer for life.' },
  { name: 'Rahul Verma', bike: 'KTM Duke 390', rating: 5, avatar: U('1500648767791-00dcc994a43e', 120), cat: 'Engine Service', text: 'These guys actually understand performance bikes. The engine service was thorough and the technician explained everything clearly.' },
  { name: 'Sneha Iyer', bike: 'TVS Jupiter', rating: 4, avatar: U('1438761681033-6461ffad8d80', 120), cat: 'Oil Change', text: 'Booked at night, bike picked up by morning. Genuine oil, fair price and friendly staff. Highly recommend for busy people.' },
  { name: 'Vikram Singh', bike: 'Bajaj Dominar 400', rating: 5, avatar: U('1519085360753-af0119f7cbe7', 120), cat: 'Brake Service', text: 'The brakes feel razor-sharp now. I love that I could watch the whole process update on my phone. Premium experience end to end.' },
  { name: 'Ananya Rao', bike: 'Yamaha R15 V4', rating: 5, avatar: U('1534528741775-53994a69daeb', 120), cat: 'Complete Care', text: 'Complete Bike Care package is worth every rupee. Detailing, tuning, the works. My R15 has never looked or felt this good.' },
];

export interface Faq { cat: string; q: string; a: string; }
export const FAQS: Faq[] = [
  { cat: 'Booking', q: 'How do I book a service with BIKECARE?', a: 'Simply choose your bike, pick a service, select a convenient date and time slot, and confirm. You can book online in under two minutes or track an existing service anytime.' },
  { cat: 'Booking', q: 'Can I reschedule my booking?', a: 'Yes. You can reschedule free of charge up to 4 hours before your slot from your dashboard or by contacting support.' },
  { cat: 'Services', q: 'Do you service all bike brands and models?', a: 'We service all major Indian and international brands including Royal Enfield, Honda, Yamaha, KTM, Bajaj, TVS, Suzuki, Kawasaki and BMW, across sports, street, cruiser, adventure bikes and scooters.' },
  { cat: 'Services', q: 'How long does a typical service take?', a: 'A general service takes 3–4 hours, while quick jobs like oil changes take under an hour. Engine and complete-care services may take a full day. You will see an estimate at booking.' },
  { cat: 'Pricing', q: 'Are there any hidden charges?', a: 'Never. You receive an upfront, itemised quote before any work begins. Any additional parts are confirmed with you before we proceed.' },
  { cat: 'Pricing', q: 'What payment methods do you accept?', a: 'We accept UPI, all major credit and debit cards, net banking and cash on delivery. Digital payments can be made securely through your dashboard.' },
  { cat: 'Pickup & Delivery', q: 'Is doorstep pickup really free?', a: 'Yes — free pickup and drop is included on Standard plans and above, within the pickup radius of your selected plan. Basic plan pickups are available for a nominal fee.' },
  { cat: 'Pickup & Delivery', q: 'How will I know when my bike is picked up?', a: 'You will receive real-time notifications and can follow every stage — pickup, inspection, service, quality check and delivery — live on the Track Service page.' },
  { cat: 'Payments', q: 'Can I pay after the service is complete?', a: 'Absolutely. You can choose to pay on delivery, or settle digitally once you approve the final invoice in your dashboard.' },
  { cat: 'Warranty', q: 'What does the service warranty cover?', a: 'Every service is backed by a written warranty (15–90 days depending on your plan) covering the workmanship and genuine parts fitted during your service.' },
  { cat: 'Cancellation', q: 'What is your cancellation policy?', a: 'Cancel free of charge up to 4 hours before your scheduled slot. Cancellations after pickup may incur a small logistics fee. Refunds are processed within 5–7 business days.' },
  { cat: 'General', q: 'Do you offer emergency roadside assistance?', a: 'Yes. Our emergency roadside assistance is available across the city. Tap the Emergency CTA on the Contact page or call our 24/7 helpline.' },
];

export interface Offer { icon: IconName; title: string; discount: string; code: string; desc: string; tag: string; }
export const OFFERS: Offer[] = [
  { icon: 'gift', title: 'First Service Free Check-up', discount: '100% OFF', code: 'FIRST100', desc: 'Complimentary 20-point inspection on your very first booking with BIKECARE.', tag: 'New Customers' },
  { icon: 'layers', title: 'Service + Wash Combo', discount: '25% OFF', code: 'COMBO25', desc: 'Bundle any general service with premium detailing and save a quarter.', tag: 'Combo' },
  { icon: 'sun', title: 'Monsoon Ready Package', discount: '30% OFF', code: 'MONSOON30', desc: 'Brake, tyre and electrical check to keep you safe through the rains.', tag: 'Seasonal' },
  { icon: 'users', title: 'Refer a Friend', discount: '₹300 each', code: 'REFER300', desc: 'You and your friend both get ₹300 off when they book their first service.', tag: 'Referral' },
  { icon: 'star', title: 'Loyalty Rewards', discount: '15% OFF', code: 'LOYAL15', desc: 'Your fifth service and beyond, always at a loyalty member price.', tag: 'Members' },
  { icon: 'bolt', title: 'Weekday Express', discount: '20% OFF', code: 'WEEKDAY20', desc: 'Book Monday to Thursday and save on any premium service.', tag: 'Limited' },
];

export const CONTACT = {
  phone: '+91 98765 43210',
  emergency: '+91 90000 11111',
  email: 'hello@bikecare.in',
  address: '24 Service Lane, Indiranagar, Bengaluru 560038',
  hours: 'Mon–Sat 8:00 AM – 8:00 PM · Sun 9:00 AM – 5:00 PM',
};

export const money = (n: number) => '₹' + Number(n).toLocaleString('en-IN');
