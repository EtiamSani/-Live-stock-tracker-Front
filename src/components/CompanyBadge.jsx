import { useState } from "react";
import { FaPencilAlt } from "react-icons/fa";
import { RiDeleteBin7Line } from "react-icons/ri";
import fetchWatchLists from "../APIServices/fetchWatchLists";
import { useEffect } from "react";

const CompanyBadge = ({
  item,
  handleClick,
  refetch,
  updateWatchlists,
  refreshWatchlists,
}) => {
  const [selectedId, setSelectedId] = useState("");
  const [showIcons, setShowIcons] = useState(false); // Ajout d'un état pour afficher ou masquer les icônes
  const [isEditing, setIsEditing] = useState(false); // State to toggle the input field
  const [updatedName, setUpdatedName] = useState(""); // State to keep track of the updated name
  const [lastClickedId, setLastClickedId] = useState(null);

  useEffect(() => {
    setUpdatedName(item.name);
  }, [item.name]);

  const handleOnClick = () => {
    const id = item.id;
    const previouslySelectedButton = document.querySelector(".bg-black");
    if (previouslySelectedButton) {
      previouslySelectedButton.classList.remove("bg-black");
    }
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

  const handleDoubleClick = () => {
    setShowIcons(true); // Afficher les icônes lors du double-clic
    setShowIcons(!showIcons); // Toggle the state to show or hide the icons
  };

  const handleEdit = () => {
    // on pencil click, switch to editing mode
    setIsEditing(true);
    setUpdatedName(item.name); // initialize the updated name with the current name
  };

  const handleSave = async () => {
    if (!isEditing) {
      return;
    }

    // if already in editing mode, send the update request
    const id = localStorage.getItem("selectedId");
    const response = await fetch(`http://localhost:3000/watchlist/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: updatedName }),
    });

    // handle the response...
    // if update was successful, exit the editing mode
    if (response.ok) {
      setIsEditing(false);
      refreshWatchlists(); // Actualiser les watchlists
      setShowIcons(false); // Cacher les icônes
    } else {
      throw new Error("Erreur lors de la mise à jour du nom de la watchlist");
    }
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
      className={`badge-ghost badge badge-sm btn m-2 my-5 p-2 font-bold hover:border-black hover:bg-transparent hover:text-black ${
        selectedId === item.id ? "bg-black" : "bg-transparent"
      }`}
      onClick={handleOnClick}
      onDoubleClick={handleDoubleClick}
    >
      {isEditing && item.id === selectedId ? (
        <div>
          <input
            value={updatedName}
            onChange={(e) => setUpdatedName(e.target.value)}
            className="mr-3 w-20 p-1 outline outline-zinc-600"
          />
          <button className="btn-xs btn" onClick={handleSave}>
            Valider
          </button>
        </div>
      ) : (
        item.name
      )}
      {showIcons && (
        <div className="flex">
          <span className="btn-accent btn-xs btn ml-2" onClick={handleEdit}>
            <FaPencilAlt />
          </span>
          <span className="btn-warning btn-xs btn ml-2" onClick={handleDelete}>
            <RiDeleteBin7Line className="text-lg" />
          </span>
        </div>
      )}
    </a>
  );
};

export default CompanyBadge;
