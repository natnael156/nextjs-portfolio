import mongoose from 'mongoose';

const CertificationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  issuer: { type: String },
  year: { type: String },
  order: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Certification || mongoose.model('Certification', CertificationSchema);
