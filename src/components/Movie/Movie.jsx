// Styles
import "./Movie.scss";

// Assets
import questionmarkimg from "../../assets/question.jpg";
import profilePic from "../../assets/profile-placeholder.jpg";

// Libraries
import { useEffect, useState } from "react";

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

function Movie({
  puzzleId,
  movie,
  genres,
  guesses,
  setHintsUsed,
  youWon,
  youLost,
}) {
  const [movieGuessed, setMovieGuessed] = useState(false);
  const [revealTitle, setRevealTitle] = useState(false);
  const [revealDirector, setRevealDirector] = useState(false);
  const [revealYear, setRevealYear] = useState(false);
  const [revealSynopsis, setRevealSynopsis] = useState(false);
  const [revealCharNames, setRevealCharNames] = useState(false);
  const [revealHints, setRevealHints] = useState(false);

  /**
   * Handle revealing the hints
   * @param {event} e
   * @param {setStatefunction} setFunc
   */
  const handleHintClick = (e, setFunc, actualHint) => {
    e.preventDefault();
    setFunc((prev) => {
      if (prev === false) {
        return !prev;
      } else {
        return prev;
      }
    });
    if (actualHint === true) {
      setHintsUsed(1);
    }
  };

  /**
   * Handle revealing all hints.
   * @param {event} e
   */
  const handleEasyMode = (e) => {
    e.preventDefault();
    handleHintClick(e, setRevealYear, true);
    handleHintClick(e, setRevealDirector, true);
    handleHintClick(e, setRevealSynopsis, true);
    handleHintClick(e, setRevealCharNames, true);
  };

  /**
   * Function to read hints data stored in localStorage
   */
  const getLocalHints = () => {
    if (movie) {
      const hintsId = `${puzzleId}-${movie.id}`;
      let local = JSON.parse(localStorage.getItem(hintsId));
      if (local) {
        setRevealHints(local.revealHints);
        setRevealYear(local.revealYear);
        setRevealDirector(local.revealDirector);
        setRevealSynopsis(local.revealSynopsis);
        setRevealCharNames(local.revealCharNames);
      }
    }
  };

  /**
   * Function to write hints data to localStorage.
   */
  const setLocalHints = () => {
    if (movie) {
      const hintsId = `${puzzleId}-${movie.id}`;
      const hints = {
        id: hintsId,
        revealHints: revealHints,
        revealYear: revealYear,
        revealDirector: revealDirector,
        revealSynopsis: revealSynopsis,
        revealCharNames: revealCharNames,
      };
      localStorage.setItem(hintsId, JSON.stringify(hints));
    }
  };

  // ------------------------------------------------------------------------useEffects

  useEffect(() => {
    getLocalHints();
    setLocalHints();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  /**
   * Toggle this movie as guessed when it is guessed
   */
  useEffect(() => {
    setMovieGuessed(
      guesses.find((guess) => (guess.id === movie.id ? true : false))
    );
    setLocalHints();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [guesses]);

  /**
   * useEffect to reveal all details when the movie is guessed or the player runs out of guesses.
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
    setLocalHints();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    revealYear,
    revealDirector,
    revealSynopsis,
    revealCharNames,
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
                <p className="movie__genrelist">
                  {movie.genre_ids.map((id) => {
                    return (
                      <span
                        key={id}
                        className={`movie__genre movie__genre--${id}`}
                      >
                        {formatGenre(id, genres)}
                      </span>
                    );
                  })}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="movie__hintswrapper">
          <p
            className="movie__text movie__text--hints"
            onClick={(e) => {
              handleHintClick(e, setRevealHints, false);
            }}
          >
            {revealHints
              ? `Warning: hints will cost you one guess each!`
              : "pssst....need a hint?"}
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
      </div>
    </>
  );
}

export default Movie;
