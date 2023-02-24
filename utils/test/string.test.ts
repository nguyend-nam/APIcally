import { checkPythonVarNameFormat } from "../string";

test.each([
  ["my Variable", false],
  ["4myVariable", false],
  ["myVariable!", false],

  ["my4Variable", true],
  ["myVariable4", true],
  ["_myVariable", true],
  ["__myVariable", true],
])("capitalizeFirstLetter(%s)", (input, expected) => {
  expect(checkPythonVarNameFormat(input)).toBe(expected);
});
