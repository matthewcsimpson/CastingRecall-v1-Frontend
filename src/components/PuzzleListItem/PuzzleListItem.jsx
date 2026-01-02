// Styles
import "./PuzzleListItem.scss";

// Utilities
import { firstNameOnly } from "../../utilities";

// Libraries
import { NavLink } from "react-router-dom";

const PuzzleListItem = ({ puzzleId, keyPeople, status }) => {
  const STATUS_COPY = {
    solved: "Solved!",
    failed: "Failed — try again!",
    in_progress: "In progress",
    not_attempted: "Not yet attempted!",
  };

  const safeStatus = status ?? "not_attempted";
  const progressText = STATUS_COPY[safeStatus] || STATUS_COPY.not_attempted;

  return (
    <>
      <div className="puzzlelist">
        <div className="puzzlelist__wrapper">
          <NavLink to={`/puzzle/${puzzleId}`}>
            <div className="puzzlelist__puzzlewrapper">
              <p className="puzzlelist__progress puzzlelist__text">
                Puzzle Name:
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
              <div className="puzzlelist__statuswrapper">
                <p className="puzzlelist__progress puzzlelist__text">
                  Progress:
                </p>
                <p
                  className={`puzzlelist__status puzzlelist__text puzzlelist__status--${safeStatus}`}
                >
                  {progressText}
                </p>
              </div>
            </div>
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default PuzzleListItem;
