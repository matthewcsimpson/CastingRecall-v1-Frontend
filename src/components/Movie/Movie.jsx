// Styles
import "./Movie.scss";

// Components
import { ActorHeadshot, Hints, MovieDetails } from "..";

// Libraries
import { useEffect, useMemo, useState } from "react";

// Utility Functions
import {
  shortenMultipleCharNames,
  removeVoiceFromString,
} from "../../utilities";
import { loadLocalJson, saveLocalJson } from "../../utilities/storage";

const Movie = ({
  puzzleId,
  movie,
  genres,
  guesses,
  youWon,
  youLost,
  reallyWantHints,
  onHintSpend,
}) => {
  const [revealTitle, setRevealTitle] = useState(false);
  const [revealDirector, setRevealDirector] = useState(false);
  const [revealYear, setRevealYear] = useState(false);
  const [revealSynopsis, setRevealSynopsis] = useState(false);
  const [revealCharNames, setRevealCharNames] = useState(false);
  const [revealHints, setRevealHints] = useState(false);

  const hintsStorageKey = useMemo(() => {
    if (!puzzleId) {
      return null;
    }
    return `${puzzleId}-${movie.id}-hints`;
  }, [movie.id, puzzleId]);

  const movieGuessed = useMemo(() => {
    if (!Array.isArray(guesses)) {
      return false;
    }

    return guesses.some(
      (guess) => guess.id === movie.id && guess.correct === true
    );
  }, [guesses, movie.id]);

  const revealAll = useMemo(
    () => movieGuessed || youWon || youLost,
    [movieGuessed, youWon, youLost]
  );

  const processedCast = useMemo(() => {
    if (!Array.isArray(movie?.cast)) {
      return [];
    }

    return movie.cast.map((actor) => {
      const sanitizedCharacter = removeVoiceFromString(
        shortenMultipleCharNames(actor.character)
      );

      return {
        ...actor,
        sanitizedCharacter,
      };
    });
  }, [movie?.cast]);
  const revealCharNamesVisible = revealAll || revealCharNames;

  /**
   * Handle revealing the hints
   * @param {event} e React synthetic event
   * @param {setStatefunction} setFunc State setter for reveal flag
   * @param {boolean} actualHint Flag to indicate if this is a spendable hint
   * @param {boolean} currentState Current reveal value for the hint
   * @param {string} hintKey Identifier used for hint bookkeeping
   */
  const handleHintClick = (e, setFunc, actualHint, currentState, hintKey) => {
    e.preventDefault();

    if (actualHint) {
      if (currentState) {
        return;
      }

      if (typeof onHintSpend === "function") {
        const spent = onHintSpend(movie.id, hintKey);

        if (!spent) {
          return;
        }
      }
    }

    setFunc((prev) => {
      if (prev === true) {
        return prev;
      }

      return true;
    });
  };

  // ------------------------------------------------------------------------useEffects

  /**
   * Toggle this movie as guessed when it is guessed
   */
  useEffect(() => {
    if (revealAll) {
      setRevealYear(true);
      setRevealDirector(true);
      setRevealSynopsis(true);
      setRevealCharNames(true);
      setRevealTitle(true);
    }
  }, [revealAll]);

  useEffect(() => {
    if (!hintsStorageKey) {
      return;
    }

    const stored = loadLocalJson(hintsStorageKey);

    if (stored) {
      setRevealYear(Boolean(stored.revealYear));
      setRevealDirector(Boolean(stored.revealDirector));
      setRevealSynopsis(Boolean(stored.revealSynopsis));
      setRevealCharNames(Boolean(stored.revealCharNames));
      setRevealTitle(Boolean(stored.revealTitle));
      setRevealHints(Boolean(stored.revealHints));
    } else {
      setRevealYear(false);
      setRevealDirector(false);
      setRevealSynopsis(false);
      setRevealCharNames(false);
      setRevealTitle(false);
      setRevealHints(false);
    }
  }, [hintsStorageKey]);

  useEffect(() => {
    if (!hintsStorageKey) {
      return;
    }

    const payload = {
      revealYear,
      revealDirector,
      revealSynopsis,
      revealCharNames,
      revealTitle,
      revealHints,
    };

    saveLocalJson(hintsStorageKey, payload);
  }, [
    hintsStorageKey,
    revealCharNames,
    revealDirector,
    revealHints,
    revealSynopsis,
    revealTitle,
    revealYear,
  ]);

  return (
    <>
      <div
        className={
          movieGuessed
            ? "movie__wrapper movie__wrapper--guessed"
            : "movie__wrapper"
        }
      >
        <div className="movie__castpics">
          <h2 className="movie__heading">Starring:</h2>
          <div className="movie__castpics--inner">
            {processedCast.map((actor) => (
              <ActorHeadshot
                key={actor.id}
                actor={actor}
                revealCharNamesVisible={revealCharNamesVisible}
              />
            ))}
          </div>
        </div>
        <MovieDetails
          movie={movie}
          genres={genres}
          revealAll={revealAll}
          revealTitle={revealTitle}
          revealDirector={revealDirector}
          revealYear={revealYear}
          revealSynopsis={revealSynopsis}
        />
        {reallyWantHints && (
          <Hints
            handleHintClick={handleHintClick}
            setRevealHints={setRevealHints}
            revealHints={revealHints}
            setRevealYear={setRevealYear}
            revealYear={revealYear}
            setRevealDirector={setRevealDirector}
            revealDirector={revealDirector}
            setRevealSynopsis={setRevealSynopsis}
            revealSynopsis={revealSynopsis}
            setRevealCharNames={setRevealCharNames}
            revealCharNames={revealCharNames}
            movieGuessed={movieGuessed}
            youWon={youWon}
            youLost={youLost}
          />
        )}
      </div>
    </>
  );
};

export default Movie;
