// styles
import "./styles/style.scss";

// Components
import Header from "./components/SiteHeader/SiteHeader";
import SiteFooter from "./components/SiteFooter/SiteFooter";

// Pages
import GamePage from "./pages/GamePage/GamePage";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Header />

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<GamePage />} />
        </Routes>
      </BrowserRouter>
      <SiteFooter />
    </>
  );
}

export default App;
