import type { NextApiRequest, NextApiResponse } from "next";
import {
  assetTypeMapping,
  getPricePerformance,
  getMarketPerformance,
} from "@/utils/api";
import {
  getMarketStats,
  insertMarketStats,
  getPerformanceStats,
  deleteOldMarketStats,
  insertPerformanceStats,
  deleteOldPerfomanceStats,
} from "@/utils/database";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { query } = req;
    const type = query.type;

    const performance = await getPricePerformance(
      type as keyof typeof assetTypeMapping
    );
    const marketStats = await getMarketPerformance(
      type as keyof typeof assetTypeMapping
    );

    if (performance) {
      for (let i = 0; i < performance.length; i++) {
        await insertPerformanceStats({
          ...performance[i],
          type: query.type as string,
        });
        console.log(`Updating period: ${performance[i].period}`);
      }
      console.log(`Updated performance stats for type: ${query.type}`);

      const performanceDB = await getPerformanceStats(
        type as keyof typeof assetTypeMapping
      );

      if (performanceDB.data) {
        const firstSevenRecords = performanceDB.data
          .slice(0, 7)
          .map((rec) => rec.id);

        await deleteOldPerfomanceStats(firstSevenRecords);

        console.log(`Deleted oldest market stats record for ${query.type}`);
      }
    }

    if (marketStats) {
      await insertMarketStats(marketStats);
      console.log(`Updated market stats for ${query.type}`);

      const marketStatsDB = await getMarketStats(
        type as keyof typeof assetTypeMapping
      );

      if (marketStatsDB.data && marketStatsDB.data.length > 7) {
        const idToDelete = marketStatsDB.data[0].id;
        await deleteOldMarketStats(idToDelete);
        console.log(`Deleted oldest market stats record for ${query.type}`);
      }
    }

    res.status(200).json({ message: "Succesfully updated db" });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export default handler;
