// Styles
import "./GuessForm.scss";

// Libraries
import { useState } from "react";
import axios from "axios";

// Utilities
import { formatDate } from "../../utilities/utilities";

// Components
import LoadingScreen from "../LoadingScreen/LoadingScreen";

// Variables
const dateOptions = {
  year: "numeric",
};

function GuessForm({
  puzzleData,
  guessNum,
  youWon,
  youLost,
  handleSubmitGuess,
}) {
  // Data
  const REACT_APP_TMDB_KEY = process.env.REACT_APP_TMDB_KEY;
  const REACT_APP_TMDB_SEARCH_URL = process.env.REACT_APP_TMDB_SEARCH_URL;

  const [searchQuery, setSearchQuery] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  /**
   * Function to handle fom field input one char at a time.
   * @param {*} event
   */
  const handleFieldChange = async (event) => {
    await setSearchQuery(event.target.value);
    await axios
      .get(
        `${REACT_APP_TMDB_SEARCH_URL}&api_key=${REACT_APP_TMDB_KEY}&page=1&language=en-US&region=US&query=${searchQuery}`
      )
      .then((res) => {
        if (event.target.value.length > 0) {
          setSearchResults(res.data.results);
        } else {
          setSearchResults([]);
        }
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="hero">
      <div className="hero__wrapper">
        {puzzleData ? (
          <form className="hero__guessform" autoComplete="off">
            <input
              name="search_term"
              className="hero__guessinput"
              type="text"
              value={searchQuery}
              placeholder={`${10 - guessNum} guesses left`}
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
                            setSearchQuery([]);
                          }}
                        >
                          {movie.title} (
                          {formatDate(movie.release_date, dateOptions)})
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
}

export default GuessForm;
