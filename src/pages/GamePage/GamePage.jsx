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
import { useParams } from "react-router-dom";

// Hooks
import { useGenres, usePuzzleData, useGuessState } from "../../hooks";

const GamePage = ({ puzzleList }) => {
  // Data
  const REACT_APP_TMDB_TOKEN = process.env.REACT_APP_TMDB_TOKEN;
  const REACT_APP_TMDB_GENRE_DETAILS = process.env.REACT_APP_TMDB_GENRE_DETAILS;
  const REACT_APP_API_REMOTE_URL = process.env.REACT_APP_API_REMOTE_URL;

  let { puzzleId } = useParams();

  const genreData = useGenres(
    REACT_APP_TMDB_GENRE_DETAILS,
    REACT_APP_TMDB_TOKEN
  );
  const { data: puzzleData, isLoading: isPuzzleLoading } = usePuzzleData(
    REACT_APP_API_REMOTE_URL,
    puzzleId
  );
  const {
    guesses,
    youWon,
    youLost,
    totalGuesses,
    maxGuesses,
    handleSubmitGuess,
    handleHintUse,
  } = useGuessState(puzzleData);

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
            guessNum={totalGuesses}
            maxGuesses={maxGuesses}
            youWon={youWon}
            youLost={youLost}
            handleSubmitGuess={handleSubmitGuess}
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
              reallyWantHints={true}
              onHintSpend={handleHintUse}
            />
          ))
        ) : isPuzzleLoading ? (
          <LoadingScreen />
        ) : null}
      </div>
    </>
  );
};

export default GamePage;
