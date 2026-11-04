"use client";

import { useEffect, useRef, useState } from "react";

const NAME = "SIRIMONGKOL";
const INTRO_MS = 2100;

/**
 * Global premium layer:
 *  - Cinematic intro (letter reveal + ring + counter, then split-curtain exit)
 *  - Scroll progress bar
 *  - Cursor aura + dot (desktop only)
 *  - Pointer spotlight on every .glass-card
 *  - Staggered scroll reveal for section content
 *
 * Reveal state lives in data-* attributes that React never manages,
 * so re-renders (language switch, filters, fetches) can't wipe them.
 */
export default function PremiumEffects() {
  const [phase, setPhase] = useState<"intro" | "leaving" | "done">("intro");
  const [count, setCount] = useState(0);
  const progressRef = useRef<HTMLDivElement>(null);
  const auraRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  // ---- Intro timeline ----
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const root = document.documentElement;
    root.style.overflow = "hidden";

    const total = reduced ? 200 : INTRO_MS;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / total);
      // ease-out so the counter decelerates near 100
      setCount(Math.round((1 - Math.pow(1 - p, 3)) * 100));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const leave = setTimeout(() => setPhase((p) => (p === "intro" ? "leaving" : p)), total);
    const done = setTimeout(() => {
      setPhase("done");
      root.style.overflow = "";
      window.dispatchEvent(new Event("intro:done"));
    }, total + (reduced ? 0 : 1100));

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(leave);
      clearTimeout(done);
      root.style.overflow = "";
    };
  }, []);

  const skipIntro = () => {
    if (phase !== "intro") return;
    setCount(100);
    setPhase("leaving");
    setTimeout(() => {
      setPhase("done");
      document.documentElement.style.overflow = "";
      window.dispatchEvent(new Event("intro:done"));
    }, 1100);
  };

  // ---- Scroll reveal ----
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || !("IntersectionObserver" in window)) return;

    const selector = [
      "main section > div.mx-auto > *",
      "main section > div.mx-auto > div.grid > *",
    ].join(",");

    const targets = Array.from(document.querySelectorAll<HTMLElement>(selector));
    targets.forEach((el) => {
      const siblings = el.parentElement ? Array.from(el.parentElement.children) : [];
      const idx = Math.max(0, siblings.indexOf(el));
      el.style.setProperty("--rd", `${Math.min(idx, 6) * 90}ms`);
      el.setAttribute("data-reveal", "");
    });

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            io.unobserve(entry.target);
            // Let the build-crew cursors claim this element; reveal directly if nobody does
            const claim = new CustomEvent("build:queue", { detail: entry.target, cancelable: true });
            if (window.dispatchEvent(claim)) entry.target.setAttribute("data-reveal", "in");
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
    );

    // Start observing only after the intro curtain lifts, so the hero animates in on cue
    const begin = () => targets.forEach((el) => io.observe(el));
    window.addEventListener("intro:done", begin, { once: true });

    return () => {
      window.removeEventListener("intro:done", begin);
      io.disconnect();
    };
  }, []);

  // ---- Scroll progress ----
  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? window.scrollY / max : 0;
      progressRef.current?.style.setProperty("--sp", p.toFixed(4));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  // ---- Cursor aura, dot, card spotlight ----
  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;

    let tx = -999, ty = -999, ax = -999, ay = -999;
    let raf = 0;

    const loop = () => {
      // aura trails the pointer with easing for a liquid feel
      ax += (tx - ax) * 0.12;
      ay += (ty - ay) * 0.12;
      auraRef.current?.style.setProperty("--cx", `${ax}px`);
      auraRef.current?.style.setProperty("--cy", `${ay}px`);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    const onMove = (e: PointerEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      dotRef.current?.style.setProperty("--dx", `${tx}px`);
      dotRef.current?.style.setProperty("--dy", `${ty}px`);

      const target = e.target as HTMLElement | null;
      const card = target?.closest?.<HTMLElement>(".glass-card");
      if (card) {
        const r = card.getBoundingClientRect();
        card.style.setProperty("--mx", `${e.clientX - r.left}px`);
        card.style.setProperty("--my", `${e.clientY - r.top}px`);
      }
      const interactive = target?.closest?.("a, button, [role='button'], input, textarea, select");
      dotRef.current?.style.setProperty("--ds", interactive ? "2.6" : "1");
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div className="aurora" aria-hidden />
      <div className="grain" aria-hidden />
      <div ref={progressRef} className="scroll-progress" aria-hidden />
      <div ref={auraRef} className="cursor-aura" aria-hidden />
      <div ref={dotRef} className="cursor-dot" aria-hidden />

      {phase !== "done" && (
        <div
          className={`intro-root ${phase === "leaving" ? "is-leaving" : ""}`}
          onClick={skipIntro}
          role="presentation"
        >
          <div className="intro-panel top" />
          <div className="intro-panel bottom" />

          <div className="intro-content select-none px-6">
            {/* Monogram ring */}
            <div className="relative mx-auto mb-7 h-24 w-24">
              <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full -rotate-90">
                <defs>
                  <linearGradient id="introGrad" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#22d3ee" />
                    <stop offset="55%" stopColor="#818cf8" />
                    <stop offset="100%" stopColor="#e879f9" />
                  </linearGradient>
                </defs>
                <circle cx="50" cy="50" r="48" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1.5" />
                <circle className="intro-ring" cx="50" cy="50" r="48" fill="none" stroke="url(#introGrad)" strokeWidth="2" strokeLinecap="round" />
              </svg>
              <div className="absolute inset-0 grid place-items-center">
                <span className="text-2xl font-black tracking-tight shimmer-text">SM</span>
              </div>
            </div>

            {/* Name letter cascade */}
            <div className="overflow-hidden text-4xl font-black tracking-[0.18em] text-white sm:text-6xl" aria-label={NAME}>
              {NAME.split("").map((ch, i) => (
                <span key={i} className="intro-letter" style={{ animationDelay: `${180 + i * 55}ms` }} aria-hidden>
                  {ch}
                </span>
              ))}
            </div>

            <div className="intro-line mx-auto mt-5 w-64 sm:w-96" style={{ animationDelay: "500ms" }} />

            <p
              className="intro-letter mt-4 text-[11px] font-semibold uppercase tracking-[0.35em] text-zinc-400 sm:text-xs"
              style={{ animationDelay: "850ms" }}
            >
              Full-Stack · Mobile · Automation
            </p>

            <div className="mt-8 font-mono text-xs text-cyan-400/80 tabular-nums">
              {String(count).padStart(3, "0")}%
            </div>
            <div className="mt-2 text-[10px] uppercase tracking-widest text-zinc-600">click to skip</div>
          </div>
        </div>
      )}
    </>
  );
}
