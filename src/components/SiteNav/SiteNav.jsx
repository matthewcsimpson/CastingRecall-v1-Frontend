// Styles
import "./SiteNav.scss";

// Libraries
import { NavLink } from "react-router-dom";

function SiteNav({ puzzleId, puzzleList }) {
  if (!puzzleId) {
    puzzleId = puzzleList[puzzleList.length - 1];
  }

  let index = "";
  if (puzzleList) {
    index = puzzleList.indexOf(puzzleId);
  }

  return (
    <>
      {puzzleList && puzzleId ? (
        <div className="nav">
          <div className="nav__wrapper">
            <ul className="nav__list">
              <li className={`nav__item`}>
                <NavLink
                  className={
                    puzzleId === puzzleList[0]
                      ? "nav__item nav__item--inactivelink"
                      : "nav__item nav__item--link"
                  }
                  to={`/puzzle/${puzzleList[index - 1]}`}
                >
                  <span
                    className={
                      puzzleId === puzzleList[0]
                        ? "nav__item nav__item--hidden nav__item--hideifnull"
                        : "nav__item nav__item--hidden"
                    }
                  >
                    ⬅️
                  </span>{" "}
                  Prev Puzzle
                </NavLink>
              </li>
              <li className="nav__item">
                <a
                  href="https://awesomefriday.ca"
                  className="nav__item nav__item--link"
                >
                  AwesomeFriday.ca
                </a>
              </li>
              {/* 
              <li className="nav__item">
                <NavLink
                  className={"nav item nav__item--link"}
                  to="/puzzle/list"
                >
                  Puzzle List
                </NavLink>
              </li> */}
              <li className="nav__item">
                <NavLink className={"nav__item nav__item--link"} to={`/`}>
                  Latest Puzzle
                </NavLink>
              </li>
              <li className={`nav__item`}>
                <NavLink
                  className={
                    puzzleId === puzzleList[puzzleList.length - 1]
                      ? "nav__item nav__item--inactivelink"
                      : "nav__item nav__item--link"
                  }
                  to={`/puzzle/${puzzleList[index + 1]}`}
                >
                  Next Puzzle{" "}
                  <span
                    className={
                      puzzleId === puzzleList[puzzleList.length - 1]
                        ? "nav__item nav__item--hidden nav__item--hideifnull"
                        : "nav__item nav__item--hidden"
                    }
                  >
                    ➡️
                  </span>
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      ) : null}
    </>
  );
}

export default SiteNav;
