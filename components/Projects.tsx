"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { ExternalLink, Github } from "lucide-react";
import Image from "next/image";

// ── Default projects shown INSTANTLY before DB responds ──────────
const defaultProjects = [
  {
    _id: "default-1",
    title: "Digital Commerce Canvas",
    description: "Crafting seamless shopping experiences where every pixel tells a story",
    longDescription: "Intuitive navigation, fluid animations, and secure transactions.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop&auto=format&q=75",
    tags: ["Next.js", "TypeScript", "Stripe", "Tailwind"],
    github: "https://github.com",
    demo: "https://demo.com",
    color: "#3B82F6",
  },
  {
    _id: "default-2",
    title: "Data Symphony",
    description: "Transforming raw numbers into visual poetry through intelligent design",
    longDescription: "Charts that dance with purpose and insights that emerge like melodies.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop&auto=format&q=75",
    tags: ["React", "D3.js", "Node.js", "MongoDB"],
    github: "https://github.com",
    demo: "https://demo.com",
    color: "#A855F7",
  },
  {
    _id: "default-3",
    title: "Connection Nexus",
    description: "Building bridges through elegant interfaces and real-time magic",
    longDescription: "A digital sanctuary where conversations flow like water.",
    image: "https://images.unsplash.com/photo-1432888622747-4eb9a8f2c293?w=800&h=600&fit=crop&auto=format&q=75",
    tags: ["Next.js", "Firebase", "Framer Motion"],
    github: "https://github.com",
    demo: "https://demo.com",
    color: "#10B981",
  },
  {
    _id: "default-4",
    title: "Creative Atelier",
    description: "Empowering artists to paint their digital presence with intuitive tools",
    longDescription: "A canvas for creators where imagination meets technology.",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=600&fit=crop&auto=format&q=75",
    tags: ["React", "TypeScript", "Tailwind CSS"],
    github: "https://github.com",
    demo: "https://demo.com",
    color: "#F97316",
  },
  {
    _id: "default-5",
    title: "Workflow Harmony",
    description: "Orchestrating productivity through beautiful design and collaboration",
    longDescription: "Where chaos transforms into clarity.",
    image: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&h=600&fit=crop&auto=format&q=75",
    tags: ["Vue.js", "Node.js", "PostgreSQL"],
    github: "https://github.com",
    demo: "https://demo.com",
    color: "#6366F1",
  },
  {
    _id: "default-6",
    title: "Sky Palette",
    description: "Painting tomorrow's weather with vibrant colors and fluid animations",
    longDescription: "Nature's moods captured in pixels and gradients.",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=600&fit=crop&auto=format&q=75",
    tags: ["React Native", "API Integration", "Maps"],
    github: "https://github.com",
    demo: "https://demo.com",
    color: "#0EA5E9",
  },
];

// ── Skeleton card shown while loading ────────────────────────────
function SkeletonCard() {
  return (
    <div className="glass rounded-3xl overflow-hidden animate-pulse">
      <div className="h-48 bg-white/5" />
      <div className="p-6 space-y-3">
        <div className="h-5 bg-white/8 rounded-lg w-3/4" />
        <div className="h-3 bg-white/5 rounded-lg w-full" />
        <div className="h-3 bg-white/5 rounded-lg w-5/6" />
        <div className="flex gap-2 pt-2">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-6 w-16 bg-white/5 rounded-full" />
          ))}
        </div>
        <div className="flex gap-3 pt-2">
          <div className="h-9 w-20 bg-white/5 rounded-xl" />
          <div className="h-9 w-20 bg-white/5 rounded-xl" />
        </div>
      </div>
    </div>
  );
}

// ── Checks if a URL is safe for next/image ────────────────────────
function isSafeImageUrl(url: string): boolean {
  if (!url) return false;
  if (url.startsWith("data:image/")) return false; // base64 — skip next/image
  if (url.startsWith("/")) return true;
  try {
    const { hostname } = new URL(url);
    return ["res.cloudinary.com", "images.unsplash.com", "cdn.jsdelivr.net"].includes(hostname);
  } catch {
    return false;
  }
}

