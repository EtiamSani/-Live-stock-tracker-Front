import { FaPencilAlt } from "react-icons/fa";
import { RiDeleteBin7Line } from "react-icons/ri";
import { useState, useContext, useEffect } from "react";
import SearchBar from "./SearchBar";
import ListModal from "./ListModal";
import fetchWatchLists from "../APIServices/fetchWatchLists";
import { useQuery } from "@tanstack/react-query";
import fetchCompaniesInWatchLists from "../APIServices/fetchCompaniesInWatchList";
import { useParams } from "react-router-dom";
import TableHeader from "./TableHeader";
import CompanyBadge from "./CompanyBadge";
import WebSocketContext from "../APIServices/webSocketContext";
import fetchCompaniesLogo from "../APIServices/fetchCompaniesLogo";

const StockTracker = () => {
  const base_url = "http://localhost:3000";
  const [isEditing, setIsEditing] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [editingCompanyId, setEditingCompanyId] = useState(null);
  const [updatedPrice, setUpdatedPrice] = useState(0);
  const [tradeData, setTradeData] = useState({});
  const [logoUrls, setLogoUrls] = useState({});

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

  const handleEditClick = (companyId) => {
    setEditingCompanyId(companyId);
    setIsEditing(true);
  };

  const handlePriceChange = (event) => {
    setUpdatedPrice(event.target.value);
  };

  const handlePriceSubmit = async () => {
    try {
      if (!editingCompanyId) {
        return;
      }

      setIsUpdating(true);

      const response = await fetch(`${base_url}/company/${editingCompanyId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ entryprice: updatedPrice }),
      });

      if (!response.ok) {
        throw new Error("Failed to update company price");
      }

      setEditingCompanyId(null);
      setIsEditing(false);
      await refetch();

      const updatedCompany = companiesInWatchList.find(
        (company) => company.id === editingCompanyId
      );
      if (updatedCompany) {
        setUpdatedPrice(updatedCompany.entryprice);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsUpdating(false);
    }
  };

  const selectedId = localStorage.getItem("selectedId");
  const handleDeleteCompany = async (companyId) => {
    const response = await fetch(
      `${base_url}/watchlist/${selectedId}/company/${companyId}`,
      {
        method: "DELETE",
      }
    );

    if (!response.ok) {
      throw new Error(`An error occurred: ${response.statusText}`);
    }

    refetch();
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handlePriceSubmit();
    }
  };

  const socket = useContext(WebSocketContext);

  useEffect(() => {
    if (companiesInWatchList && socket) {
      const symbols = companiesInWatchList.map((company) => company.symbol);

      symbols.forEach((symbol) => {
        const message = JSON.stringify({ type: "subscribe", symbol });
        socket.send(message);
      });

      const handleTrade = (event) => {
        const trade = JSON.parse(event.data);
        console.log("Trade data:", trade.data[0]);
        setTradeData((prevTradeData) => ({
          ...prevTradeData,
          [trade.data[0].s]: trade.data[0].p,
        }));
      };

      socket.addEventListener("open", () => {
        symbols.forEach((symbol) => {
          const message = JSON.stringify({ type: "subscribe", symbol });
          socket.send(message);
        });
      });

      socket.addEventListener("message", handleTrade);

      return () => {
        symbols.forEach((symbol) => {
          const message = JSON.stringify({ type: "unsubscribe", symbol });
          socket.send(message);
        });
        socket.removeEventListener("message", handleTrade);
      };
    }
  }, [companiesInWatchList, socket]);

  useEffect(() => {
    const fetchLogoUrls = async () => {
      try {
        const urls = {};
        for (const company of companiesInWatchList) {
          const url = await fetchCompaniesLogo(company.symbol);
          urls[company.symbol] = url;
        }
        setLogoUrls(urls);
      } catch (error) {
        console.error("Failed to fetch company logos:", error);
        // En cas d'erreur, vous pouvez définir un URL d'image de remplacement
        const defaultUrl = "/chemin/vers/image-de-remplacement.png";
        const urls = {};
        for (const company of companiesInWatchList) {
          urls[company.symbol] = defaultUrl;
        }
        setLogoUrls(urls);
      }
    };

    if (companiesInWatchList) {
      fetchLogoUrls();
    }
  }, [companiesInWatchList]);

  return (
    <div className="flex items-center justify-center">
      <div className="m-auto">
        <div className="m-10">
          <SearchBar refetch={refetch} />
        </div>
        <div className="ml-2.5 flex flex-wrap">
          <ListModal />
        </div>
        <div>
          {isLoading ? (
            <div>Loading...</div>
          ) : isError ? (
            <div>Error: {error.message}</div>
          ) : (
            data.map((item, index) => (
              <CompanyBadge
                key={index}
                item={item}
                handleClick={handleEditClick}
                refetch={refetch}
              />
            ))
          )}
        </div>

        <table className="table-compact max-w-xs lg:table lg:w-96">
          <TableHeader />
          <tbody>
            {isCompaniesLoading ? (
              <tr>
                <td>Loading...</td>
              </tr>
            ) : isCompaniesError ? (
              <tr>
                <td>Error: {companiesError.message}</td>
              </tr>
            ) : (
              companiesInWatchList.map((company) => (
                <CompanyRow
                  key={company.id}
                  company={company}
                  logoUrl={logoUrls[company.symbol]}
                  tradeData={tradeData[company.symbol]}
                  isEditing={isEditing}
                  editingCompanyId={editingCompanyId}
                  updatedPrice={updatedPrice}
                  handlePriceChange={handlePriceChange}
                  handlePriceSubmit={handlePriceSubmit}
                  handleKeyDown={handleKeyDown}
                  handleEditClick={handleEditClick}
                  handleDeleteCompany={handleDeleteCompany}
                  isUpdating={isUpdating}
                />
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const CompanyRow = ({
  company,
  logoUrl,
  tradeData,
  isEditing,
  editingCompanyId,
  updatedPrice,
  handlePriceChange,
  handlePriceSubmit,
  handleKeyDown,
  handleEditClick,
  handleDeleteCompany,
  isUpdating,
}) => {
  return (
    <tr key={company.id} className="border-b border-gray-200">
      <td>
        <div className="flex items-center space-x-3">
          <div className="avatar">
            <div className="h-11 w-11 rounded-full">
              <img src={logoUrl} alt="Avatar Tailwind CSS Component" />
            </div>
          </div>
          <div>
            <div className="text-xs font-bold">
              <p className="w-24 overflow-hidden text-ellipsis whitespace-nowrap">
                {company.name}
              </p>
            </div>
            <div className="text-sm opacity-50">{company.symbol}</div>
          </div>
        </div>
      </td>
      <td className="font-extrabold">
        <div className="-mt-1">{tradeData}</div>
        <div className="flex text-xs">
          <div className="-ml-3 font-bold">+20000</div>
          <div className="ml-1 w-7 font-bold">+50%</div>
        </div>
      </td>
      <td className="-ml-2 mt-3 flex items-center justify-center p-0 text-xs font-semibold">
        {isEditing && editingCompanyId === company.id ? (
          <input
            className="input-xs w-12 rounded-md"
            type="number"
            value={updatedPrice}
            onChange={handlePriceChange}
            onBlur={handlePriceSubmit}
            onKeyDown={handleKeyDown}
            autoFocus
            disabled={isUpdating}
          />
        ) : (
          <>
            {company.entryprice}
            <span
              className="btn-xs btn ml-1 p-0.5"
              onClick={() => handleEditClick(company.id)}
            >
              <FaPencilAlt className="text-xs" />
            </span>
          </>
        )}
      </td>
      <th className="-ml-5 p-0">
        <button
          className="btn-ghost btn-sm btn p-0 hover:bg-red-300"
          onClick={() => handleDeleteCompany(company.id)}
        >
          <RiDeleteBin7Line className="text-lg" />
        </button>
      </th>
    </tr>
  );
};

export default StockTracker;
