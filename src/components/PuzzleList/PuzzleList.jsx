// Styles
import "./PuzzleList.scss";

function PuzzleList({ puzzleList }) {
  return (
    <>
      <div className="puzzlelist">
        <div className="puzzlelist__wrapper">
          {puzzleList && (
            <h1 className="puzzlelist__heading"> list of puzzles</h1>
          )}
        </div>
      </div>
    </>
  );
}

export default PuzzleList;
