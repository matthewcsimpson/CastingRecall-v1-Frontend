// Styles
import "./GuessForm.scss";

// Components & Data
import API from "../../data/api_info.json";

// Libraries
import { useEffect, useState } from "react";
import axios from "axios";

// Utilities
import { formatDate } from "../../utilities/utilities";

// Variables
const dateOptions = {
  year: "numeric",
};

function GuessForm({ puzzleData, guesses, correctGuesses, handleGuesses }) {
  const [titleQuery, setTitleQuery] = useState([]);
  const [searchTitles, setSearchTitles] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [guessIdsArray, setGuessIdsArray] = useState([]);
  const [guessId, setGuessId] = useState(null);
  const [youLost, setYouLost] = useState(false);

  /**
   * Handle when one of the auto-complete items is clicked on.
   * @param {event} e
   */
  const handleListItemClick = (event) => {
    event.preventDefault();
    setGuessId(event.target.id);
    setSearchTitles([]);
  };

  /**
   * Submit a guess.
   * @param {titleQuery} tq
   * @param {guessId} gid
   * @param {puzzleData} puzzle
   */
  const handleSubmit = (tq, gid) => {
    if (tq.length !== 0) {
      axios
        .get(`${API.api_movie_search_url}${gid}?api_key=${API.api_key}`)
        .then((res) => {
          handleGuesses([...guesses, res.data]);
          setTitleQuery("");
        })
        .catch((err) => console.error(err));
    }
  };

  /**
   * load autocomplete data
   * @param {*} tq
   */
  const loadAutoComplete = (tq) => {
    if (tq.length !== 0) {
      axios
        .get(`${API.api_search_url}&api_key=${API.api_key}&query=${tq}`)
        .then((res) => {
          let filteredResults = res.data.results.filter((movie) => {
            return !guessIdsArray.includes(movie.id);
          });
          setSearchTitles(filteredResults);
        })
        .catch((err) => console.error(err));
    }
  };

  /**
   * useEffect to load auto-complete options as you type in the input field.
   */
  useEffect(() => {
    loadAutoComplete(titleQuery);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [titleQuery]);

  /**
   * useEffect calls handleSubmit to search the currently selected guess, then clears the guess.
   */
  useEffect(() => {
    handleSubmit(titleQuery, guessId);
    setGuessId(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [guessId]);

  useEffect(() => {
    let checkData = JSON.parse(
      localStorage.getItem(`${puzzleData.puzzleId}-wl`)
    );

    console.log(`guessform youLost: ${checkData}`);
  }, []);

  return (
    <div className="hero">
      <div className="hero__wrapper">
        <form className="hero__guessform" autoComplete="off">
          <input
            name="search_term"
            className="hero__guessinput"
            type="text"
            placeholder={`${10 - guesses.length} guesses left`}
            onChange={(event) => {
              if (event.target.value) {
                setTitleQuery(event.target.value);
              } else {
                setSearchTitles([]);
              }
            }}
            disabled={youLost}
          />
        </form>
        <div className="hero__suggestionpositioning">
          <ul className="hero__searchsuggestions">
            {searchTitles.length
              ? searchTitles.map((title) => {
                  return (
                    <li
                      id={title.id}
                      onClick={handleListItemClick}
                      key={title.id}
                      name={title}
                      className="hero__suggestion"
                    >
                      {title.original_title} (
                      {formatDate(title.release_date, dateOptions)})
                    </li>
                  );
                })
              : null}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default GuessForm;
