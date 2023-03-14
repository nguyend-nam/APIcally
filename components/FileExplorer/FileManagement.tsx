import { Dispatch, SetStateAction, useState } from "react";
import { fileObj, useFileListContext } from "../../context";
import { checkInvalidFileNameFormat, formatFileName } from "../../utils";
import { Alert } from "../Alert";
import { Dropdown, notification, Upload } from "antd";
import { PlusCircleOutlined, MoreOutlined } from "@ant-design/icons";
import { Button } from "../Button";

export const FileManagement = ({
  currentFile,
  setCurrentFile,
  className,
}: {
  currentFile: number;
  setCurrentFile: Dispatch<SetStateAction<number>>;
  className?: string;
}) => {
  const { fileList, addFile, removeFile } = useFileListContext();
  const [isAddingFile, setIsAddingFile] = useState<boolean>(false);
  const [isUploadingFile, setIsUploadingFile] = useState<boolean>(false);
  const [newFileName, setNewFileName] = useState<string>("");

  const checkExistingFileName = (name: string): boolean => {
    for (let i = 0; i < fileList.length; i++) {
      if (fileList[i].fileName === name) return true;
    }
    return false;
  };
  const onUpload = async (file: File) => {
    try {
      setIsUploadingFile(true);
      const content = await file.text();

      if (file.name.length > 3) {
        const fileExtension = file.name.slice(-3);
        if (fileExtension !== ".py") {
          notification.error({
            message: (
              <span className="">
                Please upload{" "}
                <code className="bg-slate-100 py-0.5 px-1 rounded-sm text-sm">
                  .py
                </code>{" "}
                only
              </span>
            ),
          });
          return;
        }

        addFile({
          fileName: file.name,
          codeContent: content,
          language: "python",
        });

        notification.success({ message: `${file.name} uploaded successfully` });
      }
    } catch (error: any) {
      notification.error({
        message: error?.message || "Could not upload file",
      });
    } finally {
      setIsUploadingFile(false);
    }
  };

  return (
    <div className={`z-30 h-screen overflow-auto ${className}`}>
      <div className="p-4 flex justify-start flex-wrap gap-2 bg-indigo-300 sticky top-0 z-30">
        <Button
          className="!text-sm"
          onClick={() => setIsAddingFile(true)}
          label={
            <span className="flex items-center gap-1">
              <PlusCircleOutlined className="text-sm" />
              Add file
            </span>
          }
          disabled={isUploadingFile}
        />

        <Upload
          name="upload-file"
          accept=".py"
          maxCount={1}
          itemRender={() => null}
          customRequest={(options) => {
            onUpload(options.file as File);
          }}
          beforeUpload={(file) => {
            if (file.name && checkExistingFileName(file.name)) {
              notification.error({ message: `${file?.name} already exists` });
              return false;
            }
          }}
        >
          <Button
            className="!bg-white !text-primary !text-sm border-dashed !border-indigo-500"
            appearance="outline"
            label={
              <>
                Upload{" "}
                <code className="bg-slate-100 py-0.5 px-1 rounded-sm text-xs">
                  .py
                </code>
              </>
            }
            disabled={isUploadingFile}
          />
        </Upload>
      </div>
      <div className="flex flex-col p-4 space-y-1">
        {fileList.map((file: fileObj, index: number) => (
          <div
            key={file.fileName}
            className="flex justify-between items-center"
          >
            <div
              role="button"
              onClick={() => {
                setCurrentFile(index);
              }}
              className={`p-2 rounded-md w-full ${
                currentFile === index ? "bg-blue-100" : "bg-slate-100"
              }`}
            >
              <code className="text-slate-600 text-sm">{file.fileName}</code>
            </div>
            {file.fileName !== "main.py" ? (
              <Dropdown
                overlay={
                  <button
                    className="rounded-md p-2 bg-white shadow-lg font-light"
                    onClick={() => {
                      setCurrentFile(0);
                      setTimeout(() => removeFile(index), 200);
                    }}
                  >
                    Delete
                  </button>
                }
                placement="bottomRight"
                trigger={["click"]}
                className="p-0.5 rounded-md ml-2 bg-white shadow h-full"
              >
                <MoreOutlined
                  className="h-max text-xl"
                  style={{ color: "#2D31FA" }}
                />
              </Dropdown>
            ) : null}
          </div>
        ))}

        {isAddingFile && (
          <>
            <form className="bg-slate-100 flex justify-end items-center p-2 space-x-1 rounded-md">
              <input
                className="w-full bg-slate-100 border border-slate-100 border-b-slate-400 placeholder:text-gray-400 placeholder:font-light p-0.5"
                placeholder="enter file name..."
                type="text"
                onChange={(event: any) =>
                  setNewFileName(event.currentTarget.value)
                }
              />
              <button
                type="submit"
                className="p-1 px-2 font-light text-sm rounded-md bg-slate-200 hover:bg-slate-300 disabled:hover:bg-slate-200 disabled:cursor-not-allowed disabled:text-slate-400"
                onClick={(e: any) => {
                  e.preventDefault();

                  addFile({
                    fileName: formatFileName(newFileName),
                    codeContent: `# ${formatFileName(newFileName)} file`,
                    language: "python",
                  });
                  setIsAddingFile(false);
                }}
                disabled={
                  checkExistingFileName(formatFileName(newFileName)) ||
                  checkInvalidFileNameFormat(newFileName)
                }
              >
                OK
              </button>
              <button
                className="p-1 px-2 bg-slate-200 hover:bg-slate-300 rounded-md font-light text-sm"
                onClick={() => {
                  setIsAddingFile(false);
                }}
              >
                Cancel
              </button>
            </form>

            <Alert
              type="info"
              message="File name must be unique and must not contains any special characters"
              className="mt-1"
            />
          </>
        )}
      </div>
    </div>
  );
};
