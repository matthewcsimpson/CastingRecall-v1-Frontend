function YouLost({ guesses, youLost }) {
  let count = guesses.filter((guess) => guess.correct === true);

  return (
    <>
      {youLost && (
        <div className="youlost">
          <div className="youlost__wrapper">
            <h2 className="youlost__heading">You didn't get this one!</h2>
            <p className="youlost__text">
              You got {count.length} corrent out of {guesses.length}
            </p>

            <h2 className="youlost__subheading">Better luck next time!</h2>
          </div>
        </div>
      )}
    </>
  );
}

export default YouLost;
