import { AiOutlineFileAdd } from "react-icons/ai";

const ListModal = () => {
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
          />
          <div className="modal-action">
            <label htmlFor="my-modal" className="btn bg-green-500">
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
