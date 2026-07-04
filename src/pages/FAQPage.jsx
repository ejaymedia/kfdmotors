import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, MessageCircle, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useSite } from "../context/SiteContext";

const FAQPage = () => {
  const navigate = useNavigate();
  const { settings } = useSite();
  const [openItem, setOpenItem] = useState(null);
  const [activeCategory, setActiveCategory] = useState("All");

  const faqCategories = [
    {
      category: "Buying a Car",
      faqs: [
        {
          question: `How do I purchase a car from ${settings.business_name}?`,
          answer: `Simply browse our inventory online or visit our showroom at ${settings.address}. Once you find a vehicle you like, contact us via phone or WhatsApp and our sales team will guide you through the purchase process from start to finish.`,
        },
        {
          question: "Do you sell both new and used vehicles?",
          answer:
            "Yes. We stock both brand new and fairly used premium vehicles. All used vehicles are thoroughly inspected and verified before being listed. Each listing clearly states the condition of the vehicle.",
        },
        {
          question: "Can I inspect the car before buying?",
          answer: `Absolutely. We encourage all buyers to inspect vehicles in person at our showroom at ${settings.address}. You can also request a video inspection if you are purchasing from outside the area.`,
        },
        {
          question: "What payment methods do you accept?",
          answer:
            "We accept bank transfers, cash payments, and financing arrangements. Full payment is required before vehicle release unless you are on one of our approved financing plans.",
        },
      ],
    },
    {
      category: "Vehicle Importation",
      faqs: [
        {
          question: "Can you import a specific car I want?",
          answer: `Yes. If you have a specific vehicle in mind that is not in our current inventory, we can source and import it for you. Simply contact ${settings.business_name} with the make, model, year, and any specific requirements and we will handle the rest.`,
        },
        {
          question: "Which countries do you import from?",
          answer:
            "We source vehicles from the United Kingdom, United States, United Arab Emirates, Japan, China, and several other countries depending on the vehicle type and your budget.",
        },
        {
          question: "How long does the importation process take?",
          answer:
            "The typical importation timeline is 4 to 8 weeks from the date of order confirmation and deposit payment. This includes sourcing, shipping, customs clearance, and delivery to you.",
        },
        {
          question: "What is the deposit required to place an import order?",
          answer:
            "We require a minimum deposit of 30% of the agreed vehicle price to begin the importation process. The balance is due before the vehicle is released to you.",
        },
      ],
    },
    {
      category: "Documentation & Clearance",
      faqs: [
        {
          question: "Do you handle customs clearance?",
          answer:
            "Yes. We handle the entire customs clearance process on your behalf. This includes duty payment, NAFDAC clearance where applicable, and all relevant documentation required by Nigerian customs.",
        },
        {
          question: "Will the car come with full Nigerian documentation?",
          answer:
            "Yes. Every vehicle we sell comes with complete Nigerian documentation including customs papers, proof of ownership, and we assist with vehicle registration at the relevant licensing office.",
        },
        {
          question: "Are there any hidden charges?",
          answer: `No. ${settings.business_name} believes in full transparency. All charges including shipping, duty, clearance fees, and our service charge are communicated upfront before you commit to a purchase.`,
        },
      ],
    },
    {
      category: "Financing",
      faqs: [
        {
          question: "Do you offer financing or payment plans?",
          answer:
            "Yes. We offer flexible payment plans for qualified buyers. Plans range from 12 to 36 months with varying deposit requirements. Contact us directly to discuss a plan that suits your financial situation.",
        },
        {
          question: "Who is eligible for a financing plan?",
          answer:
            "Any Nigerian resident with a verifiable source of income is eligible to apply. This includes salary earners, business owners, and self-employed individuals. We review each application individually.",
        },
        {
          question: "Can I pay off my balance early?",
          answer:
            "Yes. All our financing arrangements allow early repayment with zero penalty. You can pay off part or all of your outstanding balance at any time.",
        },
      ],
    },
    {
      category: "After-Sales Support",
      faqs: [
        {
          question: "What after-sales support do you provide?",
          answer: `${settings.business_name} provides ongoing support after your purchase including servicing referrals, warranty assistance, spare parts sourcing guidance, and general vehicle advice. Our team is reachable via phone at ${settings.phone} and WhatsApp.`,
        },
        {
          question: "What if there is a problem with my car after delivery?",
          answer:
            "Contact us immediately. We will assess the issue and work with you to resolve it. For new vehicles, manufacturer warranty terms apply. For used vehicles, we offer a short post-delivery inspection window.",
        },
        {
          question: "Do you offer delivery outside your area?",
          answer:
            "Yes. We deliver nationwide across all 36 states of Nigeria. Delivery charges outside the local area are calculated based on location and vehicle type and will be communicated upfront.",
        },
      ],
    },
  ];

  const categories = ["All", ...faqCategories.map((c) => c.category)];

  const filteredCategories =
    activeCategory === "All"
      ? faqCategories
      : faqCategories.filter((c) => c.category === activeCategory);

  const toggleItem = (key) => {
    setOpenItem(openItem === key ? null : key);
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
              Help Center
            </span>
            <div className="w-12 h-0.5 bg-brand-500 rounded-full my-3" />
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
              Frequently Asked Questions
            </h1>
            <p className="text-gray-500 text-sm mt-3 max-w-lg leading-relaxed">
              Find answers to the most common questions about buying,
              importing, financing, and after-sales support at{" "}
              {settings.business_name}.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 lg:px-8 py-16">

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-wrap gap-2 mb-12"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(cat);
                setOpenItem(null);
              }}
              className={`text-xs font-semibold px-4 py-2 rounded-full border transition-all duration-200 ${
                activeCategory === cat
                  ? "bg-brand-500 border-brand-500 text-white"
                  : "border-gray-200 text-gray-600 hover:border-brand-400 hover:text-brand-500"
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* FAQ Categories */}
        <div className="flex flex-col gap-12">
          {filteredCategories.map((category, catIndex) => (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: catIndex * 0.1 }}
            >
              {/* Category Title */}
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                <span className="w-8 h-0.5 bg-brand-500 rounded-full" />
                {category.category}
              </h2>

              {/* FAQs */}
              <div className="flex flex-col gap-3">
                {category.faqs.map((faq, faqIndex) => {
                  const key = `${catIndex}-${faqIndex}`;
                  const isOpen = openItem === key;

                  return (
                    <div
                      key={key}
                      className={`border rounded-2xl overflow-hidden transition-all duration-300 ${
                        isOpen
                          ? "border-brand-200 shadow-sm shadow-brand-100"
                          : "border-gray-100 hover:border-gray-200"
                      }`}
                    >
                      <button
                        onClick={() => toggleItem(key)}
                        className="w-full flex items-center justify-between px-6 py-4 text-left bg-white"
                      >
                        <span
                          className={`text-sm font-semibold pr-4 leading-snug ${
                            isOpen ? "text-brand-500" : "text-gray-800"
                          }`}
                        >
                          {faq.question}
                        </span>
                        <ChevronDown
                          size={16}
                          className={`shrink-0 transition-transform duration-300 ${
                            isOpen
                              ? "rotate-180 text-brand-500"
                              : "text-gray-400"
                          }`}
                        />
                      </button>

                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <p className="px-6 pb-5 text-gray-500 text-sm leading-relaxed border-t border-gray-100 pt-4 bg-gray-50">
                              {faq.answer}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Still Have Questions CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-20 bg-brand-500 rounded-2xl p-10 text-center"
        >
          <h2 className="text-2xl font-bold text-white mb-3">
            Still Have Questions?
          </h2>
          <p className="text-brand-100 text-sm leading-relaxed max-w-md mx-auto mb-8">
            Can not find the answer you are looking for? The team at{" "}
            {settings.business_name} is available Monday to Saturday and
            would be happy to help.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => navigate("/contact")}
              className="flex items-center gap-2 bg-white text-brand-500 hover:bg-brand-50 text-sm font-bold px-7 py-3.5 rounded-full transition-all duration-300 shadow-sm"
            >
              Contact Us
              <ArrowRight size={15} />
            </button>
            <a
              href={`https://wa.me/${settings.whatsapp}`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 border border-white/40 hover:border-white text-white text-sm font-semibold px-7 py-3.5 rounded-full transition-all duration-300"
            >
              <MessageCircle size={15} />
              WhatsApp Us
            </a>
          </div>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
};

export default FAQPage;