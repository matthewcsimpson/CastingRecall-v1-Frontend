// Components
import {
  Counter,
  GuessForm,
  LoadingScreen,
  Movie,
  SiteNav,
  YouLost,
  YouWon,
} from "../../components/";

// Libraries
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function GamePage({ puzzleList }) {
  // Data
  const REACT_APP_TMDB_KEY = process.env.REACT_APP_TMDB_KEY;
  const REACT_APP_TMDB_GENRE_DETAILS = process.env.REACT_APP_TMDB_GENRE_DETAILS;
  const REACT_APP_API_REMOTE_URL = process.env.REACT_APP_API_REMOTE_URL;

  let { puzzleId } = useParams();
  const [genreData, setGenreData] = useState(null);
  const [puzzleData, setPuzzleData] = useState(null);
  const [guesses, setGuesses] = useState([]);
  const [youLost, setYouLost] = useState(false);
  const [youWon, setYouWon] = useState(false);

  const maxGuesses = 10;

  // ------------------------------------------------------------------------functions/data loading

  /**
   * Function to retrieve genre information from TMDB
   */
  const getGenres = useCallback(async () => {
    try {
      const response = await axios.get(
        `${REACT_APP_TMDB_GENRE_DETAILS}?api_key=${REACT_APP_TMDB_KEY}&language=en-US`
      );
      setGenreData(response.data.genres);
    } catch (err) {
      console.error(err);
    }
  }, [REACT_APP_TMDB_GENRE_DETAILS, REACT_APP_TMDB_KEY]);

  /**
   * Function to retrieve a specific puzzle.
   * @param {*} id
   */
  const getSpecificPuzzle = useCallback(
    async (id, signal) => {
      try {
        const response = await axios.get(
          `${REACT_APP_API_REMOTE_URL}/puzzle/${id}`,
          { signal }
        );
        setPuzzleData(response.data);
      } catch (err) {
        if (axios.isCancel(err)) {
          return;
        }
        if (err.name === "CanceledError") {
          return;
        }
        console.error(err);
      }
    },
    [REACT_APP_API_REMOTE_URL]
  );

  /**
   * Receive a movie object from the guess form and process it.
   * @param {object} movie
   */
  const handleSubmitGuess = (movie) => {
    if (!puzzleData?.puzzle) {
      return;
    }

    setGuesses((prevGuesses) => {
      const match = puzzleData.puzzle.find(
        (puzzleMovie) => puzzleMovie.id === movie.id
      );

      if (match) {
        return [...prevGuesses, { ...match, correct: true }];
      }

      return [...prevGuesses, { ...movie, correct: false }];
    });
  };

  /**
   * Retrieve guess data stored in localStorage, if any
   */
  const getLocalGuesses = useCallback(() => {
    if (!puzzleData) {
      return;
    }

    try {
      const local = JSON.parse(localStorage.getItem(puzzleData.puzzleId));

      if (local && String(puzzleData.puzzleId) === String(local.id)) {
        setGuesses(local.guesses || []);
        setYouWon(Boolean(local.youWon));
        setYouLost(Boolean(local.youLost));
      } else {
        setGuesses([]);
        setYouWon(false);
        setYouLost(false);
      }
    } catch (err) {
      console.error(err);
      setGuesses([]);
      setYouWon(false);
      setYouLost(false);
    }
  }, [puzzleData]);

  // ------------------------------------------------------------------------useEffects
  /**
   * Get the genre list on page load.
   */
  useEffect(() => {
    getGenres();
  }, [getGenres]);

  /**
   * Load puzzle details when the puzzle id changes.
   */
  useEffect(() => {
    const controller = new AbortController();
    const activePuzzleId = puzzleId || "latest";

    getSpecificPuzzle(activePuzzleId, controller.signal);

    return () => {
      controller.abort();
    };
  }, [getSpecificPuzzle, puzzleId]);

  /**
   * Update the win/lose conditions based on the guesses
   */
  useEffect(() => {
    const correctCounter = guesses.filter((guess) => guess.correct === true);

    if (correctCounter.length === 6 && !youWon) {
      setYouWon(true);
    } else if (guesses.length === maxGuesses && !youLost) {
      setYouLost(true);
    } else if (guesses.length === 0) {
      setYouWon(false);
      setYouLost(false);
    }
  }, [guesses, maxGuesses, youLost, youWon]);

  /**
   *  Set details stored in state to localStorage, and then clear, when the puzzleId changes
   */
  useEffect(() => {
    setGuesses([]);
    setYouWon(false);
    setYouLost(false);
  }, [puzzleId]);

  /**
   * Load local details
   */
  useEffect(() => {
    getLocalGuesses();
  }, [getLocalGuesses, puzzleData]);

  useEffect(() => {
    if (!puzzleData) {
      return;
    }

    const payload = {
      id: puzzleData.puzzleId,
      guesses,
      youWon,
      youLost,
    };

    try {
      localStorage.setItem(puzzleData.puzzleId, JSON.stringify(payload));
    } catch (err) {
      console.error(err);
    }
  }, [guesses, puzzleData, youLost, youWon]);

  return (
    <>
      {Array.isArray(puzzleList) && puzzleList.length > 0 ? (
        <SiteNav puzzleId={puzzleId} puzzleList={puzzleList} />
      ) : (
        <LoadingScreen />
      )}
      <YouWon guesses={guesses} youWon={youWon} />
      <YouLost guesses={guesses} youLost={youLost} />
      {puzzleData ? (
        <>
          <GuessForm
            puzzleId={puzzleId}
            puzzleData={puzzleData}
            guessNum={guesses.length}
            maxGuesses={maxGuesses}
            youWon={youWon}
            youLost={youLost}
            handleSubmitGuess={(movie) => handleSubmitGuess(movie)}
          />
          <Counter guesses={guesses} />
        </>
      ) : null}

      <div className="movie">
        {puzzleData && genreData ? (
          puzzleData.puzzle.map((movie, i) => (
            <Movie
              key={`${i}-${movie.id}`}
              puzzleId={puzzleData.puzzleId}
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
