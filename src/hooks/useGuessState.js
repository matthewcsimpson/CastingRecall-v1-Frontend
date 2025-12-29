import { useCallback, useEffect, useMemo, useState } from "react";

export const MAX_GUESSES = 10;

export const getStoredGuessState = (puzzleId, { silent = false } = {}) => {
  if (!puzzleId) {
    return null;
  }

  try {
    const raw = localStorage.getItem(puzzleId);
    const stored = raw ? JSON.parse(raw) : null;

    if (!stored || String(stored.id) !== String(puzzleId)) {
      return null;
    }

    return stored;
  } catch (err) {
    if (!silent) {
      console.error(err);
    }
    return { __error: true };
  }
};

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

  useEffect(() => {
    if (correctCount === 6 && !youWon) {
      setYouWon(true);
      return;
    }

    if (incorrectCount === maxGuesses && !youLost) {
      setYouLost(true);
      return;
    }

    if (totalGuesses === 0 && (youWon || youLost)) {
      setYouWon(false);
      setYouLost(false);
    }
  }, [correctCount, incorrectCount, maxGuesses, totalGuesses, youLost, youWon]);

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

    try {
      localStorage.setItem(puzzleData.puzzleId, JSON.stringify(payload));
    } catch (err) {
      console.error(err);
    }
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
  };
};

export default useGuessState;
