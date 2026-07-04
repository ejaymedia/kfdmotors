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
  ShoppingBag,
  Bell,
  Flame,
  CheckCircle,
  XCircle,
  Upload,
  Image,
  Settings,
  ChevronDown,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useSite } from "../context/SiteContext";
import {
  fetchInventory,
  fetchEnquiries,
  addCar,
  updateCar,
  deleteCar,
  toggleHotDeal,
  uploadCarImage,
  deleteCarImage,
  deleteEnquiry,
  updateEnquiryStatus,
  updateSiteSettings,
  uploadSiteAsset,
  fetchSiteSettings,
} from "../supabaseService";

const sidebarLinks = [
  { id: "overview", icon: LayoutDashboard, label: "Overview" },
  { id: "inventory", icon: Car, label: "Inventory" },
  { id: "hotdeals", icon: Flame, label: "Hot Deals" },
  { id: "enquiries", icon: MessageSquare, label: "Enquiries" },
  { id: "settings", icon: Settings, label: "Site Settings" },
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
  image_url: "",
  hot_deal: false,
  status: "Available",
};

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
  const { settings, refreshSettings } = useSite();
  const [activeTab, setActiveTab] = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [inventory, setInventory] = useState([]);
  const [enquiries, setEnquiries] = useState([]);
  const [loadingData, setLoadingData] = useState(true);

  // Car modal states
  const [showCarModal, setShowCarModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEnquiryModal, setShowEnquiryModal] = useState(false);
  const [selectedCar, setSelectedCar] = useState(null);
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleteType, setDeleteType] = useState("");
  const [carForm, setCarForm] = useState(emptyCarForm);
  const [isEditing, setIsEditing] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [uploadingImage, setUploadingImage] = useState(false);
  const [savingCar, setSavingCar] = useState(false);

  // Site settings states
  const [siteForm, setSiteForm] = useState(null);
  const [logoFile, setLogoFile] = useState(null);
  const [logoPreview, setLogoPreview] = useState("");
  const [heroFile, setHeroFile] = useState(null);
  const [heroPreview, setHeroPreview] = useState("");
  const [savingSettings, setSavingSettings] = useState(false);

  const [toast, setToast] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    if (settings) {
      setSiteForm({ ...settings });
      setLogoPreview(settings.logo_url || "");
      setHeroPreview(settings.hero_url || "");
    }
  }, [settings]);

  const loadData = async () => {
    setLoadingData(true);
    const [inv, enq] = await Promise.all([
      fetchInventory(),
      fetchEnquiries(),
    ]);
    setInventory(inv);
    setEnquiries(enq);
    setLoadingData(false);
  };

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleLogout = async () => {
    await logout();
    navigate("/admin-login");
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setLogoFile(file);
    setLogoPreview(URL.createObjectURL(file));
  };

  const handleHeroChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setHeroFile(file);
    setHeroPreview(URL.createObjectURL(file));
  };

  const openAddCar = () => {
    setCarForm(emptyCarForm);
    setIsEditing(false);
    setSelectedCar(null);
    setImageFile(null);
    setImagePreview("");
    setShowCarModal(true);
  };

  const openEditCar = (car) => {
    setCarForm({
      ...car,
      features: Array.isArray(car.features)
        ? car.features.join(", ")
        : car.features || "",
    });
    setIsEditing(true);
    setSelectedCar(car);
    setImageFile(null);
    setImagePreview(car.image_url || "");
    setShowCarModal(true);
  };

  const handleSaveCar = async () => {
    if (!carForm.make || !carForm.model || !carForm.price) {
      showToast("Please fill in Make, Model and Price.", "error");
      return;
    }
    setSavingCar(true);
    let imageUrl = carForm.image_url || "";

    if (imageFile) {
      setUploadingImage(true);
      const uploadResult = await uploadCarImage(imageFile);
      setUploadingImage(false);
      if (!uploadResult.success) {
        showToast("Image upload failed. Please try again.", "error");
        setSavingCar(false);
        return;
      }
      if (isEditing && selectedCar?.image_url) {
        await deleteCarImage(selectedCar.image_url);
      }
      imageUrl = uploadResult.url;
    }

    const carData = {
      ...carForm,
      image_url: imageUrl,
      price: Number(carForm.price),
      seats: carForm.seats ? Number(carForm.seats) : null,
    };

    if (isEditing) {
      const result = await updateCar(selectedCar.id, carData);
      if (result.success) {
        showToast("Vehicle updated successfully.");
        await loadData();
      } else {
        showToast("Failed to update vehicle.", "error");
      }
    } else {
      const result = await addCar(carData);
      if (result.success) {
        showToast("Vehicle added successfully.");
        await loadData();
      } else {
        showToast("Failed to add vehicle.", "error");
      }
    }

    setSavingCar(false);
    setShowCarModal(false);
    setCarForm(emptyCarForm);
    setImageFile(null);
    setImagePreview("");
  };

  const confirmDelete = (id, type) => {
    setDeleteTarget(id);
    setDeleteType(type);
    setShowDeleteModal(true);
  };

  const handleDelete = async () => {
    if (deleteType === "car") {
      const car = inventory.find((c) => c.id === deleteTarget);
      if (car?.image_url) await deleteCarImage(car.image_url);
      const result = await deleteCar(deleteTarget);
      if (result.success) {
        showToast("Vehicle removed.");
        await loadData();
      } else {
        showToast("Failed to delete vehicle.", "error");
      }
    } else if (deleteType === "enquiry") {
      const result = await deleteEnquiry(deleteTarget);
      if (result.success) {
        showToast("Enquiry deleted.");
        await loadData();
      } else {
        showToast("Failed to delete enquiry.", "error");
      }
    }
    setShowDeleteModal(false);
    setDeleteTarget(null);
  };

  const handleToggleHotDeal = async (car) => {
    const result = await toggleHotDeal(car.id, car.hot_deal);
    if (result.success) {
      showToast("Hot deal status updated.");
      await loadData();
    } else {
      showToast("Failed to update hot deal status.", "error");
    }
  };

  const handleUpdateEnquiryStatus = async (id, status) => {
    const result = await updateEnquiryStatus(id, status);
    if (result.success) {
      showToast("Enquiry status updated.");
      await loadData();
    } else {
      showToast("Failed to update status.", "error");
    }
  };

  const openEnquiry = (enquiry) => {
    setSelectedEnquiry(enquiry);
    setShowEnquiryModal(true);
  };

  const handleSaveSettings = async () => {
    if (!siteForm) return;
    setSavingSettings(true);

    let logoUrl = siteForm.logo_url || "";
    let heroUrl = siteForm.hero_url || "";

    if (logoFile) {
      const result = await uploadSiteAsset(logoFile, "logo");
      if (result.success) {
        logoUrl = result.url;
      } else {
        showToast("Logo upload failed.", "error");
        setSavingSettings(false);
        return;
      }
    }

    if (heroFile) {
      const result = await uploadSiteAsset(heroFile, "hero");
      if (result.success) {
        heroUrl = result.url;
      } else {
        showToast("Hero image upload failed.", "error");
        setSavingSettings(false);
        return;
      }
    }

    const result = await updateSiteSettings({
      ...siteForm,
      logo_url: logoUrl,
      hero_url: heroUrl,
    });

    if (result.success) {
      showToast("Site settings saved successfully.");
      await refreshSettings();
      setLogoFile(null);
      setHeroFile(null);
    } else {
      showToast("Failed to save settings.", "error");
    }

    setSavingSettings(false);
  };

  const hotDeals = inventory.filter((c) => c.hot_deal);

  const filteredInventory = inventory.filter(
    (car) =>
      car.make?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      car.model?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredHotDeals = hotDeals.filter(
    (car) =>
      car.make?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      car.model?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredEnquiries = enquiries.filter(
    (enq) =>
      enq.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      enq.interest?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const newEnquiriesCount = enquiries.filter((e) => e.status === "New").length;

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 flex">

      {/* ── Sidebar ── */}
      <aside
        className={`fixed top-0 left-0 h-full z-50 w-64 bg-white border-r border-gray-100 flex flex-col transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
          {settings.logo_url ? (
            <img
              src={settings.logo_url}
              alt={settings.business_name}
              className="h-8 w-auto object-contain"
            />
          ) : (
            <span className="text-gray-900 font-bold text-base truncate">
              {settings.business_name}
            </span>
          )}
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-gray-400 hover:text-gray-600 p-1"
          >
            <X size={18} />
          </button>
        </div>

        <nav className="flex flex-col gap-1 px-3 py-5 flex-1 overflow-y-auto">
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
                    ? "bg-brand-500 text-white shadow-sm"
                    : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
                }`}
              >
                <Icon size={17} />
                {link.label}
                {link.id === "enquiries" && newEnquiriesCount > 0 && (
                  <span className="ml-auto bg-brand-100 text-brand-600 text-[10px] font-bold px-2 py-0.5 rounded-full">
                    {newEnquiriesCount}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        <div className="px-4 py-5 border-t border-gray-100">
          <div className="flex items-center gap-3 mb-3 px-2">
            <div className="w-8 h-8 rounded-full bg-brand-500 flex items-center justify-center shrink-0">
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

      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/30 z-40 lg:hidden"
        />
      )}

      {/* ── Main ── */}
      <div className="flex-1 lg:ml-64 flex flex-col min-h-screen">

        {/* Topbar */}
        <header className="sticky top-0 z-30 bg-white border-b border-gray-100 px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden text-gray-500 hover:text-gray-800 p-1"
            >
              <Menu size={22} />
            </button>
            <div>
              <h1 className="text-gray-900 font-bold text-sm sm:text-base">
                {activeTab === "overview" && "Dashboard"}
                {activeTab === "inventory" && "Inventory"}
                {activeTab === "hotdeals" && "Hot Deals"}
                {activeTab === "enquiries" && "Enquiries"}
                {activeTab === "settings" && "Site Settings"}
              </h1>
              <p className="text-gray-400 text-[10px] sm:text-xs hidden sm:block">
                {new Date().toLocaleDateString("en-NG", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative">
              <button className="w-9 h-9 rounded-xl border border-gray-100 bg-gray-50 flex items-center justify-center text-gray-500 hover:text-brand-500 transition-colors">
                <Bell size={16} />
              </button>
              {newEnquiriesCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-brand-500 rounded-full flex items-center justify-center text-[9px] text-white font-bold">
                  {newEnquiriesCount}
                </span>
              )}
            </div>
            <button
              onClick={() => navigate("/")}
              className="hidden sm:flex items-center gap-1.5 text-gray-500 hover:text-brand-500 text-xs font-semibold transition-colors px-3 py-2 rounded-xl border border-gray-100 bg-gray-50"
            >
              <Eye size={14} />
              View Site
            </button>
          </div>
        </header>

        <main className="flex-1 px-4 sm:px-6 py-6 sm:py-8">

          {loadingData ? (
            <div className="flex items-center justify-center py-24">
              <div className="flex flex-col items-center gap-3">
                <svg
                  className="animate-spin h-8 w-8 text-brand-500"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                </svg>
                <p className="text-gray-400 text-sm font-semibold">Loading dashboard...</p>
              </div>
            </div>
          ) : (
            <>
              {/* ══ OVERVIEW ══ */}
              {activeTab === "overview" && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5 mb-6 sm:mb-10">
                    {[
                      {
                        icon: Car,
                        label: "Total Vehicles",
                        value: inventory.length,
                        sub: `${inventory.filter((c) => c.status === "Available").length} available`,
                      },
                      {
                        icon: Flame,
                        label: "Hot Deals",
                        value: hotDeals.length,
                        sub: "This week",
                      },
                      {
                        icon: MessageSquare,
                        label: "Enquiries",
                        value: enquiries.length,
                        sub: `${newEnquiriesCount} new`,
                      },
                      {
                        icon: ShoppingBag,
                        label: "Cars Sold",
                        value: inventory.filter((c) => c.status === "Sold").length,
                        sub: "Total sold",
                      },
                    ].map((stat, index) => {
                      const Icon = stat.icon;
                      return (
                        <motion.div
                          key={stat.label}
                          initial={{ opacity: 0, y: 15 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4, delay: index * 0.08 }}
                          className="bg-white border border-gray-100 rounded-2xl p-4 sm:p-5 hover:shadow-sm transition-shadow"
                        >
                          <div className="flex items-center justify-between mb-3">
                            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-brand-50 flex items-center justify-center">
                              <Icon size={16} className="text-brand-500" />
                            </div>
                            <TrendingUp size={13} className="text-green-500" />
                          </div>
                          <p className="text-xl sm:text-2xl font-bold text-gray-900">{stat.value}</p>
                          <p className="text-gray-500 text-[10px] sm:text-xs mt-1">{stat.label}</p>
                          <p className="text-brand-500 text-[10px] font-semibold mt-1">{stat.sub}</p>
                        </motion.div>
                      );
                    })}
                  </div>

                  {/* Recent Enquiries */}
                  <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden mb-6">
                    <div className="flex items-center justify-between px-4 sm:px-6 py-4 border-b border-gray-100">
                      <h2 className="text-gray-900 font-bold text-sm sm:text-base">Recent Enquiries</h2>
                      <button
                        onClick={() => setActiveTab("enquiries")}
                        className="text-brand-500 text-xs font-semibold hover:text-brand-600"
                      >
                        View All
                      </button>
                    </div>

                    {/* Mobile Enquiries — Cards */}
                    <div className="sm:hidden flex flex-col divide-y divide-gray-50">
                      {enquiries.slice(0, 4).map((enq) => (
                        <div
                          key={enq.id}
                          className="px-4 py-3 hover:bg-gray-50 transition-colors cursor-pointer"
                          onClick={() => openEnquiry(enq)}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <p className="text-gray-800 text-sm font-semibold">{enq.name}</p>
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${statusStyles[enq.status]}`}>
                              {enq.status}
                            </span>
                          </div>
                          <p className="text-gray-400 text-xs">{enq.interest}</p>
                          <p className="text-gray-400 text-[10px] mt-0.5">
                            {new Date(enq.created_at).toLocaleDateString()}
                          </p>
                        </div>
                      ))}
                    </div>

                    {/* Desktop Enquiries — Table */}
                    <div className="hidden sm:block overflow-x-auto">
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
                            <tr
                              key={enq.id}
                              className="border-b border-gray-50 hover:bg-gray-50 transition-colors cursor-pointer"
                              onClick={() => openEnquiry(enq)}
                            >
                              <td className="px-6 py-3 text-gray-800 text-sm font-semibold">{enq.name}</td>
                              <td className="px-6 py-3 text-gray-500 text-sm">{enq.interest}</td>
                              <td className="px-6 py-3 text-gray-400 text-xs">{new Date(enq.created_at).toLocaleDateString()}</td>
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
                    {enquiries.length === 0 && (
                      <div className="py-10 text-center text-gray-400 text-sm">No enquiries yet.</div>
                    )}
                  </div>

                  {/* Recent Inventory */}
                  <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden">
                    <div className="flex items-center justify-between px-4 sm:px-6 py-4 border-b border-gray-100">
                      <h2 className="text-gray-900 font-bold text-sm sm:text-base">Recent Inventory</h2>
                      <button
                        onClick={() => setActiveTab("inventory")}
                        className="text-brand-500 text-xs font-semibold hover:text-brand-600"
                      >
                        View All
                      </button>
                    </div>

                    {/* Mobile Inventory — Cards */}
                    <div className="sm:hidden flex flex-col divide-y divide-gray-50">
                      {inventory.slice(0, 4).map((car) => (
                        <div key={car.id} className="px-4 py-3">
                          <div className="flex items-center justify-between mb-1">
                            <p className="text-gray-800 text-sm font-semibold">{car.make} {car.model}</p>
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${statusStyles[car.status]}`}>
                              {car.status}
                            </span>
                          </div>
                          <p className="text-brand-500 text-xs font-bold">₦{Number(car.price).toLocaleString()}</p>
                          <p className="text-gray-400 text-[10px] mt-0.5">{car.year} · {car.condition}</p>
                        </div>
                      ))}
                    </div>

                    {/* Desktop Inventory — Table */}
                    <div className="hidden sm:block overflow-x-auto">
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
                              <td className="px-6 py-3 text-brand-500 text-sm font-bold">₦{Number(car.price).toLocaleString()}</td>
                              <td className="px-6 py-3 text-gray-500 text-sm">{car.condition}</td>
                              <td className="px-6 py-3">
                                {car.hot_deal ? (
                                  <span className="flex items-center gap-1 text-orange-500 text-xs font-bold"><Flame size={12} /> Yes</span>
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
                    {inventory.length === 0 && (
                      <div className="py-10 text-center text-gray-400 text-sm">No vehicles yet.</div>
                    )}
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
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-6">
                    <div className="relative flex-1">
                      <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search inventory..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-white border border-gray-200 rounded-xl pl-10 pr-4 py-2.5 text-gray-800 text-sm placeholder-gray-400 focus:outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100 transition-all"
                      />
                    </div>
                    <button
                      onClick={openAddCar}
                      className="flex items-center justify-center gap-2 bg-brand-500 hover:bg-brand-600 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-all duration-300 whitespace-nowrap"
                    >
                      <Plus size={15} />
                      Add Vehicle
                    </button>
                  </div>

                  {/* Mobile Inventory — Cards */}
                  <div className="sm:hidden flex flex-col gap-3">
                    {filteredInventory.map((car) => (
                      <div key={car.id} className="bg-white border border-gray-100 rounded-2xl p-4">
                        <div className="flex items-start gap-3 mb-3">
                          {car.image_url ? (
                            <img src={car.image_url} alt={car.model} className="w-14 h-14 rounded-xl object-cover border border-gray-100 shrink-0" />
                          ) : (
                            <div className="w-14 h-14 rounded-xl bg-gray-100 border border-gray-100 flex items-center justify-center shrink-0">
                              <Image size={16} className="text-gray-400" />
                            </div>
                          )}
                          <div className="flex-1 min-w-0">
                            <p className="text-gray-800 text-sm font-bold truncate">{car.make} {car.model}</p>
                            <p className="text-gray-400 text-xs mt-0.5">{car.type} · {car.year}</p>
                            <p className="text-brand-500 text-sm font-bold mt-1">₦{Number(car.price).toLocaleString()}</p>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${statusStyles[car.status]}`}>
                              {car.status}
                            </span>
                            <button
                              onClick={() => handleToggleHotDeal(car)}
                              className={`flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full border transition-all ${
                                car.hot_deal
                                  ? "bg-orange-50 text-orange-500 border-orange-100"
                                  : "bg-gray-50 text-gray-400 border-gray-100"
                              }`}
                            >
                              <Flame size={10} />
                              {car.hot_deal ? "Hot Deal" : "Regular"}
                            </button>
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => openEditCar(car)}
                              className="w-8 h-8 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-400 hover:text-brand-500 hover:border-brand-200 hover:bg-brand-50 transition-all"
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
                        </div>
                      </div>
                    ))}
                    {filteredInventory.length === 0 && (
                      <div className="py-16 text-center">
                        <Car size={32} className="text-gray-300 mx-auto mb-3" />
                        <p className="text-gray-400 text-sm">No vehicles found.</p>
                      </div>
                    )}
                  </div>

                  {/* Desktop Inventory — Table */}
                  <div className="hidden sm:block bg-white border border-gray-100 rounded-2xl overflow-hidden">
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
                                <div className="flex items-center gap-3">
                                  {car.image_url ? (
                                    <img src={car.image_url} alt={car.model} className="w-10 h-10 rounded-lg object-cover border border-gray-100" />
                                  ) : (
                                    <div className="w-10 h-10 rounded-lg bg-gray-100 border border-gray-100 flex items-center justify-center">
                                      <Image size={14} className="text-gray-400" />
                                    </div>
                                  )}
                                  <div>
                                    <p className="text-gray-800 text-sm font-semibold">{car.make} {car.model}</p>
                                    <p className="text-gray-400 text-xs mt-0.5">{car.type}</p>
                                  </div>
                                </div>
                              </td>
                              <td className="px-6 py-4 text-gray-500 text-sm">{car.year}</td>
                              <td className="px-6 py-4 text-brand-500 text-sm font-bold">₦{Number(car.price).toLocaleString()}</td>
                              <td className="px-6 py-4 text-gray-500 text-sm">{car.condition}</td>
                              <td className="px-6 py-4">
                                <button
                                  onClick={() => handleToggleHotDeal(car)}
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
                                    className="w-8 h-8 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-400 hover:text-brand-500 hover:border-brand-200 hover:bg-brand-50 transition-all"
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
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-6">
                    <div className="relative flex-1">
                      <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search hot deals..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-white border border-gray-200 rounded-xl pl-10 pr-4 py-2.5 text-gray-800 text-sm placeholder-gray-400 focus:outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100 transition-all"
                      />
                    </div>
                    <button
                      onClick={openAddCar}
                      className="flex items-center justify-center gap-2 bg-brand-500 hover:bg-brand-600 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-all duration-300 whitespace-nowrap"
                    >
                      <Plus size={15} />
                      Add Vehicle
                    </button>
                  </div>

                  <div className="bg-brand-50 border border-brand-100 rounded-2xl px-4 sm:px-5 py-3 mb-6 flex items-center gap-2">
                    <Flame size={15} className="text-brand-500 shrink-0" />
                    <p className="text-brand-700 text-xs sm:text-sm font-semibold">
                      {hotDeals.length} vehicle{hotDeals.length !== 1 ? "s" : ""} marked as hot deals. Toggle the flame in Inventory to add or remove.
                    </p>
                  </div>

                  {/* Mobile Hot Deals — Cards */}
                  <div className="sm:hidden flex flex-col gap-3">
                    {filteredHotDeals.map((car) => (
                      <div key={car.id} className="bg-white border border-gray-100 rounded-2xl p-4">
                        <div className="flex items-start gap-3 mb-3">
                          {car.image_url ? (
                            <img src={car.image_url} alt={car.model} className="w-14 h-14 rounded-xl object-cover border border-gray-100 shrink-0" />
                          ) : (
                            <div className="w-14 h-14 rounded-xl bg-gray-100 border border-gray-100 flex items-center justify-center shrink-0">
                              <Image size={16} className="text-gray-400" />
                            </div>
                          )}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-1.5 mb-0.5">
                              <Flame size={12} className="text-orange-400" />
                              <p className="text-gray-800 text-sm font-bold truncate">{car.make} {car.model}</p>
                            </div>
                            <p className="text-gray-400 text-xs">{car.type} · {car.year}</p>
                            <p className="text-brand-500 text-sm font-bold mt-1">₦{Number(car.price).toLocaleString()}</p>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${statusStyles[car.status]}`}>
                            {car.status}
                          </span>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => openEditCar(car)}
                              className="w-8 h-8 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-400 hover:text-brand-500 transition-all"
                            >
                              <Edit size={13} />
                            </button>
                            <button
                              onClick={() => handleToggleHotDeal(car)}
                              className="w-8 h-8 rounded-lg bg-orange-50 border border-orange-100 flex items-center justify-center text-orange-400 hover:text-red-500 transition-all"
                            >
                              <Flame size={13} />
                            </button>
                            <button
                              onClick={() => confirmDelete(car.id, "car")}
                              className="w-8 h-8 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-400 hover:text-red-500 transition-all"
                            >
                              <Trash2 size={13} />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                    {filteredHotDeals.length === 0 && (
                      <div className="py-16 text-center">
                        <Flame size={32} className="text-gray-300 mx-auto mb-3" />
                        <p className="text-gray-400 text-sm font-semibold">No hot deals yet.</p>
                      </div>
                    )}
                  </div>

                  {/* Desktop Hot Deals — Table */}
                  <div className="hidden sm:block bg-white border border-gray-100 rounded-2xl overflow-hidden">
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
                                <div className="flex items-center gap-3">
                                  {car.image_url ? (
                                    <img src={car.image_url} alt={car.model} className="w-10 h-10 rounded-lg object-cover border border-gray-100" />
                                  ) : (
                                    <div className="w-10 h-10 rounded-lg bg-gray-100 border border-gray-100 flex items-center justify-center">
                                      <Image size={14} className="text-gray-400" />
                                    </div>
                                  )}
                                  <div className="flex items-center gap-2">
                                    <Flame size={14} className="text-orange-400 shrink-0" />
                                    <div>
                                      <p className="text-gray-800 text-sm font-semibold">{car.make} {car.model}</p>
                                      <p className="text-gray-400 text-xs mt-0.5">{car.type}</p>
                                    </div>
                                  </div>
                                </div>
                              </td>
                              <td className="px-6 py-4 text-gray-500 text-sm">{car.year}</td>
                              <td className="px-6 py-4 text-brand-500 text-sm font-bold">₦{Number(car.price).toLocaleString()}</td>
                              <td className="px-6 py-4 text-gray-500 text-sm">{car.condition}</td>
                              <td className="px-6 py-4">
                                <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${statusStyles[car.status]}`}>
                                  {car.status}
                                </span>
                              </td>
                              <td className="px-6 py-4">
                                <div className="flex items-center gap-2">
                                  <button onClick={() => openEditCar(car)} className="w-8 h-8 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-400 hover:text-brand-500 hover:border-brand-200 hover:bg-brand-50 transition-all">
                                    <Edit size={13} />
                                  </button>
                                  <button onClick={() => handleToggleHotDeal(car)} className="w-8 h-8 rounded-lg bg-orange-50 border border-orange-100 flex items-center justify-center text-orange-400 hover:text-red-500 hover:border-red-100 hover:bg-red-50 transition-all">
                                    <Flame size={13} />
                                  </button>
                                  <button onClick={() => confirmDelete(car.id, "car")} className="w-8 h-8 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-400 hover:text-red-500 hover:border-red-100 hover:bg-red-50 transition-all">
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
                      className="w-full bg-white border border-gray-200 rounded-xl pl-10 pr-4 py-2.5 text-gray-800 text-sm placeholder-gray-400 focus:outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100 transition-all"
                    />
                  </div>

                  {/* Mobile Enquiries — Cards */}
                  <div className="sm:hidden flex flex-col gap-3">
                    {filteredEnquiries.map((enq) => (
                      <div key={enq.id} className="bg-white border border-gray-100 rounded-2xl p-4">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <p className="text-gray-800 text-sm font-bold">{enq.name}</p>
                            <p className="text-gray-400 text-xs mt-0.5">{enq.phone}</p>
                          </div>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 ${statusStyles[enq.status]}`}>
                            {enq.status}
                          </span>
                        </div>
                        <p className="text-gray-500 text-xs mb-1">{enq.interest}</p>
                        <p className="text-gray-400 text-xs truncate mb-3">{enq.message}</p>
                        <div className="flex items-center justify-between">
                          <p className="text-gray-400 text-[10px]">
                            {new Date(enq.created_at).toLocaleDateString()}
                          </p>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => openEnquiry(enq)}
                              className="w-8 h-8 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-400 hover:text-brand-500 hover:border-brand-200 hover:bg-brand-50 transition-all"
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
                        </div>
                      </div>
                    ))}
                    {filteredEnquiries.length === 0 && (
                      <div className="py-16 text-center">
                        <MessageSquare size={32} className="text-gray-300 mx-auto mb-3" />
                        <p className="text-gray-400 text-sm">No enquiries found.</p>
                      </div>
                    )}
                  </div>

                  {/* Desktop Enquiries — Table */}
                  <div className="hidden sm:block bg-white border border-gray-100 rounded-2xl overflow-hidden">
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
                              <td className="px-6 py-4 text-gray-400 text-xs whitespace-nowrap">{new Date(enq.created_at).toLocaleDateString()}</td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <select
                                  value={enq.status}
                                  onChange={(e) => handleUpdateEnquiryStatus(enq.id, e.target.value)}
                                  className={`text-[10px] font-bold px-2.5 py-1 rounded-full border cursor-pointer focus:outline-none ${statusStyles[enq.status]}`}
                                >
                                  <option value="New">New</option>
                                  <option value="Responded">Responded</option>
                                  <option value="Closed">Closed</option>
                                </select>
                              </td>
                              <td className="px-6 py-4">
                                <div className="flex items-center gap-2">
                                  <button onClick={() => openEnquiry(enq)} className="w-8 h-8 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-400 hover:text-brand-500 hover:border-brand-200 hover:bg-brand-50 transition-all">
                                    <Eye size={13} />
                                  </button>
                                  <button onClick={() => confirmDelete(enq.id, "enquiry")} className="w-8 h-8 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-400 hover:text-red-500 hover:border-red-100 hover:bg-red-50 transition-all">
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

              {/* ══ SITE SETTINGS ══ */}
              {activeTab === "settings" && siteForm && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="max-w-3xl"
                >
                  <div className="flex flex-col gap-6">

                    {/* Business Info */}
                    <div className="bg-white border border-gray-100 rounded-2xl p-5 sm:p-6">
                      <h2 className="text-gray-900 font-bold text-sm sm:text-base mb-5 pb-3 border-b border-gray-100">
                        Business Information
                      </h2>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {[
                          { label: "Business Name", key: "business_name" },
                          { label: "Tagline", key: "tagline" },
                          { label: "Phone Number", key: "phone" },
                          { label: "WhatsApp Number", key: "whatsapp" },
                          { label: "Email Address", key: "email" },
                          { label: "Address", key: "address" },
                        ].map((field) => (
                          <div key={field.key} className="flex flex-col gap-1.5">
                            <label className="text-gray-600 text-xs font-semibold">
                              {field.label}
                            </label>
                            <input
                              type="text"
                              value={siteForm[field.key] || ""}
                              onChange={(e) =>
                                setSiteForm({ ...siteForm, [field.key]: e.target.value })
                              }
                              className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-gray-800 text-sm focus:outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100 transition-all"
                            />
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Brand Color */}
                    <div className="bg-white border border-gray-100 rounded-2xl p-5 sm:p-6">
                      <h2 className="text-gray-900 font-bold text-sm sm:text-base mb-5 pb-3 border-b border-gray-100">
                        Brand Color
                      </h2>
                      <div className="flex items-center gap-4">
                        <input
                          type="color"
                          value={siteForm.primary_color || "#2563eb"}
                          onChange={(e) =>
                            setSiteForm({ ...siteForm, primary_color: e.target.value })
                          }
                          className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl border border-gray-200 cursor-pointer p-1 bg-white"
                        />
                        <div>
                          <p className="text-gray-800 text-sm font-semibold">
                            {siteForm.primary_color || "#2563eb"}
                          </p>
                          <p className="text-gray-400 text-xs mt-0.5 leading-relaxed">
                            Changes the primary color across the entire website.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Social Links */}
                    <div className="bg-white border border-gray-100 rounded-2xl p-5 sm:p-6">
                      <h2 className="text-gray-900 font-bold text-sm sm:text-base mb-5 pb-3 border-b border-gray-100">
                        Social Media Links
                      </h2>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {[
                          { label: "Instagram URL", key: "instagram" },
                          { label: "Facebook URL", key: "facebook" },
                          { label: "TikTok URL", key: "tiktok" },
                        ].map((field) => (
                          <div key={field.key} className="flex flex-col gap-1.5">
                            <label className="text-gray-600 text-xs font-semibold">
                              {field.label}
                            </label>
                            <input
                              type="text"
                              value={siteForm[field.key] || ""}
                              onChange={(e) =>
                                setSiteForm({ ...siteForm, [field.key]: e.target.value })
                              }
                              placeholder="https://..."
                              className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-gray-800 text-sm placeholder-gray-400 focus:outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100 transition-all"
                            />
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Logo Upload */}
                    <div className="bg-white border border-gray-100 rounded-2xl p-5 sm:p-6">
                      <h2 className="text-gray-900 font-bold text-sm sm:text-base mb-5 pb-3 border-b border-gray-100">
                        Logo
                      </h2>
                      <div className="flex items-center gap-4 sm:gap-6">
                        <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gray-50 border border-gray-200 flex items-center justify-center shrink-0 overflow-hidden">
                          {logoPreview ? (
                            <img src={logoPreview} alt="Logo preview" className="w-full h-full object-contain p-2" />
                          ) : (
                            <Image size={24} className="text-gray-300" />
                          )}
                        </div>
                        <div className="flex flex-col gap-3">
                          <label className="flex items-center gap-2 bg-brand-500 hover:bg-brand-600 text-white text-xs sm:text-sm font-semibold px-4 sm:px-5 py-2.5 rounded-xl transition-colors cursor-pointer">
                            <Upload size={14} />
                            Upload Logo
                            <input type="file" accept="image/*" onChange={handleLogoChange} className="hidden" />
                          </label>
                          {logoFile && (
                            <p className="text-brand-500 text-xs font-semibold">✓ {logoFile.name}</p>
                          )}
                          <p className="text-gray-400 text-xs">PNG or SVG recommended. Max 5MB.</p>
                        </div>
                      </div>
                    </div>

                    {/* Hero Image */}
                    <div className="bg-white border border-gray-100 rounded-2xl p-5 sm:p-6">
                      <h2 className="text-gray-900 font-bold text-sm sm:text-base mb-5 pb-3 border-b border-gray-100">
                        Hero Background Image
                      </h2>
                      <div className="flex flex-col gap-4">
                        {heroPreview && (
                          <div className="relative rounded-2xl overflow-hidden h-36 sm:h-40">
                            <img src={heroPreview} alt="Hero preview" className="w-full h-full object-cover" />
                            <button
                              onClick={() => {
                                setHeroFile(null);
                                setHeroPreview("");
                                setSiteForm({ ...siteForm, hero_url: "" });
                              }}
                              className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/50 flex items-center justify-center text-white hover:bg-black/70 transition-colors"
                            >
                              <X size={14} />
                            </button>
                          </div>
                        )}
                        <label className="flex items-center gap-2 bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-700 text-xs sm:text-sm font-semibold px-4 sm:px-5 py-3 rounded-xl transition-colors cursor-pointer self-start">
                          <Upload size={14} />
                          {heroPreview ? "Change Hero Image" : "Upload Hero Image"}
                          <input type="file" accept="image/*" onChange={handleHeroChange} className="hidden" />
                        </label>
                        {heroFile && (
                          <p className="text-brand-500 text-xs font-semibold">✓ {heroFile.name}</p>
                        )}
                        <p className="text-gray-400 text-xs">High quality landscape image. Min 1920x1080px.</p>
                      </div>
                    </div>

                    {/* Save */}
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-3">
                      <button
                        onClick={() => {
                          setSiteForm({ ...settings });
                          setLogoFile(null);
                          setLogoPreview(settings.logo_url || "");
                          setHeroFile(null);
                          setHeroPreview(settings.hero_url || "");
                        }}
                        className="px-5 py-2.5 rounded-xl border border-gray-200 text-gray-600 text-sm font-semibold hover:bg-gray-50 transition-colors text-center"
                      >
                        Reset Changes
                      </button>
                      <button
                        onClick={handleSaveSettings}
                        disabled={savingSettings}
                        className="flex items-center justify-center gap-2 bg-brand-500 hover:bg-brand-600 disabled:bg-brand-300 disabled:cursor-not-allowed text-white text-sm font-semibold px-6 py-2.5 rounded-xl transition-all duration-300"
                      >
                        {savingSettings ? (
                          <span className="flex items-center gap-2">
                            <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                            </svg>
                            Saving...
                          </span>
                        ) : (
                          <>
                            <CheckCircle size={15} />
                            Save Settings
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </>
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
            className="fixed inset-0 bg-black/40 z-50 flex items-end sm:items-center justify-center"
            onClick={(e) => e.target === e.currentTarget && setShowCarModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 100 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-t-3xl sm:rounded-2xl shadow-xl w-full sm:max-w-2xl max-h-[92vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between px-5 sm:px-6 py-4 sm:py-5 border-b border-gray-100 sticky top-0 bg-white z-10">
                <h2 className="text-gray-900 font-bold text-base sm:text-lg">
                  {isEditing ? "Edit Vehicle" : "Add New Vehicle"}
                </h2>
                <button
                  onClick={() => setShowCarModal(false)}
                  className="w-8 h-8 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X size={16} />
                </button>
              </div>

              <div className="px-5 sm:px-6 py-5 flex flex-col gap-5">
                {/* Image Upload */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-gray-600 text-xs font-semibold">Car Image</label>
                  <div className="relative border-2 border-dashed border-gray-200 rounded-2xl overflow-hidden hover:border-brand-400 transition-colors">
                    {imagePreview ? (
                      <div className="relative">
                        <img src={imagePreview} alt="Preview" className="w-full h-44 sm:h-48 object-cover" />
                        <button
                          onClick={() => {
                            setImageFile(null);
                            setImagePreview("");
                            setCarForm({ ...carForm, image_url: "" });
                          }}
                          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/50 flex items-center justify-center text-white hover:bg-black/70 transition-colors"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    ) : (
                      <label className="flex flex-col items-center justify-center h-36 sm:h-40 cursor-pointer gap-3">
                        <div className="w-12 h-12 rounded-xl bg-brand-50 flex items-center justify-center">
                          <Upload size={20} className="text-brand-500" />
                        </div>
                        <div className="text-center px-4">
                          <p className="text-gray-700 text-sm font-semibold">Click to upload image</p>
                          <p className="text-gray-400 text-xs mt-1">PNG, JPG, WEBP up to 10MB</p>
                        </div>
                        <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                      </label>
                    )}
                  </div>
                  {imageFile && (
                    <p className="text-brand-500 text-xs font-semibold">✓ {imageFile.name} selected</p>
                  )}
                </div>

                {/* Form Fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                  ].map((field) => (
                    <div key={field.key} className="flex flex-col gap-1.5">
                      <label className="text-gray-600 text-xs font-semibold">{field.label}</label>
                      <input
                        type="text"
                        value={carForm[field.key]}
                        onChange={(e) => setCarForm({ ...carForm, [field.key]: e.target.value })}
                        placeholder={field.placeholder}
                        className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-gray-800 text-sm placeholder-gray-400 focus:outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100 transition-all"
                      />
                    </div>
                  ))}

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
                        className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-gray-800 text-sm focus:outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100 transition-all appearance-none cursor-pointer"
                      >
                        {field.options.map((opt) => (
                          <option key={opt} value={opt}>{opt}</option>
                        ))}
                      </select>
                    </div>
                  ))}

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
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-gray-600 text-xs font-semibold">Description</label>
                  <textarea
                    rows={3}
                    value={carForm.description}
                    onChange={(e) => setCarForm({ ...carForm, description: e.target.value })}
                    placeholder="Brief vehicle description..."
                    className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-gray-800 text-sm placeholder-gray-400 focus:outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100 transition-all resize-none"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-gray-600 text-xs font-semibold">Features (comma separated)</label>
                  <textarea
                    rows={2}
                    value={carForm.features}
                    onChange={(e) => setCarForm({ ...carForm, features: e.target.value })}
                    placeholder="360 Camera, JBL Audio, Heated Seats..."
                    className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-gray-800 text-sm placeholder-gray-400 focus:outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100 transition-all resize-none"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 px-5 sm:px-6 py-4 sm:py-5 border-t border-gray-100 sticky bottom-0 bg-white">
                <button
                  onClick={() => setShowCarModal(false)}
                  className="px-4 sm:px-5 py-2.5 rounded-xl border border-gray-200 text-gray-600 text-sm font-semibold hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveCar}
                  disabled={savingCar}
                  className="flex items-center gap-2 bg-brand-500 hover:bg-brand-600 disabled:bg-brand-300 disabled:cursor-not-allowed text-white text-sm font-semibold px-4 sm:px-5 py-2.5 rounded-xl transition-all duration-300"
                >
                  {savingCar ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                      </svg>
                      {uploadingImage ? "Uploading..." : "Saving..."}
                    </span>
                  ) : (
                    <>
                      <CheckCircle size={15} />
                      {isEditing ? "Save Changes" : "Add Vehicle"}
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ══ DELETE MODAL ══ */}
      <AnimatePresence>
        {showDeleteModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 z-50 flex items-end sm:items-center justify-center"
          >
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 100 }}
              transition={{ duration: 0.2 }}
              className="bg-white rounded-t-3xl sm:rounded-2xl shadow-xl w-full sm:max-w-sm p-6 text-center"
            >
              <div className="w-14 h-14 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-4">
                <Trash2 size={24} className="text-red-500" />
              </div>
              <h3 className="text-gray-900 font-bold text-lg mb-2">Are you sure?</h3>
              <p className="text-gray-500 text-sm mb-6">
                This action cannot be undone. The{" "}
                {deleteType === "car" ? "vehicle" : "enquiry"} will be permanently removed.
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

      {/* ══ ENQUIRY MODAL ══ */}
      <AnimatePresence>
        {showEnquiryModal && selectedEnquiry && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 z-50 flex items-end sm:items-center justify-center"
            onClick={(e) => e.target === e.currentTarget && setShowEnquiryModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 100 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-t-3xl sm:rounded-2xl shadow-xl w-full sm:max-w-md max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between px-5 sm:px-6 py-4 sm:py-5 border-b border-gray-100 sticky top-0 bg-white z-10">
                <h2 className="text-gray-900 font-bold text-base sm:text-lg">Enquiry Details</h2>
                <button
                  onClick={() => setShowEnquiryModal(false)}
                  className="w-8 h-8 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X size={16} />
                </button>
              </div>

              <div className="px-5 sm:px-6 py-5 flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-brand-500 flex items-center justify-center shrink-0">
                    <span className="text-white font-bold text-sm">
                      {selectedEnquiry.name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase()}
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
                    { label: "Email", value: selectedEnquiry.email || "—" },
                    { label: "Interest", value: selectedEnquiry.interest },
                    {
                      label: "Date",
                      value: new Date(selectedEnquiry.created_at).toLocaleDateString("en-NG", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      }),
                    },
                  ].map((item) => (
                    <div key={item.label} className="bg-gray-50 rounded-xl p-3">
                      <p className="text-gray-400 text-xs mb-0.5">{item.label}</p>
                      <p className="text-gray-800 text-sm font-semibold break-all">{item.value}</p>
                    </div>
                  ))}
                </div>

                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="text-gray-400 text-xs mb-2 font-semibold uppercase tracking-wide">Full Message</p>
                  <p className="text-gray-800 text-sm leading-relaxed">{selectedEnquiry.message}</p>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-gray-600 text-xs font-semibold">Update Status</label>
                  <div className="flex gap-2">
                    {["New", "Responded", "Closed"].map((s) => (
                      <button
                        key={s}
                        onClick={() => {
                          handleUpdateEnquiryStatus(selectedEnquiry.id, s);
                          setSelectedEnquiry({ ...selectedEnquiry, status: s });
                        }}
                        className={`flex-1 text-xs font-bold py-2 rounded-xl border transition-all duration-200 ${
                          selectedEnquiry.status === s
                            ? "bg-brand-500 border-brand-500 text-white"
                            : "border-gray-200 text-gray-500 hover:border-brand-400 hover:text-brand-500"
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <a
                    href={`tel:${selectedEnquiry.phone}`}
                    className="flex-1 flex items-center justify-center gap-2 bg-brand-500 hover:bg-brand-600 text-white text-sm font-semibold py-2.5 rounded-xl transition-colors"
                  >
                    Call Client
                  </a>
                  <a
                    href={`https://wa.me/${selectedEnquiry.phone?.replace(/\s+/g, "").replace("+", "")}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 border border-gray-200 hover:border-brand-500 text-gray-700 hover:text-brand-500 text-sm font-semibold py-2.5 rounded-xl transition-colors"
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
            className={`fixed bottom-6 left-4 right-4 sm:left-auto sm:right-6 sm:w-auto z-50 flex items-center gap-3 px-5 py-3 rounded-2xl shadow-lg text-sm font-semibold ${
              toast.type === "error" ? "bg-red-500 text-white" : "bg-gray-900 text-white"
            }`}
          >
            {toast.type === "error" ? <XCircle size={16} /> : <CheckCircle size={16} />}
            {toast.message}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminDashboard;