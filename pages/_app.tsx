/* eslint-disable @typescript-eslint/no-empty-function */
import "../styles/globals.css";
import type { AppProps } from "next/app";
import { useState } from "react";
import {
  componentObj,
  ComponentListContext,
  fileObj,
  FileListContext,
} from "../context";
import { pythonInitCode } from "../constants/python-init";
import "antd/dist/antd.css";

function MyApp({ Component, pageProps }: AppProps) {
  // utils for GRID ITEMS context
  const [componentList, setComponentList] = useState<componentObj[]>([
    { containerCol: 2, containerRow: 3 },
    { containerCol: 8, containerRow: 2 },
    { containerCol: 3, containerRow: 1 },
    { containerCol: 2, containerRow: 2 },
    { containerCol: 1, containerRow: 1 },
  ]);

  const addComponent = (newComp: componentObj) => {
    setComponentList(() => [...componentList, newComp]);
  };

  const removeComponent = (index: number) => {
    const newArr: componentObj[] = [];

    componentList.forEach((component: componentObj, styleId: number) => {
      if (styleId !== index) newArr.push(component);
    });
    setComponentList(newArr);
  };

  const removeAllComponent = () => {
    const newArr: componentObj[] = [];
    setComponentList(newArr);
  };

  // utils for FILE EXPLORER context
  const [fileList, setFileList] = useState<fileObj[]>([
    { fileName: "main.py", codeContent: pythonInitCode, language: "python" },
    { fileName: "test.py", codeContent: "# test.py file", language: "python" },
  ]);

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
    <FileListContext.Provider
      value={{
        fileList,
        addFile,
        removeFile,
        setFileList,
        editFileContent,
      }}
    >
      <ComponentListContext.Provider
        value={{
          componentList,
          addComponent,
          removeComponent,
          removeAllComponent,
          setComponentList,
        }}
      >
        <Component {...pageProps} />
      </ComponentListContext.Provider>
    </FileListContext.Provider>
  );
}

export default MyApp;
