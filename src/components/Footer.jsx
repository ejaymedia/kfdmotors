import { motion } from "framer-motion";
import { Phone, Mail, MapPin, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Logo from "/logo/Logo.png";

const quickLinks = [
  { label: "Home", path: "/" },
  { label: "Inventory", path: "/inventory" },
  { label: "FAQ", path: "/faq" },
  { label: "About Us", path: "/about" },
  { label: "Contact", path: "/contact" },
];

const services = [
  { label: "Vehicle Sales", path: "/inventory" },
  { label: "Vehicle Importation", path: "/contact" },
  { label: "Documentation & Clearance", path: "/contact" },
  { label: "Financing Options", path: "/contact" },
  { label: "After-Sales Support", path: "/contact" },
];

const socials = [
  { label: "IG", href: "https://www.instagram.com/kafadonamotors", name: "Instagram" },
  { label: "FB", href: "#", name: "Facebook" },
  { label: "TW", href: "#", name: "Twitter" },
  { label: "YT", href: "#", name: "YouTube" },
];

const Footer = () => {
  const navigate = useNavigate();

  const goTo = (path) => {
    navigate(path);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-gray-900 text-white border-t border-gray-800">

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* Col 1 — Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <button onClick={() => goTo("/")} className="mb-5 block">
              <img
                src={Logo}
                alt="Kafadona Motors"
                className="h-10 w-auto object-contain"
              />
            </button>

            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Nigeria's trusted destination for premium vehicle sales,
              direct imports, documentation, and after-sales support.
            </p>

            {/* Socials */}
            <div className="flex items-center gap-3">
              {socials.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={social.name}
                  className="w-9 h-9 rounded-full bg-gray-800 hover:bg-blue-600 border border-gray-700 hover:border-blue-600 flex items-center justify-center text-gray-400 hover:text-white transition-all duration-300 text-xs font-bold"
                >
                  {social.label}
                </a>
              ))}
            </div>
          </motion.div>

          {/* Col 2 — Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h4 className="text-white font-bold text-sm tracking-widest uppercase mb-5">
              Quick Links
            </h4>
            <ul className="flex flex-col gap-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => goTo(link.path)}
                    className="flex items-center gap-2 text-gray-400 text-sm hover:text-blue-400 transition-colors duration-300 group"
                  >
                    <ArrowRight
                      size={12}
                      className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-blue-400"
                    />
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Col 3 — Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h4 className="text-white font-bold text-sm tracking-widest uppercase mb-5">
              Our Services
            </h4>
            <ul className="flex flex-col gap-3">
              {services.map((service) => (
                <li key={service.label}>
                  <button
                    onClick={() => goTo(service.path)}
                    className="flex items-center gap-2 text-gray-400 text-sm hover:text-blue-400 transition-colors duration-300 group text-left"
                  >
                    <ArrowRight
                      size={12}
                      className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-blue-400 shrink-0"
                    />
                    {service.label}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Col 4 — Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h4 className="text-white font-bold text-sm tracking-widest uppercase mb-5">
              Contact Us
            </h4>
            <ul className="flex flex-col gap-4">
              <li>
                <a
                  href="tel:+2348000000000"
                  className="flex items-start gap-3 group"
                >
                  <div className="w-8 h-8 rounded-lg bg-gray-800 border border-gray-700 flex items-center justify-center shrink-0 group-hover:bg-blue-600 group-hover:border-blue-600 transition-all duration-300 mt-0.5">
                    <Phone size={13} className="text-gray-400 group-hover:text-white transition-colors duration-300" />
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs mb-0.5">Phone</p>
                    <p className="text-gray-300 text-sm group-hover:text-blue-400 transition-colors duration-300">
                      +234 800 000 0000
                    </p>
                  </div>
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@kafadonamotors.com"
                  className="flex items-start gap-3 group"
                >
                  <div className="w-8 h-8 rounded-lg bg-gray-800 border border-gray-700 flex items-center justify-center shrink-0 group-hover:bg-blue-600 group-hover:border-blue-600 transition-all duration-300 mt-0.5">
                    <Mail size={13} className="text-gray-400 group-hover:text-white transition-colors duration-300" />
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs mb-0.5">Email</p>
                    <p className="text-gray-300 text-sm group-hover:text-blue-400 transition-colors duration-300">
                      info@kafadonamotors.com
                    </p>
                  </div>
                </a>
              </li>
              <li>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-gray-800 border border-gray-700 flex items-center justify-center shrink-0 mt-0.5">
                    <MapPin size={13} className="text-gray-400" />
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs mb-0.5">Address</p>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      Victoria Island,
                      <br />
                      Lagos, Nigeria
                    </p>
                  </div>
                </div>
              </li>
            </ul>
          </motion.div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800 px-6 lg:px-8 py-5">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-gray-500 text-xs text-center sm:text-left">
            © 2026 Kafadona Motors. All rights reserved. | Built with ❤️ by{" "}
            <a
              href="https://elijah.is-a.dev"
              target="_blank"
              rel="noreferrer"
              className="text-blue-400 hover:text-blue-300 transition-colors duration-300 underline underline-offset-2"
            >
              Ejay
            </a>
          </p>
          <div className="flex items-center gap-5">
            <button className="text-gray-500 text-xs hover:text-gray-300 transition-colors">
              Privacy Policy
            </button>
            <button className="text-gray-500 text-xs hover:text-gray-300 transition-colors">
              Terms of Service
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;