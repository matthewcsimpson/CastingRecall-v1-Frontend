// Styles
import "./Movie.scss";

// Assets
import questionmarkimg from "../../assets/question.jpg";
import profilePic from "../../assets/profile-placeholder.jpg";

// Components
import { GenreTags, Hints } from "..";

// Libraries
import { useEffect, useMemo, useState } from "react";

// Utility Functions
import {
  formatDate,
  formatGenre,
  obscureString,
  shortenString,
  shortenMultipleCharNames,
  removeVoiceFromString,
} from "../../utilities/utilities";

// variables
const IMG_BASE = "https://image.tmdb.org/t/p/w500/";
const dateOptions = {
  year: "numeric",
};

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
    if (movieGuessed || youWon || youLost) {
      setRevealYear(true);
      setRevealDirector(true);
      setRevealSynopsis(true);
      setRevealCharNames(true);
      setRevealTitle(true);
    }
  }, [movieGuessed, youWon, youLost]);

  useEffect(() => {
    if (!hintsStorageKey) {
      return;
    }

    try {
      const stored = JSON.parse(localStorage.getItem(hintsStorageKey));

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
    } catch (err) {
      console.error(err);
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

    try {
      localStorage.setItem(hintsStorageKey, JSON.stringify(payload));
    } catch (err) {
      console.error(err);
    }
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
            {movie.cast.map((actor) => (
              <div key={actor.id} className="movie__headshotbox">
                <img
                  key={actor.id}
                  className={"movie__headshot"}
                  src={
                    actor.profile_path
                      ? `${IMG_BASE}${actor.profile_path}`
                      : profilePic
                  }
                  alt={actor.name}
                />
                <p className="movie__actorname">{`${actor.name}`}</p>
                <p className="movie__actorname movie__actorname--as">as</p>
                {
                  <p className="movie__actorname movie__actorname--char">
                    {movieGuessed || revealCharNames
                      ? removeVoiceFromString(
                          shortenMultipleCharNames(actor.character)
                        )
                      : obscureString(
                          removeVoiceFromString(
                            shortenMultipleCharNames(actor.character)
                          )
                        )}
                  </p>
                }
              </div>
            ))}
          </div>
        </div>
        <div className="movie__details">
          <h2 className="movie__heading">Movie Details:</h2>
          <div className="movie__details--inner">
            <div className="movie__posterbox">
              <img
                alt={movieGuessed ? movie.original_title : "hidden!"}
                className="movie__poster"
                src={
                  movieGuessed
                    ? `${IMG_BASE}${movie.poster_path}`
                    : questionmarkimg
                }
              />
            </div>
            <div className="movie__detailsbox">
              <div className="movie__detailsbox--title">
                <p className="movie__text movie__text--title">Title: </p>
                <p className="movie__text movie__text--item">
                  {movieGuessed || revealTitle
                    ? movie.title
                    : obscureString(movie.title)}
                </p>
              </div>
              <div className="movie__detailsbox--director">
                <p className="movie__text movie__text--title">Director: </p>
                <p className="movie__text movie__text--item movie__text">
                  {movieGuessed || revealDirector
                    ? movie.directors.map((d) => (
                        <span key={d.id} className="movie__text--directors">
                          {d.name}
                        </span>
                      ))
                    : movie.directors.map((d) => (
                        <span key={d.id} className="movie__text--directors">
                          {obscureString(d.name)}
                        </span>
                      ))}
                </p>
              </div>
              <div className="movie__detailsbox--year">
                <p className="movie__text movie__text--title">Year: </p>
                <p className="movie__text movie__text--item">
                  {movieGuessed || revealYear
                    ? formatDate(movie.release_date, dateOptions)
                    : obscureString(
                        formatDate(movie.release_date, dateOptions)
                      )}
                </p>
              </div>
              <div className="movie__detailsbox--synopsis">
                <p className="movie__text movie__text--title">Synopsis: </p>
                <p className="movie__text movie__text--item">
                  {movieGuessed || revealSynopsis
                    ? shortenString(movie.overview)
                    : shortenString(obscureString(movie.overview))}
                </p>
              </div>
              <div className="movie__detailsbox--genres">
                <p className="movie__text movie__text--title">Genres: </p>
                <GenreTags genreIds={movie.genre_ids} genres={genres} />
              </div>
            </div>
          </div>
        </div>
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
