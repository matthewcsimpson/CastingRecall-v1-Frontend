import { useCallback, useEffect, useMemo, useState } from "react";

const DEFAULT_MAX_GUESSES = 10;

const useGuessState = (puzzleData) => {
  const [guesses, setGuesses] = useState([]);
  const [youWon, setYouWon] = useState(false);
  const [youLost, setYouLost] = useState(false);
  const maxGuesses = DEFAULT_MAX_GUESSES;

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
    if (!puzzleData?.puzzleId) {
      setGuesses([]);
      setYouWon(false);
      setYouLost(false);
      return;
    }

    try {
      const local = JSON.parse(localStorage.getItem(puzzleData.puzzleId));

      if (local && String(local.id) === String(puzzleData.puzzleId)) {
        setGuesses(local.guesses || []);
        setYouWon(Boolean(local.youWon));
        setYouLost(Boolean(local.youLost));
        return;
      }
    } catch (err) {
      console.error(err);
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
