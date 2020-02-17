/**
 * Change action type to camalize style.
 * Example,
 * COMPONENTS/FETCH_GET_USER -> components/fetchGetUser
 * @param {string} str
 */
export default function camalize(str) {
  return str
    .toLowerCase()
    .replace(/[^a-zA-Z0-9/]+(.)/g, (m, chr) => chr.toUpperCase());
}
