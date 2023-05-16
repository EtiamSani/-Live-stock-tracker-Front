import { useState, useEffect } from "react";
import { TbMoneybag } from "react-icons/tb";

const SearchBar = () => {
  const [input, setInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const base_url = "http://localhost:3000";

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const response = await fetch(base_url + "/tickersearch/" + input);
      const result = await response.json();
      setData(result.result); // Fetching the 'result' array from the response
      setLoading(false);
    };

    if (input) {
      fetchData();
    }
  }, [input]);

  useEffect(() => {
    if (input.length > 0) {
      const regex = new RegExp(`^${input}`, "i");
      const matches = data.filter((v) => regex.test(v.displaySymbol));
      setSuggestions(matches);
    } else {
      setSuggestions([]);
    }
  }, [input, data]);

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleSuggestionClick = async (suggestion) => {
    setInput(suggestion.displaySymbol);
    setSuggestions([]);

    // Create a new object with the data to send
    const dataToSend = {
      symbol: suggestion.displaySymbol,
      name: suggestion.description,
    };

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

    const responseJson = await response.json();
    console.log(responseJson);
  };

  return (
    <div className="flex justify-center">
      <div className="relative w-full max-w-xs lg:max-w-xl">
        <input
          type="text"
          value={input}
          onChange={handleChange}
          placeholder="Type here"
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
            <ul className="absolute z-10 w-full rounded-b border border-t-0 border-gray-300 bg-white">
              {suggestions.map((suggestion, i) => (
                <li
                  key={suggestion.symbol}
                  className="cursor-pointer p-2 hover:bg-gray-200"
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  {suggestion.displaySymbol} - {suggestion.description} -{" "}
                  {suggestion.type}
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
