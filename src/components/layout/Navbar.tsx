import { Link, useNavigate } from "react-router-dom";
import { Search, ShoppingBag, User, Menu, X } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "../../lib/utils";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const { items } = useCart();
  const { user, logout } = useAuth();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/?q=${encodeURIComponent(searchQuery)}`);
      setIsSearchOpen(false);
      setSearchQuery("");
      setIsOpen(false);
    }
  };

  return (
    <nav className="w-full bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between relative">
        
        {/* Left: Hamburger */}
        <div className="flex-1 flex items-center">
          <button className="text-black" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Center: Logo */}
        <div className="absolute left-1/2 -translate-x-1/2">
          <Link to="/" className="text-3xl font-display font-black tracking-tighter">
            PAIR<span className="text-accent">.</span>
          </Link>
        </div>

        {/* Right: Icons */}
        <div className="flex-1 flex items-center justify-end space-x-4 md:space-x-6">
          <Link to="/cart" className="text-black hover:text-gray-600 transition-colors relative">
            <ShoppingBag size={22} strokeWidth={1.5} />
            {items.length > 0 && (
              <span className="absolute -top-1 -right-2 bg-black text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                {items.length}
              </span>
            )}
          </Link>
          <Link to={user ? "/dashboard/settings" : "/login"} className="text-black hover:text-gray-600 transition-colors">
            <User size={22} strokeWidth={1.5} />
          </Link>
        </div>
      </div>

      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-white/95 backdrop-blur-xl z-[100] flex flex-col overflow-y-auto"
          >
            <div className="max-w-7xl mx-auto w-full px-6 flex flex-col h-full py-12">
              <div className="flex justify-between items-center mb-24">
                <div className="text-3xl font-display font-black tracking-tighter">
                  PAIR<span className="text-accent">.</span>
                </div>
                <button 
                  onClick={() => setIsSearchOpen(false)}
                  className="p-3 bg-black text-white rounded-full hover:scale-105 transition-transform"
                >
                  <X size={20} strokeWidth={2.5} />
                </button>
              </div>

              <form onSubmit={handleSearch} className="relative mb-24 px-2">
                <input 
                  type="text"
                  autoFocus
                  placeholder="SEARCH FOR YOUR PAIR..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full text-4xl md:text-8xl font-display font-black border-b-2 border-black pb-10 md:pb-12 outline-none placeholder:text-gray-200 bg-transparent text-black uppercase"
                />
                <button type="submit" className="absolute right-0 bottom-12 md:bottom-16 p-2 hover:translate-x-1 transition-transform">
                  <Search size={32} strokeWidth={3} className="md:w-12 md:h-12" />
                </button>
              </form>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 px-2">
                <div>
                  <p className="text-[10px] md:text-xs uppercase font-black text-gray-400 tracking-[0.3em] mb-10">Popular Searches</p>
                  <div className="flex flex-wrap gap-4">
                    {["Jordan 1 High", "Yeezy 350", "Dunk Low", "Travis Scott", "Men", "Women", "Pre-owned"].map(term => (
                      <button 
                        key={term}
                        onClick={() => {
                          setSearchQuery(term);
                          navigate(`/?q=${encodeURIComponent(term)}`);
                          setIsSearchOpen(false);
                        }}
                        className="px-8 py-4 bg-gray-50 border border-gray-100 hover:bg-black hover:text-white rounded-full text-[10px] md:text-xs font-black uppercase tracking-[0.2em] transition-all"
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="hidden md:block">
                  <p className="text-[10px] md:text-xs uppercase font-black text-gray-400 tracking-[0.3em] mb-10">Collections</p>
                  <nav className="flex flex-col space-y-8">
                    <Link to="/?category=Men" onClick={() => setIsSearchOpen(false)} className="text-5xl font-display font-black hover:text-accent transition-all transform hover:translate-x-2">MEN</Link>
                    <Link to="/?category=Women" onClick={() => setIsSearchOpen(false)} className="text-5xl font-display font-black hover:text-accent transition-all transform hover:translate-x-2">WOMEN</Link>
                    <Link to="/?condition=Fairly Used" onClick={() => setIsSearchOpen(false)} className="text-5xl font-display font-black hover:text-accent transition-all transform hover:translate-x-2">PRE-OWNED</Link>
                  </nav>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Nav Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            className="absolute top-20 left-0 w-80 h-[100vh] bg-white border-r border-gray-100 z-50 p-12 flex flex-col space-y-8 shadow-2xl"
          >
            {user ? (
              <>
                <button 
                  onClick={() => {
                    setIsOpen(false);
                    setIsSearchOpen(true);
                  }}
                  className="text-xl font-display font-medium hover:text-accent transition-colors text-left"
                >
                  Search
                </button>
                <Link to="/dashboard/orders" onClick={() => setIsOpen(false)} className="text-xl font-display font-medium hover:text-accent transition-colors">Orders</Link>
                <Link to="/dashboard/settings" onClick={() => setIsOpen(false)} className="text-xl font-display font-medium hover:text-accent transition-colors">Profile</Link>
                <Link to="/dashboard/wallet" onClick={() => setIsOpen(false)} className="text-xl font-display font-medium hover:text-accent transition-colors">Wallet</Link>
                {user.role === 'admin' && (
                  <Link to="/admin" onClick={() => setIsOpen(false)} className="text-xl font-display font-bold text-accent hover:text-black transition-colors flex items-center">
                    Admin Panel
                    <div className="ml-2 w-2 h-2 rounded-full bg-accent animate-pulse" />
                  </Link>
                )}
                {user.role === 'vendor' ? (
                  <Link to="/dashboard/products" onClick={() => setIsOpen(false)} className="text-xl font-display font-medium hover:text-accent transition-colors">My Inventory</Link>
                ) : (
                  <Link to="/sell" onClick={() => setIsOpen(false)} className="text-xl font-display font-medium hover:text-accent transition-colors">Sell on PAIR</Link>
                )}
                <button 
                  onClick={() => { 
                    logout();
                    setIsOpen(false);
                    navigate("/login");
                  }} 
                  className="text-xl font-display font-medium text-red-500 hover:text-red-600 transition-colors text-left"
                >
                  Log out
                </button>
                <div className="pt-12 border-t border-gray-100 mt-4">
                  <p className="text-[10px] uppercase font-black text-gray-400 tracking-[0.2em] mb-4">Shop Categories</p>
                  <div className="flex flex-col space-y-4">
                    <Link to="/" onClick={() => setIsOpen(false)} className="text-sm font-bold uppercase tracking-widest">Shop All</Link>
                    <Link to="/?category=Men" onClick={() => setIsOpen(false)} className="text-sm font-bold uppercase tracking-widest">Men</Link>
                    <Link to="/?category=Women" onClick={() => setIsOpen(false)} className="text-sm font-bold uppercase tracking-widest">Women</Link>
                    <Link to="/?condition=Fairly Used" onClick={() => setIsOpen(false)} className="text-sm font-bold uppercase tracking-widest">Pre-owned</Link>
                  </div>
                </div>
              </>
            ) : (
              <>
                <button 
                  onClick={() => {
                    setIsOpen(false);
                    setIsSearchOpen(true);
                  }}
                  className="text-xl font-display font-medium hover:text-accent transition-colors text-left"
                >
                  Search
                </button>
                <Link to="/" onClick={() => setIsOpen(false)} className="text-xl font-display font-medium">Shop All</Link>
                <Link to="/?category=Men" onClick={() => setIsOpen(false)} className="text-xl font-display font-medium">Men</Link>
                <Link to="/?category=Women" onClick={() => setIsOpen(false)} className="text-xl font-display font-medium">Women</Link>
                <Link to="/?condition=Fairly Used" onClick={() => setIsOpen(false)} className="text-xl font-display font-medium">Pre-owned</Link>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
