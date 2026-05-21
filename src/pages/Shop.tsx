import React, { useState, useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { MOCK_PRODUCTS, CATEGORIES, LOCATIONS } from "../constants";
import ProductCard from "../components/ui/ProductCard";
import { Filter, X, ShoppingBag, ArrowUpRight } from "lucide-react";

function ShopHero({ category, condition }: { category: string | null, condition: string | null }) {
  if (condition === "Fairly Used") {
    return (
      <div className="bg-[#f2f2ee] rounded-[4rem] p-12 md:p-28 mb-24 relative overflow-hidden group">
        <div className="max-w-4xl relative z-10 text-left">
           <span className="text-[#a1a19a] text-[12px] md:text-sm font-black uppercase tracking-[0.6em] mb-12 block">PRE-OWNED HERITAGE</span>
           <h2 className="text-7xl md:text-[120px] font-display font-black text-black leading-[0.85] tracking-tighter mb-14 uppercase">SECOND <br /> LIFE.</h2>
           <p className="text-xl md:text-2xl text-[#7a7a72] font-medium leading-relaxed max-w-xl mb-24">Verified pre-owned grails at accessible market prices. Sustainable luxury, authenticated for you.</p>
           
           <div className="flex flex-wrap gap-6 md:gap-10 items-center">
              <button 
                onClick={() => {
                  const el = document.getElementById('marketplace-grid');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-28 h-28 md:w-36 md:h-36 rounded-full bg-black text-white flex flex-col items-center justify-center text-center p-4 hover:scale-110 transition-all duration-500 shadow-2xl active:scale-95"
              >
                <span className="text-[10px] md:text-[11px] font-black uppercase tracking-widest leading-tight">BROWSE <br /> FINDS</span>
              </button>
              <Link to="/about" className="w-28 h-28 md:w-36 md:h-36 rounded-full bg-white border border-gray-100 shadow-sm text-black flex flex-col items-center justify-center text-center p-4 hover:scale-110 transition-all duration-500 active:scale-95">
                <span className="text-[10px] md:text-[11px] font-black uppercase tracking-widest leading-tight">WHY <br /> PRE- <br /> OWNED?</span>
              </Link>
           </div>
        </div>
        <div className="absolute top-1/2 -right-40 -translate-y-1/2 w-[900px] h-[900px] bg-white rounded-full blur-[180px] opacity-30 group-hover:scale-110 transition-transform duration-1000 pointer-events-none" />
      </div>
    );
  }

  if (!category || category === "All") return null;

  if (category === "Men") {
    return (
      <div className="mb-24">
        <div className="relative rounded-[4rem] overflow-hidden group h-[500px] md:h-[750px]">
          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/20 to-transparent z-10" />
          <img 
            src="https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&q=80&w=2000" 
            alt="Men's Collection"
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-[2s]"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 flex flex-col justify-end p-12 md:p-28 z-20">
             <div className="max-w-2xl">
                <span className="text-accent text-[12px] md:text-sm font-black uppercase tracking-[0.8em] mb-8 block">FOR THE GENTLEMEN</span>
                <h2 className="text-7xl md:text-[120px] font-display font-black text-white leading-[0.85] tracking-tighter mb-14 uppercase">MEN'S <br /> GRAILS.</h2>
                <Link to="/shop" className="inline-block bg-white text-black px-14 py-6 rounded-full text-[12px] font-black uppercase tracking-[0.25em] hover:bg-accent transition-all duration-300 transform hover:scale-105">SHOP MARKETPLACE</Link>
             </div>
          </div>
        </div>
      </div>
    );
  }

  if (category === "Women") {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:h-[650px] mb-24 overflow-hidden">
        <div className="relative rounded-[4rem] overflow-hidden group">
          <img 
            src="https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&q=80&w=1500" 
            alt="Women's Collection"
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] transition-all group-hover:backdrop-blur-0" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-12">
             <span className="text-white/60 text-[12px] font-black uppercase tracking-[1em] mb-8">FOR THE LADIES</span>
             <h2 className="text-6xl md:text-8xl font-display font-medium text-white mb-10 font-serif italic">The Queens.</h2>
             <Link to="/shop?category=Women" className="border border-white/40 text-white px-14 py-6 rounded-full text-[12px] font-black uppercase tracking-[0.4em] hover:bg-white hover:text-black transition-all">DISCOVER COLLECTIONS</Link>
          </div>
        </div>
        <div className="bg-black rounded-[4rem] p-16 md:p-28 flex flex-col justify-center text-white relative">
           <p className="text-accent text-[12px] font-black uppercase tracking-[0.8em] mb-10">CURATED FOR HER</p>
           <h3 className="text-5xl md:text-6xl font-display font-bold leading-[0.9] mb-12 decoration-accent/30 decoration-2 underline underline-offset-[20px]">ELEVATED <br /> STYLE</h3>
           <p className="text-lg text-gray-400 font-medium leading-relaxed max-w-sm">From timeless pumps to exclusive collaborations. Luxury meets comfort, authenticated for the modern woman.</p>
           <ArrowUpRight className="absolute bottom-12 right-12 text-white/5 pointer-events-none" size={180} />
        </div>
      </div>
    );
  }


  return null;
}

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [showFilters, setShowFilters] = useState(false);

  const activeCategory = searchParams.get("category");
  const activeCondition = searchParams.get("condition");
  const activeLocation = searchParams.get("location");
  const searchQuery = searchParams.get("q")?.toLowerCase();

  const filteredProducts = useMemo(() => {
    return MOCK_PRODUCTS.filter((p) => {
      if (activeCategory && p.category !== activeCategory) return false;
      if (activeCondition && p.condition !== activeCondition) return false;
      if (activeLocation && p.vendorLocation !== activeLocation) return false;
      if (searchQuery) {
        const matchName = p.name.toLowerCase().includes(searchQuery);
        const matchBrand = p.brand.toLowerCase().includes(searchQuery);
        const matchCat = p.category.toLowerCase().includes(searchQuery);
        if (!matchName && !matchBrand && !matchCat) return false;
      }
      return true;
    });
  }, [activeCategory, activeCondition, activeLocation, searchQuery]);

  const clearFilters = () => {
    setSearchParams({});
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <ShopHero category={activeCategory} condition={activeCondition} />

      <div id="marketplace-grid" className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-10">
        <div>
          <h1 className="text-2xl md:text-3xl font-display font-bold uppercase tracking-tight mb-2">
            {searchQuery ? `Search: ${searchQuery}` : (activeCategory && activeCategory !== "All" ? activeCategory : "Shop Marketplace")}
          </h1>
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Showing {filteredProducts.length} authentic pairs</p>
        </div>
        
        <button 
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center space-x-3 btn-outline px-6 py-3"
        >
          <Filter size={18} />
          <span>Filters</span>
          {(activeCategory || activeCondition || activeLocation) && (
            <span className="bg-black text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full ml-2">!</span>
          )}
        </button>
      </div>

      {/* Filters Overlay/Drawer */}
      {showFilters && (
        <div className="mb-12 p-8 bg-gray-50 rounded-2xl grid grid-cols-1 md:grid-cols-4 gap-8 relative animate-in fade-in slide-in-from-top-4">
          <button 
            onClick={() => setShowFilters(false)}
            className="absolute top-4 right-4 text-gray-400 hover:text-black transition-colors"
          >
            <X size={20} />
          </button>

          <div>
             <h4 className="text-xs uppercase font-bold tracking-widest text-gray-400 mb-4">Category</h4>
             <div className="flex flex-wrap gap-2">
               {CATEGORIES.map((cat) => (
                 <button
                   key={cat}
                   onClick={() => setSearchParams({ ...Object.fromEntries(searchParams), category: cat })}
                   className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${activeCategory === cat ? 'bg-black text-white' : 'bg-white border border-gray-100 hover:border-black'}`}
                 >
                   {cat}
                 </button>
               ))}
             </div>
          </div>

          <div>
             <h4 className="text-xs uppercase font-bold tracking-widest text-gray-400 mb-4">Condition</h4>
             <div className="flex flex-wrap gap-2">
               {["New", "Fairly Used"].map((cond) => (
                 <button
                   key={cond}
                   onClick={() => setSearchParams({ ...Object.fromEntries(searchParams), condition: cond })}
                   className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${activeCondition === cond ? 'bg-black text-white' : 'bg-white border border-gray-100 hover:border-black'}`}
                 >
                   {cond}
                 </button>
               ))}
             </div>
          </div>

          <div>
             <h4 className="text-xs uppercase font-bold tracking-widest text-gray-400 mb-4">Vendor Location</h4>
             <div className="flex flex-wrap gap-2">
               {LOCATIONS.map((loc) => (
                 <button
                   key={loc}
                   onClick={() => setSearchParams({ ...Object.fromEntries(searchParams), location: loc })}
                   className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${activeLocation === loc ? 'bg-black text-white' : 'bg-white border border-gray-100 hover:border-black'}`}
                 >
                   {loc}
                 </button>
               ))}
             </div>
          </div>

          <div className="flex items-end">
             <button 
              onClick={clearFilters}
              className="text-xs uppercase font-bold tracking-widest border-b border-black pb-1 hover:text-accent hover:border-accent transition-all"
             >
               Clear All Filters
             </button>
          </div>
        </div>
      )}

      {/* Product Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
          {filteredProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      ) : (
        <div className="py-40 text-center">
            <p className="text-2xl font-display text-gray-400 mb-8">No matching pairs found.</p>
            <button onClick={clearFilters} className="btn-primary">Reset Shop</button>
        </div>
      )}
    </div>
  );
}
