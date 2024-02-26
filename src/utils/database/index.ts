import { createClient } from "@supabase/supabase-js";

export const db = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URI as string,
  process.env.NEXT_PUBLIC_SUPABASE_KEY as string
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
