"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { Sparkles, RotateCw, Layers, Compass, Volume2, VolumeX } from "lucide-react";
import { playHoverSound, playClickSound, playWarpSound, toggleSound, isSoundEnabled } from "../lib/audio";

type VisualMode = "quantum" | "particles" | "shield";

export default function Astra3DHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<VisualMode>("quantum");
  const [soundOn, setSoundOn] = useState<boolean>(true);
  const [fps, setFps] = useState<number>(60);
  const [isInteracting, setIsInteracting] = useState<boolean>(false);

  useEffect(() => {
    setSoundOn(isSoundEnabled());
  }, []);

  const handleToggleSound = () => {
    const next = toggleSound();
    setSoundOn(next);
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // --- Scene Setup ---
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 5.2;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // --- Central 3D Group ---
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // 1. Outer Wireframe Icosahedron
    const icoGeometry = new THREE.IcosahedronGeometry(1.6, 1);
    const icoMaterial = new THREE.MeshBasicMaterial({
      color: 0x06b6d4,
      wireframe: true,
      transparent: true,
      opacity: 0.45,
    });
    const icoMesh = new THREE.Mesh(icoGeometry, icoMaterial);
    mainGroup.add(icoMesh);

    // 2. Inner Glowing Core
    const coreGeometry = new THREE.IcosahedronGeometry(0.9, 2);
    const coreMaterial = new THREE.MeshBasicMaterial({
      color: 0x818cf8,
      wireframe: true,
      transparent: true,
      opacity: 0.8,
    });
    const coreMesh = new THREE.Mesh(coreGeometry, coreMaterial);
    mainGroup.add(coreMesh);

    // 3. Central Solid Energy Node
    const nodeGeometry = new THREE.SphereGeometry(0.35, 16, 16);
    const nodeMaterial = new THREE.MeshBasicMaterial({
      color: 0x22d3ee,
    });
    const nodeMesh = new THREE.Mesh(nodeGeometry, nodeMaterial);
    mainGroup.add(nodeMesh);

    // 4. Orbital Rings (Cyber Gyroscope)
    const ringGeometry = new THREE.TorusGeometry(2.1, 0.02, 16, 100);
    const ringMaterial = new THREE.MeshBasicMaterial({
      color: 0xa855f7,
      transparent: true,
      opacity: 0.6,
    });
    const ring1 = new THREE.Mesh(ringGeometry, ringMaterial);
    ring1.rotation.x = Math.PI / 3;
    mainGroup.add(ring1);

    const ring2 = new THREE.Mesh(ringGeometry, ringMaterial.clone());
    ring2.rotation.y = Math.PI / 3;
    mainGroup.add(ring2);

    // 5. Cloud of Particles (Astra Stars)
    const particleCount = 700;
    const particleGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const color1 = new THREE.Color(0x06b6d4); // cyan
    const color2 = new THREE.Color(0xa855f7); // purple
    const color3 = new THREE.Color(0x3b82f6); // blue

    for (let i = 0; i < particleCount; i++) {
      const radius = 2.2 + Math.random() * 2.2;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);

      const mixed = i % 3 === 0 ? color1 : i % 3 === 1 ? color2 : color3;
      colors[i * 3] = mixed.r;
      colors[i * 3 + 1] = mixed.g;
      colors[i * 3 + 2] = mixed.b;
    }

    particleGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    particleGeometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const particleMaterial = new THREE.PointsMaterial({
      size: 0.045,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
    });
    const particles = new THREE.Points(particleGeometry, particleMaterial);
    mainGroup.add(particles);

    // --- Interactive Drag Controls ---
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };
    let targetRotationX = 0;
    let targetRotationY = 0;

    const onPointerDown = (e: PointerEvent) => {
      isDragging = true;
      setIsInteracting(true);
      playClickSound();
      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const onPointerMove = (e: PointerEvent) => {
      if (isDragging) {
        const deltaX = e.clientX - previousMousePosition.x;
        const deltaY = e.clientY - previousMousePosition.y;

        targetRotationY += deltaX * 0.008;
        targetRotationX += deltaY * 0.008;

        previousMousePosition = { x: e.clientX, y: e.clientY };
      }
    };

    const onPointerUp = () => {
      isDragging = false;
      setIsInteracting(false);
    };

    const domElement = renderer.domElement;
    domElement.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);

    // --- Responsive Resize ---
    const handleResize = () => {
      if (!container) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener("resize", handleResize);

    // --- Animation Loop ---
    let frameId = 0;
    let lastTime = performance.now();
    let frameCount = 0;

    const animate = (time: number) => {
      frameId = requestAnimationFrame(animate);

      // FPS calculation
      frameCount++;
      if (time - lastTime >= 1000) {
        setFps(Math.round((frameCount * 1000) / (time - lastTime)));
        frameCount = 0;
        lastTime = time;
      }

      // Smooth damped rotation
      mainGroup.rotation.y += (targetRotationY - mainGroup.rotation.y) * 0.06;
      mainGroup.rotation.x += (targetRotationX - mainGroup.rotation.x) * 0.06;

      // Continuous ambient rotation
      if (!isDragging) {
        targetRotationY += 0.004;
        targetRotationX = Math.sin(time * 0.001) * 0.15;
      }

      // Component-specific inner rotation
      coreMesh.rotation.y -= 0.009;
      coreMesh.rotation.x += 0.005;

      ring1.rotation.z += 0.01;
      ring2.rotation.z -= 0.008;

      particles.rotation.y += 0.0015;

      // Pulsing scale based on mode
      const pulse = 1 + Math.sin(time * 0.003) * 0.06;
      nodeMesh.scale.set(pulse, pulse, pulse);

      renderer.render(scene, camera);
    };
    frameId = requestAnimationFrame(animate);

    // Store references for mode switching
    (container as any)._three = {
      icoMesh,
      coreMesh,
      nodeMesh,
      ring1,
      ring2,
      particles,
    };

    // Cleanup
    return () => {
      cancelAnimationFrame(frameId);
      domElement.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("resize", handleResize);

      if (container && renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }

      // Dispose Three.js objects
      icoGeometry.dispose();
      icoMaterial.dispose();
      coreGeometry.dispose();
      coreMaterial.dispose();
      nodeGeometry.dispose();
      nodeMaterial.dispose();
      ringGeometry.dispose();
      ringMaterial.dispose();
      particleGeometry.dispose();
      particleMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  // Mode switcher handler
  const switchMode = (newMode: VisualMode) => {
    setMode(newMode);
    playWarpSound();
    const container = containerRef.current;
    if (!container || !(container as any)._three) return;
    const { icoMesh, coreMesh, ring1, ring2, particles } = (container as any)._three;

    if (newMode === "quantum") {
      icoMesh.visible = true;
      coreMesh.visible = true;
      ring1.visible = true;
      ring2.visible = true;
      particles.visible = true;
      icoMesh.material.color.setHex(0x06b6d4);
      coreMesh.material.color.setHex(0x818cf8);
    } else if (newMode === "particles") {
      icoMesh.visible = false;
      coreMesh.visible = true;
      ring1.visible = false;
      ring2.visible = false;
      particles.visible = true;
      coreMesh.material.color.setHex(0x22d3ee);
    } else if (newMode === "shield") {
      icoMesh.visible = true;
      coreMesh.visible = true;
      ring1.visible = true;
      ring2.visible = true;
      particles.visible = false;
      icoMesh.material.color.setHex(0x10b981);
      coreMesh.material.color.setHex(0x06b6d4);
    }
  };

  return (
    <div className="relative w-full h-[400px] sm:h-[480px] rounded-3xl overflow-hidden glass-card border border-zinc-200/80 dark:border-cyan-500/30 shadow-2xl bg-zinc-950/90 select-none group">
      {/* Background Cyber Ambient Glows */}
      <div className="absolute inset-0 cyber-grid opacity-40 pointer-events-none" />
      <div className="absolute -top-12 -right-12 w-48 h-48 bg-cyan-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />

      {/* Top HUD: Status Bar */}
      <div className="absolute top-3.5 left-4 right-4 z-20 flex items-center justify-between text-xs font-mono pointer-events-none">
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900/80 border border-zinc-800 text-cyan-400 backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
          <span className="text-[11px] font-bold">ASTRA 3D ENGINE // ONLINE</span>
        </div>

        <div className="flex items-center gap-2 pointer-events-auto">
          {/* Sound Toggle Button */}
          <button
            onClick={handleToggleSound}
            onMouseEnter={playHoverSound}
            className="p-1.5 rounded-lg bg-zinc-900/80 border border-zinc-800 text-zinc-300 hover:text-cyan-400 transition-colors shadow-xs cursor-pointer"
            title={soundOn ? "ปิดเสียง Cyber SFX" : "เปิดเสียง Cyber SFX"}
          >
            {soundOn ? <Volume2 size={14} className="text-cyan-400" /> : <VolumeX size={14} className="text-zinc-500" />}
          </button>

          {/* FPS Badge */}
          <div className="px-2.5 py-1 rounded-lg bg-zinc-900/80 border border-zinc-800 text-[10px] text-emerald-400 font-bold backdrop-blur-md">
            {fps} FPS
          </div>
        </div>
      </div>

      {/* 3D WebGL Canvas Mount */}
      <div
        ref={containerRef}
        className="w-full h-full cursor-grab active:cursor-grabbing touch-none"
        title="คลิกลากเพื่อหมุนวัตถุ 3D ในทุกมิติ (Click & Drag to rotate)"
      />

      {/* Bottom Floating Interactive HUD Controls */}
      <div className="absolute bottom-3.5 left-4 right-4 z-20 flex flex-wrap items-center justify-between gap-2">
        {/* Interaction Hint */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-900/85 border border-zinc-800 text-[10px] font-mono text-zinc-400 backdrop-blur-md pointer-events-none">
          <Compass size={12} className={isInteracting ? "text-cyan-400 animate-spin" : "text-zinc-500"} />
          <span>{isInteracting ? "DRAGGING 3D PERSPECTIVE" : "DRAG TO ROTATE 3D MODEL"}</span>
        </div>

        {/* 3D Mode Selector Pills */}
        <div className="flex items-center gap-1.5 bg-zinc-900/90 p-1 rounded-xl border border-zinc-800 backdrop-blur-md">
          <button
            onClick={() => switchMode("quantum")}
            onMouseEnter={playHoverSound}
            className={`px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold transition-all cursor-pointer ${
              mode === "quantum"
                ? "bg-cyan-500 text-white shadow-md shadow-cyan-500/30"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            Quantum
          </button>
          <button
            onClick={() => switchMode("particles")}
            onMouseEnter={playHoverSound}
            className={`px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold transition-all cursor-pointer ${
              mode === "particles"
                ? "bg-purple-600 text-white shadow-md shadow-purple-500/30"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            Nexus
          </button>
          <button
            onClick={() => switchMode("shield")}
            onMouseEnter={playHoverSound}
            className={`px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold transition-all cursor-pointer ${
              mode === "shield"
                ? "bg-emerald-500 text-white shadow-md shadow-emerald-500/30"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            Shield
          </button>
        </div>
      </div>
    </div>
  );
}
