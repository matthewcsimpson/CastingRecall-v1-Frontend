import { useEffect, useState } from "react";
import axios from "axios";

/**
 * Fetches TMDB genre metadata and keeps it cached in state for reuse across components.
 * @param {string} genreUrl Base URL for the TMDB genre endpoint.
 * @param {string} apiKey TMDB API key used for authenticated requests.
 * @returns {Array<{id: number, name: string}>|null} Array of genre objects once loaded, otherwise null while pending.
 */
const useGenres = (genreUrl, apiKey) => {
  const [genreData, setGenreData] = useState(null);

  useEffect(() => {
    if (!genreUrl || !apiKey) {
      return;
    }

    const controller = new AbortController();

    const fetchGenres = async () => {
      try {
        const response = await axios.get(
          `${genreUrl}?api_key=${apiKey}&language=en-US`,
          { signal: controller.signal }
        );
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
  }, [apiKey, genreUrl]);

  return genreData;
};

export default useGenres;
