import { Link } from "react-router-dom";
import { Instagram, Twitter, Facebook, Globe } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-black text-white pt-24 pb-12 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-24">
        <div className="col-span-1 md:col-span-1">
          <Link to="/" className="text-3xl font-display font-black tracking-tighter">
            PAIR<span className="text-accent">.</span>
          </Link>
          <p className="mt-6 text-gray-400 text-sm leading-relaxed max-w-xs">
            Nigeria's premium footwear marketplace. Verified vendors. Quality checked. Trust delivered.
          </p>
          <div className="flex space-x-6 mt-8">
            <a href="#" className="h-10 w-10 border border-white/10 rounded-full flex items-center justify-center hover:bg-white hover:text-black transition-all"><Instagram size={18} /></a>
            <a href="#" className="h-10 w-10 border border-white/10 rounded-full flex items-center justify-center hover:bg-white hover:text-black transition-all"><Twitter size={18} /></a>
            <a href="#" className="h-10 w-10 border border-white/10 rounded-full flex items-center justify-center hover:bg-white hover:text-black transition-all"><Facebook size={18} /></a>
          </div>
        </div>

        <div>
          <h4 className="font-display font-black uppercase tracking-[0.2em] text-[10px] text-accent mb-8">Shop</h4>
          <ul className="space-y-4 text-xs font-bold uppercase tracking-widest text-gray-500">
            <li><Link to="/?category=Sneakers" className="hover:text-white transition-colors">Sneakers</Link></li>
            <li><Link to="/?category=Slides" className="hover:text-white transition-colors">Slides</Link></li>
            <li><Link to="/?category=Corporate" className="hover:text-white transition-colors">Corporate</Link></li>
            <li><Link to="/?condition=Fairly Used" className="hover:text-white transition-colors">Pre-owned</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-display font-black uppercase tracking-[0.2em] text-[10px] text-accent mb-8">Company</h4>
          <ul className="space-y-4 text-xs font-bold uppercase tracking-widest text-gray-500">
            <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
            <li><Link to="/how-it-works" className="hover:text-white transition-colors">How it works</Link></li>
            <li><Link to="/sell" className="hover:text-white transition-colors">Sell on PAIR</Link></li>
            <li><Link to="#" className="hover:text-white transition-colors">Privacy Policy</Link></li>
          </ul>
        </div>

        <div>
           <h4 className="font-display font-black uppercase tracking-[0.2em] text-[10px] text-accent mb-8">Support</h4>
           <ul className="space-y-4 text-xs font-bold uppercase tracking-widest text-gray-500">
            <li><Link to="/support#help" className="hover:text-white transition-colors">Help Center</Link></li>
            <li><Link to="/support#delivery" className="hover:text-white transition-colors">Delivery Cities</Link></li>
            <li><Link to="/support#verification" className="hover:text-white transition-colors">Verification Process</Link></li>
            <li><Link to="#" className="hover:text-white transition-colors">Contact Us</Link></li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-12 border-t border-white/10 flex flex-col items-center space-y-12">
        <div className="flex items-center space-x-2 text-xs font-bold text-gray-500">
           <Globe size={14} />
           <Link to="#" className="hover:text-white flex items-center">
             Nigeria (NGN ₦)
           </Link>
        </div>
        
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 text-[10px] uppercase font-bold tracking-widest text-gray-400">
          <Link to="/support" className="hover:text-white transition-colors">Refund policy</Link>
          <Link to="/support" className="hover:text-white transition-colors">Shipping</Link>
          <Link to="#" className="hover:text-white transition-colors">Privacy policy</Link>
          <Link to="#" className="hover:text-white transition-colors">Terms of service</Link>
          <Link to="#" className="hover:text-white transition-colors">Cancellations</Link>
          <Link to="#" className="hover:text-white transition-colors">Contact information</Link>
        </div>

        <div className="text-[9px] font-bold text-gray-600 uppercase tracking-[0.3em]">
          © 2024 PAIR MARKETPLACE - BUILT FOR THE CULTURE
        </div>
      </div>
    </footer>
  );
}
