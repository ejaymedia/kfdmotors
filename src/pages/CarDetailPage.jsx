import { useState } from "react";
import { motion } from "framer-motion";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Fuel,
  Gauge,
  Settings,
  Calendar,
  CheckCircle,
  Phone,
  MessageCircle,
  Share2,
  Heart,
} from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const allCars = [
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
    engine: "4.5L V8 Twin-Turbo Diesel",
    power: "309 hp",
    seats: 7,
    description:
      "The Toyota Land Cruiser V8 is the pinnacle of luxury off-road capability. Built for both city elegance and rugged terrain, this flagship SUV combines unmatched reliability with premium comfort. Fully imported, cleared, and ready for Nigerian roads.",
    features: [
      "Adaptive Variable Suspension",
      "Multi-Terrain Select System",
      "360-Degree Camera",
      "Heated & Ventilated Seats",
      "14-Speaker JBL Audio System",
      "Head-Up Display",
      "Wireless Apple CarPlay & Android Auto",
      "Power Moonroof",
      "Kinetic Dynamic Suspension System",
      "Pre-Collision System",
    ],
    images: [
      `${import.meta.env.BASE_URL}cars/car1.jpg`,
      `${import.meta.env.BASE_URL}cars/car1.jpg`,
      `${import.meta.env.BASE_URL}cars/car1.jpg`,
    ],
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
    engine: "3.0L Inline-6 EQ Boost",
    power: "362 hp",
    seats: 5,
    description:
      "The Mercedes-Benz GLE 450 AMG Line blends sporty performance with opulent comfort. With its advanced air suspension, stunning interior, and cutting-edge technology, this SUV sets the standard for luxury on Nigerian roads.",
    features: [
      "AMG Line Exterior Package",
      "MBUX Infotainment System",
      "Burmester 3D Surround Sound",
      "Air Body Control Suspension",
      "Augmented Reality Navigation",
      "Heated Front & Rear Seats",
      "64-Color Ambient Lighting",
      "Driving Assistance Package",
      "Panoramic Sunroof",
      "Rear Axle Steering",
    ],
    images: [
      `${import.meta.env.BASE_URL}cars/car2.jpg`,
      `${import.meta.env.BASE_URL}cars/car2.jpg`,
      `${import.meta.env.BASE_URL}cars/car2.jpg`,
    ],
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
    engine: "3.0L TwinPower Turbo",
    power: "335 hp",
    seats: 5,
    description:
      "The BMW X5 xDrive40i is a masterpiece of engineering and design. With its powerful TwinPower Turbo engine and xDrive all-wheel drive system, it delivers an exhilarating driving experience without compromising on luxury.",
    features: [
      "xDrive All-Wheel Drive",
      "Live Cockpit Professional",
      "Harman Kardon Audio System",
      "Panoramic Sky Lounge Roof",
      "Adaptive M Suspension",
      "Gesture Control",
      "Wireless Charging",
      "Parking Assistant Plus",
      "Driving Assistant Professional",
      "Vernasca Leather Interior",
    ],
    images: [
      `${import.meta.env.BASE_URL}cars/car3.jpg`,
      `${import.meta.env.BASE_URL}cars/car3.jpg`,
      `${import.meta.env.BASE_URL}cars/car3.jpg`,
    ],
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
    type: "SUV",
    color: "Sonic Titanium",
    engine: "3.5L V6 Twin-Turbo",
    power: "409 hp",
    seats: 7,
    description:
      "The Lexus LX 600 F-Sport represents the ultimate expression of Lexus craftsmanship. Every detail has been meticulously designed to deliver an unrivalled luxury experience both on and off the road.",
    features: [
      "F-Sport Tuned Suspension",
      "Mark Levinson 25-Speaker Audio",
      "Multi-Terrain Monitor",
      "Crawl Control System",
      "Semi-Aniline Leather Seats",
      "Digital Outer Mirror",
      "E-Latch Door System",
      "Advanced Park System",
      "Lexus Safety System+",
      "Rear Entertainment System",
    ],
    images: [
      `${import.meta.env.BASE_URL}cars/car4.jpg`,
      `${import.meta.env.BASE_URL}cars/car4.jpg`,
      `${import.meta.env.BASE_URL}cars/car4.jpg`,
    ],
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
    type: "SUV",
    color: "Santorini Black",
    engine: "3.0L Ingenium P400",
    power: "395 hp",
    seats: 5,
    description:
      "The Range Rover Sport HSE Dynamic is the definitive luxury performance SUV. With its iconic silhouette, powerful engine, and unparalleled off-road capability, it commands attention wherever it goes.",
    features: [
      "Dynamic Response Pro",
      "Meridian Signature Sound System",
      "Configurable Terrain Response 2",
      "Pixel LED Headlights",
      "Massage Front Seats",
      "Head-Up Display",
      "Pivi Pro Infotainment",
      "ClearSight Ground View",
      "Wade Sensing",
      "Cabin Air Purification",
    ],
    images: [
      `${import.meta.env.BASE_URL}cars/car5.jpg`,
      `${import.meta.env.BASE_URL}cars/car5.jpg`,
      `${import.meta.env.BASE_URL}cars/car5.jpg`,
    ],
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
    type: "SUV",
    color: "Carrara White Metallic",
    engine: "2.9L V6 Twin-Turbo",
    power: "434 hp",
    seats: 5,
    description:
      "The Porsche Cayenne S is where sports car DNA meets SUV practicality. Engineered for those who refuse to compromise, it delivers breathtaking performance while wrapping you in hand-crafted luxury.",
    features: [
      "Porsche Active Suspension Management",
      "Bose Surround Sound System",
      "SportDesign Package",
      "Panoramic Roof System",
      "Porsche InnoDrive",
      "Night Vision Assist",
      "Rear Axle Steering",
      "Sport Chrono Package",
      "PCM Infotainment System",
      "LED Matrix Headlights",
    ],
    images: [
      `${import.meta.env.BASE_URL}cars/car6.jpg`,
      `${import.meta.env.BASE_URL}cars/car6.jpg`,
      `${import.meta.env.BASE_URL}cars/car6.jpg`,
    ],
  },
  {
    id: "7",
    make: "Mercedes-Benz",
    model: "C300 AMG Line",
    year: "2022",
    price: 75000000,
    condition: "Used",
    fuel: "Petrol",
    mileage: "15,000 km",
    transmission: "Automatic",
    type: "Sedan",
    color: "Polar White",
    engine: "2.0L Turbocharged",
    power: "255 hp",
    seats: 5,
    description:
      "The Mercedes-Benz C300 AMG Line is a statement of refined elegance. Its sleek design, powerful engine, and luxurious interior make it the perfect companion for the discerning executive.",
    features: [
      "AMG Body Styling",
      "MBUX Second Generation",
      "Burmester Sound System",
      "Digital Light Headlights",
      "Active Brake Assist",
      "Heated Front Seats",
      "Wireless Charging",
      "64-Color Ambient Lighting",
      "Panoramic Sunroof",
      "Driving Assistance Package",
    ],
    images: [
      `${import.meta.env.BASE_URL}cars/car7.jpg`,
      `${import.meta.env.BASE_URL}cars/car7.jpg`,
      `${import.meta.env.BASE_URL}cars/car7.jpg`,
    ],
  },
  {
    id: "8",
    make: "BMW",
    model: "5 Series 530i",
    year: "2023",
    price: 88000000,
    condition: "New",
    fuel: "Petrol",
    mileage: "0 km",
    transmission: "Automatic",
    type: "Sedan",
    color: "Alpine White",
    engine: "2.0L TwinPower Turbo",
    power: "248 hp",
    seats: 5,
    description:
      "The BMW 5 Series 530i epitomises the perfect balance between dynamic performance and executive comfort. A true driver's car that also pampers its passengers with world-class luxury.",
    features: [
      "Live Cockpit Professional",
      "Harman Kardon Audio",
      "Driving Assistant Professional",
      "Parking Assistant Plus",
      "Adaptive LED Headlights",
      "Heated Seats Front & Rear",
      "Wireless Apple CarPlay",
      "Gesture Control",
      "Executive Lounge Seating",
      "Panoramic Glass Roof",
    ],
    images: [
      `${import.meta.env.BASE_URL}cars/car8.jpg`,
      `${import.meta.env.BASE_URL}cars/car8.jpg`,
      `${import.meta.env.BASE_URL}cars/car8.jpg`,
    ],
  },
  {
    id: "9",
    make: "Toyota",
    model: "Camry XSE V6",
    year: "2023",
    price: 45000000,
    condition: "New",
    fuel: "Petrol",
    mileage: "0 km",
    transmission: "Automatic",
    type: "Sedan",
    color: "Midnight Black",
    engine: "3.5L V6",
    power: "301 hp",
    seats: 5,
    description:
      "The Toyota Camry XSE V6 combines sporty styling with legendary Toyota reliability. Its powerful V6 engine and bold XSE design make it stand out in any setting while delivering the dependability Toyota is renowned for.",
    features: [
      "Sport-Tuned Suspension",
      "JBL Premium Audio",
      "Toyota Safety Sense",
      "Wireless Apple CarPlay",
      "Dual Zone Climate Control",
      "Heated & Ventilated Seats",
      "Panoramic Moonroof",
      "Blind Spot Monitor",
      "Rear Cross Traffic Alert",
      "8-inch Touchscreen Display",
    ],
    images: [
      `${import.meta.env.BASE_URL}cars/car9.jpg`,
      `${import.meta.env.BASE_URL}cars/car9.jpg`,
      `${import.meta.env.BASE_URL}cars/car9.jpg`,
    ],
  },
];

const CarDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeImage, setActiveImage] = useState(0);
  const [saved, setSaved] = useState(false);

  const car = allCars.find((c) => c.id === id);

  if (!car) {
    return (
      <div className="bg-white min-h-screen">
        <Navbar />
        <div className="flex flex-col items-center justify-center min-h-screen text-center px-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            Vehicle Not Found
          </h2>
          <p className="text-gray-400 text-sm mb-6">
            This vehicle may no longer be available.
          </p>
          <button
            onClick={() => navigate("/inventory")}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-6 py-2.5 rounded-full transition-all duration-300"
          >
            Back to Inventory
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white text-gray-900 min-h-screen">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-24 pb-20">

        {/* Back Button */}
        <button
          onClick={() => navigate("/inventory")}
          className="flex items-center gap-2 text-gray-500 hover:text-blue-600 text-sm font-semibold mb-8 transition-colors group"
        >
          <ArrowLeft
            size={16}
            className="transition-transform duration-300 group-hover:-translate-x-1"
          />
          Back to Inventory
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

          {/* Left — Images */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Main Image */}
            <div className="relative rounded-2xl overflow-hidden h-80 md:h-96 mb-4">
              <img
                src={car.images[activeImage]}
                alt={`${car.make} ${car.model}`}
                className="w-full h-full object-cover object-center"
              />
              {/* Condition Badge */}
              <div className="absolute top-4 left-4">
                <span
                  className={`text-xs font-bold tracking-widest uppercase px-3 py-1.5 rounded-full ${
                    car.condition === "New"
                      ? "bg-blue-600 text-white"
                      : "bg-black/70 text-white backdrop-blur-sm"
                  }`}
                >
                  {car.condition}
                </span>
              </div>
              {/* Save Button */}
              <button
                onClick={() => setSaved(!saved)}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center hover:scale-110 transition-all duration-300"
              >
                <Heart
                  size={16}
                  className={
                    saved
                      ? "fill-red-500 text-red-500"
                      : "text-gray-400"
                  }
                />
              </button>
            </div>

            {/* Thumbnails */}
            <div className="flex gap-3">
              {car.images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setActiveImage(index)}
                  className={`flex-1 h-20 rounded-xl overflow-hidden border-2 transition-all duration-300 ${
                    activeImage === index
                      ? "border-blue-600"
                      : "border-gray-100 hover:border-gray-300"
                  }`}
                >
                  <img
                    src={img}
                    alt={`View ${index + 1}`}
                    className="w-full h-full object-cover object-center"
                  />
                </button>
              ))}
            </div>
          </motion.div>

          {/* Right — Details */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Make + Model */}
            <span className="text-blue-600 text-xs font-bold tracking-[0.2em] uppercase">
              {car.make}
            </span>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mt-1 mb-1">
              {car.model}
            </h1>
            <p className="text-gray-400 text-sm mb-4">{car.year} Model</p>

            {/* Price */}
            <div className="flex items-baseline gap-2 mb-6">
              <span className="text-3xl font-bold text-blue-600">
                ₦{car.price?.toLocaleString()}
              </span>
            </div>

            {/* Specs Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
              {[
                { icon: Fuel, label: "Fuel", value: car.fuel },
                { icon: Gauge, label: "Mileage", value: car.mileage },
                {
                  icon: Settings,
                  label: "Transmission",
                  value: car.transmission,
                },
                { icon: Calendar, label: "Year", value: car.year },
              ].map((spec) => {
                const Icon = spec.icon;
                return (
                  <div
                    key={spec.label}
                    className="bg-gray-50 border border-gray-100 rounded-xl p-3 flex flex-col items-center text-center gap-1.5"
                  >
                    <Icon size={16} className="text-blue-600" />
                    <span className="text-gray-400 text-[10px] tracking-wide">
                      {spec.label}
                    </span>
                    <span className="text-gray-800 text-xs font-semibold">
                      {spec.value}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Extra Specs */}
            <div className="bg-gray-50 border border-gray-100 rounded-xl p-4 mb-6 grid grid-cols-2 gap-3">
              {[
                { label: "Engine", value: car.engine },
                { label: "Power", value: car.power },
                { label: "Color", value: car.color },
                { label: "Seats", value: `${car.seats} Seats` },
              ].map((item) => (
                <div key={item.label}>
                  <p className="text-gray-400 text-xs mb-0.5">{item.label}</p>
                  <p className="text-gray-800 text-sm font-semibold">
                    {item.value}
                  </p>
                </div>
              ))}
            </div>

            {/* Description */}
            <p className="text-gray-500 text-sm leading-relaxed mb-6">
              {car.description}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              <a
                href="tel:+2348000000000"
                className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold py-3.5 px-6 rounded-full flex-1 transition-all duration-300 shadow-sm hover:shadow-md"
              >
                <Phone size={15} />
                Call to Buy
              </a>
              <a
                href={`https://wa.me/2348000000000?text=I am interested in the ${car.year} ${car.make} ${car.model} listed on Kafadona Motors`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 border border-gray-200 hover:border-blue-600 text-gray-700 hover:text-blue-600 text-sm font-semibold py-3.5 px-6 rounded-full flex-1 transition-all duration-300"
              >
                <MessageCircle size={15} />
                WhatsApp
              </a>
            </div>

            {/* Share */}
            <button className="flex items-center gap-2 text-gray-400 hover:text-blue-600 text-xs font-semibold transition-colors">
              <Share2 size={13} />
              Share this vehicle
            </button>
          </motion.div>
        </div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16 bg-gray-50 border border-gray-100 rounded-2xl p-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Key Features
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {car.features.map((feature) => (
              <div key={feature} className="flex items-center gap-3">
                <CheckCircle size={16} className="text-blue-600 shrink-0" />
                <span className="text-gray-600 text-sm">{feature}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
};

export default CarDetailPage;