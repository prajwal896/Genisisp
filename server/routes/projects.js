import { Router } from 'express';
import Project from '../models/Project.js';
import auth from '../middleware/auth.js';

const router = Router();
const FIELDS = ['name', 'domain', 'label', 'badge', 'headline', 'description', 'role', 'metrics', 'theme', 'url', 'order', 'published'];
const pick = (body = {}) => Object.fromEntries(FIELDS.filter((k) => k in body).map((k) => [k, body[k]]));

router.get('/', async (_req, res) => res.json(await Project.find({ published: true }).sort('order')));
router.get('/admin/all', auth, async (_req, res) => res.json(await Project.find().sort('order')));

router.post('/', auth, async (req, res) => {
  try { res.status(201).json(await Project.create(pick(req.body))); }
  catch (e) { res.status(400).json({ message: e.message }); }
});

router.put('/:id', auth, async (req, res) => {
  try {
    const p = await Project.findByIdAndUpdate(req.params.id, pick(req.body), { new: true, runValidators: true });
    if (!p) return res.status(404).json({ message: 'Not found' });
    res.json(p);
  } catch (e) { res.status(400).json({ message: e.message }); }
});

router.delete('/:id', auth, async (req, res) => {
  await Project.findByIdAndDelete(req.params.id);
  res.json({ ok: true });
});

export default router;
