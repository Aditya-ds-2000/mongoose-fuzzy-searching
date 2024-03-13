/**
 * Removes special symbols from string.
 * @param {string} text - The string to remove the characters.
 * @param {boolean} escapeSpecialCharacters - If this value is true, it will also remove all the special characters.
 * @return {string} the given text without the special characters.
 */
const replaceSymbols = (replaceLanguageCharacters) => (text, escapeSpecialCharacters) => {
  text = text.toLowerCase();
  if (escapeSpecialCharacters) {
    text = text.replace(/[!"#%&'()*+,-./:;<=>?@[\\\]^`{|}~]/g, ''); // remove special characters
  }
  text = text.replace(/_/g, ' ');
  text = replaceLanguageCharacters(text);

  return text;
};

/**
 * Returns true if the variable is an object and if the the object is empty
 * @param {any} obj
 * @return {boolean}
 */
const isObject = (obj) => !!obj && obj.constructor === Object && Object.keys(obj).length > 0;

/**
 * Returns true if the variable is an array
 * @param {any} obj
 * @return {boolean}
 */
const isArray = (obj) => {
  if (typeof Array.isArray === 'undefined') {
    return Object.prototype.toString.call(obj) === '[object Array]';
  }

  return Array.isArray(obj);
};

/**
 * Returns if the variable is a Function
 * @param {any} fn
 * @return {boolean}
 */
const isFunction = (fn) => !!(fn && (typeof fn === 'function' || fn instanceof Function));

const isString = (input) => typeof input === 'string' || input instanceof String;

/**
 * Builds fuzzy search query.
 * @param {string} searchString - the text for which search results hae to be returned
 * @param {object | null} [filters] - any other filters that have to be applied alongside $search
 * @returns {object} fuzzy search query
 */
function buildQueryForFuzzySearch(searchString, filters) {
  let searchQuery;

  if (!isObject(filters)) {
    searchQuery = {
      $text: {
        $search: searchString,
      },
    };
  } else {
    searchQuery = {
      $and: [{ $text: { $search: searchString } }, filters],
    };
  }

  return searchQuery;
}

module.exports = {
  replaceSymbols,
  isObject,
  isFunction,
  isString,
  isArray,
  buildQueryForFuzzySearch,
};
