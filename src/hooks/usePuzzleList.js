import { useEffect, useState } from "react";
import axios from "axios";
import { API_ENDPOINTS } from "../constants/config";

/**
 * Retrieves the full puzzle list from the Casting Recall API.
 * @param {string} apiUrl Base API URL for list requests.
 * @returns {{data: Array<object>|null, isLoading: boolean}} Puzzle collection and loading flag.
 */
const usePuzzleList = (apiUrl) => {
  const [state, setState] = useState({
    data: null,
    isLoading: true,
  });

  useEffect(() => {
    if (!apiUrl) {
      return;
    }

    const controller = new AbortController();

    const fetchPuzzleList = async () => {
      try {
        setState((prev) => ({ ...prev, isLoading: true }));
        const response = await axios.get(
          `${apiUrl}${API_ENDPOINTS.puzzleList}`,
          {
            signal: controller.signal,
          }
        );

        const { puzzles } = response?.data ?? {};
        const list = Array.isArray(puzzles)
          ? puzzles
          : Array.isArray(response?.data)
          ? response.data
          : [response?.data].filter(Boolean);

        setState({
          data: list,
          isLoading: false,
        });
      } catch (err) {
        if (axios.isCancel(err) || err.name === "CanceledError") {
          return;
        }
        console.error(err);
        setState((prev) => ({ ...prev, isLoading: false }));
      }
    };

    fetchPuzzleList();

    return () => {
      controller.abort();
    };
  }, [apiUrl]);

  return state;
};

export default usePuzzleList;
