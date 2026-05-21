import React from "react";
import { motion } from "motion/react";

export default function About() {
  return (
    <div className="px-6 py-24 max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-[12vw] md:text-8xl font-display font-black uppercase tracking-tighter leading-none mb-12">
          Beyond the <br /> <span className="text-accent italic font-light">marketplace.</span>
        </h1>
        
        <div className="space-y-12 text-xl text-gray-600 leading-relaxed font-medium">
          <p>
            PAIR was born in Lagos with a simple mission: to build the most trusted footwear marketplace in Africa. We saw a culture obsessed with sneakers but plagued by uncertainty—uncertainty about authenticity, quality, and delivery.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 py-12">
            <div className="p-10 bg-gray-50 rounded-3xl">
               <h3 className="text-black font-black uppercase tracking-widest text-xs mb-4">Our Vision</h3>
               <p className="text-sm">To ensure every Nigerian can step out in confidence, knowing their PAIR is 100% authentic and verified.</p>
            </div>
            <div className="p-10 bg-black text-white rounded-3xl">
               <h3 className="text-accent font-black uppercase tracking-widest text-xs mb-4">Our Values</h3>
               <p className="text-sm">Trust, transparency, and the pursuit of excellence in every shipment.</p>
            </div>
          </div>

          <p>
            Every vendor on our platform undergoes a rigorous identification process, including NIN and live verification. We don't just facilitate sales; we protect the culture.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
