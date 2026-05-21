import React from "react";
import { motion } from "motion/react";
import { CheckCircle2, DollarSign, Users, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Sell() {
  const navigate = useNavigate();
  const benefits = [
    {
      icon: <Users className="text-accent" />,
      title: "Massive Audience",
      desc: "Instant access to thousands of active buyers looking for their next pair."
    },
    {
      icon: <Zap className="text-accent" />,
      title: "Fast Payouts",
      desc: "Receive your funds directly to your wallet as soon as delivery is confirmed."
    },
    {
      icon: <DollarSign className="text-accent" />,
      title: "Installment Sales",
      desc: "We offer buyers installments, but you get paid the full amount upfront once verified."
    },
    {
      icon: <CheckCircle2 className="text-accent" />,
      title: "Trust & Safety",
      desc: "Every buyer is verified. We handle disputes and delivery logistics for you."
    }
  ];

  return (
    <div className="px-6 py-24">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center mb-32">
           <motion.div
             initial={{ opacity: 0, x: -50 }}
             animate={{ opacity: 1, x: 0 }}
           >
              <h1 className="text-[10vw] md:text-8xl font-display font-black uppercase tracking-tighter leading-[0.85] mb-8">
                Sell your <br /> <span className="text-accent">PAIR.</span>
              </h1>
              <p className="text-xl text-gray-500 mb-12 leading-relaxed">
                Turn your sneaker collection into cash. Join Nigeria's most trusted marketplace for authentic footwear.
              </p>
              <div className="flex flex-col sm:flex-row gap-6">
                 <button onClick={() => navigate("/vendor-onboarding")} className="btn-primary">Become a Vendor</button>
                 <button onClick={() => navigate("/support")} className="btn-outline">Vendor FAQ</button>
              </div>
           </motion.div>
           <motion.div
             initial={{ opacity: 0, scale: 0.9 }}
             animate={{ opacity: 1, scale: 1 }}
             className="relative"
           >
             <div className="aspect-[4/5] bg-gray-100 rounded-[3rem] overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1556906781-9a412961c28c?auto=format&fit=crop&q=80&w=1000" 
                  alt="Sneaker seller" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
             </div>
           </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
           {benefits.map((b, i) => (
             <div key={i} className="p-10 bg-gray-50 rounded-3xl">
                <div className="mb-6">{b.icon}</div>
                <h3 className="text-xl font-display font-black uppercase tracking-tighter mb-4 font-bold">{b.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{b.desc}</p>
             </div>
           ))}
        </div>
      </div>
    </div>
  );
}
