import { motion } from "motion/react";

export default function AnnouncementBar() {
  const text = "Free Delivery to Lagos, Abuja & PH on orders above ₦150k • Verified PAIRs only • ";

  return (
    <div className="bg-black text-white py-2 h-10 flex items-center overflow-hidden border-b border-white/10 uppercase font-black tracking-[0.2em] text-[10px]">
      <motion.div 
        animate={{ x: [0, "-50%"] }}
        transition={{ 
          duration: 20, 
          ease: "linear", 
          repeat: Infinity 
        }}
        className="flex whitespace-nowrap"
      >
        <span>{text}</span>
        <span>{text}</span>
        <span>{text}</span>
        <span>{text}</span>
      </motion.div>
    </div>
  );
}
