import { Router } from 'express';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import rateLimit from 'express-rate-limit';

const router = Router();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: 'Too many attempts, try later.' }
});

// Hash both sides first so the comparison is fixed-length (no length leak)
const same = (a = '', b = '') => {
  const x = crypto.createHash('sha256').update(String(a)).digest();
  const y = crypto.createHash('sha256').update(String(b)).digest();
  return crypto.timingSafeEqual(x, y);
};

router.post('/login', limiter, (req, res) => {
  const { email, password } = req.body || {};
  const { ADMIN_EMAIL, ADMIN_PASSWORD, JWT_SECRET } = process.env;

  if (ADMIN_EMAIL && ADMIN_PASSWORD && JWT_SECRET && same(email, ADMIN_EMAIL) && same(password, ADMIN_PASSWORD)) {
    const token = jwt.sign({ role: 'admin' }, JWT_SECRET, { algorithm: 'HS256', expiresIn: '8h' });
    return res.json({ token });
  }
  res.status(401).json({ message: 'Invalid credentials' });
});

export default router;