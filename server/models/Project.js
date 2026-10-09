import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  domain: { type: String, required: true, trim: true },
  label: { type: String, default: '' },
  badge: { type: String, default: '' },
  headline: { type: String, default: '' },
  description: { type: String, default: '' },
  role: { type: String, default: '' },
  metrics: { type: [String], default: [] },
  theme: { type: String, enum: ['navy', 'green', 'light', 'fintech', 'dark', 'warm'], default: 'navy' },
  url: { type: String, default: '' },
  order: { type: Number, default: 0 },
  published: { type: Boolean, default: true }
}, { timestamps: true });

export default mongoose.model('Project', projectSchema);
