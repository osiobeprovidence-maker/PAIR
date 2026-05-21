import React, { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function VendorOnboarding() {
  const { user, updateRole } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  if (!user) {
    return <Navigate to="/login" />;
  }

  const handleComplete = (e: React.FormEvent) => {
    e.preventDefault();
    updateRole("vendor");
    navigate("/dashboard");
  };

  return (
    <div className="max-w-xl mx-auto py-12 md:py-24 px-6 text-center">
      <h2 className="text-3xl md:text-5xl font-display font-medium mb-12">Become a Vendor</h2>
      
      <div className="bg-white border border-gray-100 rounded-[2rem] p-8 md:p-12 shadow-sm text-left">
        {step === 1 && (
          <form onSubmit={(e) => { e.preventDefault(); setStep(2); }} className="space-y-6">
            <h3 className="text-xl font-medium mb-4">Step 1: Store Information</h3>
            <div>
              <label className="block text-[10px] uppercase font-bold tracking-widest text-gray-400 mb-2">Store Name</label>
              <input type="text" required className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 outline-none focus:border-black transition-colors" placeholder="e.g. My Sneaker Shop" />
            </div>
            <div>
              <label className="block text-[10px] uppercase font-bold tracking-widest text-gray-400 mb-2">Social Media Link (Optional)</label>
              <input type="url" className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 outline-none focus:border-black transition-colors" placeholder="e.g. instagram.com/myshop" />
            </div>
            <button type="submit" className="btn-primary w-full mt-8 py-4">Next Step</button>
          </form>
        )}
        
        {step === 2 && (
          <form onSubmit={(e) => { e.preventDefault(); setStep(3); }} className="space-y-6">
            <h3 className="text-xl font-medium mb-4">Step 2: Verification</h3>
            <p className="text-sm text-gray-500 leading-relaxed mb-6">
              To maintain the highest quality standards, all vendors must be verified. We require your National Identity Number (NIN) or Bank Verification Number (BVN). Your data is securely encrypted.
            </p>
            <div>
              <label className="block text-[10px] uppercase font-bold tracking-widest text-gray-400 mb-2">NIN or BVN (11 Digits)</label>
              <input type="text" required pattern="\d{11}" maxLength={11} className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 outline-none focus:border-black transition-colors" placeholder="00000000000" />
            </div>
            <div className="flex space-x-4 pt-4">
              <button type="button" onClick={() => setStep(1)} className="btn-outline flex-1 py-4">Back</button>
              <button type="submit" className="btn-primary flex-1 py-4">Next Step</button>
            </div>
          </form>
        )}

        {step === 3 && (
          <form onSubmit={handleComplete} className="space-y-6">
            <h3 className="text-xl font-medium mb-4">Step 3: Payout Details</h3>
            <p className="text-sm text-gray-500 leading-relaxed mb-6">
              Enter the bank account where your earnings will be paid into. Must match your verified identity.
            </p>
            <div>
              <label className="block text-[10px] uppercase font-bold tracking-widest text-gray-400 mb-2">Select Bank</label>
              <select required className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 outline-none focus:border-black transition-colors">
                 <option value="">Choose a bank...</option>
                 <option value="access">Access Bank</option>
                 <option value="gtb">Guaranty Trust Bank</option>
                 <option value="firstbank">First Bank of Nigeria</option>
                 <option value="uba">United Bank for Africa (UBA)</option>
                 <option value="zenith">Zenith Bank</option>
                 <option value="moniepoint">Moniepoint</option>
                 <option value="opay">OPay</option>
              </select>
            </div>
            <div>
              <label className="block text-[10px] uppercase font-bold tracking-widest text-gray-400 mb-2">Account Number (10 Digits)</label>
              <input type="text" required pattern="\d{10}" maxLength={10} className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 outline-none focus:border-black transition-colors" placeholder="0000000000" />
            </div>
            <div className="flex space-x-4 pt-4">
              <button type="button" onClick={() => setStep(2)} className="btn-outline flex-1 py-4">Back</button>
              <button type="submit" className="btn-primary flex-1 py-4">Complete Setup</button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
