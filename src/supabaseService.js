import { supabase } from "./supabase";

/* ===========================
   INVENTORY
=========================== */
export const fetchInventory = async (filters = {}) => {
  try {
    let query = supabase.from("inventory").select("*");
    if (filters.make) query = query.ilike("make", `%${filters.make}%`);
    if (filters.type) query = query.eq("type", filters.type);
    if (filters.condition) query = query.eq("condition", filters.condition);
    if (filters.minPrice) query = query.gte("price", filters.minPrice);
    if (filters.maxPrice) query = query.lte("price", filters.maxPrice);
    const { data, error } = await query.order("created_at", {
      ascending: false,
    });
    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error("Error fetching inventory:", error);
    return [];
  }
};

export const fetchCarById = async (id) => {
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

export const fetchHotDeals = async () => {
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

export const addCar = async (carData) => {
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
  try {
    const { error } = await supabase.from("inventory").delete().eq("id", id);
    if (error) throw error;
    return { success: true };
  } catch (error) {
    console.error("Error deleting car:", error);
    return { success: false, error: error.message };
  }
};

export const toggleHotDeal = async (id, currentStatus) => {
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
   IMAGE UPLOAD
=========================== */
export const uploadCarImage = async (file) => {
  try {
    const fileExt = file.name.split(".").pop();
    const fileName = `${Date.now()}-${Math.random()
      .toString(36)
      .substring(2)}.${fileExt}`;
    const filePath = `cars/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from("car-images")
      .upload(filePath, file, {
        cacheControl: "3600",
        upsert: false,
      });

    if (uploadError) throw uploadError;

    const { data } = supabase.storage
      .from("car-images")
      .getPublicUrl(filePath);

    return { success: true, url: data.publicUrl };
  } catch (error) {
    console.error("Error uploading image:", error);
    return { success: false, error: error.message };
  }
};

export const deleteCarImage = async (imageUrl) => {
  try {
    const path = imageUrl.split("/car-images/")[1];
    if (!path) return { success: false, error: "Invalid image URL" };
    const { error } = await supabase.storage
      .from("car-images")
      .remove([path]);
    if (error) throw error;
    return { success: true };
  } catch (error) {
    console.error("Error deleting image:", error);
    return { success: false, error: error.message };
  }
};

/* ===========================
   ENQUIRIES
=========================== */
export const submitEnquiry = async (enquiryData) => {
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