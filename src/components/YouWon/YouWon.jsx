function YouWon({ guesses, youWon }) {
  return (
    <>
      {youWon && (
        <div className="youwon">
          <div className="youwon__wrapper">
            <h2 className="youwon__heading">CONGRATULATIONS, YOU WON!</h2>
            <h2 className="youwon__subheading">{`And it only took you ${guesses.length} guesses`}</h2>
          </div>
        </div>
      )}
    </>
  );
}

export default YouWon;
