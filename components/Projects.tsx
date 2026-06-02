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

// ── Tech tag colours ─────────────────────────────────────────────
const tagColors: Record<string, { bg: string; text: string; dot: string }> = {
  "react":        { bg: "bg-cyan-500/10",    text: "text-cyan-300",   dot: "bg-cyan-400" },
  "next.js":      { bg: "bg-white/10",       text: "text-white",      dot: "bg-white" },
  "nextjs":       { bg: "bg-white/10",       text: "text-white",      dot: "bg-white" },
  "typescript":   { bg: "bg-blue-500/10",    text: "text-blue-300",   dot: "bg-blue-400" },
  "javascript":   { bg: "bg-yellow-500/10",  text: "text-yellow-300", dot: "bg-yellow-400" },
  "tailwind":     { bg: "bg-teal-500/10",    text: "text-teal-300",   dot: "bg-teal-400" },
  "tailwind css": { bg: "bg-teal-500/10",    text: "text-teal-300",   dot: "bg-teal-400" },
  "node.js":      { bg: "bg-green-500/10",   text: "text-green-300",  dot: "bg-green-400" },
  "python":       { bg: "bg-blue-400/10",    text: "text-blue-200",   dot: "bg-blue-300" },
  "mongodb":      { bg: "bg-green-600/10",   text: "text-green-400",  dot: "bg-green-500" },
  "postgresql":   { bg: "bg-indigo-500/10",  text: "text-indigo-300", dot: "bg-indigo-400" },
  "firebase":     { bg: "bg-orange-500/10",  text: "text-orange-300", dot: "bg-orange-400" },
  "stripe":       { bg: "bg-purple-500/10",  text: "text-purple-300", dot: "bg-purple-400" },
  "vue.js":       { bg: "bg-emerald-500/10", text: "text-emerald-300",dot: "bg-emerald-400" },
  "graphql":      { bg: "bg-pink-500/10",    text: "text-pink-300",   dot: "bg-pink-400" },
  "docker":       { bg: "bg-sky-500/10",     text: "text-sky-300",    dot: "bg-sky-400" },
  "d3.js":        { bg: "bg-orange-400/10",  text: "text-orange-200", dot: "bg-orange-300" },
  "framer motion":{ bg: "bg-violet-500/10",  text: "text-violet-300", dot: "bg-violet-400" },
  "react native": { bg: "bg-cyan-600/10",    text: "text-cyan-400",   dot: "bg-cyan-500" },
  "sass":         { bg: "bg-pink-600/10",    text: "text-pink-400",   dot: "bg-pink-500" },
  "redis":        { bg: "bg-red-500/10",     text: "text-red-300",    dot: "bg-red-400" },
  "aws":          { bg: "bg-yellow-600/10",  text: "text-yellow-400", dot: "bg-yellow-500" },
};

function getTagStyle(tag: string) {
  const key = tag.toLowerCase();
  return tagColors[key] || { bg: "bg-white/5", text: "text-gray-300", dot: "bg-gray-500" };
}

