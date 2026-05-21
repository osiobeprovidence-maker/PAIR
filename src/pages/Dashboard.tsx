import { useState } from "react";
import { Link, Routes, Route, useLocation, useNavigate, Navigate } from "react-router-dom";
import { 
  ShoppingBag, 
  Settings, 
  LogOut, 
  LayoutDashboard, 
  Box, 
  UserCheck, 
  BarChart3,
  CheckCircle2,
  Package,
  Wallet,
  ShieldCheck,
  CreditCard,
  AlertCircle,
  Clock,
  Upload
} from "lucide-react";
import { formatCurrency } from "../lib/utils";
import { MOCK_WALLET_RECORDS, MOCK_INSTALLMENTS } from "../constants";
import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  if (!user) {
    return <Navigate to="/login" />;
  }

  const role = user.role;

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const isMenu = location.pathname === "/dashboard" || location.pathname === "/dashboard/";

  const menuItems = [
    { path: "/dashboard/orders", label: "Orders" },
    { path: "/dashboard/settings", label: "Profile" },
    { path: "/dashboard/wallet", label: "Wallet" },
    { path: "/dashboard/products", label: "My Inventory" },
  ];

  if (user?.role === "admin") {
    menuItems.push({ path: "/admin", label: "Admin Panel" });
  }

  if (isMenu) {
    return (
      <div className="max-w-xl mx-auto px-6 py-10 md:py-16">
        <div className="space-y-12">
          <nav className="flex flex-col space-y-8">
            {menuItems.map((item) => (
              <Link 
                key={item.path}
                to={item.path}
                className="text-3xl md:text-5xl font-display font-medium hover:text-accent transition-colors block tracking-tight"
              >
                {item.label}
              </Link>
            ))}
            <button 
              onClick={handleLogout}
              className="text-3xl md:text-5xl font-display font-medium text-red-500 text-left hover:text-red-700 transition-colors tracking-tight"
            >
              Log out
            </button>
          </nav>
          
          <div className="pt-20 border-t border-gray-100">
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-300 mb-8">Shop Categories</p>
            <div className="grid grid-cols-2 gap-4">
               {["Sneakers", "Luxury", "Streetwear", "Accessories"].map(cat => (
                 <Link key={cat} to="/" className="text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-black transition-colors">{cat}</Link>
               ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 pt-10 md:pt-16 pb-24">
      <div className="flex flex-col lg:flex-row gap-12">
        {/* Simple Side Nav for Desktop Sub-pages */}
        <aside className="hidden lg:block lg:w-48 flex-shrink-0">
          <nav className="space-y-4">
            {menuItems.map((item) => (
              <Link 
                key={item.path}
                to={item.path}
                className={`block text-xs font-bold uppercase tracking-widest transition-colors ${
                  location.pathname === item.path ? 'text-black' : 'text-gray-300 hover:text-black'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 lg:pt-0">
          <Routes>
            <Route path="/orders" element={<Orders role={role} />} />
            <Route path="/wallet" element={<WalletView />} />
            <Route path="/settings" element={<ProfileSettings />} />
            <Route path="/products" element={<VendorProducts />} />
            <Route path="/products/new" element={<AddProduct />} />
            <Route path="/verification" element={<VendorVerification />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

function Orders({ role }: { role: string }) {
  const navigate = useNavigate();
  return (
    <div className="max-w-xl mx-auto">
      <h2 className="text-3xl md:text-5xl font-display font-medium mb-12 tracking-tight">Orders</h2>
      
      <div className="bg-white border border-gray-100 rounded-[2rem] p-16 text-center shadow-sm">
        <p className="text-xl font-medium mb-6">No orders yet</p>
        <p className="text-gray-500 mb-10">Go to store to place an order.</p>
        <button 
          onClick={() => navigate("/")}
          className="text-sm font-bold underline underline-offset-4 hover:text-accent transition-colors"
        >
          Go to Store
        </button>
      </div>
    </div>
  );
}

function WalletView() {
  const totalPaid = MOCK_WALLET_RECORDS.reduce((acc, curr) => acc + curr.amount, 0);
  const activeInstallment = MOCK_INSTALLMENTS.reduce((acc, curr) => acc + curr.balanceRemaining, 0);

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex justify-between items-end mb-12">
         <div>
            <h2 className="text-3xl md:text-5xl font-display font-medium mb-4 tracking-tight">Wallet</h2>
            <p className="text-gray-500">Your PAIR payment records and installment balances.</p>
         </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
         <div className="bg-white border border-gray-100 p-8 rounded-[2rem] shadow-sm">
            <p className="text-[10px] uppercase font-bold tracking-widest text-gray-400 mb-4">Total Paid on PAIR</p>
            <p className="text-4xl font-display font-medium">{formatCurrency(totalPaid)}</p>
         </div>
         <div className="bg-white border border-gray-100 p-8 rounded-[2rem] shadow-sm relative overflow-hidden group">
            <p className="text-[10px] uppercase font-bold tracking-widest text-accent mb-4">Active Installment Balance</p>
            <p className="text-4xl font-display font-medium text-accent">{formatCurrency(activeInstallment)}</p>
            {MOCK_INSTALLMENTS.length > 0 && (
              <div className="mt-6 flex flex-col space-y-4">
                <p className="text-[10px] uppercase font-bold tracking-widest flex items-center text-gray-500">
                  <Clock size={12} className="mr-2" />
                  Next payment due in 7 days
                </p>
                <button className="text-[10px] uppercase font-bold tracking-widest text-gray-400 hover:text-black transition-colors underline underline-offset-4 text-left w-fit">
                  Pay Installment
                </button>
              </div>
            )}
         </div>
      </div>

      <div className="mb-12">
         <h3 className="text-xl font-medium mb-6">Payment Activity</h3>
         <div className="bg-white border border-gray-100 rounded-[2rem] overflow-hidden shadow-sm">
            <div className="divide-y divide-gray-100">
               {MOCK_WALLET_RECORDS.map((record) => (
                 <div key={record.id} className="p-6 md:p-8 flex items-center justify-between hover:bg-gray-50 transition-colors">
                    <div className="flex items-center space-x-6">
                       <div className="w-12 h-12 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center">
                          <ShoppingBag size={20} className="text-gray-400" />
                       </div>
                       <div>
                          <p className="font-medium mb-1">{record.description}</p>
                          <p className="text-sm text-gray-500">{record.transactionType} • {new Date(record.createdAt).toLocaleDateString()}</p>
                       </div>
                    </div>
                    <div className="text-right">
                       <p className="font-medium mb-1">{formatCurrency(record.amount)}</p>
                       <div className="flex items-center justify-end space-x-1.5">
                          <CheckCircle2 size={12} className="text-green-500" />
                          <span className="text-[10px] uppercase font-bold tracking-widest text-green-600">{record.status}</span>
                       </div>
                    </div>
                 </div>
               ))}
            </div>
         </div>
      </div>

      <div className="p-8 bg-gray-50 rounded-[2rem] border border-gray-100">
         <p className="text-sm text-gray-500 leading-loose">
           Important: Your PAIR wallet shows your payment records, installment balances, and refund activity. 
           All payments are securely processed through Paystack. The wallet balance shown is only a platform record.
         </p>
      </div>
    </div>
  );
}

function VendorProducts() {
   return (
      <div className="max-w-4xl mx-auto">
         <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-12 gap-4">
            <h2 className="text-3xl md:text-5xl font-display font-medium tracking-tighter">My Inventory</h2>
            <Link to="/dashboard/products/new" className="btn-primary px-6 py-3 text-center md:w-auto">List New PAIR</Link>
         </div>
         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Approved Request */}
            <div className="border border-gray-100 rounded-3xl p-6 md:p-8 bg-white shadow-sm flex flex-col">
               <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center space-x-4">
                     <span className="w-16 h-16 bg-gray-100 rounded-xl" />
                     <div>
                        <p className="font-bold uppercase text-sm mb-1">Nike Dunk Low Retail</p>
                        <p className="text-sm text-gray-500">₦85,000</p>
                     </div>
                  </div>
                  <span className="text-[10px] uppercase font-bold text-green-600 bg-green-100 px-3 py-1 rounded-full">Approved</span>
               </div>
               <p className="text-sm text-gray-500 mb-6 leading-relaxed">Your sneaker is live on the marketplace.</p>
               <Link to={`/product/1`} className="text-[10px] font-bold uppercase tracking-widest text-accent text-left mt-auto hover:underline">View Listing</Link>
            </div>
            
            {/* Rejected Request */}
            <div className="border border-gray-100 rounded-3xl p-6 md:p-8 bg-white shadow-sm flex flex-col">
               <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center space-x-4">
                     <span className="w-16 h-16 bg-gray-100 rounded-xl" />
                     <div>
                        <p className="font-bold uppercase text-sm mb-1">Air Jordan 4</p>
                        <p className="text-sm text-gray-500">₦120,000</p>
                     </div>
                  </div>
                  <span className="text-[10px] uppercase font-bold text-red-600 bg-red-100 px-3 py-1 rounded-full">Rejected</span>
               </div>
               <div className="bg-red-50 text-red-700 text-[10px] p-4 rounded-xl mb-6 font-bold leading-relaxed tracking-widest uppercase">
                  Reason: Images provided do not match the selected condition (Fairly Used). Needs clear sole pictures.
               </div>
               <Link to="/dashboard/products/new" className="text-[10px] font-bold uppercase tracking-widest text-accent text-left mt-auto hover:underline">Edit & Resubmit</Link>
            </div>

            {/* Pending Request */}
            <div className="border border-gray-100 rounded-3xl p-6 md:p-8 bg-white shadow-sm flex flex-col">
               <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center space-x-4">
                     <span className="w-16 h-16 bg-gray-100 rounded-xl" />
                     <div>
                        <p className="font-bold uppercase text-sm mb-1">Yeezy Boost 350</p>
                        <p className="text-sm text-gray-500">₦150,000</p>
                     </div>
                  </div>
                  <span className="text-[10px] uppercase font-bold text-yellow-600 bg-yellow-100 px-3 py-1 rounded-full">Pending</span>
               </div>
               <p className="text-sm text-gray-500 mb-6 leading-relaxed">Awaiting verification by admin team.</p>
            </div>
         </div>
      </div>
   );
}

function AddProduct() {
   const navigate = useNavigate();
   const [condition, setCondition] = useState("New");

   return (
      <div className="max-w-2xl mx-auto">
         <h2 className="text-3xl md:text-5xl font-display font-medium mb-12 tracking-tight">List New PAIR</h2>
         
         <form className="space-y-12" onSubmit={(e) => { e.preventDefault(); navigate("/dashboard/products"); }}>
            {/* Basic Info */}
            <section>
               <h3 className="text-xl font-medium mb-6">Basic Information</h3>
               <div className="bg-white border border-gray-100 rounded-[2rem] p-8 md:p-12 shadow-sm space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                     <div>
                        <label className="block text-[10px] uppercase font-bold tracking-widest text-gray-400 mb-2">Product Name</label>
                        <input type="text" required className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 outline-none focus:border-black transition-colors" placeholder="e.g. Air Force 1 '07" />
                     </div>
                     <div>
                        <label className="block text-[10px] uppercase font-bold tracking-widest text-gray-400 mb-2">Brand</label>
                        <input type="text" required className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 outline-none focus:border-black transition-colors" placeholder="e.g. Nike" />
                     </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                     <div>
                        <label className="block text-[10px] uppercase font-bold tracking-widest text-gray-400 mb-2">Category</label>
                        <select className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 outline-none focus:border-black transition-colors">
                           <option>Sneakers</option>
                           <option>Luxury</option>
                           <option>Boots</option>
                           <option>Sandals</option>
                        </select>
                     </div>
                     <div>
                        <label className="block text-[10px] uppercase font-bold tracking-widest text-gray-400 mb-2">Size (EU)</label>
                        <input type="number" required className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 outline-none focus:border-black transition-colors" placeholder="42" />
                     </div>
                     <div className="col-span-2 md:col-span-1">
                        <label className="block text-[10px] uppercase font-bold tracking-widest text-gray-400 mb-2">Price (₦)</label>
                        <input type="number" required className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 outline-none focus:border-black transition-colors" placeholder="85000" />
                     </div>
                  </div>
               </div>
            </section>

            {/* Condition */}
            <section>
               <h3 className="text-xl font-medium mb-6">Condition</h3>
               <div className="bg-white border border-gray-100 rounded-[2rem] p-8 md:p-12 shadow-sm">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                     {["New", "Fairly Used", "Heavily Used"].map((opt) => (
                        <button
                           key={opt}
                           type="button"
                           onClick={() => setCondition(opt)}
                           className={`py-4 px-6 rounded-2xl border text-sm font-bold uppercase tracking-widest transition-all ${
                              condition === opt 
                              ? "border-black bg-black text-white shadow-lg" 
                              : "border-gray-100 bg-gray-50 text-gray-400 hover:border-gray-200"
                           }`}
                        >
                           {opt}
                        </button>
                     ))}
                  </div>
                  <p className="mt-6 text-[10px] text-gray-400 uppercase font-medium tracking-widest text-center">
                     {condition === "New" && "Brand new in box, never worn."}
                     {condition === "Fairly Used" && "Slightly worn, minimal scuffs, original shape intact."}
                     {condition === "Heavily Used" && "Visible wear and tear, but still functional."}
                  </p>
               </div>
            </section>

            {/* Images & Details */}
            <section>
               <h3 className="text-xl font-medium mb-6">Images & Description</h3>
               <div className="bg-white border border-gray-100 rounded-[2rem] p-8 md:p-12 shadow-sm space-y-8">
                  <div>
                     <label className="block text-[10px] uppercase font-bold tracking-widest text-gray-400 mb-4">Upload Product Images (Max 5)</label>
                     <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        <div className="aspect-square border-2 border-dashed border-gray-100 rounded-2xl flex flex-col items-center justify-center text-gray-300 hover:bg-gray-50 hover:border-gray-200 transition-all cursor-pointer group">
                           <Upload size={24} className="mb-2 group-hover:text-black transition-colors" />
                           <span className="text-[8px] font-black uppercase tracking-widest">Add Main</span>
                        </div>
                        {[1, 2, 3].map((i) => (
                           <div key={i} className="aspect-square bg-gray-50 border border-gray-100 rounded-2xl flex items-center justify-center text-gray-200">
                             <Package size={20} />
                           </div>
                        ))}
                     </div>
                  </div>

                  <div>
                     <label className="block text-[10px] uppercase font-bold tracking-widest text-gray-400 mb-2">Description</label>
                     <textarea 
                        className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-6 outline-none focus:border-black transition-colors h-40 text-sm leading-relaxed" 
                        placeholder="Detail the authenticity, condition, and any accessories included (box, laces, etc)..."
                     ></textarea>
                  </div>
               </div>
            </section>

            <div className="pt-6">
               <button type="submit" className="btn-primary w-full py-5 text-lg">
                  Submit for Approval
               </button>
               <p className="text-center text-[10px] text-gray-400 uppercase font-black tracking-[0.2em] mt-6 leading-relaxed">
                  By submitting, you agree that this pair is authentic. <br />
                  Fraudulent listings will result in permanent account ban.
               </p>
            </div>
         </form>
      </div>
   );
}

function VendorVerification() {
  return (
    <div className="max-w-2xl">
      <h2 className="text-4xl uppercase mb-6 tracking-tighter">Verification</h2>
      <p className="text-gray-500 mb-12 leading-relaxed">
        To start selling on PAIR, we need to verify your identity. This helps maintain trust and ensures only genuine footwear reaches our customers.
      </p>

      <div className="space-y-8">
         <div className="flex items-center justify-between p-6 bg-green-50 border border-green-100 rounded-2xl">
            <div className="flex items-center space-x-4">
               <CheckCircle2 className="text-green-600" />
               <div>
                  <p className="font-bold">Government ID</p>
                  <p className="text-xs text-green-700">Verified (International Passport)</p>
               </div>
            </div>
         </div>

         <div className="p-8 border-2 border-dashed border-gray-200 rounded-3xl text-center">
            <AlertCircle size={32} className="mx-auto text-orange-400 mb-4" />
            <h4 className="text-lg font-bold mb-2">Live Video Verification Required</h4>
            <p className="text-sm text-gray-500 mb-8">Please schedule a brief video call with our verification team.</p>
            <button className="btn-outline w-full py-4">Schedule Call</button>
         </div>
      </div>
    </div>
  );
}

function ProfileSettings() {
  const { user } = useAuth();
  
  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-3xl md:text-5xl font-display font-medium mb-12 tracking-tight">Profile</h2>
      
      <div className="space-y-12">
        {/* Personal Details */}
        <section>
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-medium">Personal Information</h3>
            <button className="text-[10px] uppercase font-bold tracking-widest text-gray-400 hover:text-black transition-colors underline underline-offset-4">
              Edit
            </button>
          </div>
          <div className="bg-white border border-gray-100 rounded-[2rem] p-8 md:p-12 shadow-sm space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <p className="text-[10px] uppercase font-bold tracking-widest text-gray-400 mb-2">First Name</p>
                <p className="font-medium">Jane</p>
              </div>
              <div>
                <p className="text-[10px] uppercase font-bold tracking-widest text-gray-400 mb-2">Last Name</p>
                <p className="font-medium">Doe</p>
              </div>
              <div className="md:col-span-2">
                <p className="text-[10px] uppercase font-bold tracking-widest text-gray-400 mb-2">Email Address</p>
                <p className="font-medium">jane.doe@example.com</p>
              </div>
              <div className="md:col-span-2">
                <p className="text-[10px] uppercase font-bold tracking-widest text-gray-400 mb-2">Phone Number</p>
                <p className="font-medium">+234 (0) 800 000 0000</p>
              </div>
            </div>
          </div>
        </section>

        {/* Saved Addresses */}
        <section>
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-medium">Shipping Address</h3>
            <button className="text-[10px] uppercase font-bold tracking-widest text-gray-400 hover:text-black transition-colors underline underline-offset-4">
              Add New
            </button>
          </div>
          <div className="bg-white border border-gray-100 rounded-[2rem] p-8 md:p-12 shadow-sm relative overflow-hidden group">
            <div className="absolute top-4 right-4 sm:top-8 sm:right-8 opacity-0 group-hover:opacity-100 transition-opacity">
              <button className="text-[10px] uppercase font-bold tracking-widest text-accent hover:text-black transition-colors mr-4 underline underline-offset-2">
                Edit
              </button>
            </div>
            
            <div className="flex items-start space-x-3 mb-4">
              <CheckCircle2 size={18} className="text-accent mt-0.5" />
              <p className="text-[10px] font-black uppercase tracking-widest text-accent">Default</p>
            </div>
            
            <p className="font-medium mb-1">Jane Doe</p>
            <p className="text-sm text-gray-500 leading-relaxed">
              123 Street Name, <br />
              Lekki Phase 1, <br />
              Lagos, Nigeria.
            </p>
          </div>
        </section>

        {/* Security */}
        <section>
          <h3 className="text-2xl font-medium mb-8">Security</h3>
          <div className="bg-white border border-gray-100 rounded-[2.5rem] p-10 md:p-14 shadow-sm">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-xl font-medium mb-2">Password</p>
                <p className="text-gray-400 tracking-widest">************</p>
              </div>
              <button className="text-[10px] uppercase font-black tracking-widest text-gray-300 px-8 py-4 border border-gray-100 rounded-full hover:border-black hover:text-black transition-all">
                UPDATE
              </button>
            </div>
          </div>
        </section>

        {/* Admin Portal (Only for Admins) */}
        {user?.role === "admin" && (
          <section>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-medium">Admin</h3>
            </div>
            <div className="bg-white border border-gray-100 rounded-[2rem] p-8 md:p-12 shadow-sm space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium mb-1">Admin Control Panel</p>
                  <p className="text-sm text-gray-500">Super Admin Access Level</p>
                </div>
                <Link to="/admin" className="text-[10px] uppercase font-bold tracking-widest text-gray-400 hover:text-black transition-colors border border-gray-200 px-4 py-2 rounded-full">
                  ENTER
                </Link>
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
