"use client";

import { useEffect, useRef } from "react";

/**
 * Scroll Build Crew
 * -----------------
 * As you scroll, every section block is *built in front of you* by a crew of
 * named multiplayer cursors (Figma-style):
 *
 *   draw  — a cursor drags a selection box and the content materialises
 *           inside it (clip-path follows the cursor), like drawing a frame.
 *   drag  — cards appear in a cursor's hand off to the side, get pulled into
 *           place, overshoot slightly and snap, with smart-guide lines.
 *
 * Between jobs the crew flocks (boids) around your own cursor.
 *
 * Contract with PremiumEffects: it dispatches a cancelable "build:queue"
 * CustomEvent<HTMLElement> when a block scrolls into view. We preventDefault()
 * to claim it and set data-reveal="in" ourselves when the build finishes.
 * Deliberately runs even when the OS asks for reduced motion (owner's choice).
 */

type Member = { name: string; color: string };

const CREW: Member[] = [
  { name: "Codex", color: "#22d3ee" },
  { name: "Claude", color: "#fb923c" },
  { name: "Gemini", color: "#818cf8" },
  { name: "Designer", color: "#f472b6" },
  { name: "Next.js", color: "#a3e635" },
  { name: "Flutter", color: "#38bdf8" },
  { name: "Tailwind", color: "#2dd4bf" },
  { name: "QA Bot", color: "#facc15" },
];

const DRAW_VERBS = ["drawing", "framing", "laying out", "rendering"];
const DRAG_VERBS = ["dragging", "placing", "pulling in", "shipping"];
const GUIDE = "#f0abfc";

type Mode = "draw" | "drag";

type Task = {
  el: HTMLElement;
  mode: Mode;
  queuedAt: number;
  owner: Agent | null;
  // layout box in document coordinates (measured when the job starts)
  doc: { x: number; y: number; w: number; h: number } | null;
  // drag-in origin offset
  from: { dx: number; dy: number; rot: number };
};

type Phase = "idle" | "fly" | "grab" | "work" | "place";

type Agent = {
  m: Member;
  x: number;
  y: number;
  vx: number;
  vy: number;
  phase: Phase;
  phaseAt: number;
  workMs: number;
  task: Task | null;
  verb: string;
  orbitDir: 1 | -1;
  pressed: number; // 0..1 press squash for grab/click feel
  // fly tween: start point + arc bend
  sx: number;
  sy: number;
  bend: number;
  flyMs: number;
};

type Fx =
  | { kind: "snap"; box: Box; color: string; t: number }
  | { kind: "ripple"; x: number; y: number; color: string; t: number };

type Spark = { x: number; y: number; vx: number; vy: number; life: number; color: string };

type Box = { x: number; y: number; w: number; h: number };

const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v));
const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const easeOutBack = (t: number) => {
  const c1 = 1.25, c3 = c1 + 1;
  return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
};

/** Inline !important so no stylesheet rule (e.g. a reduced-motion override) can fight the build */
function imp(el: HTMLElement, prop: string, value: string) {
  el.style.setProperty(prop, value, "important");
}

/** Final visible state, applied inline so it never depends on the stylesheet */
function forceShown(el: HTMLElement) {
  imp(el, "transition", "none");
  imp(el, "opacity", "1");
  imp(el, "transform", "none");
  imp(el, "filter", "none");
}

function clearInline(el: HTMLElement) {
  el.style.removeProperty("filter");
  el.style.removeProperty("clip-path");
  el.style.removeProperty("transform");
  el.style.removeProperty("transform-origin");
  el.style.removeProperty("opacity");
  el.style.removeProperty("transition");
  el.style.removeProperty("will-change");
}

function revealNow(el: HTMLElement) {
  el.style.setProperty("--rd", "0ms");
  el.setAttribute("data-reveal", "in");
  // pin the final state for a frame so the CSS transition can't animate back from hidden
  forceShown(el);
  el.style.removeProperty("clip-path");
  requestAnimationFrame(() => requestAnimationFrame(() => clearInline(el)));
}

