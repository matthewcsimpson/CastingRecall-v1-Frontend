import { useEffect, useState } from "react";
import axios from "axios";

/**
 * Retrieves the full puzzle list from the Casting Recall API.
 * @param {string} apiUrl Base API URL for list requests.
 * @param {{page?: number, pageSize?: number}} [options] Pagination controls for the list request.
 * @returns {{data: Array<object>|null, pagination: object|null, isLoading: boolean}} Puzzle collection, pagination data, and loading flag.
 */
const usePuzzleList = (apiUrl, { page = 1, pageSize = 20 } = {}) => {
  const [state, setState] = useState({
    data: null,
    pagination: null,
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
        const response = await axios.get(`${apiUrl}/puzzle/list`, {
          params: { page, pageSize },
          signal: controller.signal,
        });

        const { puzzles, pagination } = response?.data ?? {};
        const list = Array.isArray(puzzles)
          ? puzzles
          : Array.isArray(response?.data)
          ? response.data
          : [response?.data].filter(Boolean);

        setState({
          data: list,
          pagination: pagination ?? null,
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
  }, [apiUrl, page, pageSize]);

  return state;
};

export default usePuzzleList;
