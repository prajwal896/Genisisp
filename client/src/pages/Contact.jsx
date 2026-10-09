import Icon from '../components/Icon.jsx';
import ContactForm from '../components/ContactForm.jsx';

export default function Contact() {
  return (
    <section className="section contact" id="contact">
      <div className="container contact-grid">
        <div>
          <div className="mono rapid"><span className="dot pulse" /> RAPID RESPONSE GUARANTEE</div>
          <h2>Got an idea?<br />Let's build it.</h2>
          <p className="lead light">Tell us about your project. We typically respond within 4 hours with an actionable architectural brief and transparent budget estimate.</p>
          <div className="contact-meta mono">
            <div><Icon name="schedule" className="accent" /> LOCAL TIME: PUNE (GMT+5:30)</div>
            <div><Icon name="verified_user" className="accent" /> DIRECT ACCESS TO THE FOUNDERS // NO SALESMEN</div>
          </div>
        </div>
        <ContactForm />
      </div>
    </section>
  );
}
