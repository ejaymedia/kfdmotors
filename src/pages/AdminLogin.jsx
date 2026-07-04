import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Lock, Eye, EyeOff, ArrowRight, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useSite } from "../context/SiteContext";

const AdminLogin = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { settings } = useSite();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleLogin = async () => {
    if (!formData.email || !formData.password) {
      setError("Please fill in all fields.");
      return;
    }
    setLoading(true);
    const result = await login(formData.email, formData.password);
    setLoading(false);
    if (result.success) {
      navigate("/admin-dashboard");
    } else {
      setError("Invalid email or password. Please try again.");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleLogin();
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        {/* Logo */}
        <div className="flex flex-col items-center mb-10">
          {settings.logo_url ? (
            <img
              src={settings.logo_url}
              alt={settings.business_name}
              className="h-14 w-auto object-contain mb-4"
            />
          ) : (
            <div className="w-14 h-14 rounded-2xl bg-brand-500 flex items-center justify-center mb-4 shadow-lg shadow-brand-100">
              <span className="text-white font-bold text-2xl">
                {settings.business_name?.[0] ?? "K"}
              </span>
            </div>
          )}
          <h1 className="text-gray-900 font-bold text-xl">
            {settings.business_name}
          </h1>
          <p className="text-brand-500 text-xs font-bold tracking-[0.3em] uppercase mt-1">
            Admin Portal
          </p>
        </div>

        {/* Card */}
        <div className="bg-white border border-gray-100 rounded-2xl p-8 shadow-sm">
          <div className="mb-6">
            <h2 className="text-gray-900 font-bold text-2xl">
              Welcome Back
            </h2>
            <p className="text-gray-400 text-sm mt-1">
              Sign in to access the {settings.business_name} dashboard
            </p>
          </div>

          <div className="flex flex-col gap-4">

            {/* Email */}
            <div className="flex flex-col gap-1.5">
              <label className="text-gray-600 text-xs font-semibold tracking-wide">
                Email Address
              </label>
              <div className="relative">
                <Mail
                  size={15}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onKeyDown={handleKeyDown}
                  placeholder={`admin@${settings.business_name?.toLowerCase().replace(/\s+/g, "")}`.slice(0, 30) + ".com"}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-10 pr-4 py-3 text-gray-800 text-sm placeholder-gray-400 focus:outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100 transition-all"
                />
              </div>
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1.5">
              <label className="text-gray-600 text-xs font-semibold tracking-wide">
                Password
              </label>
              <div className="relative">
                <Lock
                  size={15}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  onKeyDown={handleKeyDown}
                  placeholder="••••••••"
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-10 pr-11 py-3 text-gray-800 text-sm placeholder-gray-400 focus:outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100 transition-all"
                />
                <button
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2.5 bg-red-50 border border-red-100 rounded-xl px-4 py-3"
              >
                <AlertCircle size={15} className="text-red-500 shrink-0" />
                <p className="text-red-500 text-xs font-semibold">{error}</p>
              </motion.div>
            )}

            {/* Submit */}
            <button
              onClick={handleLogin}
              disabled={loading || !formData.email || !formData.password}
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
                  Signing In...
                </span>
              ) : (
                <>
                  Sign In
                  <ArrowRight size={15} />
                </>
              )}
            </button>
          </div>
        </div>

        {/* Back to site */}
        <div className="text-center mt-6">
          <button
            onClick={() => navigate("/")}
            className="text-gray-400 text-xs font-semibold hover:text-brand-500 transition-colors"
          >
            ← Back to {settings.business_name}
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminLogin;