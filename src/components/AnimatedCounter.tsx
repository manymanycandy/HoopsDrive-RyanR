import { motion, useInView, animate } from "framer-motion";
import { useRef, useEffect, useState } from "react";

interface AnimatedCounterProps {
  target: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  label: string;
}

const AnimatedCounter = ({ target, suffix = "", prefix = "", duration = 2, label }: AnimatedCounterProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const controls = animate(0, target, {
      duration,
      ease: "easeOut",
      onUpdate: (v) => setDisplayValue(Math.floor(v)),
    });
    return () => controls.stop();
  }, [isInView, target, duration]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      className="text-center"
    >
      <div className="font-display text-5xl md:text-6xl text-gradient-orange">
        {prefix}{displayValue.toLocaleString()}{suffix}
      </div>
      <div className="mt-2 text-sm uppercase tracking-widest text-muted-foreground font-body">
        {label}
      </div>
    </motion.div>
  );
};

export default AnimatedCounter;
