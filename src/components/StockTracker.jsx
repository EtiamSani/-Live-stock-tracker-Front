import { FaPencilAlt } from "react-icons/fa";
import { RiDeleteBin7Line } from "react-icons/ri";
import { AiOutlineFileAdd } from "react-icons/ai";
import SearchBar from "./SearchBar";

const StockTracker = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="m-auto ">
        <div className=" m-10 ">
          <SearchBar />
        </div>
        <div className="flex flex-nowrap items-center justify-center">
          <a className="btn ">
            Ajouter liste <AiOutlineFileAdd className="mx-1 text-xl" />
          </a>
          <a className="badge-ghost badge badge-sm btn m-2 p-2 font-bold">
            Quality stock
          </a>
        </div>
        <table className="table-compact max-w-xs  lg:table lg:w-96">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th></th>
              <th>Prix d'entrée</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            <tr>
              <td>
                <div className="flex items-center space-x-3">
                  <div className="avatar">
                    <div className="h-12 w-12 rounded-full">
                      <img
                        src="/tailwind-css-component-profile-2@56w.png"
                        alt="Avatar Tailwind CSS Component"
                      />
                    </div>
                  </div>
                  <div>
                    <div className="font-bold">Sartorius Stedim</div>
                    <div className="text-sm opacity-50">DIM</div>
                  </div>
                </div>
              </td>
              <td className="font-extrabold">
                298 €
                <br />
                <div className="flex text-xs">
                  <div className="font-bold">+2.4</div>
                  <div className="w-7 font-bold">+50%</div>
                </div>
              </td>
              <td className="flex justify-center ">
                200
                <span className="btn-xs btn ml-2">
                  <FaPencilAlt className="text-base" />
                </span>
              </td>
              <th>
                <button className="btn-ghost  btn-sm btn m-0 hover:bg-red-300">
                  <RiDeleteBin7Line className="text-lg" />
                </button>
              </th>
            </tr>
            {/* row 2 */}
            <tr>
              <td>
                <div className="flex items-center space-x-3">
                  <div className="avatar">
                    <div className="h-12 w-12 rounded-full">
                      <img
                        src="/tailwind-css-component-profile-2@56w.png"
                        alt="Avatar Tailwind CSS Component"
                      />
                    </div>
                  </div>
                  <div>
                    <div className="font-bold">Sartorius Stedim</div>
                    <div className="text-sm opacity-50">DIM</div>
                  </div>
                </div>
              </td>
              <td className="font-extrabold">
                298 €
                <br />
                <span className="badge-ghost badge badge-sm font-bold">
                  +2.4
                </span>
                <span className="badge-ghost badge badge-sm font-bold">
                  +5 %
                </span>
              </td>
              <td>
                200 €
                <span className="btn-xs btn ml-2">
                  <FaPencilAlt className="text-base" />
                </span>
              </td>
              <th>
                <button className="btn-ghost  btn-sm btn m-0 hover:bg-red-300">
                  <RiDeleteBin7Line className="text-lg" />
                </button>
              </th>
            </tr>
            {/* row 3 */}
            <tr>
              <td>
                <div className="flex items-center space-x-3">
                  <div className="avatar">
                    <div className="h-12 w-12 rounded-full">
                      <img
                        src="/tailwind-css-component-profile-2@56w.png"
                        alt="Avatar Tailwind CSS Component"
                      />
                    </div>
                  </div>
                  <div>
                    <div className="font-bold">Sartorius Stedim</div>
                    <div className="text-sm opacity-50">DIM</div>
                  </div>
                </div>
              </td>
              <td className="font-extrabold">
                298 €
                <br />
                <span className="badge-ghost badge badge-sm font-bold">
                  +2.4
                </span>
                <span className="badge-ghost badge badge-sm font-bold">
                  +5 %
                </span>
              </td>
              <td>
                200 €
                <span className="btn-xs btn ml-2">
                  <FaPencilAlt className="text-base" />
                </span>
              </td>
              <th>
                <button className="btn-ghost  btn-sm btn m-0 hover:bg-red-300">
                  <RiDeleteBin7Line className="text-lg" />
                </button>
              </th>
            </tr>
            {/* row 4 */}
            <tr>
              <td>
                <div className="flex items-center space-x-3">
                  <div className="avatar">
                    <div className="h-12 w-12 rounded-full">
                      <img
                        src="/tailwind-css-component-profile-2@56w.png"
                        alt="Avatar Tailwind CSS Component"
                      />
                    </div>
                  </div>
                  <div>
                    <div className="font-bold">Sartorius Stedim</div>
                    <div className="text-sm opacity-50">DIM</div>
                  </div>
                </div>
              </td>
              <td className="font-extrabold">
                298 €
                <br />
                <span className="badge-ghost badge badge-sm font-bold">
                  +2.4
                </span>
                <span className="badge-ghost badge badge-sm font-bold">
                  +5 %
                </span>
              </td>
              <td>
                200 €
                <span className="btn-xs btn ml-2">
                  <FaPencilAlt className="text-base" />
                </span>
              </td>
              <th>
                <button className="btn-ghost  btn-sm btn m-0 hover:bg-red-300">
                  <RiDeleteBin7Line className="text-lg" />
                </button>
              </th>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StockTracker;
