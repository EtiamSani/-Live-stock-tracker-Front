import { useState, useEffect } from "react";
import WebSocketContext from "../APIServices/webSocketContext";
import fetchWatchList from "../APIServices/fetchWatchLists";

const WebSocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [tradeData, setTradeData] = useState({});
  const base_url =
    "wss://ws.finnhub.io?token=cgc550hr01qsquh3egv0cgc550hr01qsquh3egvg";

  useEffect(() => {
    const newSocket = new WebSocket(base_url);

    newSocket.addEventListener("open", function (event) {
      setIsConnected(true); // Le WebSocket est maintenant connecté
      fetchSymbols(newSocket);
    });

    newSocket.addEventListener("close", function (event) {
      setIsConnected(false); // Le WebSocket est maintenant déconnecté
    });

    newSocket.addEventListener("message", function (event) {
      const message = JSON.parse(event.data);
      if (message && message.data && message.data[0]) {
        const trade = JSON.parse(event.data);
        setTradeData((prevTradeData) => ({
          ...prevTradeData,
          [trade.data[0].s]: trade.data[0].p,
        }));
      } else {
        console.error("Received malformed message:", message);
      }
    });

    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, []);

  const fetchSymbols = async (socket) => {
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

  return (
    <WebSocketContext.Provider value={{ tradeData, isConnected, socket }}>
      {children}
    </WebSocketContext.Provider>
  );
};
export default WebSocketProvider;
