import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FiSun, FiMoon } from "react-icons/fi";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { isDark, toggleTheme } = useTheme();
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="sticky top-0 z-50 flex items-center justify-between px-6 md:px-14 py-4 glass"
    >
      <Link to="/" className="text-xl font-bold font-poppins flex items-center gap-2">
        <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          TripPlanner Pro
        </span>
      </Link>

      <div className="hidden md:flex gap-8 text-sm font-medium text-slate-600 dark:text-slate-300">
        <Link to="/" className="hover:text-primary transition-colors">Home</Link>
        <Link to="/trips" className="hover:text-primary transition-colors">My trips</Link>
        <Link to="/ai-planner" className="hover:text-primary transition-colors">AI planner</Link>
        <Link to="/budget-calculator" className="hover:text-primary transition-colors">Budget</Link>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={toggleTheme}
          aria-label="Toggle dark mode"
          className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
        >
          {isDark ? <FiSun size={18} /> : <FiMoon size={18} />}
        </button>

        {user ? (
          <>
            <Link
              to="/dashboard"
              className="px-5 py-2 rounded-full text-sm font-semibold text-slate-700 dark:text-slate-200 hover:text-primary transition-colors"
            >
              Dashboard
            </Link>
            <button onClick={handleLogout} className="btn-primary !py-2 !px-5 text-sm">
              Log out
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="px-5 py-2 rounded-full text-sm font-semibold text-slate-700 dark:text-slate-200 hover:text-primary transition-colors"
            >
              Log in
            </Link>
            <Link to="/signup" className="btn-primary !py-2 !px-5 text-sm">
              Sign up free
            </Link>
          </>
        )}
      </div>
    </motion.nav>
  );
}
