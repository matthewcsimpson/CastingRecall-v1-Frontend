// Styles
import "./GameOutcome.scss";

const GameOutcome = ({ guesses, status }) => {
  if (!status) {
    return null;
  }

  const totalGuesses = Array.isArray(guesses) ? guesses.length : 0;
  const correctCount = Array.isArray(guesses)
    ? guesses.filter((guess) => guess?.correct === true).length
    : 0;

  const variants = {
    won: {
      heading: "Congrats! You won!",
      subheading: `And it only took you ${totalGuesses} guesses`,
    },
    lost: {
      heading: "You didn't get this one!",
      subheading: "Better luck next time!",
      text: `You got ${correctCount} film correct out of 6, using ${totalGuesses} guesses.`,
    },
  };

  const copy = variants[status];

  if (!copy) {
    return null;
  }

  return (
    <div className={`game-outcome game-outcome--${status}`}>
      <div className="game-outcome__wrapper">
        <h2 className="game-outcome__heading">{copy.heading}</h2>
        {copy.text ? <p className="game-outcome__text">{copy.text}</p> : null}
        {copy.subheading ? (
          <h2 className="game-outcome__subheading">{copy.subheading}</h2>
        ) : null}
      </div>
    </div>
  );
};

export default GameOutcome;
