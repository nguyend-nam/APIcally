export const formatFileName = (fileName: string) => {
  const arr = fileName.split(".");
  if (arr[arr.length - 1] === "py" && arr.length !== 1) return fileName;
  if (arr[arr.length - 1] === "") return `${arr.join(".")}py`;
  return `${fileName}.py`;
};

export const checkInvalidFileNameFormat = (fileName: string) => {
  return (
    fileName === "" ||
    /[ `!@#$%^&*()+=[\]{};':"\\|,<>/?~]/.test(fileName) ||
    !/[a-zA-Z]/.test(fileName)
  );
};

export const checkPythonVarNameFormat = (varName: string) => {
  return /^[a-zA-Z_$][a-zA-Z_$0-9]*$/.test(varName);
};

export const formatPathname = (pathname: string) => {
  const newPathname = pathname.slice(1);
  const result = newPathname[0].toUpperCase() + newPathname.slice(1);
  return result.replace("-", " ").split("/")[0];
};

export function capitalizeFirstLetter(value = "") {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

export const snakeCaseToNormalString = (snakeCase: string) => {
  const result = snakeCase.replace("-", " ");
  return result.charAt(0).toUpperCase() + result.slice(1);
};
