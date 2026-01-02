// styles
import "./styles/style.scss";

// Components
import { SiteFooter, SiteHeader } from "./components";

// Pages
import GamePage from "./pages/GamePage/GamePage";
import ListPage from "./pages/ListPage/ListPage";

// Libraries
import { BrowserRouter, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <>
      <SiteHeader />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<GamePage />} />
          <Route path="/puzzle/:puzzleId" element={<GamePage />} />
          <Route path="/puzzle/list" element={<ListPage />} />
          <Route path="*" element={<GamePage />} />
        </Routes>
      </BrowserRouter>
      <SiteFooter />
    </>
  );
};

export default App;
