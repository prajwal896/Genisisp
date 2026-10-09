import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import Lead from '../models/Lead.js';
import auth from '../middleware/auth.js';

const router = Router();
const limiter = rateLimit({ windowMs: 60 * 60 * 1000, max: 15, message: { message: 'Too many submissions, try later.' } });

router.post('/', limiter, async (req, res) => {
  try {
    const { name, contact, need, message } = req.body || {};
    if (!name || !contact) return res.status(400).json({ message: 'Name and contact are required' });
    const lead = await Lead.create({ name, contact, need, message });
    res.status(201).json({ id: lead._id });
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
});

router.get('/', auth, async (_req, res) => res.json(await Lead.find().sort('-createdAt')));

router.patch('/:id', auth, async (req, res) => {
  try {
    const lead = await Lead.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true, runValidators: true });
    if (!lead) return res.status(404).json({ message: 'Not found' });
    res.json(lead);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
});

router.delete('/:id', auth, async (req, res) => {
  await Lead.findByIdAndDelete(req.params.id);
  res.json({ ok: true });
});

export default router;
