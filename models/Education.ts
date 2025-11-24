import mongoose from 'mongoose';

const EducationSchema = new mongoose.Schema({
  degree: { type: String, required: true },
  institution: { type: String, required: true },
  period: { type: String, required: true },
  location: { type: String, required: true },
  description: { type: String, required: true },
  order: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Education || mongoose.model('Education', EducationSchema);
