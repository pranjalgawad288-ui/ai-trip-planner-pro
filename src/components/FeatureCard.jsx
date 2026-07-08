import { motion } from "framer-motion";

export default function FeatureCard({ icon: Icon, title, description, gradient }) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25 }}
      className="rounded-2xl p-8 bg-slate-50 dark:bg-white/5 border border-slate-900/5 dark:border-white/10 hover:shadow-xl hover:shadow-slate-900/5 transition-shadow"
    >
      <div className={`w-[52px] h-[52px] rounded-2xl flex items-center justify-center text-white text-xl mb-5 bg-gradient-to-br ${gradient}`}>
        <Icon />
      </div>
      <h3 className="font-poppins font-semibold text-lg mb-2">{title}</h3>
      <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{description}</p>
    </motion.div>
  );
}
