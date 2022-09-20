// Styles
import "./GamePage.scss";

// Libraries
// import { axios } from "axios";

// Variables
// import {
//   TMDB_API_KEY,
//   TMDB_SEARCH_POP_URL,
//   TMDB_SEARCH_CREDITS_FRONT,
//   TMBD_SEARCH_CREDITS_BACK,
//   TMDB_DISCOVER_MOVIE_BY_ACTOR,
// } from "../../data/api.json";

const LOWEST_YEAR = 1990;
const CURRENT_YEAR = new Date().getFullYear();

function GamePage() {
  const randomYear = Math.floor(
    Math.random() * (CURRENT_YEAR - LOWEST_YEAR) + LOWEST_YEAR
  );

  console.log(randomYear);

  // const buildPuzzle = () => {};

  return <></>;
}

export default GamePage;
