import { createContext } from "react";

export interface fileObj {
  fileName: string;
  codeContent: string;
  language: "python";
}

export const FileListContext = createContext({
  fileList: [] as fileObj[],
  addFile: (newComp: fileObj) => {
    console.log(newComp);
  },
  removeFile: (i: number) => {
    console.log(i);
  },
  setFileList: undefined as any,
  editFileContent: (index: number, newContent: string) => {
    console.log(index, newContent);
  },
});
