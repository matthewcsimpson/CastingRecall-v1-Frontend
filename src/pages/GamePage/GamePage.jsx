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

  const getData = () => {
    axios.get(`http://localhost:8888/puzzle/`).then((res) => {
      setPuzzleData(res.data);
    });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <Hero />
      {puzzleData && puzzleData.puzzle.map((movie) => <Movie movie={movie} />)}
    </>
  );
}

export default GamePage;
