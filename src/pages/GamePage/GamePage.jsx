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
import { useParams } from "react-router-dom";

function GamePage() {
  const [puzzleData, setPuzzleData] = useState(null);
  const [genreData, setGenreData] = useState(null);
  const [guesses, setGuesses] = useState([]);
  const [correctGuesses, setCorrectGuesses] = useState([]);
  const { puzzleId } = useParams();

  /**
   * Handle incoming guesses and write them to local storage.
   * @param {*} guesses
   */
  const handleGuesses = (guesses) => {
    setGuesses(guesses);
    const pId = puzzleData.puzzleId;
    const puzzle = {
      id: pId,
      guesses: guesses,
    };
    localStorage.setItem("castingrecall", JSON.stringify(puzzle));
  };

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
   * Retrieve guess data stored in localStorage, if any
   * @param {object} puzzleData
   */
  const getLocalGuesses = async (puzzleData) => {
    const localGuesses = JSON.parse(localStorage.getItem("castingrecall"));
    if (localGuesses && puzzleData) {
      if (puzzleData.puzzleId === localGuesses.id) {
        setGuesses(localGuesses.guesses);
      }
    }
  };

  /**
   * useEffect to load genre details from TMDB.
   */
  useEffect(() => {
    getGenres();
    getLatestPuzzle();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * useEffect to load guesses from localStorage
   */
  useEffect(() => {
    getLocalGuesses(puzzleData);
  }, [puzzleData]);

  useEffect(() => {
    console.log(correctGuesses);
  }, [correctGuesses]);

  return (
    <>
      {puzzleData ? (
        <Hero
          puzzle={puzzleData.puzzle}
          guesses={guesses}
          setGuesses={handleGuesses}
          correctGuesses={correctGuesses}
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
              correctGuesses={correctGuesses}
              setCorrectGuesses={setCorrectGuesses}
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
