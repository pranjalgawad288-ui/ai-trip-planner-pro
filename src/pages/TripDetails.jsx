import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { FiMapPin, FiCalendar, FiUsers, FiDollarSign, FiEdit } from "react-icons/fi";
import Navbar from "../components/Navbar";
import Loader from "../components/Loader";
import { getTripById } from "../services/tripService";
import { formatCurrency } from "../utils/formatters";

export default function TripDetails() {
  const { id } = useParams();
  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getTripById(id)
      .then(setTrip)
      .catch(() => toast.error("Could not load trip details"))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <Loader fullScreen />;
  if (!trip) return <div className="text-center py-20">Trip not found.</div>;

  const itinerary = trip.ai_itinerary;

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="px-6 md:px-14 py-10 max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
          <div>
            <h1 className="text-2xl font-bold font-poppins flex items-center gap-2">
              <FiMapPin className="text-primary" /> {trip.destination}
            </h1>
            <div className="flex gap-4 text-sm text-slate-500 mt-2">
              <span className="flex items-center gap-1"><FiCalendar /> {trip.duration} days</span>
              <span className="flex items-center gap-1"><FiUsers /> {trip.travelers} travelers</span>
              <span className="flex items-center gap-1"><FiDollarSign /> {formatCurrency(trip.budget)}</span>
            </div>
          </div>
          <Link to={`/trips/${id}/edit`} className="btn-primary flex items-center gap-2">
            <FiEdit /> Edit trip
          </Link>
        </div>

        {trip.notes && (
          <div className="rounded-2xl p-6 bg-white dark:bg-white/5 border border-slate-900/5 dark:border-white/10 mb-6">
            <h3 className="font-poppins font-semibold mb-2">Notes</h3>
            <p className="text-sm text-slate-600 dark:text-slate-300">{trip.notes}</p>
          </div>
        )}

        {itinerary ? (
          <div className="space-y-6">
            <div className="rounded-2xl p-6 bg-white dark:bg-white/5 border border-slate-900/5 dark:border-white/10">
              <h3 className="font-poppins font-semibold mb-1">AI itinerary summary</h3>
              <p className="text-sm text-slate-600 dark:text-slate-300">{itinerary.summary}</p>
            </div>
            {itinerary.days?.map((day) => (
              <div key={day.day} className="rounded-2xl p-6 bg-white dark:bg-white/5 border border-slate-900/5 dark:border-white/10">
                <h4 className="font-poppins font-semibold mb-2">Day {day.day}: {day.title}</h4>
                <ul className="list-disc list-inside text-sm text-slate-600 dark:text-slate-300 space-y-1">
                  {day.activities?.map((a, i) => <li key={i}>{a}</li>)}
                </ul>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 text-slate-500">
            No AI itinerary generated yet for this trip.{" "}
            <Link to="/ai-planner" className="text-primary font-semibold">Generate one</Link>
          </div>
        )}
      </div>
    </div>
  );
}
