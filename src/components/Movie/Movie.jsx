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

function Movie({ movie, genres, guesses, handleSetCorrectGuesses }) {
  const [movieGuessed, setMovieGuessed] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [revealYear, setRevealYear] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [revealSynopsis, setRevealSynopsis] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [revealCharNames, setRevealCharNames] = useState(false);

  // eslint-disable-next-line no-unused-vars
  const handleHintClick = (setFunc) => {
    setFunc((prev) => {
      if (prev === false) {
        return !prev;
      } else {
        return prev;
      }
    });
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
      movie = {};
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
                  {movieGuessed ? movie.title : obscureString(movie.title)}
                </p>
              </div>
              "
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
                <p className="movie__text movie__text--title">Genres</p>

                {movie.genre_ids.map((id) => {
                  return (
                    <p key={id} className={`movie__genre movie__genre--${id}`}>
                      {formatGenre(id, genres)}
                    </p>
                  );
                })}
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
      </div>
    </>
  );
}

export default Movie;
