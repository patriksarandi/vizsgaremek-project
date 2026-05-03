import { API_BASE_URL } from "../lib/api";
import { useEffect, useState } from "react";

export const useFetchData = (endpoint, headers) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    if (!endpoint) return;

    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
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
