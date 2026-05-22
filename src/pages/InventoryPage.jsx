import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { SlidersHorizontal, Search, X, ChevronDown } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CarCard from "../components/CarCard";
import { fetchInventory } from "../supabaseService";

const makes = ["All", "Toyota", "Mercedes-Benz", "BMW", "Lexus", "Range Rover", "Porsche"];
const types = ["All", "SUV", "Sedan", "Truck", "Coupe"];
const conditions = ["All", "New", "Used"];

const InventoryPage = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedMake, setSelectedMake] = useState("All");
  const [selectedType, setSelectedType] = useState("All");
  const [selectedCondition, setSelectedCondition] = useState("All");
  const [sortBy, setSortBy] = useState("default");
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const loadInventory = async () => {
      const data = await fetchInventory();
      setCars(data);
      setLoading(false);
    };
    loadInventory();
  }, []);

  const filtered = cars
    .filter((car) => {
      const matchesSearch =
        car.make?.toLowerCase().includes(search.toLowerCase()) ||
        car.model?.toLowerCase().includes(search.toLowerCase());
      const matchesMake =
        selectedMake === "All" || car.make === selectedMake;
      const matchesType =
        selectedType === "All" || car.type === selectedType;
      const matchesCondition =
        selectedCondition === "All" || car.condition === selectedCondition;
      return matchesSearch && matchesMake && matchesType && matchesCondition;
    })
    .sort((a, b) => {
      if (sortBy === "price-asc") return a.price - b.price;
      if (sortBy === "price-desc") return b.price - a.price;
      if (sortBy === "year-desc") return Number(b.year) - Number(a.year);
      return 0;
    });

  const clearFilters = () => {
    setSearch("");
    setSelectedMake("All");
    setSelectedType("All");
    setSelectedCondition("All");
    setSortBy("default");
  };

  const hasActiveFilters =
    search ||
    selectedMake !== "All" ||
    selectedType !== "All" ||
    selectedCondition !== "All" ||
    sortBy !== "default";

  return (
    <div className="bg-white text-gray-900 min-h-screen">
      <Navbar />

      {/* Page Header */}
      <div className="pt-24 pb-12 px-6 bg-gray-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-blue-600 text-xs font-bold tracking-[0.2em] uppercase">
              Browse
            </span>
            <div className="w-12 h-0.5 bg-blue-600 rounded-full my-3" />
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
              Our Inventory
            </h1>
            <p className="text-gray-500 text-sm mt-3 max-w-lg leading-relaxed">
              Explore our full collection of premium vehicles. Filter by
              make, type, or condition to find your perfect match.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-10">

        {/* Search + Filter Bar */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center gap-4 mb-8">
          <div className="relative flex-1">
            <Search
              size={16}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder="Search by make or model..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-10 pr-4 py-3 text-gray-800 text-sm placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X size={14} />
              </button>
            )}
          </div>

          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all appearance-none pr-8 cursor-pointer"
            >
              <option value="default">Sort By</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="year-desc">Newest First</option>
            </select>
            <ChevronDown
              size={14}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
            />
          </div>

          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-2 px-4 py-3 rounded-xl border text-sm font-semibold transition-all duration-300 ${
              showFilters
                ? "bg-blue-600 border-blue-600 text-white"
                : "bg-gray-50 border-gray-200 text-gray-700 hover:border-blue-400 hover:text-blue-600"
            }`}
          >
            <SlidersHorizontal size={15} />
            Filters
          </button>

          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="flex items-center gap-2 px-4 py-3 rounded-xl border border-red-200 text-red-500 text-sm font-semibold hover:bg-red-50 transition-colors"
            >
              <X size={14} />
              Clear
            </button>
          )}
        </div>

        {/* Filter Panel */}
        <motion.div
          initial={false}
          animate={{
            height: showFilters ? "auto" : 0,
            opacity: showFilters ? 1 : 0,
          }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden mb-8"
        >
          <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div>
              <p className="text-gray-600 text-xs font-semibold tracking-wide mb-3">
                Make
              </p>
              <div className="flex flex-wrap gap-2">
                {makes.map((make) => (
                  <button
                    key={make}
                    onClick={() => setSelectedMake(make)}
                    className={`text-xs px-3 py-1.5 rounded-full border font-semibold transition-all duration-200 ${
                      selectedMake === make
                        ? "bg-blue-600 border-blue-600 text-white"
                        : "border-gray-200 text-gray-600 hover:border-blue-400 hover:text-blue-600"
                    }`}
                  >
                    {make}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="text-gray-600 text-xs font-semibold tracking-wide mb-3">
                Type
              </p>
              <div className="flex flex-wrap gap-2">
                {types.map((type) => (
                  <button
                    key={type}
                    onClick={() => setSelectedType(type)}
                    className={`text-xs px-3 py-1.5 rounded-full border font-semibold transition-all duration-200 ${
                      selectedType === type
                        ? "bg-blue-600 border-blue-600 text-white"
                        : "border-gray-200 text-gray-600 hover:border-blue-400 hover:text-blue-600"
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="text-gray-600 text-xs font-semibold tracking-wide mb-3">
                Condition
              </p>
              <div className="flex flex-wrap gap-2">
                {conditions.map((condition) => (
                  <button
                    key={condition}
                    onClick={() => setSelectedCondition(condition)}
                    className={`text-xs px-3 py-1.5 rounded-full border font-semibold transition-all duration-200 ${
                      selectedCondition === condition
                        ? "bg-blue-600 border-blue-600 text-white"
                        : "border-gray-200 text-gray-600 hover:border-blue-400 hover:text-blue-600"
                    }`}
                  >
                    {condition}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Loading State */}
        {loading ? (
          <div className="flex items-center justify-center py-24">
            <div className="flex flex-col items-center gap-3">
              <svg
                className="animate-spin h-8 w-8 text-blue-600"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8z"
                />
              </svg>
              <p className="text-gray-400 text-sm font-semibold">
                Loading inventory...
              </p>
            </div>
          </div>
        ) : (
          <>
            {/* Results Count */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-gray-500 text-sm">
                Showing{" "}
                <span className="text-gray-900 font-semibold">
                  {filtered.length}
                </span>{" "}
                {filtered.length === 1 ? "vehicle" : "vehicles"}
              </p>
            </div>

            {/* Grid */}
            {filtered.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtered.map((car, index) => (
                  <motion.div
                    key={car.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                  >
                    <CarCard car={car} />
                  </motion.div>
                ))}
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center py-24 text-center"
              >
                <div className="w-16 h-16 rounded-2xl bg-gray-100 border border-gray-200 flex items-center justify-center mb-4">
                  <Search size={24} className="text-gray-400" />
                </div>
                <h3 className="text-gray-900 font-bold text-lg mb-2">
                  No Vehicles Found
                </h3>
                <p className="text-gray-400 text-sm max-w-sm">
                  No vehicles match your current filters. Try adjusting
                  your search or clearing the filters.
                </p>
                <button
                  onClick={clearFilters}
                  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-6 py-2.5 rounded-full transition-all duration-300 mt-6"
                >
                  Clear Filters
                </button>
              </motion.div>
            )}
          </>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default InventoryPage;