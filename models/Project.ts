import mongoose from 'mongoose';

const ProjectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  longDescription: { type: String, required: true },
  image: { type: String, required: true },
  tags: [{ type: String }],
  github: { type: String, required: true },
  demo: { type: String, required: true },
  color: { type: String, required: true },
  stats: {
    stars: { type: Number, default: 0 },
    views: { type: String, default: '0' },
    commits: { type: Number, default: 0 },
  },
  order: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Project || mongoose.model('Project', ProjectSchema);
