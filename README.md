
# 🚀 Modern Portfolio Website

A stunning, fully-featured portfolio website built with Next.js 14, featuring 3D animations, smooth transitions, and a complete admin dashboard for content management.

## ✨ Features

### Frontend
- **Modern Tech Stack**: Built with Next.js 14, React 18, TypeScript, and Tailwind CSS
- **3D Graphics**: Interactive Three.js scenes with React Three Fiber
- **Smooth Animations**: Framer Motion for fluid page transitions and micro-interactions
- **Responsive Design**: Fully responsive across all devices and screen sizes
- **Performance Optimized**: Fast loading times with image optimization and code splitting
- **SEO Ready**: Built-in SEO optimization with metadata and sitemap generation

### Interactive Components
- **Hero Section**: Dynamic typing animation with 3D background elements
- **About Section**: Profile showcase with animated statistics
- **Skills Display**: Interactive skill cards with hover effects and detailed descriptions
- **Projects Gallery**: Showcase your work with image galleries and project details
- **Resume Timeline**: Display education and work experience in an elegant timeline
- **Contact Form**: Functional contact form with MongoDB integration

### Admin Dashboard
- **Content Management**: Edit profile, skills, projects, education, and experience
- **Image Upload**: Upload and manage profile and project images
- **Real-time Updates**: Changes reflect immediately on the frontend
- **Secure Access**: Password-protected admin panel

### Technical Features
- **MongoDB Integration**: Full database support for dynamic content
- **API Routes**: RESTful API endpoints for all CRUD operations
- **Image Optimization**: Automatic image optimization and responsive images
- **Type Safety**: Full TypeScript support for better development experience
- **Modern UI**: Glass morphism effects and gradient designs

## 🛠️ Tech Stack

### Core
- **Framework**: Next.js 16.0 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: MongoDB with Mongoose

### Libraries & Tools
- **3D Graphics**: Three.js, React Three Fiber, Drei
- **Animations**: Framer Motion, GSAP
- **Icons**: Lucide React, React Icons
- **UI Components**: Custom components with glass morphism effects
- **Type Animation**: React Type Animation
- **Intersection Observer**: React Intersection Observer

## 📦 Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd portfolio
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**

Create a `.env.local` file in the root directory:
```env
MONGODB_URI=mongodb://localhost:27017/portfolio
# Or use MongoDB Atlas
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/portfolio
```

4. **Run the development server**
```bash
npm run dev
```

5. **Open your browser**
Navigate to [http://localhost:3000](http://localhost:3000)

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Import your repository on [Vercel](https://vercel.com)
3. Add your environment variables
4. Deploy!

### Other Platforms
The app can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- AWS
- DigitalOcean



## 🎨 Customization

### Update Profile Information
1. Navigate to `/admin` in your browser
2. Enter the admin password (set in AdminSettings)
3. Edit your profile, skills, projects, education, and experience
4. Changes are saved to MongoDB and reflected immediately

### Modify Styling
- Edit `tailwind.config.ts` for theme customization
- Modify `app/globals.css` for global styles
- Update component styles in individual component files

### Add New Sections
1. Create a new component in `components/`
2. Import and add it to `app/page.tsx`
3. Create corresponding API routes if needed
4. Add database models in `models/` if storing data

## 🔒 Admin Access

The admin dashboard is protected by password authentication. To set up:

1. Access `/admin` for the first time
2. Set your admin password
3. The password is stored securely in MongoDB
4. Use this password for future admin access

## 📝 API Endpoints

- `GET /api/profile` - Fetch profile data
- `PUT /api/profile` - Update profile data
- `GET /api/skills` - Fetch all skills
- `POST /api/skills` - Add new skill
- `PUT /api/skills` - Update skill
- `DELETE /api/skills` - Delete skill
- `GET /api/projects` - Fetch all projects
- `POST /api/projects` - Add new project
- `PUT /api/projects` - Update project
- `DELETE /api/projects` - Delete project
- `GET /api/education` - Fetch education history
- `POST /api/education` - Add education entry
- `GET /api/experience` - Fetch work experience
- `POST /api/experience` - Add experience entry
- `POST /api/contact` - Submit contact form
- `POST /api/upload-image` - Upload images

## 🎯 Performance

- **Lighthouse Score**: 90+ across all metrics
- **Image Optimization**: Automatic WebP/AVIF conversion
- **Code Splitting**: Automatic route-based code splitting
- **Lazy Loading**: Components and images load on demand
- **Caching**: Optimized caching strategies

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the MIT License.

## 👤 Author

**Natnael Tefera**
- Portfolio: https://natnael-tefera.vercel.app
- GitHub: https://github.com/natnael156
- LinkedIn: https://www.linkedin.com/in/natnael-tefera156

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Vercel for hosting and deployment
- Three.js community for 3D graphics support
- Framer Motion for smooth animations

---

Made with ❤️ using Next.js, Three.js & Framer Motion
