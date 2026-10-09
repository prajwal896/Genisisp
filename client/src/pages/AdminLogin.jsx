import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api, TOKEN_KEY } from '../api.js';

export default function AdminLogin() {
  const nav = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [err, setErr] = useState('');

  async function submit(e) {
    e.preventDefault();
    setErr('');
    try {
      const { token } = await api.login(form);
      localStorage.setItem(TOKEN_KEY, token);
      nav('/admin/dashboard');
    } catch (e2) {
      setErr(e2.message);
    }
  }

  return (
    <section className="section">
      <div className="container narrow">
        <form className="card admin-card" onSubmit={submit}>
          <span className="mono label">ADMIN</span>
          <h2>Sign in</h2>
          <input type="email" required placeholder="Admin email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          <input type="password" required placeholder="Password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
          {err && <p className="notice bad mono">{err}</p>}
          <button className="btn btn-navy" type="submit">Sign in</button>
        </form>
      </div>
    </section>
  );
}
