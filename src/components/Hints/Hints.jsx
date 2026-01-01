import "./Hints.scss";

const Hints = ({
  handleHintClick,
  revealKeys,
  revealHints,
  revealDirector,
  revealSynopsis,
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
          handleHintClick(evt, revealKeys.HINTS, false, revealHints);
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
              handleHintClick(
                evt,
                revealKeys.DIRECTOR,
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
                revealKeys.SYNOPSIS,
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
                revealKeys.CHAR_NAMES,
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
