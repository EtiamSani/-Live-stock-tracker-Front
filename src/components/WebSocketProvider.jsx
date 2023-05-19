import { useState, useEffect } from "react";
import WebSocketContext from "../APIServices/webSocketContext";
import fetchWatchList from "../APIServices/fetchWatchLists";

const WebSocketProvider = ({ children, currentWatchList }) => {
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [tradeData, setTradeData] = useState({});
  const [watchList, setWatchList] = useState([]);
  const [prevWatchList, setPrevWatchList] = useState([]);
  const base_url =
    "wss://ws.finnhub.io?token=cgc550hr01qsquh3egv0cgc550hr01qsquh3egvg";

  useEffect(() => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      // Se désabonner de chaque symbole de l'ancienne watchList
      prevWatchList.forEach((symbol) => {
        socket.send(JSON.stringify({ type: "unsubscribe", symbol: symbol }));
      });

      // S'abonner à chaque symbole de la nouvelle watchList
      watchList.forEach((symbol) => {
        socket.send(JSON.stringify({ type: "subscribe", symbol: symbol }));
      });

      // Mettre à jour la liste de surveillance précédente
      setPrevWatchList(watchList);
    }
  }, [currentWatchList, prevWatchList]); // Se déclenche chaque fois que watchList change

  useEffect(() => {
    const newSocket = new WebSocket(base_url);

    newSocket.addEventListener("open", function (event) {
      setIsConnected(true);
      // S'abonner à chaque symbole dans la watchList initiale
      watchList.forEach((symbol) => {
        newSocket.send(JSON.stringify({ type: "subscribe", symbol: symbol }));
      });
    });

    newSocket.addEventListener("close", function (event) {
      setIsConnected(false);
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

  return (
    <WebSocketContext.Provider value={{ tradeData, isConnected, socket }}>
      {children}
    </WebSocketContext.Provider>
  );
};
export default WebSocketProvider;
