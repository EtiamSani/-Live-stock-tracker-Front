import { useState } from "react";
import { AiOutlineFileAdd } from "react-icons/ai";
import jwt_decode from "jwt-decode";

const ListModal = ({ refreshWatchlists }) => {
  const [newListName, setNewListName] = useState(""); // état pour stocker le nom de la nouvelle liste
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("Token not found");
  }

  const decodedToken = jwt_decode(token);
  const investorId = decodedToken.data.id;

  const handleInputChange = (event) => {
    setNewListName(event.target.value);
  };

  const handleCreateList = async () => {
    const response = await fetch("http://localhost:3000/watchlist", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: newListName, investor_id: investorId }),
    });

    if (!response.ok) {
      throw new Error("Erreur lors de la création de la nouvelle liste");
    }

    // Rafraîchir la liste des watchlists après la création réussie
    refreshWatchlists();

    // Réinitialiser le champ de saisie après la création réussie
    setNewListName("");
  };

  return (
    <div>
      <label htmlFor="my-modal" className="btn">
        Ajouter liste <AiOutlineFileAdd className="mx-1 text-xl" />
      </label>

      <input type="checkbox" id="my-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <h3 className="text-lg font-bold">Ma nouvelle liste</h3>
          <input
            type="text"
            placeholder="Le nom de ma liste"
            className="input-bordered input-primary input mt-3 w-full max-w-xs"
            value={newListName} // Utilisation de l'état newListName comme valeur
            onChange={handleInputChange} // Mettre à jour l'état newListName lorsque l'utilisateur tape
          />
          <div className="modal-action">
            <label
              htmlFor="my-modal"
              className="btn bg-green-500"
              onClick={handleCreateList}
            >
              Créer ma liste
            </label>
            <label htmlFor="my-modal" className="btn bg-red-400">
              Annuler
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListModal;
