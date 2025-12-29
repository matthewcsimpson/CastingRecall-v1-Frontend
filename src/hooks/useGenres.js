import { useEffect, useState } from "react";
import axios from "axios";

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
