import { useMemo } from "react";
import { getStoredGuessState, MAX_GUESSES } from "./useGuessState";

const usePuzzleStatuses = (puzzleList) => {
  return useMemo(() => {
    if (!Array.isArray(puzzleList) || puzzleList.length === 0) {
      return {};
    }

    return puzzleList.reduce((acc, { puzzleId }) => {
      const stored = getStoredGuessState(puzzleId);

      if (!stored) {
        acc[puzzleId] = "Not yet attempted!";
        return acc;
      }

      if (stored.__error) {
        acc[puzzleId] = "Progress unavailable.";
        return acc;
      }

      const guesses = Array.isArray(stored.guesses) ? stored.guesses : [];
      const correct = guesses.filter((guess) => guess.correct === true).length;
      const total = guesses.length;
      const guessesLeft = Math.max(0, MAX_GUESSES - total);

      if (stored.youWon) {
        acc[puzzleId] = `Solved in ${total} guesses!`;
      } else if (stored.youLost) {
        acc[puzzleId] = `Failed, but you got ${correct} right!`;
      } else {
        acc[puzzleId] = `In progress, with ${guessesLeft} guesses left...`;
      }

      return acc;
    }, {});
  }, [puzzleList]);
};

export default usePuzzleStatuses;
