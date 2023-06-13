function MarketStatus() {
  const now = new Date();
  const dayOfWeek = now.getDay();
  const currentHour = now.getHours();
  const currentMinutes = now.getMinutes();
  console.log(currentHour);

  if (
    dayOfWeek >= 1 &&
    dayOfWeek <= 5 &&
    currentHour >= 14 &&
    currentHour <= 21 &&
    currentMinutes >= 30
  ) {
    return <div className="h-2 w-2 rounded-full bg-green-500"></div>;
  } else {
    return <div className="h-2 w-2 rounded-full bg-red-500"></div>;
  }
}

export default MarketStatus;
