"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiJavascript,
  SiHtml5,
  SiCss3,
  SiTailwindcss,
  SiSass,
  SiBootstrap,
  SiMui,
  SiRedux,
  SiFramer,
  SiThreedotjs,
  SiWebpack,
  SiFigma,
  SiMysql,
  SiPhp,
  SiLaravel,
  SiNodedotjs,
  SiNpm,
  SiAdobexd,
  SiGit,
  SiGithub,
  SiVercel,
  SiNetlify,
} from "react-icons/si";
import { TbAccessible, TbDeviceMobile } from "react-icons/tb";
import { BiData } from "react-icons/bi";

// Front-end focused skills with official brand icons
const defaultSkills = [
  { 
    name: "React", 
    level: 95, 
    Icon: SiReact, 
    color: "#61DAFB",
    description: "Building dynamic, component-based UIs with hooks, context, and modern React patterns. Expert in performance optimization and state management."
  },
  { 
    name: "Next.js", 
    level: 90, 
    Icon: SiNextdotjs, 
    color: "#000000",
    description: "Full-stack React framework with SSR, SSG, API routes, and app router. Creating SEO-friendly, performant web applications."
  },
  { 
    name: "TypeScript", 
    level: 88, 
    Icon: SiTypescript, 
    color: "#3178C6",
    description: "Type-safe development with interfaces, generics, and advanced TypeScript patterns for robust, maintainable code."
  },
  { 
    name: "JavaScript", 
    level: 95, 
    Icon: SiJavascript, 
    color: "#F7DF1E",
    description: "ES6+, async/await, closures, and modern JavaScript features. Deep understanding of the language fundamentals."
  },
  { 
    name: "HTML5", 
    level: 98, 
    Icon: SiHtml5, 
    color: "#E34F26",
    description: "Semantic HTML, accessibility best practices, and modern web standards for building structured web content."
  },
  { 
    name: "CSS3", 
    level: 95, 
    Icon: SiCss3, 
    color: "#1572B6",
    description: "Advanced CSS including animations, flexbox, grid, custom properties, and responsive design techniques."
  },
  { 
    name: "Tailwind CSS", 
    level: 92, 
    Icon: SiTailwindcss, 
    color: "#06B6D4",
    description: "Utility-first CSS framework for rapid UI development with custom configurations and design systems."
  },
  { 
    name: "SASS/SCSS", 
    level: 85, 
    Icon: SiSass, 
    color: "#CC6699",
    description: "CSS preprocessor with variables, mixins, nesting, and functions for scalable stylesheets."
  },
  { 
    name: "Bootstrap", 
    level: 88, 
    Icon: SiBootstrap, 
    color: "#7952B3",
    description: "Popular CSS framework for building responsive, mobile-first websites with pre-built components."
  },
  { 
    name: "Material UI", 
    level: 82, 
    Icon: SiMui, 
    color: "#007FFF",
    description: "React component library implementing Google's Material Design with customizable themes."
  },
  { 
    name: "Redux", 
    level: 82, 
    Icon: SiRedux, 
    color: "#764ABC",
    description: "Predictable state management with Redux Toolkit, middleware, and advanced patterns for complex applications."
  },
  { 
    name: "MySQL", 
    level: 85, 
    Icon: SiMysql, 
    color: "#4479A1",
    description: "Relational database management with complex queries, optimization, and data modeling."
  },
  { 
    name: "React Query", 
    level: 78, 
    Icon: BiData, 
    color: "#FF4154",
    description: "Powerful data fetching and caching library for React with automatic background updates."
  },
  { 
    name: "Framer Motion", 
    level: 90, 
    Icon: SiFramer, 
    color: "#FF0055",
    description: "Production-ready animation library for React with gestures, variants, and smooth transitions."
  },
  { 
    name: "Three.js", 
    level: 72, 
    Icon: SiThreedotjs, 
    color: "#000000",
    description: "3D graphics library for creating immersive WebGL experiences and interactive visualizations."
  },
  { 
    name: "PHP", 
    level: 78, 
    Icon: SiPhp, 
    color: "#777BB4",
    description: "Server-side scripting for dynamic web applications and backend development."
  },
  { 
    name: "Webpack", 
    level: 76, 
    Icon: SiWebpack, 
    color: "#8DD6F9",
    description: "Module bundler for JavaScript applications with code splitting and optimization."
  },
  { 
    name: "Node.js", 
    level: 87, 
    Icon: SiNodedotjs, 
    color: "#339933",
    description: "JavaScript runtime for building scalable server-side applications and REST APIs."
  },
  { 
    name: "npm", 
    level: 92, 
    Icon: SiNpm, 
    color: "#CB3837",
    description: "Package manager for JavaScript with dependency management and script automation."
  },
  { 
    name: "Laravel", 
    level: 80, 
    Icon: SiLaravel, 
    color: "#FF2D20",
    description: "PHP framework for building elegant web applications with expressive syntax and powerful features."
  },
  { 
    name: "Figma", 
    level: 88, 
    Icon: SiFigma, 
    color: "#F24E1E",
    description: "Collaborative design tool for creating UI/UX designs, prototypes, and design systems."
  },
  { 
    name: "Adobe XD", 
    level: 80, 
    Icon: SiAdobexd, 
    color: "#FF61F6",
    description: "Vector-based design tool for creating user interfaces and interactive prototypes."
  },
  { 
    name: "Responsive Design", 
    level: 95, 
    Icon: TbDeviceMobile, 
    color: "#00D9FF",
    description: "Creating fluid layouts that adapt seamlessly across all devices and screen sizes."
  },
  { 
    name: "Web Accessibility", 
    level: 85, 
    Icon: TbAccessible, 
    color: "#00A3E0",
    description: "Building inclusive web experiences following WCAG guidelines and ARIA best practices."
  },
  { 
    name: "Git", 
    level: 90, 
    Icon: SiGit, 
    color: "#F05032",
    description: "Version control with branching strategies, rebasing, and collaborative development workflows."
  },
  { 
    name: "GitHub", 
    level: 92, 
    Icon: SiGithub, 
    color: "#181717",
    description: "Code hosting platform with CI/CD, pull requests, and project management tools."
  },
  { 
    name: "Vercel", 
    level: 88, 
    Icon: SiVercel, 
    color: "#000000",
    description: "Cloud platform for deploying and hosting modern web applications with edge functions."
  },
  { 
    name: "Netlify", 
    level: 85, 
    Icon: SiNetlify, 
    color: "#00C7B7",
    description: "Platform for deploying static sites and serverless functions with continuous deployment."
  },
];

