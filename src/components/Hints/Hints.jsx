function Hints({
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
  handleEasyMode,
  movieGuessed,
  youWon,
  youLost,
}) {
  return (
    <div className="movie__hintswrapper">
      <p
        className="movie__text movie__text--hints"
        onClick={(e) => {
          handleHintClick(e, setRevealHints, false);
        }}
      >
        {revealHints ? `Hints` : "pssst....need a hint?"}
      </p>
      {revealHints ? (
        <>
          <button
            className="movie__hintsbutton movie__hintsbutton--year"
            onClick={(e) => handleHintClick(e, setRevealYear, true)}
            disabled={revealYear || movieGuessed || youWon || youLost}
          >
            Year
          </button>
          <button
            className="movie__hintsbutton movie__hintsbutton--director"
            onClick={(e) => handleHintClick(e, setRevealDirector, true)}
            disabled={revealDirector || movieGuessed || youWon || youLost}
          >
            Director
          </button>

          <button
            className="movie__hintsbutton movie__hintsbutton--synopsis"
            onClick={(e) => handleHintClick(e, setRevealSynopsis, true)}
            disabled={revealSynopsis || movieGuessed || youWon || youLost}
          >
            Synopsis
          </button>
          <button
            className="movie__hintsbutton movie__hintsbutton--names"
            onClick={(e) => handleHintClick(e, setRevealCharNames, true)}
            disabled={revealCharNames || movieGuessed || youWon || youLost}
          >
            Names
          </button>
          <button
            className="movie__hintsbutton movie__hintsbutton--easy"
            onClick={(e) => handleEasyMode(e)}
            disabled={
              revealYear ||
              revealDirector ||
              revealSynopsis ||
              revealCharNames ||
              movieGuessed ||
              youWon ||
              youLost
            }
          >
            All
          </button>
        </>
      ) : null}
    </div>
  );
}

export default Hints;
