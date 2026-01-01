import "./Hints.scss";

const Hints = ({
  handleHintClick,
  setRevealHints,
  revealHints,
  setRevealYear,
  revealYear,
  setRevealDirector,
  revealDirector,
  setRevealSynopsis,
  revealSynopsis,
  setRevealCharNames,
  revealCharNames,
  movieGuessed,
  youWon,
  youLost,
}) => {
  return (
    <div className="hints">
      <p
        className="hints__text hints__text--hints"
        onClick={(evt) => {
          handleHintClick(evt, setRevealHints, false, revealHints);
        }}
      >
        {revealHints
          ? `Reminder: hints use one guess!`
          : "pssst....need a hint?"}
      </p>
      {revealHints ? (
        <div className="hints__buttons">
          <button
            className="hints__hintsbutton"
            onClick={(evt) =>
              handleHintClick(evt, setRevealYear, true, revealYear, "year")
            }
            disabled={revealYear || movieGuessed || youWon || youLost}
          >
            Year
          </button>
          <button
            className="hints__hintsbutton"
            onClick={(evt) =>
              handleHintClick(
                evt,
                setRevealDirector,
                true,
                revealDirector,
                "director"
              )
            }
            disabled={revealDirector || movieGuessed || youWon || youLost}
          >
            Director
          </button>

          <button
            className="hints__hintsbutton"
            onClick={(evt) =>
              handleHintClick(
                evt,
                setRevealSynopsis,
                true,
                revealSynopsis,
                "synopsis"
              )
            }
            disabled={revealSynopsis || movieGuessed || youWon || youLost}
          >
            Synopsis
          </button>
          <button
            className="hints__hintsbutton"
            onClick={(evt) =>
              handleHintClick(
                evt,
                setRevealCharNames,
                true,
                revealCharNames,
                "names"
              )
            }
            disabled={revealCharNames || movieGuessed || youWon || youLost}
          >
            Names
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default Hints;
