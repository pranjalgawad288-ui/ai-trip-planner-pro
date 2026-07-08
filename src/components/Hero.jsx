import { motion } from "framer-motion";
import { FiSearch } from "react-icons/fi";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Hero() {
  const navigate = useNavigate();
  const [destination, setDestination] = useState("");
  const [dates, setDates] = useState("");
  const [travelers, setTravelers] = useState("");
  const [budget, setBudget] = useState("");

  const handleGenerate = (e) => {
    e.preventDefault();
    navigate("/ai-planner", { state: { destination, dates, travelers, budget } });
  };

  return (
    <section className="relative text-center px-6 md:px-14 pt-20 pb-32 overflow-hidden">
      <div className="absolute -top-20 -left-20 w-72 h-72 bg-primary/20 rounded-full blur-3xl" />
      <div className="absolute top-0 right-0 w-72 h-72 bg-secondary/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-72 bg-accent/10 rounded-full blur-3xl" />

      <motion.span
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="inline-block mb-6 px-5 py-2 rounded-full text-sm font-semibold bg-primary/10 text-primary"
      >
        Powered by AI itinerary generation
      </motion.span>

      <motion.h1
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="text-4xl md:text-6xl font-bold font-poppins max-w-3xl mx-auto leading-tight mb-5"
      >
        Plan your perfect trip{" "}
        <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          in seconds, not weeks
        </span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-lg text-slate-500 dark:text-slate-400 max-w-xl mx-auto mb-9"
      >
        Tell us where you want to go — our AI builds your full itinerary, budget, hotels, and daily schedule instantly.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="flex flex-wrap justify-center gap-4 mb-16"
      >
        <button
          onClick={() => navigate("/ai-planner")}
          className="btn-primary"
        >
          Start planning free
        </button>
        <button className="px-8 py-4 rounded-full font-semibold border border-slate-300 dark:border-slate-700 hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
          Watch demo
        </button>
      </motion.div>

      <motion.form
        onSubmit={handleGenerate}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="glass max-w-4xl mx-auto rounded-3xl p-5 flex flex-wrap gap-3 items-center"
      >
        <div className="flex-1 min-w-[140px] text-left px-2">
          <label className="block text-xs font-semibold text-slate-500 mb-1">Destination</label>
          <input value={destination} onChange={(e) => setDestination(e.target.value)} placeholder="Where to?" className="w-full bg-transparent outline-none text-sm font-medium" />
        </div>
        <div className="flex-1 min-w-[140px] text-left px-2 border-l border-slate-900/10 dark:border-white/10">
          <label className="block text-xs font-semibold text-slate-500 mb-1">Dates</label>
          <input value={dates} onChange={(e) => setDates(e.target.value)} placeholder="Add dates" className="w-full bg-transparent outline-none text-sm font-medium" />
        </div>
        <div className="flex-1 min-w-[140px] text-left px-2 border-l border-slate-900/10 dark:border-white/10">
          <label className="block text-xs font-semibold text-slate-500 mb-1">Travelers</label>
          <input value={travelers} onChange={(e) => setTravelers(e.target.value)} placeholder="Add travelers" className="w-full bg-transparent outline-none text-sm font-medium" />
        </div>
        <div className="flex-1 min-w-[140px] text-left px-2 border-l border-slate-900/10 dark:border-white/10">
          <label className="block text-xs font-semibold text-slate-500 mb-1">Budget</label>
          <input value={budget} onChange={(e) => setBudget(e.target.value)} placeholder="Set budget" className="w-full bg-transparent outline-none text-sm font-medium" />
        </div>
        <button type="submit" className="flex items-center gap-2 px-7 py-3 rounded-2xl font-semibold text-white bg-gradient-to-r from-primary to-secondary">
          <FiSearch /> Generate trip
        </button>
      </motion.form>
    </section>
  );
}
