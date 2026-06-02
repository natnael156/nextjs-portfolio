import mongoose from 'mongoose';

const PricingSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: String, required: true },
  period: { type: String, default: 'project' },
  description: { type: String, required: true },
  features: [{ type: String }],
  highlighted: { type: Boolean, default: false },
  badge: { type: String, default: '' },
  buttonText: { type: String, default: 'Get Started' },
  order: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Pricing || mongoose.model('Pricing', PricingSchema);
