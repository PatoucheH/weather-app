/**
 *
 * @param {array} coord an array of coordinates
 * @returns the latitude of that coordinate
 */
export function findlat(coord) {
  if (coord.length === 0) throw new Error("No data for this city ! ");
  const lat = coord[0].lat;
  return lat;
}

/**
 *
 * @param {array} coord an array of coordinates
 * @returns the longitude of that coordinates
 */
export function findlon(coord) {
  if (coord.length === 0) throw new Error("No data for this city ! ");
  const lon = coord[0].lon;
  return lon;
}
