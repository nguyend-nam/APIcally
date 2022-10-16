import { useContext } from "react";
import { FileListContext } from "../../context";

export const FileHeader = ({
  currentFile,
  className,
}: {
  currentFile: number;
  className?: string;
}) => {
  const contextValue = useContext(FileListContext);
  const { fileList } = contextValue;

  return (
    <div className={`px-4 pt-4 bg-white shadow-lg flex ${className}`}>
      {fileList.map((file, index) => {
        if (currentFile === index)
          return (
            <div
              key={file.fileName}
              className="px-3 py-1.5 max-w-max rounded-t-xl bg-slate-100 text-primary"
            >
              <code className="text-sm">{file.fileName}</code>
            </div>
          );
      })}
    </div>
  );
};
