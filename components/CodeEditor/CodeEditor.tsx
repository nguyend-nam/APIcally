import Editor from "@monaco-editor/react";
import { useMemo, Dispatch, SetStateAction } from "react";
import { useFileListContext } from "../../context";

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
  const { editFileContent } = useFileListContext();

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
