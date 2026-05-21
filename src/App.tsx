/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route, useLocation, Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { AnimatePresence } from "motion/react";
import { Menu, Bell } from "lucide-react";

import Shop from "./pages/Shop";
import ProductDetail from "./pages/ProductDetail";
import Checkout from "./pages/Checkout";
import Cart from "./pages/Cart";
import Dashboard from "./pages/Dashboard";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AnnouncementBar from "./components/layout/AnnouncementBar";
import About from "./pages/About";
import HowItWorks from "./pages/HowItWorks";
import Sell from "./pages/Sell";
import Support from "./pages/Support";
import ScrollToTop from "./components/layout/ScrollToTop";
import LoadingScreen from "./components/ui/LoadingScreen";

import { AuthProvider } from "./context/AuthContext";

import VendorOnboarding from "./pages/VendorOnboarding";
import AdminPanel from "./pages/AdminPanel";

function AdminHeader() {
  const navigate = useNavigate();
  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white border-b border-gray-100 h-[72px] px-4 md:px-8 flex items-center justify-between">
      <div className="flex items-center w-1/3">
        <button 
          onClick={() => window.dispatchEvent(new CustomEvent('toggle-admin-sidebar'))}
          className="p-2 -ml-2 text-gray-600 hover:bg-gray-50 rounded-full md:hidden"
        >
          <Menu size={24} />
        </button>
      </div>
      
      <div className="flex-1 flex justify-center absolute left-1/2 -translate-x-1/2">
        <Link to="/" className="text-2xl font-display font-black tracking-tighter">
          PAIR.
        </Link>
      </div>

      <div className="flex items-center justify-end w-1/3 space-x-3 md:space-x-6">
        <button className="relative p-2 text-gray-400 hover:text-black transition-colors rounded-full hover:bg-gray-50">
          <Bell size={20} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
        </button>
        <button
          onClick={() => navigate("/")}
          className="text-[10px] font-bold uppercase tracking-widest text-black/60 hover:text-black transition-colors border border-gray-200 px-4 py-2 rounded-full hover:border-black"
        >
          Exit
        </button>
      </div>
    </header>
  );
}

function MainLayout() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith("/admin") || location.pathname.startsWith("/vendor-dashboard") || location.pathname.startsWith("/super-admin");
  const isDashboard = location.pathname.startsWith("/dashboard");

  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden bg-gray-50">
      {!isAdmin ? (
        <header className="fixed top-0 left-0 w-full z-50">
          <AnnouncementBar />
          <Navbar />
        </header>
      ) : (
        <AdminHeader />
      )}
      <main className={`flex-grow ${!isAdmin ? 'pt-28 bg-white' : 'pt-[72px] flex flex-col h-screen'}`}>
        <Routes>
          <Route path="/" element={<Shop />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/dashboard/*" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/about" element={<About />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/sell" element={<Sell />} />
          <Route path="/support" element={<Support />} />
          <Route path="/vendor-onboarding" element={<VendorOnboarding />} />
          <Route path="/admin/*" element={<AdminPanel />} />
        </Routes>
      </main>
      {!isAdmin && <Footer />}
    </div>
  );
}

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AuthProvider>
      <Router>
        <ScrollToTop />
        <AnimatePresence>
          {isLoading && <LoadingScreen />}
        </AnimatePresence>
        <MainLayout />
      </Router>
    </AuthProvider>
  );
}
