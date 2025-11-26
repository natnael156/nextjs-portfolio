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
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
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
            className="relative"
          >
            {/* Main image container with enhanced styling */}
            <motion.div
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.3 }}
              className="relative rounded-3xl overflow-hidden shadow-2xl"
              style={{
                boxShadow: "0 25px 50px -12px rgba(59, 130, 246, 0.25)",
              }}
            >
              <div className="relative rounded-3xl overflow-hidden bg-gray-800 aspect-square">
                <motion.img
                  src={profile?.image || "/images/profile/default.svg"}
                  alt="Profile"
                  width={600}
                  height={600}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "/images/profile/default.svg";
                  }}
                />
                
                {/* Multi-layer gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-blue-600/30 via-purple-600/10 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-purple-600/20" />
                
                {/* Shine effect on hover */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "200%" }}
                  transition={{ duration: 0.8 }}
                />
              </div>
            </motion.div>

            {/* Enhanced decorative elements */}
            <motion.div
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.2, 0.4, 0.2],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute -top-16 -left-16 w-48 h-48 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full blur-3xl"
            />
            <motion.div
              animate={{
                scale: [1.2, 1, 1.2],
                opacity: [0.3, 0.5, 0.3],
                rotate: [360, 180, 0],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute -bottom-16 -right-16 w-48 h-48 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full blur-3xl"
            />
            
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
            className="space-y-6"
          >
            <h3 className="text-3xl md:text-4xl font-bold">
              Hi, I&apos;m <span className="gradient-text">{profile?.name || 'Your Name'}</span>
            </h3>
            <p className="text-xl text-gray-300 leading-relaxed">
              A passionate <span className="text-blue-400 font-semibold">{profile?.title || 'Front-End Developer'}</span> with 
              expertise in building modern, responsive web applications that deliver exceptional user experiences.
            </p>
            <p className="text-lg text-gray-400 leading-relaxed whitespace-pre-line">
              {profile?.aboutDescription || profile?.bio || 'I specialize in transforming complex problems into elegant, intuitive solutions. With a keen eye for design and a deep understanding of modern web technologies, I craft digital experiences that not only look beautiful but perform flawlessly. When I\'m not coding, you\'ll find me exploring new technologies, contributing to open-source projects, or sharing knowledge with the developer community.'}
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-6">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="text-center"
              >
                <p className="text-4xl font-bold gradient-text">{profile?.yearsExperience || 5}+</p>
                <p className="text-gray-400 text-sm mt-1">Years Experience</p>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="text-center"
              >
                <p className="text-4xl font-bold gradient-text">{profile?.projectsCompleted || 50}+</p>
                <p className="text-gray-400 text-sm mt-1">Projects Completed</p>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="text-center"
              >
                <p className="text-4xl font-bold gradient-text">{profile?.happyClients || 30}+</p>
                <p className="text-gray-400 text-sm mt-1">Happy Clients</p>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
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
        </div>
      </div>
    </section>
  );
}
