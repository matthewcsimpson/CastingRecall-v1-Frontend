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
   * Function to retrieve genre information from TMDB
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
   * Function to retrieve a specific puzzle
   * @param {*} id
   */
  const getSpecificPuzzle = async (id) => {
    await axios
      .get(`${API.api_local_url}/puzzle/${id}`)
      .then((res) => setPuzzleData(res.data))
      .catch((err) => console.error(err));
  };

  /**
   *
   */
  const setLocalDetails = () => {
    if (puzzleData && guesses) {
      const pId = puzzleData.puzzleId;
      const puzzle = {
        id: pId,
        guesses: guesses,
        youWon: youWon,
        youLost: youLost,
      };
      localStorage.setItem(pId, JSON.stringify(puzzle));
    }
  };

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
    setLocalDetails();
  };

  /**
   * Retrieve guess data stored in localStorage, if any
   */
  const getLocalGuesses = () => {
    if (puzzleData) {
      let local = JSON.parse(localStorage.getItem(puzzleData.puzzleId));
      if (local) {
        if (puzzleData.puzzleId === parseInt(local.id)) {
          setGuesses(local.guesses);
          setYouWon(local.youWon);
          setYouLost(local.youLost);
        } else {
          setGuesses([]);
        }
      }
    }
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
   * On Page Load
   * Get the specific puzzle if there is a puzzleId, otherwise get the latest puzzle
   */
  useEffect(() => {
    if (puzzleId) {
      getSpecificPuzzle(puzzleId);
    } else {
      getSpecificPuzzle("latest");
    }
    setLocalDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * On puzzleId changing
   * load puzzle details.  if there is a puzzleId, pull that puzzle.  if else, pull the latest puzzle.
   */
  useEffect(() => {
    if (puzzleId) {
      getSpecificPuzzle(puzzleId);
    } else {
      getSpecificPuzzle("latest");
    }
  }, [puzzleId]);

  /**
   * Update the win/lose conditions based on the guesses
   */
  useEffect(() => {
    let correctCounter = guesses.filter((guess) => guess.correct === true);
    if (correctCounter.length > 5) {
      setYouWon(true);
    }
    if (guesses.length > 9) {
      setYouLost(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [guesses]);

  /**
   *  Set details stored in state to localStorate, and then clear, when the puzzleId changes
   */
  useEffect(() => {
    setLocalDetails();
    setGuesses([]);
    setYouWon(false);
    setYouLost(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [puzzleId]);

  /**
   * Load local details
   */
  useEffect(() => {
    getLocalGuesses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [puzzleData]);

  // ------------------------------------------------------------------------functions

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
          puzzleData.puzzle.map((movie, i) => (
            <Movie
              key={`${i}-${movie.id}`}
              movie={movie}
              genres={genreData}
              guesses={guesses}
              youWon={youWon}
              youLost={youLost}
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
