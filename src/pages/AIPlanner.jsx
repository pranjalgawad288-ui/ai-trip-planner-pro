import { useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { FiCpu, FiSave } from "react-icons/fi";
import Navbar from "../components/Navbar";
import Loader from "../components/Loader";
import { generateItinerary } from "../services/aiService";
import { createTrip } from "../services/tripService";
import { useAuth } from "../context/AuthContext";
import { TRAVEL_STYLES, TRANSPORT_MODES } from "../utils/constants";
import { formatCurrency } from "../utils/formatters";

export default function AIPlanner() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { state } = useLocation();
  const [itinerary, setItinerary] = useState(null);
  const [generating, setGenerating] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      destination: state?.destination || "",
      duration: 5,
      budget: state?.budget || "",
      travelers: state?.travelers || 2,
      travelStyle: "Family",
      transport: "Flight",
    },
  });

  const onGenerate = async (formData) => {
    setGenerating(true);
    setItinerary(null);
    try {
      const result = await generateItinerary(formData);
      setItinerary({ ...result, formData });
    } catch (err) {
      toast.error("AI generation failed. Check your API key and try again.");
    } finally {
      setGenerating(false);
    }
  };

  const handleSaveTrip = async () => {
    try {
      const trip = await createTrip({
        user_id: user.id,
        destination: itinerary.formData.destination,
        duration: Number(itinerary.formData.duration),
        travelers: Number(itinerary.formData.travelers),
        budget: Number(itinerary.formData.budget) || itinerary.estimatedTotalCost,
        travel_style: itinerary.formData.travelStyle,
        transport: itinerary.formData.transport,
        ai_itinerary: itinerary,
      });
      toast.success("Trip saved to your dashboard!");
      navigate(`/trips/${trip.id}`);
    } catch (err) {
      toast.error("Could not save trip. " + err.message);
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="px-6 md:px-14 py-10 max-w-5xl mx-auto">
        <h1 className="text-2xl font-bold font-poppins mb-2 flex items-center gap-2">
          <FiCpu className="text-primary" /> AI trip planner
        </h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm mb-8">
          Fill in your trip details and let AI build your full itinerary.
        </p>

        <form
          onSubmit={handleSubmit(onGenerate)}
          className="glass rounded-3xl p-6 grid grid-cols-1 md:grid-cols-3 gap-4 mb-10"
        >
          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-1">Destination</label>
            <input className="input-field" {...register("destination", { required: true })} />
            {errors.destination && <p className="text-danger text-xs mt-1">Destination is required</p>}
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-1">Duration (days)</label>
            <input type="number" min="1" className="input-field" {...register("duration", { required: true, min: 1 })} />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-1">Travelers</label>
            <input type="number" min="1" className="input-field" {...register("travelers", { required: true, min: 1 })} />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-1">Budget ($)</label>
            <input type="number" min="0" className="input-field" {...register("budget", { required: true, min: 0 })} />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-1">Travel style</label>
            <select className="input-field" {...register("travelStyle")}>
              {TRAVEL_STYLES.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-1">Transport</label>
            <select className="input-field" {...register("transport")}>
              {TRANSPORT_MODES.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
          <div className="md:col-span-3">
            <button type="submit" disabled={generating} className="btn-primary w-full">
              {generating ? "Generating your itinerary..." : "Generate AI itinerary"}
            </button>
          </div>
        </form>

        {generating && <Loader />}

        {itinerary && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="rounded-2xl p-6 bg-white dark:bg-white/5 border border-slate-900/5 dark:border-white/10 flex items-center justify-between flex-wrap gap-4">
              <div>
                <h3 className="font-poppins font-semibold text-lg mb-1">Trip summary</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">{itinerary.summary}</p>
                <p className="text-sm font-semibold text-primary mt-2">
                  Estimated total: {formatCurrency(itinerary.estimatedTotalCost)}
                </p>
              </div>
              <button onClick={handleSaveTrip} className="btn-primary flex items-center gap-2">
                <FiSave /> Save trip
              </button>
            </div>

            {itinerary.days?.map((day) => (
              <div key={day.day} className="rounded-2xl p-6 bg-white dark:bg-white/5 border border-slate-900/5 dark:border-white/10">
                <h4 className="font-poppins font-semibold mb-2">Day {day.day}: {day.title}</h4>
                <ul className="list-disc list-inside text-sm text-slate-600 dark:text-slate-300 space-y-1 mb-3">
                  {day.activities?.map((a, i) => <li key={i}>{a}</li>)}
                </ul>
                <div className="text-xs text-slate-500 flex flex-wrap gap-4">
                  <span>Hotel: {day.hotel}</span>
                  <span>Restaurants: {day.restaurants?.join(", ")}</span>
                  <span>Est. cost: {formatCurrency(day.estimatedCost)}</span>
                </div>
              </div>
            ))}

            <div className="rounded-2xl p-6 bg-white dark:bg-white/5 border border-slate-900/5 dark:border-white/10">
              <h4 className="font-poppins font-semibold mb-2">Packing checklist</h4>
              <ul className="list-disc list-inside text-sm text-slate-600 dark:text-slate-300">
                {itinerary.packingChecklist?.map((item, i) => <li key={i}>{item}</li>)}
              </ul>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