// ── Individual card ───────────────────────────────────────────────
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
  const accent = project.color || "#3B82F6";

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay: Math.min(index * 0.08, 0.4) }}
      onClick={() => setExpanded(!expanded)}
      className="group cursor-pointer rounded-3xl overflow-hidden relative"
      style={{
        background: "rgba(255,255,255,0.03)",
        backdropFilter: "blur(12px)",
        border: expanded
          ? `1px solid ${accent}55`
          : "1px solid rgba(255,255,255,0.07)",
        boxShadow: expanded
          ? `0 0 40px ${accent}22, 0 8px 32px rgba(0,0,0,0.4)`
          : "0 8px 32px rgba(0,0,0,0.3)",
        transition: "border 0.3s, box-shadow 0.3s",
      }}
    >
      {/* ── Image ───────────────────────────────────────────── */}
      <div className="relative h-52 overflow-hidden bg-gray-900">
        {useNextImage ? (
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className={`object-cover transition-transform duration-700 ${
              expanded ? "scale-110" : "group-hover:scale-105"
            }`}
            loading={index < 3 ? "eager" : "lazy"}
            onError={() => setImgError(true)}
          />
        ) : (
          <img
            src={imgError || !project.image ? "/images/projects/default.svg" : project.image}
            alt={project.title}
            className={`w-full h-full object-cover transition-transform duration-700 ${
              expanded ? "scale-110" : "group-hover:scale-105"
            }`}
            loading={index < 3 ? "eager" : "lazy"}
            decoding="async"
            onError={() => setImgError(true)}
          />
        )}

        {/* Bottom gradient fade */}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-transparent to-transparent opacity-80" />

        {/* Accent colour tint */}
        <div
          className="absolute inset-0 opacity-30 mix-blend-color"
          style={{ background: `radial-gradient(circle at 30% 70%, ${accent}, transparent 70%)` }}
        />

        {/* Index number badge */}
        <div className="absolute top-3 left-3">
          <span
            className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-black text-white shadow-lg"
            style={{ background: accent }}
          >
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        {/* Expand hint */}
        <motion.div
          animate={{ opacity: expanded ? 0 : 1 }}
          className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
        >
          <span className="px-2.5 py-1 bg-black/60 backdrop-blur-md rounded-lg text-xs text-gray-300 border border-white/10">
            tap to expand
          </span>
        </motion.div>
      </div>

      {/* ── Body ────────────────────────────────────────────── */}
      <div className="p-5">
        {/* Title row */}
        <div className="flex items-center justify-between gap-2 mb-2">
          <h3 className="text-lg font-bold text-white leading-tight">{project.title}</h3>
          <motion.div
            animate={{ rotate: expanded ? 45 : 0 }}
            transition={{ duration: 0.25 }}
            className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center border border-white/10 bg-white/5"
            style={{ borderColor: expanded ? `${accent}66` : undefined }}
          >
            <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
              <path d="M5.5 1v9M1 5.5h9" stroke={expanded ? accent : "#9ca3af"} strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </motion.div>
        </div>

        {/* Short description — always visible */}
        <p className="text-gray-400 text-sm leading-relaxed line-clamp-2 mb-3">
          {project.description}
        </p>

        {/* ── Tech tags — ALL shown with colour coding ────── */}
        <div className="flex flex-wrap gap-1.5 mb-1">
          {project.tags?.map((tag: string, i: number) => {
            const style = getTagStyle(tag);
            return (
              <span
                key={i}
                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${style.bg} ${style.text} border border-white/5`}
              >
                <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${style.dot}`} />
                {tag}
              </span>
            );
          })}
        </div>

        {/* ── Expandable section ──────────────────────────── */}
        <motion.div
          initial={false}
          animate={{ height: expanded ? "auto" : 0, opacity: expanded ? 1 : 0 }}
          transition={{ duration: 0.35, ease: "easeInOut" }}
          className="overflow-hidden"
        >
          <div className="pt-4 space-y-4">
            {/* Divider */}
            <div className="h-px w-full" style={{ background: `linear-gradient(90deg, ${accent}44, transparent)` }} />

            {/* Long description */}
            {project.longDescription && (
              <p className="text-gray-400 text-sm leading-relaxed">
                {project.longDescription}
              </p>
            )}

            {/* Action buttons */}
            <div className="flex gap-3" onClick={e => e.stopPropagation()}>
              <motion.a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05, y: -1 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-4 py-2.5 bg-white/6 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-xl text-sm text-gray-200 font-medium transition-all"
              >
                <Github size={15} />
                View Code
              </motion.a>
              <motion.a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05, y: -1 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white shadow-lg transition-all"
                style={{
                  background: `linear-gradient(135deg, ${accent}, ${accent}99)`,
                  boxShadow: `0 4px 15px ${accent}33`,
                }}
              >
                <ExternalLink size={15} />
                Live Demo
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
