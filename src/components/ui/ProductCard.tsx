import React from "react";
import { Product } from "../../types";
import { Link } from "react-router-dom";
import { formatCurrency } from "../../lib/utils";
import { motion } from "motion/react";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const totalPrice = product.price + product.deliveryFee;

  return (
    <motion.div
      whileHover={{ y: -8 }}
      className="group"
    >
      <Link to={`/product/${product.id}`} className="block">
        <div className="relative aspect-[4/5] bg-gray-100 rounded-2xl overflow-hidden mb-4">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            referrerPolicy="no-referrer"
          />
          <div className="absolute top-4 left-4 space-x-2 flex">
            {product.condition === "New" ? (
              <span className="bg-black text-white text-[10px] px-3 py-1 font-bold uppercase tracking-widest rounded-full">New</span>
            ) : (
              <span className="bg-zinc-800 text-white text-[10px] px-3 py-1 font-bold uppercase tracking-widest rounded-full">Fairly Used</span>
            )}
            {product.isInstallmentEligible && (
              <span className="bg-accent text-white text-[10px] px-3 py-1 font-bold uppercase tracking-widest rounded-full">Pay Small-Small</span>
            )}
          </div>
        </div>
        
        <div>
          <p className="text-[10px] uppercase tracking-widest text-gray-500 font-bold mb-1">{product.brand}</p>
          <h3 className="font-display font-medium text-lg leading-tight mb-2 group-hover:underline underline-offset-4 decoration-1">
            {product.name}
          </h3>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xl font-display font-bold">{formatCurrency(totalPrice)}</p>
              <p className="text-[10px] text-gray-400 font-medium">Incl. delivery to {product.vendorLocation}</p>
            </div>
            <div className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter">
              {product.vendorLocation}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
