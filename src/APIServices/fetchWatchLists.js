const fetchWatchLists = async () => {
  const apiRes = await fetch("http://localhost:3000/watchlist/investor/1");

  if (!apiRes.ok) {
    throw new Error("fetch not ok");
  }

  return apiRes.json();
};

export default fetchWatchLists;
