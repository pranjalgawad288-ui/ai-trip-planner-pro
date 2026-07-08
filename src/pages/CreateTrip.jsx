import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Navbar from "../components/Navbar";
import { createTrip } from "../services/tripService";
import { useAuth } from "../context/AuthContext";
import { TRAVEL_STYLES, TRANSPORT_MODES } from "../utils/constants";

export default function CreateTrip() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();

  const onSubmit = async (data) => {
    try {
      const trip = await createTrip({
        user_id: user.id,
        destination: data.destination,
        duration: Number(data.duration),
        travelers: Number(data.travelers),
        budget: Number(data.budget),
        travel_style: data.travelStyle,
        transport: data.transport,
        notes: data.notes,
      });
      toast.success("Trip created!");
      navigate(`/trips/${trip.id}`);
    } catch (err) {
      toast.error("Could not create trip. " + err.message);
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="px-6 md:px-14 py-10 max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold font-poppins mb-8">Create a new trip</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="rounded-3xl p-6 bg-white dark:bg-white/5 border border-slate-900/5 dark:border-white/10 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-1">Destination</label>
            <input className="input-field" {...register("destination", { required: true })} />
            {errors.destination && <p className="text-danger text-xs mt-1">Required</p>}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-1">Duration (days)</label>
              <input type="number" min="1" className="input-field" {...register("duration", { required: true, min: 1 })} />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-1">Travelers</label>
              <input type="number" min="1" className="input-field" {...register("travelers", { required: true, min: 1 })} />
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-1">Budget ($)</label>
            <input type="number" min="0" className="input-field" {...register("budget", { required: true, min: 0 })} />
          </div>
          <div className="grid grid-cols-2 gap-4">
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
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-1">Notes</label>
            <textarea rows="3" className="input-field" {...register("notes")} />
          </div>
          <button type="submit" disabled={isSubmitting} className="btn-primary w-full">
            {isSubmitting ? "Creating..." : "Create trip"}
          </button>
        </form>
      </div>
    </div>
  );
}
