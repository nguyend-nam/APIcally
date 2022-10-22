// import { createContext } from "react";
import { createContext } from "@dwarvesf/react-utils";
import { useState } from "react";
import { pythonInitCode } from "../constants/python-init";
import { WithChildren } from "../types/common";

export interface fileObj {
  fileName: string;
  codeContent: string;
  language: "python";
}

const defaultValue: fileObj[] = [
  { fileName: "main.py", codeContent: pythonInitCode, language: "python" },
  { fileName: "test.py", codeContent: "# test.py file", language: "python" },
];

const [Provider, useFileListContext] = createContext<any>();

const FileListProvider = ({ children }: WithChildren) => {
  const [fileList, setFileList] = useState<fileObj[]>(defaultValue);

  const addFile = (newComp: fileObj) => {
    setFileList(() => [...fileList, newComp]);
  };

  const removeFile = (index: number) => {
    const newArr: fileObj[] = [];

    fileList.forEach((File: fileObj, fileId: number) => {
      if (fileId !== index) newArr.push(File);
    });

    setFileList(newArr);
  };

  const editFileContent = (index: number, newContent: string) => {
    const updatedFile: fileObj = {
      fileName: fileList[index].fileName,
      language: fileList[index].language,
      codeContent: newContent,
    };

    const newArr: fileObj[] = [];

    fileList.forEach((File: fileObj, styleId: number) => {
      if (styleId === index) newArr.push(updatedFile);
      else newArr.push(File);
    });

    setFileList(newArr);
  };

  return (
    <Provider
      value={{
        fileList,
        addFile,
        removeFile,
        setFileList,
        editFileContent,
      }}
    >
      {children}
    </Provider>
  );
};

export { FileListProvider, useFileListContext };
