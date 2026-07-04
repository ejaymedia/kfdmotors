import { motion } from "framer-motion";
import { Phone, Mail, MapPin, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSite } from "../context/SiteContext";

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

const Footer = () => {
  const navigate = useNavigate();
  const { settings } = useSite();

  const goTo = (path) => {
    navigate(path);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const socials = [
    { label: "IG", href: settings.instagram || "#", name: "Instagram" },
    { label: "FB", href: settings.facebook || "#", name: "Facebook" },
    { label: "TT", href: settings.tiktok || "#", name: "TikTok" },
  ];

  return (
    <footer className="bg-brand-900 text-white border-t border-brand-800">

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
              {settings.logo_url ? (
                <img
                  src={settings.logo_url}
                  alt={settings.business_name}
                  className="h-10 w-auto object-contain"
                />
              ) : (
                <span className="text-white font-bold text-xl tracking-wide">
                  {settings.business_name}
                </span>
              )}
            </button>

            <p className="text-brand-200 text-sm leading-relaxed mb-6">
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
                  className="w-9 h-9 rounded-full bg-brand-800 hover:bg-brand-500 border border-brand-700 hover:border-brand-500 flex items-center justify-center text-brand-200 hover:text-white transition-all duration-300 text-xs font-bold"
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
                    className="flex items-center gap-2 text-brand-200 text-sm hover:text-white transition-colors duration-300 group"
                  >
                    <ArrowRight
                      size={12}
                      className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-brand-400"
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
                    className="flex items-center gap-2 text-brand-200 text-sm hover:text-white transition-colors duration-300 group text-left"
                  >
                    <ArrowRight
                      size={12}
                      className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-brand-400 shrink-0"
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
                  href={`tel:${settings.phone}`}
                  className="flex items-start gap-3 group"
                >
                  <div className="w-8 h-8 rounded-lg bg-brand-800 border border-brand-700 flex items-center justify-center shrink-0 group-hover:bg-brand-500 group-hover:border-brand-500 transition-all duration-300 mt-0.5">
                    <Phone
                      size={13}
                      className="text-brand-300 group-hover:text-white transition-colors duration-300"
                    />
                  </div>
                  <div>
                    <p className="text-brand-400 text-xs mb-0.5">Phone</p>
                    <p className="text-brand-200 text-sm group-hover:text-white transition-colors duration-300">
                      {settings.phone}
                    </p>
                  </div>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${settings.email}`}
                  className="flex items-start gap-3 group"
                >
                  <div className="w-8 h-8 rounded-lg bg-brand-800 border border-brand-700 flex items-center justify-center shrink-0 group-hover:bg-brand-500 group-hover:border-brand-500 transition-all duration-300 mt-0.5">
                    <Mail
                      size={13}
                      className="text-brand-300 group-hover:text-white transition-colors duration-300"
                    />
                  </div>
                  <div>
                    <p className="text-brand-400 text-xs mb-0.5">Email</p>
                    <p className="text-brand-200 text-sm group-hover:text-white transition-colors duration-300">
                      {settings.email}
                    </p>
                  </div>
                </a>
              </li>
              <li>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-brand-800 border border-brand-700 flex items-center justify-center shrink-0 mt-0.5">
                    <MapPin size={13} className="text-brand-300" />
                  </div>
                  <div>
                    <p className="text-brand-400 text-xs mb-0.5">Address</p>
                    <p className="text-brand-200 text-sm leading-relaxed">
                      {settings.address}
                    </p>
                  </div>
                </div>
              </li>
            </ul>
          </motion.div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-brand-800 px-6 lg:px-8 py-5">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-brand-300 text-xs text-center sm:text-left">
            © {new Date().getFullYear()} {settings.business_name}. All
            rights reserved. | Built with ❤️ by{" "}
            <a
              href="https://elijah.is-a.dev"
              target="_blank"
              rel="noreferrer"
              className="text-brand-400 hover:text-white transition-colors duration-300 underline underline-offset-2"
            >
              Ejay
            </a>
          </p>
          <div className="flex items-center gap-5">
            <button className="text-brand-300 text-xs hover:text-white transition-colors">
              Privacy Policy
            </button>
            <button className="text-brand-300 text-xs hover:text-white transition-colors">
              Terms of Service
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;