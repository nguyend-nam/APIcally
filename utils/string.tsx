import { apiRepoType } from "../pages/explore";

export const formatFileName = (fileName: string) => {
  const arr = fileName.split(".");
  if (arr[arr.length - 1] === "py" && arr.length !== 1) return fileName;
  if (arr[arr.length - 1] === "") return `${arr.join(".")}py`;
  return `${fileName}.py`;
};

export const isFileNameFormatInvalid = (fileName: string) => {
  return (
    fileName === "" ||
    /[ `!@#$%^&*()+=[\]{};':"\\|,<>/?~]/.test(fileName) ||
    !/[a-zA-Z]/.test(fileName)
  );
};

export const isAPINameFormatValid = (apiName: string) => {
  return /^[a-zA-Z0-9.]*$/.test(apiName);
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

export const renderSubscribeListConfirmation = (
  apiList: apiRepoType[],
  func: "subscribe" | "remove"
) => {
  if (apiList.length === 0) return;
  if (apiList.length === 1) {
    return (
      <>
        Are you sure you want to{" "}
        {func === "subscribe" ? "subscribe to" : "remove"}{" "}
        <b>{apiList[0].name}</b>.
      </>
    );
  }

  const nameList = apiList.map((a) => a.name);

  return (
    <>
      Are you sure you want to{" "}
      {func === "subscribe" ? "subscribe to" : "remove"}{" "}
      {nameList.slice(0, apiList.length - 1).map((n, i) => (
        <>
          <b key={n}>{n}</b>
          {i < nameList.length - 2 ? ", " : ""}
        </>
      ))}{" "}
      and <b>{apiList[apiList.length - 1].name}</b>.
    </>
  );
};

export function parseJWT(token: string) {
  const base64Url = token.split(".")[1];
  // Not a valid jwt
  if (!base64Url) return null;

  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  const jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split("")
      .map((c) => {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2); // eslint-disable-line prefer-template
      })
      .join("")
  );

  return JSON.parse(jsonPayload);
}
