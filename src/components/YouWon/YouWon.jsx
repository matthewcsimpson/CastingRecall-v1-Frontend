// Styles
import "./YouWon.scss";

function YouWon({ guesses, youWon }) {
  return (
    <>
      {youWon && (
        <div className="youwon">
          <div className="youwon__wrapper">
            <h2 className="youwon__heading">Congrats! You won!</h2>
            <h2 className="youwon__subheading">{`And it only took you ${guesses.length} guesses`}</h2>
          </div>
        </div>
      )}
    </>
  );
}

export default YouWon;
