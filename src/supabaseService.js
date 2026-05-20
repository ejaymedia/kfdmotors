import { supabase } from "./supabase";

/* ===========================
   INVENTORY
=========================== */
export const fetchInventory = async (filters = {}) => {
  if (!supabase) return [];
  try {
    let query = supabase.from("inventory").select("*");
    if (filters.make) query = query.ilike("make", `%${filters.make}%`);
    if (filters.type) query = query.eq("type", filters.type);
    if (filters.condition) query = query.eq("condition", filters.condition);
    if (filters.minPrice) query = query.gte("price", filters.minPrice);
    if (filters.maxPrice) query = query.lte("price", filters.maxPrice);
    const { data, error } = await query.order("created_at", { ascending: false });
    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error("Error fetching inventory:", error);
    return [];
  }
};

export const fetchCarById = async (id) => {
  if (!supabase) return null;
  try {
    const { data, error } = await supabase
      .from("inventory")
      .select("*")
      .eq("id", id)
      .single();
    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error fetching car:", error);
    return null;
  }
};

export const addCar = async (carData) => {
  if (!supabase) return { success: false, error: "Supabase not configured" };
  try {
    const { data, error } = await supabase
      .from("inventory")
      .insert([carData])
      .select();
    if (error) throw error;
    return { success: true, data };
  } catch (error) {
    console.error("Error adding car:", error);
    return { success: false, error: error.message };
  }
};

export const updateCar = async (id, carData) => {
  if (!supabase) return { success: false, error: "Supabase not configured" };
  try {
    const { data, error } = await supabase
      .from("inventory")
      .update(carData)
      .eq("id", id)
      .select();
    if (error) throw error;
    return { success: true, data };
  } catch (error) {
    console.error("Error updating car:", error);
    return { success: false, error: error.message };
  }
};

export const deleteCar = async (id) => {
  if (!supabase) return { success: false, error: "Supabase not configured" };
  try {
    const { error } = await supabase.from("inventory").delete().eq("id", id);
    if (error) throw error;
    return { success: true };
  } catch (error) {
    console.error("Error deleting car:", error);
    return { success: false, error: error.message };
  }
};

/* ===========================
   HOT DEALS
=========================== */
export const fetchHotDeals = async () => {
  if (!supabase) return [];
  try {
    const { data, error } = await supabase
      .from("inventory")
      .select("*")
      .eq("hot_deal", true)
      .order("created_at", { ascending: false })
      .limit(6);
    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error("Error fetching hot deals:", error);
    return [];
  }
};

export const toggleHotDeal = async (id, currentStatus) => {
  if (!supabase) return { success: false, error: "Supabase not configured" };
  try {
    const { data, error } = await supabase
      .from("inventory")
      .update({ hot_deal: !currentStatus })
      .eq("id", id)
      .select();
    if (error) throw error;
    return { success: true, data };
  } catch (error) {
    console.error("Error toggling hot deal:", error);
    return { success: false, error: error.message };
  }
};

/* ===========================
   ENQUIRIES
=========================== */
export const submitEnquiry = async (enquiryData) => {
  if (!supabase) return { success: false, error: "Supabase not configured" };
  try {
    const { error } = await supabase.from("enquiries").insert([enquiryData]);
    if (error) throw error;
    return { success: true };
  } catch (error) {
    console.error("Error submitting enquiry:", error);
    return { success: false, error: error.message };
  }
};

export const fetchEnquiries = async () => {
  if (!supabase) return [];
  try {
    const { data, error } = await supabase
      .from("enquiries")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error("Error fetching enquiries:", error);
    return [];
  }
};

export const deleteEnquiry = async (id) => {
  if (!supabase) return { success: false, error: "Supabase not configured" };
  try {
    const { error } = await supabase.from("enquiries").delete().eq("id", id);
    if (error) throw error;
    return { success: true };
  } catch (error) {
    console.error("Error deleting enquiry:", error);
    return { success: false, error: error.message };
  }
};

export const updateEnquiryStatus = async (id, status) => {
  if (!supabase) return { success: false, error: "Supabase not configured" };
  try {
    const { data, error } = await supabase
      .from("enquiries")
      .update({ status })
      .eq("id", id)
      .select();
    if (error) throw error;
    return { success: true, data };
  } catch (error) {
    console.error("Error updating enquiry status:", error);
    return { success: false, error: error.message };
  }
};