import { db } from ".";
import { assetTypeMapping } from "../api";

export const insertMarketStats = async (stats: MarketStatsDataType) => {
  try {
    const { data, error } = await db.from("market-stats").insert([stats]);

    return { data, error };
  } catch (error: any) {
    return { data: [], error: error.message };
  }
};

export const getMarketStats = async (type: keyof typeof assetTypeMapping) => {
  try {
    const { data, error } = await db
      .from("market-stats")
      .select("*")
      .eq("type", type)
      .order("created_at", { ascending: true });
    return { data, error };
  } catch (error: any) {
    return { data: [], error: error.message };
  }
};

export const deleteOldMarketStats = async (id: number) => {
  try {
    const { error } = await db.from("market-stats").delete().eq("id", id);

    if (error) {
      console.error("Error deleting market stats record:", error.message);
    }
  } catch (error: any) {
    console.error("Error deleting old market stats records:", error.message);
  }
};
