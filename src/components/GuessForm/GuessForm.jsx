// Styles
import "./GuessForm.scss";

// Libraries
import { useEffect, useMemo, useState } from "react";
import axios from "axios";

// Utilities
import { formatDate, YEAR_ONLY_DATE_OPTIONS } from "../../utilities";

// Components
import { LoadingScreen } from "..";

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
  const REACT_APP_TMDB_KEY = process.env.REACT_APP_TMDB_KEY;
  const REACT_APP_TMDB_SEARCH_URL = process.env.REACT_APP_TMDB_SEARCH_URL;

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const trimmedQuery = useMemo(() => searchQuery.trim(), [searchQuery]);

  /**
   * Function to handle fom field input one char at a time.
   * @param {*} event
   */
  const handleFieldChange = (event) => {
    setSearchQuery(event.target.value);
  };

  useEffect(() => {
    if (!trimmedQuery) {
      setSearchResults([]);
      return;
    }

    const controller = new AbortController();
    const debounce = setTimeout(async () => {
      try {
        const response = await axios.get(
          `${REACT_APP_TMDB_SEARCH_URL}&api_key=${REACT_APP_TMDB_KEY}&page=1&language=en-US&region=US&query=${encodeURIComponent(
            trimmedQuery
          )}`,
          { signal: controller.signal }
        );
        setSearchResults(response.data.results || []);
      } catch (err) {
        if (axios.isCancel?.(err) || err.name === "CanceledError") {
          return;
        }
        console.error(err);
      }
    }, 300);

    return () => {
      controller.abort();
      clearTimeout(debounce);
    };
  }, [REACT_APP_TMDB_KEY, REACT_APP_TMDB_SEARCH_URL, trimmedQuery]);

  useEffect(() => {
    setSearchResults([]);
    setSearchQuery("");
  }, [puzzleId]);

  return (
    <div className="hero">
      <div className="hero__wrapper">
        {puzzleData ? (
          <form className="hero__guessform" autoComplete="off">
            <input
              name="search_term"
              className={
                youWon || youLost
                  ? `hero__guessinput hero__guessinput--complete`
                  : `hero__guessinput`
              }
              type="text"
              value={searchQuery}
              placeholder={
                youWon || youLost
                  ? `You finished this game!`
                  : `Enter a guess.  You have ${
                      maxGuesses - guessNum
                    } guesses left...`
              }
              onChange={(event) => {
                handleFieldChange(event);
              }}
              disabled={youWon || youLost}
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
                          onClick={(event) => {
                            event.preventDefault();
                            handleSubmitGuess(movie);
                            setSearchResults([]);
                            setSearchQuery("");
                          }}
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
