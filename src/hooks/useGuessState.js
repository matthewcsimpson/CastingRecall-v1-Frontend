import { useCallback, useEffect, useMemo, useState } from "react";
import { loadLocalJson, saveLocalJson } from "../utilities";

export const MAX_GUESSES = 10;

/**
 * Reads the persisted guess state for a specific puzzle from localStorage.
 * @param {string} puzzleId Identifier for the puzzle whose state should be loaded.
 * @param {{silent?: boolean}} [options] Optional flags to control error handling.
 * @returns {{id: string, guesses: Array, youWon: boolean, youLost: boolean}|{__err: true}|null} Stored state payload, error marker, or null when absent.
 */
export const getStoredGuessState = (puzzleId, { silent = false } = {}) => {
  if (!puzzleId) {
    return null;
  }

  let parseFailed = false;

  const stored = loadLocalJson(puzzleId, null, {
    silent,
    onError: () => {
      parseFailed = true;
    },
  });

  if (parseFailed) {
    return { __err: true };
  }

  if (!stored || String(stored.id) !== String(puzzleId)) {
    return null;
  }

  return stored;
};

/**
 * Manages guess submission state, win/loss detection, and persistence for a puzzle run.
 * @param {{puzzle: Array, puzzleId: string}|null} puzzleData The active puzzle payload being played.
 * @returns {object} Aggregated state, counters, and handlers for guesses and hints.
 */
const createInitialGuessState = () => ({
  guesses: [],
  youWon: false,
  youLost: false,
});

const useGuessState = (puzzleData) => {
  const [state, setState] = useState(createInitialGuessState);
  const { guesses, youWon, youLost } = state;
  const maxGuesses = MAX_GUESSES;

  const { correctCount, incorrectCount } = useMemo(() => {
    return guesses.reduce(
      (acc, guess) => {
        if (guess.correct === true) {
          acc.correctCount += 1;
        } else if (guess.correct === false) {
          acc.incorrectCount += 1;
        }
        return acc;
      },
      { correctCount: 0, incorrectCount: 0 }
    );
  }, [guesses]);
  const totalGuesses = guesses.length;

  /**
   * Adds a user's movie guess to the local guess log, marking correctness based on the current puzzle.
   * @param {{id: number, title: string}} movie Movie guess returned from search.
   */
  const handleSubmitGuess = useCallback(
    (movie) => {
      if (!puzzleData?.puzzle) {
        return;
      }

      setState((prev) => {
        const match = puzzleData.puzzle.find(
          (puzzleMovie) => puzzleMovie.id === movie.id
        );

        const nextGuess = match
          ? { ...match, correct: true }
          : { ...movie, correct: false };

        return {
          ...prev,
          guesses: [...prev.guesses, nextGuess],
        };
      });
    },
    [puzzleData]
  );

  /**
   * Records a hint usage as a neutral guess entry, reducing the remaining guess allotment.
   * @param {number|string} movieId Identifier of the movie the hint is tied to.
   * @param {string} hintType Logical key describing the hint requested.
   * @returns {boolean} True when the hint was counted, false if spending was denied.
   */
  const handleHintUse = useCallback(
    (movieId, hintType) => {
      if (!puzzleData?.puzzle || youWon || youLost) {
        return false;
      }

      let allowed = true;

      setState((prev) => {
        if (prev.guesses.length >= maxGuesses) {
          allowed = false;
          return prev;
        }

        const hintGuess = {
          id: `hint-${movieId}-${hintType}-${Date.now()}`,
          type: "hint",
          hintType,
          movieId,
          correct: null,
        };

        return {
          ...prev,
          guesses: [...prev.guesses, hintGuess],
        };
      });

      return allowed;
    },
    [maxGuesses, puzzleData, youLost, youWon]
  );

  useEffect(() => {
    if (correctCount === 6 && !youWon) {
      setState((prev) => {
        if (prev.youWon) {
          return prev;
        }
        return { ...prev, youWon: true };
      });
      return;
    }

    if (!youWon && totalGuesses >= maxGuesses && !youLost) {
      setState((prev) => {
        if (prev.youLost) {
          return prev;
        }
        return { ...prev, youLost: true };
      });
      return;
    }

    if (totalGuesses === 0 && (youWon || youLost)) {
      setState((prev) => {
        if (!prev.youWon && !prev.youLost) {
          return prev;
        }
        return { ...prev, youWon: false, youLost: false };
      });
    }
  }, [correctCount, maxGuesses, totalGuesses, youLost, youWon]);

  useEffect(() => {
    const stored = getStoredGuessState(puzzleData?.puzzleId);

    if (stored && !stored.__err) {
      setState({
        guesses: Array.isArray(stored.guesses) ? stored.guesses : [],
        youWon: Boolean(stored.youWon),
        youLost: Boolean(stored.youLost),
      });
      return;
    }

    setState(createInitialGuessState());
  }, [puzzleData]);

  useEffect(() => {
    if (!puzzleData?.puzzleId) {
      return;
    }

    const payload = {
      id: puzzleData.puzzleId,
      guesses,
      youWon,
      youLost,
    };

    saveLocalJson(puzzleData.puzzleId, payload);
  }, [guesses, puzzleData, youLost, youWon]);

  return {
    guesses,
    youWon,
    youLost,
    correctCount,
    incorrectCount,
    totalGuesses,
    maxGuesses,
    handleSubmitGuess,
    handleHintUse,
  };
};

export default useGuessState;
