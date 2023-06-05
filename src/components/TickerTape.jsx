import React, { useEffect } from "react";

const TickerTape = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js";
    script.async = true;
    script.innerHTML = `
          {
            "symbols": [
              {
                "proName": "FOREXCOM:SPXUSD",
                "title": "S&P 500"
              },
              {
                "proName": "FOREXCOM:NSXUSD",
                "title": "US 100"
              },
              {
                "proName": "FX_IDC:EURUSD",
                "title": "EUR/USD"
              },
              {
                "proName": "BITSTAMP:BTCUSD",
                "title": "Bitcoin"
              },
              {
                "proName": "BITSTAMP:ETHUSD",
                "title": "Ethereum"
              }
            ],
            "showSymbolLogo": true,
            "colorTheme": "light",
            "isTransparent": false,
            "displayMode": "adaptive",
            "locale": "fr"
          }
        `;
    document.getElementById("tradingview-widget-container").appendChild(script);
  }, []);

  return (
    <div>
      <div
        id="tradingview-widget-container"
        className="tradingview-widget-container"
      >
        <div className="tradingview-widget-container__widget"></div>
      </div>
    </div>
  );
};

export default TickerTape;
