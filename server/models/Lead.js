import mongoose from 'mongoose';

const leadSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true, maxlength: 100 },
  contact: { type: String, required: true, trim: true, maxlength: 150 },
  need: { type: String, enum: ['website', 'automation', 'both', 'notsure'], default: 'website' },
  message: { type: String, trim: true, maxlength: 2000, default: '' },
  status: { type: String, enum: ['new', 'contacted', 'closed'], default: 'new' }
}, { timestamps: true });

export default mongoose.model('Lead', leadSchema);
