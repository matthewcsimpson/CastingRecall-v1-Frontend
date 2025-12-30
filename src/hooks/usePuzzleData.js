import { useEffect, useState } from "react";
import axios from "axios";

/**
 * Retrieves puzzle payloads from the Casting Recall API and exposes them to consumers.
 * Automatically refreshes whenever the target puzzleId changes.
 * @param {string} apiUrl Base API URL for puzzle requests.
 * @param {string|undefined} puzzleId Specific puzzle identifier or undefined for the latest puzzle.
 * @returns {object|null} Puzzle data returned by the API or null while loading.
 */
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
