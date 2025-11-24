import mongoose from 'mongoose';

const AdminSettingsSchema = new mongoose.Schema({
  password: { type: String, required: true },
  updatedAt: { type: Date, default: Date.now },
});

export default mongoose.models.AdminSettings || mongoose.model('AdminSettings', AdminSettingsSchema);
