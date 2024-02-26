import { createClient } from "@supabase/supabase-js";

export const db = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URI!,
  process.env.NEXT_PUBLIC_SUPABASE_KEY!
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
