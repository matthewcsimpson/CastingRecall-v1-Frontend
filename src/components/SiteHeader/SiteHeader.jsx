// Styles
import "./SiteHeader.scss";

function Header() {
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
        <h1 className="header__heading">Casting ReCall</h1>
        <p className="header__subtitle">
          Can you guess the movie based on who starred in it?
        </p>
      </div>
    </header>
  );
}

export default Header;
