/**
 * Format a timestamp string using the provided Intl date options.
 * @param {string|number|Date} timestamp Source timestamp value accepted by Date ctor.
 * @param {Intl.DateTimeFormatOptions} options Formatting options for toLocaleDateString.
 * @returns {string} Locale-formatted date string.
 */
export const formatDate = (timestamp, options) => {
  const date = new Date(timestamp);
  return date.toLocaleDateString("en-us", options);
};

/**
 * Common Intl date options for representing only the numeric year.
 * @type {Readonly<Intl.DateTimeFormatOptions>}
 */
export const YEAR_ONLY_DATE_OPTIONS = Object.freeze({ year: "numeric" });
