import { motion } from "framer-motion";
import { Car, Users, Globe, Trophy } from "lucide-react";

const stats = [
  {
    icon: Car,
    value: "500+",
    label: "Cars Sold",
  },
  {
    icon: Users,
    value: "1,200+",
    label: "Happy Clients",
  },
  {
    icon: Globe,
    value: "15+",
    label: "Countries Sourced",
  },
  {
    icon: Trophy,
    value: "10+",
    label: "Years Experience",
  },
];

const StatsBar = () => {
  return (
    <div className="bg-brand-500 py-10 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex flex-col items-center text-center gap-3"
              >
                {/* Icon */}
                <div className="w-11 h-11 rounded-full bg-white/20 flex items-center justify-center">
                  <Icon size={20} className="text-white" />
                </div>

                {/* Value */}
                <span className="text-3xl md:text-4xl font-bold text-white">
                  {stat.value}
                </span>

                {/* Label */}
                <span className="text-brand-100 text-sm tracking-wide">
                  {stat.label}
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default StatsBar;