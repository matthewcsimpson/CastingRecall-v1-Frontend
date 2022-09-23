// Styles
import "./Movie.scss";

// Libraries
import { useState } from "react";
import { getDefaultNormalizer } from "@testing-library/react";

// variables
const IMG_BASE = "https://image.tmdb.org/t/p/w500/";

const dateOptions = {
  day: "2-digit",
  month: "short",
  year: "numeric",
};

function Movie({ movie, genres }) {
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
    // genres.map((genre) => console.log(typeof genre.id));
    // console.log(typeof id);
  };

  return (
    <>
      <div className="movie">
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
            <p className="movie__text">
              Year: {formatDate(movie.release_date, dateOptions)}
            </p>
            <p className="movie__text">
              Genre(s):
              {movie.genre_ids.map((id) => formatGenre(id))}
            </p>
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
      <p></p>
    </>
  );
}

export default Movie;
