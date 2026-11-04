"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { Sparkles, RotateCw, Layers, Compass, Volume2, VolumeX, Eye } from "lucide-react";
import { playHoverSound, playClickSound, playWarpSound, toggleSound, isSoundEnabled } from "../lib/audio";

type VisualMode = "chrome" | "quantum" | "crystal";

export default function Astra3DHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<VisualMode>("chrome");
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

    // --- Scene & Camera Setup ---
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 5.2);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;
    container.appendChild(renderer.domElement);

    // --- Studio Lighting Setup for High-End PBR Reflection ---
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xffffff, 2.0);
    dirLight1.position.set(5, 8, 5);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x38bdf8, 1.5);
    dirLight2.position.set(-5, -4, -2);
    scene.add(dirLight2);

    // Orbiting Neon Point Lights for Liquid Chrome Highlights
    const pointLightCyan = new THREE.PointLight(0x06b6d4, 15, 12);
    scene.add(pointLightCyan);

    const pointLightPurple = new THREE.PointLight(0xa855f7, 15, 12);
    scene.add(pointLightPurple);

    // Light Helper Sparks
    const sparkGeo = new THREE.SphereGeometry(0.04, 8, 8);
    const sparkMatCyan = new THREE.MeshBasicMaterial({ color: 0x22d3ee });
    const sparkCyan = new THREE.Mesh(sparkGeo, sparkMatCyan);
    pointLightCyan.add(sparkCyan);

    const sparkMatPurple = new THREE.MeshBasicMaterial({ color: 0xc084fc });
    const sparkPurple = new THREE.Mesh(sparkGeo, sparkMatPurple);
    pointLightPurple.add(sparkPurple);

    // --- Main Spatial 3D Group ---
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // 1. Core Object A: High-End Liquid Chrome Torus Knot
    const knotGeometry = new THREE.TorusKnotGeometry(0.88, 0.26, 128, 32);
    const chromeMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x0f172a,
      emissive: 0x020617,
      roughness: 0.12,
      metalness: 0.95,
      clearcoat: 1.0,
      clearcoatRoughness: 0.08,
      reflectivity: 1.0,
      wireframe: false,
    });
    const knotMesh = new THREE.Mesh(knotGeometry, chromeMaterial);
    mainGroup.add(knotMesh);

    // 2. Core Object B: Quantum Pulsing Sphere (for Quantum Mode)
    const sphereGeometry = new THREE.IcosahedronGeometry(0.9, 4);
    const quantumMaterial = new THREE.MeshStandardMaterial({
      color: 0x1e1b4b,
      emissive: 0x4338ca,
      emissiveIntensity: 0.8,
      roughness: 0.2,
      metalness: 0.8,
      wireframe: true,
    });
    const sphereMesh = new THREE.Mesh(sphereGeometry, quantumMaterial);
    sphereMesh.visible = false;
    mainGroup.add(sphereMesh);

    // 3. Faceted Prismatic Crystal Cage
    const cageGeometry = new THREE.IcosahedronGeometry(1.68, 0);
    const crystalMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x38bdf8,
      roughness: 0.1,
      metalness: 0.1,
      transmission: 0.75,
      opacity: 0.35,
      transparent: true,
      ior: 1.52,
      flatShading: true,
    });
    const crystalMesh = new THREE.Mesh(cageGeometry, crystalMaterial);
    mainGroup.add(crystalMesh);

    // 3.1 Crystal Edge Wireframe
    const wireframeGeo = new THREE.WireframeGeometry(cageGeometry);
    const wireMat = new THREE.LineBasicMaterial({
      color: 0x06b6d4,
      transparent: true,
      opacity: 0.45,
    });
    const wireLine = new THREE.LineSegments(wireframeGeo, wireMat);
    crystalMesh.add(wireLine);

    // 4. Orbital Rings (Cyber Gyroscope)
    const ringGeometry = new THREE.TorusGeometry(2.1, 0.018, 16, 100);
    const ringMaterial = new THREE.MeshStandardMaterial({
      color: 0xa855f7,
      emissive: 0x581c87,
      metalness: 0.9,
      roughness: 0.2,
    });
    const ring1 = new THREE.Mesh(ringGeometry, ringMaterial);
    ring1.rotation.x = Math.PI / 3;
    mainGroup.add(ring1);

    const ring2 = new THREE.Mesh(ringGeometry, ringMaterial.clone());
    ring2.rotation.y = Math.PI / 3;
    mainGroup.add(ring2);

    // 5. Orbital Particles Galaxy (Astra Stars)
    const particleCount = 850;
    const particleGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const cCyan = new THREE.Color(0x38bdf8);
    const cPurple = new THREE.Color(0xc084fc);
    const cEmerald = new THREE.Color(0x34d399);

    for (let i = 0; i < particleCount; i++) {
      const radius = 2.0 + Math.random() * 2.8;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);

      const mixed = i % 3 === 0 ? cCyan : i % 3 === 1 ? cPurple : cEmerald;
      colors[i * 3] = mixed.r;
      colors[i * 3 + 1] = mixed.g;
      colors[i * 3 + 2] = mixed.b;
    }

    particleGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    particleGeometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const particleMaterial = new THREE.PointsMaterial({
      size: 0.04,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(particleGeometry, particleMaterial);
    mainGroup.add(particles);

    // --- Interactive Mouse Parallax & Drag Controls ---
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };
    let targetRotationX = 0;
    let targetRotationY = 0;
    let mouseParallaxX = 0;
    let mouseParallaxY = 0;

    // Hover parallax tracking
    const onContainerMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      mouseParallaxX = x * 0.35;
      mouseParallaxY = y * 0.35;
    };

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

        targetRotationY += deltaX * 0.009;
        targetRotationX += deltaY * 0.009;

        previousMousePosition = { x: e.clientX, y: e.clientY };
      }
    };

    const onPointerUp = () => {
      isDragging = false;
      setIsInteracting(false);
    };

    const domElement = renderer.domElement;
    domElement.addEventListener("pointerdown", onPointerDown);
    container.addEventListener("mousemove", onContainerMouseMove);
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

      const tSec = time * 0.001;

      // Orbiting dynamic point lights
      pointLightCyan.position.x = Math.sin(tSec * 1.5) * 3.2;
      pointLightCyan.position.y = Math.cos(tSec * 1.2) * 2.5;
      pointLightCyan.position.z = Math.cos(tSec * 1.5) * 3.2;

      pointLightPurple.position.x = -Math.sin(tSec * 1.3) * 3.2;
      pointLightPurple.position.y = -Math.cos(tSec * 1.4) * 2.5;
      pointLightPurple.position.z = -Math.cos(tSec * 1.3) * 3.2;

      // Smooth damped rotation & parallax
      mainGroup.rotation.y += (targetRotationY + mouseParallaxX - mainGroup.rotation.y) * 0.06;
      mainGroup.rotation.x += (targetRotationX - mouseParallaxY - mainGroup.rotation.x) * 0.06;

      // Continuous ambient rotation
      if (!isDragging) {
        targetRotationY += 0.005;
        targetRotationX = Math.sin(tSec * 0.5) * 0.12;
      }

      // Component-specific inner rotation
      knotMesh.rotation.x += 0.007;
      knotMesh.rotation.y += 0.009;

      sphereMesh.rotation.y += 0.012;
      sphereMesh.rotation.x += 0.008;

      crystalMesh.rotation.y -= 0.003;
      crystalMesh.rotation.z += 0.002;

      ring1.rotation.z += 0.008;
      ring2.rotation.z -= 0.006;

      particles.rotation.y += 0.001;

      renderer.render(scene, camera);
    };
    frameId = requestAnimationFrame(animate);

    // Store references for mode switching
    (container as any)._three = {
      knotMesh,
      sphereMesh,
      crystalMesh,
      ring1,
      ring2,
      particles,
      chromeMaterial,
      crystalMaterial,
    };

    // Cleanup
    return () => {
      cancelAnimationFrame(frameId);
      domElement.removeEventListener("pointerdown", onPointerDown);
      container.removeEventListener("mousemove", onContainerMouseMove);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("resize", handleResize);

      if (container && renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }

      // Dispose Three.js objects
      knotGeometry.dispose();
      chromeMaterial.dispose();
      sphereGeometry.dispose();
      quantumMaterial.dispose();
      cageGeometry.dispose();
      crystalMaterial.dispose();
      wireframeGeo.dispose();
      wireMat.dispose();
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
    const { knotMesh, sphereMesh, crystalMesh, particles, chromeMaterial } = (container as any)._three;

    if (newMode === "chrome") {
      knotMesh.visible = true;
      sphereMesh.visible = false;
      crystalMesh.visible = true;
      particles.visible = true;
      chromeMaterial.metalness = 0.95;
      chromeMaterial.roughness = 0.12;
      chromeMaterial.color.setHex(0x0f172a);
    } else if (newMode === "quantum") {
      knotMesh.visible = false;
      sphereMesh.visible = true;
      crystalMesh.visible = true;
      particles.visible = true;
    } else if (newMode === "crystal") {
      knotMesh.visible = true;
      sphereMesh.visible = false;
      crystalMesh.visible = true;
      particles.visible = false;
      chromeMaterial.metalness = 0.4;
      chromeMaterial.roughness = 0.05;
      chromeMaterial.color.setHex(0x38bdf8);
    }
  };

  return (
    <div className="relative w-full h-[410px] sm:h-[480px] rounded-3xl overflow-hidden glass-card border border-zinc-200/80 dark:border-cyan-500/40 shadow-2xl bg-zinc-950/95 select-none group">
      {/* Background Cyber Ambient Glows */}
      <div className="absolute inset-0 cyber-grid opacity-35 pointer-events-none" />
      <div className="absolute -top-12 -right-12 w-56 h-56 bg-cyan-500/25 rounded-full blur-3xl pointer-events-none animate-pulse" />
      <div className="absolute -bottom-12 -left-12 w-56 h-56 bg-purple-500/25 rounded-full blur-3xl pointer-events-none" />

      {/* Top HUD: Status Bar */}
      <div className="absolute top-3.5 left-4 right-4 z-20 flex items-center justify-between text-xs font-mono pointer-events-none">
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900/90 border border-cyan-500/30 text-cyan-400 backdrop-blur-md shadow-lg shadow-cyan-500/10">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
          <span className="text-[11px] font-bold tracking-wider">ASTRA PBR ENGINE // 3D CORE</span>
        </div>

        <div className="flex items-center gap-2 pointer-events-auto">
          {/* Sound Toggle Button */}
          <button
            onClick={handleToggleSound}
            onMouseEnter={playHoverSound}
            className="p-1.5 rounded-lg bg-zinc-900/90 border border-zinc-800 hover:border-cyan-500/40 text-zinc-300 hover:text-cyan-400 transition-colors shadow-xs cursor-pointer"
            title={soundOn ? "ปิดเสียง Cyber SFX" : "เปิดเสียง Cyber SFX"}
          >
            {soundOn ? <Volume2 size={14} className="text-cyan-400" /> : <VolumeX size={14} className="text-zinc-500" />}
          </button>

          {/* FPS Badge */}
          <div className="px-2.5 py-1 rounded-lg bg-zinc-900/90 border border-emerald-500/30 text-[10px] text-emerald-400 font-bold backdrop-blur-md">
            {fps} FPS
          </div>
        </div>
      </div>

      {/* 3D WebGL Canvas Mount */}
      <div
        ref={containerRef}
        className="w-full h-full cursor-grab active:cursor-grabbing touch-none"
        title="คลิกลากเพื่อหมุน 3D รอบทิศทาง หรือเลื่อนเมาส์เพื่อให้วัตถุเอียงตาม (Mouse Parallax & Drag)"
      />

      {/* Bottom Floating Interactive HUD Controls */}
      <div className="absolute bottom-3.5 left-4 right-4 z-20 flex flex-wrap items-center justify-between gap-2">
        {/* Interaction Hint */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-900/90 border border-zinc-800 text-[10px] font-mono text-zinc-400 backdrop-blur-md pointer-events-none">
          <Compass size={12} className={isInteracting ? "text-cyan-400 animate-spin" : "text-cyan-400"} />
          <span>{isInteracting ? "DRAGGING 3D PERSPECTIVE" : "TILT & DRAG 3D MODEL"}</span>
        </div>

        {/* 3D Mode Selector Pills */}
        <div className="flex items-center gap-1.5 bg-zinc-900/95 p-1 rounded-xl border border-zinc-800/90 backdrop-blur-md shadow-xl">
          <button
            onClick={() => switchMode("chrome")}
            onMouseEnter={playHoverSound}
            className={`px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold transition-all cursor-pointer ${
              mode === "chrome"
                ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md shadow-cyan-500/40"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            Liquid Chrome
          </button>
          <button
            onClick={() => switchMode("quantum")}
            onMouseEnter={playHoverSound}
            className={`px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold transition-all cursor-pointer ${
              mode === "quantum"
                ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md shadow-purple-500/40"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            Quantum Orb
          </button>
          <button
            onClick={() => switchMode("crystal")}
            onMouseEnter={playHoverSound}
            className={`px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold transition-all cursor-pointer ${
              mode === "crystal"
                ? "bg-gradient-to-r from-sky-400 to-emerald-500 text-white shadow-md shadow-sky-500/40"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            Prismatic
          </button>
        </div>
      </div>
    </div>
  );
}
