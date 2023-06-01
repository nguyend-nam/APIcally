export type codeSnippetTypes =
  | "cURL"
  | "phpCURL"
  | "jsFetch"
  | "nodeAxios"
  | "pythonRequest";

export const codeSnippetOptions: Record<codeSnippetTypes, string> = {
  cURL: "cURL",
  phpCURL: "PHP - cURL",
  jsFetch: "JavaScript - Fetch",
  nodeAxios: "NodeJS - Axios",
  pythonRequest: "Python - Request",
};

export const codeSnippetRequest = (
  requestType: codeSnippetTypes,
  ownerId: string,
  alias: string,
  sessionToken: string,
  input: any
) => {
  if (requestType === "cURL") {
    return `curl --location 'http://localhost:3001/execute/${ownerId}/${alias}' \
--header 'Content-Type: application/json' \
--data '{
    "sessionToken": "${sessionToken}",
    "input": ${JSON.stringify(input)}
}'`;
  }
  if (requestType === "phpCURL") {
    return `<?php

$curl = curl_init();

curl_setopt_array($curl, array(
    CURLOPT_URL => 'http://localhost:3001/execute/${ownerId}/${alias}',
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_ENCODING => '',
    CURLOPT_MAXREDIRS => 10,
    CURLOPT_TIMEOUT => 0,
    CURLOPT_FOLLOWLOCATION => true,
    CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
    CURLOPT_CUSTOMREQUEST => 'POST',
    CURLOPT_POSTFIELDS =>'{
    "sessionToken": "${sessionToken}",
    "input": ${JSON.stringify(input)}
}',
    CURLOPT_HTTPHEADER => array(
      'Content-Type: application/json'
    ),
));

$response = curl_exec($curl);

curl_close($curl);
echo $response;`;
  }
  if (requestType === "jsFetch") {
    return `const fetch = require("isomorphic-unfetch");

var raw = JSON.stringify({
  sessionToken: "${sessionToken}",
  input: ${JSON.stringify(input)},
});

var requestOptions = {
  method: "POST",
  headers: {"Content-Type": "application/json"},
  body: raw,
  redirect: "follow",
};

fetch("http://localhost:3001/execute/${ownerId}/${alias}", requestOptions)
  .then((response) => response.text())
  .then((result) => console.log(result))
  .catch((error) => console.log("error", error));`;
  }
  if (requestType === "nodeAxios") {
    return `const axios = require('axios');
let data = JSON.stringify({
    "sessionToken": "${sessionToken}",
    "input": ${JSON.stringify(input)},
});

let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'http://localhost:3001/execute/${ownerId}/${alias}',
    headers: { 
      'Content-Type': 'application/json'
    },
    data : data
};

axios.request(config)
.then((response) => {
    console.log(JSON.stringify(response.data));
})
.catch((error) => {
    console.log(error);
});`;
  }
  return `import requests
import json

url = "http://localhost:3001/execute/${ownerId}/${alias}"

payload = json.dumps({
    "sessionToken": "${sessionToken}",
    "input": ${JSON.stringify(input)}
})
headers = {
    'Content-Type': 'application/json'
}

response = requests.request("POST", url, headers=headers, data=payload)

print(response.text)`;
};
