import { motion } from "framer-motion";
import { FiHeart } from "react-icons/fi";
import { useState } from "react";

export default function DestinationCard({ name, image, price, duration }) {
  const [favorited, setFavorited] = useState(false);

  return (
    <motion.div whileHover={{ y: -4 }} className="relative rounded-2xl overflow-hidden h-56 cursor-pointer group">
      <img src={image} alt={name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/85 via-slate-900/10 to-transparent" />
      <button
        onClick={(e) => { e.stopPropagation(); setFavorited((prev) => !prev); }}
        aria-label="Save to favorites"
        className="absolute top-3 left-3 w-8 h-8 rounded-full bg-white/90 flex items-center justify-center"
      >
        <FiHeart className={favorited ? "fill-danger text-danger" : "text-slate-600"} size={14} />
      </button>
      <div className="absolute top-3 right-3 bg-white/90 text-slate-900 text-xs font-bold px-3 py-1 rounded-full">{price}</div>
      <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
        <h4 className="font-semibold text-base">{name}</h4>
        <span className="text-xs opacity-80">{duration}</span>
      </div>
    </motion.div>
  );
}
