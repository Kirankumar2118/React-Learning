import { useEffect, useState } from "react";

function useCurrencyInfo(currency) {
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchCurrencies = async () => {
      try {
        const response = await fetch(
          `https://open.er-api.com/v6/latest/${currency.toUpperCase()}`,
        );

        const result = await response.json();

        setData(result.rates || {});
      } catch (error) {
        console.error("Error fetching currency data:", error);
      }
    };

    fetchCurrencies();
  }, [currency]);

  return data;
}

export default useCurrencyInfo;
