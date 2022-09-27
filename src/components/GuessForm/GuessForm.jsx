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

function GuessForm({ guesses, setGuesses, correctGuesses }) {
  const [titleQuery, setTitleQuery] = useState([]);
  const [searchTitles, setSearchTitles] = useState([]);
  const [guessIdsArray, setGuessIdsArray] = useState([]);
  const [guessId, setGuessId] = useState(null);

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
   * Handle when the form is submitted / guess is made
   */
  const handleSubmit = () => {
    if (titleQuery.length !== 0) {
      axios
        .get(`${API.api_movie_search_url}${guessId}?api_key=${API.api_key}`)
        .then((res) => {
          setGuesses([...guesses, res.data]);
          setTitleQuery("");
        })
        .catch((err) => console.error(err));
    }
  };

  /**
   * useEffect to load auto-complete options as you type in the inpur field.
   */
  useEffect(() => {
    if (titleQuery.length !== 0) {
      axios
        .get(`${API.api_search_url}&api_key=${API.api_key}&query=${titleQuery}`)
        .then((res) => {
          let filteredResults = res.data.results.filter((movie) => {
            return !guessIdsArray.includes(movie.id);
          });
          setSearchTitles(filteredResults);
        })
        .catch((err) => console.error(err));
    }
  }, [titleQuery]);

  /**
   * useEffect calls handleSubmit to search the currently selected guess, then clears the guess.
   */
  useEffect(() => {
    handleSubmit();
    setGuessId(null);
  }, [guessId]);

  useEffect(() => {
    let tempIds = guesses.map((guess) => guess.id);
    setGuessIdsArray(tempIds);
  }, [guesses]);

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
            disabled={correctGuesses.length > 5 || guesses.length > 9}
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
