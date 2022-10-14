// Components
import SiteNav from "../../components/SiteNav/SiteNav";
import LoadingScreen from "../../components/LoadingScreen/LoadingScreen";
import PuzzleList from "../../components/PuzzleList/PuzzleList";

function ListPage({ puzzleList }) {
  return (
    <>
      {puzzleList ? <SiteNav puzzleList={puzzleList} /> : <LoadingScreen />}
      {puzzleList && <PuzzleList puzzleList={puzzleList} />}
    </>
  );
}

export default ListPage;
