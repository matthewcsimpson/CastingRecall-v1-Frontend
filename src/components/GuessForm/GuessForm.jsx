// Styles
import "./GuessForm.scss";

// Libraries
import { useEffect, useMemo, useState, useCallback, useRef } from "react";
import axios from "axios";

// Utilities
import { formatDate, YEAR_ONLY_DATE_OPTIONS } from "../../utilities";

// Components
import { LoadingScreen } from "..";

const TMDB_DEBOUNCE_DELAY_MS = 300;
const TMDB_SUGGESTION_LIMIT = 10;

const GuessForm = ({
  puzzleId,
  puzzleData,
  guessNum,
  maxGuesses,
  youWon,
  youLost,
  handleSubmitGuess,
}) => {
  // Data
  const REACT_APP_TMDB_TOKEN = process.env.REACT_APP_TMDB_TOKEN;
  const REACT_APP_TMDB_SEARCH_URL = process.env.REACT_APP_TMDB_SEARCH_URL;

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const trimmedQuery = useMemo(() => searchQuery.trim(), [searchQuery]);
  const gameComplete = useMemo(() => youWon || youLost, [youWon, youLost]);
  const inputClassName = useMemo(
    () =>
      gameComplete
        ? "hero__guessinput hero__guessinput--complete"
        : "hero__guessinput",
    [gameComplete]
  );
  const placeholderText = useMemo(() => {
    if (gameComplete) {
      return "You finished this game!";
    }
    const guessesLeft = Math.max(maxGuesses - guessNum, 0);
    return `Enter a guess.  You have ${guessesLeft} guesses left...`;
  }, [gameComplete, guessNum, maxGuesses]);

  const searchCache = useRef();
  if (!searchCache.current) {
    searchCache.current = new Map();
  }

  /**
   * Function to handle form field input one char at a time.
   * @param {*} evt
   */
  const handleFieldChange = useCallback((evt) => {
    setSearchQuery(evt.target.value);
  }, []);

  const handleSuggestionSelect = useCallback(
    (evt) => {
      evt.preventDefault();
      const movieId = Number(evt.currentTarget.dataset.movieId);
      if (!movieId) {
        return;
      }

      const selectedMovie = searchResults.find((movie) => movie.id === movieId);
      if (!selectedMovie) {
        return;
      }

      handleSubmitGuess(selectedMovie);
      setSearchResults([]);
      setSearchQuery("");
    },
    [handleSubmitGuess, searchResults]
  );

  const fetchSuggestions = useCallback(
    async (query, controller) => {
      try {
        const response = await axios.get(
          `${REACT_APP_TMDB_SEARCH_URL}&page=1&language=en-US&region=US&query=${encodeURIComponent(
            query
          )}`,
          {
            signal: controller?.signal,
            headers: {
              Authorization: `Bearer ${REACT_APP_TMDB_TOKEN}`,
              Accept: "application/json",
            },
          }
        );
        const limitedResults = (response.data.results || []).slice(
          0,
          TMDB_SUGGESTION_LIMIT
        );
        searchCache.current.set(query, limitedResults);
        setSearchResults(limitedResults);
      } catch (err) {
        if (axios.isCancel?.(err) || err.name === "CanceledError") {
          return;
        }
        console.error(err);
      }
    },
    [REACT_APP_TMDB_SEARCH_URL, REACT_APP_TMDB_TOKEN]
  );

  useEffect(() => {
    if (!trimmedQuery || trimmedQuery.length < 2) {
      setSearchResults([]);
      return;
    }

    if (!REACT_APP_TMDB_TOKEN) {
      console.error("TMDB bearer token is not configured.");
      setSearchResults([]);
      return;
    }

    if (searchCache.current.has(trimmedQuery)) {
      setSearchResults(searchCache.current.get(trimmedQuery));
      return;
    }

    const controller = new AbortController();
    const debounce = setTimeout(() => {
      fetchSuggestions(trimmedQuery, controller);
    }, TMDB_DEBOUNCE_DELAY_MS);

    return () => {
      controller.abort();
      clearTimeout(debounce);
    };
  }, [REACT_APP_TMDB_TOKEN, trimmedQuery, fetchSuggestions]);

  useEffect(() => {
    setSearchResults([]);
    setSearchQuery("");
    searchCache.current.clear();
  }, [puzzleId]);

  return (
    <div className="hero">
      <div className="hero__wrapper">
        {puzzleData ? (
          <form className="hero__guessform" autoComplete="off">
            <input
              name="search_term"
              className={inputClassName}
              type="text"
              value={searchQuery}
              placeholder={placeholderText}
              onChange={handleFieldChange}
              disabled={gameComplete}
            />
            <div className="hero__suggestionpositioning">
              <ul className="hero__searchsuggestions">
                {searchResults &&
                  searchResults.map((movie) => {
                    return (
                      <li key={movie.id}>
                        <button
                          className="hero__suggestion"
                          id={movie.id}
                          type="button"
                          data-movie-id={movie.id}
                          onClick={handleSuggestionSelect}
                        >
                          {movie.title} (
                          {formatDate(
                            movie.release_date,
                            YEAR_ONLY_DATE_OPTIONS
                          )}
                          )
                        </button>
                      </li>
                    );
                  })}
              </ul>
            </div>
          </form>
        ) : (
          <LoadingScreen />
        )}
      </div>
    </div>
  );
};

export default GuessForm;
