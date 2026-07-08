import { supabase } from "./supabaseClient";

// CREATE
export const createTrip = async (trip) => {
  const { data, error } = await supabase.from("trips").insert([trip]).select().single();
  if (error) throw error;
  return data;
};

// READ (all trips for current user, with optional filters)
export const getTrips = async (userId, { search, sortBy = "created_at", ascending = false } = {}) => {
  let query = supabase.from("trips").select("*").eq("user_id", userId);

  if (search) {
    query = query.ilike("destination", `%${search}%`);
  }

  query = query.order(sortBy, { ascending });

  const { data, error } = await query;
  if (error) throw error;
  return data;
};

// READ single
export const getTripById = async (id) => {
  const { data, error } = await supabase.from("trips").select("*").eq("id", id).single();
  if (error) throw error;
  return data;
};

// UPDATE
export const updateTrip = async (id, updates) => {
  const { data, error } = await supabase.from("trips").update(updates).eq("id", id).select().single();
  if (error) throw error;
  return data;
};

// DELETE
export const deleteTrip = async (id) => {
  const { error } = await supabase.from("trips").delete().eq("id", id);
  if (error) throw error;
  return true;
};

// TOGGLE FAVORITE
export const toggleFavoriteTrip = async (id, isFavorite) => {
  return updateTrip(id, { is_favorite: !isFavorite });
};

// DUPLICATE
export const duplicateTrip = async (trip) => {
  const { id, created_at, ...rest } = trip;
  return createTrip({ ...rest, destination: `${trip.destination} (Copy)` });
};

// ARCHIVE
export const archiveTrip = async (id) => updateTrip(id, { status: "archived" });
