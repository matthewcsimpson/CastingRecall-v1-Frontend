import { useCallback, useEffect, useMemo, useState } from "react";
import { loadLocalJson, saveLocalJson } from "../utilities";

export const MAX_GUESSES = 10;

/**
 * Reads the persisted guess state for a specific puzzle from localStorage.
 * @param {string} puzzleId Identifier for the puzzle whose state should be loaded.
 * @param {{silent?: boolean}} [options] Optional flags to control error handling.
 * @returns {{id: string, guesses: Array, youWon: boolean, youLost: boolean}|{__error: true}|null} Stored state payload, error marker, or null when absent.
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
    return { __error: true };
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
const useGuessState = (puzzleData) => {
  const [guesses, setGuesses] = useState([]);
  const [youWon, setYouWon] = useState(false);
  const [youLost, setYouLost] = useState(false);
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

      setGuesses((prevGuesses) => {
        const match = puzzleData.puzzle.find(
          (puzzleMovie) => puzzleMovie.id === movie.id
        );

        if (match) {
          return [...prevGuesses, { ...match, correct: true }];
        }

        return [...prevGuesses, { ...movie, correct: false }];
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

      setGuesses((prevGuesses) => {
        if (prevGuesses.length >= maxGuesses) {
          allowed = false;
          return prevGuesses;
        }

        const hintGuess = {
          id: `hint-${movieId}-${hintType}-${Date.now()}`,
          type: "hint",
          hintType,
          movieId,
          correct: null,
        };

        return [...prevGuesses, hintGuess];
      });

      return allowed;
    },
    [maxGuesses, puzzleData, youLost, youWon]
  );

  useEffect(() => {
    if (correctCount === 6 && !youWon) {
      setYouWon(true);
      return;
    }

    if (!youWon && totalGuesses >= maxGuesses && !youLost) {
      setYouLost(true);
      return;
    }

    if (totalGuesses === 0 && (youWon || youLost)) {
      setYouWon(false);
      setYouLost(false);
    }
  }, [correctCount, maxGuesses, totalGuesses, youLost, youWon]);

  useEffect(() => {
    const stored = getStoredGuessState(puzzleData?.puzzleId);

    if (stored && !stored.__error) {
      setGuesses(stored.guesses || []);
      setYouWon(Boolean(stored.youWon));
      setYouLost(Boolean(stored.youLost));
      return;
    }

    setGuesses([]);
    setYouWon(false);
    setYouLost(false);
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
