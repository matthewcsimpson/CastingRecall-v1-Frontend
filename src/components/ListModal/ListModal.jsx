function ListModal({ puzzleList, showListModal }) {
  if (!showListModal) {
    return null;
  } else {
    return (
      <>
        <div className="listmodal">
          <div className="listmodal__window">
            <div className="listmodal__body">
              <button className="listmodal__closebutton">Close</button>
              <p>this is a test</p>
            </div>
            <div className="listmodal__footer"></div>
          </div>
        </div>
      </>
    );
  }
}
export default ListModal;
