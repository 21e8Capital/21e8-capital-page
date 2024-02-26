import { createClient } from "@supabase/supabase-js";

export const db = createClient(
  process.env.SUPABASE_URI!,
  process.env.SUPABASE_KEY!
);

export {
  getMarketStats,
  insertMarketStats,
  deleteOldMarketStats,
} from "./marketStats";

export {
  getPerformanceStats,
  insertPerformanceStats,
  deleteOldPerfomanceStats,
} from "./performanceStats";
