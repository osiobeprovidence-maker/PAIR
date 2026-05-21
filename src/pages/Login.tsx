import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Lock, Mail, ArrowRight } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [mode, setMode] = useState<"initial" | "email">("initial");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === "riderizzy.gg@gmail.com") {
      login({ name: "Rider Izzy", email, role: "admin" });
    } else {
      login();
    }
    navigate("/dashboard");
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-6 py-20">
      <div className="max-w-md w-full">
        <div className="text-center mb-12">
           <h1 className="text-4xl uppercase mb-4 tracking-tighter">Welcome Back</h1>
           <p className="text-gray-500">Access your PAIR marketplace account.</p>
        </div>

        {mode === "initial" ? (
          <div className="space-y-4">
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
              <span className="text-xs font-bold uppercase tracking-widest text-gray-700">Sign in with Google</span>
            </button>

            <button 
              onClick={() => setMode("email")}
              className="w-full py-5 bg-black text-white rounded-full flex items-center justify-center space-x-3 hover:bg-accent transition-colors shadow-lg"
            >
              <Mail size={18} />
              <span className="text-xs font-bold uppercase tracking-widest">Continue with Email</span>
            </button>
          </div>
        ) : (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <form onSubmit={handleLogin} className="space-y-8">
               <div className="space-y-6">
                  <div>
                    <label className="block text-[10px] uppercase font-bold tracking-widest text-gray-400 mb-2">Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-0 top-3 text-gray-300" size={18} />
                      <input 
                        type="email" 
                        required
                        className="w-full border-b-2 border-gray-100 py-3 pl-8 focus:border-black outline-none transition-all"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
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

               <div className="flex items-center justify-between text-xs font-bold uppercase tracking-widest">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input type="checkbox" className="w-4 h-4 rounded border-gray-200 text-black focus:ring-black" />
                    <span className="text-gray-500">Remember Me</span>
                  </label>
                  <Link to="#" className="text-gray-400 hover:text-black transition-colors">Forgot Password?</Link>
               </div>

               <button type="submit" className="btn-primary w-full py-5 flex items-center justify-center space-x-3">
                  <span>Sign In</span>
                  <ArrowRight size={18} />
               </button>
            </form>

            <button 
              onClick={() => setMode("initial")}
              className="w-full text-center text-xs uppercase font-bold tracking-widest text-gray-400 hover:text-black transition-colors"
            >
              Back to options
            </button>
          </div>
        )}

        <div className="mt-12 text-center">
           <p className="text-sm text-gray-500 mb-4">Don't have an account?</p>
           <Link to="/signup" className="text-xs uppercase font-bold tracking-widest border-b border-black pb-1 hover:text-accent hover:border-accent transition-all">
             Create an account
           </Link>
        </div>
      </div>
    </div>
  );
}