export default function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [hoveredSkill, setHoveredSkill] = useState<number | null>(null);
  const [selectedSkill, setSelectedSkill] = useState<number | null>(null);
  const [dbSkills, setDbSkills] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/skills')
      .then(res => res.json())
      .then(data => {
        if (data.success && data.data.length > 0) {
          setDbSkills(data.data);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching skills:', err);
        setLoading(false);
      });
  }, []);

  const allSkills = [...defaultSkills, ...dbSkills];

  return (
    <section id="skills" className="relative py-32 overflow-hidden">
      {/* Animated background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.6, 0.3],
            x: [0, 50, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-1/2 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.4, 0.7, 0.4],
            x: [0, -50, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.4, 1],
            opacity: [0.3, 0.5, 0.3],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="container mx-auto px-6 z-10 relative" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={isInView ? { scale: 1, rotate: 0 } : {}}
            transition={{ duration: 0.8, type: "spring", bounce: 0.5 }}
            className="inline-block mb-6"
          >
            <div className="w-24 h-24 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-3xl flex items-center justify-center mx-auto shadow-2xl shadow-purple-500/50 relative">
              <span className="text-5xl">⚡</span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-3xl blur-xl opacity-50"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </div>
          </motion.div>
          
          <h2 className="text-5xl md:text-7xl font-bold mb-6">
            Technical <span className="gradient-text">Skills</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-4">
            A comprehensive toolkit of modern technologies and frameworks
          </p>
          <p className="text-lg text-gray-500">
            Click on any skill to learn more
          </p>
        </motion.div>

        {/* Skills Grid - No cards, just icons with glow */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-12 max-w-7xl mx-auto">
          {allSkills.map((skill, index) => (
            <motion.div
              key={skill._id || skill.name}
              initial={{ opacity: 0, scale: 0, rotate: -180 }}
              animate={isInView ? { opacity: 1, scale: 1, rotate: 0 } : {}}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.03,
                type: "spring",
                stiffness: 200,
                damping: 15
              }}
              onHoverStart={() => setHoveredSkill(index)}
              onHoverEnd={() => setHoveredSkill(null)}
              onClick={() => setSelectedSkill(selectedSkill === index ? null : index)}
              className="relative group flex flex-col items-center cursor-pointer"
            >
              {/* Glow effect */}
              <motion.div
                className="absolute inset-0 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: `radial-gradient(circle, ${skill.color || '#3B82F6'}50, transparent)`,
                  width: '150%',
                  height: '150%',
                  left: '-25%',
                  top: '-25%',
                }}
                animate={hoveredSkill === index ? {
                  scale: [1, 1.4, 1],
                } : {}}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />

              {/* Icon */}
              <motion.div
                whileHover={{ 
                  scale: 1.4, 
                  rotate: 360,
                  y: -15,
                }}
                transition={{ 
                  type: "spring", 
                  stiffness: 300,
                  damping: 10
                }}
                className="relative z-10 w-28 h-28 flex items-center justify-center cursor-pointer"
                style={{
                  filter: hoveredSkill === index ? `drop-shadow(0 0 30px ${skill.color || '#3B82F6'})` : 'none',
                }}
              >
                <motion.div
                  animate={hoveredSkill === index ? {
                    rotate: [0, 10, -10, 0],
                  } : {}}
                  transition={{
                    duration: 0.5,
                    repeat: hoveredSkill === index ? Infinity : 0,
                  }}
                >
                  {skill.Icon ? (
                    <skill.Icon 
                      size={80} 
                      style={{ color: skill.color }}
                    />
                  ) : (
                    <span className="text-6xl" style={{ color: skill.color }}>
                      {skill.icon || skill.name.charAt(0)}
                    </span>
                  )}
                </motion.div>
              </motion.div>

              {/* Name - appears on hover */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ 
                  opacity: hoveredSkill === index || selectedSkill === index ? 1 : 0,
                  y: hoveredSkill === index || selectedSkill === index ? 0 : 10,
                }}
                transition={{ duration: 0.2 }}
                className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 whitespace-nowrap z-20"
              >
                <div className="glass px-4 py-2 rounded-xl shadow-xl">
                  <p className="text-base font-bold">{skill.name}</p>
                </div>
              </motion.div>

              {/* Particle effect on hover */}
              {hoveredSkill === index && (
                <>
                  {[...Array(8)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-2 h-2 rounded-full"
                      style={{
                        background: skill.color || '#3B82F6',
                      }}
                      initial={{ 
                        x: 0, 
                        y: 0, 
                        opacity: 1,
                        scale: 1,
                      }}
                      animate={{
                        x: Math.cos((i * Math.PI * 2) / 8) * 70,
                        y: Math.sin((i * Math.PI * 2) / 8) * 70,
                        opacity: 0,
                        scale: 0,
                      }}
                      transition={{
                        duration: 1.2,
                        repeat: Infinity,
                        ease: "easeOut",
                      }}
                    />
                  ))}
                </>
              )}
            </motion.div>
          ))}
        </div>

        {/* Description Modal - appears when skill is clicked */}
        {selectedSkill !== null && allSkills[selectedSkill] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedSkill(null)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-6"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 50 }}
              transition={{ type: "spring", damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              className="glass p-8 rounded-3xl max-w-2xl w-full relative overflow-hidden"
            >
              {/* Background glow */}
              <div
                className="absolute inset-0 opacity-10 blur-3xl"
                style={{
                  background: `radial-gradient(circle at center, ${allSkills[selectedSkill].color}, transparent)`,
                }}
              />

              {/* Close button */}
              <button
                onClick={() => setSelectedSkill(null)}
                className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center glass rounded-full hover:bg-white/10 transition-colors z-10"
              >
                ✕
              </button>

              {/* Content */}
              <div className="relative z-10">
                <div className="flex items-center gap-6 mb-6">
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="w-24 h-24 rounded-3xl flex items-center justify-center shadow-2xl"
                    style={{ 
                      backgroundColor: allSkills[selectedSkill].color + '20',
                      boxShadow: `0 0 40px ${allSkills[selectedSkill].color}80`
                    }}
                  >
                    {(() => {
                      const SkillIcon = allSkills[selectedSkill].Icon;
                      return SkillIcon ? (
                        <SkillIcon 
                          size={60} 
                          style={{ color: allSkills[selectedSkill].color }}
                        />
                      ) : (
                        <span className="text-6xl" style={{ color: allSkills[selectedSkill].color }}>
                          {allSkills[selectedSkill].icon || allSkills[selectedSkill].name.charAt(0)}
                        </span>
                      );
                    })()}
                  </motion.div>
                  <div className="flex-1">
                    <h3 className="text-4xl font-bold mb-2">{allSkills[selectedSkill].name}</h3>
                  </div>
                </div>

                <p className="text-lg text-gray-300 leading-relaxed">
                  {allSkills[selectedSkill].description || "No description available."}
                </p>

                <div className="mt-6 pt-6 border-t border-gray-700">
                  <p className="text-sm text-gray-400 text-center">
                    Click anywhere outside to close
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}

      </div>
    </section>
  );
}
