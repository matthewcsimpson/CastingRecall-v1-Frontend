// Styles
import "./ListPage.scss";

// Components
import { LoadingScreen, PuzzleListItem, SiteNav } from "../../components";

// Libraries
import { useMemo } from "react";

const MAX_GUESSES = 10;

function ListPage({ puzzleList }) {
  const hasPuzzles = Array.isArray(puzzleList) && puzzleList.length > 0;
  const statusByPuzzleId = useMemo(() => {
    if (!Array.isArray(puzzleList) || puzzleList.length === 0) {
      return {};
    }

    return puzzleList.reduce((acc, { puzzleId }) => {
      try {
        const local = JSON.parse(localStorage.getItem(puzzleId));

        if (!local) {
          acc[puzzleId] = "Not yet attempted!";
          return acc;
        }

        const guesses = Array.isArray(local.guesses) ? local.guesses : [];
        const correct = guesses.filter(
          (guess) => guess.correct === true
        ).length;
        const total = guesses.length;
        const guessesLeft = Math.max(0, MAX_GUESSES - total);

        if (local.youWon) {
          acc[puzzleId] = `Solved in ${total} guesses!`;
        } else if (local.youLost) {
          acc[puzzleId] = `Failed, but you got ${correct} right!`;
        } else {
          acc[puzzleId] = `In progress, with ${guessesLeft} guesses left...`;
        }
      } catch (err) {
        console.error(err);
        acc[puzzleId] = "Progress unavailable.";
      }

      return acc;
    }, {});
  }, [puzzleList]);

  return (
    <>
      {hasPuzzles ? (
        <SiteNav puzzleId={"list"} puzzleList={puzzleList} />
      ) : (
        <LoadingScreen />
      )}
      <div className="listpage__listcontainer">
        {hasPuzzles &&
          puzzleList.map(({ puzzleId, keyPeople }, index) => (
            <PuzzleListItem
              key={puzzleId}
              puzznum={index}
              puzzleId={puzzleId}
              keyPeople={keyPeople}
              status={statusByPuzzleId[puzzleId]}
            />
          ))}
      </div>
    </>
  );
}

export default ListPage;
