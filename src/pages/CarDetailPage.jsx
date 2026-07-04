import { useState, useEffect } from "react";
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
import { fetchCarById } from "../supabaseService";
import { useSite } from "../context/SiteContext";

const CarDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { settings } = useSite();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);
  const [saved, setSaved] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const loadCar = async () => {
      const data = await fetchCarById(id);
      setCar(data);
      setLoading(false);
    };
    loadCar();
  }, [id]);

  const getFeatures = () => {
    if (!car?.features) return [];
    if (Array.isArray(car.features)) return car.features;
    return car.features.split(",").map((f) => f.trim()).filter(Boolean);
  };

  const getImages = () => {
    if (!car?.image_url) return [];
    return [car.image_url];
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) {
    return (
      <div className="bg-white min-h-screen">
        <Navbar />
        <div className="flex items-center justify-center min-h-screen">
          <div className="flex flex-col items-center gap-3">
            <svg
              className="animate-spin h-8 w-8 text-brand-500"
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
              Loading vehicle...
            </p>
          </div>
        </div>
      </div>
    );
  }

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
            className="flex items-center gap-2 bg-brand-500 hover:bg-brand-600 text-white text-sm font-semibold px-6 py-2.5 rounded-full transition-all duration-300"
          >
            Back to Inventory
          </button>
        </div>
      </div>
    );
  }

  const images = getImages();
  const features = getFeatures();

  return (
    <div className="bg-white text-gray-900 min-h-screen">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-24 pb-20">

        {/* Back Button */}
        <button
          onClick={() => navigate("/inventory")}
          className="flex items-center gap-2 text-gray-500 hover:text-brand-500 text-sm font-semibold mb-8 transition-colors group"
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
            <div className="relative rounded-2xl overflow-hidden h-80 md:h-96 mb-4 bg-gray-100">
              {images.length > 0 ? (
                <img
                  src={images[activeImage]}
                  alt={`${car.make} ${car.model}`}
                  className="w-full h-full object-cover object-center"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <p className="text-gray-400 text-sm">No image available</p>
                </div>
              )}

              {/* Condition Badge */}
              <div className="absolute top-4 left-4">
                <span
                  className={`text-xs font-bold tracking-widest uppercase px-3 py-1.5 rounded-full ${
                    car.condition === "New"
                      ? "bg-brand-500 text-white"
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
                    saved ? "fill-red-500 text-red-500" : "text-gray-400"
                  }
                />
              </button>
            </div>

            {/* Thumbnails */}
            {images.length > 1 && (
              <div className="flex gap-3">
                {images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveImage(index)}
                    className={`flex-1 h-20 rounded-xl overflow-hidden border-2 transition-all duration-300 ${
                      activeImage === index
                        ? "border-brand-500"
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
            )}
          </motion.div>

          {/* Right — Details */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-brand-500 text-xs font-bold tracking-[0.2em] uppercase">
              {car.make}
            </span>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mt-1 mb-1">
              {car.model}
            </h1>
            <p className="text-gray-400 text-sm mb-4">{car.year} Model</p>

            {/* Price */}
            <div className="flex items-baseline gap-2 mb-6">
              <span className="text-3xl font-bold text-brand-500">
                ₦{Number(car.price)?.toLocaleString()}
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
                    <Icon size={16} className="text-brand-500" />
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
                {
                  label: "Seats",
                  value: car.seats ? `${car.seats} Seats` : null,
                },
              ]
                .filter((item) => item.value)
                .map((item) => (
                  <div key={item.label}>
                    <p className="text-gray-400 text-xs mb-0.5">
                      {item.label}
                    </p>
                    <p className="text-gray-800 text-sm font-semibold">
                      {item.value}
                    </p>
                  </div>
                ))}
            </div>

            {/* Description */}
            {car.description && (
              <p className="text-gray-500 text-sm leading-relaxed mb-6">
                {car.description}
              </p>
            )}

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              <a
                href={`tel:${settings.phone}`}
                className="flex items-center justify-center gap-2 bg-brand-500 hover:bg-brand-600 text-white text-sm font-semibold py-3.5 px-6 rounded-full flex-1 transition-all duration-300 shadow-sm hover:shadow-md"
              >
                <Phone size={15} />
                Call to Buy
              </a>
              <a
                href={`https://wa.me/${settings.whatsapp}?text=I am interested in the ${car.year} ${car.make} ${car.model} listed on ${settings.business_name}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 border border-gray-200 hover:border-brand-500 text-gray-700 hover:text-brand-500 text-sm font-semibold py-3.5 px-6 rounded-full flex-1 transition-all duration-300"
              >
                <MessageCircle size={15} />
                WhatsApp
              </a>
            </div>

            {/* Share */}
            <button
              onClick={handleShare}
              className="flex items-center gap-2 text-gray-400 hover:text-brand-500 text-xs font-semibold transition-colors"
            >
              <Share2 size={13} />
              {copied ? "Link copied!" : "Copy link to share"}
            </button>
          </motion.div>
        </div>

        {/* Features */}
        {features.length > 0 && (
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
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <CheckCircle
                    size={16}
                    className="text-brand-500 shrink-0"
                  />
                  <span className="text-gray-600 text-sm">{feature}</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default CarDetailPage;