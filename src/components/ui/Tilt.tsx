import { useEffect, useRef, type ReactNode } from "react";
import { gsap, isCoarsePointer, prefersReducedMotion } from "../../lib/motion";

/** Subtle 3D tilt following the pointer. Disabled on touch & reduced-motion. */
export function Tilt({
  children,
  max = 5,
  className = "",
  style,
}: {
  children: ReactNode;
  max?: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  const wrap = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const w = wrap.current;
    const el = inner.current;
    if (!w || !el || isCoarsePointer() || prefersReducedMotion()) return;
    const rx = gsap.quickTo(el, "rotationX", { duration: 0.9, ease: "power3.out" });
    const ry = gsap.quickTo(el, "rotationY", { duration: 0.9, ease: "power3.out" });
    const move = (e: MouseEvent) => {
      const r = w.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      ry(px * max * 2);
      rx(-py * max * 2);
    };
    const leave = () => {
      rx(0);
      ry(0);
    };
    w.addEventListener("mousemove", move);
    w.addEventListener("mouseleave", leave);
    return () => {
      w.removeEventListener("mousemove", move);
      w.removeEventListener("mouseleave", leave);
    };
  }, [max]);

  return (
    <div ref={wrap} className={className} style={{ perspective: 1400, ...style }}>
      <div ref={inner} className="h-full w-full" style={{ transformStyle: "preserve-3d", willChange: "transform" }}>
        {children}
      </div>
    </div>
  );
}
