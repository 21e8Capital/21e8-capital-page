import { assetTypeMapping } from ".";
import { blockchairApi, digiconomistApi } from "../axios";

export const getHalvingData = async (
  type: keyof typeof assetTypeMapping
): Promise<any> => {
  try {
    const halving = await blockchairApi.get(`/tools/halvening`);
    const { seconds_left, halvening_time } = halving.data.data.bitcoin;

    return displayHalveningCountdown({ seconds_left, halvening_time });
  } catch (err: any) {
    console.log("Error fetching halving data: ", err.message);
  }
};

export const getEmissions = async () => {
  try {
    const endDate = new Date(); // Today's date
    endDate.setDate(endDate.getDate() - 1); // Set to yesterday

    const startDate = new Date(endDate.getTime() - 7 * 24 * 60 * 60 * 1000); // Date 8 days ago

    const historicalData: EmissionData[] = [];

    for (
      let date = startDate;
      date <= endDate;
      date.setDate(date.getDate() + 1)
    ) {
      const dateString = date.toISOString().split("T")[0].replace(/-/g, "");
      const { data } = await digiconomistApi(`/bitcoin/stats/${dateString}`);
      historicalData.push(...data); // Flatten the array
    }

    const emissionRates = calculateEmissionRate(historicalData);
    console.log("Current Daily Emission Rate:", emissionRates.current);
    console.log("Next Daily Emission Rate (Forecasted):", emissionRates.next);

    return {
      currentEmission: emissionRates.current,
      forecastedEmission: emissionRates.next,
    };
  } catch (err: any) {
    console.log("Error fetching emissions: ", err.message);
    return { currentEmission: null, forecastedEmission: null };
  }
};

function formatCountdownTime(seconds: number): string {
  const days = Math.floor(seconds / (3600 * 24));
  const hours = Math.floor((seconds % (3600 * 24)) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const formattedTime = `${days} days, ${hours} hours, ${minutes} minutes`;
  return formattedTime;
}

function formatDate(dateString: string) {
  const date = new Date(dateString);
  const day = date.getDate();
  const options = { month: "long", year: "numeric" } as any;
  const restOfDate = date
    .toLocaleDateString("en-US", options)
    .replace(",", " ");

  return {
    day,
    restOfDate,
  };
}

function displayHalveningCountdown(halveningData: HalveningData) {
  const { seconds_left, halvening_time } = halveningData;

  const countdownTime = formatCountdownTime(seconds_left);
  const halveningDate = formatDate(halvening_time);

  return {
    countdownTime,
    halveningDate,
  };
}

function calculateEmissionRate(data: EmissionData[]): {
  current: number;
  next?: number;
} {
  const totalEmissions = data.reduce(
    (acc, curr) => acc + parseFloat(curr["Output_kgCO2"]),
    0
  );

  const totalEnergy = data.reduce(
    (acc, curr) => acc + parseFloat(curr["Output_kWh"]),
    0
  );
  const averageEmissionRate = totalEmissions / totalEnergy;

  console.log(totalEnergy, totalEmissions);

  const nextDayEmissions =
    averageEmissionRate * parseFloat(data[0]["24hr_kWh"]);

  return { current: averageEmissionRate, next: nextDayEmissions };
}
