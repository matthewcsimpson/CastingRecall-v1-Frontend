import { useEffect, useState } from "react";
import axios from "axios";

const usePuzzleData = (apiUrl, puzzleId) => {
  const [puzzleData, setPuzzleData] = useState(null);

  useEffect(() => {
    if (!apiUrl) {
      return;
    }

    const controller = new AbortController();
    const activePuzzleId = puzzleId || "latest";

    const fetchPuzzle = async () => {
      try {
        setPuzzleData(null);
        const response = await axios.get(`${apiUrl}/puzzle/${activePuzzleId}`, {
          signal: controller.signal,
        });
        setPuzzleData(response.data);
      } catch (err) {
        if (axios.isCancel(err) || err.name === "CanceledError") {
          return;
        }
        console.error(err);
      }
    };

    fetchPuzzle();

    return () => {
      controller.abort();
    };
  }, [apiUrl, puzzleId]);

  return puzzleData;
};

export default usePuzzleData;
