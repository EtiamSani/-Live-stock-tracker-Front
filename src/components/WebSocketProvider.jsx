import WebSocketContext from "../APIServices/webSocketContext";
import { useEffect, useState } from "react";
import fetchWatchList from "../APIServices/fetchWatchLists";

const WebSocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false); // État de connexion du WebSocket
  const base_url =
    "wss://ws.finnhub.io?token=cgc550hr01qsquh3egv0cgc550hr01qsquh3egvg";

  useEffect(() => {
    const newSocket = new WebSocket(base_url);

    newSocket.addEventListener("open", function (event) {
      setIsConnected(true); // Le WebSocket est maintenant connecté
    });

    newSocket.addEventListener("close", function (event) {
      setIsConnected(false); // Le WebSocket est maintenant déconnecté
    });

    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, []);

  useEffect(() => {
    if (isConnected) {
      const fetchSymbols = async () => {
        try {
          // Récupérer la liste de surveillance depuis votre backend
          const watchlist = await fetchWatchList();
          const symbols = watchlist.map((company) => company.symbol);

          symbols.forEach((symbol) => {
            socket.send(JSON.stringify({ type: "subscribe", symbol }));
          });
        } catch (error) {
          console.error("Error fetching watchlist", error);
        }
      };

      fetchSymbols();
    }
  }, [isConnected, socket]);

  return (
    <WebSocketContext.Provider value={socket}>
      {children}
    </WebSocketContext.Provider>
  );
};

export default WebSocketProvider;
