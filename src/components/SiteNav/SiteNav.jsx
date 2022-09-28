// Data
import API from "../../data/api_info.json";

// Libraries
import { NavLink, useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";

function SiteNav() {
  const [puzzleList, setPuzzleList] = useState(null);
  let { puzzleId } = useParams();

  const getPuzzleList = async () => {
    await axios
      .get(`${API.api_local_url}/puzzle/list`)
      .then((res) => setPuzzleList([res.data].flat()))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    getPuzzleList();
  }, []);

  if (puzzleList) {
    if (!puzzleId) {
      puzzleId = puzzleList[puzzleList.length - 1];
    }
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
                      ? "nav item nav__item--inactivelink"
                      : "nav item nav__item--link"
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
                <NavLink
                  className={"nav item nav__item--link"}
                  to="/how-to-play"
                >
                  How to Play
                </NavLink>
              </li>
              <li className="nav__item">
                <NavLink
                  className={"nav item nav__item--link"}
                  to="/puzzle/list"
                >
                  Puzzle List
                </NavLink>
              </li>
              <li className="nav__item">
                <NavLink className={"nav item nav__item--link"} to={`/`}>
                  Latest Puzzle
                </NavLink>
              </li>
              <li className={`nav__item`}>
                <NavLink
                  className={
                    puzzleId === puzzleList[puzzleList.length - 1]
                      ? "nav item nav__item--inactivelink"
                      : "nav item nav__item--link"
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
