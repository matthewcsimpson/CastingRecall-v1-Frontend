/**
 * Check whether window.localStorage can be accessed in the current runtime.
 * @returns {boolean} True when localStorage APIs are available.
 */
const isStorageAvailable = () => {
  return typeof window !== "undefined" && window?.localStorage;
};

/**
 * Safely parse JSON from localStorage, returning a fallback on failure.
 * @template T
 * @param {string} key Local storage key to inspect.
 * @param {T} [fallback=null] Default value when entry is missing or invalid.
 * @param {{silent?: boolean, onError?: (err: unknown) => void}} [options] Optional error handling controls.
 * @returns {T} Parsed JSON payload or fallback value.
 */
export const loadLocalJson = (
  key,
  fallback = null,
  { silent = false, onError } = {}
) => {
  if (!key || !isStorageAvailable()) {
    return fallback;
  }

  try {
    const raw = window.localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (err) {
    if (typeof onError === "function") {
      onError(err);
    }
    if (!silent) {
      console.error(err);
    }
    return fallback;
  }
};

/**
 * Serialize a value into localStorage while capturing errors.
 * @param {string} key Local storage key to assign.
 * @param {unknown} value Serializable value to persist.
 * @param {{silent?: boolean, onError?: (err: unknown) => void}} [options] Optional error handling controls.
 * @returns {boolean} True when the value was saved.
 */
export const saveLocalJson = (key, value, { silent = false, onError } = {}) => {
  if (!key || !isStorageAvailable()) {
    return false;
  }

  try {
    window.localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (err) {
    if (typeof onError === "function") {
      onError(err);
    }
    if (!silent) {
      console.error(err);
    }
    return false;
  }
};
