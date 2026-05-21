import { useParams, useNavigate, Link } from "react-router-dom";
import { useState, useMemo } from "react";
import { MOCK_PRODUCTS } from "../constants";
import { formatCurrency } from "../lib/utils";
import { Check, ShieldCheck, Truck, CreditCard, ChevronRight } from "lucide-react";
import { useCart } from "../context/CartContext";
import { motion } from "motion/react";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addItem } = useCart();
  
  const product = useMemo(() => MOCK_PRODUCTS.find(p => p.id === id), [id]);
  
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState(product?.colors[0] || "");
  const [paymentOption, setPaymentOption] = useState<"full" | "installment">("full");

  if (!product) {
    return (
      <div className="py-40 text-center">
        <h1 className="text-4xl uppercase mb-8">Product not found.</h1>
        <button onClick={() => navigate("/")} className="btn-primary">Back to Shop</button>
      </div>
    );
  }

  const totalPrice = product.price + product.deliveryFee;
  const firstInstallment = Math.ceil(totalPrice / 2);
  const secondInstallment = totalPrice - firstInstallment;

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Please select a size");
      return;
    }
    addItem(product, selectedSize, selectedColor, paymentOption);
    navigate("/cart");
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Gallery */}
        <div className="space-y-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="aspect-[4/5] rounded-3xl overflow-hidden bg-gray-100 shadow-sm"
          >
            <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
          </motion.div>
          <div className="grid grid-cols-4 gap-4">
            {product.images.map((img, idx) => (
              <div key={idx} className="aspect-square rounded-2xl overflow-hidden bg-gray-100 cursor-pointer hover:opacity-80 transition-opacity">
                <img src={img} alt={`${product.name} ${idx}`} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </div>
            ))}
          </div>
        </div>

        {/* Info */}
        <div className="flex flex-col">
          <div className="mb-8 border-b border-gray-100 pb-8">
            <p className="text-xs uppercase font-bold tracking-widest text-gray-400 mb-2">{product.brand}</p>
            <h1 className="text-4xl md:text-5xl uppercase mb-4 leading-tight">{product.name}</h1>
            
            <div className="flex items-center space-x-4">
              <span className="bg-gray-100 text-black text-[10px] px-4 py-1.5 font-bold uppercase tracking-widest rounded-full">
                Condition: {product.condition}
              </span>
              <span className="flex items-center space-x-1 text-[10px] text-green-600 font-bold uppercase tracking-widest">
                <ShieldCheck size={14} />
                <span>Verified by PAIR</span>
              </span>
            </div>
          </div>

          <div className="mb-10">
            <h4 className="text-xs uppercase font-bold tracking-widest text-gray-400 mb-6">Select Size (EU)</h4>
            <div className="flex flex-wrap gap-3">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`w-14 h-14 rounded-xl flex items-center justify-center font-bold transition-all border-2 ${selectedSize === size ? 'bg-black text-white border-black' : 'bg-white border-gray-100 hover:border-black'}`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Pricing Breakdown */}
          <div className="bg-gray-50 rounded-3xl p-8 mb-10">
            <div className="space-y-4 mb-8">
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500">Shoe Price</span>
                <span className="font-medium">{formatCurrency(product.price)}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500">Delivery ({product.vendorLocation} to you)</span>
                <span className="font-medium">{formatCurrency(product.deliveryFee)}</span>
              </div>
              <div className="pt-4 border-t border-gray-200 flex justify-between items-center">
                <span className="font-display font-bold uppercase tracking-widest text-xs">Total to Pay</span>
                <span className="text-3xl font-display font-black">{formatCurrency(totalPrice)}</span>
              </div>
            </div>

            {/* Payment Options */}
            <h4 className="text-xs uppercase font-bold tracking-widest text-gray-400 mb-6">Choose Payment Method</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               <button 
                onClick={() => setPaymentOption("full")}
                className={`p-6 rounded-2xl border-2 text-left transition-all ${paymentOption === "full" ? 'border-black bg-white shadow-lg' : 'border-gray-100 bg-gray-100/50 hover:border-gray-300'}`}
               >
                 <div className="flex justify-between items-start mb-2">
                    <Check size={16} className={paymentOption === "full" ? "text-black" : "text-transparent"} />
                    <CreditCard size={20} className="text-gray-400" />
                 </div>
                 <p className="font-bold mb-1">Full Payment</p>
                 <p className="text-[10px] text-gray-500 uppercase tracking-widest">Pay {formatCurrency(totalPrice)} now</p>
               </button>

               {product.isInstallmentEligible ? (
                 <button 
                  onClick={() => setPaymentOption("installment")}
                  className={`p-6 rounded-2xl border-2 text-left transition-all ${paymentOption === "installment" ? 'border-accent bg-white shadow-lg' : 'border-gray-100 bg-gray-100/50 hover:border-gray-300'}`}
                 >
                   <div className="flex justify-between items-start mb-2">
                      <Check size={16} className={paymentOption === "installment" ? "text-accent" : "text-transparent"} />
                      <CreditCard size={20} className="text-accent" />
                   </div>
                   <p className="font-bold mb-1">Flexible Payment</p>
                   <p className="text-[10px] text-accent font-bold uppercase tracking-widest">Pay Small-Small</p>
                 </button>
               ) : (
                 <div className="p-6 rounded-2xl border border-dashed border-gray-200 bg-gray-50 opacity-50 flex items-center justify-center text-center">
                    <p className="text-[10px] uppercase font-bold tracking-widest text-gray-400">Installments unavailable for this luxury pair</p>
                 </div>
               )}
            </div>

            {paymentOption === "installment" && (
              <div className="mt-6 p-4 bg-accent/5 rounded-xl border border-accent/10">
                 <p className="text-sm font-medium text-accent mb-2">Payment Option:</p>
                 <p className="text-xs text-gray-600 italic">Configure your weekly or monthly plan at checkout.</p>
              </div>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mt-auto">
            <button 
              onClick={handleAddToCart}
              className="btn-primary flex-grow h-16 flex items-center justify-center space-x-3"
            >
              <span>Add to Bag</span>
              <ChevronRight size={20} />
            </button>
          </div>

          <div className="mt-12 space-y-6 pt-8 border-t border-gray-100">
             <div className="flex space-x-4">
                <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center flex-shrink-0">
                  <Truck size={20} className="text-gray-500" />
                </div>
                <div>
                   <p className="text-sm font-bold uppercase tracking-widest text-[10px]">Fast Delivery</p>
                   <p className="text-sm text-gray-500">Estimated 1-3 days from {product.vendorLocation} to your city.</p>
                </div>
             </div>
             <div className="flex space-x-4">
                <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center flex-shrink-0">
                  <ShieldCheck size={20} className="text-gray-500" />
                </div>
                <div>
                   <p className="text-sm font-bold uppercase tracking-widest text-[10px]">Authentication</p>
                   <p className="text-sm text-gray-500">PAIR expertly verifies every shoe before shipping to you.</p>
                </div>
             </div>
          </div>
        </div>
      </div>

      {/* Description Section */}
      <section className="mt-24 pt-12 border-t border-gray-100">
        <h3 className="text-3xl uppercase mb-8">Details & Care</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="prose prose-sm text-gray-600 max-w-none">
            <p className="text-lg leading-relaxed">{product.description}</p>
            <ul className="mt-8 space-y-2 list-disc list-inside">
              <li>Category: {product.category}</li>
              <li>Brand: {product.brand}</li>
              <li>Shipping from: {product.vendorLocation}</li>
              <li>Payment protection included</li>
            </ul>
          </div>
          <div>
            <div className="bg-black text-white p-12 rounded-3xl">
               <h4 className="text-xl mb-6 font-display italic">A note from the PAIR team</h4>
               <p className="text-gray-400 leading-relaxed text-sm mb-8">
                 This product is sourced from a verified vendor in {product.vendorLocation}. 
                 We have reviewed the listing images and verified the vendor's identification. 
                 Upon purchase, PAIR handles the logistics to ensure your pair arrives as described.
               </p>
               <Link to="/how-it-works" className="text-xs uppercase font-bold tracking-widest border-b border-accent pb-1 text-accent">Learn about our verification process</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
