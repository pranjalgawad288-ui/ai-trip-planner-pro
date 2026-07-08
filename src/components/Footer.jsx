import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-bgDark text-slate-400 text-center md:text-left px-6 md:px-14 py-12">
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
        <div className="col-span-2 md:col-span-1">
          <h4 className="text-white font-poppins font-semibold mb-3">TripPlanner Pro</h4>
          <p className="text-sm">AI-powered trip planning for modern travelers.</p>
        </div>
        <div>
          <h5 className="text-white text-sm font-semibold mb-3">Product</h5>
          <ul className="space-y-2 text-sm">
            <li><Link to="/ai-planner" className="hover:text-white transition-colors">AI planner</Link></li>
            <li><Link to="/budget-calculator" className="hover:text-white transition-colors">Budget calculator</Link></li>
          </ul>
        </div>
        <div>
          <h5 className="text-white text-sm font-semibold mb-3">Account</h5>
          <ul className="space-y-2 text-sm">
            <li><Link to="/login" className="hover:text-white transition-colors">Log in</Link></li>
            <li><Link to="/signup" className="hover:text-white transition-colors">Sign up</Link></li>
          </ul>
        </div>
        <div>
          <h5 className="text-white text-sm font-semibold mb-3">Legal</h5>
          <ul className="space-y-2 text-sm">
            <li><Link to="/privacy" className="hover:text-white transition-colors">Privacy</Link></li>
            <li><Link to="/terms" className="hover:text-white transition-colors">Terms</Link></li>
          </ul>
        </div>
      </div>
      <div className="max-w-6xl mx-auto mt-10 pt-6 border-t border-white/10 text-xs text-center">
        © {new Date().getFullYear()} AI Trip Planner Pro. Built as a final-year major project.
      </div>
    </footer>
  );
}
