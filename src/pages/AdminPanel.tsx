import React, { useState, useEffect } from "react";
import { Link, Routes, Route, useNavigate, Navigate, useLocation } from "react-router-dom";
import { 
  BarChart3, 
  Users, 
  Package, 
  ShieldCheck, 
  CreditCard, 
  ArrowLeft,
  Settings,
  Bell,
  Search,
  CheckCircle,
  XCircle,
  Clock,
  Menu,
  X,
  Eye,
  Truck,
  Edit2,
  Trash2,
  Filter,
  DollarSign,
  TrendingUp,
  Save
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { formatCurrency } from "../lib/utils";

export default function AdminPanel() {
  const { user } = useAuth();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  if (!user || user.role !== "admin") {
    return <Navigate to="/" />;
  }

  const menuItems = [
    { path: "/admin", label: "Dashboard", icon: BarChart3 },
    { path: "/admin/vendors", label: "Vendor Approvals", icon: ShieldCheck },
    { path: "/admin/products", label: "Product Moderation", icon: Package },
    { path: "/admin/users", label: "User Management", icon: Users },
    { path: "/admin/payouts", label: "Payout Queue", icon: CreditCard },
    { path: "/admin/settings", label: "Platform Settings", icon: Settings },
  ];

  const closeSidebar = () => setIsSidebarOpen(false);

  useEffect(() => {
    const handleToggle = () => setIsSidebarOpen(prev => !prev);
    window.addEventListener('toggle-admin-sidebar', handleToggle);
    return () => window.removeEventListener('toggle-admin-sidebar', handleToggle);
  }, []);

  return (
    <div className="flex h-full bg-gray-50 overflow-hidden">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={closeSidebar}
        />
      )}

      {/* Admin Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-72 bg-white border-r border-gray-100 flex flex-col transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} pt-[72px] md:pt-0`}>
        <div className="p-4 md:p-6 space-y-2 overflow-y-auto flex-1">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={closeSidebar}
                className={`flex items-center space-x-4 px-4 py-4 rounded-2xl transition-all ${
                  isActive 
                  ? "bg-black text-white shadow-lg" 
                  : "text-gray-500 hover:bg-gray-50 hover:text-black"
                }`}
              >
                <Icon size={20} />
                <span className="text-sm font-bold uppercase tracking-widest leading-none">{item.label}</span>
              </Link>
            );
          })}
        </div>

        <div className="p-4 md:p-6 border-t border-gray-100">
          <div className="bg-gray-50 rounded-2xl p-4 flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-accent border border-white flex items-center justify-center text-white font-bold shrink-0">
              {user.name.charAt(0)}
            </div>
            <div className="overflow-hidden">
              <p className="text-[10px] font-black uppercase tracking-tight leading-none text-gray-900 truncate">{user.name}</p>
              <p className="text-[8px] uppercase tracking-widest text-gray-400 mt-1">Super Admin</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Admin Content */}
      <main className="flex-1 overflow-y-auto flex flex-col w-full relative">
        <div className="p-4 md:p-8 lg:p-12 pb-24">
          <Routes>
            <Route path="/" element={<AdminOverview />} />
            <Route path="/vendors" element={<VendorApprovals />} />
            <Route path="/products" element={<ProductModeration />} />
            <Route path="/users" element={<UserManagement />} />
            <Route path="/payouts" element={<PayoutQueue />} />
            <Route path="/settings" element={<PlatformSettings />} />
            <Route path="*" element={<AdminPlaceholder />} />
          </Routes>
        </div>
      </main>
    </div>
  );
}

