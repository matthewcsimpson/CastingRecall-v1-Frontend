// Styles
import "./GuessForm.scss";

// Libraries
import { useEffect, useMemo, useState, useCallback, useRef } from "react";
import axios from "axios";

// Utilities
import { formatDate, YEAR_ONLY_DATE_OPTIONS } from "../../utilities";

// Components
import { LoadingScreen } from "..";

// Constants
const TMDB_DEBOUNCE_DELAY_MS = 300;
const TMDB_SUGGESTION_LIMIT = 10;
const EXCLUDED_GENRES = [99, 10770];
const MIN_RUNTIME_MINUTES = 40;

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
  const REACT_APP_TMDB_DISCOVER_URL = process.env.REACT_APP_TMDB_DISCOVER_URL;
  const REACT_APP_TMDB_LOWEST_YEAR = process.env.REACT_APP_TMDB_LOWEST_YEAR;

  // State
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  // Memoized values
  const tmdbLowestYear = useMemo(() => {
    const parsedYear = Number.parseInt(REACT_APP_TMDB_LOWEST_YEAR ?? "", 10);
    return Number.isFinite(parsedYear) ? parsedYear : null;
  }, [REACT_APP_TMDB_LOWEST_YEAR]);
  const tmdbLatestDate = useMemo(
    () => new Date().toISOString().slice(0, 10),
    []
  );

  // Trimmed search query
  const trimmedQuery = useMemo(() => searchQuery.trim(), [searchQuery]);

  // Determine if the game is complete
  const gameComplete = useMemo(() => youWon || youLost, [youWon, youLost]);

  // Dynamic class name for the input field
  const inputClassName = useMemo(
    () =>
      gameComplete
        ? "hero__guessinput hero__guessinput--complete"
        : "hero__guessinput",
    [gameComplete]
  );

  // Placeholder text for the input field
  const placeholderText = useMemo(() => {
    if (gameComplete) {
      return "You finished this game!";
    }
    const guessesLeft = Math.max(maxGuesses - guessNum, 0);
    return `Enter a guess.  You have ${guessesLeft} guesses left...`;
  }, [gameComplete, guessNum, maxGuesses]);

  // Cache for search results to avoid repeat requests
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

  /**
   * Function to handle when a suggestion is selected.
   * @param {*} evt
   */
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

  /**
   * Function to fetch suggestions from TMDB based on the query.
   * @param {string} query
   * @param {AbortController} controller
   */
  const fetchSuggestions = useCallback(
    async (query, controller) => {
      if (!REACT_APP_TMDB_DISCOVER_URL) {
        console.error("TMDB search URL is not configured.");
        return;
      }

      try {
        const url = new URL(REACT_APP_TMDB_DISCOVER_URL);
        url.searchParams.set("include_adult", "false");
        url.searchParams.set("region", "US");
        url.searchParams.set("language", "en-US");
        url.searchParams.set("page", "1");
        url.searchParams.set("with_text_query", query);
        url.searchParams.set("sort_by", "revenue.desc");
        url.searchParams.set("with_runtime.gte", String(MIN_RUNTIME_MINUTES));

        console.log("url", url.toString());
        if (tmdbLowestYear) {
          url.searchParams.set(
            "primary_release_date.gte",
            `${tmdbLowestYear}-01-01`
          );
        }

        if (tmdbLatestDate) {
          url.searchParams.set("primary_release_date.lte", tmdbLatestDate);
        }

        const response = await axios.get(url.toString(), {
          signal: controller?.signal,
          headers: {
            Authorization: `Bearer ${REACT_APP_TMDB_TOKEN}`,
            Accept: "application/json",
          },
        });

        const rawResults = Array.isArray(response?.data?.results)
          ? response.data.results
          : [];

        const filteredResults = rawResults.filter((movie) => {
          const runtimeMinutes =
            typeof movie?.runtime === "number" ? movie.runtime : null;
          const releaseDate =
            typeof movie?.release_date === "string" ? movie.release_date : "";

          const genres = movie?.genre_ids;

          if (
            Number.isFinite(runtimeMinutes) &&
            runtimeMinutes < MIN_RUNTIME_MINUTES
          ) {
            return false;
          }

          if (
            Array.isArray(genres) &&
            genres.some((genreId) => EXCLUDED_GENRES.includes(genreId))
          ) {
            return false;
          }

          if (!releaseDate) {
            return true;
          }

          if (tmdbLatestDate && releaseDate > tmdbLatestDate) {
            return false;
          }

          if (!tmdbLowestYear) {
            return true;
          }

          const releaseYear = Number.parseInt(releaseDate.slice(0, 4), 10);

          if (!Number.isFinite(releaseYear)) {
            return true;
          }

          return releaseYear >= tmdbLowestYear;
        });

        const limitedResults = filteredResults.slice(0, TMDB_SUGGESTION_LIMIT);
        searchCache.current.set(query, limitedResults);
        setSearchResults(limitedResults);
      } catch (err) {
        if (axios.isCancel?.(err) || err.name === "CanceledError") {
          return;
        }

        if (err instanceof TypeError) {
          console.error("Failed to build TMDB request URL.", err);
          return;
        }

        console.error(err);
      }
    },
    [
      REACT_APP_TMDB_DISCOVER_URL,
      REACT_APP_TMDB_TOKEN,
      tmdbLowestYear,
      tmdbLatestDate,
    ]
  );

  // Effect to fetch suggestions when the search query changes
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

    if (!REACT_APP_TMDB_DISCOVER_URL) {
      console.error("TMDB search URL is not configured.");
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
  }, [
    REACT_APP_TMDB_TOKEN,
    REACT_APP_TMDB_DISCOVER_URL,
    trimmedQuery,
    fetchSuggestions,
  ]);

  // Effect to clear search state when the puzzle ID changes
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
