import GetCoords from "../coords";

test("coords with space", () => {
  const result = GetCoords("51.50851, −0.12572");
  const ideal = { latitude: "51.50851", longitude: "−0.12572" };
  expect(result).toStrictEqual(ideal);
});

test("coords without space", () => {
  const result = GetCoords("51.50851,−0.12572");
  const ideal = { latitude: "51.50851", longitude: "−0.12572" };
  expect(result).toStrictEqual(ideal);
});

test("coords with []", () => {
  const result = GetCoords("[51.50851, −0.12572]");
  const ideal = { latitude: "51.50851", longitude: "−0.12572" };
  expect(result).toStrictEqual(ideal);
});
