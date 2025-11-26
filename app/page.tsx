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
    // Faster loading - reduced from 800ms to 300ms
    setTimeout(() => setIsLoaded(true), 300);
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        {!isLoaded && <LoadingScreen />}
      </AnimatePresence>
      
      <main className="relative min-h-screen bg-gradient-to-br from-slate-950 via-gray-900 to-slate-950 overflow-hidden" role="main">
        {/* Professional Background Effects - Optimized */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-[1]">
          {/* Subtle gradient overlay for depth */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-950/5 to-purple-950/10" />
          
          {/* Simplified animated orbs - reduced complexity */}
          <motion.div
            className="absolute top-20 left-10 w-[500px] h-[500px] bg-blue-600/15 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.15, 1],
              opacity: [0.4, 0.5, 0.4],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute bottom-20 right-20 w-[450px] h-[450px] bg-purple-600/15 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.4, 0.5, 0.4],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>
        
        <ScrollProgress />
        <Navigation />
        {isLoaded && (
          <>
            <FloatingElements />
            <ParticlesBackground />
          </>
        )}
        
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
