import { useEffect, useState } from "react";
import axios from "axios";
import { API_ENDPOINTS } from "constants/config";

/**
 * Retrieves puzzle payloads from the Casting Recall API and exposes them to consumers.
 * Automatically refreshes whenever the target puzzleId changes.
 * @param {string} apiUrl Base API URL for puzzle requests.
 * @param {string|undefined} puzzleId Specific puzzle identifier or undefined for the latest puzzle.
 * @returns {{data: object|null, isLoading: boolean}} Puzzle payload and loading flag.
 */
const usePuzzleData = (apiUrl, puzzleId) => {
  const [state, setState] = useState({ data: null, isLoading: true });

  useEffect(() => {
    if (!apiUrl) {
      return;
    }

    const controller = new AbortController();
    const activePuzzleId = puzzleId || "latest";

    const fetchPuzzle = async () => {
      try {
        setState((prev) => ({ ...prev, isLoading: true }));
        const response = await axios.get(
          `${apiUrl}${API_ENDPOINTS.puzzleId.replace(
            ":puzzleId",
            activePuzzleId
          )}`,
          {
            signal: controller.signal,
          }
        );
        setState({ data: response.data, isLoading: false });
      } catch (err) {
        if (axios.isCancel(err) || err.name === "CanceledError") {
          return;
        }
        console.error(err);
        setState((prev) => ({ ...prev, isLoading: false }));
      }
    };

    fetchPuzzle();

    return () => {
      controller.abort();
    };
  }, [apiUrl, puzzleId]);

  return state;
};

export default usePuzzleData;
