// Styles
import "./PuzzleListItem.scss";

// Utilities
import { firstNameOnly } from "../../utilities/utilities";

// Libraries
import { useEffect, useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";

function PuzzleListItem({ puzznum, puzzle }) {
  const [puzzleData, setPuzzleData] = useState(null);
  const [status, setStatus] = useState("");
  const REACT_APP_API_REMOTE_URL = process.env.REACT_APP_API_REMOTE_URL;

  /**
   * Function to retrieve a specific puzzle.
   * @param {*} id
   */
  const getSpecificPuzzle = async (id) => {
    await axios
      .get(`${REACT_APP_API_REMOTE_URL}/puzzle/${id}`)
      .then((res) => setPuzzleData(res.data))
      .catch((err) => console.error(err));
  };

  /**
   * Retrieve locally stored progress details, if any.
   */
  const getLocalDetails = () => {
    if (puzzle) {
      let local = JSON.parse(localStorage.getItem(puzzle));

      if (local) {
        let correctCounter = local.guesses.filter(
          (guess) => guess.correct === true
        );
        if (local.youWon === true) {
          setStatus(`Solved in ${correctCounter.length} guesses!`);
        } else if (local.youLost === true) {
          setStatus(`Failed, but you got ${correctCounter.length} right!`);
        } else {
          setStatus(
            `In progress, with ${10 - correctCounter.length} guesses left...`
          );
        }
      } else {
        setStatus("Not yet attempted!");
      }
    }
  };

  useEffect(() => {
    getSpecificPuzzle(puzzle);
    getLocalDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="puzzlelist">
        <div className="puzzlelist__wrapper">
          <NavLink to={`/puzzle/${puzzle}`}>
            <div className="puzzlelist__puzzlewrapper">
              <p className="puzzlelist__number puzzlelist__text">
                Puzzle #{puzznum + 1}:
              </p>
              <div className="puzzlelist__nameswrapper">
                {puzzleData &&
                  puzzleData.puzzle.map((movie) => (
                    <p
                      key={movie.id}
                      className="puzzlelist__listitem puzzlelist__text"
                    >
                      {firstNameOnly(movie.keyPerson.name)}
                    </p>
                  ))}
              </div>
              <p className="puzzlelist__progress puzzlelist__text">
                Progress:{" "}
              </p>
              <p className="puzzlelist__status puzzlelist__text">
                {status && status}
              </p>
            </div>
          </NavLink>
        </div>
      </div>
    </>
  );
}

export default PuzzleListItem;
