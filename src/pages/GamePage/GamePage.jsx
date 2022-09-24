// Styles
import "./GamePage.scss";

// Components
import Hero from "../../components/Hero/Hero";
import Movie from "../../components/Movie/Movie";

// Libraries
import axios from "axios";
import { useEffect, useState } from "react";

function GamePage() {
  const [puzzleData, setPuzzleData] = useState(null);
  const [genreData, setGenreData] = useState(null);
  const [guesses, setGuesses] = useState([]);

  const getData = async () => {
    await axios
      .get(`http://Matthews-MacBook-Pro.local:8888/puzzle/`)
      .then((res) => {
        setPuzzleData(res.data);
      })
      .catch((e) => {
        console.error(e);
      });
    await axios
      .get(
        `https://api.themoviedb.org/3/genre/movie/list?api_key=1d1a538338aaac91dbf1adc28d4663aa&language=en-US`
      )
      .then((res) => setGenreData(res.data.genres))
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <Hero guesses={guesses} setGuesses={setGuesses} />
      <div className="movie">
        {puzzleData &&
          genreData &&
          puzzleData.puzzle.map((movie) => (
            <Movie
              key={movie.id}
              movie={movie}
              genres={genreData}
              guesses={guesses}
            />
          ))}
      </div>
    </>
  );
}

export default GamePage;
