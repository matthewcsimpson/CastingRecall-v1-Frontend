// Styles
import "./GamePage.scss";

// Libraries
import axios from "axios";
import { useEffect, useState } from "react";

// Variables

const API_KEY = "1d1a538338aaac91dbf1adc28d4663aa";
const TMDB_SEARCH_POP_URL =
  "https://api.themoviedb.org/3/movie/popular?with_original_language=en&primary_release_year=";
const TMDB_SEARCH_CREDITS_FRONT = "https://api.themoviedb.org/3/movie/";
const TMBD_SEARCH_CREDITS_BACK = "/credits";
const TMDB_DISCOVER_MOVIE_BY_ACTOR =
  "https://api.themoviedb.org/4/discover/movie?sort_by=popularity.desc&region=US&with_original_language=en&with_cast=";

const LOWEST_YEAR = 1990;
const CURRENT_YEAR = new Date().getFullYear();

function GamePage() {
  const [keyMovie, setKeyMovie] = useState(null);

  const randomYear = Math.floor(
    Math.random() * (CURRENT_YEAR - LOWEST_YEAR) + LOWEST_YEAR
  );

  const newKeyMovie = () => {
    axios
      .get(`${TMDB_SEARCH_POP_URL}${randomYear}&api_key=${API_KEY}`)
      .then((res) => {
        const randomMovie = res.data.results.find((movie, i) => {
          if (i === Math.floor(Math.random() * 10)) {
            // console.log(movie);
            return movie;
          }
        });
        setKeyMovie(randomMovie);
      })
      .catch((e) => {
        console.error(e);
      });
    return;
  };

  useEffect(() => {
    newKeyMovie();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    newKeyMovie();
    console.log(keyMovie);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keyMovie]);

  return <>{keyMovie && <p>{keyMovie.id}</p>}</>;
}

export default GamePage;
