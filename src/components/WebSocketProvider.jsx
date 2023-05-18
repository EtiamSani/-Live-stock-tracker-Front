import WebSocketContext from "../APIServices/webSocketContext";
import { useEffect, useState } from "react";
import fetchWatchList from "../APIServices/fetchWatchLists";

const WebSocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const base_url =
    "wss://ws.finnhub.io?token=cgc550hr01qsquh3egv0cgc550hr01qsquh3egvg";

  const fetchSymbols = async (newSocket) => {
    try {
      // Récupérer la liste de surveillance depuis votre backend
      const watchlist = await fetchWatchList();
      const symbols = watchlist.map((company) => company.symbol);

      newSocket.addEventListener("open", function (event) {
        symbols.forEach((symbol) => {
          newSocket.send(JSON.stringify({ type: "subscribe", symbol }));
        });
      });
    } catch (error) {
      console.error("Error fetching watchlist", error);
    }
  };

  useEffect(() => {
    const newSocket = new WebSocket(base_url);

    newSocket.addEventListener("open", function (event) {
      setIsConnected(true); // Le WebSocket est maintenant connecté
    });

    newSocket.addEventListener("close", function (event) {
      setIsConnected(false); // Le WebSocket est maintenant déconnecté
    });

    setSocket(newSocket);
    fetchSymbols(newSocket);

    return () => {
      newSocket.close();
    };
  }, []);

  useEffect(() => {
    if (isConnected && socket) {
      fetchSymbols(socket);
    }
  }, [isConnected, socket]);

  return (
    <WebSocketContext.Provider value={socket}>
      {children}
    </WebSocketContext.Provider>
  );
};

export default WebSocketProvider;
