import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import Logo from "../assets/logo/Logo.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const getActive = () => {
    const path = location.pathname;
    if (path.includes("inventory")) return "inventory";
    if (path.includes("about")) return "about";
    if (path.includes("contact")) return "contact";
    if (path.includes("faq")) return "faq";
    return "home";
  };

  const active = getActive();

  const handleSectionScroll = (sectionId) => {
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 400);
    } else {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
    setIsOpen(false);
  };

  const goTo = (path) => {
    navigate(path);
    window.scrollTo({ top: 0, behavior: "smooth" });
    setIsOpen(false);
  };

  const navLink = (id) =>
    `relative text-sm font-medium tracking-wide transition-all duration-200 pb-1 cursor-pointer ${
      active === id
        ? "text-blue-600 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-blue-600 after:rounded-full"
        : "text-gray-700 hover:text-blue-600"
    }`;

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white shadow-md border-b border-gray-100"
          : "bg-white/90 backdrop-blur-md"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* Logo */}
          <button
            onClick={() => goTo("/")}
            className="flex items-center"
          >
            <img
              src={Logo}
              alt="Kafadona Motors"
              className="h-10 w-auto object-contain"
            />
          </button>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            <button onClick={() => goTo("/")} className={navLink("home")}>
              Home
            </button>
            <button
              onClick={() => goTo("/inventory")}
              className={navLink("inventory")}
            >
              Inventory
            </button>
            <button
              onClick={() => handleSectionScroll("services")}
              className={navLink("services")}
            >
              Services
            </button>
            <button
              onClick={() => goTo("/faq")}
              className={navLink("faq")}
            >
              FAQ
            </button>
            <button
              onClick={() => goTo("/about")}
              className={navLink("about")}
            >
              About
            </button>
            <button
              onClick={() => goTo("/contact")}
              className={navLink("contact")}
            >
              Contact
            </button>
          </div>

          {/* CTA + Mobile Toggle */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => goTo("/inventory")}
              className="hidden md:inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-all duration-300 shadow-sm hover:shadow-md"
            >
              Browse Cars
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden text-gray-700 hover:text-blue-600 transition-colors p-1"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out bg-white border-t border-gray-100 ${
          isOpen ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="flex flex-col px-6 py-5 gap-5">
          <button
            onClick={() => goTo("/")}
            className={navLink("home") + " text-left"}
          >
            Home
          </button>
          <button
            onClick={() => goTo("/inventory")}
            className={navLink("inventory") + " text-left"}
          >
            Inventory
          </button>
          <button
            onClick={() => handleSectionScroll("services")}
            className={navLink("services") + " text-left"}
          >
            Services
          </button>
          <button
            onClick={() => goTo("/faq")}
            className={navLink("faq") + " text-left"}
          >
            FAQ
          </button>
          <button
            onClick={() => goTo("/about")}
            className={navLink("about") + " text-left"}
          >
            About
          </button>
          <button
            onClick={() => goTo("/contact")}
            className={navLink("contact") + " text-left"}
          >
            Contact
          </button>
          <button
            onClick={() => goTo("/inventory")}
            className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-all duration-300 text-center"
          >
            Browse Cars
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;