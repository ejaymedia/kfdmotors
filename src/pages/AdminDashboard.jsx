import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Car,
  MessageSquare,
  LogOut,
  Menu,
  X,
  Plus,
  Search,
  Trash2,
  Edit,
  Eye,
  TrendingUp,
  Users,
  ShoppingBag,
  Bell,
  Flame,
  ChevronDown,
  CheckCircle,
  AlertCircle,
  XCircle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Logo from "/logo/Logo.png";

const sidebarLinks = [
  { id: "overview", icon: LayoutDashboard, label: "Overview" },
  { id: "inventory", icon: Car, label: "Inventory" },
  { id: "hotdeals", icon: Flame, label: "Hot Deals" },
  { id: "enquiries", icon: MessageSquare, label: "Enquiries" },
];

const emptyCarForm = {
  make: "",
  model: "",
  year: "",
  price: "",
  condition: "New",
  fuel: "Petrol",
  mileage: "",
  transmission: "Automatic",
  type: "SUV",
  color: "",
  engine: "",
  power: "",
  seats: "",
  description: "",
  features: "",
  image: "",
  hot_deal: false,
  status: "Available",
};

const initialInventory = [
  {
    id: "1",
    make: "Toyota",
    model: "Land Cruiser V8",
    year: "2023",
    price: 85000000,
    condition: "New",
    fuel: "Petrol",
    mileage: "0 km",
    transmission: "Automatic",
    type: "SUV",
    color: "Pearl White",
    engine: "4.5L V8",
    power: "309 hp",
    seats: 7,
    description: "Flagship SUV.",
    features: "360 Camera, JBL Audio",
    image: "/src/assets/cars/car1.jpg",
    hot_deal: true,
    status: "Available",
  },
  {
    id: "2",
    make: "Mercedes-Benz",
    model: "GLE 450 AMG",
    year: "2023",
    price: 120000000,
    condition: "New",
    fuel: "Petrol",
    mileage: "0 km",
    transmission: "Automatic",
    type: "SUV",
    color: "Obsidian Black",
    engine: "3.0L Inline-6",
    power: "362 hp",
    seats: 5,
    description: "Luxury SUV.",
    features: "Burmester Audio, Panoramic Roof",
    image: "/src/assets/cars/car2.jpg",
    hot_deal: true,
    status: "Available",
  },
  {
    id: "3",
    make: "BMW",
    model: "X5 xDrive40i",
    year: "2022",
    price: 95000000,
    condition: "Used",
    fuel: "Petrol",
    mileage: "12,000 km",
    transmission: "Automatic",
    type: "SUV",
    color: "Carbon Black",
    engine: "3.0L TwinPower",
    power: "335 hp",
    seats: 5,
    description: "Performance SUV.",
    features: "xDrive, Harman Kardon",
    image: "/src/assets/cars/car3.jpg",
    hot_deal: false,
    status: "Sold",
  },
];

const initialEnquiries = [
  {
    id: "1",
    name: "Chukwuemeka Obi",
    phone: "+234 801 234 5678",
    email: "c.obi@email.com",
    interest: "Buying a Car",
    message: "I am interested in the Land Cruiser V8. Please contact me.",
    date: "2026-01-15",
    status: "New",
  },
  {
    id: "2",
    name: "Amina Bello",
    phone: "+234 802 345 6789",
    email: "amina@email.com",
    interest: "Importing a Car",
    message: "I want to import a 2024 BMW X7 from the UK.",
    date: "2026-01-14",
    status: "Responded",
  },
  {
    id: "3",
    name: "Tunde Fashola",
    phone: "+234 803 456 7890",
    email: "tunde@email.com",
    interest: "Financing Options",
    message: "I need details about your 24-month financing plan.",
    date: "2026-01-13",
    status: "New",
  },
  {
    id: "4",
    name: "Ngozi Adeyemi",
    phone: "+234 804 567 8901",
    email: "ngozi@email.com",
    interest: "Buying a Car",
    message: "Is the Porsche Cayenne S still available?",
    date: "2026-01-12",
    status: "Closed",
  },
];

