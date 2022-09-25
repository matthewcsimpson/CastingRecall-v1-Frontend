// Styles
import "./Hero.scss";

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

function Hero({ puzzle, guesses, setGuesses }) {
  const [titleQuery, setTitleQuery] = useState([]);
  const [searchTitles, setSearchTitles] = useState([]);
  const [tempGuess, setTempGuess] = useState(null);
  const [guessId, setGuessId] = useState(null);

  /**
   * Handle the incoming input and use the specified callback function
   * @param {event} e
   * @param {function} setFunc
   */
  const handleStateChange = (e, setFunc) => {
    setFunc(e.target.value);
  };

  /**
   * Handle when one of the auto-complete items is clicked on.
   * @param {event} e
   */
  const handleListItemClick = (e) => {
    e.preventDefault();
    setGuessId(e.target.id);
    setTempGuess(e.target.innerHTML);
    setSearchTitles([]);
  };

  /**
   * Handle when the form is submitted / guess is made
   * @param {event} e
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    if (titleQuery.length !== 0) {
      axios
        .get(`${API.api_movie_search_url}${guessId}?api_key=${API.api_key}`)
        .then((res) => {
          setGuesses([...guesses, res.data]);
          setTitleQuery("");
        })
        .catch((err) => console.error(err));
    } else {
      alert("you need to enter something!");
    }
  };

  const isGuessCorrect = (guessid, puzzle) => {
    return puzzle.find((p) => p.id === guessid);
  };

  /**
   * useEffect to load auto-complete options as you type in the inpur field.
   */
  useEffect(() => {
    if (titleQuery.length !== 0) {
      axios
        .get(`${API.api_search_url}&api_key=${API.api_key}&query=${titleQuery}`)
        .then((res) => {
          setSearchTitles(res.data.results);
        })
        .catch((err) => console.error(err));
    }
  }, [titleQuery]);

  return (
    <div className="hero">
      <div className="hero__wrapper">
        <form
          className="hero__guessform"
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          <div className="hero__suggestionpositioning">
            <input
              name="search_term"
              value={tempGuess ? tempGuess : undefined}
              className="hero__guessinput"
              type="text"
              placeholder="Type a movie title..."
              onFocus={() => setTempGuess("")}
              onChange={(e) => {
                if (e.target.value) {
                  handleStateChange(e, setTitleQuery);
                } else {
                  setSearchTitles([]);
                }
              }}
            />
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
          <button className="hero__guessbutton">Guess!</button>
        </form>
        <div className="hero__guesslist">
          <ul>
            {guesses
              ? guesses.map((guess) => {
                  return (
                    <li
                      key={guess.id}
                      className={
                        isGuessCorrect(guess.id, puzzle)
                          ? `hero__guess hero__guess--correct`
                          : `hero__guess hero__guess--incorrect`
                      }
                    >
                      {guess.original_title}
                    </li>
                  );
                })
              : ""}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Hero;
