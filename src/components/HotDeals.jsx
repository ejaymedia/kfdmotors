import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Flame } from "lucide-react";
import { useNavigate } from "react-router-dom";
import CarCard from "./CarCard";
import { fetchHotDeals } from "../supabaseService";

const HotDeals = () => {
  const navigate = useNavigate();
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadHotDeals = async () => {
      const data = await fetchHotDeals();
      setCars(data);
      setLoading(false);
    };
    loadHotDeals();
  }, []);

  if (loading) {
    return (
      <div className="bg-white py-20 px-6 border-t border-gray-100">
        <div className="max-w-7xl mx-auto flex items-center justify-center py-16">
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
            <p className="text-gray-400 text-sm">Loading deals...</p>
          </div>
        </div>
      </div>
    );
  }

  if (cars.length === 0) {
    return (
      <div className="bg-white py-20 px-6 border-t border-gray-100">
        <div className="max-w-7xl mx-auto text-center py-16">
          <Flame size={40} className="text-gray-200 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-300">
            No Hot Deals This Week
          </h2>
          <p className="text-gray-400 text-sm mt-2">
            Check back soon or browse our full inventory.
          </p>
          <button
            onClick={() => navigate("/inventory")}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-6 py-2.5 rounded-full transition-all duration-300 mx-auto mt-6"
          >
            Browse Inventory
            <ArrowRight size={15} />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white py-20 px-6 border-t border-gray-100">
      <div className="max-w-7xl mx-auto">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-2 mb-2">
              <Flame size={16} className="text-blue-600" />
              <span className="text-blue-600 text-xs font-bold tracking-[0.2em] uppercase">
                This Week
              </span>
            </div>
            <div className="w-12 h-0.5 bg-blue-600 rounded-full mb-3" />
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Hot Deals for the Week
            </h2>
            <p className="text-gray-500 text-sm mt-2 max-w-md leading-relaxed">
              Hand-picked vehicles available for immediate purchase or
              order. Every car is fully verified and documented.
            </p>
          </motion.div>

          <motion.button
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            onClick={() => navigate("/inventory")}
            className="flex items-center gap-2 border border-gray-200 hover:border-blue-600 text-gray-700 hover:text-blue-600 text-sm font-semibold px-6 py-2.5 rounded-full transition-all duration-300 self-start md:self-auto whitespace-nowrap"
          >
            View All Cars
            <ArrowRight size={15} />
          </motion.button>
        </div>

        {/* Cars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cars.map((car, index) => (
            <motion.div
              key={car.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <CarCard car={car} />
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex justify-center mt-12"
        >
          <button
            onClick={() => navigate("/inventory")}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-8 py-3.5 rounded-full transition-all duration-300 shadow-sm hover:shadow-md"
          >
            Browse Full Inventory
            <ArrowRight size={15} />
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default HotDeals;