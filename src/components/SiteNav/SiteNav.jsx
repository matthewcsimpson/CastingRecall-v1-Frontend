// Styles
import "./SiteNav.scss";

// Libraries
import { NavLink } from "react-router-dom";

const SiteNav = ({ puzzleId, puzzleList }) => {
  const puzzleIds = Array.isArray(puzzleList)
    ? puzzleList.map((puzzle) => puzzle.puzzleId)
    : [];

  const effectivePuzzleId =
    puzzleId ??
    (puzzleIds.length > 0 ? puzzleIds[puzzleIds.length - 1] : undefined);

  const resolvedId = String(effectivePuzzleId ?? "");
  const index = puzzleIds.findIndex((id) => String(id) === resolvedId);
  const activeIndex = index === -1 ? puzzleIds.length - 1 : index;
  const isListView = resolvedId === "list";
  const prevId = activeIndex > 0 ? puzzleIds[activeIndex - 1] : puzzleIds[0];
  const nextId =
    activeIndex >= 0 && activeIndex < puzzleIds.length - 1
      ? puzzleIds[activeIndex + 1]
      : puzzleIds[puzzleIds.length - 1];

  return (
    <>
      {puzzleIds.length > 0 && resolvedId ? (
        <div className="nav">
          <div className="nav__wrapper">
            <ul className="nav__list">
              <li className={`nav__item`}>
                <NavLink
                  className={
                    resolvedId === String(puzzleIds[0]) || isListView
                      ? "nav__item nav__item--inactivelink"
                      : "nav__item nav__item--link"
                  }
                  to={`/puzzle/${prevId}`}
                >
                  <span
                    className={
                      resolvedId === String(puzzleIds[0]) || isListView
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
                  to="/puzzle/list"
                >
                  Puzzle List
                </NavLink>
              </li>
              <li className="nav__item">
                <NavLink
                  className={
                    resolvedId === String(puzzleIds[puzzleIds.length - 1])
                      ? "nav__item nav__item--inactivelink"
                      : "nav__item nav__item--link"
                  }
                  to={`/`}
                >
                  Latest Puzzle
                </NavLink>
              </li>
              <li className={`nav__item`}>
                <NavLink
                  className={
                    resolvedId === String(puzzleIds[puzzleIds.length - 1]) ||
                    isListView
                      ? "nav__item nav__item--inactivelink"
                      : "nav__item nav__item--link"
                  }
                  to={`/puzzle/${nextId}`}
                >
                  Next Puzzle{" "}
                  <span
                    className={
                      resolvedId === String(puzzleIds[puzzleIds.length - 1]) ||
                      isListView
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
};

export default SiteNav;
