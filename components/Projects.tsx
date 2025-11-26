"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { ExternalLink, Github } from "lucide-react";
import { getOptimizedImageUrl } from "@/lib/imageOptimization";

// Default hardcoded projects
const defaultProjects = [
  {
    title: "Digital Commerce Canvas",
    description: "Crafting seamless shopping experiences where every pixel tells a story of elegance and functionality",
    longDescription: "A masterpiece of user experience design, weaving together intuitive navigation, fluid animations, and secure transactions.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
    tags: ["Next.js", "TypeScript", "Stripe", "Tailwind"],
    github: "https://github.com",
    demo: "https://demo.com",
    color: "#3B82F6",
  },
  {
    title: "Data Symphony",
    description: "Transforming raw numbers into visual poetry through intelligent design and motion",
    longDescription: "An orchestration of data visualization where charts dance with purpose and insights emerge like melodies.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
    tags: ["React", "D3.js", "Node.js", "MongoDB"],
    github: "https://github.com",
    demo: "https://demo.com",
    color: "#A855F7",
  },
  {
    title: "Connection Nexus",
    description: "Building bridges between souls through elegant interfaces and real-time magic",
    longDescription: "A digital sanctuary where conversations flow like water and connections bloom naturally.",
    image: "https://images.unsplash.com/photo-1432888622747-4eb9a8f2c293?w=800&h=600&fit=crop",
    tags: ["Next.js", "Firebase", "Framer Motion"],
    github: "https://github.com",
    demo: "https://demo.com",
    color: "#10B981",
  },
  {
    title: "Creative Atelier",
    description: "Empowering artists to paint their digital presence with intuitive tools and boundless creativity",
    longDescription: "A canvas for creators where imagination meets technology. Drag, drop, and design with freedom.",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=600&fit=crop",
    tags: ["React", "TypeScript", "Tailwind CSS"],
    github: "https://github.com",
    demo: "https://demo.com",
    color: "#F97316",
  },
  {
    title: "Workflow Harmony",
    description: "Orchestrating productivity through beautiful design and seamless collaboration",
    longDescription: "Where chaos transforms into clarity. Tasks flow across boards like notes in a symphony.",
    image: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&h=600&fit=crop",
    tags: ["Vue.js", "Node.js", "PostgreSQL"],
    github: "https://github.com",
    demo: "https://demo.com",
    color: "#6366F1",
  },
  {
    title: "Sky Palette",
    description: "Painting tomorrow's weather with vibrant colors and fluid animations",
    longDescription: "Nature's moods captured in pixels and gradients. Watch clouds drift across your screen.",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=600&fit=crop",
    tags: ["React Native", "API Integration", "Maps"],
    github: "https://github.com",
    demo: "https://demo.com",
    color: "#0EA5E9",
  },
];

export default function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [dbProjects, setDbProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch projects from database
  useEffect(() => {
    fetch('/api/projects')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setDbProjects(data.data);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching projects:', err);
        setLoading(false);
      });
  }, []);

  // Use only database projects
  const allProjects = dbProjects;

  return (
    <section id="projects" className="relative py-32 overflow-hidden">
      <div className="container mx-auto px-6 z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Showcasing my best work and creative solutions
          </p>
        </motion.div>

        {loading && (
          <div className="text-center mb-8">
            <p className="text-gray-400">Loading projects...</p>
          </div>
        )}

        {!loading && allProjects.length === 0 && (
          <div className="text-center py-20">
            <p className="text-2xl text-gray-400">No projects added yet.</p>
            <p className="text-gray-500 mt-2">Add your first project from the admin panel!</p>
          </div>
        )}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {allProjects.map((project, index) => (
            <motion.div
              key={project._id || project.title}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="glass rounded-3xl overflow-hidden group"
            >
              {/* Project Image */}
              <div className="relative h-64 overflow-hidden bg-gray-800">
                <img
                  src={project.image?.startsWith('/images/') 
                    ? project.image 
                    : getOptimizedImageUrl(
                        project.image || '/images/projects/default.svg',
                        800,
                        75
                      )
                  }
                  alt={project.title}
                  width={800}
                  height={600}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "/images/projects/default.svg";
                  }}
                />
                <div 
                  className="absolute inset-0 opacity-50"
                  style={{
                    background: `linear-gradient(135deg, ${project.color || '#3B82F6'}, transparent)`
                  }}
                />
              </div>

              {/* Project Content */}
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-3">{project.title}</h3>
                <p className="text-gray-400 mb-2">{project.description}</p>
                {project.longDescription && (
                  <p className="text-gray-500 text-sm mb-4 leading-relaxed">
                    {project.longDescription}
                  </p>
                )}

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags?.map((tag: string, i: number) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-white/5 rounded-full text-sm text-gray-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex gap-4">
                  <motion.a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 rounded-xl transition-colors"
                  >
                    <Github size={18} />
                    <span>Code</span>
                  </motion.a>
                  <motion.a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl"
                  >
                    <ExternalLink size={18} />
                    <span>Demo</span>
                  </motion.a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {allProjects.length > 0 && (
          <div className="text-center mt-8">
            <p className="text-sm text-gray-500">
              {allProjects.length} {allProjects.length === 1 ? 'project' : 'projects'}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
