const fetchCompaniesInWatchLists = async ({ queryKey }) => {
  const selectedId = localStorage.getItem("selectedId");
  const id = queryKey[1];
  const apiRes = await fetch(`http://localhost:3000/watchlist/${selectedId}`);

  if (!apiRes.ok) {
    throw new Error("fetch not ok");
  }

  return apiRes.json();
};

export default fetchCompaniesInWatchLists;
