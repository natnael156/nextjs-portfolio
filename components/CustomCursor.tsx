"use client";

import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorOutlineRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const cursor = cursorRef.current;
    const cursorOutline = cursorOutlineRef.current;
    
    if (!cursor || !cursorOutline) return;

    const updateCursor = (e: MouseEvent) => {
      const x = e.clientX;
      const y = e.clientY;
      
      // Instant cursor movement
      cursor.style.transform = `translate(${x - 8}px, ${y - 8}px) scale(${isHovering ? 1.5 : 1})`;
      
      // Smooth outline movement
      cursorOutline.style.transform = `translate(${x - 16}px, ${y - 16}px) scale(${isHovering ? 1.8 : 1})`;
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button")
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", updateCursor);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", updateCursor);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [isHovering]);

  return (
    <>
      <div
        ref={cursorRef}
        className="fixed w-4 h-4 bg-blue-500 rounded-full pointer-events-none z-[9999] mix-blend-difference"
        style={{ transition: "transform 0s" }}
      />
      <div
        ref={cursorOutlineRef}
        className="fixed w-8 h-8 border-2 border-blue-400 rounded-full pointer-events-none z-[9999] mix-blend-difference"
        style={{ transition: "transform 0.15s ease-out" }}
      />
    </>
  );
}
