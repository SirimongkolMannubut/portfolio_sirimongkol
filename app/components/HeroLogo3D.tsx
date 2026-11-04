"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { Compass, Volume2, VolumeX, Sparkles } from "lucide-react";
import { playClickSound, playHoverSound, toggleSound, isSoundEnabled } from "../lib/audio";

export default function HeroLogo3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [fps, setFps] = useState<number>(60);
  const [isInteracting, setIsInteracting] = useState<boolean>(false);
  const [soundOn, setSoundOn] = useState<boolean>(true);

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

    // Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 5.0);

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.4;
    container.appendChild(renderer.domElement);

    // Studio Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xffffff, 2.2);
    dirLight1.position.set(4, 6, 5);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x38bdf8, 1.8);
    dirLight2.position.set(-4, -5, -2);
    scene.add(dirLight2);

    // Main 3D Group
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // 1. Smooth Electric-Blue Sculptural Ribbon (Torus Knot p=2, q=3)
    const ribbonGeo = new THREE.TorusKnotGeometry(1.05, 0.22, 140, 32, 2, 3);
    const ribbonMat = new THREE.MeshPhysicalMaterial({
      color: 0x1d4ed8,
      emissive: 0x1e40af,
      emissiveIntensity: 0.35,
      roughness: 0.18,
      metalness: 0.85,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
      reflectivity: 0.9,
    });
    const ribbonMesh = new THREE.Mesh(ribbonGeo, ribbonMat);
    mainGroup.add(ribbonMesh);

    // 2. Glowing Golden Energy Spheres (like in Reel 2 @xiaobima___)
    const orbGroup = new THREE.Group();
    mainGroup.add(orbGroup);

    const orbGeo = new THREE.SphereGeometry(0.16, 24, 24);
    const orbMat = new THREE.MeshStandardMaterial({
      color: 0xfef08a,
      emissive: 0xf59e0b,
      emissiveIntensity: 2.2,
      roughness: 0.1,
      metalness: 0.2,
    });

    const orbs: THREE.Mesh[] = [];
    const orbCount = 3;
    for (let i = 0; i < orbCount; i++) {
      const orb = new THREE.Mesh(orbGeo, orbMat);
      orbGroup.add(orb);
      orbs.push(orb);

      // Add soft point light to each golden orb
      const orbLight = new THREE.PointLight(0xf59e0b, 5, 4);
      orb.add(orbLight);
    }

    // 3. Subtle ambient dust particles
    const particleCount = 200;
    const particleGeo = new THREE.BufferGeometry();
    const particlePos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePos[i] = (Math.random() - 0.5) * 6;
      particlePos[i + 1] = (Math.random() - 0.5) * 6;
      particlePos[i + 2] = (Math.random() - 0.5) * 4;
    }
    particleGeo.setAttribute("position", new THREE.BufferAttribute(particlePos, 3));
    const particleMat = new THREE.PointsMaterial({
      size: 0.03,
      color: 0x93c5fd,
      transparent: true,
      opacity: 0.6,
    });
    const particlePoints = new THREE.Points(particleGeo, particleMat);
    scene.add(particlePoints);

    // Mouse Interaction & Dragging
    let isDragging = false;
    let prevMouse = { x: 0, y: 0 };
    let targetRotX = 0;
    let targetRotY = 0;
    let mouseParallaxX = 0;
    let mouseParallaxY = 0;

    const onMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      mouseParallaxX = x * 0.4;
      mouseParallaxY = y * 0.4;
    };

    const onPointerDown = (e: PointerEvent) => {
      isDragging = true;
      setIsInteracting(true);
      playClickSound();
      prevMouse = { x: e.clientX, y: e.clientY };
    };

    const onPointerMove = (e: PointerEvent) => {
      if (isDragging) {
        const dx = e.clientX - prevMouse.x;
        const dy = e.clientY - prevMouse.y;
        targetRotY += dx * 0.009;
        targetRotX += dy * 0.009;
        prevMouse = { x: e.clientX, y: e.clientY };
      }
    };

    const onPointerUp = () => {
      isDragging = false;
      setIsInteracting(false);
    };

    const dom = renderer.domElement;
    dom.addEventListener("pointerdown", onPointerDown);
    container.addEventListener("mousemove", onMouseMove);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);

    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener("resize", handleResize);

    // Animation Loop
    let frameId = 0;
    let lastTime = performance.now();
    let frameCount = 0;

    const animate = (time: number) => {
      frameId = requestAnimationFrame(animate);

      // FPS
      frameCount++;
      if (time - lastTime >= 1000) {
        setFps(Math.round((frameCount * 1000) / (time - lastTime)));
        frameCount = 0;
        lastTime = time;
      }

      const t = time * 0.001;

      // Smooth rotation with parallax
      mainGroup.rotation.y += (targetRotY + mouseParallaxX - mainGroup.rotation.y) * 0.06;
      mainGroup.rotation.x += (targetRotX - mouseParallaxY - mainGroup.rotation.x) * 0.06;

      if (!isDragging) {
        targetRotY += 0.006;
        targetRotX = Math.sin(t * 0.7) * 0.15;
      }

      // Sculptural inner rotation
      ribbonMesh.rotation.z = Math.sin(t * 0.5) * 0.2;

      // Orbiting Golden Spheres around ribbon
      orbs.forEach((orb, i) => {
        const offset = (i * Math.PI * 2) / orbCount;
        const speed = 1.3;
        const currentAngle = t * speed + offset;
        const radius = 1.45 + Math.sin(t * 2 + offset) * 0.2;
        orb.position.x = Math.sin(currentAngle) * radius;
        orb.position.y = Math.cos(currentAngle * 1.5) * (radius * 0.65);
        orb.position.z = Math.cos(currentAngle) * radius;
      });

      particlePoints.rotation.y += 0.0008;

      renderer.render(scene, camera);
    };
    frameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(frameId);
      dom.removeEventListener("pointerdown", onPointerDown);
      container.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("resize", handleResize);

      if (container && renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }

      ribbonGeo.dispose();
      ribbonMat.dispose();
      orbGeo.dispose();
      orbMat.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div className="relative w-full h-[380px] sm:h-[460px] rounded-3xl overflow-hidden glass-card border border-zinc-200/80 dark:border-blue-500/30 shadow-2xl bg-zinc-950/95 select-none group">
      {/* Background Cyber Glow */}
      <div className="absolute inset-0 cyber-grid opacity-30 pointer-events-none" />
      <div className="absolute -top-16 -right-16 w-60 h-60 bg-blue-600/25 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-16 -left-16 w-60 h-60 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />

      {/* Top HUD Status */}
      <div className="absolute top-3.5 left-4 right-4 z-20 flex items-center justify-between text-xs font-mono pointer-events-none">
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900/90 border border-blue-500/30 text-blue-400 backdrop-blur-md shadow-md">
          <span className="w-2 h-2 rounded-full bg-blue-400 animate-ping" />
          <span className="text-[11px] font-bold tracking-wider">IGNITRON 3D RIBBON // ONLINE</span>
        </div>

        <div className="flex items-center gap-2 pointer-events-auto">
          <button
            onClick={handleToggleSound}
            onMouseEnter={playHoverSound}
            className="p-1.5 rounded-lg bg-zinc-900/90 border border-zinc-800 hover:border-blue-500/40 text-zinc-300 hover:text-blue-400 transition-colors shadow-xs cursor-pointer"
            title={soundOn ? "ปิดเสียง Cyber SFX" : "เปิดเสียง Cyber SFX"}
          >
            {soundOn ? <Volume2 size={14} className="text-blue-400" /> : <VolumeX size={14} className="text-zinc-500" />}
          </button>

          <div className="px-2.5 py-1 rounded-lg bg-zinc-900/90 border border-emerald-500/30 text-[10px] text-emerald-400 font-bold backdrop-blur-md">
            {fps} FPS
          </div>
        </div>
      </div>

      {/* 3D WebGL Canvas */}
      <div
        ref={containerRef}
        className="w-full h-full cursor-grab active:cursor-grabbing touch-none"
        title="คลิกลากเพื่อหมุน 3D หรือเลื่อนเมาส์เพื่อให้หันตาม (Tilt & Drag 3D Model)"
      />

      {/* Bottom Floating Hint */}
      <div className="absolute bottom-3.5 left-4 right-4 z-20 flex items-center justify-between pointer-events-none">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-900/90 border border-zinc-800 text-[10px] font-mono text-zinc-400 backdrop-blur-md">
          <Compass size={12} className={isInteracting ? "text-blue-400 animate-spin" : "text-blue-400"} />
          <span>{isInteracting ? "NAVIGATING SPATIAL MODEL" : "TILT & DRAG SPATIAL SCULPTURE"}</span>
        </div>

        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-950/60 border border-blue-800/60 text-[10px] font-mono text-blue-300 backdrop-blur-md">
          <Sparkles size={11} className="text-amber-400" />
          <span>3 ORBITAL NODES</span>
        </div>
      </div>
    </div>
  );
}
