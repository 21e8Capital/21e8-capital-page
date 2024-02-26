import { db } from ".";
import { assetTypeMapping } from "../api";

export const insertPerformanceStats = async (stats: PerformanceDataType) => {
  try {
    const { data, error } = await db.from("performance-stats").insert([stats]);

    return { data, error };
  } catch (error: any) {
    return { data: [], error: error.message };
  }
};

export const getPerformanceStats = async (
  type: keyof typeof assetTypeMapping
) => {
  try {
    const { data, error } = await db
      .from("performance-stats")
      .select("*")
      .eq("type", type)
      .order("created_at", { ascending: true })
      .limit(7);
    return { data, error };
  } catch (error: any) {
    return { data: [], error: error.message };
  }
};

export const deleteOldPerfomanceStats = async (statsIds: number[]) => {
  try {
    for (let i = 0; i < statsIds.length; i++) {
      const { error } = await db
        .from("performance-stats")
        .delete()
        .eq("id", statsIds[i]);

      if (error) {
        console.error(
          "Error deleting performance stats record:",
          error.message
        );
      }
    }
  } catch (error: any) {
    console.error(
      "Error deleting old performance stats records:",
      error.message
    );
  }
};
