import { useState } from "react";
import { Link } from "react-router-dom";
import { FiPlus, FiSearch } from "react-icons/fi";
import Navbar from "../components/Navbar";
import Loader from "../components/Loader";
import TripCard from "../components/TripCard";
import { useTrips } from "../hooks/useTrips";

export default function SavedTrips() {
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("created_at");
  const { trips, loading, handleDelete, handleToggleFavorite } = useTrips({ search, sortBy });

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="px-6 md:px-14 py-10">
        <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
          <h1 className="text-2xl font-bold font-poppins">Your saved trips</h1>
          <Link to="/trips/create" className="btn-primary flex items-center gap-2">
            <FiPlus /> Create trip
          </Link>
        </div>

        <div className="flex gap-4 mb-8 flex-wrap">
          <div className="flex items-center gap-2 flex-1 min-w-[220px] bg-white dark:bg-white/5 border border-slate-900/10 dark:border-white/10 rounded-xl px-4 py-2.5">
            <FiSearch className="text-slate-400" />
            <input
              placeholder="Search by destination..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-transparent outline-none text-sm flex-1"
            />
          </div>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="input-field !w-auto"
          >
            <option value="created_at">Newest first</option>
            <option value="budget">Budget</option>
            <option value="duration">Duration</option>
          </select>
        </div>

        {loading ? (
          <Loader />
        ) : trips.length === 0 ? (
          <div className="text-center py-16 text-slate-500">No trips found.</div>
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
