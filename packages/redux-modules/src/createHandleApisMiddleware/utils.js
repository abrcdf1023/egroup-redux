/**
 * Change action type to camalize style.
 * Example,
 * COMPONENTS/FETCH_GET_USER -> components/fetchGetUser
 * @param {string} str
 */
export function camalize(str) {
  return str
    .toLowerCase()
    .replace(/[^a-zA-Z0-9/]+(.)/g, (m, chr) => chr.toUpperCase());
}

/**
 * Parse api action type to its method and processing type.
 * Example,
 * FETCH_GET_USER -> ['get', undefined]
 * FETCH_GET_USER_REQUEST -> ['get', 'request']
 * @param {string} api
 */
export function getApiInfos(api) {
  let apiMethod;
  let apiType;
  const array = api.split(/(?=[A-Z])/);
  apiMethod = array[1];
  apiType = array[array.length - 1].toLowerCase();
  if (
    apiType !== 'request' &&
    apiType !== 'cancel' &&
    apiType !== 'success' &&
    apiType !== 'failure'
  ) {
    apiType = undefined;
  }
  return [apiMethod, apiType];
}

/**
 * Trim leafs to used by api reducer.
 * Example,
 * [ 'components', 'list', 'fetchGetMemberRequest' ] -> [ 'components', 'list', 'fetchGetMember' ]
 * @param {array} leafs
 * @param {number} fetchIndex
 */
export function trimLeafs(leafs, fetchIndex) {
  const trimedLeafs = [...leafs];
  trimedLeafs[fetchIndex] = trimedLeafs[fetchIndex].replace(
    /Request|Cancel|Success|Failure/,
    ''
  );
  return trimedLeafs;
}
