import { useState, useEffect } from "react";
import { TbMoneybag } from "react-icons/tb";

const SearchBar = ({ refetch }) => {
  const [input, setInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const base_url = "https://stock-tracker-api.up.railway.app";

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const response = await fetch(base_url + "/tickersearch/" + input);
      const result = await response.json();
      setData(result); // Fetching the 'result' array from the response
      setLoading(false);
    };

    if (input) {
      fetchData();
    }
  }, [input]);

  useEffect(() => {
    if (input.length > 0) {
      const regex = new RegExp(`^${input}`, "i");
      const matches = data.filter((v) => regex.test(v.name));
      setSuggestions(matches);
    } else {
      setSuggestions([]);
    }
  }, [input, data]);

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleSuggestionClick = async (suggestion) => {
    setInput("");
    setSuggestions([]);
    setShowSuggestions(false); // Fermer les suggestions après le clic

    // Create a new object with the data to send
    const dataToSend = {
      symbol: suggestion.symbol,
      name: suggestion.name,
      logo: suggestion.logo,
    };

    const selectedId = localStorage.getItem("selectedId");
    // Send a POST request
    const response = await fetch(base_url + "/company", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataToSend),
    });

    // Inspect the response
    if (!response.ok) {
      const message = `An error has occured: ${response.status}`;
      throw new Error(message);
    }

    // Get the response data (assuming it is json)
    const responseData = await response.json();

    // Use the id from the response to make another request
    if (responseData && responseData.id) {
      const attachResponse = await fetch(
        `https://stock-tracker-api.up.railway.app/watchlist/${selectedId}/company/${responseData.id}`,
        {
          method: "POST", // or whatever HTTP method is needed
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Check if the request was successful
      if (!attachResponse.ok) {
        console.error(
          `Error attaching company to watchlist: ${attachResponse.statusText}`
        );
      } else if (typeof refetch === "function") {
        refetch();
      }
    }
  };

  return (
    <div className="flex justify-center">
      <div className="relative w-full max-w-xs lg:max-w-xl">
        <input
          type="text"
          value={input}
          onChange={handleChange}
          placeholder="Ticker..."
          className="input-bordered input-primary input w-full"
        />
        {loading ? (
          <div className="absolute  flex h-full w-full items-center justify-center rounded-md bg-blue-100">
            <div>
              <TbMoneybag className="spinner text-xl" />
            </div>
          </div>
        ) : (
          suggestions.length > 0 && (
            <ul className="absolute z-20 w-full rounded-b border border-t-0 border-gray-300 bg-white">
              {suggestions.map((suggestion, i) => (
                <li
                  key={suggestion.symbol}
                  className="cursor-pointer p-2 hover:bg-gray-200"
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  <div className="flex items-center">
                    <div className="flex items-center">
                      <div className=" truncate ">{suggestion.name}</div>{" "}
                      <div className="ml-1 text-right text-sm font-bold">
                        {" "}
                        {suggestion.symbol}
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )
        )}
      </div>
    </div>
  );
};

export default SearchBar;
