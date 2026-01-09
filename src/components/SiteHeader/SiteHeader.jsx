// Styles
import "./SiteHeader.scss";

// Libraries
import { Link } from "react-router-dom";

const SiteHeader = () => {
  return (
    <header className="header">
      <div className="header__wrapper">
        <div className="header__clappertop">
          <div className="header__clappertop--white"></div>
          <div className="header__clappertop--white"></div>
          <div className="header__clappertop--white"></div>
          <div className="header__clappertop--white"></div>
          <div className="header__clappertop--white"></div>
        </div>
        <div className="header__clapperbottom">
          <div className="header__clapperbottom--white"></div>
          <div className="header__clapperbottom--white"></div>
          <div className="header__clapperbottom--white"></div>
          <div className="header__clapperbottom--white"></div>
          <div className="header__clapperbottom--white"></div>
        </div>
        <h1 className="header__heading">
          <Link to="/" className="header__headinglink">
            Casting ReCall
          </Link>
        </h1>
        <p className="header__subtitle">
          Can you guess the six films based on who starred in them?
        </p>
      </div>
    </header>
  );
};

export default SiteHeader;
