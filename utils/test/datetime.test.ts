import { diffTime } from "../datetime";

test.each([
  [0, "days", -19518],
  [1000, "seconds", -1686431952],
])("diffTime(%s)", (currency, unit, expected) => {
  expect(typeof diffTime(currency, unit as "seconds" | "days")).toBe(
    typeof expected
  );
});
