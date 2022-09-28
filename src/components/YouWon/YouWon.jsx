// Libraries
import { useState, useEffect } from "react";

function YouWon({ puzzleId, guesses, correctGuesses }) {
  const [youWon, setYouWon] = useState(false);

  useEffect(() => {
    let checkData = JSON.parse(localStorage.getItem(`${puzzleId}-wl`));
    if (checkData) {
      console.log(checkData);
    } else {
      localStorage.setItem(
        `${puzzleId}-wl`,
        JSON.stringify({ puzzleId: puzzleId, youWon: youWon })
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    localStorage.setItem(
      `${puzzleId}-wl`,
      JSON.stringify({ puzzleId: puzzleId, youWon: youWon })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [youWon]);

  useEffect(() => {
    setYouWon(false);
  }, [puzzleId]);

  useEffect(() => {
    if (correctGuesses && correctGuesses.length > 5) {
      setYouWon(true);
    }
  }, [correctGuesses]);

  return (
    <>
      {youWon && (
        <div className="youwon">
          <div className="youwon__wrapper">
            <h2 className="youwon__heading">CONGRATULATIONS, YOU WON!</h2>
            <h2 className="youwon__subheading">{`And it only took you ${guesses.length} guesses`}</h2>
          </div>
        </div>
      )}
    </>
  );
}

export default YouWon;
