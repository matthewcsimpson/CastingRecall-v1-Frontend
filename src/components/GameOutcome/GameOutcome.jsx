import { useCallback, useEffect, useMemo, useState } from "react";

// Hooks & constants
import { MAX_GUESSES, MOVIES_PER_PUZZLE } from "../../constants/config";
import { firstNameOnly } from "../../utilities";

// Styles
import "./GameOutcome.scss";

const GameOutcome = ({ guesses, status, featuredNames }) => {
  const totalGuesses = Array.isArray(guesses) ? guesses.length : 0;
  const hintCount = Array.isArray(guesses)
    ? guesses.filter((guess) => guess?.type === "hint").length
    : 0;
  const guessCount = totalGuesses - hintCount;
  const correctCount = Array.isArray(guesses)
    ? guesses.filter((guess) => guess?.correct === true).length
    : 0;

  const guessSummary = guessCount === 1 ? "1 guess" : `${guessCount} guesses`;
  const hintSummary = hintCount
    ? hintCount === 1
      ? " and 1 hint"
      : ` and ${hintCount} hints`
    : "";

  const variants = {
    won: {
      heading: "Congrats! You won!",
      subheading: `You used ${guessSummary}${hintSummary}!`,
    },
    lost: {
      heading: "You didn't get this one!",
      subheading: "Better luck next time!",
      text: `You got ${correctCount} film correct out of ${MOVIES_PER_PUZZLE}, using ${guessSummary} and ${hintSummary}.`,
    },
  };

  const copy = variants[status];

  const sanitizedNames = useMemo(() => {
    if (!Array.isArray(featuredNames)) {
      return [];
    }

    return featuredNames
      .map((name) => firstNameOnly(name.trim()))
      .filter(Boolean);
  }, [featuredNames]);

  const iconSequence = useMemo(() => {
    if (!Array.isArray(guesses) || guesses.length === 0) {
      return [];
    }

    return guesses.map((guess) => {
      if (guess?.type === "hint") {
        return "💡";
      }

      if (guess?.correct === true) {
        return "🟩";
      }

      if (guess?.correct === false) {
        return "🟥";
      }

      return "⬛";
    });
  }, [guesses]);

  const shareText = useMemo(() => {
    if (!status) {
      return "";
    }

    const headerNames = sanitizedNames.length
      ? sanitizedNames.join(", ")
      : "Play today!";
    const header = `Casting Recall: ${headerNames}`;

    const filledIcons = (() => {
      if (iconSequence.length === 0) {
        return "";
      }

      const maxSlots = Number.isFinite(MAX_GUESSES) ? MAX_GUESSES : 10;
      const padded = iconSequence.slice(0, maxSlots);

      while (padded.length < maxSlots) {
        padded.push("⬛");
      }

      return padded.join(" ");
    })();

    const lines = [header];

    if (filledIcons) {
      lines.push(filledIcons);
    }

    lines.push("https://castingrecall.com");

    return lines.join("\n");
  }, [iconSequence, sanitizedNames, status]);

  const [copyState, setCopyState] = useState(null);

  const handleCopyShareText = useCallback(async () => {
    if (!shareText) {
      return;
    }

    try {
      if (
        typeof navigator !== "undefined" &&
        navigator.clipboard &&
        typeof navigator.clipboard.writeText === "function"
      ) {
        await navigator.clipboard.writeText(shareText);
        setCopyState("success");
        return;
      }

      if (typeof window !== "undefined") {
        throw new Error("No clipboard support");
      }
    } catch (err) {
      console.error(err);
      setCopyState("error");
    }
  }, [shareText]);

  useEffect(() => {
    if (!copyState) {
      return undefined;
    }

    const timeoutId = setTimeout(() => {
      setCopyState(null);
    }, 2000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [copyState]);

  if (!status || !copy) {
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
        {shareText ? (
          <div className="game-outcome__share">
            <button
              type="button"
              className="game-outcome__share-button"
              onClick={handleCopyShareText}
            >
              {copyState === null
                ? "Share Result"
                : copyState === "success"
                ? "Copied!"
                : copyState === "error"
                ? "Copy failed"
                : ""}
            </button>
            <span
              className="game-outcome__share-feedback"
              role="status"
              aria-live="polite"
            ></span>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default GameOutcome;
