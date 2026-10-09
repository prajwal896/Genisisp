import Telemetry from '../components/Telemetry.jsx';
import ScrollLink from '../components/ScrollLink.jsx';
import { SITE } from '../config.js';

export default function Home() {
  return (
    <div id="home">
      <Telemetry />
      <section className="hero">
        <div className="container hero-in">
          <div className="status-badge mono"><span className="dot ping" /> ONLINE</div>
          <h1>Someone Googled your business today. You didn't show up. <span className="accent">We make sure you do.</span></h1>
          <p className="lead">Genisis builds fast, Google-ready websites and AI automations for businesses in {SITE.city} and across India. High-rigor engineering without the agency fluff.</p>
          <div className="actions">
            <ScrollLink id="contact" className="btn btn-navy">Start a project →</ScrollLink>
            <ScrollLink id="work" className="btn btn-white">See work</ScrollLink>
          </div>
          <div className="hero-meta mono">
            <span><b className="primary">GENISIS.IN</b> / {SITE.city.toUpperCase()} / {new Date().getFullYear()}</span>
            <span className="hide-sm">LATENCY // ZERO FAT / STACK // MERN + AGENTS</span>
          </div>
        </div>
      </section>
    </div>
  );
}
