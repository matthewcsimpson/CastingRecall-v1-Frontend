function SiteNav({ puzzleId, puzzleList }) {
  return (
    <>
      <div className="nav">
        <div className="nav__wrapper">
          <ul className="nav__list">
            <li className="nav__item">
              <span className="nav__item nav__item--hidden">⬅️</span> Prev
              Puzzle
            </li>
            <li className="nav__item">How to Play</li>
            <li className="nav__item">Puzzle List</li>
            <li className="nav__item">Latest Puzzle</li>
            <li className="nav__item">
              Next Puzzle{" "}
              <span className="nav__item nav__item--hidden">➡️</span>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default SiteNav;
