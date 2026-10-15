"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion, useMotionTemplate } from "motion/react";

/**
 * Panel with a restrained 3D tilt and a cursor spotlight.
 * Only reacts to fine pointers; static for touch and reduced motion.
 */
export default function TiltPanel({
  children,
  className = "",
  spotlight = "rgb(255 255 255 / 0.10)",
  max = 5,
}: {
  children: React.ReactNode;
  className?: string;
  spotlight?: string;
  max?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);
  const sx = useSpring(x, { stiffness: 160, damping: 22 });
  const sy = useSpring(y, { stiffness: 160, damping: 22 });
  const rotateY = useTransform(sx, [0, 1], [-max, max]);
  const rotateX = useTransform(sy, [0, 1], [max, -max]);
  const mx = useTransform(x, (v) => `${v * 100}%`);
  const my = useTransform(y, (v) => `${v * 100}%`);
  const glow = useMotionTemplate`radial-gradient(480px circle at ${mx} ${my}, ${spotlight}, transparent 60%)`;

  const onMove = (e: React.PointerEvent) => {
    if (reduce || e.pointerType !== "mouse" || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - r.left) / r.width);
    y.set((e.clientY - r.top) / r.height);
  };
  const onLeave = () => {
    x.set(0.5);
    y.set(0.5);
  };

  return (
    <div style={{ perspective: 1200 }} className="h-full">
      <motion.div
        ref={ref}
        onPointerMove={onMove}
        onPointerLeave={onLeave}
        style={reduce ? undefined : { rotateX, rotateY, transformStyle: "preserve-3d" }}
        className={`group relative h-full overflow-hidden ${className}`}
      >
        {children}
        <motion.div
          aria-hidden="true"
          style={{ background: glow }}
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        />
      </motion.div>
    </div>
  );
}
