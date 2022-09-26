/**
 * Function to return a formatted date from a timestamp string,
 * based on dateOptions previously specified.
 *
 * @param {string} timestamp;
 * @param {Object} dateOptions;
 */
const formatDate = (timestamp, options) => {
  let date = new Date(timestamp);
  return date.toLocaleDateString("en-us", options);
};

/**
 * Return the genre name based on the genre ID# provide by TMDB.
 * @param {number} id
 * @returns
 */
const formatGenre = (id, genres) => {
  let genreName = genres.find((genre) => {
    return genre.id === id ? genre.name : null;
  });
  return genreName.name;
};

/**
 * Obscure the characters of a string
 */
const obscureString = (string) => {
  const regex = /([A-Za-z0-9])/gi;
  return string.replace(regex, "*");
};

/**
 * Shortens a string to 200 chars with ellipses on the end.
 * @param {string} string
 * @returns
 */
const shortenString = (string) => {
  return string.substring(0, 197) + "...";
};

/**
 * Evaluate if a guess is correct.
 * @param {number} guessid
 * @param {object} puzzle
 * @returns
 */
const isGuessCorrect = (guessid, puzzle) => {
  return puzzle.find((p) => p.id === guessid);
};

export {
  formatDate,
  formatGenre,
  obscureString,
  shortenString,
  isGuessCorrect,
};
