import * as React from "react";
import { useEffect, useRef, useState, type ReactNode, type CSSProperties } from "react";

type Variant = "up" | "left" | "right" | "scale" | "blur";

interface RevealProps {
  children: ReactNode;
  variant?: Variant;
  delay?: number;
  duration?: number;
  className?: string;
  as?: keyof React.JSX.IntrinsicElements;
  threshold?: number;
}

export function Reveal({
  children,
  variant = "up",
  delay = 0,
  duration = 700,
  className = "",
  as: Tag = "div",
  threshold = 0.15,
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setShown(true);
            obs.disconnect();
          }
        });
      },
      { threshold, rootMargin: "0px 0px -60px 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  const hidden: Record<Variant, CSSProperties> = {
    up: { opacity: 0, transform: "translateY(40px)" },
    left: { opacity: 0, transform: "translateX(-40px)" },
    right: { opacity: 0, transform: "translateX(40px)" },
    scale: { opacity: 0, transform: "scale(0.92)" },
    blur: { opacity: 0, filter: "blur(12px)", transform: "translateY(20px)" },
  };

  const style: CSSProperties = {
    transition: `opacity ${duration}ms cubic-bezier(0.22,1,0.36,1) ${delay}ms, transform ${duration}ms cubic-bezier(0.22,1,0.36,1) ${delay}ms, filter ${duration}ms ease ${delay}ms`,
    willChange: "opacity, transform, filter",
    ...(shown
      ? { opacity: 1, transform: "none", filter: "none" }
      : hidden[variant]),
  };

  const Component = Tag as any;
  return (
    <Component ref={ref} style={style} className={className}>
      {children}
    </Component>
  );
}
