import { useEffect, useRef, useState } from 'react';
import { api } from '../api.js';
import Icon from '../components/Icon.jsx';
import ScrollLink from '../components/ScrollLink.jsx';

const FRAME_W = 1280; // the live site is rendered at desktop width, then scaled down to fit the banner
const FRAME_H = 300;

// Only sites that block iframes need a screenshot (file in client/public/).
// key = domain without "www." as shown on the card. Every other project uses the live iframe.
const SCREENSHOTS = {
  'bodykraftfuturefit.com': '/bodykraft.png',
};

const cleanDomain = (d) => String(d || '').toLowerCase().replace(/^https?:\/\//, '').replace(/^www\./, '').replace(/\/.*$/, '');

// Adds https:// if the stored url is missing it (fixes "Visit website" going to localhost)
const fullUrl = (u) => (u && !/^https?:\/\//i.test(u) ? `https://${u}` : u);

// Static screenshot preview (for sites that refuse to be embedded in an iframe)
function ShotPreview({ p, src }) {
  return (
    <div className={`preview shot theme-${p.theme}`} style={{ height: FRAME_H }}>
      <img
        src={src}
        alt={`${p.name} website preview`}
        loading="lazy"
        style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top', display: 'block' }}
      />
      <div className="shot-chips">
        <span className="mono">{p.label}</span>
        {p.badge && <span className="mono badge">{p.badge}</span>}
      </div>
    </div>
  );
}

// Non-clickable live preview of the project's first screen
function SitePreview({ p }) {
  const box = useRef(null);
  const [scale, setScale] = useState(0.4);

  useEffect(() => {
    const el = box.current;
    if (!el) return undefined;
    const update = () => setScale(el.clientWidth / FRAME_W);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div ref={box} className={`preview shot theme-${p.theme}`} style={{ height: FRAME_H }}>
      <iframe
        src={p.url}
        title={`${p.name} preview`}
        loading="lazy"
        tabIndex={-1}
        aria-hidden="true"
        scrolling="no"
        sandbox="allow-scripts allow-same-origin"
        referrerPolicy="no-referrer"
        style={{ width: FRAME_W, height: FRAME_H / scale, transform: `scale(${scale})` }}
      />
      <div className="shot-chips">
        <span className="mono">{p.label}</span>
        {p.badge && <span className="mono badge">{p.badge}</span>}
      </div>
    </div>
  );
}

function ProjectCard({ p }) {
  const shot = SCREENSHOTS[cleanDomain(p.domain)] || SCREENSHOTS[cleanDomain(p.url)];
  const href = fullUrl(p.url);

  return (
    <article className="card project">
      <div className="browser">
        <span className="lights"><i className="r" /><i className="y" /><i className="g" /></span>
        <span className="url mono"><Icon name="lock" size={12} /> {p.domain}</span>
        <span className="mono tiny">HTTPS</span>
      </div>
      {shot ? (
        <ShotPreview p={p} src={shot} />
      ) : p.url ? (
        <SitePreview p={{ ...p, url: href }} />
      ) : (
        <div className={`preview theme-${p.theme}`}>
          <div className="preview-top"><span className="mono">{p.label}</span>{p.badge && <span className="mono badge">{p.badge}</span>}</div>
          <h4>{p.headline}</h4>
          <div className="metrics">{(p.metrics || []).map((m) => <span key={m} className="mono">{m}</span>)}</div>
        </div>
      )}
      <div className="project-body">
        <div className="project-title">
          <h3>{p.name}</h3>
          <span className="mono live"><span className="dot pulse" /> LIVE</span>
        </div>
        <span className="mono muted">{p.domain}</span>
        <p className="muted">{p.description}</p>
        <div className="card-foot mono">
          <span>ROLE // {p.role}</span>
          {p.url ? <a href={href} target="_blank" rel="noopener noreferrer" className="visit">Visit website →</a> : <span />}
        </div>
      </div>
    </article>
  );
}

function ReservedCard() {
  return (
    <article className="card project reserved">
      <div className="browser">
        <span className="lights"><i className="r" /><i className="y" /><i className="g" /></span>
        <span className="url mono"><Icon name="lock" size={12} /> yourbusiness.com</span>
        <span className="mono tiny">HTTPS</span>
      </div>
      <div className="preview theme-reserved" style={{ height: FRAME_H }}>
        <div className="preview-top">
          <span className="mono">SLOT 04 // RESERVED</span>
          <span className="mono badge">OPEN</span>
        </div>
        <h4>This spot is saved for your website.</h4>
        <div className="metrics"><span className="mono">Fast</span><span className="mono">Google-ready</span><span className="mono">Automated</span></div>
      </div>
      <div className="project-body">
        <div className="project-title">
          <h3>Your business, right here</h3>
          <span className="mono live"><span className="dot pulse" /> AVAILABLE</span>
        </div>
        <p className="muted">Tell us what you do. Within 4 hours you get a clear plan and a transparent quote, straight from the founders.</p>
        <div className="card-foot mono">
          <span>ROLE // YOU + US</span>
          <ScrollLink id="contact" className="btn btn-green cta-sm">Claim this spot →</ScrollLink>
        </div>
      </div>
    </article>
  );
}

export default function Work() {
  const [projects, setProjects] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    api.projects().then(setProjects).catch((e) => setError(e.message));
  }, []);

  return (
    <section className="section" id="work">
      <div className="container">
        <div className="sec-head">
          <div>
            <span className="mono label">SELECTED WORK // 2025-2026</span>
            <h2>Proof, not promises.</h2>
          </div>
          <span className="mono muted">SORT: RECENT PRODUCTION <span className="accent">• ALL DEPLOYED</span></span>
        </div>
        {error && <p className="notice bad mono">Could not load projects: {error}</p>}
        {!projects && !error && <p className="mono muted">LOADING…</p>}
        {projects && (
          <div className="grid-2">
            {projects.map((p) => <ProjectCard key={p._id} p={p} />)}
            {projects.length < 4 && <ReservedCard />}
          </div>
        )}
      </div>
    </section>
  );
}