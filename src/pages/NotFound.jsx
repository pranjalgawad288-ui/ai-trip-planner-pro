import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-6 gradient-bg">
      <motion.h1
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-8xl font-bold font-poppins text-white mb-4"
      >
        404
      </motion.h1>
      <p className="text-white/90 mb-8">This page seems to have wandered off on its own trip.</p>
      <Link to="/" className="btn-primary !bg-white !text-primary">
        Back to home
      </Link>
    </div>
  );
}
