import { useState } from "react";
import { FaPencilAlt } from "react-icons/fa";
import { RiDeleteBin7Line } from "react-icons/ri";
import fetchWatchLists from "../APIServices/fetchWatchLists";

const CompanyBadge = ({
  item,
  handleClick,
  refetch,
  onDelete,
  updateWatchlists,
  setDeletedListId,
  setWatchlists,
}) => {
  const [selectedId, setSelectedId] = useState("");
  const [showIcons, setShowIcons] = useState(false); // Ajout d'un état pour afficher ou masquer les icônes

  const handleOnClick = () => {
    const id = item.id;
    setSelectedId(id);
    localStorage.setItem("selectedId", id);
    refetch(["companiesInWatchlist", id]);
    handleClick();
  };

  const handleUpdateWatchlists = async () => {
    try {
      await fetchWatchLists(); // Effectuer la requête API pour mettre à jour la liste de watchlists
      updateWatchlists(item.id); // Mettre à jour les watchlists dans le composant parent
    } catch (error) {
      console.error("Error:", error);
      // Gérer l'erreur et effectuer les actions nécessaires en cas d'échec
    }
  };

  const handleUpdate = () => {
    refetch("watchlist");
    console.log("Watchlists mises à jour");
  };

  const handleDoubleClick = () => {
    setShowIcons(true); // Afficher les icônes lors du double-clic
    setShowIcons(!showIcons); // Toggle the state to show or hide the icons
  };

  const handleEdit = () => {
    // Logique pour l'action de modification
    // Ajoutez ici votre code pour gérer la modification
  };

  const handleDelete = async (listId) => {
    try {
      const id = localStorage.getItem("selectedId");
      const firstResponse = await fetch(
        `http://localhost:3000/watchlist/deletewithcompanies/${id}`,
        {
          method: "DELETE",
        }
      );
      await handleUpdateWatchlists();
      if (firstResponse.ok) {
        const secondResponse = await fetch(
          `http://localhost:3000/watchlist/${id}`,
          {
            method: "DELETE",
          }
        );

        if (secondResponse.ok) {
          console.log("Suppression réussie");
        } else {
          throw new Error(
            "Erreur lors de la suppression de la liste dans watchlist"
          );
        }
      } else {
        throw new Error(
          "Erreur lors de la suppression des enregistrements dans watchlist_has_company"
        );
      }
      fetchWatchLists();
    } catch (error) {
      console.error("Erreur :", error);
      // Gérer l'erreur et effectuer les actions nécessaires en cas d'échec
    }
  };

  return (
    <a
      className="badge-ghost badge badge-sm btn m-2 p-2 font-bold hover:border-black hover:bg-transparent hover:text-black"
      onClick={handleOnClick}
      onDoubleClick={handleDoubleClick} // Ajout de l'événement de double-clic
    >
      {item.name}
      {showIcons && ( // Affichage conditionnel des icônes
        <div className="flex">
          <span className="fapen-icon" onClick={handleEdit}>
            <FaPencilAlt className="text-xs" />
          </span>
          <span className="hover:bg-red-500" onClick={handleDelete}>
            <RiDeleteBin7Line className="text-lg" />
          </span>
        </div>
      )}
    </a>
  );
};

export default CompanyBadge;