function AdminOverview() {
  const stats = [
    { label: "Total Revenue", value: "₦12.5M", change: "+14%", icon: BarChart3 },
    { label: "Pending Vendors", value: "12", change: "4 new", icon: ShieldCheck },
    { label: "Active Listings", value: "842", change: "+22", icon: Package },
    { label: "Total Users", value: "4.2K", change: "+124", icon: Users },
  ];

  return (
    <div className="space-y-8 md:space-y-12">
      <div>
        <h2 className="text-3xl md:text-4xl font-display font-medium tracking-tight mb-2">Platform Overview</h2>
        <p className="text-sm md:text-base text-gray-500">Real-time health and performance metrics of PAIR.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white border border-gray-100 p-6 md:p-8 rounded-[2rem] shadow-sm relative overflow-hidden group">
            <div className="flex justify-between items-start mb-6">
              <div className="p-3 bg-gray-50 rounded-2xl">
                <stat.icon size={20} className="text-gray-400" />
              </div>
              <span className="text-[10px] font-bold text-green-600 bg-green-50 px-2 py-1 rounded-lg">{stat.change}</span>
            </div>
            <p className="text-[10px] uppercase font-bold tracking-widest text-gray-400 mb-2">{stat.label}</p>
            <p className="text-2xl md:text-3xl font-display font-medium">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
        <div className="bg-white border border-gray-100 rounded-[2rem] p-6 md:p-8 shadow-sm">
          <h3 className="text-xl font-medium mb-8">Recent Payout Requests</h3>
          <div className="space-y-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center justify-between py-4 border-b border-gray-50 last:border-0">
                <div className="flex items-center space-x-3 md:space-x-4">
                  <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gray-100 shrink-0" />
                  <div>
                    <p className="font-bold text-xs md:text-sm uppercase">Vendor #{i}293</p>
                    <p className="text-[10px] md:text-xs text-gray-400 mt-1">May 18, 2024</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-xs md:text-sm">₦145,000</p>
                  <span className="text-[8px] md:text-[10px] uppercase font-bold text-yellow-600 block mt-1">Pending</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white border border-gray-100 rounded-[2rem] p-6 md:p-8 shadow-sm">
          <h3 className="text-xl font-medium mb-8">System Alerts</h3>
          <div className="space-y-4">
            <div className="p-4 bg-red-50 rounded-2xl flex items-start space-x-4">
              <XCircle className="text-red-500 mt-1 shrink-0" size={18} />
              <div>
                <p className="text-[10px] font-black uppercase text-red-700 tracking-widest">Urgent</p>
                <p className="text-xs text-red-900 mt-1">High failure rate detected on Paystack Webhooks.</p>
              </div>
            </div>
            <div className="p-4 bg-yellow-50 rounded-2xl flex items-start space-x-4">
              <Clock className="text-yellow-500 mt-1 shrink-0" size={18} />
              <div>
                <p className="text-[10px] font-black uppercase text-yellow-700 tracking-widest">Maintenance</p>
                <p className="text-xs text-yellow-900 mt-1">Scheduled database migration in 4 hours.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function VendorApprovals() {
  const pendingVendors = [
    { id: 1, name: "Sneaker Hub Lagos", email: "info@sneakerhub.ng", nin: "12345678901", date: "2 hrs ago" },
    { id: 2, name: "Drip Street", email: "drip@street.com", nin: "98765432109", date: "5 hrs ago" },
    { id: 3, name: "Legit Pairs", email: "contact@legit.ng", nin: "55566677788", date: "1 day ago" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl md:text-4xl font-display font-medium tracking-tight mb-2">Vendor Approvals</h2>
        <p className="text-sm md:text-base text-gray-500">Review and verify new vendor applications.</p>
      </div>

      <div className="bg-white border border-gray-100 rounded-[2rem] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left min-w-[700px]">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="px-6 py-4 md:px-8 md:py-6 text-[10px] font-black uppercase tracking-widest text-gray-400">Store / Contact</th>
                <th className="px-6 py-4 md:px-8 md:py-6 text-[10px] font-black uppercase tracking-widest text-gray-400">Verification (NIN/BVN)</th>
                <th className="px-6 py-4 md:px-8 md:py-6 text-[10px] font-black uppercase tracking-widest text-gray-400">Applied</th>
                <th className="px-6 py-4 md:px-8 md:py-6 text-[10px] font-black uppercase tracking-widest text-gray-400">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {pendingVendors.map((vendor) => (
                <tr key={vendor.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-6 md:px-8 md:py-8">
                    <p className="font-bold uppercase tracking-tight">{vendor.name}</p>
                    <p className="text-xs text-gray-500 mt-1">{vendor.email}</p>
                  </td>
                  <td className="px-6 py-6 md:px-8 md:py-8 font-mono text-sm">{vendor.nin}</td>
                  <td className="px-6 py-6 md:px-8 md:py-8 text-sm text-gray-500">{vendor.date}</td>
                  <td className="px-6 py-6 md:px-8 md:py-8">
                    <div className="flex space-x-3">
                      <button className="p-2 md:p-3 bg-green-50 text-green-600 rounded-xl hover:bg-green-100 transition-colors border border-green-100" title="Approve">
                        <CheckCircle size={18} />
                      </button>
                      <button className="p-2 md:p-3 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 transition-colors border border-red-100" title="Reject">
                        <XCircle size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function AdminPlaceholder() {
  return (
    <div className="flex flex-col items-center justify-center py-12 md:py-24 text-center px-4">
      <div className="w-20 h-20 md:w-24 md:h-24 bg-gray-50 rounded-full flex items-center justify-center mb-6">
        <ShieldCheck size={32} className="text-gray-200 md:w-10 md:h-10" />
      </div>
      <h3 className="text-xl md:text-2xl font-display font-medium mb-2">Modules Under Maintenance</h3>
      <p className="text-gray-500 text-xs md:text-sm max-w-md">We are currently optimizing this section of the admin panel. Check back soon for the full feature set.</p>
    </div>
  );
}

function ProductModeration() {
  const pendingProducts = [
    { id: 1, vendor: "Sneaker Hub Lagos", title: "Air Jordan 4 Retro 'Military Black'", price: "₦340,000", condition: "Brand New", submittedAt: "2 hrs ago" },
    { id: 2, vendor: "Drip Street", title: "Yeezy Boost 350 V2 'Zebra'", price: "₦280,000", condition: "Fairly Used", submittedAt: "5 hrs ago" },
    { id: 3, vendor: "Legit Pairs", title: "Nike Dunk Low 'Panda'", price: "₦150,000", condition: "Brand New", submittedAt: "1 day ago" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl md:text-4xl font-display font-medium tracking-tight mb-2">Product Moderation</h2>
        <p className="text-sm md:text-base text-gray-500">Review newly listed pairs for authenticity and quality.</p>
      </div>
      <div className="bg-white border border-gray-100 rounded-[2rem] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left min-w-[800px]">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="px-6 py-4 md:px-8 md:py-6 text-[10px] font-black uppercase tracking-widest text-gray-400">Product</th>
                <th className="px-6 py-4 md:px-8 md:py-6 text-[10px] font-black uppercase tracking-widest text-gray-400">Vendor / Price</th>
                <th className="px-6 py-4 md:px-8 md:py-6 text-[10px] font-black uppercase tracking-widest text-gray-400">Status</th>
                <th className="px-6 py-4 md:px-8 md:py-6 text-[10px] font-black uppercase tracking-widest text-gray-400">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {pendingProducts.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-6 md:px-8 md:py-8">
                    <p className="font-bold tracking-tight">{product.title}</p>
                    <p className="text-xs text-gray-500 mt-1 uppercase tracking-widest">{product.condition}</p>
                  </td>
                  <td className="px-6 py-6 md:px-8 md:py-8">
                    <p className="font-medium text-sm">{product.vendor}</p>
                    <p className="font-bold mt-1">{product.price}</p>
                  </td>
                  <td className="px-6 py-6 md:px-8 md:py-8">
                    <span className="text-[10px] font-bold uppercase tracking-widest bg-yellow-50 text-yellow-600 px-3 py-1 rounded-full">Pending</span>
                    <p className="text-xs text-gray-400 mt-2">{product.submittedAt}</p>
                  </td>
                  <td className="px-6 py-6 md:px-8 md:py-8">
                    <div className="flex space-x-3">
                      <button className="p-2 bg-gray-50 text-gray-600 rounded-xl hover:bg-gray-100 transition-colors border border-gray-100" title="Review Listings">
                        <Eye size={18} />
                      </button>
                      <button className="p-2 bg-green-50 text-green-600 rounded-xl hover:bg-green-100 transition-colors border border-green-100" title="Approve">
                        <CheckCircle size={18} />
                      </button>
                      <button className="p-2 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 transition-colors border border-red-100" title="Reject">
                        <XCircle size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function UserManagement() {
  const users = [
    { id: 1, name: "David O.", email: "david.o@example.com", role: "vendor", joined: "Jan 12, 2024", status: "Active" },
    { id: 2, name: "Sarah M.", email: "sarah.m@example.com", role: "customer", joined: "Feb 05, 2024", status: "Active" },
    { id: 3, name: "Emeka U.", email: "emeka.u@example.com", role: "vendor", joined: "Mar 22, 2024", status: "Suspended" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl md:text-4xl font-display font-medium tracking-tight mb-2">User Management</h2>
        <p className="text-sm md:text-base text-gray-500">Manage all registered customers and vendors on PAIR.</p>
      </div>
      <div className="bg-white border border-gray-100 rounded-[2rem] shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center bg-gray-50 border border-gray-100 px-4 py-2 rounded-full w-full max-w-sm">
            <Search size={16} className="text-gray-400 mr-2" />
            <input type="text" placeholder="Search users by name or email..." className="bg-transparent border-none outline-none text-sm w-full" />
          </div>
          <button className="flex items-center space-x-2 text-[10px] font-bold uppercase tracking-widest text-gray-500 hover:text-black">
            <Filter size={16} />
            <span className="hidden sm:inline">Filter</span>
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left min-w-[700px]">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="px-6 py-4 md:px-8 md:py-6 text-[10px] font-black uppercase tracking-widest text-gray-400">User</th>
                <th className="px-6 py-4 md:px-8 md:py-6 text-[10px] font-black uppercase tracking-widest text-gray-400">Role</th>
                <th className="px-6 py-4 md:px-8 md:py-6 text-[10px] font-black uppercase tracking-widest text-gray-400">Status</th>
                <th className="px-6 py-4 md:px-8 md:py-6 text-[10px] font-black uppercase tracking-widest text-gray-400">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {users.map((u) => (
                <tr key={u.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-6 md:px-8 md:py-8">
                    <p className="font-bold">{u.name}</p>
                    <p className="text-xs text-gray-500 mt-1">{u.email}</p>
                  </td>
                  <td className="px-6 py-6 md:px-8 md:py-8">
                    <span className={`text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full ${u.role === 'vendor' ? 'bg-purple-50 text-purple-600' : 'bg-blue-50 text-blue-600'}`}>
                      {u.role}
                    </span>
                  </td>
                  <td className="px-6 py-6 md:px-8 md:py-8">
                    <span className={`text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full ${u.status === 'Active' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                      {u.status}
                    </span>
                    <p className="text-xs text-gray-400 mt-2">joined {u.joined}</p>
                  </td>
                  <td className="px-6 py-6 md:px-8 md:py-8">
                    <div className="flex space-x-3">
                      <button className="p-2 bg-gray-50 text-gray-600 rounded-xl hover:bg-gray-100 transition-colors border border-gray-100" title="Edit User">
                        <Edit2 size={18} />
                      </button>
                      <button className="p-2 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 transition-colors border border-red-100" title={u.status === 'Active' ? 'Suspend' : 'Delete'}>
                        {u.status === 'Active' ? <XCircle size={18} /> : <Trash2 size={18} />}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function PayoutQueue() {
  const payouts = [
    { id: "PO-001", vendor: "Drip Street", amount: "₦280,000", status: "Pending", requested: "2 hrs ago" },
    { id: "PO-002", vendor: "Sneaker Hub Lagos", amount: "₦1,250,000", status: "Processing", requested: "5 hrs ago" },
    { id: "PO-003", vendor: "Legit Pairs", amount: "₦150,000", status: "Completed", requested: "1 day ago" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl md:text-4xl font-display font-medium tracking-tight mb-2">Payout Queue</h2>
        <p className="text-sm md:text-base text-gray-500">Manage vendor withdrawal requests and process payments.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm">
          <p className="text-[10px] uppercase font-bold tracking-widest text-gray-400 mb-2">Pending Payouts</p>
          <p className="text-3xl font-display font-medium text-yellow-600">₦280,000</p>
        </div>
        <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm">
          <p className="text-[10px] uppercase font-bold tracking-widest text-gray-400 mb-2">Processing</p>
          <p className="text-3xl font-display font-medium text-blue-600">₦1,250,000</p>
        </div>
        <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm">
          <p className="text-[10px] uppercase font-bold tracking-widest text-gray-400 mb-2">Paid (This Week)</p>
          <p className="text-3xl font-display font-medium text-green-600">₦4,550,000</p>
        </div>
      </div>
      <div className="bg-white border border-gray-100 rounded-[2rem] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left min-w-[700px]">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="px-6 py-4 md:px-8 md:py-6 text-[10px] font-black uppercase tracking-widest text-gray-400">Request ID / Vendor</th>
                <th className="px-6 py-4 md:px-8 md:py-6 text-[10px] font-black uppercase tracking-widest text-gray-400">Amount</th>
                <th className="px-6 py-4 md:px-8 md:py-6 text-[10px] font-black uppercase tracking-widest text-gray-400">Status</th>
                <th className="px-6 py-4 md:px-8 md:py-6 text-[10px] font-black uppercase tracking-widest text-gray-400">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {payouts.map((p) => (
                <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-6 md:px-8 md:py-8">
                    <p className="font-bold">{p.id}</p>
                    <p className="text-xs text-gray-500 mt-1">{p.vendor}</p>
                  </td>
                  <td className="px-6 py-6 md:px-8 md:py-8">
                    <p className="font-bold text-lg">{p.amount}</p>
                  </td>
                  <td className="px-6 py-6 md:px-8 md:py-8">
                     <span className={`text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full ${
                      p.status === 'Pending' ? 'bg-yellow-50 text-yellow-600' :
                      p.status === 'Processing' ? 'bg-blue-50 text-blue-600' :
                      'bg-green-50 text-green-600'
                    }`}>
                      {p.status}
                    </span>
                    <p className="text-xs text-gray-400 mt-2">{p.requested}</p>
                  </td>
                  <td className="px-6 py-6 md:px-8 md:py-8">
                    {p.status !== 'Completed' && (
                      <button className="px-4 py-2 bg-black text-white text-[10px] font-bold uppercase tracking-widest rounded-xl hover:bg-accent transition-colors">
                        {p.status === 'Pending' ? 'Process' : 'Mark Paid'}
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function PlatformSettings() {
  const [logisticsPrice, setLogisticsPrice] = useState("10000");

  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h2 className="text-3xl md:text-4xl font-display font-medium tracking-tight mb-2">Platform Settings</h2>
        <p className="text-sm md:text-base text-gray-500">Configure global platform rules, fees, and logistics.</p>
      </div>

      <div className="grid grid-cols-1 gap-8">
        <div className="bg-white border border-gray-100 rounded-[2rem] p-8 shadow-sm">
          <div className="flex items-center space-x-3 mb-6">
            <Truck className="text-gray-400" size={24} />
            <h3 className="text-xl font-medium">Logistics & Shipping</h3>
          </div>
          <div className="space-y-6">
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2">Base Waybill Price (₦)</label>
              <div className="relative max-w-xs">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold">₦</span>
                <input 
                  type="number" 
                  value={logisticsPrice}
                  onChange={(e) => setLogisticsPrice(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 pl-10 pr-4 outline-none focus:border-black transition-colors font-medium"
                />
              </div>
              <p className="text-xs text-gray-500 mt-2">This is the flat delivery fee applied to customer orders at checkout.</p>
            </div>
            <button className="btn-primary w-auto inline-flex items-center gap-2">
              <Save size={16} />
              Save Shipping Rates
            </button>
          </div>
        </div>

        <div className="bg-white border border-gray-100 rounded-[2rem] p-8 shadow-sm">
          <div className="flex items-center space-x-3 mb-6">
            <DollarSign className="text-gray-400" size={24} />
            <h3 className="text-xl font-medium">Platform Fees</h3>
          </div>
          <div className="space-y-6">
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2">Vendor Commission Rate (%)</label>
              <div className="relative max-w-xs">
                <input 
                  type="number" 
                  defaultValue={5}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 outline-none focus:border-black transition-colors font-medium"
                />
                 <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold">%</span>
              </div>
              <p className="text-xs text-gray-500 mt-2">The percentage PAIR takes from every successful sneaker sale.</p>
            </div>
            <button className="btn-primary w-auto inline-flex items-center gap-2">
              <Save size={16} />
              Save Fee Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

