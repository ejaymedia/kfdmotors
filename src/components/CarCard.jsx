import { motion } from "framer-motion";
import { Fuel, Gauge, Settings, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CarCard = ({ car }) => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group cursor-pointer"
      onClick={() => navigate(`/inventory/${car.id}`)}
    >
      {/* Image */}
      <div className="relative overflow-hidden h-52">
        <img
          src={car.image_url || car.image}
          alt={`${car.make} ${car.model}`}
          className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
        />

        {/* Condition Badge */}
        <div className="absolute top-3 left-3">
          <span
            className={`text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-full ${
              car.condition === "New"
                ? "bg-blue-600 text-white"
                : "bg-black/70 text-white backdrop-blur-sm"
            }`}
          >
            {car.condition}
          </span>
        </div>

        {/* Price Badge */}
        <div className="absolute bottom-3 right-3">
          <span className="text-sm font-bold text-white bg-black/70 backdrop-blur-sm px-3 py-1 rounded-full">
            ₦{car.price?.toLocaleString()}
          </span>
        </div>
      </div>

      {/* Details */}
      <div className="p-5">
        {/* Make + Model */}
        <div className="mb-3">
          <span className="text-blue-600 text-xs font-bold tracking-widest uppercase">
            {car.make}
          </span>
          <h3 className="text-gray-900 text-lg font-bold leading-tight mt-0.5">
            {car.model}
          </h3>
          <span className="text-gray-400 text-sm">{car.year}</span>
        </div>

        {/* Specs Row */}
        <div className="flex items-center gap-4 py-3 border-t border-gray-100 mb-4">
          <div className="flex items-center gap-1.5 text-gray-500 text-xs">
            <Fuel size={13} className="text-blue-500" />
            {car.fuel}
          </div>
          <div className="flex items-center gap-1.5 text-gray-500 text-xs">
            <Gauge size={13} className="text-blue-500" />
            {car.mileage}
          </div>
          <div className="flex items-center gap-1.5 text-gray-500 text-xs">
            <Settings size={13} className="text-blue-500" />
            {car.transmission}
          </div>
        </div>

        {/* CTA */}
        <button className="w-full flex items-center justify-between text-sm font-semibold text-gray-700 hover:text-blue-600 transition-colors group/btn">
          <span>View Details</span>
          <ArrowRight
            size={15}
            className="transition-transform duration-300 group-hover/btn:translate-x-1 text-blue-600"
          />
        </button>
      </div>
    </motion.div>
  );
};

export default CarCard;