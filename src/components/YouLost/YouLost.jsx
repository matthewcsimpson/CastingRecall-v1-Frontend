//Libraries
import { useState, useEffect } from "react";

function YouLost({ puzzleId, guesses }) {
  const [youLost, setYouLost] = useState(false);

  useEffect(() => {
    let checkData = JSON.parse(localStorage.getItem(`${puzzleId}-wl`));
    if (checkData) {
      // console.log(checkData);
    } else {
      localStorage.setItem(
        `${puzzleId}-wl`,
        JSON.stringify({ puzzleId: puzzleId, youLost: youLost })
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    localStorage.setItem(
      `${puzzleId}-wl`,
      JSON.stringify({ puzzleId: puzzleId, youLost: youLost })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [youLost]);

  useEffect(() => {
    setYouLost(false);
  }, [puzzleId]);

  useEffect(() => {
    if (guesses && guesses.length > 9) {
      setYouLost(true);
    }
  }, [guesses]);

  // console.log(youLost);

  return (
    <>
      {youLost && (
        <div className="youlost">
          <div className="youlost__wrapper">
            <h2 className="youlost__heading">You didn't get this one!</h2>
            <h2 className="youlost__subheading">Better luck next time!</h2>
          </div>
        </div>
      )}
    </>
  );
}

export default YouLost;
