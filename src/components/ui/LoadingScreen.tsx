import React from "react";
import { motion } from "motion/react";

export default function LoadingScreen() {
  return (
    <motion.div 
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center overflow-hidden"
    >
      <div className="relative flex flex-col items-center">
        {/* Animated Brand Logo */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, letterSpacing: "-0.05em" }}
          animate={{ 
            opacity: 1, 
            scale: 1,
            letterSpacing: "0.01em"
          }}
          transition={{ 
            duration: 1.2,
            ease: [0.22, 1, 0.36, 1]
          }}
          className="text-7xl md:text-9xl font-display font-black text-white tracking-tighter mb-4"
        >
          PAIR<span className="text-accent">.</span>
        </motion.div>

        {/* Progress Container */}
        <div className="w-48 md:w-64 h-[1px] bg-white/10 relative overflow-hidden">
          <motion.div 
            initial={{ left: "-100%" }}
            animate={{ left: "100%" }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute top-0 bottom-0 w-1/2 bg-gradient-to-r from-transparent via-white to-transparent"
          />
        </div>

        {/* Status Text with Staggered Glow */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mt-8 flex flex-col items-center gap-2"
        >
          <p className="text-[10px] md:text-xs font-bold uppercase tracking-[0.6em] text-white/40">
            Authenticated Streetwear
          </p>
          <div className="flex gap-1">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                animate={{ opacity: [0.2, 1, 0.2] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
                className="w-1 h-1 rounded-full bg-accent"
              />
            ))}
          </div>
        </motion.div>
      </div>

      {/* Decorative Background Elements */}
      <motion.div 
        animate={{ 
          opacity: [0, 0.05, 0],
          scale: [1, 1.2, 1]
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,107,0,0.15)_0%,transparent_70%)] pointer-events-none"
      />
    </motion.div>
  );
}
