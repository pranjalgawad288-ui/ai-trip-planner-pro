import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Footer from "../components/Footer";
import FeatureCard from "../components/FeatureCard";
import DestinationCard from "../components/DestinationCard";
import { features, destinations } from "../data/sampleData";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <section className="px-6 md:px-14 py-24 bg-white dark:bg-slate-900/40">
        <div className="text-center max-w-xl mx-auto mb-14">
          <h2 className="text-3xl font-bold font-poppins mb-3">Everything you need to travel smarter</h2>
          <p className="text-slate-500 dark:text-slate-400">From AI planning to budget tracking, all in one premium dashboard.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {features.map((f) => <FeatureCard key={f.id} {...f} />)}
        </div>
      </section>
      <section className="px-6 md:px-14 py-24">
        <div className="text-center max-w-xl mx-auto mb-14">
          <h2 className="text-3xl font-bold font-poppins mb-3">Trending destinations</h2>
          <p className="text-slate-500 dark:text-slate-400">Popular picks from travelers using AI Trip Planner Pro this month.</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 max-w-6xl mx-auto">
          {destinations.map((d) => <DestinationCard key={d.id} {...d} />)}
        </div>
      </section>
      <Footer />
    </div>
  );
}
