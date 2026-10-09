import Icon from '../components/Icon.jsx';

const SERVICES = [
  { tag: 'ENGINEERING', num: '01', title: 'Web Development', desc: 'Fast, modern sites built to convert visitors into retained pipeline.',
    items: [['check', 'Custom High-Conversion Landing Pages'], ['check', 'High-Performance E-commerce Stores'], ['check', 'Intuitive Operational & Admin Dashboards'], ['check', 'Built to Rank: Google-Ready SEO from Day One']],
    foot: ['STACK // REACT + NODE + MONGODB', 'MOBILE-FIRST'] },
  { tag: 'AUTONOMOUS', num: '02', title: 'AI Automation', desc: 'Robots for the boring stuff. Get your hours back.', green: true,
    items: [['smart_toy', 'WhatsApp Business Automation Bots'], ['bolt', 'Automated Lead Capture & Inbound Qualification'], ['hub', 'Multi-App Workflow Automations (Make/n8n/Custom APIs)'], ['support_agent', '24/7 AI Receptionists & Custom Retrieval Agents']],
    foot: ['ALWAYS-ON // 24/7', 'ZERO MANUAL OVERHEAD'] }
];

export default function Services() {
  return (
    <section className="section alt" id="services">
      <div className="container">
        <div className="sec-head">
          <div>
            <span className="mono label">SERVICES // 01-02</span>
            <h2>What we do</h2>
          </div>
          <p className="muted">Dual-pillar engineering focused on high-conversion customer touchpoints and back-office autonomy.</p>
        </div>
        <div className="grid-2">
          {SERVICES.map((s) => (
            <div className="card service" key={s.num}>
              <div className="card-top">
                <span className={`mono tag ${s.green ? 'tag-green' : ''}`}>{s.tag}</span>
                <span className="mono big-num">{s.num}</span>
              </div>
              <h3>{s.title}</h3>
              <p className="muted">{s.desc}</p>
              <ul className="checks">
                {s.items.map(([icon, text]) => (
                  <li key={text}><span className="check-ic"><Icon name={icon} size={15} /></span>{text}</li>
                ))}
              </ul>
              <div className="card-foot mono"><span>{s.foot[0]}</span><b className="accent">{s.foot[1]}</b></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
