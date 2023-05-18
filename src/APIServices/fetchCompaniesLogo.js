const fetchCompaniesLogo = async (symbol) => {
  try {
    const response = await fetch(
      `http://localhost:3000/tickersearch/logo/${symbol}`
    );
    const data = await response.json();
    console.log(data.logo);
    return data.logo;
  } catch (error) {
    console.error("Failed to fetch company logo:", error);
    // Retournez un chemin d'accès vers une image de remplacement en cas d'erreur
    return "/chemin/vers/image-de-remplacement.png";
  }
};

export default fetchCompaniesLogo;
