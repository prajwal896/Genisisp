import { SITE } from '../config.js';

export default function Telemetry() {
  return (
    <section className="telemetry">
      <div className="container telemetry-in mono">
        <span className="row-gap"><span className="dot ping" /> <b>{SITE.city.toUpperCase()}, {SITE.region.toUpperCase()}, IN [IST {SITE.coords}]</b><span className="hide-sm"> / ENGAGEMENTS: OPEN</span></span>
        <span>LATENCY: 18ms / <b className="primary">SYSTEM BUILD: v4.2.0-STABLE</b></span>
      </div>
    </section>
  );
}
