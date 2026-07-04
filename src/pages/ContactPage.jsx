import { useState } from "react";
import { motion } from "framer-motion";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageCircle,
  ArrowRight,
  CheckCircle,
  Send,
} from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useSite } from "../context/SiteContext";
import { submitEnquiry } from "../supabaseService";

const interests = [
  "Buying a Car",
  "Importing a Car",
  "Financing Options",
  "Documentation Help",
  "After-Sales Support",
  "Other Enquiry",
];

const ContactPage = () => {
  const { settings } = useSite();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    interest: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const contactInfo = [
    {
      icon: Phone,
      label: "Phone",
      value: settings.phone,
      sub: "Mon – Sat, 8am – 6pm",
      href: `tel:${settings.phone}`,
    },
    {
      icon: MessageCircle,
      label: "WhatsApp",
      value: settings.phone,
      sub: "Quick responses guaranteed",
      href: `https://wa.me/${settings.whatsapp}`,
    },
    {
      icon: Mail,
      label: "Email",
      value: settings.email,
      sub: "We reply within 24 hours",
      href: `mailto:${settings.email}`,
    },
    {
      icon: MapPin,
      label: "Address",
      value: settings.address,
      sub: "Nigeria",
      href: null,
    },
    {
      icon: Clock,
      label: "Working Hours",
      value: "Mon – Sat: 8am – 6pm",
      sub: "Sunday: By appointment",
      href: null,
    },
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.phone || !formData.message) return;
    setLoading(true);
    const result = await submitEnquiry({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      interest: formData.interest,
      message: formData.message,
      status: "New",
    });
    setLoading(false);
    if (result.success) {
      setSubmitted(true);
    } else {
      alert("Failed to send message. Please try again.");
    }
  };

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
              Reach Out
            </span>
            <div className="w-12 h-0.5 bg-brand-500 rounded-full my-3" />
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
              Contact Us
            </h1>
            <p className="text-gray-500 text-sm mt-3 max-w-lg leading-relaxed">
              Have a question, want to place an order, or just need
              expert advice? The team at {settings.business_name} is
              ready to help you every step of the way.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

          {/* Left — Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-brand-500 text-xs font-bold tracking-[0.2em] uppercase">
              Get In Touch
            </span>
            <div className="w-12 h-0.5 bg-brand-500 rounded-full my-3" />
            <h2 className="text-3xl font-bold text-gray-900 mb-3 leading-snug">
              We Would Love
              <br />
              <span className="text-brand-500">to Hear From You</span>
            </h2>
            <p className="text-gray-500 text-sm leading-relaxed mb-8 max-w-md">
              Whether you are ready to buy, exploring your options, or
              need help with documentation, the {settings.business_name}{" "}
              team is here Monday to Saturday to assist you.
            </p>

            {/* Contact Cards */}
            <div className="flex flex-col gap-3 mb-10">
              {contactInfo.map((item, index) => {
                const Icon = item.icon;
                const Wrapper = item.href ? "a" : "div";
                const wrapperProps = item.href
                  ? {
                      href: item.href,
                      target: item.href.startsWith("http")
                        ? "_blank"
                        : undefined,
                      rel: item.href.startsWith("http")
                        ? "noreferrer"
                        : undefined,
                    }
                  : {};

                return (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.08 }}
                  >
                    <Wrapper
                      {...wrapperProps}
                      className="flex items-center gap-4 bg-gray-50 border border-gray-100 rounded-2xl px-5 py-4 group hover:border-brand-200 hover:bg-brand-50 transition-all duration-300"
                    >
                      <div className="w-10 h-10 rounded-xl bg-white border border-gray-100 flex items-center justify-center shrink-0 group-hover:bg-brand-500 group-hover:border-brand-500 transition-all duration-300">
                        <Icon
                          size={17}
                          className="text-brand-500 group-hover:text-white transition-colors duration-300"
                        />
                      </div>
                      <div>
                        <p className="text-gray-400 text-xs mb-0.5">
                          {item.label}
                        </p>
                        <p className="text-gray-800 text-sm font-semibold group-hover:text-brand-500 transition-colors duration-300">
                          {item.value}
                        </p>
                        <p className="text-gray-400 text-xs mt-0.5">
                          {item.sub}
                        </p>
                      </div>
                    </Wrapper>
                  </motion.div>
                );
              })}
            </div>

            {/* WhatsApp CTA */}
            <a
              href={`https://wa.me/${settings.whatsapp}`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 bg-brand-500 hover:bg-brand-600 text-white text-sm font-semibold px-7 py-3.5 rounded-full transition-all duration-300 shadow-sm hover:shadow-md inline-flex"
            >
              <MessageCircle size={15} />
              Chat on WhatsApp
            </a>
          </motion.div>

          {/* Right — Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="bg-gray-50 border border-gray-100 rounded-2xl p-10 flex flex-col items-center text-center h-full justify-center"
              >
                <div className="w-16 h-16 rounded-full bg-brand-50 border border-brand-100 flex items-center justify-center mb-5">
                  <CheckCircle size={32} className="text-brand-500" />
                </div>
                <h3 className="text-gray-900 text-2xl font-bold mb-3">
                  Message Sent!
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed max-w-sm mb-6">
                  Thank you for reaching out to {settings.business_name}.
                  A member of our team will get back to you within 24
                  hours.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({
                      name: "",
                      email: "",
                      phone: "",
                      interest: "",
                      message: "",
                    });
                  }}
                  className="flex items-center gap-2 border border-gray-200 hover:border-brand-500 text-gray-700 hover:text-brand-500 text-sm font-semibold px-6 py-2.5 rounded-full transition-all duration-300"
                >
                  Send Another Message
                </button>
              </motion.div>
            ) : (
              <div className="bg-gray-50 border border-gray-100 rounded-2xl p-8">
                <h3 className="text-gray-900 font-bold text-xl mb-6">
                  Send Us a Message
                </h3>

                <div className="flex flex-col gap-4">
                  {/* Name */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-gray-600 text-xs font-semibold tracking-wide">
                      Full Name{" "}
                      <span className="text-brand-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      className="bg-white border border-gray-200 rounded-xl px-4 py-3 text-gray-800 text-sm placeholder-gray-400 focus:outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100 transition-all"
                    />
                  </div>

                  {/* Email + Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-gray-600 text-xs font-semibold tracking-wide">
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john@email.com"
                        className="bg-white border border-gray-200 rounded-xl px-4 py-3 text-gray-800 text-sm placeholder-gray-400 focus:outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100 transition-all"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-gray-600 text-xs font-semibold tracking-wide">
                        Phone Number{" "}
                        <span className="text-brand-500">*</span>
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder={settings.phone}
                        className="bg-white border border-gray-200 rounded-xl px-4 py-3 text-gray-800 text-sm placeholder-gray-400 focus:outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100 transition-all"
                      />
                    </div>
                  </div>

                  {/* Interest */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-gray-600 text-xs font-semibold tracking-wide">
                      I am Interested In
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {interests.map((item) => (
                        <button
                          key={item}
                          onClick={() =>
                            setFormData({ ...formData, interest: item })
                          }
                          className={`text-xs font-semibold px-3 py-1.5 rounded-full border transition-all duration-200 ${
                            formData.interest === item
                              ? "bg-brand-500 border-brand-500 text-white"
                              : "border-gray-200 text-gray-600 hover:border-brand-400 hover:text-brand-500"
                          }`}
                        >
                          {item}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Message */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-gray-600 text-xs font-semibold tracking-wide">
                      Message{" "}
                      <span className="text-brand-500">*</span>
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={4}
                      placeholder="Tell us what you are looking for or ask us anything..."
                      className="bg-white border border-gray-200 rounded-xl px-4 py-3 text-gray-800 text-sm placeholder-gray-400 focus:outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100 transition-all resize-none"
                    />
                  </div>

                  {/* Submit */}
                  <button
                    onClick={handleSubmit}
                    disabled={
                      loading ||
                      !formData.name ||
                      !formData.phone ||
                      !formData.message
                    }
                    className="flex items-center justify-center gap-2 bg-brand-500 hover:bg-brand-600 disabled:bg-brand-300 disabled:cursor-not-allowed text-white text-sm font-semibold py-3.5 rounded-xl transition-all duration-300 shadow-sm hover:shadow-md mt-1"
                  >
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <svg
                          className="animate-spin h-4 w-4 text-white"
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
                        Sending...
                      </span>
                    ) : (
                      <>
                        Send Message
                        <Send size={14} />
                      </>
                    )}
                  </button>

                  <p className="text-gray-400 text-[10px] text-center">
                    Fields marked{" "}
                    <span className="text-brand-500">*</span> are required
                  </p>
                </div>
              </div>
            )}
          </motion.div>
        </div>

        {/* Map Placeholder */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-20 bg-gray-50 border border-gray-100 rounded-2xl overflow-hidden"
        >
          <div className="px-6 py-5 border-b border-gray-100">
            <h3 className="text-gray-900 font-bold text-lg">Find Us</h3>
            <p className="text-gray-400 text-xs mt-0.5">
              {settings.address}
            </p>
          </div>
          <div className="h-72 bg-gray-100 flex items-center justify-center">
            <div className="text-center">
              <MapPin size={32} className="text-brand-500 mx-auto mb-3" />
              <p className="text-gray-500 text-sm font-semibold">
                Google Maps will be embedded here
              </p>
              <p className="text-gray-400 text-xs mt-1">
                {settings.address}
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
};

export default ContactPage;