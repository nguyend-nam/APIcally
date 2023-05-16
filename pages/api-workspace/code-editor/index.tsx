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
import { isAPINameFormatValid } from "../../../utils";
import { client, GET_PATHS } from "../../../libs/api";
import { notification } from "antd";
import { useFetchWithCache } from "../../../hooks/useFetchWithCache";
import { APICALLY_KEY, useAuthContext } from "../../../context/auth";

const CodeEditorPageInner = () => {
  const { fileList } = useFileListContext() as { fileList: fileObj[] };
  const filesData = useMemo(() => new FormData(), []);
  const { user, isAuthenticated, logout } = useAuthContext();

  const { push, query, isReady, replace } = useRouter();

  const { data, error } = useFetchWithCache(
    [
      GET_PATHS.GET_PROJECT_BY_ALIAS(
        user?.username || "-",
        query.alias as string
      ),
    ],
    () => client.getProjectByAlias(query.alias as string)
  );

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

  useEffect(() => {
    if (isReady) {
      if (
        !query.alias ||
        !query.username ||
        typeof query.alias !== "string" ||
        typeof query.username !== "string"
      ) {
        push(ROUTES.API_WORKSPACE_CREATE);
      }

      if (!isAPINameFormatValid(query.alias as string)) {
        push(ROUTES.API_WORKSPACE_CREATE);
      }

      if (error?.message === "Project not found") {
        notification.error({
          message:
            "You don't have access to that project, or it has been deleted or does not exist",
        });
        push(ROUTES.API_WORKSPACE_CREATE);
      }

      if (data && data.code !== 200) {
        push(ROUTES.API_WORKSPACE_CREATE);
      }
    }
  }, [push, query, isReady, data, error]);

  const onSubmit = async (alias: string) => {
    try {
      setIsLoading(true);

      const mainFile = fileList.find((file) => file.fileName === "main.py");
      console.log(filesData);

      if (mainFile) {
        const newFile = new Blob([mainFile.codeContent]);
        filesData.append("", newFile, mainFile.fileName);

        const data = await client.uploadProjectFiles(alias, filesData);

        // const requestOptions = {
        //   method: "POST",
        //   body: filesData,
        //   redirect: "follow",
        // };

        // fetch(`http://localhost:5000/v1/${alias}/upload`, requestOptions)
        //   .then((response) => response.text())
        //   .then((result) => console.log(result))
        //   .catch((error) => console.log("error", error));

        if (data) {
          if (data.code === 200) {
            notification.success({ message: "Files uploaded successfully" });
            // push(
            //   ROUTES.API_WORKSPACE_DOCUMENTATION(ownerId, query.alias as string)
            // );
          }
        }
      }
    } catch (error: any) {
      notification.error({
        message: error.message || "Could not upload files",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const [currentFile, setCurrentFile] = useState<number>(0);
  const [value, setValue] = useState<string | undefined>("");
  const [language, setLanguage] = useState<string | undefined>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

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
                currentFileName={fileList[currentFile].fileName}
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
