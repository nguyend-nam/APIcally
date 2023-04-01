import { checkPythonVarNameFormat, isFileNameFormatInvalid } from "../string";

test.each([
  ["my Variable", false],
  ["4myVariable", false],
  ["myVariable!", false],

  ["my4Variable", true],
  ["myVariable4", true],
  ["_myVariable", true],
  ["__myVariable", true],
])("checkPythonVarNameFormat(%s)", (input, expected) => {
  expect(checkPythonVarNameFormat(input)).toBe(expected);
});

test.each([
  ["@abc", true],
  ["#$", true],

  ["myFile", false],
  ["myFile1", false],
  ["my-file", false],
])("isFileNameFormatInvalid(%s)", (input, expected) => {
  expect(isFileNameFormatInvalid(input)).toBe(expected);
});
