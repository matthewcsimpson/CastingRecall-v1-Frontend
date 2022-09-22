// Styles
import "./GamePage.scss";

// Components
import Hero from "../../components/Hero/Hero";
import ActorList from "../../components/ActorList/ActorList";

// Libraries
import axios from "axios";
import { useEffect, useState } from "react";

function GamePage() {
  const [movieIds, setMovieIds] = useState(null);
  const [actors, setActors] = useState(null);

  const getData = () => {
    axios.get(`http://localhost:8888/puzzle/`).then((res) => {
      console.log(res.data.actors);
      setMovieIds(res.data.movies);
      setActors(res.data.actors);
    });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <Hero movieIds={movieIds} />
      {actors && <ActorList actors={actors} />}
    </>
  );
}

export default GamePage;