const statusStyles = {
  Available: "bg-green-50 text-green-700 border border-green-100",
  Sold: "bg-red-50 text-red-600 border border-red-100",
  Reserved: "bg-yellow-50 text-yellow-700 border border-yellow-100",
  New: "bg-blue-50 text-blue-700 border border-blue-100",
  Responded: "bg-yellow-50 text-yellow-700 border border-yellow-100",
  Closed: "bg-gray-100 text-gray-500 border border-gray-200",
};

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [inventory, setInventory] = useState(initialInventory);
  const [enquiries, setEnquiries] = useState(initialEnquiries);

  // Modal states
  const [showCarModal, setShowCarModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEnquiryModal, setShowEnquiryModal] = useState(false);
  const [selectedCar, setSelectedCar] = useState(null);
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleteType, setDeleteType] = useState("");
  const [carForm, setCarForm] = useState(emptyCarForm);
  const [isEditing, setIsEditing] = useState(false);
  const [toast, setToast] = useState(null);

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleLogout = async () => {
    await logout();
    navigate("/admin-login");
  };

  // ── Inventory CRUD ──
  const openAddCar = () => {
    setCarForm(emptyCarForm);
    setIsEditing(false);
    setShowCarModal(true);
  };

  const openEditCar = (car) => {
    setCarForm({ ...car, features: Array.isArray(car.features) ? car.features.join(", ") : car.features });
    setIsEditing(true);
    setSelectedCar(car);
    setShowCarModal(true);
  };

  const handleSaveCar = () => {
    if (!carForm.make || !carForm.model || !carForm.price) {
      showToast("Please fill in Make, Model and Price.", "error");
      return;
    }
    if (isEditing) {
      setInventory((prev) =>
        prev.map((c) => (c.id === selectedCar.id ? { ...carForm, id: selectedCar.id } : c))
      );
      showToast("Vehicle updated successfully.");
    } else {
      const newCar = { ...carForm, id: Date.now().toString() };
      setInventory((prev) => [newCar, ...prev]);
      showToast("Vehicle added successfully.");
    }
    setShowCarModal(false);
    setCarForm(emptyCarForm);
  };

  const confirmDelete = (id, type) => {
    setDeleteTarget(id);
    setDeleteType(type);
    setShowDeleteModal(true);
  };

  const handleDelete = () => {
    if (deleteType === "car") {
      setInventory((prev) => prev.filter((c) => c.id !== deleteTarget));
      showToast("Vehicle removed.");
    } else if (deleteType === "enquiry") {
      setEnquiries((prev) => prev.filter((e) => e.id !== deleteTarget));
      showToast("Enquiry deleted.");
    }
    setShowDeleteModal(false);
    setDeleteTarget(null);
  };

  const toggleHotDeal = (id) => {
    setInventory((prev) =>
      prev.map((c) => (c.id === id ? { ...c, hot_deal: !c.hot_deal } : c))
    );
    showToast("Hot deal status updated.");
  };

  // ── Enquiry actions ──
  const updateEnquiryStatus = (id, status) => {
    setEnquiries((prev) =>
      prev.map((e) => (e.id === id ? { ...e, status } : e))
    );
    showToast("Enquiry status updated.");
  };

  const openEnquiry = (enquiry) => {
    setSelectedEnquiry(enquiry);
    setShowEnquiryModal(true);
  };

  // ── Filtered data ──
  const hotDeals = inventory.filter((c) => c.hot_deal);

  const filteredInventory = inventory.filter(
    (car) =>
      car.make.toLowerCase().includes(searchQuery.toLowerCase()) ||
      car.model.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredHotDeals = hotDeals.filter(
    (car) =>
      car.make.toLowerCase().includes(searchQuery.toLowerCase()) ||
      car.model.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredEnquiries = enquiries.filter(
    (enq) =>
      enq.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      enq.interest.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 flex">

      {/* ── Sidebar ── */}
      <aside
        className={`fixed top-0 left-0 h-full z-50 w-64 bg-white border-r border-gray-100 flex flex-col transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        {/* Logo */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
          <img src={Logo} alt="Kafadona Motors" className="h-8 w-auto object-contain" />
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-gray-400 hover:text-gray-600"
          >
            <X size={18} />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex flex-col gap-1 px-3 py-5 flex-1">
          {sidebarLinks.map((link) => {
            const Icon = link.icon;
            return (
              <button
                key={link.id}
                onClick={() => {
                  setActiveTab(link.id);
                  setSidebarOpen(false);
                  setSearchQuery("");
                }}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 text-left ${
                  activeTab === link.id
                    ? "bg-blue-600 text-white shadow-sm shadow-blue-200"
                    : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
                }`}
              >
                <Icon size={17} />
                {link.label}
                {link.id === "enquiries" && enquiries.filter((e) => e.status === "New").length > 0 && (
                  <span className="ml-auto bg-blue-100 text-blue-600 text-[10px] font-bold px-2 py-0.5 rounded-full">
                    {enquiries.filter((e) => e.status === "New").length}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* User + Logout */}
        <div className="px-4 py-5 border-t border-gray-100">
          <div className="flex items-center gap-3 mb-3 px-2">
            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center shrink-0">
              <span className="text-white text-xs font-bold">
                {currentUser?.email?.[0]?.toUpperCase() ?? "A"}
              </span>
            </div>
            <div className="overflow-hidden">
              <p className="text-gray-800 text-xs font-semibold truncate">
                {currentUser?.email ?? "Admin"}
              </p>
              <p className="text-gray-400 text-[10px]">Administrator</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-red-500 hover:bg-red-50 transition-colors"
          >
            <LogOut size={15} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Overlay */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/30 z-40 lg:hidden"
        />
      )}

      {/* ── Main ── */}
      <div className="flex-1 lg:ml-64 flex flex-col min-h-screen">

        {/* Topbar */}
        <header className="sticky top-0 z-30 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden text-gray-500 hover:text-gray-800"
            >
              <Menu size={22} />
            </button>
            <div>
              <h1 className="text-gray-900 font-bold text-base capitalize">
                {activeTab === "overview" && "Dashboard Overview"}
                {activeTab === "inventory" && "Inventory Management"}
                {activeTab === "hotdeals" && "Hot Deals Management"}
                {activeTab === "enquiries" && "Enquiries"}
              </h1>
              <p className="text-gray-400 text-xs hidden sm:block">
                {new Date().toLocaleDateString("en-NG", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <button className="w-9 h-9 rounded-xl border border-gray-100 bg-gray-50 flex items-center justify-center text-gray-500 hover:text-blue-600 transition-colors">
                <Bell size={16} />
              </button>
              {enquiries.filter((e) => e.status === "New").length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-blue-600 rounded-full flex items-center justify-center text-[9px] text-white font-bold">
                  {enquiries.filter((e) => e.status === "New").length}
                </span>
              )}
            </div>
            <button
              onClick={() => navigate("/")}
              className="hidden sm:flex items-center gap-1.5 text-gray-500 hover:text-blue-600 text-xs font-semibold transition-colors"
            >
              <Eye size={14} />
              View Site
            </button>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 px-6 py-8">

          {/* ══ OVERVIEW ══ */}
          {activeTab === "overview" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              {/* Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
                {[
                  { icon: Car, label: "Total Vehicles", value: inventory.length, sub: `${inventory.filter((c) => c.status === "Available").length} available` },
                  { icon: Flame, label: "Hot Deals", value: hotDeals.length, sub: "This week" },
                  { icon: MessageSquare, label: "Enquiries", value: enquiries.length, sub: `${enquiries.filter((e) => e.status === "New").length} new` },
                  { icon: ShoppingBag, label: "Cars Sold", value: inventory.filter((c) => c.status === "Sold").length, sub: "Total sold" },
                ].map((stat, index) => {
                  const Icon = stat.icon;
                  return (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.08 }}
                      className="bg-white border border-gray-100 rounded-2xl p-5 hover:shadow-sm transition-shadow"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
                          <Icon size={18} className="text-blue-600" />
                        </div>
                        <TrendingUp size={14} className="text-green-500" />
                      </div>
                      <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                      <p className="text-gray-500 text-xs mt-1">{stat.label}</p>
                      <p className="text-blue-600 text-[10px] font-semibold mt-1">{stat.sub}</p>
                    </motion.div>
                  );
                })}
              </div>

              {/* Recent Enquiries */}
              <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden mb-6">
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                  <h2 className="text-gray-900 font-bold text-base">Recent Enquiries</h2>
                  <button onClick={() => setActiveTab("enquiries")} className="text-blue-600 text-xs font-semibold hover:text-blue-700">
                    View All
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-100 bg-gray-50">
                        {["Name", "Interest", "Date", "Status"].map((h) => (
                          <th key={h} className="text-left text-gray-500 text-xs font-semibold px-6 py-3 tracking-wide">
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {enquiries.slice(0, 4).map((enq) => (
                        <tr key={enq.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-3 text-gray-800 text-sm font-semibold">{enq.name}</td>
                          <td className="px-6 py-3 text-gray-500 text-sm">{enq.interest}</td>
                          <td className="px-6 py-3 text-gray-400 text-xs">{enq.date}</td>
                          <td className="px-6 py-3">
                            <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${statusStyles[enq.status]}`}>
                              {enq.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Recent Inventory */}
              <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden">
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                  <h2 className="text-gray-900 font-bold text-base">Recent Inventory</h2>
                  <button onClick={() => setActiveTab("inventory")} className="text-blue-600 text-xs font-semibold hover:text-blue-700">
                    View All
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-100 bg-gray-50">
                        {["Vehicle", "Year", "Price", "Condition", "Hot Deal", "Status"].map((h) => (
                          <th key={h} className="text-left text-gray-500 text-xs font-semibold px-6 py-3 tracking-wide">
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {inventory.slice(0, 4).map((car) => (
                        <tr key={car.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-3 text-gray-800 text-sm font-semibold">{car.make} {car.model}</td>
                          <td className="px-6 py-3 text-gray-500 text-sm">{car.year}</td>
                          <td className="px-6 py-3 text-blue-600 text-sm font-bold">₦{Number(car.price).toLocaleString()}</td>
                          <td className="px-6 py-3 text-gray-500 text-sm">{car.condition}</td>
                          <td className="px-6 py-3">
                            {car.hot_deal ? (
                              <span className="flex items-center gap-1 text-orange-500 text-xs font-bold">
                                <Flame size={12} /> Yes
                              </span>
                            ) : (
                              <span className="text-gray-300 text-xs">—</span>
                            )}
                          </td>
                          <td className="px-6 py-3">
                            <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${statusStyles[car.status]}`}>
                              {car.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          )}

          {/* ══ INVENTORY ══ */}
          {activeTab === "inventory" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-6">
                <div className="relative flex-1">
                  <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search inventory..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-white border border-gray-200 rounded-xl pl-10 pr-4 py-2.5 text-gray-800 text-sm placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all"
                  />
                </div>
                <button
                  onClick={openAddCar}
                  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-all duration-300 whitespace-nowrap"
                >
                  <Plus size={15} />
                  Add Vehicle
                </button>
              </div>

              <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-100 bg-gray-50">
                        {["Vehicle", "Year", "Price", "Condition", "Hot Deal", "Status", "Actions"].map((h) => (
                          <th key={h} className="text-left text-gray-500 text-xs font-semibold px-6 py-4 tracking-wide whitespace-nowrap">
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {filteredInventory.map((car) => (
                        <tr key={car.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4">
                            <p className="text-gray-800 text-sm font-semibold">{car.make} {car.model}</p>
                            <p className="text-gray-400 text-xs mt-0.5">{car.type}</p>
                          </td>
                          <td className="px-6 py-4 text-gray-500 text-sm">{car.year}</td>
                          <td className="px-6 py-4 text-blue-600 text-sm font-bold">₦{Number(car.price).toLocaleString()}</td>
                          <td className="px-6 py-4 text-gray-500 text-sm">{car.condition}</td>
                          <td className="px-6 py-4">
                            <button
                              onClick={() => toggleHotDeal(car.id)}
                              className={`flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full border transition-all duration-200 ${
                                car.hot_deal
                                  ? "bg-orange-50 text-orange-500 border-orange-100 hover:bg-orange-100"
                                  : "bg-gray-50 text-gray-400 border-gray-100 hover:bg-gray-100"
                              }`}
                            >
                              <Flame size={11} />
                              {car.hot_deal ? "Yes" : "No"}
                            </button>
                          </td>
                          <td className="px-6 py-4">
                            <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${statusStyles[car.status]}`}>
                              {car.status}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => openEditCar(car)}
                                className="w-8 h-8 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-400 hover:text-blue-600 hover:border-blue-200 hover:bg-blue-50 transition-all"
                              >
                                <Edit size={13} />
                              </button>
                              <button
                                onClick={() => confirmDelete(car.id, "car")}
                                className="w-8 h-8 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-400 hover:text-red-500 hover:border-red-100 hover:bg-red-50 transition-all"
                              >
                                <Trash2 size={13} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {filteredInventory.length === 0 && (
                  <div className="py-16 text-center">
                    <Car size={32} className="text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-400 text-sm">No vehicles found.</p>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* ══ HOT DEALS ══ */}
          {activeTab === "hotdeals" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-6">
                <div className="relative flex-1">
                  <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search hot deals..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-white border border-gray-200 rounded-xl pl-10 pr-4 py-2.5 text-gray-800 text-sm placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all"
                  />
                </div>
                <button
                  onClick={openAddCar}
                  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-all duration-300 whitespace-nowrap"
                >
                  <Plus size={15} />
                  Add Vehicle
                </button>
              </div>

              <div className="bg-blue-50 border border-blue-100 rounded-2xl px-5 py-3 mb-6 flex items-center gap-2">
                <Flame size={15} className="text-blue-600" />
                <p className="text-blue-700 text-sm font-semibold">
                  {hotDeals.length} vehicle{hotDeals.length !== 1 ? "s" : ""} currently marked as hot deals. Toggle the flame button in the Inventory tab to add or remove.
                </p>
              </div>

              <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-100 bg-gray-50">
                        {["Vehicle", "Year", "Price", "Condition", "Status", "Actions"].map((h) => (
                          <th key={h} className="text-left text-gray-500 text-xs font-semibold px-6 py-4 tracking-wide whitespace-nowrap">
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {filteredHotDeals.map((car) => (
                        <tr key={car.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              <Flame size={14} className="text-orange-400 shrink-0" />
                              <div>
                                <p className="text-gray-800 text-sm font-semibold">{car.make} {car.model}</p>
                                <p className="text-gray-400 text-xs mt-0.5">{car.type}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-gray-500 text-sm">{car.year}</td>
                          <td className="px-6 py-4 text-blue-600 text-sm font-bold">₦{Number(car.price).toLocaleString()}</td>
                          <td className="px-6 py-4 text-gray-500 text-sm">{car.condition}</td>
                          <td className="px-6 py-4">
                            <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${statusStyles[car.status]}`}>
                              {car.status}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => openEditCar(car)}
                                className="w-8 h-8 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-400 hover:text-blue-600 hover:border-blue-200 hover:bg-blue-50 transition-all"
                              >
                                <Edit size={13} />
                              </button>
                              <button
                                onClick={() => toggleHotDeal(car.id)}
                                className="w-8 h-8 rounded-lg bg-orange-50 border border-orange-100 flex items-center justify-center text-orange-400 hover:text-red-500 hover:border-red-100 hover:bg-red-50 transition-all"
                              >
                                <Flame size={13} />
                              </button>
                              <button
                                onClick={() => confirmDelete(car.id, "car")}
                                className="w-8 h-8 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-400 hover:text-red-500 hover:border-red-100 hover:bg-red-50 transition-all"
                              >
                                <Trash2 size={13} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {filteredHotDeals.length === 0 && (
                  <div className="py-16 text-center">
                    <Flame size={32} className="text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-400 text-sm font-semibold">No hot deals yet.</p>
                    <p className="text-gray-400 text-xs mt-1">Mark vehicles as hot deals from the Inventory tab.</p>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* ══ ENQUIRIES ══ */}
          {activeTab === "enquiries" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div className="relative mb-6">
                <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search enquiries..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white border border-gray-200 rounded-xl pl-10 pr-4 py-2.5 text-gray-800 text-sm placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all"
                />
              </div>

              <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-100 bg-gray-50">
                        {["Name", "Phone", "Interest", "Message", "Date", "Status", "Actions"].map((h) => (
                          <th key={h} className="text-left text-gray-500 text-xs font-semibold px-6 py-4 tracking-wide whitespace-nowrap">
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {filteredEnquiries.map((enq) => (
                        <tr key={enq.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4 text-gray-800 text-sm font-semibold whitespace-nowrap">{enq.name}</td>
                          <td className="px-6 py-4 text-gray-500 text-sm whitespace-nowrap">{enq.phone}</td>
                          <td className="px-6 py-4 text-gray-500 text-sm whitespace-nowrap">{enq.interest}</td>
                          <td className="px-6 py-4 text-gray-400 text-xs max-w-xs truncate">{enq.message}</td>
                          <td className="px-6 py-4 text-gray-400 text-xs whitespace-nowrap">{enq.date}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <select
                              value={enq.status}
                              onChange={(e) => updateEnquiryStatus(enq.id, e.target.value)}
                              className={`text-[10px] font-bold px-2.5 py-1 rounded-full border cursor-pointer focus:outline-none ${statusStyles[enq.status]}`}
                            >
                              <option value="New">New</option>
                              <option value="Responded">Responded</option>
                              <option value="Closed">Closed</option>
                            </select>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => openEnquiry(enq)}
                                className="w-8 h-8 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-400 hover:text-blue-600 hover:border-blue-200 hover:bg-blue-50 transition-all"
                              >
                                <Eye size={13} />
                              </button>
                              <button
                                onClick={() => confirmDelete(enq.id, "enquiry")}
                                className="w-8 h-8 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-400 hover:text-red-500 hover:border-red-100 hover:bg-red-50 transition-all"
                              >
                                <Trash2 size={13} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {filteredEnquiries.length === 0 && (
                  <div className="py-16 text-center">
                    <MessageSquare size={32} className="text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-400 text-sm">No enquiries found.</p>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </main>
      </div>

      {/* ══ ADD/EDIT CAR MODAL ══ */}
      <AnimatePresence>
        {showCarModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center px-4"
            onClick={(e) => e.target === e.currentTarget && setShowCarModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
                <h2 className="text-gray-900 font-bold text-lg">
                  {isEditing ? "Edit Vehicle" : "Add New Vehicle"}
                </h2>
                <button
                  onClick={() => setShowCarModal(false)}
                  className="w-8 h-8 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X size={16} />
                </button>
              </div>

              <div className="px-6 py-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { label: "Make *", key: "make", placeholder: "e.g. Toyota" },
                  { label: "Model *", key: "model", placeholder: "e.g. Land Cruiser V8" },
                  { label: "Year", key: "year", placeholder: "e.g. 2023" },
                  { label: "Price (₦) *", key: "price", placeholder: "e.g. 85000000" },
                  { label: "Mileage", key: "mileage", placeholder: "e.g. 0 km" },
                  { label: "Color", key: "color", placeholder: "e.g. Pearl White" },
                  { label: "Engine", key: "engine", placeholder: "e.g. 3.5L V6" },
                  { label: "Power", key: "power", placeholder: "e.g. 409 hp" },
                  { label: "Seats", key: "seats", placeholder: "e.g. 7" },
                  { label: "Image URL", key: "image", placeholder: "/src/assets/cars/car1.jpg" },
                ].map((field) => (
                  <div key={field.key} className="flex flex-col gap-1.5">
                    <label className="text-gray-600 text-xs font-semibold">{field.label}</label>
                    <input
                      type="text"
                      value={carForm[field.key]}
                      onChange={(e) => setCarForm({ ...carForm, [field.key]: e.target.value })}
                      placeholder={field.placeholder}
                      className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-gray-800 text-sm placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all"
                    />
                  </div>
                ))}

                {/* Selects */}
                {[
                  { label: "Condition", key: "condition", options: ["New", "Used"] },
                  { label: "Fuel", key: "fuel", options: ["Petrol", "Diesel", "Electric", "Hybrid"] },
                  { label: "Transmission", key: "transmission", options: ["Automatic", "Manual"] },
                  { label: "Type", key: "type", options: ["SUV", "Sedan", "Truck", "Coupe", "Van"] },
                  { label: "Status", key: "status", options: ["Available", "Reserved", "Sold"] },
                ].map((field) => (
                  <div key={field.key} className="flex flex-col gap-1.5">
                    <label className="text-gray-600 text-xs font-semibold">{field.label}</label>
                    <select
                      value={carForm[field.key]}
                      onChange={(e) => setCarForm({ ...carForm, [field.key]: e.target.value })}
                      className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-gray-800 text-sm focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all appearance-none cursor-pointer"
                    >
                      {field.options.map((opt) => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  </div>
                ))}

                {/* Hot Deal Toggle */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-gray-600 text-xs font-semibold">Hot Deal</label>
                  <button
                    onClick={() => setCarForm({ ...carForm, hot_deal: !carForm.hot_deal })}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-semibold transition-all duration-200 ${
                      carForm.hot_deal
                        ? "bg-orange-50 border-orange-200 text-orange-500"
                        : "bg-gray-50 border-gray-200 text-gray-400"
                    }`}
                  >
                    <Flame size={14} />
                    {carForm.hot_deal ? "Yes — Hot Deal" : "No — Regular Listing"}
                  </button>
                </div>

                {/* Description */}
                <div className="flex flex-col gap-1.5 sm:col-span-2">
                  <label className="text-gray-600 text-xs font-semibold">Description</label>
                  <textarea
                    rows={3}
                    value={carForm.description}
                    onChange={(e) => setCarForm({ ...carForm, description: e.target.value })}
                    placeholder="Brief vehicle description..."
                    className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-gray-800 text-sm placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all resize-none"
                  />
                </div>

                {/* Features */}
                <div className="flex flex-col gap-1.5 sm:col-span-2">
                  <label className="text-gray-600 text-xs font-semibold">Features (comma separated)</label>
                  <textarea
                    rows={2}
                    value={carForm.features}
                    onChange={(e) => setCarForm({ ...carForm, features: e.target.value })}
                    placeholder="360 Camera, JBL Audio, Heated Seats..."
                    className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-gray-800 text-sm placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all resize-none"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 px-6 py-5 border-t border-gray-100">
                <button
                  onClick={() => setShowCarModal(false)}
                  className="px-5 py-2.5 rounded-xl border border-gray-200 text-gray-600 text-sm font-semibold hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveCar}
                  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-all duration-300"
                >
                  <CheckCircle size={15} />
                  {isEditing ? "Save Changes" : "Add Vehicle"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ══ DELETE CONFIRM MODAL ══ */}
      <AnimatePresence>
        {showDeleteModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center px-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6 text-center"
            >
              <div className="w-14 h-14 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-4">
                <Trash2 size={24} className="text-red-500" />
              </div>
              <h3 className="text-gray-900 font-bold text-lg mb-2">Are you sure?</h3>
              <p className="text-gray-500 text-sm mb-6">
                This action cannot be undone. The{" "}
                {deleteType === "car" ? "vehicle" : "enquiry"} will be
                permanently removed.
              </p>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="flex-1 px-5 py-2.5 rounded-xl border border-gray-200 text-gray-600 text-sm font-semibold hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  className="flex-1 px-5 py-2.5 rounded-xl bg-red-500 hover:bg-red-600 text-white text-sm font-semibold transition-colors"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ══ ENQUIRY VIEW MODAL ══ */}
      <AnimatePresence>
        {showEnquiryModal && selectedEnquiry && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center px-4"
            onClick={(e) => e.target === e.currentTarget && setShowEnquiryModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-2xl shadow-xl w-full max-w-md"
            >
              <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
                <h2 className="text-gray-900 font-bold text-lg">Enquiry Details</h2>
                <button
                  onClick={() => setShowEnquiryModal(false)}
                  className="w-8 h-8 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X size={16} />
                </button>
              </div>

              <div className="px-6 py-5 flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center shrink-0">
                    <span className="text-white font-bold text-sm">
                      {selectedEnquiry.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                    </span>
                  </div>
                  <div>
                    <p className="text-gray-900 font-bold">{selectedEnquiry.name}</p>
                    <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${statusStyles[selectedEnquiry.status]}`}>
                      {selectedEnquiry.status}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: "Phone", value: selectedEnquiry.phone },
                    { label: "Email", value: selectedEnquiry.email },
                    { label: "Interest", value: selectedEnquiry.interest },
                    { label: "Date", value: selectedEnquiry.date },
                  ].map((item) => (
                    <div key={item.label} className="bg-gray-50 rounded-xl p-3">
                      <p className="text-gray-400 text-xs mb-0.5">{item.label}</p>
                      <p className="text-gray-800 text-sm font-semibold">{item.value}</p>
                    </div>
                  ))}
                </div>

                <div className="bg-gray-50 rounded-xl p-3">
                  <p className="text-gray-400 text-xs mb-1">Message</p>
                  <p className="text-gray-800 text-sm leading-relaxed">{selectedEnquiry.message}</p>
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <a
                    href={`tel:${selectedEnquiry.phone}`}
                    className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold py-2.5 rounded-xl transition-colors"
                  >
                    Call Client
                  </a>
                  <a
                    href={`https://wa.me/${selectedEnquiry.phone.replace(/\s+/g, "").replace("+", "")}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 border border-gray-200 hover:border-blue-600 text-gray-700 hover:text-blue-600 text-sm font-semibold py-2.5 rounded-xl transition-colors"
                  >
                    WhatsApp
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ══ TOAST ══ */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.3 }}
            className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3 rounded-2xl shadow-lg text-sm font-semibold ${
              toast.type === "error"
                ? "bg-red-500 text-white"
                : "bg-gray-900 text-white"
            }`}
          >
            {toast.type === "error" ? (
              <XCircle size={16} />
            ) : (
              <CheckCircle size={16} />
            )}
            {toast.message}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminDashboard;