import { Col, notification, Row, Table, Tag, Tooltip, Typography } from "antd";
import dynamic from "next/dynamic";
import { Button } from "../../../components/Button";
import { Layout } from "../../../components/Layout";
import { useDisclosure } from "@dwarvesf/react-hooks";
import { ColumnsType } from "antd/lib/table";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "antd/lib/form/Form";
import { DefineInput } from "../../../components/page/api-workspace/DefineInput";
import { DeleteFilled } from "@ant-design/icons";
import { multipleStates, variableTypes } from "../../../constants/python";
import { useRouter } from "next/router";
import Head from "next/head";
import { Card } from "../../../components/Card";
import { ROUTES } from "../../../constants/routes";
import { CREATE_API_NAME_KEY } from "../new";
import { isAPINameFormatValid } from "../../../utils";
import { useFetchWithCache } from "../../../hooks/useFetchWithCache";
import { client, GET_PATHS } from "../../../libs/api";
import { APICALLY_KEY, useAuthContext } from "../../../context/auth";
import { ReactQuillProps } from "react-quill";
import { editorModules } from "../../../constants/editor";

const ReactQuill = dynamic<ReactQuillProps>(
  () => import("react-quill").then((mod) => mod),
  { ssr: false }
);

export const defaultMD =
  "<h1>API's documentation</h1><blockquote>Block quote</blockquote><p><br></p><h2>Heading 2</h2><ul><li>list item 1</li><li>list item 2</li></ul><p><br></p><p><pre class='ql-syntax' spellcheck='false'>Code snippet</pre></p><p><img src='https://picsum.photos/536/354'/></p>";

export type dataSourceType = {
  name: string;
  type: string;
  multipleState: string;
  size?: number;
};

const DocumentationPage = () => {
  const [dataSource, setDataSource] = useState<dataSourceType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [mDValue, setMDValue] = useState(defaultMD);

  console.log(mDValue);

  const {
    isOpen: isAddInputDialogOpen,
    onOpen: openAddInputDialog,
    onClose: closeAddInputDialog,
  } = useDisclosure();

  const { push, query, isReady, replace } = useRouter();
  const { isAuthenticated, logout } = useAuthContext();

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

  const { data, error } = useFetchWithCache(
    [GET_PATHS.GET_PROJECT_BY_ALIAS("nguyend-nam", query.alias as string)],
    () => client.getProjectByAlias(query.alias as string)
  );

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
            "You don't have access to that project or it has been deleted",
        });
        push(ROUTES.API_WORKSPACE_CREATE);
      }

      if (data && data.code !== 200) {
        push(ROUTES.API_WORKSPACE_CREATE);
      }
    }
  }, [push, query, isReady, data, error]);

  const [form] = useForm();

  const columns: ColumnsType<any> = [
    {
      title: "Variable name",
      key: "name",
      dataIndex: "name",
      render: (name) => <code>{name}</code>,
      fixed: "left",
    },
    {
      title: "Type",
      key: "type",
      dataIndex: "type",
      render: (type: keyof typeof variableTypes) => (
        <Tag>{variableTypes[type]}</Tag>
      ),
    },
    {
      title: "Multiple state",
      key: "multipleState",
      dataIndex: "multipleState",
      render: (type: keyof typeof multipleStates) => (
        <Tag>{multipleStates[type]}</Tag>
      ),
    },
    {
      title: "Size",
      key: "size",
      dataIndex: "size",
    },
    {
      title: "",
      fixed: "right",
      render: (_value, _record, index) => (
        <Button
          appearance="link"
          label={
            <Tooltip title="Delete">
              <DeleteFilled />
            </Tooltip>
          }
          onClick={() => {
            const newDataSource: dataSourceType[] = [];

            dataSource.forEach((d, i) => {
              if (i !== index) newDataSource.push(d);
            });

            setDataSource(newDataSource);
          }}
        />
      ),
    },
  ];

  const renderTable = useMemo(() => {
    return (
      <Card className="p-4" shadowSize="sm">
        <Table
          rowKey="name"
          columns={columns}
          dataSource={dataSource}
          scroll={{ x: "max-content" }}
          pagination={false}
        />
      </Card>
    );
  }, [dataSource]); // eslint-disable-line

  return (
    <>
      <Head>
        <title>API workspace | APIcally</title>
      </Head>

      {isAuthenticated ? (
        <Layout>
          <Typography.Title
            level={3}
            className="!text-xl md:!text-2xl capitalize"
          >
            Documentation
          </Typography.Title>
          <div className="border-primary border-t-4">
            <ReactQuill
              theme="snow"
              value={mDValue}
              onChange={setMDValue}
              modules={editorModules}
            />
          </div>

          <Row className="mt-8">
            <Col span={24}>
              <div className="flex items-center justify-between w-full mb-4">
                <Typography.Title
                  level={3}
                  className="!m-0 !text-xl md:!text-2xl capitalize"
                >
                  Define inputs
                </Typography.Title>

                <Button label="Add input" onClick={openAddInputDialog} />
              </div>

              {isAddInputDialogOpen && (
                <DefineInput
                  form={form}
                  dataSource={dataSource}
                  setDataSource={setDataSource}
                  isOpen={isAddInputDialogOpen}
                  onCancel={closeAddInputDialog}
                  onOk={form.submit}
                />
              )}

              {renderTable}
            </Col>
          </Row>

          <Button
            label="Submit"
            onClick={() => {
              setIsLoading(true);
              setTimeout(() => {
                notification.success({
                  message: "Algorithm successfully submitted!",
                });
                push(ROUTES.PROFILE);
              }, 1000);
              window.localStorage.removeItem(CREATE_API_NAME_KEY);
            }}
            className="mt-8"
            isLoading={isLoading}
          />
        </Layout>
      ) : null}
    </>
  );
};

export default DocumentationPage;
