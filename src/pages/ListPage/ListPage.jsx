// Styles
import "./ListPage.scss";

// Components
import SiteNav from "../../components/SiteNav/SiteNav";
import LoadingScreen from "../../components/LoadingScreen/LoadingScreen";
import PuzzleListItem from "../../components/PuzzleListItem/PuzzleListItem";

// Libraries

function ListPage({ puzzleList }) {
  return (
    <>
      {puzzleList ? (
        <SiteNav puzzleId={"list"} puzzleList={puzzleList} />
      ) : (
        <LoadingScreen />
      )}
      <div className="listpage__listcontainer">
        {puzzleList &&
          puzzleList.map((puzzle, i) => (
            <PuzzleListItem key={puzzle} puzznum={i} puzzle={puzzle} />
          ))}
      </div>
    </>
  );
}

export default ListPage;
