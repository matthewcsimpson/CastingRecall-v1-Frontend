// Styles
import "./SiteNav.scss";

// Libraries
import { useEffect, useState } from "react";

// Components
import SiteNavItem from "../SiteNavItem/SiteNavItem.jsx";
import HowToPlayModal from "../HowToPlayModal/HowToPlayModal.jsx";

const SiteNav = ({ puzzleId, puzzleList }) => {
  const [isHowToOpen, setIsHowToOpen] = useState(false);

  useEffect(() => {
    if (!isHowToOpen) {
      return;
    }

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isHowToOpen]);

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

  const handleOpenHowTo = () => {
    setIsHowToOpen(true);
  };

  const handleCloseHowTo = () => {
    setIsHowToOpen(false);
  };

  return (
    <>
      {puzzleIds.length > 0 && resolvedId ? (
        <div className="nav">
          <div className="nav__wrapper">
            <ul className="nav__list">
              <SiteNavItem
                to={`/puzzle/${prevId}`}
                label="Prev Puzzle"
                icon="⬅️"
                iconPosition="left"
                disabled={resolvedId === String(puzzleIds[0]) || isListView}
              />
              <SiteNavItem to="/puzzle/list" label="Puzzle List" />
              <SiteNavItem label="How to Play" onClick={handleOpenHowTo} />
              <SiteNavItem
                to={`/`}
                label="Latest Puzzle"
                disabled={
                  resolvedId === String(puzzleIds[puzzleIds.length - 1])
                }
              />
              <SiteNavItem
                to={`/puzzle/${nextId}`}
                label="Next Puzzle"
                icon="➡️"
                iconPosition="right"
                disabled={
                  resolvedId === String(puzzleIds[puzzleIds.length - 1]) ||
                  isListView
                }
              />
            </ul>
          </div>
        </div>
      ) : null}
      <HowToPlayModal isOpen={isHowToOpen} onClose={handleCloseHowTo} />
    </>
  );
};

export default SiteNav;
