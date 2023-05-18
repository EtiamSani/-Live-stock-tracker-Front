const generateLogoPlaceholder = (symbol) => {
  const parts = symbol.split(".");
  const firstLetter = parts.length > 1 ? parts[1].charAt(0).toUpperCase() : "";
  const logoText = firstLetter + ".";

  // Créez une image ou un composant représentant le logo généré avec la première lettre du symbole suivie d'un point
  // Par exemple, vous pouvez utiliser une balise <div> avec du style pour simuler un logo
  return (
    <div
      style={{
        width: "40px",
        height: "40px",
        backgroundColor: "#eaeaea",
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "20px",
        fontWeight: "bold",
        color: "#333",
      }}
    >
      {logoText}
    </div>
  );
};

export default generateLogoPlaceholder;
