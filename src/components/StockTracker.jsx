import { FaPencilAlt } from "react-icons/fa";
import { RiDeleteBin7Line } from "react-icons/ri";
import { AiOutlineFileAdd } from "react-icons/ai";
import SearchBar from "./SearchBar";

const StockTracker = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="m-auto ">
        <div className=" m-10 ">
          <SearchBar className="w-10" />
        </div>
        <div>
          <a className="btn">
            Ajouter liste <AiOutlineFileAdd className="mx-1 text-xl" />
          </a>
          <a className="badge-ghost badge badge-sm btn m-2 p-2 font-bold">
            Quality stock
          </a>
        </div>
        <table className="mx-auto flex table w-96 justify-center">
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
                <button className="btn-ghost btn-sm btn hover:bg-red-300">
                  <RiDeleteBin7Line className="text-lg" />
                </button>
              </th>
            </tr>
            {/* row 2 */}
            <tr>
              <td>
                <div className="flex items-center space-x-3">
                  <div className="avatar">
                    <div className="mask mask-squircle h-12 w-12">
                      <img
                        src="/tailwind-css-component-profile-3@56w.png"
                        alt="Avatar Tailwind CSS Component"
                      />
                    </div>
                  </div>
                  <div>
                    <div className="font-bold">Brice Swyre</div>
                    <div className="text-sm opacity-50">China</div>
                  </div>
                </div>
              </td>
              <td>
                Carroll Group
                <br />
                <span className="badge-ghost badge badge-sm">
                  Tax Accountant
                </span>
              </td>
              <td>Red</td>
            </tr>
            {/* row 3 */}
            <tr>
              <td>
                <div className="flex items-center space-x-3">
                  <div className="avatar">
                    <div className="mask mask-squircle h-12 w-12">
                      <img
                        src="/tailwind-css-component-profile-4@56w.png"
                        alt="Avatar Tailwind CSS Component"
                      />
                    </div>
                  </div>
                  <div>
                    <div className="font-bold">Marjy Ferencz</div>
                    <div className="text-sm opacity-50">Russia</div>
                  </div>
                </div>
              </td>
              <td>
                Rowe-Schoen
                <br />
                <span className="badge-ghost badge badge-sm">
                  Office Assistant I
                </span>
              </td>
              <td>Crimson</td>
              <th>
                <button className="btn-ghost btn-xs btn">details</button>
              </th>
            </tr>
            {/* row 4 */}
            <tr>
              <td>
                <div className="flex items-center space-x-3">
                  <div className="avatar">
                    <div className="mask mask-squircle h-12 w-12">
                      <img
                        src="/tailwind-css-component-profile-5@56w.png"
                        alt="Avatar Tailwind CSS Component"
                      />
                    </div>
                  </div>
                  <div>
                    <div className="font-bold">Yancy Tear</div>
                    <div className="text-sm opacity-50">Brazil</div>
                  </div>
                </div>
              </td>
              <td>
                Wyman-Ledner
                <br />
                <span className="badge-ghost badge badge-sm">
                  Community Outreach Specialist
                </span>
              </td>
              <td>Indigo</td>
              <th>
                <button className="btn-ghost btn-xs btn">details</button>
              </th>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StockTracker;
