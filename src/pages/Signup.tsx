import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Lock, Mail, ArrowRight, User, Phone, CheckCircle2 } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function Signup() {
  const [mode, setMode] = useState<"initial" | "email">("initial");
  const [role, setRole] = useState<"customer" | "vendor">("customer");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/dashboard");
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-6 py-20">
      <div className="max-w-xl w-full">
        <div className="text-center mb-12">
           <h1 className="text-4xl uppercase mb-4 tracking-tighter">Join PAIR</h1>
           <p className="text-gray-500">The premier destination for sneaker culture in Nigeria.</p>
        </div>

        {mode === "initial" ? (
          <div className="space-y-4 max-w-md mx-auto">
            <button 
              onClick={() => {
                login();
                navigate("/dashboard");
              }}
              type="button"
              className="w-full py-5 border border-gray-200 rounded-full flex items-center justify-center space-x-3 hover:bg-gray-50 transition-colors shadow-sm"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.84z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              <span className="text-xs font-bold uppercase tracking-widest text-gray-700">Sign up with Google</span>
            </button>

            <button 
              onClick={() => setMode("email")}
              className="w-full py-5 bg-black text-white rounded-full flex items-center justify-center space-x-3 hover:bg-accent transition-colors shadow-lg"
            >
              <Mail size={18} />
              <span className="text-xs font-bold uppercase tracking-widest">Sign up with Email</span>
            </button>
          </div>
        ) : (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="grid grid-cols-2 gap-4 mb-12">
               <button 
                onClick={() => setRole("customer")}
                className={`p-6 rounded-2xl border-2 text-left transition-all ${role === "customer" ? 'border-black bg-white shadow-xl' : 'border-gray-100 bg-gray-50'}`}
               >
                  <User size={24} className={role === "customer" ? "text-accent" : "text-gray-300"} />
                  <p className={`mt-4 font-bold uppercase tracking-widest text-[10px] ${role === "customer" ? 'text-black' : 'text-gray-400'}`}>Customer</p>
                  <p className="text-[10px] text-gray-500 mt-1">Browse and buy verified pairs.</p>
               </button>
               <button 
                onClick={() => setRole("vendor")}
                className={`p-6 rounded-2xl border-2 text-left transition-all ${role === "vendor" ? 'border-black bg-white shadow-xl' : 'border-gray-100 bg-gray-50'}`}
               >
                  <CheckCircle2 size={24} className={role === "vendor" ? "text-accent" : "text-gray-300"} />
                  <p className={`mt-4 font-bold uppercase tracking-widest text-[10px] ${role === "vendor" ? 'text-black' : 'text-gray-400'}`}>Vendor</p>
                  <p className="text-[10px] text-gray-500 mt-1">Sell your premium inventory.</p>
               </button>
            </div>

            <form onSubmit={handleSignup} className="space-y-8">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <label className="block text-[10px] uppercase font-bold tracking-widest text-gray-400 mb-2">Display Name</label>
                    <div className="relative">
                      <User className="absolute left-0 top-3 text-gray-300" size={18} />
                      <input 
                        type="text" 
                        required
                        className="w-full border-b-2 border-gray-100 py-3 pl-8 focus:border-black outline-none transition-all"
                        placeholder="John Doe"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase font-bold tracking-widest text-gray-400 mb-2">Phone Number</label>
                    <div className="relative">
                      <Phone className="absolute left-0 top-3 text-gray-300" size={18} />
                      <input 
                        type="tel" 
                        required
                        className="w-full border-b-2 border-gray-100 py-3 pl-8 focus:border-black outline-none transition-all"
                        placeholder="+234..."
                      />
                    </div>
                  </div>
               </div>

               <div className="space-y-6">
                  <div>
                    <label className="block text-[10px] uppercase font-bold tracking-widest text-gray-400 mb-2">Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-0 top-3 text-gray-300" size={18} />
                      <input 
                        type="email" 
                        required
                        className="w-full border-b-2 border-gray-100 py-3 pl-8 focus:border-black outline-none transition-all"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase font-bold tracking-widest text-gray-400 mb-2">Password</label>
                    <div className="relative">
                      <Lock className="absolute left-0 top-3 text-gray-300" size={18} />
                      <input 
                        type="password" 
                        required
                        className="w-full border-b-2 border-gray-100 py-3 pl-8 focus:border-black outline-none transition-all"
                        placeholder="••••••••"
                      />
                    </div>
                  </div>
               </div>

               <p className="text-[10px] text-gray-400 text-center leading-relaxed">
                 By clicking "Create Account", you agree to PAIR's Terms of Service and Verification Policies.
               </p>

               <button type="submit" className="btn-primary w-full py-5 flex items-center justify-center space-x-3">
                  <span>Create {role} Account</span>
                  <ArrowRight size={18} />
               </button>
            </form>

            <button 
              onClick={() => setMode("initial")}
              className="w-full text-center mt-8 text-xs uppercase font-bold tracking-widest text-gray-400 hover:text-black transition-colors"
            >
              Back to options
            </button>
          </div>
        )}

        <div className="mt-12 text-center">
           <p className="text-sm text-gray-500 mb-4">Already have an account?</p>
           <Link to="/login" className="text-xs uppercase font-bold tracking-widest border-b border-black pb-1 hover:text-accent hover:border-accent transition-all">
             Sign in instead
           </Link>
        </div>
      </div>
    </div>
  );
}
