export const formatFileName = (fileName: string) => {
  const arr = fileName.split(".");
  if (arr[arr.length - 1] === "py" && arr.length !== 1) return fileName;
  if (arr[arr.length - 1] === "") return `${arr.join(".")}py`;
  return `${fileName}.py`;
};

export const checkFileNameFormat = (fileName: string) => {
  return (
    fileName === "" || /[ `!@#$%^&*()_+=[\]{};':"\\|,<>/?~]/.test(fileName)
  );
};
