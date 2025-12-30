/* eslint-disable array-callback-return */

// Styles
import "./Counter.scss";

/**
 * Component to display the list of guesses with their statuses.
 * @param {object[]} guesses Array of guess objects containing movie details and correctness.
 * @returns
 */
const Counter = ({ guesses }) => {
  return (
    <>
      <div className="counter">
        <div className="counter__wrapper">
          <ul className="counter__list">
            {guesses.map((movie, i) => {
              if (movie.correct === true) {
                return (
                  <li key={`${i}-${movie.id}`} className="counter__item">
                    <p className="counter__text">✅ {movie.original_title}</p>
                  </li>
                );
              } else if (movie.correct === false) {
                return (
                  <li key={`${i}-${movie.id}`} className="counter__item">
                    <p className="counter__text">🟥 {movie.original_title}</p>
                  </li>
                );
              } else if (movie.type === "hint") {
                return (
                  <li key={`${i}-${movie.id}`} className="counter__item">
                    <p className="counter__text">💡 Hint used</p>
                  </li>
                );
              }
              return null;
            })}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Counter;
