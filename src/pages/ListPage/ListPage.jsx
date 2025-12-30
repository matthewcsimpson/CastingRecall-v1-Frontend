// Styles
import "./ListPage.scss";

// Components
import { LoadingScreen, PuzzleListItem, SiteNav } from "../../components";

// Hooks
import { usePuzzleStatuses } from "../../hooks";

const ListPage = ({ puzzleList }) => {
  const hasPuzzles = Array.isArray(puzzleList) && puzzleList.length > 0;
  const statusByPuzzleId = usePuzzleStatuses(puzzleList);

  return (
    <>
      {hasPuzzles ? (
        <SiteNav puzzleId={"list"} puzzleList={puzzleList} />
      ) : (
        <LoadingScreen />
      )}
      <div className="listpage__listcontainer">
        {hasPuzzles &&
          puzzleList.map(({ puzzleId, keyPeople }, index) => (
            <PuzzleListItem
              key={puzzleId}
              puzznum={index}
              puzzleId={puzzleId}
              keyPeople={keyPeople}
              status={statusByPuzzleId[puzzleId]}
            />
          ))}
      </div>
    </>
  );
};

export default ListPage;
