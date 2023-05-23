import {
  Col,
  Form,
  notification,
  Row,
  Select,
  Spin,
  Table,
  Tag,
  Tooltip,
  Typography,
} from "antd";
import dynamic from "next/dynamic";
import Head from "next/head";
import { useRouter } from "next/router";
import { Layout } from "../../../../components/Layout";
import { Card } from "../../../../components/Card";
import { variableTypes } from "../../../../constants/python";
import { Input } from "../../../../components/Input";
import { ColumnsType } from "antd/lib/table";
import { useIsMobile } from "../../../../hooks/useIsMobile";
import { Button } from "../../../../components/Button";
import {
  CaretRightOutlined,
  CopyOutlined,
  RedoOutlined,
} from "@ant-design/icons";
import { useEffect, useMemo, useState } from "react";
import { ROUTES } from "../../../../constants/routes";
import { APICALLY_KEY, useAuthContext } from "../../../../context/auth";
import { ReactQuillProps } from "react-quill";
import { useFetchWithCache } from "../../../../hooks/useFetchWithCache";
import { client, GET_PATHS } from "../../../../libs/api";
import { editorModules } from "../../../../constants/editor";
import { useClipboard } from "@dwarvesf/react-hooks";
import {
  codeSnippetOptions,
  codeSnippetRequest,
  codeSnippetTypes,
} from "../../../../constants/execute";

function syntaxHighlight(json: string) {
  if (typeof json != "string") {
    json = JSON.stringify(json, undefined, 2);
  }
  json = json
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
  return json.replace(
    /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+-]?\d+)?)/g,
    function (match) {
      let cls = "number";
      if (/^"/.test(match)) {
        if (/:$/.test(match)) {
          cls = "key";
        } else {
          cls = "string";
        }
      } else if (/true|false/.test(match)) {
        cls = "boolean";
      } else if (/null/.test(match)) {
        cls = "null";
      }
      return '<span class="' + cls + '">' + match + "</span>";
    }
  );
}

const ReactQuill = dynamic<ReactQuillProps>(
  () => import("react-quill").then((mod) => mod),
  { ssr: false }
);

const defineInputType = (type: keyof typeof variableTypes) => {
  if (type === "number") return "number";
  if (type === "string") return "text";
};

