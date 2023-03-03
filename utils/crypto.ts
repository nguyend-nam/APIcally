import * as CryptoTS from "crypto-ts";

export const base64url = (data: any) => {
  // Encode in classical base64
  let encodedSource = Buffer.from(JSON.stringify(data)).toString("base64");

  // Remove padding equal characters
  encodedSource = encodedSource.replace(/=+$/, "");

  // Replace characters according to base64url specifications
  encodedSource = encodedSource.replace(/\+/g, "-");
  encodedSource = encodedSource.replace(/\//g, "_");

  return encodedSource;
};

export const encodeData = (data: any) => {
  const stringifiedData = CryptoTS.enc.Utf8.parse(JSON.stringify(data));
  const encodedData = base64url(stringifiedData);

  return encodedData;
};
