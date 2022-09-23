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

  const getData = () => {
    axios
      .get(`http://localhost:8888/puzzle/`)
      .then((res) => {
        setPuzzleData(res.data);
      })
      .catch((e) => {
        console.error(e);
      });
    axios
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
      <Hero />
      <div className="movie">
        {puzzleData &&
          puzzleData.puzzle.map((movie) => (
            <Movie key={movie.id} movie={movie} genres={genreData} />
          ))}
      </div>
    </>
  );
}

export default GamePage;
