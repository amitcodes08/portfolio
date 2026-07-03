"use client";

import { motion } from "framer-motion";

interface SectionDividerProps {
  variant?: "dotted" | "gradient" | "mixed";
  className?: string;
}

export default function SectionDivider({
  variant = "mixed",
  className = "",
}: SectionDividerProps) {
  return (
    <div className={`relative py-8 ${className}`}>
      <motion.div
        className="relative mx-auto"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      >
        {variant === "dotted" && (
          <div className="flex items-center justify-center gap-2">
            {Array.from({ length: 40 }).map((_, i) => (
              <motion.div
                key={i}
                className="w-1 h-1 rounded-full"
                style={{ background: "var(--border)" }}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.02, duration: 0.3 }}
              />
            ))}
          </div>
        )}

        {variant === "gradient" && (
          <div className="line-h-accent w-full max-w-xl mx-auto" />
        )}

        {variant === "mixed" && (
          <div className="flex items-center justify-center gap-4">
            <div className="line-h flex-1 max-w-32" />
            <div className="flex gap-1.5">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="w-1.5 h-1.5 rounded-full"
                  style={{
                    background:
                      i === 1
                        ? "var(--accent-cyan)"
                        : "var(--accent-emerald)",
                  }}
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.3,
                  }}
                />
              ))}
            </div>
            <div className="line-h flex-1 max-w-32" />
          </div>
        )}
      </motion.div>
    </div>
  );
}
