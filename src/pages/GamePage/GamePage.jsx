// Styles
import "./GamePage.scss";

// Assets
import loading from "../../assets/loading-25.gif";

// Components
import Hero from "../../components/Hero/Hero";
import Movie from "../../components/Movie/Movie";

// Libraries
import axios from "axios";
import { useEffect, useState } from "react";

function GamePage() {
  const [puzzleData, setPuzzleData] = useState(null);
  const [genreData, setGenreData] = useState(null);
  const [guesses, setGuesses] = useState([]);

  /**
   * Function to retrieve genre information from TMDB
   */
  const getGenres = async () => {
    await axios
      .get(
        `https://api.themoviedb.org/3/genre/movie/list?api_key=1d1a538338aaac91dbf1adc28d4663aa&language=en-US`
      )
      .then((res) => setGenreData(res.data.genres))
      .catch((e) => console.log(e));
  };

  /**
   * useEffect to load genre details from TMDB.
   */
  useEffect(() => {
    getGenres();
  }, []);

  /**
   * Function to retrieve the the most recently generated puzzle.
   */
  const getLatestPuzzle = async () => {
    await axios
      .get(`http://Matthews-MacBook-Pro.local:8888/puzzle/`)
      .then((res) => {
        setPuzzleData(res.data);
      })
      .catch((e) => {
        console.error(e);
      });
  };

  /**
   * useEffect to load the latest puzzle.
   */
  useEffect(() => {
    getLatestPuzzle();
  }, []);

  return (
    <>
      {puzzleData ? (
        <Hero
          puzzle={puzzleData.puzzle}
          guesses={guesses}
          setGuesses={setGuesses}
        />
      ) : null}
      <div className="movie">
        {puzzleData && genreData ? (
          puzzleData.puzzle.map((movie) => (
            <Movie
              key={movie.id}
              movie={movie}
              genres={genreData}
              guesses={guesses}
            />
          ))
        ) : (
          <div className="loading--box">
            <img className="loading--gif" src={loading} alt="loading" />
          </div>
        )}
      </div>
    </>
  );
}

export default GamePage;
