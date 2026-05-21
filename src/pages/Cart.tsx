import { useCart } from "../context/CartContext";
import { Link, useNavigate } from "react-router-dom";
import { formatCurrency } from "../lib/utils";
import { Trash2, ArrowRight, ShoppingBag } from "lucide-react";

export default function Cart() {
  const { items, removeItem, subtotal, totalDelivery, total } = useCart();
  const navigate = useNavigate();

  if (items.length === 0) {
    return (
      <div className="py-40 text-center px-6">
        <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-8">
           <ShoppingBag size={32} className="text-gray-300" />
        </div>
        <h1 className="text-4xl uppercase mb-4">Your bag is empty.</h1>
        <p className="text-gray-500 mb-12">Looks like you haven't added any PAIRs yet.</p>
        <button onClick={() => navigate("/")} className="btn-primary">Browse Marketplace</button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="text-5xl uppercase mb-12 tracking-tighter">Shopping Bag</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
        <div className="lg:col-span-2 space-y-8">
          {items.map((item, idx) => (
            <div key={`${item.id}-${idx}`} className="flex gap-8 group pb-8 border-b border-gray-100 last:border-0">
               <div className="w-32 h-40 bg-gray-100 rounded-2xl overflow-hidden flex-shrink-0">
                 <img src={item.images[0]} alt={item.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
               </div>
               <div className="flex-grow flex flex-col justify-between py-2">
                 <div>
                    <div className="flex justify-between items-start">
                      <h3 className="text-xl uppercase font-bold leading-tight">{item.name}</h3>
                      <button 
                        onClick={() => removeItem(item.id)}
                        className="text-gray-400 hover:text-black transition-colors"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                    <p className="text-[10px] uppercase font-bold tracking-widest text-gray-400 mt-2">
                      Size: {item.selectedSize} — {item.condition} — Store: {item.vendorLocation}
                    </p>
                 </div>
                 <div className="flex justify-between items-end">
                    <p className="font-bold">{formatCurrency(item.price)}</p>
                 </div>
               </div>
            </div>
          ))}
        </div>

        <div className="lg:col-span-1">
          <div className="bg-gray-50 rounded-3xl p-8 sticky top-24">
             <h2 className="text-2xl uppercase mb-8">Order Summary</h2>
             
             <div className="space-y-4 mb-8 text-sm">
                <div className="flex justify-between">
                   <span className="text-gray-500">Subtotal</span>
                   <span className="font-medium">{formatCurrency(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                   <span className="text-gray-500">Total Delivery Fee</span>
                   <span className="font-medium">{formatCurrency(totalDelivery)}</span>
                </div>
                <div className="pt-4 border-t border-gray-200 flex justify-between items-center bg-transparent">
                   <span className="font-bold uppercase tracking-widest text-xs">Total</span>
                   <span className="text-3xl font-display font-black">{formatCurrency(total)}</span>
                </div>
             </div>

             <div className="bg-white p-4 rounded-xl mb-8 border border-gray-100">
               <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">Delivery Note</p>
               <p className="text-xs text-gray-500 leading-relaxed">
                 Delivery is calculated from each vendor's location. Total price includes all fees.
               </p>
             </div>

             <button 
              onClick={() => navigate("/checkout")}
              className="btn-primary w-full py-5 flex items-center justify-center space-x-3 mb-4"
             >
               <span>Checkout</span>
               <ArrowRight size={18} />
             </button>
             
             <button 
              onClick={() => navigate("/")}
              className="w-full text-xs uppercase font-bold tracking-widest text-gray-400 hover:text-black transition-colors"
             >
               Continue Shopping
             </button>
          </div>
        </div>
      </div>
    </div>
  );
}