export default function ScrollBuildCrew() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    let w = 0, h = 0;
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const family = getComputedStyle(document.body).fontFamily || "system-ui, sans-serif";
    const fontUI = `600 11px ${family}`;
    const fontMono = `500 10px ui-monospace, SFMono-Regular, Menlo, monospace`;
    const crewSize = w < 640 ? 5 : CREW.length;

    const agents: Agent[] = CREW.slice(0, crewSize).map((m, i) => {
      const a = (i / crewSize) * Math.PI * 2 + 0.4;
      return {
        m,
        x: w / 2 + Math.cos(a) * w * 0.75,
        y: h / 2 + Math.sin(a) * h * 0.75,
        vx: 0, vy: 0,
        phase: "idle", phaseAt: 0, workMs: 700,
        task: null,
        verb: "",
        orbitDir: i % 2 ? 1 : -1,
        pressed: 0,
        sx: 0, sy: 0, bend: 0, flyMs: 400,
      };
    });

    const queue: Task[] = [];
    const fx: Fx[] = [];
    const sparks: Spark[] = [];
    const mouse = { x: w / 2, y: h * 0.45, inside: false, lastMove: 0 };
    let placedCount = 0;
    let seenCount = 0;
    let lastBusy = -9999;
    let crewAlpha = 0;
    let dragSide = 1;
    let raf = 0;

    // ---------- job intake ----------
    const onQueue = (e: Event) => {
      const el = (e as CustomEvent<HTMLElement>).detail;
      if (!(el instanceof HTMLElement)) return;
      e.preventDefault();
      // Wrappers that hold other build targets appear instantly; their children get built
      // ("build" = final state with no transition, so no blur fade bleeds onto the children)
      if (el.querySelector("[data-reveal]")) {
        el.setAttribute("data-reveal", "build");
        forceShown(el);
        return;
      }
      const parentIsGrid = !!el.parentElement?.classList.contains("grid");
      const cardLike = parentIsGrid || el.classList.contains("glass-card") || !!el.querySelector(":scope > .glass-card");
      const mode: Mode = cardLike ? "drag" : "draw";
      queue.push({
        el, mode,
        queuedAt: performance.now(),
        owner: null,
        doc: null,
        from: { dx: 0, dy: 0, rot: 0 },
      });
      seenCount++;
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.inside = true;
      mouse.lastMove = performance.now();
    };
    const onLeave = () => { mouse.inside = false; };

    // ---------- helpers ----------
    const view = (d: Box): Box => ({ x: d.x - window.scrollX, y: d.y - window.scrollY, w: d.w, h: d.h });
    const onScreen = (b: Box) => b.y + b.h > 0 && b.y < h && b.x + b.w > 0 && b.x < w;

    const removeTask = (t: Task) => {
      const i = queue.indexOf(t);
      if (i >= 0) queue.splice(i, 1);
    };

    const startTask = (a: Agent, t: Task, now: number) => {
      const el = t.el;
      el.setAttribute("data-reveal", "build");
      forceShown(el);
      el.style.willChange = t.mode === "drag" ? "transform, opacity" : "clip-path";
      const r = el.getBoundingClientRect();
      t.doc = { x: r.left + window.scrollX, y: r.top + window.scrollY, w: r.width, h: r.height };

      if (t.mode === "draw") {
        imp(el, "clip-path", "inset(0 100% 100% 0)");
      } else {
        // come in from the nearer screen edge, alternating when centred
        const cx = r.left + r.width / 2;
        const side = Math.abs(cx - w / 2) < w * 0.08 ? (dragSide = -dragSide) : cx < w / 2 ? -1 : 1;
        t.from = {
          dx: side * clamp(w * 0.22, 140, 340),
          dy: 70 + Math.random() * 60,
          rot: side * (4 + Math.random() * 4),
        };
        imp(el, "opacity", "0");
        imp(el, "transform-origin", "50% 0");
        imp(el, "transform", `translate(${t.from.dx}px, ${t.from.dy}px) rotate(${t.from.rot}deg) scale(0.94)`);
      }

      t.owner = a;
      a.task = t;
      a.phase = "fly";
      a.phaseAt = now;
      a.sx = a.x;
      a.sy = a.y;
      a.bend = (Math.random() < 0.5 ? -1 : 1) * (0.12 + Math.random() * 0.14);
      const dist = Math.hypot(r.left - a.x, r.top - a.y);
      a.flyMs = clamp(220 + dist * 0.55, 300, 680) * (queue.filter((q) => !q.owner).length > 2 ? 0.7 : 1);
      const verbs = t.mode === "draw" ? DRAW_VERBS : DRAG_VERBS;
      a.verb = verbs[Math.floor(Math.random() * verbs.length)];
    };

    const gripOf = (b: Box) => ({ x: b.x + b.w / 2, y: b.y + Math.min(26, b.h * 0.3) });

    const burst = (b: Box, color: string) => {
      const pts = [[b.x, b.y], [b.x + b.w, b.y], [b.x, b.y + b.h], [b.x + b.w, b.y + b.h]];
      for (const [px, py] of pts) {
        for (let k = 0; k < 6; k++) {
          const ang = Math.random() * Math.PI * 2;
          const sp = 1 + Math.random() * 3.5;
          sparks.push({ x: px, y: py, vx: Math.cos(ang) * sp, vy: Math.sin(ang) * sp, life: 1, color });
        }
      }
    };

    const complete = (a: Agent, now: number) => {
      const t = a.task;
      if (t) {
        revealNow(t.el);
        removeTask(t);
        if (t.doc) {
          const b = view(t.doc);
          fx.push({ kind: "snap", box: b, color: a.m.color, t: now });
          burst(b, a.m.color);
        }
        placedCount++;
      }
      fx.push({ kind: "ripple", x: a.x, y: a.y, color: a.m.color, t: now });
      a.pressed = 1;
      a.task = null;
      a.phase = "place";
      a.phaseAt = now;
    };

    const abandon = (a: Agent) => {
      if (a.task) {
        revealNow(a.task.el);
        removeTask(a.task);
        placedCount++;
      }
      a.task = null;
      a.phase = "idle";
    };

    // ---------- drawing ----------
    const drawArrow = (x: number, y: number, color: string, tilt: number, press: number) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(tilt);
      const s = 1 - press * 0.18;
      ctx.scale(s, s);
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(0, 17);
      ctx.lineTo(4.2, 13.2);
      ctx.lineTo(7.2, 19.6);
      ctx.lineTo(10, 18.4);
      ctx.lineTo(7.1, 12.1);
      ctx.lineTo(12.6, 12.1);
      ctx.closePath();
      ctx.shadowColor = color;
      ctx.shadowBlur = 14;
      ctx.fillStyle = color;
      ctx.fill();
      ctx.shadowBlur = 0;
      ctx.lineWidth = 1.3;
      ctx.lineJoin = "round";
      ctx.strokeStyle = "rgba(255,255,255,0.95)";
      ctx.stroke();
      ctx.restore();
    };

    const pill = (x: number, y: number, text: string, bg: string, fg = "#09090b", font = fontUI, r = 6) => {
      ctx.font = font;
      const tw = ctx.measureText(text).width;
      const pw = tw + 14, ph = 19;
      ctx.beginPath();
      ctx.roundRect(x, y, pw, ph, r);
      ctx.fillStyle = bg;
      ctx.fill();
      ctx.fillStyle = fg;
      ctx.textBaseline = "middle";
      ctx.fillText(text, x + 7, y + ph / 2 + 0.5);
      return pw;
    };

    const frame = (b: Box, color: string, alpha: number, opts: { handles?: boolean; dash?: boolean; fill?: boolean }) => {
      ctx.globalAlpha = alpha;
      if (opts.fill) {
        ctx.fillStyle = color + "12";
        ctx.fillRect(b.x, b.y, b.w, b.h);
      }
      if (opts.dash) {
        ctx.setLineDash([6, 4]);
        ctx.lineDashOffset = -performance.now() / 35;
      }
      ctx.lineWidth = 1.5;
      ctx.strokeStyle = color;
      ctx.strokeRect(b.x + 0.5, b.y + 0.5, b.w, b.h);
      ctx.setLineDash([]);
      if (opts.handles) {
        ctx.fillStyle = "#fff";
        for (const [hx, hy] of [
          [b.x, b.y], [b.x + b.w / 2, b.y], [b.x + b.w, b.y],
          [b.x, b.y + b.h / 2], [b.x + b.w, b.y + b.h / 2],
          [b.x, b.y + b.h], [b.x + b.w / 2, b.y + b.h], [b.x + b.w, b.y + b.h],
        ]) {
          ctx.fillRect(hx - 3.5, hy - 3.5, 7, 7);
          ctx.strokeRect(hx - 3.5, hy - 3.5, 7, 7);
        }
      }
      ctx.globalAlpha = 1;
    };

    const sizeTag = (b: Box, color: string, alpha: number) => {
      if (b.w < 60) return;
      ctx.globalAlpha = alpha;
      ctx.font = fontMono;
      const label = `${Math.round(b.w)} × ${Math.round(b.h)}`;
      const tw = ctx.measureText(label).width + 10;
      const lx = b.x + b.w / 2 - tw / 2;
      const ly = clamp(b.y + b.h + 7, 0, h - 22);
      ctx.beginPath();
      ctx.roundRect(lx, ly, tw, 16, 4);
      ctx.fillStyle = color;
      ctx.fill();
      ctx.fillStyle = "#09090b";
      ctx.textBaseline = "middle";
      ctx.fillText(label, lx + 5, ly + 8.5);
      ctx.globalAlpha = 1;
    };

    // ---------- main loop ----------
    const loop = (now: number) => {
      raf = requestAnimationFrame(loop);
      ctx.clearRect(0, 0, w, h);

      // assign waiting jobs (FIFO) to the nearest free cursor
      for (const t of queue) {
        if (t.owner) continue;
        if (!t.el.isConnected) { removeTask(t); continue; }
        const r = t.el.getBoundingClientRect();
        let best: Agent | null = null, bestD = Infinity;
        for (const a of agents) {
          if (a.phase !== "idle") continue;
          const d = Math.hypot(a.x - r.left, a.y - r.top);
          if (d < bestD) { bestD = d; best = a; }
        }
        if (!best) break;
        startTask(best, t, now);
      }

      // safety net: never leave content hidden for long
      for (let i = queue.length - 1; i >= 0; i--) {
        const t = queue[i];
        if (!t.owner && now - t.queuedAt > 3200) {
          revealNow(t.el);
          queue.splice(i, 1);
          placedCount++;
        }
      }

      const busy = agents.some((a) => a.phase !== "idle") || queue.length > 0;
      if (busy) lastBusy = now;
      const recentlyMoved = mouse.inside && now - mouse.lastMove < 3500;
      const targetAlpha = busy ? 1 : recentlyMoved ? 0.85 : 0.22;
      crewAlpha += (targetAlpha - crewAlpha) * 0.06;
      const rush = queue.filter((t) => !t.owner).length > 2 ? 0.6 : 1;

      // ---- physics ----
      for (const a of agents) {
        a.pressed *= 0.88;
        let ax = 0, ay = 0;

        for (const o of agents) {
          if (o === a) continue;
          const dx = a.x - o.x, dy = a.y - o.y;
          const d = Math.hypot(dx, dy) || 0.01;
          if (d < 48) {
            ax += (dx / d) * (48 - d) * 0.05;
            ay += (dy / d) * (48 - d) * 0.05;
          }
        }

        const t = a.task;
        if (t && !t.el.isConnected) { abandon(a); continue; }

        if (a.phase === "fly" && t?.doc) {
          const b = view(t.doc);
          if (!onScreen(b)) { abandon(a); continue; }
          // target: top-left for drawing, the offset grip point for dragging
          let tx: number, ty: number;
          if (t.mode === "draw") {
            tx = clamp(b.x, 6, w - 6);
            ty = clamp(b.y, 70, h - 10);
          } else {
            const g = gripOf(b);
            tx = clamp(g.x + t.from.dx, 6, w - 6);
            ty = clamp(g.y + t.from.dy, 70, h - 10);
          }
          // timed arc flight (quadratic bezier), target re-read every frame so scrolling is tracked
          const fp = clamp((now - a.phaseAt) / a.flyMs, 0, 1);
          const fe = easeInOutCubic(fp);
          const mx = (a.sx + tx) / 2, my = (a.sy + ty) / 2;
          const cx = mx - (ty - a.sy) * a.bend, cy = my + (tx - a.sx) * a.bend;
          const px = a.x, py = a.y;
          a.x = (1 - fe) * (1 - fe) * a.sx + 2 * (1 - fe) * fe * cx + fe * fe * tx;
          a.y = (1 - fe) * (1 - fe) * a.sy + 2 * (1 - fe) * fe * cy + fe * fe * ty;
          a.vx = a.x - px;
          a.vy = a.y - py;
          if (fp >= 1) {
            a.x = tx; a.y = ty; a.vx = a.vy = 0;
            a.pressed = 1;
            fx.push({ kind: "ripple", x: tx, y: ty, color: a.m.color, t: now });
            if (t.mode === "draw") {
              a.phase = "work";
              a.workMs = clamp(380 + Math.sqrt(b.w * b.h) * 1.05, 450, 1000) * rush;
            } else {
              a.phase = "grab";
              a.workMs = clamp(520 + Math.hypot(t.from.dx, t.from.dy) * 0.9, 650, 950) * rush;
            }
            a.phaseAt = now;
          }
          continue;
        } else if (a.phase === "grab" && t?.doc) {
          // card materialises in the cursor's hand
          const p = clamp((now - a.phaseAt) / 170, 0, 1);
          imp(t.el, "opacity", String(p));
          const g = gripOf(view(t.doc));
          a.x = g.x + t.from.dx;
          a.y = g.y + t.from.dy;
          if (p >= 1) { a.phase = "work"; a.phaseAt = now; }
          continue;
        } else if (a.phase === "work" && t?.doc) {
          const b = view(t.doc);
          const p = clamp((now - a.phaseAt) / a.workMs, 0, 1);
          if (t.mode === "draw") {
            const e = easeInOutCubic(p);
            // a touch of lag on y makes the stroke feel hand-drawn
            const ex = e, ey = easeInOutCubic(clamp(p * 1.08 - 0.04, 0, 1));
            imp(t.el, "clip-path", `inset(0 ${((1 - ex) * 100).toFixed(2)}% ${((1 - ey) * 100).toFixed(2)}% 0)`);
            a.x = clamp(b.x + b.w * ex, 6, w - 6);
            a.y = clamp(b.y + b.h * ey, 70, h - 10);
          } else {
            const e = easeOutBack(p);
            const k = 1 - e;
            const ox = t.from.dx * k, oy = t.from.dy * k;
            imp(t.el, "transform",
              `translate(${ox.toFixed(2)}px, ${oy.toFixed(2)}px) rotate(${(t.from.rot * k).toFixed(3)}deg) scale(${(0.94 + 0.06 * Math.min(1, e)).toFixed(4)})`);
            const g = gripOf(b);
            a.x = g.x + ox;
            a.y = g.y + oy;
          }
          if (p >= 1) complete(a, now);
          continue;
        } else if (a.phase === "place") {
          if (now - a.phaseAt > 260) a.phase = "idle";
        } else if (a.phase === "idle") {
          const cx = mouse.inside ? mouse.x : w / 2;
          const cy = mouse.inside ? mouse.y : h * 0.55;
          const dx = cx - a.x, dy = cy - a.y;
          const d = Math.hypot(dx, dy) || 0.01;
          const ring = mouse.inside ? 90 : Math.min(w, h) * 0.34;
          ax += (dx / d) * (d - ring) * 0.004;
          ay += (dy / d) * (d - ring) * 0.004;
          ax += (-dy / d) * 0.1 * a.orbitDir;
          ay += (dx / d) * 0.1 * a.orbitDir;
          let mvx = 0, mvy = 0, n = 0;
          for (const o of agents) {
            if (o === a || o.phase !== "idle") continue;
            if (Math.hypot(o.x - a.x, o.y - a.y) < 130) { mvx += o.vx; mvy += o.vy; n++; }
          }
          if (n) { ax += (mvx / n - a.vx) * 0.03; ay += (mvy / n - a.vy) * 0.03; }
        }

        a.vx = (a.vx + ax) * 0.92;
        a.vy = (a.vy + ay) * 0.92;
        const sp = Math.hypot(a.vx, a.vy);
        const max = a.phase === "fly" ? 18 : 5;
        if (sp > max) { a.vx = (a.vx / sp) * max; a.vy = (a.vy / sp) * max; }
        a.x += a.vx;
        a.y += a.vy;
      }

      // ---- render: work frames ----
      for (const a of agents) {
        const t = a.task;
        if (!t?.doc) continue;
        const b = view(t.doc);
        if (a.phase === "fly") {
          // faint ghost of where the block will live
          frame(b, a.m.color, 0.35 * crewAlpha, { dash: true });
        } else if (a.phase === "work" && t.mode === "draw") {
          const sel = { x: b.x, y: b.y, w: Math.max(0, a.x - b.x), h: Math.max(0, a.y - b.y) };
          frame(b, a.m.color, 0.22 * crewAlpha, { dash: true });
          frame(sel, a.m.color, crewAlpha, { fill: true, handles: true });
          sizeTag(sel, a.m.color, crewAlpha);
        } else if (a.phase === "grab" || (a.phase === "work" && t.mode === "drag")) {
          // destination ghost + live position frame + distance readout
          frame(b, a.m.color, 0.55 * crewAlpha, { dash: true, fill: true });
          const g = gripOf(b);
          const ox = a.x - g.x, oy = a.y - g.y;
          frame({ x: b.x + ox, y: b.y + oy, w: b.w, h: b.h }, a.m.color, 0.9 * crewAlpha, {});
          const dist = Math.hypot(ox, oy);
          if (dist > 14) {
            ctx.globalAlpha = 0.8 * crewAlpha;
            ctx.setLineDash([3, 4]);
            ctx.strokeStyle = a.m.color;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(g.x, g.y);
            ctx.stroke();
            ctx.setLineDash([]);
            pill((a.x + g.x) / 2 + 6, (a.y + g.y) / 2 - 9, `Δ ${Math.round(dist)}px`, "rgba(9,9,11,0.85)", a.m.color, fontMono, 4);
          }
        }
      }

      // ---- render: snap guides + ripples ----
      for (let i = fx.length - 1; i >= 0; i--) {
        const f = fx[i];
        if (f.kind === "snap") {
          const p = (now - f.t) / 700;
          if (p >= 1) { fx.splice(i, 1); continue; }
          const al = (1 - p) * crewAlpha;
          const b = f.box;
          // smart guides across the viewport
          ctx.globalAlpha = al * 0.9;
          ctx.strokeStyle = GUIDE;
          ctx.lineWidth = 1;
          ctx.setLineDash([2, 3]);
          ctx.beginPath();
          for (const y of [b.y, b.y + b.h]) { ctx.moveTo(0, y + 0.5); ctx.lineTo(w, y + 0.5); }
          for (const x of [b.x, b.x + b.w]) { ctx.moveTo(x + 0.5, 0); ctx.lineTo(x + 0.5, h); }
          ctx.stroke();
          ctx.setLineDash([]);
          // locked frame pulse
          const grow = p * 6;
          frame({ x: b.x - grow, y: b.y - grow, w: b.w + grow * 2, h: b.h + grow * 2 }, f.color, al, { handles: p < 0.4 });
          if (p < 0.75 && b.w > 90) {
            ctx.globalAlpha = al;
            pill(b.x + 4, clamp(b.y - 24, 66, h - 24), "✓ snapped", GUIDE, "#09090b", fontMono, 4);
          }
          ctx.globalAlpha = 1;
        } else {
          const p = (now - f.t) / 480;
          if (p >= 1) { fx.splice(i, 1); continue; }
          ctx.globalAlpha = (1 - p) * crewAlpha;
          ctx.beginPath();
          ctx.arc(f.x, f.y, 3 + p * 20, 0, Math.PI * 2);
          ctx.strokeStyle = f.color;
          ctx.lineWidth = 2;
          ctx.stroke();
          ctx.globalAlpha = 1;
        }
      }

      // ---- render: sparks ----
      for (let i = sparks.length - 1; i >= 0; i--) {
        const s = sparks[i];
        s.x += s.vx; s.y += s.vy;
        s.vx *= 0.93; s.vy *= 0.93;
        s.life -= 0.03;
        if (s.life <= 0) { sparks.splice(i, 1); continue; }
        ctx.globalAlpha = s.life * crewAlpha;
        ctx.fillStyle = s.color;
        ctx.fillRect(s.x - 1.2, s.y - 1.2, 2.4, 2.4);
      }
      ctx.globalAlpha = 1;

      // ---- render: cursors ----
      for (const a of agents) {
        ctx.globalAlpha = crewAlpha;
        const tilt = clamp(a.vx * 0.022, -0.22, 0.22);
        drawArrow(a.x, a.y, a.m.color, tilt, a.pressed);
        const working = a.phase === "fly" || a.phase === "grab" || a.phase === "work";
        pill(a.x + 13, a.y + 18, working ? `${a.m.name} · ${a.verb}…` : a.m.name, a.m.color);
      }
      ctx.globalAlpha = 1;

      // ---- render: live build HUD ----
      const hudA = clamp(1 - (now - lastBusy - 1800) / 600, 0, 1) * Math.min(1, crewAlpha * 1.2);
      if (hudA > 0.01 && seenCount > 0) {
        const active = agents.filter((a) => a.phase !== "idle" && a.phase !== "place").length;
        const blink = 0.55 + 0.45 * Math.sin(now / 180);
        ctx.globalAlpha = hudA;
        const x = 72, y = h - 46;
        ctx.font = fontMono;
        const text = `LIVE BUILD  ·  ${active} agent${active === 1 ? "" : "s"} working  ·  ${placedCount}/${seenCount} layers placed`;
        const tw = ctx.measureText(text).width;
        ctx.beginPath();
        ctx.roundRect(x, y, tw + 36, 26, 13);
        ctx.fillStyle = "rgba(9,9,11,0.82)";
        ctx.fill();
        ctx.strokeStyle = "rgba(34,211,238,0.45)";
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(x + 14, y + 13, 3.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(52,211,153,${blink})`;
        ctx.fill();
        ctx.fillStyle = "#e4e4e7";
        ctx.textBaseline = "middle";
        ctx.fillText(text, x + 26, y + 13.5);
        ctx.globalAlpha = 1;
      }
    };

    window.addEventListener("build:queue", onQueue);
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("build:queue", onQueue);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      for (const t of queue) revealNow(t.el);
      for (const a of agents) if (a.task) revealNow(a.task.el);
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden className="pointer-events-none fixed inset-0 z-[65]" />;
}
