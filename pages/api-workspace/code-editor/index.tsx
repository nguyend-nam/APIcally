import { useEffect, useMemo, useState } from "react";
import { CodeEditor } from "../../../components/CodeEditor";
import { FileHeader, FileManagement } from "../../../components/FileExplorer";
import { fileObj, useFileListContext } from "../../../context";
import axios from "axios";
import FormData from "form-data";
import { Button } from "../../../components/Button";
import { Layout } from "../../../components/Layout";

const sendData = async (data: FormData, fileList: fileObj[]) => {
  fileList.forEach((file) => {
    if (file.fileName === "main.py") {
      const newFile = new File([file.codeContent], file.fileName);
      data.append("file", newFile);
    }
  });

  console.log(data);

  const config = {
    method: "post",
    url: "http://localhost:5000/api/v1",
    headers: { ...data.getHeaders, "Content-Type": "multipart/form-data" },
    data: data,
  };

  axios(config)
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
};

const CodeEditorPage = () => {
  const { fileList } = useFileListContext() as { fileList: fileObj[] };

  const data = useMemo(() => new FormData(), []);

  const [currentFile, setCurrentFile] = useState<number>(0);
  const [value, setValue] = useState<string | undefined>("");
  const [language, setLanguage] = useState<string | undefined>("");

  useEffect(() => {
    setValue(fileList[currentFile].codeContent);
    setLanguage(fileList[currentFile].language);
  }, [currentFile, fileList]);

  const renderCodeEditor = useMemo(() => {
    return (
      <CodeEditor
        currentFile={currentFile}
        value={value}
        setValue={setValue}
        language={language}
      />
    );
  }, [currentFile, language, value]);

  return (
    <Layout contentClassName="!p-0" hasFooter={false}>
      <div className="flex bg-slate-100">
        <FileManagement
          currentFile={currentFile}
          setCurrentFile={setCurrentFile}
          className="sticky top-0 w-[400px] bg-white"
        />
        <div className="w-full">
          <FileHeader
            className="sticky top-0 z-30"
            currentFileName={fileList[currentFile].fileName}
          />
          <div className="p-4 grid grid-cols-12 gap-4">
            <div className="col-span-12 min-h-[550px]">{renderCodeEditor}</div>
          </div>
          <div className="p-4 pt-0">
            <Button
              label="Submit"
              onClick={() => sendData(data, fileList)}
              className="text-lg py-1 px-2"
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CodeEditorPage;
