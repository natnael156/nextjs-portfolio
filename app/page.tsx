"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Resume from "@/components/Resume";
import Contact from "@/components/Contact";
import Navigation from "@/components/Navigation";
import ParticlesBackground from "@/components/ParticlesBackground";

import ScrollProgress from "@/components/ScrollProgress";
import FloatingElements from "@/components/FloatingElements";
import LoadingScreen from "@/components/LoadingScreen";

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsLoaded(true), 800);
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        {!isLoaded && <LoadingScreen />}
      </AnimatePresence>
      
      <main className="relative min-h-screen bg-gradient-to-br from-slate-950 via-gray-900 to-slate-950 overflow-hidden" role="main">
        {/* Professional Background Effects */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-[1]">
          {/* Subtle gradient overlay for depth */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-950/5 to-purple-950/10" />
          
          {/* Refined animated orbs */}
          <motion.div
            className="absolute top-20 left-10 w-[500px] h-[500px] bg-blue-600/15 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.4, 0.6, 0.4],
              x: [0, 30, 0],
              y: [0, 20, 0],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute top-1/3 right-20 w-[450px] h-[450px] bg-indigo-600/15 rounded-full blur-3xl"
            animate={{
              scale: [1.1, 1, 1.1],
              opacity: [0.5, 0.7, 0.5],
              x: [0, -30, 0],
              y: [0, 40, 0],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute bottom-40 left-1/4 w-[400px] h-[400px] bg-purple-600/15 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.4, 0.6, 0.4],
              x: [0, 40, 0],
              y: [0, -30, 0],
            }}
            transition={{
              duration: 14,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute bottom-20 right-1/3 w-[350px] h-[350px] bg-blue-500/15 rounded-full blur-3xl"
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.6, 0.4, 0.6],
              x: [0, -40, 0],
              y: [0, 30, 0],
            }}
            transition={{
              duration: 11,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>
        
        <ScrollProgress />
        <FloatingElements />
        <ParticlesBackground />
        <Navigation />
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoaded ? 1 : 0 }}
          transition={{ duration: 0.5 }}
          className="relative z-10"
        >
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Resume />
          <Contact />
        </motion.div>

        {/* Footer */}
        <footer className="relative z-10 border-t border-gray-800 py-8">
          <div className="container mx-auto px-6 text-center text-gray-400">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              &copy; 2025 Natnael Tefera. Crafted with Next.js, Three.js & Framer Motion
            </motion.p>
          </div>
        </footer>
      </main>
    </>
  );
}
