const fetchCompaniesInWatchLists = async () => {
  const apiRes = await fetch("http://localhost:3000/watchlist/2");

  if (!apiRes.ok) {
    throw new Error("fetch not ok");
  }

  return apiRes.json();
};

export default fetchCompaniesInWatchLists;
