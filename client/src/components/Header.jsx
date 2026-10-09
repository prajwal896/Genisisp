import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import ScrollLink from './ScrollLink.jsx';
import { SITE } from '../config.js';

const links = [['services', 'Services'], ['work', 'Work'], ['founders', 'Founders']];
const IDS = ['home', 'services', 'work', 'founders', 'contact'];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('');
  const { pathname } = useLocation();

  // highlight the nav item for the section currently on screen
  useEffect(() => {
    if (pathname !== '/') { setActive(''); return undefined; }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id === 'home' ? '' : e.target.id); });
    }, { rootMargin: '-45% 0px -50% 0px' });
    IDS.forEach((id) => { const el = document.getElementById(id); if (el) io.observe(el); });
    return () => io.disconnect();
  }, [pathname]);

  const close = () => setOpen(false);
  return (
    <header className="header">
      <div className="container header-in">
        <ScrollLink id="home" className="brand" onClick={close}>
          <img src={SITE.logo} alt={`${SITE.name} logo`} referrerPolicy="no-referrer" />
          <span className="brand-text">
            <strong>{SITE.name}</strong>
            <small className="mono">{SITE.tagline}</small>
          </span>
        </ScrollLink>
        <nav className={`nav ${open ? 'open' : ''}`}>
          {links.map(([id, label]) => (
            <ScrollLink key={id} id={id} onClick={close} className={active === id ? 'active' : ''}>{label}</ScrollLink>
          ))}
          <ScrollLink id="contact" className="btn-pill nav-cta" onClick={close}>
            <span className="dot pulse" /> Start a project →
          </ScrollLink>
        </nav>
        <button className="menu-btn" aria-label="Toggle menu" onClick={() => setOpen(!open)}>
          <span className="material-symbols-outlined">{open ? 'close' : 'menu'}</span>
        </button>
      </div>
    </header>
  );
}
