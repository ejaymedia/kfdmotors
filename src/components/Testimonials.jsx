import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, Star } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Chukwuemeka Obi",
    role: "Business Executive, Lagos",
    message:
      "Kafadona Motors made the entire process seamless. I ordered a Mercedes GLE from the UK and it was delivered to my house fully cleared and registered in under 6 weeks. Absolutely world class service.",
    rating: 5,
    initials: "CO",
  },
  {
    id: 2,
    name: "Amina Bello",
    role: "Entrepreneur, Abuja",
    message:
      "I was skeptical about importing a car at first but the Kafadona team walked me through every step. My Lexus LX 600 arrived in perfect condition with all documents intact. I will definitely be coming back.",
    rating: 5,
    initials: "AB",
  },
  {
    id: 3,
    name: "Tunde Fashola",
    role: "Engineer, Port Harcourt",
    message:
      "Best car buying experience I have ever had in Nigeria. Transparent pricing, no hidden charges, and the after-sales support is genuinely excellent. Kafadona Motors is the real deal.",
    rating: 5,
    initials: "TF",
  },
  {
    id: 4,
    name: "Ngozi Adeyemi",
    role: "Medical Doctor, Ibadan",
    message:
      "I bought a Toyota Land Cruiser V8 through Kafadona Motors and the whole process took just 5 weeks. The vehicle was exactly as described and the team was professional throughout. Highly recommended.",
    rating: 5,
    initials: "NA",
  },
  {
    id: 5,
    name: "Emeka Nwosu",
    role: "Real Estate Developer, Lagos",
    message:
      "Three cars purchased through Kafadona Motors and every single experience has been flawless. They are my go-to for all premium vehicle needs. The trust they have built is unmatched.",
    rating: 5,
    initials: "EN",
  },
];

const Testimonials = () => {
  const [current, setCurrent] = useState(0);
  const intervalRef = useRef(null);

  const startAutoSlide = () => {
    intervalRef.current = setInterval(() => {
      setCurrent((prev) =>
        prev === testimonials.length - 1 ? 0 : prev + 1
      );
    }, 4000);
  };

  const stopAutoSlide = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  useEffect(() => {
    startAutoSlide();
    return () => stopAutoSlide();
  }, []);

  const goTo = (index) => {
    stopAutoSlide();
    setCurrent(index);
    startAutoSlide();
  };

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
            Client Stories
          </span>
          <div className="w-12 h-0.5 bg-blue-600 rounded-full mx-auto my-3" />
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            What Our Clients Say
          </h2>
          <p className="text-gray-500 text-sm mt-3 max-w-xl mx-auto leading-relaxed">
            Do not just take our word for it. Here is what real clients
            across Nigeria have to say about their Kafadona Motors
            experience.
          </p>
        </motion.div>

        {/* Carousel */}
        <div className="max-w-3xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="bg-white border border-gray-100 rounded-2xl p-8 md:p-10 relative shadow-sm"
            >
              {/* Quote Icon */}
              <div className="absolute top-6 right-8 opacity-5">
                <Quote size={80} className="text-blue-600" />
              </div>

              {/* Stars */}
              <div className="flex items-center gap-1 mb-6">
                {Array.from({ length: testimonials[current].rating }).map(
                  (_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className="text-blue-600 fill-blue-600"
                    />
                  )
                )}
              </div>

              {/* Message */}
              <p className="text-gray-700 text-base md:text-lg leading-relaxed mb-8 italic">
                "{testimonials[current].message}"
              </p>

              {/* Client Info */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center shrink-0">
                  <span className="text-white font-bold text-sm">
                    {testimonials[current].initials}
                  </span>
                </div>
                <div>
                  <p className="text-gray-900 font-bold text-sm">
                    {testimonials[current].name}
                  </p>
                  <p className="text-gray-400 text-xs mt-0.5">
                    {testimonials[current].role}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Dot Indicators */}
          <div className="flex items-center justify-center gap-2 mt-8">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={`transition-all duration-300 rounded-full ${
                  i === current
                    ? "w-6 h-2 bg-blue-600"
                    : "w-2 h-2 bg-gray-300 hover:bg-blue-300"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;