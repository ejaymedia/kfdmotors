import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Flame } from "lucide-react";
import { useNavigate } from "react-router-dom";
import CarCard from "./CarCard";

const placeholderCars = [
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
    image: "/src/assets/cars/car1.jpg",
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
    image: "/src/assets/cars/car2.jpg",
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
    image: "/src/assets/cars/car3.jpg",
  },
  {
    id: "4",
    make: "Lexus",
    model: "LX 600 F-Sport",
    year: "2023",
    price: 145000000,
    condition: "New",
    fuel: "Petrol",
    mileage: "0 km",
    transmission: "Automatic",
    image: "/src/assets/cars/car4.jpg",
  },
  {
    id: "5",
    make: "Range Rover",
    model: "Sport HSE Dynamic",
    year: "2022",
    price: 130000000,
    condition: "Used",
    fuel: "Petrol",
    mileage: "8,500 km",
    transmission: "Automatic",
    image: "/src/assets/cars/car5.jpg",
  },
  {
    id: "6",
    make: "Porsche",
    model: "Cayenne S",
    year: "2023",
    price: 175000000,
    condition: "New",
    fuel: "Petrol",
    mileage: "0 km",
    transmission: "Automatic",
    image: "/src/assets/cars/car6.jpg",
  },
];

const HotDeals = () => {
  const navigate = useNavigate();
  const [cars, setCars] = useState(placeholderCars);

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

          {/* View All Button */}
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