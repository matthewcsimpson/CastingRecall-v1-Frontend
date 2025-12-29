/* eslint-disable array-callback-return */

// Styles
import "./Counter.scss";

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
              }
            })}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Counter;
