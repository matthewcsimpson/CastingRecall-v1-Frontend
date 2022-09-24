// Styles
import "./Movie.scss";

// Libraries
import { useState } from "react";

// variables
const IMG_BASE = "https://image.tmdb.org/t/p/w500/";

const dateOptions = {
  day: "2-digit",
  month: "short",
  year: "numeric",
};

function Movie({ movie, genres }) {
  // eslint-disable-next-line no-unused-vars
  const [movieGuessed, setMovieGuessed] = useState(false);

  /**
   * Function to return a formatted date from a timestamp string,
   * based on dateOptions previously specified.
   *
   * @param {string} timestamp;
   * @param {Object} dateOptions;
   */
  const formatDate = (timestamp, options) => {
    let date = new Date(timestamp);
    return date.toLocaleDateString("en-us", options);
  };

  const formatGenre = (id) => {
    let genreName = genres.find((genre) => {
      return genre.id === id ? genre.name : null;
    });
    return genreName.name;
  };

  return (
    <>
      <div className="movie__wrapper">
        <div className="movie__details">
          <img
            alt="hidden!"
            className="movie__poster"
            src={
              movieGuessed
                ? `${IMG_BASE}${movie.poster_path}`
                : "/assets/question.jpg"
            }
          />
          <div className="movie__info">
            <p className="movie__text">Title</p>
            <p className="movie__text">
              <span className="movie__singledetail">
                Year: {formatDate(movie.release_date, dateOptions)}
              </span>
            </p>
            <p className="movie__text">
              <span className="movie__singledetail">Genre(s):</span>
            </p>
            <ul className="movie__genrelist">
              {movie.genre_ids.map((id) => {
                return (
                  <li key={id} className={`movie__genre movie__genre--${id}`}>
                    {formatGenre(id)}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        <div className="movie__castpics">
          {movie.cast.map((actor) => (
            <img
              key={actor.id}
              className={
                actor.id === movie.keyPerson.id
                  ? "movie__headshot movie__headshot--key"
                  : "movie__headshot"
              }
              src={`${IMG_BASE}${actor.profile_path}`}
              alt={actor.name}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default Movie;
