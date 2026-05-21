import React from "react";
import { motion } from "motion/react";
import { MapPin, ShieldCheck, HelpCircle } from "lucide-react";

export default function Support() {
  return (
    <div className="px-6 py-24 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-24">
        {/* Help Center */}
        <div id="help">
          <div className="flex items-center space-x-4 mb-8">
             <HelpCircle className="text-accent" size={32} />
             <h2 className="text-4xl font-display font-black uppercase tracking-tighter">Help Center</h2>
          </div>
          <div className="space-y-6">
             <div>
                <p className="font-bold uppercase tracking-widest text-[10px] text-gray-400 mb-2">Refund Policy</p>
                <p className="text-sm text-gray-600">We offer a 48-hour return window if the item doesn't match the description.</p>
             </div>
             <div>
                <p className="font-bold uppercase tracking-widest text-[10px] text-gray-400 mb-2">Payment Issues</p>
                <p className="text-sm text-gray-600">Contact billing@pair.ng if you have any issues with your installment plan.</p>
             </div>
             <div>
                <p className="font-bold uppercase tracking-widest text-[10px] text-gray-400 mb-2">Order Tracking</p>
                <p className="text-sm text-gray-600">You can track your order in real-time from your profile dashboard.</p>
             </div>
          </div>
        </div>

        {/* Delivery Cities */}
        <div id="delivery">
          <div className="flex items-center space-x-4 mb-8">
             <MapPin className="text-accent" size={32} />
             <h2 className="text-4xl font-display font-black uppercase tracking-tighter">Delivery</h2>
          </div>
          <div className="grid grid-cols-2 gap-4">
             {["Lagos", "Abuja", "Port Harcourt", "Ibadan", "Kano", "Enugu", "Asaba", "Kaduna"].map(city => (
               <div key={city} className="bg-gray-50 p-4 rounded-xl text-center">
                  <p className="text-xs font-bold uppercase tracking-widest">{city}</p>
               </div>
             ))}
          </div>
          <p className="mt-8 text-[10px] text-gray-400 uppercase font-medium">Nationwide delivery coming soon.</p>
        </div>

        {/* Verification */}
        <div id="verification">
          <div className="flex items-center space-x-4 mb-8">
             <ShieldCheck className="text-accent" size={32} />
             <h2 className="text-4xl font-display font-black uppercase tracking-tighter">Verification</h2>
          </div>
          <p className="text-sm text-gray-600 leading-relaxed mb-6">
            Our multi-step verification process ensures the highest quality standards:
          </p>
          <ul className="space-y-4">
             <li className="flex items-start space-x-3">
                <div className="w-5 h-5 rounded-full bg-accent flex-shrink-0 mt-0.5" />
                <p className="text-xs font-bold">Image Consistency Check</p>
             </li>
             <li className="flex items-start space-x-3">
                <div className="w-5 h-5 rounded-full bg-accent flex-shrink-0 mt-0.5" />
                <p className="text-xs font-bold">Vendor ID (NIN) Validation</p>
             </li>
             <li className="flex items-start space-x-3">
                <div className="w-5 h-5 rounded-full bg-accent flex-shrink-0 mt-0.5" />
                <p className="text-xs font-bold">Shipping Inspection (for Premium)</p>
             </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
