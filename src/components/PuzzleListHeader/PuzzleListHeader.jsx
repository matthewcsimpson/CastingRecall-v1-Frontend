import "./PuzzleListHeader.scss";

const PuzzleListHeader = () => {
  return (
    <div className="listheader">
      <div className="listheader__wrapper">
        <p className="listheader__headerlabel">Puzzle Name</p>
        <p className="listheader__headerlabel">Progress</p>
      </div>
    </div>
  );
};

export default PuzzleListHeader;
