"use client";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import React from "react";

interface LoadingDotProps {
  className?: {
    dot?: string;
    container?: string;
  };
}

function LoadingDot({ className }: LoadingDotProps) {
  return (
    <div className={cn("flex items-end gap-2", className?.container)}>
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className={cn("bg-black rounded-full w-2 h-2", className?.dot)}
          initial={{ y: 0 }}
          animate={{ y: [0, -8, 0] }}
          transition={{
            duration: 0.6,
            repeat: Infinity,
            repeatDelay: 0.1,
            delay: i * 0.15,
          }}
        />
      ))}
    </div>
  );
}

export default LoadingDot;
