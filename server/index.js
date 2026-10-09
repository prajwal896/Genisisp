// Local server: API + built React site on ONE address (http://localhost:5000)
import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import app from './app.js';
import { connectDB } from './db.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dist = path.join(__dirname, '../client/dist');

if (fs.existsSync(dist)) {
  app.use(express.static(dist));
  app.get('*', (_req, res) => res.sendFile(path.join(dist, 'index.html')));
} else {
  console.warn('client/dist not found. Run "npm run build" first (or use "npm run local").');
}

const PORT = process.env.PORT || 5000;
try {
  await connectDB();
  console.log('MongoDB connected');
  app.listen(PORT, () => console.log(`Genisis running on http://localhost:${PORT}`));
} catch (err) {
  console.error('Startup failed:', err.message);
  process.exit(1);
}