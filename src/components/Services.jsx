import { motion } from "framer-motion";
import {
  Car,
  Ship,
  FileSearch,
  Wrench,
  CreditCard,
  ArrowRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSite } from "../context/SiteContext";

const services = [
  {
    icon: Car,
    title: "Vehicle Sales",
    description:
      "Browse our wide selection of new and used premium vehicles. From SUVs to sedans, we have something for every taste and budget.",
    link: "/inventory",
    linkText: "Browse Inventory",
  },
  {
    icon: Ship,
    title: "Vehicle Importation",
    description:
      "We handle the full importation process on your behalf. Tell us the car you want and we will source, ship, and clear it for you.",
    link: "/contact",
    linkText: "Place an Order",
  },
  {
    icon: FileSearch,
    title: "Documentation & Clearance",
    description:
      "Our experienced team handles all customs clearance, duty payments, and vehicle registration paperwork seamlessly.",
    link: "/contact",
    linkText: "Learn More",
  },
  {
    icon: CreditCard,
    title: "Financing Options",
    description:
      "Flexible payment plans and financing solutions to help you drive your dream car without financial strain.",
    link: "/contact",
    linkText: "Get In Touch",
  },
  {
    icon: Wrench,
    title: "After-Sales Support",
    description:
      "Our relationship does not end at delivery. We provide ongoing support, servicing referrals, and warranty assistance.",
    link: "/contact",
    linkText: "Get Support",
  },
];

const Services = () => {
  const navigate = useNavigate();
  const { settings } = useSite();

  return (
    <div className="bg-white py-20 px-6 border-t border-gray-100">
      <div className="max-w-7xl mx-auto">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="text-brand-500 text-xs font-bold tracking-[0.2em] uppercase">
            What We Offer
          </span>
          <div className="w-12 h-0.5 bg-brand-500 rounded-full mx-auto my-3" />
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Our Services
          </h2>
          <p className="text-gray-500 text-sm mt-3 max-w-xl mx-auto leading-relaxed">
            From sourcing to delivery, {settings.business_name} provides
            a complete end-to-end vehicle experience tailored to your
            needs.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white border border-gray-100 rounded-2xl p-6 flex flex-col hover:shadow-md hover:-translate-y-1 transition-all duration-300 group"
              >
                {/* Icon + Title */}
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-brand-50 flex items-center justify-center shrink-0 group-hover:bg-brand-500 transition-colors duration-300">
                    <Icon
                      size={22}
                      className="text-brand-500 group-hover:text-white transition-colors duration-300"
                    />
                  </div>
                  <h3 className="text-gray-900 font-bold text-lg leading-snug mt-1">
                    {service.title}
                  </h3>
                </div>

                {/* Description */}
                <p className="text-gray-500 text-sm leading-relaxed flex-1 mb-5">
                  {service.description}
                </p>

                {/* Link */}
                <button
                  onClick={() => navigate(service.link)}
                  className="flex items-center gap-2 text-sm font-semibold text-brand-500 hover:text-brand-600 transition-colors group/link self-start"
                >
                  {service.linkText}
                  <ArrowRight
                    size={14}
                    className="transition-transform duration-300 group-hover/link:translate-x-1"
                  />
                </button>
              </motion.div>
            );
          })}

          {/* CTA Card */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: services.length * 0.1 }}
            className="rounded-2xl p-6 flex flex-col justify-between bg-brand-500 hover:bg-brand-600 transition-colors duration-300 hover:-translate-y-1 hover:shadow-md"
          >
            <div>
              <span className="text-brand-100 text-xs font-bold tracking-[0.2em] uppercase">
                Get Started
              </span>
              <h3 className="text-white font-bold text-xl mt-3 mb-3 leading-snug">
                Not Sure Where to Begin?
              </h3>
              <p className="text-brand-100 text-sm leading-relaxed">
                Speak with one of our vehicle consultants at{" "}
                {settings.business_name} today. We will guide you through
                the entire process from selection to delivery.
              </p>
            </div>
            <button
              onClick={() => navigate("/contact")}
              className="flex items-center gap-2 bg-white text-brand-500 hover:bg-brand-50 text-sm font-bold px-5 py-2.5 rounded-full mt-6 self-start transition-all duration-300"
            >
              Talk to Us
              <ArrowRight size={14} />
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Services;