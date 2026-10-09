import Project from './models/Project.js';

const seed = [
  { name: 'Bodykraft Future Fit', domain: 'bodykraftfuturefit.com', url: 'https://www.bodykraftfuturefit.com/',
    label: 'FITNESS // PCMC, PUNE', badge: '15,000+ SQ FT', theme: 'dark', order: 1,
    headline: 'A Premium Gym, Found Where Locals Search',
    description: 'Fast, SEO-ready website for a 15,000+ sq ft fitness studio in Pimpri-Chinchwad covering strength training, MMA, swimming pool, physiotherapy and a toddler zone.',
    role: 'WEB DESIGN + DEVELOPMENT', metrics: ['MMA + Pool + Physio', 'Local SEO ready'] },
  { name: 'TrackPay', domain: 'trackpay-beta.vercel.app', url: 'https://trackpay-beta.vercel.app/',
    label: 'PAYMENTS // BETA', badge: 'LIVE BETA', theme: 'fintech', order: 2,
    headline: 'Payment Tracking, Made Simple',
    description: 'A payment tracking web app, live in beta. (Edit this description from the admin panel.)',
    role: 'DESIGN + DEVELOPMENT', metrics: ['Live in beta', 'Web app'] },
  { name: 'Infiwick', domain: 'infiwick1.vercel.app', url: 'https://infiwick1.vercel.app/',
    label: 'E-COMMERCE // CANDLES', badge: 'STOREFRONT', theme: 'warm', order: 3,
    headline: 'Little Flames, Big Moments',
    description: 'A warm, product-first storefront for handcrafted novelty candles, with an enquiry flow for wedding and event stations.',
    role: 'WEB DESIGN + DEVELOPMENT', metrics: ['Product collection', 'Event enquiry flow'] }
];

export async function seedProjects() {
  if ((await Project.countDocuments()) === 0) {
    await Project.insertMany(seed);
    console.log('Seeded default projects');
  }
}
