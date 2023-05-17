import { FaPencilAlt } from "react-icons/fa";
import { RiDeleteBin7Line } from "react-icons/ri";
import { useState } from "react";
import SearchBar from "./SearchBar";
import sartoriusLogo from "./sartorius-logo-vector.png";
import ListModal from "./ListModal";
import fetchWatchLists from "../APIServices/fetchWatchLists";
import { useQuery } from "@tanstack/react-query";
import fetchCompaniesInWatchLists from "../APIServices/fetchCompaniesInWatchList";
import { useParams } from "react-router-dom";

const StockTracker = () => {
  const base_url = "http://localhost:3000";
  const [isEditing, setIsEditing] = useState(false);
  const [price, setPrice] = useState(0); // Initial price value

  const { data, error, isLoading, isError } = useQuery(
    ["watchlist"],
    fetchWatchLists
  );

  const { id } = useParams();
  const results = useQuery(
    ["companiesInWatchlist", id],
    fetchCompaniesInWatchLists
  );
  const {
    data: companiesInWatchList,
    isLoading: isCompaniesLoading,
    isError: isCompaniesError,
    error: companiesError,
    refetch,
  } = results;

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handlePriceChange = (event) => {
    setPrice(event.target.value);
  };

  const handlePriceSubmit = () => {
    setIsEditing(false);
    // You can use the updated price here, for example, to update the data in your backend.
  };
  const selectedId = localStorage.getItem("selectedId");
  const handleDeleteCompany = async (companyId) => {
    // Assume you have a DELETE endpoint that takes the company id in the url
    const response = await fetch(
      `${base_url}/watchlist/${selectedId}/company/${companyId}`,
      {
        method: "DELETE",
      }
    );

    if (!response.ok) {
      throw new Error(`An error occurred: ${response.statusText}`);
    }

    // Re-fetch the company list or remove the company from state
    refetch();
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handlePriceSubmit();
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div className="m-auto ">
        <div className=" m-10 ">
          <SearchBar />
        </div>
        <div className="ml-2.5 flex flex-wrap">
          <ListModal />
        </div>
        <div>
          {isLoading ? (
            // Loading state
            <div>Loading...</div>
          ) : isError ? (
            // Error state
            <div>Error: {error.message}</div>
          ) : (
            // Success state
            data.map((item, index) => (
              <a
                key={index}
                className="badge-ghost badge badge-sm btn m-2 p-2 font-bold"
                data-set={item.id}
                onClick={(e) => {
                  const id = e.currentTarget.dataset.set;
                  localStorage.setItem("selectedId", id);
                  refetch(["companiesInWatchlist", id]);
                }}
              >
                {item.name}
              </a>
            ))
          )}
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
            {isCompaniesLoading ? (
              // Loading state
              <div>Loading...</div>
            ) : isCompaniesError ? (
              // Error state
              <tr>
                <td>Error: {companiesError.message}</td>
              </tr>
            ) : (
              // Success state
              companiesInWatchList.map((company) => (
                <tr key={company.id}>
                  <td>
                    <div className="flex items-center space-x-3">
                      <div className="avatar">
                        <div className="h-11 w-11 rounded-full">
                          <img
                            src={sartoriusLogo}
                            alt="Avatar Tailwind CSS Component"
                          />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{company.name}</div>
                        <div className="text-sm opacity-50">
                          {company.symbol}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="font-extrabold">
                    <div className="-mt-1">298</div>
                    <div className="flex text-xs">
                      <div className="-ml-3 font-bold">+20000</div>
                      <div className="ml-1 w-7 font-bold">+50%</div>
                    </div>
                  </td>
                  <td className="mt-6 flex items-center justify-center p-0">
                    {isEditing ? (
                      <input
                        className="input-xs w-12 rounded-md"
                        type="number"
                        value={price}
                        onChange={handlePriceChange}
                        onBlur={handlePriceSubmit}
                        onKeyDown={handleKeyDown}
                        autoFocus
                      />
                    ) : (
                      <>
                        {price}
                        <span
                          className="btn-xs btn ml-1"
                          onClick={handleEditClick}
                        >
                          <FaPencilAlt className="text-base" />
                        </span>
                      </>
                    )}
                  </td>
                  <th className="p-0">
                    <button
                      className="btn-ghost  btn-sm btn m-0 -ml-5  hover:bg-red-300"
                      onClick={() => {
                        handleDeleteCompany(company.id);
                        console.log(company.id);
                      }}
                    >
                      <RiDeleteBin7Line className="text-lg" />
                    </button>
                  </th>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StockTracker;
