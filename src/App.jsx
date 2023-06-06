import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import LoginPage from "./pages/LoginPage";
import StockTracker from "./pages/StockTracker";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import WebSocketProvider from "./components/WebSocketProvider";
import HomePage from "./pages/HomePage";
import fetchCompaniesInWatchLists from "./APIServices/fetchCompaniesInWatchList";
import { useState, useEffect } from "react";
import PersonalInformationPage from "./pages/PersonalInformationPage";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      cacheTime: Infinity,
    },
  },
});

const App = () => {
  const [currentWatchList, setCurrentWatchList] = useState([]);

  useEffect(() => {
    fetchCompaniesInWatchLists().then(setCurrentWatchList);
  }, []);
  return (
    <WebSocketProvider currentWatchList={currentWatchList}>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <div>
            <NavBar />
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/watchlists" element={<StockTracker />} />
              <Route path="/" element={<HomePage />} />
              <Route path="/mon-compte" element={<PersonalInformationPage />} />
            </Routes>
          </div>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </BrowserRouter>
    </WebSocketProvider>
  );
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
