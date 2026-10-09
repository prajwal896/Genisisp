import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api, TOKEN_KEY } from '../api.js';
import usePageTitle from '../usePageTitle.js';

const EMPTY = { name: '', domain: '', label: '', badge: '', headline: '', description: '', role: '', metrics: '', theme: 'navy', url: '', order: 0, published: true };
const NEED = { website: 'Website', automation: 'Automation', both: 'Website + Automation', notsure: 'Not sure' };

function contactHref(c = '') {
  if (c.includes('@')) return `mailto:${c}`;
  const d = c.replace(/\D/g, '');
  if (d.length >= 10) return `https://wa.me/${d.length === 10 ? '91' + d : d}`;
  return null;
}

export default function AdminDashboard() {
  usePageTitle('Admin | Genisis');
  const nav = useNavigate();
  const [tab, setTab] = useState('leads');
  const [leads, setLeads] = useState([]);
  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState(EMPTY);
  const [editId, setEditId] = useState(null);
  const [err, setErr] = useState('');
  const [q, setQ] = useState('');
  const [statusF, setStatusF] = useState('all');

  const fail = (e) => {
    if (e.status === 401) { localStorage.removeItem(TOKEN_KEY); nav('/admin'); }
    else setErr(e.message);
  };
  const load = () => {
    api.leads().then(setLeads).catch(fail);
    api.allProjects().then(setProjects).catch(fail);
  };

  useEffect(() => {
    if (!localStorage.getItem(TOKEN_KEY)) { nav('/admin'); return; }
    load();
    // eslint-disable-next-line
  }, []);

  const stats = useMemo(() => {
    const week = Date.now() - 7 * 864e5;
    return {
      total: leads.length,
      fresh: leads.filter((l) => l.status === 'new').length,
      contacted: leads.filter((l) => l.status === 'contacted').length,
      closed: leads.filter((l) => l.status === 'closed').length,
      week: leads.filter((l) => new Date(l.createdAt).getTime() > week).length
    };
  }, [leads]);

  const shown = leads.filter((l) =>
    (statusF === 'all' || l.status === statusF) &&
    `${l.name} ${l.contact} ${l.message} ${l.need}`.toLowerCase().includes(q.toLowerCase()));

  function exportCsv() {
    const esc = (v) => `"${String(v ?? '').replace(/"/g, '""')}"`;
    const rows = [['Received', 'Name', 'Contact', 'Need', 'Message', 'Status'], ...shown.map((l) => [new Date(l.createdAt).toLocaleString(), l.name, l.contact, NEED[l.need] || l.need, l.message, l.status])];
    const blob = new Blob([rows.map((r) => r.map(esc).join(',')).join('\n')], { type: 'text/csv' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob); a.download = 'genisis-leads.csv'; a.click();
  }

  const field = (k) => ({ value: form[k], onChange: (e) => setForm({ ...form, [k]: e.target.value }) });

  async function save(e) {
    e.preventDefault();
    setErr('');
    const body = { ...form, order: Number(form.order) || 0, metrics: String(form.metrics).split(',').map((s) => s.trim()).filter(Boolean) };
    try {
      if (editId) await api.updateProject(editId, body); else await api.createProject(body);
      setForm(EMPTY); setEditId(null); load();
    } catch (e2) { fail(e2); }
  }
  const edit = (p) => { setEditId(p._id); setForm({ ...EMPTY, ...p, metrics: (p.metrics || []).join(', ') }); window.scrollTo({ top: 0, behavior: 'smooth' }); };
  const removeProject = async (id) => { if (confirm('Delete this project?')) { await api.deleteProject(id).catch(fail); load(); } };
  const setStatus = async (id, status) => { await api.setLeadStatus(id, status).catch(fail); load(); };
  const removeLead = async (id) => { if (confirm('Delete this lead?')) { await api.deleteLead(id).catch(fail); load(); } };
  const logout = () => { localStorage.removeItem(TOKEN_KEY); nav('/admin'); };

  return (
    <section className="section">
      <div className="container">
        <div className="sec-head">
          <div><span className="mono label">ADMIN</span><h2>Dashboard</h2></div>
          <div className="row-gap wrap">
            <button className={`pill dark ${tab === 'leads' ? 'on' : ''}`} onClick={() => setTab('leads')}>Clients ({leads.length})</button>
            <button className={`pill dark ${tab === 'projects' ? 'on' : ''}`} onClick={() => setTab('projects')}>Projects ({projects.length})</button>
            <button className={`pill dark ${tab === 'analytics' ? 'on' : ''}`} onClick={() => setTab('analytics')}>Analytics</button>
            <button className="pill dark" onClick={logout}>Log out</button>
          </div>
        </div>
        {err && <p className="notice bad mono">{err}</p>}

        {tab === 'leads' && (
          <>
            <div className="stats">
              {[['Total', stats.total], ['New', stats.fresh], ['Contacted', stats.contacted], ['Closed', stats.closed], ['Last 7 days', stats.week]].map(([k, v]) => (
                <div className="stat card" key={k}><span className="mono muted">{k.toUpperCase()}</span><b>{v}</b></div>
              ))}
            </div>
            <div className="toolbar">
              <input placeholder="Search name, contact, message…" value={q} onChange={(e) => setQ(e.target.value)} />
              <select value={statusF} onChange={(e) => setStatusF(e.target.value)}>
                <option value="all">All statuses</option><option value="new">New</option><option value="contacted">Contacted</option><option value="closed">Closed</option>
              </select>
              <button className="btn btn-white" onClick={exportCsv}>Export CSV</button>
            </div>
            <div className="table-wrap">
              <table>
                <thead><tr><th>Received</th><th>Client</th><th>Contact</th><th>Needs</th><th>Message</th><th>Status</th><th /></tr></thead>
                <tbody>
                  {shown.map((l) => {
                    const href = contactHref(l.contact);
                    const d = new Date(l.createdAt);
                    return (
                      <tr key={l._id}>
                        <td className="nowrap">{d.toLocaleDateString()}<br /><span className="muted">{d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span></td>
                        <td><b>{l.name}</b></td>
                        <td>{href ? <a className="link" href={href} target="_blank" rel="noreferrer">{l.contact}</a> : l.contact}</td>
                        <td>{NEED[l.need] || l.need}</td>
                        <td className="msg">{l.message || <span className="muted">—</span>}</td>
                        <td>
                          <select className={`st st-${l.status}`} value={l.status} onChange={(e) => setStatus(l._id, e.target.value)}>
                            <option value="new">new</option><option value="contacted">contacted</option><option value="closed">closed</option>
                          </select>
                        </td>
                        <td><button className="link-btn" onClick={() => removeLead(l._id)}>Delete</button></td>
                      </tr>
                    );
                  })}
                  {!shown.length && <tr><td colSpan="7" className="muted">No clients found.</td></tr>}
                </tbody>
              </table>
            </div>
          </>
        )}

        {tab === 'projects' && (
          <>
            <form className="card admin-form" onSubmit={save}>
              <h3>{editId ? 'Edit project' : 'Add project'}</h3>
              <div className="admin-grid">
                <input required placeholder="Name" {...field('name')} />
                <input required placeholder="Domain (e.g. velox.design)" {...field('domain')} />
                <input placeholder="Label (e.g. BRAND STUDIO)" {...field('label')} />
                <input placeholder="Badge (e.g. 120 FPS)" {...field('badge')} />
                <input placeholder="Headline" {...field('headline')} />
                <input placeholder="Role (e.g. DESIGN + BUILD)" {...field('role')} />
                <input placeholder="Live URL (https://...)" {...field('url')} />
                <input placeholder="Metrics, comma separated" {...field('metrics')} />
                <select {...field('theme')}>
                  {['navy', 'green', 'light', 'fintech', 'dark', 'warm'].map((t) => <option key={t} value={t}>Theme: {t}</option>)}
                </select>
                <input type="number" placeholder="Order" {...field('order')} />
              </div>
              <textarea rows={2} placeholder="Description" {...field('description')} />
              <label className="check-row"><input type="checkbox" checked={form.published} onChange={(e) => setForm({ ...form, published: e.target.checked })} /> Published</label>
              <div className="row-gap">
                <button className="btn btn-navy" type="submit">{editId ? 'Update' : 'Add'}</button>
                {editId && <button type="button" className="btn btn-white" onClick={() => { setEditId(null); setForm(EMPTY); }}>Cancel</button>}
              </div>
            </form>
            <div className="table-wrap">
              <table>
                <thead><tr><th>#</th><th>Name</th><th>Domain</th><th>Theme</th><th>Published</th><th /></tr></thead>
                <tbody>
                  {projects.map((p) => (
                    <tr key={p._id}>
                      <td>{p.order}</td><td>{p.name}</td><td>{p.domain}</td><td>{p.theme}</td><td>{p.published ? 'yes' : 'no'}</td>
                      <td><button className="link-btn" onClick={() => edit(p)}>Edit</button> <button className="link-btn" onClick={() => removeProject(p._id)}>Delete</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        {tab === 'analytics' && (
          <div className="card admin-form">
            <h3>Website analytics</h3>
            <p className="muted">Visitors and page views are tracked by Vercel Analytics once the site is deployed on Vercel. Open your project there and go to the <b>Analytics</b> tab (enable it once under Project → Analytics).</p>
            <div><a className="btn btn-navy" href="https://vercel.com/dashboard" target="_blank" rel="noreferrer">Open Vercel dashboard ↗</a></div>
          </div>
        )}
      </div>
    </section>
  );
}
