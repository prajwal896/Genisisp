import { useState } from 'react';
import emailjs from '@emailjs/browser';
import Icon from './Icon.jsx';
import { api } from '../api.js';
import { SITE } from '../config.js';

const { VITE_EMAILJS_SERVICE_ID: SERVICE, VITE_EMAILJS_TEMPLATE_ID: TEMPLATE, VITE_EMAILJS_PUBLIC_KEY: KEY } = import.meta.env;
const NEEDS = [['website', 'Website'], ['automation', 'Automation'], ['both', 'Both'], ['notsure', 'Not sure']];

export default function ContactForm() {
  const [form, setForm] = useState({ name: '', contact: '', need: 'website', message: '' });
  const [state, setState] = useState('idle'); // idle | sending | done | error
  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  async function submit(e) {
    e.preventDefault();
    setState('sending');
    const sendEmail = SERVICE && TEMPLATE && KEY
      ? emailjs.send(SERVICE, TEMPLATE, { to_email: SITE.email, from_name: form.name, contact: form.contact, need: form.need, message: form.message || '(none)', reply_to: form.contact }, { publicKey: KEY })
      : Promise.reject(new Error('EmailJS not configured'));
    const results = await Promise.allSettled([sendEmail, api.sendLead(form)]);
    // Success if at least one channel (email or database) went through
    if (results.some((r) => r.status === 'fulfilled')) {
      setState('done');
      setForm({ name: '', contact: '', need: 'website', message: '' });
    } else {
      setState('error');
    }
  }

  return (
    <form className="form" onSubmit={submit}>
      <label className="mono flabel" htmlFor="name">01 // YOUR NAME</label>
      <input id="name" required maxLength={100} placeholder="e.g. Alex Mercer" value={form.name} onChange={(e) => set('name', e.target.value)} />

      <label className="mono flabel" htmlFor="contact">02 // EMAIL OR WHATSAPP</label>
      <input id="contact" required maxLength={150} placeholder="alex@company.com or +91 98..." value={form.contact} onChange={(e) => set('contact', e.target.value)} />

      <span className="mono flabel">03 // WHAT DO YOU NEED?</span>
      <div className="pills">
        {NEEDS.map(([val, label]) => (
          <button key={val} type="button" className={`pill ${form.need === val ? 'on' : ''}`} onClick={() => set('need', val)}>{label}</button>
        ))}
      </div>

      <label className="mono flabel" htmlFor="msg">04 // PROJECT DETAILS (OPTIONAL)</label>
      <textarea id="msg" rows={3} maxLength={2000} placeholder="Tell us about the problem, timeline, or current bottlenecks..." value={form.message} onChange={(e) => set('message', e.target.value)} />

      <div className="form-foot">
        <button className="btn btn-green" type="submit" disabled={state === 'sending'}>{state === 'sending' ? 'Sending…' : 'Send it →'}</button>
        <span className="mono muted-light">ENCRYPTED DIRECT PIPELINE • NO SPAM</span>
      </div>

      {state === 'done' && <div className="notice ok mono"><Icon name="task_alt" /> MESSAGE TRANSMITTED. WE WILL PING YOU SHORTLY.</div>}
      {state === 'error' && <div className="notice bad mono"><Icon name="error" /> COULD NOT SEND. PLEASE TRY AGAIN OR USE WHATSAPP.</div>}
    </form>
  );
}
