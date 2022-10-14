// styles
import "./styles/style.scss";

// Components
import Header from "./components/SiteHeader/SiteHeader";
import SiteFooter from "./components/SiteFooter/SiteFooter";

// Pages
import GamePage from "./pages/GamePage/GamePage";
import ListPage from "./pages/ListPage/ListPage";

// Libraries
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";

function App() {
  const [puzzleList, setPuzzleList] = useState(null);
  const REACT_APP_API_REMOTE_URL = process.env.REACT_APP_API_REMOTE_URL;

  /**
   * function to get a list of all puzzles
   */
  const getPuzzleList = async () => {
    await axios
      .get(`${REACT_APP_API_REMOTE_URL}/puzzle/list`)
      .then((res) => setPuzzleList([res.data].flat()))
      .catch((err) => console.error(err));
  };

  /**
   * Get the puzzle list
   */
  useEffect(() => {
    getPuzzleList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<GamePage puzzleList={puzzleList} />} />
          <Route
            path="/puzzle/:puzzleId"
            element={<GamePage puzzleList={puzzleList} />}
          />
          <Route
            path="/puzzle/list"
            element={<ListPage puzzleList={puzzleList} />}
          />
          <Route path="*" element={<GamePage puzzleList={puzzleList} />} />
        </Routes>
      </BrowserRouter>
      <SiteFooter />
    </>
  );
}

export default App;
