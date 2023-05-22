import { useEffect, useMemo, useState } from "react";
import { CodeEditor } from "../../../components/CodeEditor";
import { FileHeader, FileManagement } from "../../../components/FileExplorer";
import {
  FileListProvider,
  fileObj,
  useFileListContext,
} from "../../../context";
import FormData from "form-data";
import { Button } from "../../../components/Button";
import { Layout } from "../../../components/Layout";
import { useRouter } from "next/router";
import Head from "next/head";
import { ROUTES } from "../../../constants/routes";
// import { isAPINameFormatValid } from "../../../utils";
import { client, GET_PATHS } from "../../../libs/api";
import { notification } from "antd";
import { useFetchWithCache } from "../../../hooks/useFetchWithCache";
import { APICALLY_KEY, useAuthContext } from "../../../context/auth";

const CodeEditorPageInner = () => {
  const { fileList, setFileList } = useFileListContext() as {
    fileList: fileObj[];
    setFileList: (files: fileObj[]) => void;
  };
  const { user, isAuthenticated, logout } = useAuthContext();

  const { query, replace } = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      replace(ROUTES.LOGIN);
    }
  }, [isAuthenticated, replace]);

  useEffect(() => {
    const value =
      typeof window !== "undefined"
        ? window.localStorage.getItem(APICALLY_KEY)
        : undefined;

    if (!value) {
      logout();
    }
  }, [logout]);

  const { data, loading, mutate } = useFetchWithCache(
    [
      GET_PATHS.GET_PROJECT_FILES_CONTENT(
        user?.username || "-",
        query.alias as string
      ),
    ],
    () => client.getProjectFilesContent(query.alias as string)
  );

  useEffect(() => {
    if (loading) {
      return;
    }

    const projectFilesList: fileObj[] = [];

    (data?.filenames || []).forEach((file) => {
      if (file === "main.py") {
        const projectFile: fileObj = {
          fileName: file,
          codeContent: data?.content || "",
          language: "python",
        };
        projectFilesList.push(projectFile);
      } else {
        const projectFile: fileObj = {
          fileName: file,
          codeContent: "",
          language: "",
        };
        projectFilesList.push(projectFile);
      }
    });

    setFileList(projectFilesList);
  }, [data?.content, data?.filenames, loading, setFileList]);

  const onSubmit = async (alias: string) => {
    if (!alias) {
      return;
    }

    try {
      setIsLoading(true);
      const formData = new FormData();
      fileList.forEach((file) => {
        const fileToUpload = new File([file.codeContent], file.fileName);
        formData.append("", fileToUpload, file.fileName);
      });

      const res = await client.uploadProjectFiles(alias, formData);

      await mutate();
      if (res === "Upload files successfully") {
        notification.success({ message: "Files uploaded successfully" });
      }
    } catch (error: any) {
      console.log(error);
      // notification.error({
      //   message: error.message || "Could not upload files",
      // });
    } finally {
      setIsLoading(false);
    }
  };

  const [currentFile, setCurrentFile] = useState<number>(0);
  const [value, setValue] = useState<string | undefined>("");
  const [language, setLanguage] = useState<string | undefined>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setValue(fileList[currentFile]?.codeContent || "");
    setLanguage(fileList[currentFile]?.language || "");
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

  if (typeof query.username !== "string" || typeof query.alias !== "string") {
    return (
      <>
        <Head>
          <title>API workspace | APIcally</title>
        </Head>

        <Layout contentClassName="!p-0 !max-w-[100%]" hasFooter={false}>
          -
        </Layout>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>API workspace | APIcally</title>
      </Head>

      {isAuthenticated ? (
        <Layout contentClassName="!p-0 !max-w-[100%]" hasFooter={false}>
          <div className="flex bg-slate-100">
            <FileManagement
              currentFile={currentFile}
              setCurrentFile={setCurrentFile}
              className="sticky top-0 w-[350px] bg-white"
            />
            <div className="w-full">
              <FileHeader
                className="sticky top-0 z-30"
                currentFileName={fileList[currentFile]?.fileName || ""}
              />
              <div className="p-4 grid grid-cols-12 gap-4">
                <div className="col-span-12 min-h-[550px]">
                  {renderCodeEditor}
                </div>
              </div>
              <div className="p-4 pt-0">
                <Button
                  label="Submit algorithm"
                  onClick={() => {
                    onSubmit(query.alias as string);
                  }}
                  isLoading={isLoading}
                />
              </div>
            </div>
          </div>
        </Layout>
      ) : null}
    </>
  );
};

const CodeEditorPage = () => {
  return (
    <FileListProvider>
      <CodeEditorPageInner />
    </FileListProvider>
  );
};

export default CodeEditorPage;
