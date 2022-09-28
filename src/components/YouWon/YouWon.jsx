// Libraries
import { useState, useEffect } from "react";

function YouWon({ puzzleId, guesses, correctGuesses }) {
  const [youWon, setYouWon] = useState(false);

  useEffect(() => {
    // console.log(`youlost1: ${puzzleId}`);
  }, []);

  useEffect(() => {
    // console.log(`youwon2: ${puzzleId}`);
  }, [puzzleId]);

  useEffect(() => {
    if (correctGuesses && correctGuesses.length > 5) {
      setYouWon(true);
      // localStorage.setItem(
      //   `${puzzleId}-wl`,
      //   JSON.stringify({ youWon: youWon })
      // );
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
