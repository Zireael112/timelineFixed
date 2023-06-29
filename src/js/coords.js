export default function GetCoords(coords) {
  let resultCoords;
  if (typeof coords.latitude === "number") {
    resultCoords = {
      latitude: coords.latitude,
      longitude: coords.longitude,
    };
    return resultCoords;
  }
  if (coords[0] === "[" && coords[coords.length - 1] === "]") {
    const result = coords.slice(1, -1).split(",");
    resultCoords = {
      latitude: result[0].trim(),
      longitude: result[1].trim(),
    };
    return resultCoords;
  } else {
    const result = coords.trim().split(",");
    resultCoords = {
      latitude: result[0].trim(),
      longitude: result[1].trim(),
    };
    return resultCoords;
  }
}
