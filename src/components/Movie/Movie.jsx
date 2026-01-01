// Styles
import "./Movie.scss";

// Components
import { ActorHeadshot, Hints, MovieDetails } from "..";

// Libraries
import { useEffect, useMemo, useRef, useState } from "react";

// Utility Functions
import {
  shortenMultipleCharNames,
  removeVoiceFromString,
  loadLocalJson,
  saveLocalJson,
} from "../../utilities";

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
      const characterName =
        typeof actor?.character === "string" ? actor.character : "";
      const sanitizedCharacter = characterName
        ? removeVoiceFromString(shortenMultipleCharNames(characterName))
        : "";

      return {
        ...actor,
        sanitizedCharacter,
      };
    });
  }, [movie?.cast]);
  const revealCharNamesVisible = revealAll || revealCharNames;

  const hydratedHintsRef = useRef(null);
  const [hintsHydrated, setHintsHydrated] = useState(false);

  /**
   * Handle revealing the hints
   * @param {event} evt React synthetic event
   * @param {setStatefunction} setFunc State setter for reveal flag
   * @param {boolean} actualHint Flag to indicate if this is a spendable hint
   * @param {boolean} currentState Current reveal value for the hint
   * @param {string} [hintKey] Identifier used for hint bookkeeping
   */
  const handleHintClick = (
    evt,
    setFunc,
    actualHint,
    currentState,
    hintKey = null
  ) => {
    evt.preventDefault();

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
      hydratedHintsRef.current = null;
      setHintsHydrated(false);
      return;
    }

    setHintsHydrated(false);

    const stored = loadLocalJson(hintsStorageKey);
    const nextState = {
      revealYear: Boolean(stored?.revealYear),
      revealDirector: Boolean(stored?.revealDirector),
      revealSynopsis: Boolean(stored?.revealSynopsis),
      revealCharNames: Boolean(stored?.revealCharNames),
      revealTitle: Boolean(stored?.revealTitle),
      revealHints: Boolean(stored?.revealHints),
    };

    setRevealYear(nextState.revealYear);
    setRevealDirector(nextState.revealDirector);
    setRevealSynopsis(nextState.revealSynopsis);
    setRevealCharNames(nextState.revealCharNames);
    setRevealTitle(nextState.revealTitle);
    setRevealHints(nextState.revealHints);

    hydratedHintsRef.current = nextState;
    setHintsHydrated(true);
  }, [hintsStorageKey]);

  useEffect(() => {
    if (!hintsStorageKey || !hintsHydrated) {
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

    if (
      hydratedHintsRef.current &&
      Object.keys(payload).every(
        (key) => hydratedHintsRef.current[key] === payload[key]
      )
    ) {
      return;
    }

    hydratedHintsRef.current = payload;

    saveLocalJson(hintsStorageKey, payload);
  }, [
    hintsStorageKey,
    hintsHydrated,
    revealYear,
    revealDirector,
    revealSynopsis,
    revealCharNames,
    revealTitle,
    revealHints,
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
