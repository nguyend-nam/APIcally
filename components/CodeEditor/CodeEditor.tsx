import Editor from "@monaco-editor/react";
import { useContext, useMemo, Dispatch, SetStateAction } from "react";
import { FileListContext } from "../../context";

export const CodeEditor = ({
  currentFile,
  value,
  setValue,
  language,
}: {
  currentFile: number;
  value?: string;
  setValue: Dispatch<SetStateAction<string | undefined>>;
  language?: string;
}) => {
  const contextValue = useContext(FileListContext);
  const { editFileContent } = contextValue;

  const renderEditor = useMemo(() => {
    return (
      <Editor
        language={language}
        value={value}
        theme="vs-dark"
        onChange={(content) => {
          setValue(content);
          editFileContent(currentFile, content ? content : "");
        }}
      />
    );
  }, [currentFile, editFileContent, language, setValue, value]);

  return (
    <div className="overlay rounded-md overflow-hidden w-full h-full shadow-4xl">
      {renderEditor}
    </div>
  );
};
