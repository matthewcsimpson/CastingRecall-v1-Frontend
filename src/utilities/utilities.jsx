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
  return string.replace(regex, "x");
};

/**
 * Shortens a string to 200 chars with ellipses on the end.
 * @param {string} string
 * @returns
 */
const shortenString = (string) => {
  return string.substring(0, 147) + "...";
};

/**
 * removes the substring `(voice)` from a character name
 * @param {string} string
 * @returns
 */
const removeVoiceFromString = (string) => {
  return string.replace("(voice)", "");
};

/**
 * Shortens the character name string if there are multiple characters
 * @param {*} string
 * @returns
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
 * @returns string
 */
const firstNameOnly = (string) => {
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
