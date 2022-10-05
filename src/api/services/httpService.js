import FieldError from "../errors/FieldError";

/**
 * Safely returns object with specified keys.
 *
 * @param {Object} obj - Typically an HTTP request params or body object.
 * @param {...string} keys - The desired object keys.
 * @returns {Promise<{Object}>}
 * @throws {FieldError} - If any of the keys is not present.
 */
const getOrDie = async (obj, ...keys) => {
  const values = {};

  keys.forEach((key) => {
    if (!obj || !(
      key in obj
    )) {
      throw new FieldError(`Request object is missing '${key}' key!`);
    }
    values[key] = obj[key];
  });

  return values;
};

export { getOrDie };
