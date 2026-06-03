"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function FloatingElements() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    // Mobile: 4 elements, tablet: 8, desktop: 15
    if (window.innerWidth < 640) setCount(4);
    else if (window.innerWidth < 1024) setCount(8);
    else setCount(15);
  }, []);

  if (count === 0) return null;

  const elements = Array.from({ length: count }, (_, i) => ({
    id: i,
    size: Math.random() * 80 + 40,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 12 + 12,
    delay: Math.random() * 5,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden opacity-20">
      {elements.map((el) => (
        <motion.div
          key={el.id}
          className="absolute rounded-full bg-gradient-to-br from-blue-500 to-purple-500 blur-3xl"
          style={{
            width: el.size,
            height: el.size,
            left: `${el.x}%`,
            top: `${el.y}%`,
            willChange: "transform",
          }}
          animate={{
            y: [0, -60, 0],
            x: [0, 30, 0],
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: el.duration,
            delay: el.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
