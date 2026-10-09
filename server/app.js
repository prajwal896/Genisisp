import 'dotenv/config';
import express from 'express';
import helmet from 'helmet';
import { connectDB } from './db.js';
import authRoutes from './routes/auth.js';
import leadRoutes from './routes/leads.js';
import projectRoutes from './routes/projects.js';

const app = express();

app.set('trust proxy', 1);
app.disable('x-powered-by');
app.use(helmet({ contentSecurityPolicy: false }));
app.use(express.json({ limit: '50kb' }));

app.use('/api', async (_req, res, next) => {
  try { await connectDB(); next(); }
  catch (e) { console.error('DB error:', e.message); res.status(500).json({ message: 'Database unavailable' }); }
});

app.get('/api/health', (_req, res) => res.json({ ok: true }));
app.use('/api/auth', authRoutes);
app.use('/api/leads', leadRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api', (_req, res) => res.status(404).json({ message: 'Not found' }));

export default app;