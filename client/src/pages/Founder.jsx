import { FOUNDERS } from '../config.js';

export default function Founder() {
  return (
    <section className="section alt" id="founders">
      <div className="container">
        <div className="sec-head">
          <div>
            <span className="mono label">THE PEOPLE BEHIND IT // FOUNDERS</span>
            <h2>Meet the founders</h2>
          </div>
          <p className="muted">No account managers, no middlemen. You talk directly to the people who build it.</p>
        </div>
        <div className="founders">
          {FOUNDERS.map((f, i) => (
            <article className={`fcard ${f.lead ? 'lead-card' : ''}`} key={f.initials}>
              <div className="ftile">
                {f.photo ? <img src={f.photo} alt={f.name} /> : <span className="initials">{f.initials}</span>}
                <span className="mono fnum">FOUNDER {String(i + 1).padStart(2, '0')}</span>
                <div className="fname">
                  <h3>{f.name}</h3>
                  <span className="mono">{f.role}</span>
                </div>
              </div>
              <p className="muted fbio">{f.bio}</p>
              <div className="flinks">
                {f.linkedin && <a className="link" href={f.linkedin} target="_blank" rel="noreferrer">LinkedIn →</a>}
                {f.portfolio && <a className="link" href={f.portfolio} target="_blank" rel="noreferrer">Portfolio →</a>}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
