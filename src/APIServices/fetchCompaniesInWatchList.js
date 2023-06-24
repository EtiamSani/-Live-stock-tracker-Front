const fetchCompaniesInWatchLists = async () => {
  const selectedId = localStorage.getItem("selectedId");

  const apiRes = await fetch(
    `https://stock-tracker-api.up.railway.app/watchlist/${selectedId}`
  );

  if (!apiRes.ok) {
    throw new Error("fetch not ok");
  }

  return apiRes.json();
};

export default fetchCompaniesInWatchLists;
