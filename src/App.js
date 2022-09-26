// styles
import "./styles/style.scss";

// Components
import Header from "./components/SiteHeader/SiteHeader";
import SiteFooter from "./components/SiteFooter/SiteFooter";

// Pages
import GamePage from "./pages/GamePage/GamePage";
// import ListPage from "./pages/ListPage/ListPage";

// Libraries
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<GamePage />} />
          <Route path="/puzzle/:puzzleId" element={<GamePage />} />
          {/* <Route path="/list" element={<ListPage />} />
          <Route path="*" element={<GamePage />} /> */}
        </Routes>
      </BrowserRouter>
      <SiteFooter />
    </>
  );
}

export default App;
