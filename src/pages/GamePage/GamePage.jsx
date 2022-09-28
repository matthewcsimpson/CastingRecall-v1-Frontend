// Styles
import "./GamePage.scss";

// Data
import API from "../../data/api_info.json";

// Components
import SiteNav from "../../components/SiteNav/SiteNav";
import GuessForm from "../../components/GuessForm/GuessForm";
import Movie from "../../components/Movie/Movie";
import Counter from "../../components/Counter/Counter";
import LoadingScreen from "../../components/LoadingScreen/LoadingScreen";

import YouWon from "../../components/YouWon/YouWon";
import YouLost from "../../components/YouLost/YouLost";

// Libraries
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function GamePage() {
  let { puzzleId } = useParams();
  const [genreData, setGenreData] = useState(null);
  const [puzzleList, setPuzzleList] = useState(null);
  const [puzzleData, setPuzzleData] = useState(null);
  const [guesses, setGuesses] = useState([]);
  const [youLost, setYouLost] = useState(false);
  const [youWon, setYouWon] = useState(false);

  // ------------------------------------------------------------------------data loading

  /**
   * 1. Function to retrieve genre information from TMDB
   */
  const getGenres = async () => {
    await axios
      .get(`${API.api_genre_details}?api_key=${API.api_key}&language=en-US`)
      .then((res) => setGenreData(res.data.genres))
      .catch((err) => console.error(err));
  };

  /**
   * function to get a list of all puzzles
   */
  const getPuzzleList = async () => {
    await axios
      .get(`${API.api_local_url}/puzzle/list`)
      .then((res) => setPuzzleList([res.data].flat()))
      .catch((err) => console.error(err));
  };

  /**
   * 3. Function to retrieve a specific puzzle
   * @param {*} id
   */
  const getSpecificPuzzle = async (id) => {
    await axios
      .get(`${API.api_local_url}/puzzle/${id}`)
      .then((res) => setPuzzleData(res.data))
      .catch((err) => console.error(err));
  };

  // ------------------------------------------------------------------------useEffects
  /**
   * Get the genre list
   */
  useEffect(() => {
    getGenres();
  }, []);

  /**
   * Get the puzzle list
   */
  useEffect(() => {
    getPuzzleList();
  }, []);

  /**
   * Get the specific puzzle if there is a puzzleId, otherwise get the latest puzzle
   */
  useEffect(() => {
    console.log(puzzleList);
    if (puzzleId) {
      getSpecificPuzzle(puzzleId);
    } else {
      getSpecificPuzzle("latest");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (puzzleId) {
      getSpecificPuzzle(puzzleId);
    } else {
      getSpecificPuzzle("latest");
    }
  }, [puzzleId]);

  useEffect(() => {
    let correctCounter = guesses.filter((guess) => guess.correct === true);
    if (correctCounter.length > 5) {
      setYouWon(true);
    }
    if (guesses.length > 9) {
      setYouLost(true);
    }
    console.log("winCounter: ", correctCounter.length, "youWon: ", youWon);
    console.log("guesses: ", guesses.length, "youLost: ", youLost);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [guesses.length]);

  useEffect(() => {
    setGuesses([]);
    setYouWon(false);
    setYouLost(false);
  }, [puzzleId]);

  // check all the data
  useEffect(() => {
    console.log("genreData: ", genreData);
    console.log("puzzleList: ", puzzleList);
    console.log("puzleId: ", puzzleId);
    console.log("guesses: ", guesses);
  }, [genreData, puzzleList, puzzleId, guesses]);

  // check all the data
  useEffect(() => {
    const storage = {
      id: puzzleId,
      puzzleData: puzzleData,
      guesses: guesses,
      youWon: youWon,
      youLost: youLost,
    };

    localStorage.setItem(puzzleId, JSON.stringify(storage));
  }, [puzzleId, puzzleData, guesses, youLost, youWon]);

  // ------------------------------------------------------------------------functions
  /**
   * Receive a movie object from the guess form and process it.
   * @param {*} movie
   */
  const handleSubmitGuess = (movie) => {
    if (puzzleData.puzzle) {
      let goodGuess = puzzleData.puzzle.find((puzzleMovie) =>
        puzzleMovie.id === movie.id ? true : false
      );
      if (goodGuess) {
        goodGuess = { ...goodGuess, ...{ correct: true } };
        setGuesses([...guesses, goodGuess]);
      } else {
        let badGuess = { ...movie, ...{ correct: false } };
        setGuesses([...guesses, badGuess]);
      }
    }
  };

  return (
    <>
      {puzzleList ? (
        <SiteNav puzzleId={puzzleId} puzzleList={puzzleList} />
      ) : (
        <LoadingScreen />
      )}
      {puzzleData ? (
        <>
          <GuessForm
            puzzleData={puzzleData}
            guessNum={guesses.length}
            youWon={youWon}
            youLost={youLost}
            handleSubmitGuess={(movie) => handleSubmitGuess(movie)}
          />
          <Counter guesses={guesses} />
        </>
      ) : null}
      <YouWon guesses={guesses} youWon={youWon} />
      <YouLost guesses={guesses} youLost={youLost} />

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
          <LoadingScreen />
        )}
      </div>
    </>
  );
}

export default GamePage;