export default function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  // Start with defaults immediately — no loading flicker
  const [projects, setProjects] = useState(defaultProjects);
  const [fetching, setFetching] = useState(true);
  const [fromDB, setFromDB] = useState(false);

  useEffect(() => {
    // Use sessionStorage cache so repeated visits are instant
    const cached = sessionStorage.getItem("projects_cache");
    if (cached) {
      try {
        const { data, ts } = JSON.parse(cached);
        // Cache valid for 5 minutes
        if (Date.now() - ts < 5 * 60 * 1000 && data.length > 0) {
          setProjects(data);
          setFromDB(true);
          setFetching(false);
          return;
        }
      } catch {}
    }

    const controller = new AbortController();
    fetch("/api/projects", { signal: controller.signal })
      .then(r => r.json())
      .then(data => {
        if (data.success && data.data.length > 0) {
          setProjects(data.data);
          setFromDB(true);
          sessionStorage.setItem("projects_cache", JSON.stringify({ data: data.data, ts: Date.now() }));
        }
        setFetching(false);
      })
      .catch(err => {
        if (err.name !== "AbortError") setFetching(false);
      });

    return () => controller.abort();
  }, []);

  return (
    <section id="projects" className="relative py-32 overflow-hidden">
      <div className="container mx-auto px-6 z-10" ref={ref}>
        {/* Header */}
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

        {/* Grid — shows skeletons OR real cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {fetching && !fromDB
            ? Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)
            : projects.map((project, index) => (
                <ProjectCard
                  key={project._id || project.title}
                  project={project}
                  index={index}
                  isInView={isInView}
                />
              ))}
        </div>

        {!fetching && fromDB && (
          <div className="text-center mt-8">
            <p className="text-sm text-gray-500">
              {projects.length} {projects.length === 1 ? "project" : "projects"}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

// ── Individual card extracted for clarity ─────────────────────────
function ProjectCard({
  project,
  index,
  isInView,
}: {
  project: any;
  index: number;
  isInView: boolean;
}) {
  const [imgError, setImgError] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const useNextImage = !imgError && isSafeImageUrl(project.image);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay: Math.min(index * 0.08, 0.4) }}
      className="glass rounded-3xl overflow-hidden group cursor-pointer"
      onClick={() => setExpanded(!expanded)}
    >
      {/* Image with overlay that shows on hover/expand */}
      <div className="relative h-48 overflow-hidden bg-gray-800/60">
        {useNextImage ? (
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className={`object-cover transition-transform duration-500 ${expanded ? "scale-105" : "group-hover:scale-105"}`}
            loading={index < 3 ? "eager" : "lazy"}
            onError={() => setImgError(true)}
          />
        ) : (
          <img
            src={imgError || !project.image ? "/images/projects/default.svg" : project.image}
            alt={project.title}
            className={`w-full h-full object-cover transition-transform duration-500 ${expanded ? "scale-105" : "group-hover:scale-105"}`}
            loading={index < 3 ? "eager" : "lazy"}
            decoding="async"
            onError={() => setImgError(true)}
          />
        )}

        {/* Colour overlay */}
        <div
          className="absolute inset-0 opacity-40 pointer-events-none"
          style={{ background: `linear-gradient(135deg, ${project.color || "#3B82F6"}, transparent)` }}
        />

        {/* Tags float over the image */}
        <div className="absolute bottom-3 left-3 flex flex-wrap gap-1.5">
          {project.tags?.slice(0, 3).map((tag: string, i: number) => (
            <span key={i} className="px-2 py-0.5 bg-black/50 backdrop-blur-sm rounded-full text-xs text-white border border-white/10">
              {tag}
            </span>
          ))}
          {project.tags?.length > 3 && (
            <span className="px-2 py-0.5 bg-black/50 backdrop-blur-sm rounded-full text-xs text-white border border-white/10">
              +{project.tags.length - 3}
            </span>
          )}
        </div>

        {/* Tap hint */}
        <div className={`absolute top-3 right-3 transition-opacity duration-300 ${expanded ? "opacity-0" : "opacity-0 group-hover:opacity-100"}`}>
          <span className="px-2 py-1 bg-black/60 backdrop-blur-sm rounded-lg text-xs text-gray-300">
            tap for details
          </span>
        </div>
      </div>

      {/* Always-visible content */}
      <div className="p-5">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3 className="text-lg font-bold line-clamp-1">{project.title}</h3>
          <motion.div
            animate={{ rotate: expanded ? 180 : 0 }}
            transition={{ duration: 0.25 }}
            className="flex-shrink-0 w-6 h-6 rounded-full bg-white/8 flex items-center justify-center mt-0.5"
          >
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <path d="M2 3.5L5 6.5L8 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400" />
            </svg>
          </motion.div>
        </div>
        <p className="text-gray-400 text-sm line-clamp-2">{project.description}</p>

        {/* Expandable details */}
        <motion.div
          initial={false}
          animate={{ height: expanded ? "auto" : 0, opacity: expanded ? 1 : 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="overflow-hidden"
        >
          <div className="pt-3 space-y-3">
            {project.longDescription && (
              <p className="text-gray-500 text-xs leading-relaxed border-t border-white/5 pt-3">
                {project.longDescription}
              </p>
            )}

            {/* Links */}
            <div className="flex gap-3 pt-1" onClick={e => e.stopPropagation()}>
              <motion.a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-1.5 px-3 py-2 bg-white/5 hover:bg-white/10 rounded-xl transition-colors text-sm"
              >
                <Github size={14} />
                Code
              </motion.a>
              <motion.a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-1.5 px-3 py-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl text-sm"
              >
                <ExternalLink size={14} />
                Demo
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
