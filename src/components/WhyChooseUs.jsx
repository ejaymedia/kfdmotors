import { motion } from "framer-motion";
import {
  ShieldCheck,
  FileText,
  Ship,
  Headphones,
  BadgeCheck,
  Clock,
} from "lucide-react";

const reasons = [
  {
    icon: ShieldCheck,
    title: "Verified & Inspected",
    description:
      "Every vehicle undergoes a rigorous multi-point inspection before it reaches you. No hidden faults, no surprises.",
  },
  {
    icon: FileText,
    title: "Full Documentation",
    description:
      "We handle all customs clearance, duty papers, and registration documents from start to finish.",
  },
  {
    icon: Ship,
    title: "Direct Imports",
    description:
      "We source directly from trusted dealers and auctions in the UK, USA, UAE, and Asia for the best prices.",
  },
  {
    icon: Headphones,
    title: "Dedicated Support",
    description:
      "Our team is available before, during, and after your purchase. You are never left on your own.",
  },
  {
    icon: BadgeCheck,
    title: "Trusted by Thousands",
    description:
      "Over 1,200 satisfied clients across Nigeria trust Kafadona Motors for their premium vehicle needs.",
  },
  {
    icon: Clock,
    title: "Fast Turnaround",
    description:
      "From order to delivery, we work at speed. Most vehicles are delivered within 4 to 8 weeks.",
  },
];

const WhyChooseUs = () => {
  return (
    <div className="bg-gray-50 py-20 px-6 border-t border-gray-100">
      <div className="max-w-7xl mx-auto">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="text-blue-600 text-xs font-bold tracking-[0.2em] uppercase">
            Why Kafadona Motors
          </span>
          <div className="w-12 h-0.5 bg-blue-600 rounded-full mx-auto my-3" />
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            The Kafadona Difference
          </h2>
          <p className="text-gray-500 text-sm mt-3 max-w-xl mx-auto leading-relaxed">
            We are not just a dealership. We are your personal vehicle
            procurement partner — committed to quality, transparency, and
            your complete satisfaction.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((reason, index) => {
            const Icon = reason.icon;
            return (
              <motion.div
                key={reason.title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white border border-gray-100 rounded-2xl p-6 hover:shadow-md hover:-translate-y-1 transition-all duration-300 group"
              >
                {/* Icon */}
                <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center mb-4 group-hover:bg-blue-600 transition-colors duration-300">
                  <Icon
                    size={22}
                    className="text-blue-600 group-hover:text-white transition-colors duration-300"
                  />
                </div>

                {/* Title */}
                <h3 className="text-gray-900 font-bold text-lg mb-2">
                  {reason.title}
                </h3>

                {/* Description */}
                <p className="text-gray-500 text-sm leading-relaxed">
                  {reason.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default WhyChooseUs;