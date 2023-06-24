const base_url = "https://stock-tracker-api.up.railway.app";

export async function fetchClosePrice(symbol) {
  try {
    const response = await fetch(`${base_url}/tickersearch/price/${symbol}`);

    if (!response.ok) {
      throw new Error(`HTTP request failed: ${response.statusText}`);
    }

    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("HTTP request failed:", error);
    throw error;
  }
}

// ...

const handleTrade = async (event) => {
  const trade = JSON.parse(event.data);

  if (trade && trade.data && trade.data[0]) {
    console.log("Trade data:", trade.data[0]);
    const symbol = trade.data[0].s;
    const price = trade.data[0].p;

    try {
      const closePriceData = await fetchClosePrice(symbol);
      console.log("Close price data:", closePriceData);

      const openPrice = closePriceData.o;
      const change = price - openPrice;
      const percentageChange = (change / openPrice) * 100;

      setTradeData((prevTradeData) => ({
        ...prevTradeData,
        [symbol]: {
          price,
          openPrice,
          change,
          percentageChange,
        },
      }));
    } catch (error) {
      console.error("Failed to get close price:", error);

      setTradeData((prevTradeData) => ({
        ...prevTradeData,
        [symbol]: {
          price,
        },
      }));
    }
  } else {
    console.error("Received malformed data:", trade);
  }
};
