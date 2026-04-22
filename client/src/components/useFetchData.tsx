import { useEffect, useState } from "react";

export const useFetchData = (endpoint, headers) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    if (!endpoint) return;

    setLoading(true);
    try {
      const response = await fetch(`http://localhost:7777${endpoint}`, {
        method: "GET",
        headers: headers,
      });
      const data = await response.json();
      setData(data);
    } catch (error) {
      console.error("Hiba az adatok letöltésekor:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [endpoint]);

  return { data, loading, refresh: fetchData };
};
