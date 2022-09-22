// Styles
import "./Movie.scss";

// Libraries
// import { useState } from "react";

function Movie({ movie }) {
  return (
    <>
      <p>
        {movie.cast.map((actor) => (
          <p>{actor.name}</p>
        ))}
      </p>
    </>
  );
}

export default Movie;
