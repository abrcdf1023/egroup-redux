import findIndex from 'lodash/findIndex';

/**
 * To index string array that include "fetch"
 * @param {array} leafs
 */
const findFetchIndex = leafs =>
  findIndex(leafs, leaf => leaf.indexOf('fetch') !== -1);

export default findFetchIndex;
