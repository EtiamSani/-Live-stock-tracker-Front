import { useState } from "react";
import { FaPencilAlt } from "react-icons/fa";
import { RiDeleteBin7Line } from "react-icons/ri";
import fetchWatchLists from "../APIServices/fetchWatchLists";

const CompanyBadge = ({ item, handleClick, refetch, onDelete }) => {
  const [selectedId, setSelectedId] = useState("");
  const [showIcons, setShowIcons] = useState(false); // Ajout d'un état pour afficher ou masquer les icônes

  const handleOnClick = () => {
    const id = item.id;
    setSelectedId(id);
    localStorage.setItem("selectedId", id);
    refetch(["companiesInWatchlist", id]);
    handleClick();
  };

  const handleDoubleClick = () => {
    setShowIcons(true); // Afficher les icônes lors du double-clic
    setShowIcons(!showIcons); // Toggle the state to show or hide the icons
  };

  const handleEdit = () => {
    // Logique pour l'action de modification
    // Ajoutez ici votre code pour gérer la modification
  };

  const handleDelete = () => {
    const id = localStorage.getItem("selectedId");
    fetch(`http://localhost:3000/watchlist/deletewithcompanies/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        // Vérifier si la première suppression s'est effectuée avec succès
        if (response.ok) {
          // Effectuer la deuxième requête DELETE pour supprimer la liste dans la table "watchlist"
          return fetch(`http://localhost:3000/watchlist/${id}`, {
            method: "DELETE",
          });
        } else {
          throw new Error(
            "Erreur lors de la suppression des enregistrements dans watchlist_has_company"
          );
        }
      })
      .then((secondResponse) => {
        // Vérifier si la deuxième suppression s'est effectuée avec succès
        if (secondResponse.ok) {
          // Les deux suppressions sont terminées avec succès
          console.log("Suppression réussie");
          refetch();
          onDelete();
        } else {
          throw new Error(
            "Erreur lors de la suppression de la liste dans watchlist"
          );
        }
      })
      .catch((error) => {
        console.error("Erreur :", error);
        // Gérer l'erreur et effectuer les actions nécessaires en cas d'échec
      });
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
