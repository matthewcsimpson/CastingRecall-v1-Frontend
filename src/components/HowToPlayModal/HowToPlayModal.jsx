// Styles
import "./HowToPlayModal.scss";

// Libraries
import { useEffect, useRef } from "react";

const HowToPlayModal = ({ isOpen, onClose }) => {
  const backdropRef = useRef(null);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    backdropRef.current?.focus();
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  const handleBackdropClick = (evt) => {
    if (evt.target === evt.currentTarget) {
      onClose();
    }
  };

  const handleKeyDown = (evt) => {
    if (evt.key === "Escape") {
      onClose();
    }
  };

  return (
    <div
      ref={backdropRef}
      className="howto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="howto__title"
      aria-describedby="howto__description"
      onClick={handleBackdropClick}
      onKeyDown={handleKeyDown}
      tabIndex={-1}
    >
      <div className="howto__dialog" role="document">
        <button
          type="button"
          className="howto__close"
          onClick={onClose}
          aria-label="Close how to play modal"
        >
          Close
        </button>
        <h2 id="howto__title" className="howto__title">
          How to Play
        </h2>
        <p className="howto__text">
          Guess the featured movie based on the cast list.
        </p>
        <img
          src="/images/screenshot-movie.jpg"
          alt="Example of a movie puzzle with cast headshots and hints"
          className="howto__image"
        />
        <p className="howto__text">
          Each puzzle has six movies. Study the cast and other blanked out
          information to guess. You have ten guesses to guess all six!
        </p>
        <img
          src="/images/screenshot-guess.jpg"
          alt="Example of the hints section showing revealed hints for a movie"
          className="howto__image"
        />
        <p className="howto__text">
          Enter your guess in the search bar, and make sure to select the
          correct movie from the dropdown.
        </p>
        <img
          src="/images/screenshot-hints.jpg"
          alt="Example of the hints section showing revealed hints for a movie"
          className="howto__image"
        />
        <p className="howto__text">
          There are hints in the lower left of each movie. Use them sparingly,
          they reveal one piece of information about a one movie but they cost
          an entire guess.
        </p>
        <p className="howto__text">
          There is a patten to how the puzzle is generated, see if you can spot
          it!
        </p>
      </div>
    </div>
  );
};

export default HowToPlayModal;
