const fetchCompaniesInWatchLists = async () => {
  const selectedId = localStorage.getItem("selectedId");

  if (selectedId) {
    const apiRes = await fetch(
      `https://stock-tracker-api.up.railway.app/watchlist/${selectedId}`
    );

    if (!apiRes.ok) {
      throw new Error("fetch not ok");
    }

    return apiRes.json();
  } else {
    // Traitez le cas où selectedId est null ou undefined
    throw new Error("Créez ou sélectionnez une liste");
  }
};

export default fetchCompaniesInWatchLists;
