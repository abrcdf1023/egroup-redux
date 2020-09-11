/**
 * Change action type to camalize style.
 * Example,
 * COMPONENTS/FETCH_GET_USER -> components/fetchGetUser
 */
export default function camalize(str: string) {
  return str
    .toLowerCase()
    .replace(/[^a-zA-Z0-9/]+(.)/g, (m, chr) => chr.toUpperCase());
}
