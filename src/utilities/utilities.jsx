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

export { formatDate, formatGenre, obscureString };
