"use client";

import { motion, useMotionValue, useTransform } from "framer-motion";
import { ArrowDown, Github, Linkedin, Mail, Sparkles } from "lucide-react";
import { TypeAnimation } from "react-type-animation";
import MagneticButton from "./MagneticButton";
import Scene3D from "./Scene3D";
import { useEffect, useState } from "react";

export default function Hero() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [profile, setProfile] = useState<any>(null);

  const rotateX = useTransform(mouseY, [-300, 300], [10, -10]);
  const rotateY = useTransform(mouseX, [-300, 300], [-10, 10]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      mouseX.set(clientX - innerWidth / 2);
      mouseY.set(clientY - innerHeight / 2);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  useEffect(() => {
    fetch('/api/profile')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setProfile(data.data);
        }
      })
      .catch(err => console.error('Error fetching profile:', err));
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <Scene3D />
      
      <motion.div 
        className="container mx-auto px-6 z-10"
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      >
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div className="flex items-center justify-center gap-2 mb-4">
              <Sparkles className="text-blue-400 animate-pulse" size={24} />
              <span className="text-blue-400 font-semibold">Available for Freelance</span>
            </motion.div>

            <motion.h1 
              className="text-6xl md:text-8xl font-bold mb-6"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <span className="gradient-text">Front-End</span>
              <br />
              <TypeAnimation
                sequence={[
                  "Developer",
                  2000,
                  "Designer",
                  2000,
                  "Creator",
                  2000,
                ]}
                wrapper="span"
                speed={50}
                className="text-white"
                repeat={Infinity}
              />
            </motion.h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-xl md:text-2xl text-gray-400 mb-12 max-w-2xl mx-auto"
          >
            Crafting exceptional digital experiences with modern web technologies
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="flex gap-6 justify-center mb-12 flex-wrap"
          >
            <MagneticButton
              href="#projects"
              className="px-8 py-4 bg-blue-600 hover:bg-blue-700 rounded-full font-semibold transition-all animate-glow relative overflow-hidden group"
            >
              <span className="relative z-10">View My Work</span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600"
                initial={{ x: "-100%" }}
                whileHover={{ x: "100%" }}
                transition={{ duration: 0.5 }}
              />
            </MagneticButton>
            <MagneticButton
              href="#contact"
              className="px-8 py-4 glass rounded-full font-semibold hover:bg-white/10 transition-all"
            >
              Get In Touch
            </MagneticButton>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="flex gap-6 justify-center"
          >
            {[
              { icon: Github, href: profile?.github || "https://github.com", external: true },
              { icon: Linkedin, href: profile?.linkedin || "https://linkedin.com", external: true },
              { icon: Mail, href: "#contact", external: false },
            ].map((social, index) => (
              <motion.a
                key={index}
                href={social.href}
                target={social.external ? "_blank" : undefined}
                rel={social.external ? "noopener noreferrer" : undefined}
                whileHover={{ scale: 1.2, rotate: 360 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="p-3 glass rounded-full hover:bg-white/10 transition-all relative group"
              >
                <social.icon size={24} />
                <motion.div
                  className="absolute inset-0 rounded-full bg-blue-500/20"
                  initial={{ scale: 0, opacity: 0 }}
                  whileHover={{ scale: 1.5, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.a>
            ))}
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
      >
        <ArrowDown className="text-gray-400" size={32} />
      </motion.div>
    </section>
  );
}
