import { motion } from "framer-motion";
import {
  ShieldCheck,
  Globe,
  Users,
  Trophy,
  ArrowRight,
  CheckCircle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useSite } from "../context/SiteContext";

const stats = [
  { value: "500+", label: "Cars Sold" },
  { value: "1,200+", label: "Happy Clients" },
  { value: "15+", label: "Countries Sourced" },
  { value: "10+", label: "Years Experience" },
];

const values = [
  {
    icon: ShieldCheck,
    title: "Integrity",
    description:
      "We are transparent in everything we do. No hidden fees, no misleading descriptions, no surprises at delivery.",
  },
  {
    icon: Globe,
    title: "Global Reach",
    description:
      "We source vehicles from trusted dealers and auctions across the UK, USA, UAE, Japan, and China.",
  },
  {
    icon: Users,
    title: "Client First",
    description:
      "Every decision we make is guided by what is best for our clients. Your satisfaction is our only metric.",
  },
  {
    icon: Trophy,
    title: "Excellence",
    description:
      "We hold ourselves to the highest standards in vehicle quality, documentation, and customer service.",
  },
];

const team = [
  {
    name: "Kingsley Festus",
    role: "Founder & CEO",
    initials: "KF",
    bio: "With over 10 years in the automotive import industry, our founder built this business with a vision to make premium vehicles accessible to Nigerians without compromise.",
  },
  {
    name: "Daniella Okafor",
    role: "Head of Operations",
    initials: "DO",
    bio: "Daniella oversees all import logistics, documentation, and delivery processes ensuring every vehicle arrives on time and in perfect condition.",
  },
  {
    name: "Emeka Chukwu",
    role: "Sales Director",
    initials: "EC",
    bio: "Emeka leads the sales team with a client-focused approach, helping hundreds of customers find their perfect vehicle every year.",
  },
];

const AboutPage = () => {
  const navigate = useNavigate();
  const { settings } = useSite();

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
            <span className="text-brand-500 text-xs font-bold tracking-[0.2em] uppercase">
              Our Story
            </span>
            <div className="w-12 h-0.5 bg-brand-500 rounded-full my-3" />
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
              About {settings.business_name}
            </h1>
            <p className="text-gray-500 text-sm mt-3 max-w-lg leading-relaxed">
              Learn who we are, what drives us, and why thousands of
              Nigerians trust {settings.business_name} with their premium
              vehicle needs.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20">

        {/* Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-brand-500 text-xs font-bold tracking-[0.2em] uppercase">
              Who We Are
            </span>
            <div className="w-12 h-0.5 bg-brand-500 rounded-full my-3" />
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-5 leading-snug">
              Built on Trust,
              <br />
              <span className="text-brand-500">Driven by Excellence</span>
            </h2>
            <div className="flex flex-col gap-4 text-gray-500 text-sm leading-relaxed">
              <p>
                {settings.business_name} was founded with a single mission
                — to give Nigerians access to the world's finest vehicles
                without the stress, uncertainty, and hidden costs that
                plague the industry.
              </p>
              <p>
                Over the years, we have built a reputation for
                reliability, transparency, and unmatched after-sales
                support. Every vehicle we sell is personally vetted, fully
                documented, and delivered with care.
              </p>
              <p>
                From our base in {settings.address}, we serve clients
                across all 36 states of Nigeria, delivering premium
                vehicles right to your doorstep regardless of location.
              </p>
            </div>

            {/* Checklist */}
            <div className="flex flex-col gap-3 mt-6">
              {[
                "Licensed vehicle importer & dealer",
                "Registered with CAC Nigeria",
                "10+ years industry experience",
                "Nationwide delivery available",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <CheckCircle
                    size={15}
                    className="text-brand-500 shrink-0"
                  />
                  <span className="text-gray-600 text-sm">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-2 gap-4"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-gray-50 border border-gray-100 rounded-2xl p-6 text-center hover:shadow-md hover:-translate-y-1 transition-all duration-300"
              >
                <span className="text-4xl font-bold text-brand-500">
                  {stat.value}
                </span>
                <p className="text-gray-500 text-sm mt-2">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Values Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-brand-500 text-xs font-bold tracking-[0.2em] uppercase">
            What We Stand For
          </span>
          <div className="w-12 h-0.5 bg-brand-500 rounded-full mx-auto my-3" />
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Our Core Values
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
          {values.map((value, index) => {
            const Icon = value.icon;
            return (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white border border-gray-100 rounded-2xl p-6 text-center hover:shadow-md hover:-translate-y-1 transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-xl bg-brand-50 flex items-center justify-center mx-auto mb-4 group-hover:bg-brand-500 transition-colors duration-300">
                  <Icon
                    size={22}
                    className="text-brand-500 group-hover:text-white transition-colors duration-300"
                  />
                </div>
                <h3 className="text-gray-900 font-bold text-lg mb-2">
                  {value.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Team Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-brand-500 text-xs font-bold tracking-[0.2em] uppercase">
            The People Behind {settings.business_name}
          </span>
          <div className="w-12 h-0.5 bg-brand-500 rounded-full mx-auto my-3" />
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Meet Our Team
          </h2>
          <p className="text-gray-500 text-sm mt-3 max-w-xl mx-auto leading-relaxed">
            A dedicated team of automotive professionals committed to
            delivering the best vehicle experience in Nigeria.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-24">
          {team.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white border border-gray-100 rounded-2xl p-6 text-center hover:shadow-md hover:-translate-y-1 transition-all duration-300"
            >
              <div className="w-16 h-16 rounded-full bg-brand-500 flex items-center justify-center mx-auto mb-4 shadow-md shadow-brand-100">
                <span className="text-white font-bold text-lg">
                  {member.initials}
                </span>
              </div>
              <h3 className="text-gray-900 font-bold text-lg mb-1">
                {member.name}
              </h3>
              <p className="text-brand-500 text-xs font-bold tracking-widest uppercase mb-3">
                {member.role}
              </p>
              <p className="text-gray-500 text-sm leading-relaxed">
                {member.bio}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-brand-500 rounded-2xl p-10 text-center"
        >
          <span className="text-brand-100 text-xs font-bold tracking-[0.2em] uppercase">
            Ready to Get Started?
          </span>
          <h2 className="text-3xl font-bold text-white mt-3 mb-3">
            Let Us Find Your Perfect Car
          </h2>
          <p className="text-brand-100 text-sm max-w-md mx-auto leading-relaxed mb-8">
            Whether you are buying, importing, or just exploring your
            options, the team at {settings.business_name} is ready to
            guide you every step of the way.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => navigate("/inventory")}
              className="flex items-center gap-2 bg-white text-brand-500 hover:bg-brand-50 text-sm font-bold px-7 py-3.5 rounded-full transition-all duration-300 shadow-sm"
            >
              Browse Inventory
              <ArrowRight size={15} />
            </button>
            <button
              onClick={() => navigate("/contact")}
              className="flex items-center gap-2 border border-white/40 hover:border-white text-white text-sm font-semibold px-7 py-3.5 rounded-full transition-all duration-300"
            >
              Contact Us
            </button>
          </div>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
};

export default AboutPage;