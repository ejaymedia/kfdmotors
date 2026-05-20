import { motion } from "framer-motion";
import { Phone, Mail, MapPin, ArrowRight, MessageCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const contactDetails = [
  {
    icon: Phone,
    label: "Call Us",
    value: "+234 800 000 0000",
    href: "tel:+2348000000000",
  },
  {
    icon: Mail,
    label: "Email Us",
    value: "info@kafadonamotors.com",
    href: "mailto:info@kafadonamotors.com",
  },
  {
    icon: MapPin,
    label: "Visit Us",
    value: "Victoria Island, Lagos, Nigeria",
    href: "#",
  },
];

const ContactCTA = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-white py-20 px-6 border-t border-gray-100">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Left — Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-blue-600 text-xs font-bold tracking-[0.2em] uppercase">
              Get In Touch
            </span>
            <div className="w-12 h-0.5 bg-blue-600 rounded-full my-3" />
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-snug">
              Ready to Find Your
              <br />
              <span className="text-blue-600">Perfect Vehicle?</span>
            </h2>
            <p className="text-gray-500 text-sm mt-4 leading-relaxed max-w-md">
              Whether you are looking to buy, import, or simply want
              expert advice, our team is ready to help. Reach out today
              and let us make your dream car a reality.
            </p>

            {/* Contact Details */}
            <div className="flex flex-col gap-4 mt-8">
              {contactDetails.map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.a
                    key={item.label}
                    href={item.href}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex items-center gap-4 group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center shrink-0 group-hover:bg-blue-600 transition-colors duration-300">
                      <Icon
                        size={17}
                        className="text-blue-600 group-hover:text-white transition-colors duration-300"
                      />
                    </div>
                    <div>
                      <p className="text-gray-400 text-xs">{item.label}</p>
                      <p className="text-gray-800 text-sm font-semibold group-hover:text-blue-600 transition-colors duration-300">
                        {item.value}
                      </p>
                    </div>
                  </motion.a>
                );
              })}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-start gap-4 mt-10">
              <button
                onClick={() => navigate("/contact")}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-7 py-3.5 rounded-full transition-all duration-300 shadow-sm hover:shadow-md"
              >
                Contact Us
                <ArrowRight size={15} />
              </button>
              <a
                href="https://wa.me/2348000000000"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 border border-gray-200 hover:border-blue-600 text-gray-700 hover:text-blue-600 text-sm font-semibold px-7 py-3.5 rounded-full transition-all duration-300"
              >
                <MessageCircle size={15} />
                WhatsApp Us
              </a>
            </div>
          </motion.div>

          {/* Right — Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-gray-50 border border-gray-100 rounded-2xl p-8"
          >
            <h3 className="text-gray-900 font-bold text-xl mb-6">
              Send Us a Message
            </h3>

            <div className="flex flex-col gap-4">
              {/* Name */}
              <div className="flex flex-col gap-1.5">
                <label className="text-gray-600 text-xs font-semibold tracking-wide">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="John Doe"
                  className="bg-white border border-gray-200 rounded-xl px-4 py-3 text-gray-800 text-sm placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all"
                />
              </div>

              {/* Phone */}
              <div className="flex flex-col gap-1.5">
                <label className="text-gray-600 text-xs font-semibold tracking-wide">
                  Phone Number
                </label>
                <input
                  type="tel"
                  placeholder="+234 800 000 0000"
                  className="bg-white border border-gray-200 rounded-xl px-4 py-3 text-gray-800 text-sm placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all"
                />
              </div>

              {/* Interest */}
              <div className="flex flex-col gap-1.5">
                <label className="text-gray-600 text-xs font-semibold tracking-wide">
                  I am interested in
                </label>
                <select className="bg-white border border-gray-200 rounded-xl px-4 py-3 text-gray-800 text-sm focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all appearance-none cursor-pointer">
                  <option value="">Select an option</option>
                  <option value="buying">Buying a Car</option>
                  <option value="importing">Importing a Car</option>
                  <option value="financing">Financing Options</option>
                  <option value="other">Other Enquiry</option>
                </select>
              </div>

              {/* Message */}
              <div className="flex flex-col gap-1.5">
                <label className="text-gray-600 text-xs font-semibold tracking-wide">
                  Message
                </label>
                <textarea
                  rows={4}
                  placeholder="Tell us what you are looking for..."
                  className="bg-white border border-gray-200 rounded-xl px-4 py-3 text-gray-800 text-sm placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all resize-none"
                />
              </div>

              {/* Submit */}
              <button className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold py-3.5 rounded-xl transition-all duration-300 shadow-sm hover:shadow-md mt-1">
                Send Message
                <ArrowRight size={15} />
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ContactCTA;