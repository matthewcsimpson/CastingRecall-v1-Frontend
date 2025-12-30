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
        onClick={(e) => {
          handleHintClick(e, setRevealHints, false, revealHints);
        }}
      >
        {revealHints ? `Hints` : "pssst....need a hint?"}
      </p>
      {revealHints ? (
        <>
          <button
            className="hints__hintsbutton hints__hintsbutton--year"
            onClick={(e) =>
              handleHintClick(e, setRevealYear, true, revealYear, "year")
            }
            disabled={revealYear || movieGuessed || youWon || youLost}
          >
            Year
          </button>
          <button
            className="hints__hintsbutton hints__hintsbutton--director"
            onClick={(e) =>
              handleHintClick(
                e,
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
            className="hints__hintsbutton hints__hintsbutton--synopsis"
            onClick={(e) =>
              handleHintClick(
                e,
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
            className="hints__hintsbutton hints__hintsbutton--names"
            onClick={(e) =>
              handleHintClick(
                e,
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
        </>
      ) : null}
    </div>
  );
};

export default Hints;
