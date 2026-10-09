import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Home from './Home.jsx';
import Services from './Services.jsx';
import Work from './Work.jsx';
import Founder from './Founder.jsx';
import Contact from './Contact.jsx';
import usePageTitle from '../usePageTitle.js';

export default function Landing() {
  usePageTitle('Genisis — Web Development & AI Automation Studio in Pune, Maharashtra');
  const { hash } = useLocation();

  // arriving with #section in the URL (shared link, or from /admin) -> scroll there
  useEffect(() => {
    if (!hash) return undefined;
    const t = setTimeout(() => {
      const el = document.getElementById(hash.slice(1));
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 120);
    return () => clearTimeout(t);
  }, [hash]);

  return (
    <>
      <Home />
      <Services />
      <Work />
      <Founder />
      <Contact />
    </>
  );
}
