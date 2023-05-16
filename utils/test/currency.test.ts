import { formatCurrency } from "../currency";

test.each([
  [0, "$0"],
  [1000, "$1,000"],
  [1234000, "$1,234,000"],
])("formatCurrency(%s)", (currency, expected) => {
  expect(formatCurrency(currency)).toBe(expected);
});
