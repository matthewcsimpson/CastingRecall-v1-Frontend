// Styles
import "./SiteNav.scss";

// Libraries
import { useEffect, useState } from "react";

// Components
import SiteNavItem from "../SiteNavItem/SiteNavItem.jsx";
import HowToPlayModal from "../HowToPlayModal/HowToPlayModal.jsx";
import { ROUTES } from "../../constants/config";

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
    puzzleId ?? (puzzleIds.length > 0 ? puzzleIds[0] : undefined);

  const resolvedId = String(effectivePuzzleId ?? "");
  const index = puzzleIds.findIndex((id) => String(id) === resolvedId);
  const activeIndex = index === -1 ? 0 : index;
  const isListView = resolvedId === "list";
  const prevId =
    activeIndex < puzzleIds.length - 1
      ? puzzleIds[activeIndex + 1]
      : puzzleIds[puzzleIds.length - 1];
  const nextId = activeIndex > 0 ? puzzleIds[activeIndex - 1] : puzzleIds[0];

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
                to={`${ROUTES.puzzleId.replace(":puzzleId", prevId)}`}
                label="Previous"
                icon="⬅️"
                disabled={
                  resolvedId === String(puzzleIds[puzzleIds.length - 1]) ||
                  isListView
                }
              />
              <SiteNavItem
                icon="📋"
                to={ROUTES.puzzleList}
                label="Puzzle List"
              />
              <SiteNavItem
                icon="❓"
                label="How to Play"
                onClick={handleOpenHowTo}
              />
              <SiteNavItem
                to={ROUTES.home}
                icon="🆕"
                label="Latest"
                disabled={resolvedId === String(puzzleIds[0])}
              />
              <SiteNavItem
                to={`${ROUTES.puzzleId.replace(":puzzleId", nextId)}`}
                label="Next"
                icon="➡️"
                disabled={resolvedId === String(puzzleIds[0]) || isListView}
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
