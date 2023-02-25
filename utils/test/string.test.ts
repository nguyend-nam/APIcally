import {
  checkPythonVarNameFormat,
  checkInvalidFileNameFormat,
} from "../string";

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
])("checkInvalidFileNameFormat(%s)", (input, expected) => {
  expect(checkInvalidFileNameFormat(input)).toBe(expected);
});
