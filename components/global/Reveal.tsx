"use client";
import { cn } from "@/lib/utils";
import { motion, useInView, useAnimation } from "framer-motion";
import { useEffect, useRef } from "react";

interface IRevealAnimation {
  children: React.ReactNode;
  side?: boolean;
  style?: string;
}

export const RevealAnimation: React.FC<IRevealAnimation> = ({
  children,
  side = false,
  style,
}: IRevealAnimation) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const mainControls = useAnimation();

  useEffect(() => {
    if (isInView) {
      mainControls.start("visible");
    }
  }, [isInView, mainControls]);

  return (
    <motion.div
      ref={ref}
      className={cn("relative w-fit ", style && style)}
      variants={{
        hidden: side ? { opacity: 0, x: -50 } : { opacity: 0, y: 65 },
        visible: side ? { opacity: 1, x: 0 } : { opacity: 1, y: 0 },
      }}
      initial="hidden"
      animate={mainControls}
      transition={{ duration: 0.6, delay: 0.25 }}
    >
      {children}
    </motion.div>
  );
};
