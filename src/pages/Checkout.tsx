import { useState } from "react";
import { useCart } from "../context/CartContext";
import { formatCurrency } from "../lib/utils";
import { CheckCircle2, ChevronRight, Truck, ShieldCheck, CreditCard } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
  const { items, total, subtotal, totalDelivery, clearCart } = useCart();
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  const [installmentConfig, setInstallmentConfig] = useState({
    type: "weekly" as "weekly" | "monthly",
    split: 4, // default 4 weeks/months
  });

  const hasInstallments = items.some(item => item.paymentOption === "installment");

  const [address, setAddress] = useState({
    fullName: "",
    street: "",
    city: "",
    state: "Lagos",
    phoneNumber: ""
  });

  if (items.length === 0 && step !== 3) {
    return (
      <div className="py-40 text-center">
        <h1 className="text-3xl uppercase mb-8">Cart is empty.</h1>
        <button onClick={() => navigate("/")} className="btn-primary">Browse Shop</button>
      </div>
    );
  }

  const installmentTotal = hasInstallments ? total : 0;
  const segmentAmount = installmentTotal > 0 ? Math.ceil(installmentTotal / installmentConfig.split) : 0;

  const handlePlaceOrder = () => {
    // Mock payment with Paystack
    setStep(3);
    setTimeout(() => {
      clearCart();
    }, 100);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="flex items-center space-x-4 mb-12">
        <h1 className="text-5xl uppercase tracking-tighter">Checkout</h1>
        <div className="flex-grow h-px bg-gray-100"></div>
        <div className="flex space-x-4 text-[10px] uppercase font-bold tracking-widest">
           <span className={step >= 1 ? "text-black" : "text-gray-300"}>Delivery</span>
           <ChevronRight size={14} className="text-gray-300" />
           <span className={step >= 2 ? "text-black" : "text-gray-300"}>Payment</span>
           <ChevronRight size={14} className="text-gray-300" />
           <span className={step >= 3 ? "text-black" : "text-gray-300"}>Order</span>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-20"
          >
            <div>
               <h3 className="text-2xl uppercase mb-8">Shipping Information</h3>
               {/* Installment Config (If applicable) */}
               {hasInstallments && (
                 <div className="mb-12 p-8 bg-accent/5 border border-accent/20 rounded-3xl">
                    <div className="flex items-center space-x-3 mb-6">
                       <CreditCard size={20} className="text-accent" />
                       <h4 className="text-[10px] uppercase font-bold tracking-[0.2em] text-accent">Configure Your Plan</h4>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-6 mb-8">
                       <div>
                          <label className="block text-[10px] uppercase font-bold tracking-widest text-gray-400 mb-3">Frequency</label>
                          <div className="flex bg-white rounded-xl p-1 border border-gray-100">
                             <button 
                              onClick={() => setInstallmentConfig({...installmentConfig, type: "weekly"})}
                              className={`flex-grow py-2 rounded-lg text-[10px] font-bold uppercase transition-all ${installmentConfig.type === "weekly" ? 'bg-black text-white' : 'hover:bg-gray-50'}`}
                             >
                               Weekly
                             </button>
                             <button 
                              onClick={() => setInstallmentConfig({...installmentConfig, type: "monthly"})}
                              className={`flex-grow py-2 rounded-lg text-[10px] font-bold uppercase transition-all ${installmentConfig.type === "monthly" ? 'bg-black text-white' : 'hover:bg-gray-50'}`}
                             >
                               Monthly
                             </button>
                          </div>
                       </div>
                       <div>
                          <label className="block text-[10px] uppercase font-bold tracking-widest text-gray-400 mb-3">Duration</label>
                          <select 
                            value={installmentConfig.split}
                            onChange={(e) => setInstallmentConfig({...installmentConfig, split: Number(e.target.value)})}
                            className="w-full bg-white border border-gray-100 rounded-xl px-4 py-2 text-xs font-bold outline-none"
                          >
                             {[2, 3, 4, 5, 6, 8, 12].map(num => (
                               <option key={num} value={num}>{num} {installmentConfig.type === "weekly" ? "Weeks" : "Months"}</option>
                             ))}
                          </select>
                       </div>
                    </div>

                    <div className="pt-6 border-t border-accent/10">
                       <div className="flex justify-between items-center mb-1">
                          <span className="text-xs text-gray-500 italic">Payment per {installmentConfig.type === "weekly" ? "week" : "month"}:</span>
                          <span className="font-display font-black text-accent">{formatCurrency(segmentAmount)}</span>
                       </div>
                       <p className="text-[10px] text-accent font-medium opacity-60">First payment due now at checkout.</p>
                    </div>
                 </div>
               )}

               <div className="space-y-6">
                  <div>
                    <label className="block text-[10px] uppercase font-bold tracking-widest text-gray-400 mb-2">Full Name</label>
                    <input 
                      type="text" 
                      className="w-full border-b-2 border-gray-100 py-3 focus:border-black outline-none transition-all"
                      placeholder="Jane Doe"
                      value={address.fullName}
                      onChange={(e) => setAddress({...address, fullName: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase font-bold tracking-widest text-gray-400 mb-2">Street Address</label>
                    <input 
                      type="text" 
                      className="w-full border-b-2 border-gray-100 py-3 focus:border-black outline-none transition-all"
                      placeholder="123 Lekki Phase 1"
                      value={address.street}
                      onChange={(e) => setAddress({...address, street: e.target.value})}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-8">
                    <div>
                      <label className="block text-[10px] uppercase font-bold tracking-widest text-gray-400 mb-2">City</label>
                      <input 
                        type="text" 
                        className="w-full border-b-2 border-gray-100 py-3 focus:border-black outline-none transition-all"
                        placeholder="Lagos"
                        value={address.city}
                        onChange={(e) => setAddress({...address, city: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase font-bold tracking-widest text-gray-400 mb-2">State</label>
                      <select 
                        className="w-full border-b-2 border-gray-100 py-3 focus:border-black outline-none transition-all"
                        value={address.state}
                        onChange={(e) => setAddress({...address, state: e.target.value})}
                      >
                         <option>Lagos</option>
                         <option>Abuja</option>
                         <option>Port Harcourt</option>
                         <option>Oyo</option>
                         <option>Edo</option>
                         <option>Delta</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase font-bold tracking-widest text-gray-400 mb-2">Phone Number</label>
                    <input 
                      type="tel" 
                      className="w-full border-b-2 border-gray-100 py-3 focus:border-black outline-none transition-all"
                      placeholder="+234 800 000 0000"
                      value={address.phoneNumber}
                      onChange={(e) => setAddress({...address, phoneNumber: e.target.value})}
                    />
                  </div>
               </div>
               
               <button 
                onClick={() => setStep(2)}
                disabled={!address.fullName || !address.phoneNumber}
                className="btn-primary w-full mt-12 py-5"
               >
                 Continue to Payment
               </button>
            </div>

            <OrderSummary items={items} subtotal={subtotal} totalDelivery={totalDelivery} total={total} />
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-20"
          >
            <div>
               <h3 className="text-2xl uppercase mb-8">Secure Payment</h3>
               <p className="text-gray-500 mb-8 leading-relaxed">
                 All payments are securely processed through Paystack. Your PAIR wallet will record these transactions for your history and active installment balances.
               </p>

               <div className="space-y-4">
                  <div className="p-6 border-2 border-black rounded-2xl bg-gray-50 flex items-center justify-between">
                     <div className="flex items-center space-x-4">
                        <CreditCard size={24} />
                        <div>
                          <p className="font-bold">Paystack Secure</p>
                          <p className="text-[10px] text-gray-500 uppercase font-black tracking-widest">Cards, Transfer, USSD</p>
                        </div>
                     </div>
                     <CheckCircle2 className="text-black" />
                  </div>
                  
                  <div className="p-12 border border-dashed border-gray-200 rounded-2xl text-center">
                     <p className="text-sm text-gray-400">Paystack checkout will open to process your payment.</p>
                  </div>
               </div>

               <div className="mt-12 p-8 bg-gray-50 rounded-2xl">
                 <h4 className="text-[10px] uppercase font-bold tracking-widest text-gray-400 mb-4">You're Protected</h4>
                 <div className="flex space-x-4 mb-6">
                    <ShieldCheck size={20} className="text-black flex-shrink-0" />
                    <p className="text-xs text-gray-600 line-clamp-3">Verification Guarantee: We ensure the shoe is authentic before delivery is finalized.</p>
                 </div>
                 <div className="flex space-x-4">
                    <Truck size={20} className="text-black flex-shrink-0" />
                    <p className="text-xs text-gray-600 line-clamp-3">Managed Delivery: Tracking is integrated directly into your PAIR dashboard.</p>
                 </div>
               </div>

               <button 
                onClick={handlePlaceOrder}
                className="btn-primary w-full mt-12 py-5"
               >
                 Pay {formatCurrency(hasInstallments ? segmentAmount : total)}
               </button>
               <button 
                onClick={() => setStep(1)}
                className="w-full text-xs font-bold uppercase tracking-widest text-gray-400 mt-6 hover:text-black transition-colors"
               >
                 Back to Shipping
               </button>
            </div>

            <OrderSummary items={items} subtotal={subtotal} totalDelivery={totalDelivery} total={total} />
          </motion.div>
        )}

        {step === 3 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-xl mx-auto py-20 text-center"
          >
             <div className="w-24 h-24 bg-black text-white rounded-full flex items-center justify-center mx-auto mb-10 shadow-xl">
               <CheckCircle2 size={48} />
             </div>
             <h2 className="text-5xl uppercase mb-6 tracking-tighter">Order Confirmed!</h2>
             <p className="text-lg text-gray-600 mb-12 max-w-md mx-auto leading-relaxed">
                Thank you for shopping on PAIR. We've notified the vendors, and our team will begin the verification process.
             </p>
             <div className="bg-gray-50 p-8 rounded-3xl mb-12 text-left">
                <p className="text-[10px] uppercase font-bold tracking-widest text-gray-400 mb-4">Order Details</p>
                <div className="flex justify-between items-center mb-2">
                   <span className="text-sm font-medium">Order ID</span>
                   <span className="text-sm font-bold font-mono">#PR-{Math.floor(Math.random()*100000)}</span>
                </div>
                <div className="flex justify-between items-center">
                   <span className="text-sm font-medium">Delivery to</span>
                   <span className="text-sm font-bold">{address.city}, {address.state}</span>
                </div>
             </div>
             <button 
                onClick={() => navigate("/dashboard")}
                className="btn-primary w-full py-5"
              >
                Track in Dashboard
              </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function OrderSummary({ items, subtotal, totalDelivery, total }: any) {
  return (
    <div className="hidden lg:block">
      <div className="bg-white border border-gray-100 rounded-3xl p-10 sticky top-24">
         <h3 className="text-xl uppercase mb-8">Summary</h3>
         <div className="space-y-6 mb-10">
            {items.map((item: any, i: number) => (
              <div key={i} className="flex space-x-4">
                 <img src={item.images[0]} className="w-16 h-20 rounded-xl object-cover bg-gray-50" referrerPolicy="no-referrer" />
                 <div className="flex-grow flex flex-col justify-center">
                    <p className="text-xs font-bold uppercase line-clamp-1">{item.name}</p>
                    <p className="text-[10px] text-gray-400">Size: {item.selectedSize}</p>
                    <p className="text-xs font-bold mt-1">{formatCurrency(item.price)}</p>
                 </div>
              </div>
            ))}
         </div>
         <div className="space-y-4 pt-8 border-t border-gray-100">
            <div className="flex justify-between text-sm">
               <span className="text-gray-500">Subtotal</span>
               <span className="font-medium">{formatCurrency(subtotal)}</span>
            </div>
            <div className="flex justify-between text-sm">
               <span className="text-gray-500">Delivery Total</span>
               <span className="font-medium">{formatCurrency(totalDelivery)}</span>
            </div>
            <div className="pt-6 border-t border-dashed border-gray-200 flex justify-between items-center">
               <span className="text-xs uppercase font-bold tracking-widest">Total</span>
               <span className="text-3xl font-display font-black">{formatCurrency(total)}</span>
            </div>
         </div>
      </div>
    </div>
  );
}
