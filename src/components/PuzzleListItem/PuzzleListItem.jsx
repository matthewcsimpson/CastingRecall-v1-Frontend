// Styles
import "./PuzzleListItem.scss";

// Utilities
import { firstNameOnly } from "../../utilities";

// Libraries
import { NavLink } from "react-router-dom";

const puzzleListItemItem = ({ puzzleId, keyPeople, status }) => {
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
      <div className="puzzleListItem">
        <div className="puzzleListItem__wrapper">
          <NavLink to={`/puzzle/${puzzleId}`}>
            <div className="puzzleListItem__puzzlewrapper">
              <p className="puzzleListItem__progress puzzleListItem__text">
                Puzzle Name:
              </p>
              <div className="puzzleListItem__nameswrapper">
                {Array.isArray(keyPeople) &&
                  keyPeople.map((personName, index) => (
                    <p
                      key={`${puzzleId}-${index}`}
                      className="puzzleListItem__listitem puzzleListItem__text"
                    >
                      {firstNameOnly(personName)}
                    </p>
                  ))}
              </div>
              <div className="puzzleListItem__statuswrapper">
                <p className="puzzleListItem__progress puzzleListItem__text">
                  Progress:
                </p>
                <p
                  className={`puzzleListItem__status puzzleListItem__text puzzleListItem__status--${safeStatus}`}
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

export default puzzleListItemItem;
