import { Link } from 'react-router-dom';
import ScrollLink from './ScrollLink.jsx';
import Icon from './Icon.jsx';
import { SITE } from '../config.js';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <div className="footer-brand">
              <strong>{SITE.name}</strong>
              <span className="mono chip-dark">PNQ // {SITE.coords}</span>
            </div>
            <p className="muted-light">Internet-native web development and AI automation studio based in {SITE.city}, {SITE.region}, {SITE.country}.</p>
            <p className="mono accent"><span className="dot" /> STUDIO STATUS: OPERATIONAL</p>
          </div>
          <div>
            <nav className="footer-links">
              <ScrollLink id="services">Services</ScrollLink>
              <ScrollLink id="work">Work</ScrollLink>
              <ScrollLink id="founders">Founders</ScrollLink>
              <ScrollLink id="contact">Contact</ScrollLink>
            </nav>
          </div>
          <div>
            <span className="mono label-light">Direct Inquiries</span>
            <div className="footer-links">
              <a href={`mailto:${SITE.email}`}><Icon name="mail" className="accent" /> {SITE.email}</a>
              {SITE.whatsapp && <a href={`https://wa.me/${SITE.whatsapp}`} target="_blank" rel="noreferrer"><Icon name="chat" className="accent" /> {SITE.whatsappLabel} (WhatsApp)</a>}
            </div>
            <span className="mono label-light" style={{ marginTop: 16, display: 'block' }}>Network</span>
            <div className="footer-links row">
              <a className="mono" href={SITE.instagram} target="_blank" rel="noreferrer">Instagram ↗</a>
              <a className="mono" href={SITE.linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a>
            </div>
          </div>
        </div>
        <div className="footer-bottom mono">
          <span>© {new Date().getFullYear()} {SITE.name}, {SITE.city}. All rights reserved.</span>
          <span>ENGINEERED FOR PRODUCTION // HIGH PRECISION INTERFACES · <Link to="/admin">Admin</Link></span>
        </div>
      </div>
    </footer>
  );
}
