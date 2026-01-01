import { useEffect, useState } from "react";
import axios from "axios";

/**
 * Fetches TMDB genre metadata and keeps it cached in state for reuse across components.
 * @param {string} genreUrl Base URL for the TMDB genre endpoint.
 * @param {string} bearerToken TMDB bearer token used for authenticated requests.
 * @returns {Array<{id: number, name: string}>|null} Array of genre objects once loaded, otherwise null while pending.
 */
const useGenres = (genreUrl, bearerToken) => {
  const [genreData, setGenreData] = useState(null);

  useEffect(() => {
    if (!genreUrl || !bearerToken) {
      return;
    }

    const controller = new AbortController();

    const fetchGenres = async () => {
      try {
        const response = await axios.get(`${genreUrl}?language=en-US`, {
          signal: controller.signal,
          headers: {
            Authorization: `Bearer ${bearerToken}`,
            Accept: "application/json",
          },
        });
        setGenreData(response.data.genres);
      } catch (err) {
        if (axios.isCancel(err) || err.name === "CanceledError") {
          return;
        }
        console.error(err);
      }
    };

    fetchGenres();

    return () => {
      controller.abort();
    };
  }, [bearerToken, genreUrl]);

  return genreData;
};

export default useGenres;
