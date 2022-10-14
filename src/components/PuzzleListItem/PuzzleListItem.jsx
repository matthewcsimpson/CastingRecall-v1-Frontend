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

  useEffect(() => {
    getSpecificPuzzle(puzzle);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="puzzlelist">
        <div className="puzzlelist__wrapper">
          <div className="puzzlelist__puzzlewrapper">
            <p className="puzzlelist__number puzzlelist__text">
              #{puzznum + 1}:
            </p>
            <div className="puzzlelist__nameswrapper">
              <NavLink to={`/puzzle/${puzzle}`}>
                {puzzleData &&
                  puzzleData.puzzle.map((movie) => (
                    <p
                      key={movie.id}
                      className="puzzlelist__listitem puzzlelist__text"
                    >
                      {firstNameOnly(movie.keyPerson.name)}
                    </p>
                  ))}
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PuzzleListItem;
