import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { FiDollarSign } from "react-icons/fi";
import Navbar from "../components/Navbar";
import Loader from "../components/Loader";
import { getAIBudgetSuggestion } from "../services/aiService";
import { formatCurrency } from "../utils/formatters";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function BudgetCalculator() {
  const [breakdown, setBreakdown] = useState(null);
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    setBreakdown(null);
    try {
      const result = await getAIBudgetSuggestion(data);
      setBreakdown(result);
    } catch (err) {
      toast.error("Could not generate budget suggestion. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const chartData = breakdown && {
    labels: ["Accommodation", "Food", "Transport", "Activities", "Misc"],
    datasets: [
      {
        data: [breakdown.accommodation, breakdown.food, breakdown.transport, breakdown.activities, breakdown.misc],
        backgroundColor: ["#2563EB", "#06B6D4", "#F59E0B", "#22C55E", "#94A3B8"],
      },
    ],
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="px-6 md:px-14 py-10 max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold font-poppins mb-2 flex items-center gap-2">
          <FiDollarSign className="text-primary" /> AI budget calculator
        </h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm mb-8">
          Get an AI-suggested budget breakdown for your trip.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="glass rounded-3xl p-6 grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-1">Destination</label>
            <input className="input-field" {...register("destination", { required: true })} />
            {errors.destination && <p className="text-danger text-xs mt-1">Required</p>}
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
            <label className="block text-xs font-semibold text-slate-500 mb-1">Current budget ($)</label>
            <input type="number" min="0" className="input-field" {...register("currentBudget", { required: true, min: 0 })} />
          </div>
          <div className="md:col-span-2">
            <button type="submit" disabled={loading} className="btn-primary w-full">
              {loading ? "Calculating..." : "Get AI budget suggestion"}
            </button>
          </div>
        </form>

        {loading && <Loader />}

        {breakdown && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-2xl p-6 bg-white dark:bg-white/5 border border-slate-900/5 dark:border-white/10">
              <h3 className="font-poppins font-semibold mb-4">Suggested breakdown</h3>
              <div className="h-64">
                <Pie data={chartData} options={{ maintainAspectRatio: false }} />
              </div>
            </div>
            <div className="rounded-2xl p-6 bg-white dark:bg-white/5 border border-slate-900/5 dark:border-white/10 space-y-3">
              {["accommodation", "food", "transport", "activities", "misc"].map((key) => (
                <div key={key} className="flex justify-between text-sm capitalize">
                  <span className="text-slate-500">{key}</span>
                  <span className="font-semibold">{formatCurrency(breakdown[key])}</span>
                </div>
              ))}
              <div className="pt-3 border-t border-slate-900/10 dark:border-white/10 text-sm text-slate-600 dark:text-slate-300">
                {breakdown.advice}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
