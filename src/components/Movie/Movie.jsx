// Styles
import "./Movie.scss";

// Assets
import qm from "../../assets/question.jpg";

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
          <h2 className="movie__heading">Movie Details</h2>
          <div className="movie__details--inner">
            <img
              alt={movieGuessed ? movie.original_title : "hidden!"}
              className="movie__poster movie__poster--mobile"
              src={movieGuessed ? `${IMG_BASE}${movie.poster_path}` : qm}
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
                    {movieGuessed
                      ? formatDate(movie.release_date, dateOptions)
                      : obscureString(
                          formatDate(movie.release_date, dateOptions)
                        )}
                  </span>
                </p>
                <p className="movie__text movie__text--title">
                  Synopsis:{" "}
                  <span className="movie__text movie__text--item">
                    {movieGuessed
                      ? movie.overview
                      : obscureString(movie.overview)}
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
                  src={`${IMG_BASE}${actor.profile_path}`}
                  alt={actor.name}
                />
                <p className="movie__actorname">{`${actor.name}`}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="movie__hintswrapper">
          <p className="movie__text">Hints:</p>
        </div>
      </div>
    </>
  );
}

export default Movie;
