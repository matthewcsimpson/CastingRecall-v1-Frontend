// Styles
import "./PuzzleListItem.scss";

// Utilities
import { firstNameOnly } from "../../utilities/utilities";

// Libraries
import { NavLink } from "react-router-dom";

const PuzzleListItem = ({ puzznum, puzzleId, keyPeople, status }) => {
  const progressText = status || "Not yet attempted!";

  return (
    <>
      <div className="puzzlelist">
        <div className="puzzlelist__wrapper">
          <NavLink to={`/puzzle/${puzzleId}`}>
            <div className="puzzlelist__puzzlewrapper">
              <p className="puzzlelist__number puzzlelist__text">
                Puzzle #{puzznum + 1}:
              </p>
              <div className="puzzlelist__nameswrapper">
                {Array.isArray(keyPeople) &&
                  keyPeople.map((personName, index) => (
                    <p
                      key={`${puzzleId}-${index}`}
                      className="puzzlelist__listitem puzzlelist__text"
                    >
                      {firstNameOnly(personName)}
                    </p>
                  ))}
              </div>
              <p className="puzzlelist__progress puzzlelist__text">
                Progress:{" "}
              </p>
              <p className="puzzlelist__status puzzlelist__text">
                {progressText}
              </p>
            </div>
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default PuzzleListItem;
