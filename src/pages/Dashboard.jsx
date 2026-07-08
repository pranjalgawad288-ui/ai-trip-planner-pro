import { Link } from "react-router-dom";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from "chart.js";
import { Bar } from "react-chartjs-2";
import { FiMapPin, FiDollarSign, FiHeart, FiPlus } from "react-icons/fi";
import Navbar from "../components/Navbar";
import Loader from "../components/Loader";
import TripCard from "../components/TripCard";
import { useTrips } from "../hooks/useTrips";
import { useAuth } from "../context/AuthContext";
import { formatCurrency } from "../utils/formatters";

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

export default function Dashboard() {
  const { user } = useAuth();
  const { trips, loading, handleDelete, handleToggleFavorite } = useTrips({ sortBy: "created_at" });

  const totalBudget = trips.reduce((sum, t) => sum + (t.budget || 0), 0);
  const favoriteCount = trips.filter((t) => t.is_favorite).length;

  const chartData = {
    labels: trips.slice(0, 6).map((t) => t.destination),
    datasets: [
      {
        label: "Budget ($)",
        data: trips.slice(0, 6).map((t) => t.budget || 0),
        backgroundColor: "#2563EB",
        borderRadius: 8,
      },
    ],
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="px-6 md:px-14 py-10">
        <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
          <div>
            <h1 className="text-2xl font-bold font-poppins">
              Welcome back, {user?.user_metadata?.full_name || "traveler"}
            </h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm">Here's an overview of your trips.</p>
          </div>
          <Link to="/trips/create" className="btn-primary flex items-center gap-2">
            <FiPlus /> Create trip
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
          <div className="rounded-2xl p-6 bg-white dark:bg-white/5 border border-slate-900/5 dark:border-white/10">
            <div className="flex items-center gap-3 text-primary mb-2">
              <FiMapPin /> <span className="text-sm font-semibold text-slate-500">Total trips</span>
            </div>
            <p className="text-3xl font-bold font-poppins">{trips.length}</p>
          </div>
          <div className="rounded-2xl p-6 bg-white dark:bg-white/5 border border-slate-900/5 dark:border-white/10">
            <div className="flex items-center gap-3 text-accent mb-2">
              <FiDollarSign /> <span className="text-sm font-semibold text-slate-500">Total budget</span>
            </div>
            <p className="text-3xl font-bold font-poppins">{formatCurrency(totalBudget)}</p>
          </div>
          <div className="rounded-2xl p-6 bg-white dark:bg-white/5 border border-slate-900/5 dark:border-white/10">
            <div className="flex items-center gap-3 text-danger mb-2">
              <FiHeart /> <span className="text-sm font-semibold text-slate-500">Favorites</span>
            </div>
            <p className="text-3xl font-bold font-poppins">{favoriteCount}</p>
          </div>
        </div>

        {trips.length > 0 && (
          <div className="rounded-2xl p-6 bg-white dark:bg-white/5 border border-slate-900/5 dark:border-white/10 mb-10">
            <h3 className="font-poppins font-semibold mb-4">Budget by destination</h3>
            <div className="h-64">
              <Bar data={chartData} options={{ maintainAspectRatio: false, responsive: true }} />
            </div>
          </div>
        )}

        <h3 className="font-poppins font-semibold text-lg mb-4">Your trips</h3>
        {loading ? (
          <Loader />
        ) : trips.length === 0 ? (
          <div className="text-center py-16 text-slate-500">
            No trips yet. <Link to="/trips/create" className="text-primary font-semibold">Create your first trip</Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {trips.map((trip) => (
              <TripCard key={trip.id} trip={trip} onDelete={handleDelete} onToggleFavorite={handleToggleFavorite} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
