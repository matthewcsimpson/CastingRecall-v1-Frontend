function Hero() {
  return (
    <div className="hero">
      <div className="hero__wrapper">
        <div className="hero__guesses">
          <div className="hero__moviecard"></div>
        </div>
        <form className="hero__guessform">
          <input
            className="hero__guessinput"
            type="text"
            placeholder="Type a movie title..."
          ></input>
          <button>Guess!</button>
        </form>
      </div>
    </div>
  );
}

export default Hero;
