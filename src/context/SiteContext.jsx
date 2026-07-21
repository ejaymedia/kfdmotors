import { createContext, useContext, useState, useEffect } from "react";
import { fetchSiteSettings } from "../supabaseService";

const SiteContext = createContext();

export const useSite = () => {
  return useContext(SiteContext);
};

const defaultSettings = {
  business_name: "Demo Motors",
  tagline: "Drive the Car of Your Dreams.",
  primary_color: "#2563eb",
  phone: "+234 800 000 0000",
  whatsapp: "2348000000000",
  email: "info@demomotors.com",
  address: "Victoria Island, Lagos, Nigeria",
  instagram: "#",
  facebook: "#",
  tiktok: "#",
  logo_url: "",
  hero_url: "",
  site_title: "Demo Motors | Premium Vehicle Sales & Imports in Nigeria",
  favicon_url: "",
  og_image_url: "",
};

const hexToRgb = (hex) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : { r: 37, g: 99, b: 235 };
};

const generateShades = (hex) => {
  const { r, g, b } = hexToRgb(hex);

  const mix = (factor) => {
    const mixed_r = Math.round(r + (255 - r) * factor);
    const mixed_g = Math.round(g + (255 - g) * factor);
    const mixed_b = Math.round(b + (255 - b) * factor);
    return `rgb(${mixed_r}, ${mixed_g}, ${mixed_b})`;
  };

  const darken = (factor) => {
    const dark_r = Math.round(r * (1 - factor));
    const dark_g = Math.round(g * (1 - factor));
    const dark_b = Math.round(b * (1 - factor));
    return `rgb(${dark_r}, ${dark_g}, ${dark_b})`;
  };

  return {
    50: mix(0.93),
    100: mix(0.82),
    200: mix(0.65),
    300: mix(0.45),
    400: mix(0.2),
    500: hex,
    600: darken(0.15),
    700: darken(0.3),
    800: darken(0.45),
    900: darken(0.6),
  };
};

const applyBrandColors = (primaryColor) => {
  const shades = generateShades(primaryColor);
  const root = document.documentElement;
  root.style.setProperty("--color-brand-50", shades[50]);
  root.style.setProperty("--color-brand-100", shades[100]);
  root.style.setProperty("--color-brand-200", shades[200]);
  root.style.setProperty("--color-brand-300", shades[300]);
  root.style.setProperty("--color-brand-400", shades[400]);
  root.style.setProperty("--color-brand-500", shades[500]);
  root.style.setProperty("--color-brand-600", shades[600]);
  root.style.setProperty("--color-brand-700", shades[700]);
  root.style.setProperty("--color-brand-800", shades[800]);
  root.style.setProperty("--color-brand-900", shades[900]);
};

const applyMetaTags = (settings) => {
  // Title
  const title = settings.site_title || defaultSettings.site_title;
  document.title = title;

  // Favicon
  const setOrCreateTag = (selector, attrs) => {
    let el = document.querySelector(selector);
    if (!el) {
      el = document.createElement("link");
      document.head.appendChild(el);
    }
    Object.entries(attrs).forEach(([k, v]) => el.setAttribute(k, v));
  };

  if (settings.favicon_url) {
    setOrCreateTag("link[rel='icon']", {
      rel: "icon",
      type: "image/png",
      href: settings.favicon_url,
    });
    setOrCreateTag("link[rel='apple-touch-icon']", {
      rel: "apple-touch-icon",
      href: settings.favicon_url,
    });
  }

  // OG / Meta tags
  const setMeta = (property, content, isName = false) => {
    const attr = isName ? "name" : "property";
    let el = document.querySelector(`meta[${attr}="${property}"]`);
    if (!el) {
      el = document.createElement("meta");
      el.setAttribute(attr, property);
      document.head.appendChild(el);
    }
    el.setAttribute("content", content);
  };

  setMeta("description", `${settings.business_name} — Nigeria's trusted destination for premium vehicle sales, direct imports, and documentation.`, true);

  setMeta("og:title", title);
  setMeta("og:site_name", settings.business_name);
  setMeta("og:description", `${settings.business_name} — Nigeria's trusted destination for premium vehicle sales, direct imports, and documentation.`);
  setMeta("og:type", "website");

  if (settings.og_image_url) {
    setMeta("og:image", settings.og_image_url);
    setMeta("twitter:image", settings.og_image_url);
  }

  setMeta("twitter:card", "summary_large_image", true);
  setMeta("twitter:title", title, true);
  setMeta("twitter:description", `${settings.business_name} — Nigeria's trusted destination for premium vehicle sales, direct imports, and documentation.`, true);
};

export const SiteProvider = ({ children }) => {
  const [settings, setSettings] = useState(defaultSettings);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSettings = async () => {
      const data = await fetchSiteSettings();
      if (data) {
        setSettings(data);
        applyBrandColors(data.primary_color || "#2563eb");
        applyMetaTags(data);
      } else {
        applyBrandColors(defaultSettings.primary_color);
        applyMetaTags(defaultSettings);
      }
      setLoading(false);
    };
    loadSettings();
  }, []);

  const refreshSettings = async () => {
    const data = await fetchSiteSettings();
    if (data) {
      setSettings(data);
      applyBrandColors(data.primary_color || "#2563eb");
      applyMetaTags(data);
    }
  };

  const value = {
    settings,
    loading,
    refreshSettings,
  };

  return (
    <SiteContext.Provider value={value}>
      {!loading && children}
    </SiteContext.Provider>
  );
};

export default SiteProvider;