import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const TEXT = "ZEROCRASH";

interface IntroOverlayProps {
  onComplete: () => void;
}

export function IntroOverlay({ onComplete }: IntroOverlayProps) {
  const [show, setShow] = useState(true);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const t = setTimeout(() => {
      setShow(false);
      document.body.style.overflow = "";
      onComplete();
    }, 5000);
    return () => {
      clearTimeout(t);
      document.body.style.overflow = "";
    };
  }, [onComplete]);

  const letterStep = 0.18;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, filter: "blur(8px)" }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
        >
          {/* radial glow */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse at center, rgba(255,200,87,0.12), transparent 65%)",
            }}
          />
          {/* grid */}
          <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />

          <h1 className="relative font-mono font-bold text-5xl sm:text-7xl md:text-8xl lg:text-9xl tracking-tighter leading-none">
            <span className="sr-only">{TEXT}</span>
            <span
              className="relative inline-flex items-end justify-center"
              aria-hidden
            >
              {TEXT.split("").map((ch, i) => (
                <Letter key={i} ch={ch} delay={i * letterStep} />
              ))}
              <motion.span
                className="pointer-events-none absolute inset-y-0 left-0 w-[2px]"
                style={{
                  background:
                    "linear-gradient(to bottom, transparent, var(--cyan), transparent)",
                  boxShadow: "0 0 24px 4px var(--cyan)",
                }}
                initial={{ x: "-10%", opacity: 0 }}
                animate={{ x: ["-5%", "105%"], opacity: [0, 1, 1, 0] }}
                transition={{
                  duration: 2.6,
                  delay: 0.2,
                  times: [0, 0.05, 0.95, 1],
                  ease: "easeInOut",
                }}
              />
            </span>
          </h1>

          <motion.div
            className="absolute bottom-16 font-mono text-xs uppercase tracking-[0.5em] text-cyan/70"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 1, 0.4] }}
            transition={{ duration: 4.5, times: [0, 0.4, 0.85, 1] }}
          >
            initializing<span className="cursor-blink h-3 align-middle" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Letter({ ch, delay }: { ch: string; delay: number }) {
  return (
    <span className="relative inline-block" style={{ perspective: 600 }}>
      <motion.span
        className="relative inline-block"
        initial={{
          y: -60,
          rotateX: -75,
          opacity: 0,
          filter: "blur(14px) brightness(2.4)",
          color: "#FFC857",
          textShadow: "0 0 30px rgba(255,200,87,0.9)",
        }}
        animate={{
          y: [-60, 6, -2, 0],
          rotateX: [-75, 8, -3, 0],
          opacity: [0, 1, 1, 1],
          filter: [
            "blur(14px) brightness(2.4)",
            "blur(2px) brightness(1.8)",
            "blur(0px) brightness(1.2)",
            "blur(0px) brightness(1)",
          ],
          color: ["#FFC857", "#FFE6A8", "#FFD27A", "#FFFFFF"],
          textShadow: [
            "0 0 30px rgba(255,200,87,0.9)",
            "0 0 24px rgba(255,200,87,0.7)",
            "0 0 16px rgba(255,200,87,0.5)",
            "0 0 12px rgba(255,200,87,0.4)",
          ],
        }}
        transition={{
          delay,
          duration: 1.1,
          times: [0, 0.55, 0.8, 1],
          ease: [0.16, 1, 0.3, 1],
        }}
      >
        {ch}
      </motion.span>

      <motion.span
        className="absolute left-1/2 -bottom-1 h-[3px] -translate-x-1/2"
        style={{
          background:
            "linear-gradient(90deg, transparent, var(--cyan), transparent)",
          boxShadow: "0 0 14px var(--cyan)",
        }}
        initial={{ width: 0, opacity: 0 }}
        animate={{
          width: ["0%", "120%", "90%", "0%"],
          opacity: [0, 1, 0.7, 0],
        }}
        transition={{
          delay: delay + 0.3,
          duration: 1.3,
          times: [0, 0.3, 0.7, 1],
          ease: "easeOut",
        }}
      />

      <Sparks delay={delay + 0.4} />
    </span>
  );
}

function Sparks({ delay }: { delay: number }) {
  const sparks = Array.from({ length: 6 });
  return (
    <span className="pointer-events-none absolute inset-0 flex items-center justify-center">
      {sparks.map((_, i) => {
        const angle = (i / sparks.length) * Math.PI * 2;
        const dist = 28 + (i % 2) * 10;
        return (
          <motion.span
            key={i}
            className="absolute size-[3px] rounded-full"
            style={{
              background: "var(--cyan)",
              boxShadow: "0 0 8px var(--cyan)",
            }}
            initial={{ x: 0, y: 0, opacity: 0, scale: 0.6 }}
            animate={{
              x: Math.cos(angle) * dist,
              y: Math.sin(angle) * dist,
              opacity: [0, 1, 0],
              scale: [0.6, 1, 0.4],
            }}
            transition={{ delay, duration: 0.7, ease: "easeOut" }}
          />
        );
      })}
    </span>
  );
}