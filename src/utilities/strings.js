const CHARACTER_MASK = /([A-Za-z0-9])/gi;

/**
 * Replace alphanumeric characters with a masking character.
 * @param {string} value Input string to mask.
 * @returns {string} Masked string.
 */
export const obscureString = (value) => {
  if (!value) {
    return "";
  }
  return value.replace(CHARACTER_MASK, "x");
};

/**
 * Truncate a string at the configured limit, appending ellipsis when needed.
 * @param {string} value Input string that may need truncation.
 * @returns {string} Original or truncated string.
 */
export const shortenString = (value) => {
  if (!value) {
    return "";
  }

  const limit = 147;
  if (value.length <= limit) {
    return value;
  }

  return `${value.substring(0, limit)}...`;
};

/**
 * Remove the literal substring "(voice)" from the supplied value.
 * @param {string} value Character string possibly containing the flag.
 * @returns {string} String without the "(voice)" marker.
 */
export const removeVoiceFromString = (value) => {
  if (!value) {
    return "";
  }
  return value.replace("(voice)", "");
};

/**
 * Limit multiple character names to the first two entries separated by a slash.
 * @param {string} value Character names joined by " / ".
 * @returns {string} Single or truncated multi-name representation.
 */
export const shortenMultipleCharNames = (value) => {
  if (!value) {
    return "";
  }
  const split = value.split(" / ");
  if (split.length > 1) {
    return `${split[0]} / ${split[1]}`;
  }
  return value;
};

/**
 * Extract the first name token from a space-delimited full name.
 * @param {string} value Full name string.
 * @returns {string} First token or empty string when absent.
 */
export const firstNameOnly = (value) => {
  if (!value) {
    return "";
  }

  const split = value.split(" ");
  return split[0];
};
