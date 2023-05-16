import {
  capitalizeFirstLetter,
  checkPythonVarNameFormat,
  formatFileName,
  formatPathname,
  isAPINameFormatValid,
  isFileNameFormatInvalid,
  snakeCaseToNormalString,
} from "../string";

test.each([
  ["myVariable", "myVariable.py"],
  ["myVariable.", "myVariable.py"],
  ["myVariable.py", "myVariable.py"],
  ["myVariable.test", "myVariable.test.py"],
  ["myVariable.test.", "myVariable.test.py"],
])("formatFileName(%s)", (input, expected) => {
  expect(formatFileName(input)).toBe(expected);
});

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
  ["", true],

  ["myFile", false],
  ["myFile1", false],
  ["my-file", false],
])("isFileNameFormatInvalid(%s)", (input, expected) => {
  expect(isFileNameFormatInvalid(input)).toBe(expected);
});

test.each([["myFile", "MyFile"]])(
  "capitalizeFirstLetter(%s)",
  (input, expected) => {
    expect(capitalizeFirstLetter(input)).toBe(expected);
  }
);

test.each([
  ["/api-workspace", "Api workspace"],
  ["/home", "Home"],
])("formatPathname(%s)", (input, expected) => {
  expect(formatPathname(input)).toBe(expected);
});

test.each([
  ["api-workspace", "Api workspace"],
  ["snake-case", "Snake case"],
  ["snake-case-string", "Snake case string"],
  ["home", "Home"],
])("snakeCaseToNormalString(%s)", (input, expected) => {
  expect(snakeCaseToNormalString(input)).toBe(expected);
});

test.each([
  ["", false],
  ["api-name", false],

  ["apiName", true],
  ["api1", true],
])("isAPINameFormatValid(%s)", (input, expected) => {
  expect(isAPINameFormatValid(input)).toBe(expected);
});
