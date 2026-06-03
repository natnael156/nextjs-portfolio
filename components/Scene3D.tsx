"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Sphere, MeshDistortMaterial } from "@react-three/drei";
import { useRef, useEffect, useState } from "react";
import * as THREE from "three";

function AnimatedSphere({ isMobile }: { isMobile: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const segments = isMobile ? 20 : 64;

  useFrame((state) => {
    if (meshRef.current) {
      const t = state.clock.getElapsedTime();
      meshRef.current.rotation.x = t * 0.15;
      meshRef.current.rotation.y = t * 0.2;
    }
  });

  return (
    <Sphere ref={meshRef} args={[1, segments, segments]} scale={isMobile ? 1.8 : 2.5}>
      <MeshDistortMaterial
        color="#3b82f6"
        attach="material"
        distort={isMobile ? 0.2 : 0.4}
        speed={isMobile ? 0.8 : 1.5}
        roughness={0.3}
        metalness={0.6}
      />
    </Sphere>
  );
}

export default function Scene3D() {
  const [isMobile, setIsMobile] = useState(false);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const mobile = window.innerWidth < 768;
    setIsMobile(mobile);
    // Skip 3D on very low-end mobile devices (2 or fewer CPU cores)
    const lowEnd = mobile && (navigator.hardwareConcurrency ?? 4) <= 2;
    if (!lowEnd) setShow(true);
  }, []);

  if (!show) return null;

  return (
    <div className="absolute inset-0 opacity-30">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        dpr={isMobile ? 1 : Math.min(window.devicePixelRatio, 2)}
        gl={{
          antialias: !isMobile,
          powerPreference: "low-power",
          alpha: true,
        }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        {!isMobile && (
          <pointLight position={[-10, -10, -5]} intensity={0.5} color="#8b5cf6" />
        )}
        <AnimatedSphere isMobile={isMobile} />
      </Canvas>
    </div>
  );
}
