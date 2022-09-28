/* eslint-disable array-callback-return */
function Counter({ guesses }) {
  return (
    <>
      <div className="counter">
        <div className="counter__wrapper">
          <ul className="counter__list">
            {guesses.map((movie) => {
              if (movie.correct === true) {
                return (
                  <li key={movie.id} className="counter__item">
                    <p className="counter__text">✅ {movie.original_title}</p>
                  </li>
                );
              } else if (movie.correct === false) {
                return (
                  <li key={movie.id} className="counter__item">
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
}

export default Counter;
