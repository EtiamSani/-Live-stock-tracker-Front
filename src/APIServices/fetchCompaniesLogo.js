const fetchCompaniesLogo = async (symbol) => {
  try {
    const response = await fetch(
      `https://stock-tracker-api.up.railway.app/tickersearch/logo/${symbol}`
    );
    const data = await response.json();
    return data.logo;
  } catch (error) {
    console.error("Failed to fetch company logo:", error);
    // Retournez un chemin d'accès vers une image de remplacement en cas d'erreur
    return "/chemin/vers/image-de-remplacement.png";
  }
};

export default fetchCompaniesLogo;
