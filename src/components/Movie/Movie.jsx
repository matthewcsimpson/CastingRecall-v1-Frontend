// Styles
import "./Movie.scss";

// Libraries
import { useEffect, useState } from "react";

// Utility Functions
import {
  formatDate,
  formatGenre,
  obscureString,
} from "../../utilities/utilities";

// variables
const IMG_BASE = "https://image.tmdb.org/t/p/w500/";

const dateOptions = {
  day: "2-digit",
  month: "short",
  year: "numeric",
};

function Movie({ movie, genres, guesses }) {
  // eslint-disable-next-line no-unused-vars
  const [movieGuessed, setMovieGuessed] = useState(false);

  useEffect(() => {
    setMovieGuessed(
      guesses.find((guess) => (guess.id === movie.id ? true : false))
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [guesses]);

  return (
    <>
      <div className="movie__wrapper">
        <div className="movie__details">
          <img
            alt="hidden!"
            className="movie__poster movie__poster--mobile"
            src={
              movieGuessed
                ? `${IMG_BASE}${movie.poster_path}`
                : "/assets/question.jpg"
            }
          />
          <div className="movie__info">
            <p className="movie__text">
              <span className="movie__text movie__text--title">Title: </span>
              {movieGuessed ? movie.title : obscureString(movie.title)}
            </p>
            <p className="movie__text">
              <span className="movie__text movie__text--title">
                Release Date:{" "}
              </span>
              <span className="movie__text movie__text--item">
                {formatDate(movie.release_date, dateOptions)}
              </span>
            </p>
            <p className="movie__text">
              <span className="movie__singledetail">Genre(s):</span>
            </p>
            <ul className="movie__genrelist">
              {movie.genre_ids.map((id) => {
                return (
                  <li key={id} className={`movie__genre movie__genre--${id}`}>
                    {formatGenre(id, genres)}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <div className="movie__castpics">
          <h2 className="movie__castpics--heading">Starring:</h2>
          <div className="movie__castpicsinner">
            {movie.cast.map((actor) => (
              <div key={actor.id} className="movie__headshotbox">
                <img
                  key={actor.id}
                  className={"movie__headshot"}
                  src={`${IMG_BASE}${actor.profile_path}`}
                  alt={actor.name}
                />
                <p className="movie__actorname">{`${actor.name}`}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Movie;
