/**
 * Function to return a formatted date from a timestamp string,
 * based on dateOptions previously specified.
 *
 * @param {string} timestamp;
 * @param {Object} dateOptions;
 * @returns formatted date string
 */
const formatDate = (timestamp, options) => {
  let date = new Date(timestamp);
  return date.toLocaleDateString("en-us", options);
};

/**
 * Return the genre name based on the genre ID# provide by TMDB.
 * @param {number} id
 * @returns genre name as a string.
 */
const formatGenre = (id, genres) => {
  if (!Array.isArray(genres)) {
    return "Unknown";
  }

  const genreName = genres.find((genre) => genre.id === id);
  return genreName?.name || "Unknown";
};

/**
 * Obscure the characters of a string
 * @param {string} string
 * @returns string with all characters replaced
 */
const obscureString = (string) => {
  const regex = /([A-Za-z0-9])/gi;
  return string.replace(regex, "x");
};

/**
 * Shortens a string to 200 chars with ellipses on the end.
 * @param {string} string
 * @returns shortened string
 */
const shortenString = (string) => {
  if (!string) {
    return "";
  }

  const limit = 147;
  if (string.length <= limit) {
    return string;
  }

  return `${string.substring(0, limit)}...`;
};

/**
 * removes the substring `(voice)` from a character name
 * @param {string} string
 * @returns a string without the substring (voice)
 */
const removeVoiceFromString = (string) => {
  return string.replace("(voice)", "");
};

/**
 * Shortens the character name string if there are multiple characters
 * @param {*} string
 * @returns a string with two names separated by a /, maximum.
 */
const shortenMultipleCharNames = (string) => {
  const split = string.split(" / ");
  if (split.length > 1) {
    return `${split[0]} / ${split[1]}`;
  } else {
    return string;
  }
};

/**
 * Return just the first name from a name string
 * @param {string} string
 * @returns string with only the first name from a full name.
 */
const firstNameOnly = (string) => {
  if (!string) {
    return "";
  }

  const split = string.split(" ");
  return split[0];
};

export {
  formatDate,
  formatGenre,
  obscureString,
  shortenString,
  removeVoiceFromString,
  shortenMultipleCharNames,
  firstNameOnly,
};
