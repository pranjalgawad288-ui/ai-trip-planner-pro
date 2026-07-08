import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";
import {
  getTrips,
  deleteTrip,
  toggleFavoriteTrip,
} from "../services/tripService";

export function useTrips(options = {}) {
  const { user } = useAuth();
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTrips = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    try {
      const data = await getTrips(user.id, options);
      setTrips(data);
    } catch (err) {
      toast.error("Could not load trips. " + err.message);
    } finally {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, JSON.stringify(options)]);

  useEffect(() => {
    fetchTrips();
  }, [fetchTrips]);

  const handleDelete = async (id) => {
    try {
      await deleteTrip(id);
      setTrips((prev) => prev.filter((t) => t.id !== id));
      toast.success("Trip deleted");
    } catch (err) {
      toast.error("Delete failed. " + err.message);
    }
  };

  const handleToggleFavorite = async (trip) => {
    try {
      const updated = await toggleFavoriteTrip(trip.id, trip.is_favorite);
      setTrips((prev) => prev.map((t) => (t.id === trip.id ? updated : t)));
    } catch (err) {
      toast.error("Could not update favorite. " + err.message);
    }
  };

  return { trips, loading, refetch: fetchTrips, handleDelete, handleToggleFavorite };
}
