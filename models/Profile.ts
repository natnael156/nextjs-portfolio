import mongoose from 'mongoose';

const ProfileSchema = new mongoose.Schema({
  name: { type: String, required: true },
  title: { type: String, required: true },
  bio: { type: String, required: true },
  location: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  image: { type: String, default: '/profile.jpg' },
  github: { type: String, default: 'https://github.com' },
  linkedin: { type: String, default: 'https://linkedin.com' },
  // Hero section
  heroTitle: { type: String, default: 'Front-End' },
  heroSubtitle: { type: String, default: 'Crafting exceptional digital experiences with modern web technologies' },
  heroAnimatedTexts: { type: [String], default: ['Developer', 'Designer', 'Creator'] },
  availabilityText: { type: String, default: 'Available for Freelance' },
  // About section stats
  yearsExperience: { type: Number, default: 5 },
  projectsCompleted: { type: Number, default: 50 },
  happyClients: { type: Number, default: 30 },
  // About section text
  aboutDescription: { type: String, default: 'I specialize in transforming complex problems into elegant, intuitive solutions. With a keen eye for design and a deep understanding of modern web technologies, I craft digital experiences that not only look beautiful but perform flawlessly. When I\'m not coding, you\'ll find me exploring new technologies, contributing to open-source projects, or sharing knowledge with the developer community.' },
  availableForWork: { type: Boolean, default: true },
  updatedAt: { type: Date, default: Date.now },
});

export default mongoose.models.Profile || mongoose.model('Profile', ProfileSchema);
