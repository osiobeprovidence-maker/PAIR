import React from "react";
import { motion } from "motion/react";
import { Search, ShieldCheck, Truck, CreditCard } from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      icon: <Search size={32} />,
      title: "Find your PAIR",
      desc: "Browse through thousands of verified listings from trusted vendors across Nigeria."
    },
    {
      icon: <ShieldCheck size={32} />,
      title: "Verified Check",
      desc: "Our team reviews every listing to ensure details, condition, and authenticity match the post."
    },
    {
      icon: <CreditCard size={32} />,
      title: "Secure Payment",
      desc: "Pay in full or choose 'Pay Small-Small' to split your payment into manageable installments."
    },
    {
      icon: <Truck size={32} />,
      title: "Insured Delivery",
      desc: "Get your package delivered safely to your doorstep with real-time tracking."
    }
  ];

  return (
    <div className="px-6 py-24 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-24"
      >
        <h1 className="text-6xl md:text-8xl font-display font-black uppercase tracking-tighter mb-6">How it works</h1>
        <p className="text-gray-500 text-xl max-w-2xl mx-auto">The seamless journey from discovery to delivery.</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {steps.map((s, i) => (
          <div key={i} className="p-10 border border-gray-100 rounded-3xl hover:shadow-xl transition-all group">
            <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center text-accent mb-8 group-hover:bg-black group-hover:text-white transition-colors">
              {s.icon}
            </div>
            <h3 className="text-2xl font-display font-black uppercase tracking-tighter mb-4">{s.title}</h3>
            <p className="text-gray-500 text-sm leading-relaxed">{s.desc}</p>
          </div>
        ))}
      </div>
      
      <div className="mt-32 p-12 bg-black text-white rounded-[3rem] text-center">
         <h2 className="text-4xl uppercase font-black tracking-tighter mb-6">Ready to step up?</h2>
         <p className="text-gray-400 mb-12">Join over 10,000+ satisfied sneakerheads in Nigeria.</p>
         <button className="bg-accent text-white px-12 py-5 rounded-full font-black uppercase tracking-widest text-xs hover:bg-white hover:text-black transition-all">
           Explore Marketplace
         </button>
      </div>
    </div>
  );
}