const UtilizerPage = () => {
  const { query, replace } = useRouter();
  const isMobile = useIsMobile();
  const { isAuthenticated, logout } = useAuthContext();
  const { push } = useRouter();
  const [defaultMDValue, setDefaultMDValue] = useState("");
  const [isRegenerating, setIsRegenerating] = useState(false);
  const [isExecuting, setIsExecuting] = useState(false);
  const [executeResult, setExecuteResult] = useState<string>("");
  const [requestType, setRequestType] = useState<codeSnippetTypes>("cURL");

  useEffect(() => {
    if (!isAuthenticated) {
      replace(ROUTES.LOGIN);
    }
  }, [isAuthenticated, replace]);

  const { data, loading } = useFetchWithCache(
    isAuthenticated
      ? [
          GET_PATHS.GET_PROJECT_DETAIL_OWNERID_ALIAS_WITH_AUTH(
            query.username as string,
            query.alias as string
          ),
        ]
      : [
          GET_PATHS.GET_PROJECT_DETAIL_OWNERID_ALIAS(
            query.username as string,
            query.alias as string
          ),
        ],
    isAuthenticated
      ? () =>
          client.getProjectDetailByOwnerIdAndAliasWithAuth(
            query.username as string,
            query.alias as string
          )
      : () =>
          client.getProjectDetailByOwnerIdAndAlias(
            query.username as string,
            query.alias as string
          )
  );

  const {
    data: executeTokenData,
    loading: executeTokenLoading,
    mutate: mutateExecuteToken,
  } = useFetchWithCache(
    [
      GET_PATHS.GET_EXECUTE_TOKEN(
        query.username as string,
        query.alias as string
      ),
    ],
    () =>
      client.getExecutionToken(query.username as string, query.alias as string)
  );

  const { onCopy, hasCopied } = useClipboard(
    executeTokenLoading ? "" : executeTokenData?.data || ""
  );

  useEffect(() => {
    if (hasCopied) {
      notification.success({ message: "Copied execute token to clipboard" });
    }
  }, [hasCopied]);

  useEffect(() => {
    if (loading || executeTokenLoading) {
      setDefaultMDValue("");
    }

    setDefaultMDValue(data?.data.project.documentation || "---");
  }, [data?.data.project.documentation, executeTokenLoading, loading]);

  useEffect(() => {
    const value =
      typeof window !== "undefined"
        ? window.localStorage.getItem(APICALLY_KEY)
        : undefined;

    if (!value) {
      logout();
    }
  }, [logout]);

  const onRegenerateClick = async () => {
    try {
      setIsRegenerating(true);
      const res = await client.changeExecutionToken(
        query.username as string,
        query.alias as string
      );

      if (res?.data) {
        notification.success({
          message: "Execute token re-generated successfully",
        });
        await mutateExecuteToken();
      } else {
        notification.error({
          message: "Could not re-generate execute token",
        });
      }
    } catch (error: any) {
      notification.error({
        message: error || "Could not re-generate execute token",
      });
      console.log(error);
    } finally {
      setIsRegenerating(false);
    }
  };

  const onExecuteClick = async () => {
    if (loading || executeTokenLoading || !executeTokenData) {
      return;
    }

    try {
      setIsExecuting(true);
      const res = await client.executeProject(
        query.username as string,
        query.alias as string,
        executeTokenData.data,
        {}
      );

      if (res?.data) {
        setExecuteResult(syntaxHighlight(JSON.stringify(res)));
      } else {
        notification.error({
          message: "Could not execute project",
        });
      }
    } catch (error: any) {
      notification.error({
        message: error || "Could not execute project",
      });
      console.log(error);
    } finally {
      setIsExecuting(false);
    }
  };

  const columns: ColumnsType<any> = [
    {
      title: "Variable name",
      key: "name",
      dataIndex: "name",
      render: (name) => <code>{name}</code>,
      fixed: isMobile ? undefined : "left",
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
      title: "Input value",
      fixed: "right",
      // eslint-disable-next-line
      render: (value, _record) => (
        <Form>
          <div className="flex flex-col gap-2">
            {new Array(value.size).fill(1).map((a, i) => (
              <Form.Item key={`${a}${i}`} rules={[]} className="!m-0">
                <Input
                  type={defineInputType(value.type)}
                  id="name-input"
                  className="!text-base float-right max-w-[150px] md:max-w-[200px]"
                  placeholder={`Input ${value.name}...`}
                  onChange={(e) => console.log(value.name, e.target.value)}
                />
              </Form.Item>
            ))}
          </div>
        </Form>
      ),
      // ),
    },
  ];

  const dataSource = [
    {
      name: "co2",
      type: "number",
    },
    {
      name: "o3",
      type: "number",
    },
  ];

  const requestRender = useMemo(() => {
    if (loading || executeTokenLoading || !executeTokenData) {
      return "";
    }
    return codeSnippetRequest(
      requestType,
      query.username as string,
      query.alias as string,
      executeTokenData.data,
      {}
    );
  }, [
    executeTokenData,
    executeTokenLoading,
    loading,
    query.alias,
    query.username,
    requestType,
  ]);

  const { onCopy: onRequestCopy, hasCopied: hasRequestCopied } = useClipboard(
    loading || executeTokenLoading || !executeTokenData
      ? ""
      : codeSnippetRequest(
          requestType,
          query.username as string,
          query.alias as string,
          executeTokenData.data,
          {}
        )
  );

  const renderCopyButton = useMemo(() => {
    return (
      <Button
        label={
          hasRequestCopied ? (
            "Has copied"
          ) : (
            <CopyOutlined className="text-lg absolute top-1.5 left-1.5" />
          )
        }
        className="!backdrop-blur-md !bg-white/20 absolute right-4 top-4 min-w-[32px] h-[32px] block !m-0 ring-1 !ring-white"
        onClick={onRequestCopy}
      />
    );
  }, [hasRequestCopied, onRequestCopy]);

  if (loading || executeTokenLoading) {
    return (
      <>
        <Head>
          <title>API detail | APIcally</title>
        </Head>

        <Layout hasSearch pageTitle={(query?.username as string) || "-"}>
          <div className="flex justify-center h-40">
            <Spin size="large" />
          </div>
        </Layout>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>
          {query?.username && data?.data
            ? `${query?.username || "-"}/${data?.data.project.name || "-"}`
            : "API detail"}{" "}
          | APIcally
        </title>
      </Head>

      {isAuthenticated ? (
        <Layout hasSearch pageTitle={(query?.username as string) || "-"}>
          {data?.data === undefined ? (
            <Typography.Title level={3}>API not found</Typography.Title>
          ) : (
            <>
              <Typography.Title level={2} className="!m-0">
                <button
                  onClick={() => {
                    if (data?.data.project.ownerId) {
                      push(
                        ROUTES.PROFILE_OTHER_USER(data?.data.project.ownerId)
                      );
                    }
                  }}
                  className="font-normal text-2xl no-underline !text-black"
                >
                  {data?.data.project?.ownerId}/
                </button>
                <span className="text-primary text-2xl !font-semibold">
                  {data?.data.project?.name}
                </span>
              </Typography.Title>

              <Row className="my-6 md:my-8" gutter={[16, 16]}>
                <Col span={24}>
                  <div className="flex justify-end">
                    <div className="flex flex-col">
                      <div className="flex gap-4 justify-between items-center">
                        <Tooltip
                          title="Re-generate execute token"
                          placement="left"
                        >
                          <Button
                            label={
                              <RedoOutlined className="text-lg absolute top-1.5 left-1.5" />
                            }
                            className="min-w-[30px] h-[30px] relative block !m-0"
                            isLoading={isRegenerating}
                            onClick={onRegenerateClick}
                          />
                        </Tooltip>
                        <Card
                          className="p-2.5 gap-2 flex !bg-slate-50"
                          hasShadow={false}
                        >
                          <Typography.Text className="!m-0 text-base md:text-lg !text-slate-500">
                            {executeTokenData?.data}
                          </Typography.Text>
                          <Button
                            appearance="link"
                            label={
                              <CopyOutlined className="text-lg absolute top-1.5 left-1.5" />
                            }
                            className="min-w-[30px] h-[30px] relative block !m-0"
                            onClick={onCopy}
                          />
                        </Card>
                      </div>
                    </div>
                  </div>
                </Col>
                <Col span={24} lg={{ span: 12 }}>
                  <Card className="p-4" shadowSize="sm">
                    <Typography.Title
                      level={3}
                      className="!text-xl md:!text-2xl !m-0 !mb-2 md:!mb-4"
                    >
                      Provide inputs
                    </Typography.Title>
                    <Card hasShadow={false}>
                      <Table
                        rowKey="name"
                        columns={columns}
                        dataSource={dataSource}
                        scroll={{ x: "max-content" }}
                        pagination={false}
                      />
                    </Card>
                  </Card>
                </Col>
                <Col span={24} lg={{ span: 12 }}>
                  <Card
                    className="p-4 min-h-[200px] flex flex-col"
                    shadowSize="sm"
                  >
                    <div className="flex justify-between items-center mb-4">
                      <Typography.Title
                        level={3}
                        className="!text-xl md:!text-2xl !m-0"
                      >
                        Output
                      </Typography.Title>
                      <Button
                        label={
                          <CaretRightOutlined className="text-lg absolute top-1.5 left-1.5" />
                        }
                        className="w-[30px] h-[30px] relative block !m-0"
                        onClick={onExecuteClick}
                      />
                    </div>
                    <Card
                      hasShadow={false}
                      className="grow !bg-slate-700 p-4 !h-full"
                    >
                      {isExecuting ? (
                        <Spin />
                      ) : (
                        <pre
                          className="text-white"
                          dangerouslySetInnerHTML={{ __html: executeResult }}
                        />
                      )}
                    </Card>
                  </Card>
                </Col>

                <Col span={24}>
                  <Card
                    className="p-4 min-h-[200px] flex flex-col"
                    shadowSize="sm"
                  >
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-4">
                      <Typography.Title
                        level={3}
                        className="!text-xl md:!text-2xl !m-0"
                      >
                        Execute Requests
                      </Typography.Title>
                      <Select
                        value={requestType}
                        onChange={setRequestType}
                        className="white-bg primary-border small-text"
                        style={{ width: 160 }}
                        options={Object.entries(codeSnippetOptions).map(
                          (k) => ({
                            value: k[0],
                            label: k[1],
                          })
                        )}
                      />
                    </div>

                    <Card
                      hasShadow={false}
                      className="grow !bg-slate-700 p-4 !h-full !text-white relative"
                    >
                      {renderCopyButton}
                      <pre>{requestRender}</pre>
                    </Card>
                  </Card>
                </Col>
              </Row>

              <Typography.Title level={3}>Documentation</Typography.Title>
              <div className="border-primary border-t-4">
                <ReactQuill
                  theme="snow"
                  value={defaultMDValue}
                  modules={editorModules}
                  readOnly
                />
              </div>
            </>
          )}
        </Layout>
      ) : null}
    </>
  );
};

export default UtilizerPage;
