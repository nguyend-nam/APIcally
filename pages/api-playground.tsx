import { useEffect, useMemo, useState } from "react";
import { CodeEditor } from "../components/CodeEditor";
import { FileHeader, FileManagement } from "../components/FileExplorer";
import { useFileListContext } from "../context";

const CodeEditorPage = () => {
  const { fileList } = useFileListContext();

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
          <div className="col-span-6 h-[550px]">{renderCodeEditor}</div>
        </div>
      </div>
    </div>
  );
};

export default CodeEditorPage;
