import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiMapPin, FiCalendar, FiUsers, FiHeart, FiTrash2 } from "react-icons/fi";

export default function TripCard({ trip, onDelete, onToggleFavorite }) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="rounded-2xl overflow-hidden bg-white dark:bg-white/5 border border-slate-900/5 dark:border-white/10 shadow-sm hover:shadow-lg transition-shadow"
    >
      <div className="relative h-40">
        <img src={trip.image_url || "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400"} alt={trip.destination} className="w-full h-full object-cover" />
        <button
          onClick={() => onToggleFavorite(trip)}
          aria-label="Toggle favorite"
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 flex items-center justify-center"
        >
          <FiHeart className={trip.is_favorite ? "fill-danger text-danger" : "text-slate-600"} size={14} />
        </button>
      </div>
      <div className="p-5">
        <h3 className="font-poppins font-semibold text-lg mb-2 flex items-center gap-2">
          <FiMapPin className="text-primary" /> {trip.destination}
        </h3>
        <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400 mb-4">
          <span className="flex items-center gap-1"><FiCalendar /> {trip.duration} days</span>
          <span className="flex items-center gap-1"><FiUsers /> {trip.travelers} travelers</span>
        </div>
        <div className="flex items-center justify-between">
          <Link to={`/trips/${trip.id}`} className="text-sm font-semibold text-primary hover:underline">
            View details
          </Link>
          <div className="flex gap-2">
            <Link to={`/trips/${trip.id}/edit`} className="text-xs px-3 py-1.5 rounded-full border border-slate-200 dark:border-slate-700 hover:bg-black/5 dark:hover:bg-white/5">
              Edit
            </Link>
            <button
              onClick={() => onDelete(trip.id)}
              aria-label="Delete trip"
              className="text-xs px-2.5 py-1.5 rounded-full border border-danger/30 text-danger hover:bg-danger/10"
            >
              <FiTrash2 size={13} />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
