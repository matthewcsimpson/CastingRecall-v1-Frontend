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
  removeVoiceFromString,
} from "../../utilities/utilities";

// variables
const IMG_BASE = "https://image.tmdb.org/t/p/w500/";
const dateOptions = {
  year: "numeric",
};

function Movie({ movie, genres, guesses, correctGuesses, setCorrectGuesses }) {
  const [movieGuessed, setMovieGuessed] = useState(false);
  const [revealYear, setRevealYear] = useState(false);
  const [revealSynopsis, setRevealSynopsis] = useState(false);
  const [revealCharNames, setRevealCharNames] = useState(false);

  const handleHintClick = (e, setFunc) => {
    e.preventDefault();
    setFunc((prev) => {
      if (prev === false) {
        return !prev;
      } else {
        return prev;
      }
    });
  };

  const handleSetCorrectGuesses = (m) => {
    if (!correctGuesses.find((c) => (c.id === m.id ? true : false))) {
      setCorrectGuesses([...correctGuesses, m]);
    }
  };

  /**
   * Toggle this movie as guessed when it is guessed
   */
  useEffect(() => {
    setMovieGuessed(
      guesses.find((guess) => (guess.id === movie.id ? true : false))
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [guesses]);

  /**
   * useEffect to set correct guesses
   */
  useEffect(() => {
    if (movieGuessed) {
      handleSetCorrectGuesses(movie);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [movieGuessed]);

  useEffect(() => {
    if (movieGuessed) {
      handleSetCorrectGuesses(movie);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <div
        className={
          movieGuessed
            ? "movie__wrapper movie__wrapper--guessed"
            : "movie__wrapper"
        }
      >
        <div className="movie__details">
          <h2 className="movie__heading">Movie Details</h2>
          <div className="movie__details--inner">
            <img
              alt={movieGuessed ? movie.original_title : "hidden!"}
              className="movie__poster movie__poster--mobile"
              src={
                movieGuessed
                  ? `${IMG_BASE}${movie.poster_path}`
                  : questionmarkimg
              }
            />
            <div className="movie__detailsbox">
              <div className="movie__info">
                <p className="movie__text movie__text--title">
                  Title:{" "}
                  <span className="movie__text movie__text--item">
                    {movieGuessed ? movie.title : obscureString(movie.title)}
                  </span>
                </p>
                <p className="movie__text movie__text--title">
                  Year:{" "}
                  <span className="movie__text movie__text--item">
                    {movieGuessed || revealYear
                      ? formatDate(movie.release_date, dateOptions)
                      : obscureString(
                          formatDate(movie.release_date, dateOptions)
                        )}
                  </span>
                </p>
                <p className="movie__text movie__text--title">
                  Synopsis:{" "}
                  <span className="movie__text movie__text--item">
                    {movieGuessed || revealSynopsis
                      ? shortenString(movie.overview)
                      : shortenString(obscureString(movie.overview))}
                  </span>
                </p>
              </div>
              <div className="movie__genres">
                <p className="movie__text movie__text--title">Genre(s):</p>
                <ul className="movie__genrelist">
                  {movie.genre_ids.map((id) => {
                    return (
                      <li
                        key={id}
                        className={`movie__genre movie__genre--${id}`}
                      >
                        {formatGenre(id, genres)}
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
        </div>
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
                      ? removeVoiceFromString(actor.character)
                      : obscureString(removeVoiceFromString(actor.character))}
                  </p>
                }
              </div>
            ))}
          </div>
        </div>
        <div className="movie__hintswrapper">
          <p className="movie__text movie__text--item">
            Pssst.... Need a hint?? <br />
            <button
              className="movie__hintbutton"
              onClick={(e) => handleHintClick(e, setRevealYear)}
            >
              Reveal Year
            </button>
            <button
              className="movie__hintbutton"
              onClick={(e) => handleHintClick(e, setRevealSynopsis)}
            >
              Reveal Synopsis
            </button>
            <button
              className="movie__hintbutton"
              onClick={(e) => handleHintClick(e, setRevealCharNames)}
            >
              Reveal Character Names
            </button>
            {/* <button className="movie__hintbutton">Reveal Key Person</button> */}
          </p>
        </div>
      </div>
    </>
  );
}

export default Movie;
