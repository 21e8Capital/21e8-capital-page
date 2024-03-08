import { googleTrends } from "../axios";

export const fetchGoogleTrends = async (query: string) => {
  try {
    const response = await googleTrends.get(
      `?engine=google_trends&q=${query}&data_type=TIMESERIES&date=2009-01-01 ${currentDate()}&api_key=f895c4323a3f0afb30689a96b7c732209c20bae647686a0482b15c590688f6eb`
    );

    return response.data.interest_over_time.timeline_data.map((item: any) => {
      return {
        date: item.date,
        data: item.values[0].extracted_value,
      };
    });
  } catch (err) {
    console.log("Error fetching google trends: ", err);
  }
};

const currentDate = () => {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const day = String(currentDate.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};
