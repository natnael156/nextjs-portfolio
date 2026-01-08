"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Code2, Rocket, Zap } from "lucide-react";
import { useProfile } from "@/lib/ProfileContext";

const features = [
  {
    icon: Code2,
    title: "Clean Code",
    description: "Writing maintainable, scalable, and efficient code following best practices",
  },
  {
    icon: Rocket,
    title: "Performance",
    description: "Optimizing applications for speed and seamless user experiences",
  },
  {
    icon: Zap,
    title: "Innovation",
    description: "Staying ahead with cutting-edge technologies and modern frameworks",
  },
];

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { profile } = useProfile();

  return (
    <section id="about" className="relative py-32 overflow-hidden">
      <div className="container mx-auto px-6 z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-6xl md:text-8xl font-bold mb-6">
            About <span className="gradient-text">Me</span>
          </h2>
        </motion.div>

        {/* Profile Section with Image */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20 max-w-6xl mx-auto">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative flex justify-center lg:justify-end"
          >
            {/* Main image container with enhanced styling */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="relative rounded-3xl overflow-hidden shadow-2xl max-w-lg mx-auto"
              style={{
                boxShadow: "0 25px 50px -12px rgba(59, 130, 246, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.05)",
              }}
            >
              <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-gray-800 via-gray-900 to-black aspect-square">
                {profile?.image && (
                  <motion.img
                    src={profile.image}
                    alt="Profile"
                    width={600}
                    height={600}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                    }}
                  />
                )}
                
                {/* Enhanced gradient overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-blue-600/20 via-transparent to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-purple-600/15" />
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-transparent to-cyan-500/10" />
                
                {/* Professional border effect */}
                <div className="absolute inset-0 rounded-3xl border border-white/10" />
                
                {/* Subtle shine effect on hover */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0"
                  whileHover={{ 
                    opacity: 1,
                    x: ["-100%", "200%"],
                  }}
                  transition={{ 
                    opacity: { duration: 0.3 },
                    x: { duration: 1.2, ease: "easeInOut" }
                  }}
                />
              </div>
            </motion.div>

            {/* Enhanced decorative elements */}
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.1, 0.3, 0.1],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 12,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute -top-20 -left-20 w-64 h-64 bg-gradient-to-br from-blue-500/30 to-cyan-500/20 rounded-full blur-3xl"
            />
            <motion.div
              animate={{
                scale: [1.1, 1, 1.1],
                opacity: [0.2, 0.4, 0.2],
                rotate: [360, 180, 0],
              }}
              transition={{
                duration: 15,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute -bottom-20 -right-20 w-64 h-64 bg-gradient-to-br from-purple-500/30 to-pink-500/20 rounded-full blur-3xl"
            />
            
            {/* Professional floating elements */}
            <motion.div
              animate={{
                y: [0, -15, 0],
                opacity: [0.4, 0.8, 0.4],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute top-16 right-12 w-6 h-6 bg-blue-400/60 rounded-full blur-sm shadow-lg"
            />
            <motion.div
              animate={{
                y: [0, 15, 0],
                opacity: [0.3, 0.7, 0.3],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1.5,
              }}
              className="absolute bottom-24 left-16 w-4 h-4 bg-purple-400/60 rounded-full blur-sm shadow-lg"
            />
            <motion.div
              animate={{
                y: [0, -10, 0],
                x: [0, 5, 0],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 3,
              }}
              className="absolute top-32 left-8 w-3 h-3 bg-cyan-400/70 rounded-full blur-sm shadow-lg"
            />

            {/* Professional corner accents */}
            <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-blue-400/50 rounded-tl-lg"></div>
            <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-purple-400/50 rounded-tr-lg"></div>
            <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-cyan-400/50 rounded-bl-lg"></div>
            <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-pink-400/50 rounded-br-lg"></div>
            
            {/* Additional floating particles */}
            <motion.div
              animate={{
                y: [0, -20, 0],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute top-10 right-10 w-4 h-4 bg-blue-400 rounded-full blur-sm"
            />
            <motion.div
              animate={{
                y: [0, 20, 0],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1,
              }}
              className="absolute bottom-20 left-10 w-3 h-3 bg-purple-400 rounded-full blur-sm"
            />
          </motion.div>

          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="space-y-8 flex flex-col justify-center"
          >
            <motion.h3 
              initial={{ opacity: 0, scale: 0.5 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5 }}
              className="text-3xl md:text-4xl font-bold leading-tight text-left"
            >
              Hi, I&apos;m <span className="gradient-text">{profile?.name}</span>
            </motion.h3>
            
            {profile?.aboutDescription && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="space-y-6"
              >
                <div 
                  className="text-xl text-gray-300 leading-relaxed text-left"
                  dangerouslySetInnerHTML={{ 
                    __html: profile.aboutDescription
                      .split('\n')
                      .filter(paragraph => paragraph.trim())
                      .map(paragraph => `<p class="mb-6 text-xl text-gray-300 leading-relaxed">${paragraph.trim()}</p>`)
                      .join('')
                  }} 
                />
              </motion.div>
            )}

            {/* Stats */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.9, duration: 0.8 }}
              className="grid grid-cols-3 gap-6 pt-8"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="text-center"
              >
                <p className="text-4xl font-bold gradient-text">{profile?.yearsExperience}+</p>
                <p className="text-gray-400 text-sm mt-1">Years Experience</p>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="text-center"
              >
                <p className="text-4xl font-bold gradient-text">{profile?.projectsCompleted}+</p>
                <p className="text-gray-400 text-sm mt-1">Projects Completed</p>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="text-center"
              >
                <p className="text-4xl font-bold gradient-text">{profile?.happyClients}+</p>
                <p className="text-gray-400 text-sm mt-1">Happy Clients</p>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        {/* Features Grid */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="grid md:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.6 + index * 0.2 }}
              whileHover={{ scale: 1.05, y: -10 }}
              className="glass p-8 rounded-2xl hover:bg-white/10 transition-all relative overflow-hidden group"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              />
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
                className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mb-6 relative z-10"
              >
                <feature.icon className="text-white" size={32} />
              </motion.div>
              <h3 className="text-2xl font-bold mb-4 relative z-10">{feature.title}</h3>
              <p className="text-gray-400 relative z-10">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
