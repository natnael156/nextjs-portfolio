import mongoose from 'mongoose';

const ExperienceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  company: { type: String, required: true },
  period: { type: String, required: true },
  location: { type: String, required: true },
  description: { type: String, required: true },
  order: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Experience || mongoose.model('Experience', ExperienceSchema);
