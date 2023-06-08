import { FaPencilAlt } from "react-icons/fa";
import { RiDeleteBin7Line } from "react-icons/ri";
import { useState, useContext, useEffect } from "react";
import SearchBar from "../components/SearchBar";
import ListModal from "../components/ListModal";
import fetchWatchLists from "../APIServices/fetchWatchLists";
import { useQuery } from "@tanstack/react-query";
import fetchCompaniesInWatchLists from "../APIServices/fetchCompaniesInWatchList";
import { useParams } from "react-router-dom";
import TableHeader from "../components/TableHeader";
import CompanyBadge from "../components/CompanyBadge";
import WebSocketContext from "../APIServices/webSocketContext";
import generateLogoPlaceholder from "../APIServices/generateLogoPlaceholder";
import fetchCompaniesLogo from "../APIServices/fetchCompaniesLogo";
import { fetchClosePrice } from "../APIServices/fetchClosePrice";
import Lazy from "../components/LazyLoadingWatchlist";
import LazyCompanyLogo from "../components/LazyLoadingCompaniesLogo";
import LazyCompanyName from "../components/LazyLoadingCompanyName";

const StockTracker = () => {
  const base_url = "http://localhost:3000";
  const [isEditing, setIsEditing] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [editingCompanyId, setEditingCompanyId] = useState(null);
  const [updatedEntryPrice, setUpdatedPrice] = useState(0);
  const [tradeData, setTradeData] = useState({});
  const [logoUrls, setLogoUrls] = useState({});
  const [prevSymbols, setPrevSymbols] = useState([]);
  const [deletedListId, setDeletedListId] = useState(() => {});

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
        body: JSON.stringify({ entryprice: updatedEntryPrice }),
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

  const {
    tradeData: contextTradeData,
    isConnected,
    socket,
  } = useContext(WebSocketContext);

  useEffect(() => {
    if (companiesInWatchList && socket) {
      const symbols = companiesInWatchList.map((company) => company.symbol);

      // Mettre à jour la liste de symboles précédents
      setPrevSymbols(symbols);

      socket.addEventListener("error", function (event) {
        console.error("WebSocket error:", event);
      });

      const handleTrade = async (event) => {
        const trade = JSON.parse(event.data);

        if (trade && trade.data && trade.data[0] && trade.type !== "ping") {
          console.log("Trade data:", trade.data[0]);
          const symbol = trade.data[0].s;
          // const closePriceData = await fetchClosePrice(symbol);
          // console.log("Close price data:", closePriceData);
          setTradeData((prevTradeData) => ({
            ...prevTradeData,
            [trade.data[0].s]: trade.data[0].p,
          }));
          // console.log(trade.data[0].p);
        } else {
          console.error("Received malformed data:", trade);
        }
      };

      const sendWebSocketMessage = (message) => {
        if (socket.readyState === WebSocket.OPEN) {
          socket.send(message);
        } else {
          console.error(
            "WebSocket connection is not open. Waiting for connection..."
          );
          setTimeout(() => {
            sendWebSocketMessage(message);
          }, 1000); // Réessaie après 1 seconde
        }
      };

      const handleOpen = () => {
        console.log("WebSocket connection established. Sending messages...");
        symbols.forEach((symbol) => {
          const message = JSON.stringify({ type: "subscribe", symbol });
          sendWebSocketMessage(message);
        });
      };

      const handleClose = () => {
        console.error(
          "WebSocket connection closed unexpectedly. Reconnecting..."
        );
      };

      socket.addEventListener("open", handleOpen);
      socket.addEventListener("message", handleTrade);
      socket.addEventListener("close", handleClose);

      return () => {
        symbols.forEach((symbol) => {
          const message = JSON.stringify({ type: "unsubscribe", symbol });
          socket.send(message);
        });
        socket.removeEventListener("open", handleOpen);
        socket.removeEventListener("message", handleTrade);
        socket.removeEventListener("close", handleClose);
      };
    }
  }, [companiesInWatchList, socket]);

  useEffect(() => {
    if (companiesInWatchList && socket) {
      const symbols = companiesInWatchList.map((company) => company.symbol);

      const newSymbols = symbols.filter(
        (symbol) => !prevSymbols.includes(symbol)
      );
      const oldSymbols = prevSymbols.filter(
        (symbol) => !symbols.includes(symbol)
      );

      const sendWebSocketMessage = (type, symbol) => {
        const message = JSON.stringify({ type, symbol });
        if (socket.readyState === WebSocket.OPEN) {
          socket.send(message);
        } else {
          console.error(
            `WebSocket connection is not open. Waiting for connection to send ${type} message for ${symbol}...`
          );
          setTimeout(() => {
            sendWebSocketMessage(type, symbol);
          }, 1000); // Retry after 1 second
        }
      };

      oldSymbols.forEach((symbol) => {
        sendWebSocketMessage("unsubscribe", symbol);
      });

      newSymbols.forEach((symbol) => {
        sendWebSocketMessage("subscribe", symbol);
      });

      // Update the list of previous symbols
      setPrevSymbols(symbols);
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
        const urls = {};
        for (const company of companiesInWatchList) {
          urls[company.symbol] = null; // Utilisez null pour indiquer que le logo n'est pas disponible
        }
        setLogoUrls(urls);
      }
    };

    if (companiesInWatchList) {
      fetchLogoUrls();
    }
  }, [companiesInWatchList]);

  const [watchlists, setWatchlists] = useState([]);

  useEffect(() => {
    if (data) {
      setWatchlists(data);
    }
  }, [data]);

  console.log("Watchlist:", watchlists);

  // ...

  const updateWatchlists = (listId) => {
    setWatchlists((prevWatchlists) =>
      prevWatchlists.filter((item) => item.id !== listId)
    );
  };

  const refreshWatchlists = async () => {
    const updatedWatchlists = await fetchWatchLists();
    setWatchlists(updatedWatchlists);
  };

  return (
    <div className="flex items-center justify-center">
      <div className="m-auto">
        <div className="m-10">
          <SearchBar refetch={refetch} />
        </div>
        <div className="ml-2.5 flex flex-wrap">
          <ListModal refreshWatchlists={refreshWatchlists} />
        </div>
        <div>
          {isLoading ? (
            <div>
              {Array.from({ length: 4 }).map((_, index) => {
                return <Lazy key={index} />;
              })}
            </div>
          ) : isError ? (
            <div>Error: {error.message}</div>
          ) : (
            watchlists
              .filter((item) => item.id !== deletedListId) // Exclure la liste supprimée
              .map((item, index) => (
                <CompanyBadge
                  key={index}
                  item={item}
                  handleClick={handleEditClick}
                  refetch={refetch}
                  onDelete={() => handleDelete(item.id, item.listId)}
                  updateWatchlists={updateWatchlists}
                  setDeletedListId={setDeletedListId}
                  setWatchlists={setWatchlists}
                  refreshWatchlists={refreshWatchlists}
                />
              ))
          )}
        </div>

        <table className="table-compact mx-auto max-w-xl shadow lg:table lg:w-96">
          <TableHeader />
          <tbody>
            {isCompaniesLoading ? (
              <>
                {[...Array(4)].map((_, index) => (
                  <tr key={index}>
                    <td>
                      <LazyCompanyLogo />
                    </td>
                    <td>
                      <LazyCompanyName />
                    </td>
                  </tr>
                ))}
              </>
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
                  updatedEntryPrice={updatedEntryPrice}
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
  updatedEntryPrice,
  handlePriceChange,
  handlePriceSubmit,
  handleKeyDown,
  handleEditClick,
  handleDeleteCompany,
  isUpdating,
}) => {
  const { data: closePriceData } = useQuery(
    ["closePrice", company.symbol],
    () => fetchClosePrice(company.symbol),
    {
      enabled: !isEditing || (isEditing && editingCompanyId === company.id),
    }
  );

  const formattedTradeData = tradeData ? tradeData.toFixed(2) : "";
  const displayPrice =
    isEditing && editingCompanyId === company.id
      ? formattedTradeData
      : formattedTradeData
      ? formattedTradeData
      : closePriceData
      ? closePriceData.c
      : "";

  return (
    <tr key={company.id} className="border-b border-gray-200">
      <td>
        <div className="flex items-center space-x-3">
          <div className="avatar">
            <div className="h-11 w-11 rounded-full">
              {logoUrl ? (
                <img src={logoUrl} alt="Company Logo" />
              ) : (
                generateLogoPlaceholder(company.symbol)
              )}
            </div>
          </div>
          <div>
            <div className="text-xs font-bold">
              <p className="mt-4 w-24 overflow-hidden text-ellipsis whitespace-nowrap">
                {company.name}
              </p>
            </div>
            <div className="text-sm opacity-50">{company.symbol}</div>
          </div>
        </div>
      </td>
      <td className="font-extrabold">
        <div className="-mt-1 text-base">{displayPrice}</div>
        <div className="flex text-xs">
          {/* <div className="-ml-3 font-bold">+20000</div>
          <div className="ml-1 w-7 font-bold">+50%</div> */}
        </div>
      </td>
      <td className="-ml-2 mt-3 flex items-center justify-center p-0 text-xs font-semibold">
        {isEditing && editingCompanyId === company.id ? (
          <input
            className="input-xs mt-3 w-20 rounded-md"
            type="number"
            value={updatedEntryPrice}
            onChange={handlePriceChange}
            onBlur={handlePriceSubmit}
            onKeyDown={handleKeyDown}
            autoFocus
            disabled={isUpdating}
          />
        ) : (
          <>
            <div className="mb-3 ml-2 text-base">{company.entryprice}</div>
            <span
              className="btn-ghost btn mb-1 ml-2 p-0 py-0 sm:btn-xs md:btn-xs lg:btn-lg"
              onClick={() => handleEditClick(company.id)}
            >
              <FaPencilAlt className="text-xs lg:text-base" />
            </span>
          </>
        )}
      </td>
      <th className="-ml-0 p-0">
        <button
          className="btn-ghost btn-sm btn p-0 sm:btn-xs md:btn-xs lg:btn-lg hover:bg-red-300"
          onClick={() => handleDeleteCompany(company.id)}
        >
          <RiDeleteBin7Line className="text-xs lg:text-lg" />
        </button>
      </th>
    </tr>
  );
};

export default StockTracker;
