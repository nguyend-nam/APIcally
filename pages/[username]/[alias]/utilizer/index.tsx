import { Col, Form, Row, Table, Tag, Typography } from "antd";
import dynamic from "next/dynamic";
import Head from "next/head";
import { useRouter } from "next/router";
import { Layout } from "../../../../components/Layout";
import { Card } from "../../../../components/Card";
import { multipleStates, variableTypes } from "../../../../constants/python";
import { Input } from "../../../../components/Input";
import { ColumnsType } from "antd/lib/table";
import { useIsMobile } from "../../../../hooks/useIsMobile";
import { Button } from "../../../../components/Button";
import { CaretRightOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { ROUTES } from "../../../../constants/routes";
import { APICALLY_KEY, useAuthContext } from "../../../../context/auth";
import { ReactQuillProps } from "react-quill";
import { useFetchWithCache } from "../../../../hooks/useFetchWithCache";
import { client, GET_PATHS } from "../../../../libs/api";
import { editorModules } from "../../../../constants/editor";

const ReactQuill = dynamic<ReactQuillProps>(
  () => import("react-quill").then((mod) => mod),
  { ssr: false }
);

const defineInputType = (type: keyof typeof variableTypes) => {
  if (type === "number") return "number";
  if (type === "bool") return "checkbox";
  if (type === "string" || type === "object") return "text";
};

const UtilizerPage = () => {
  const { query, replace } = useRouter();
  const isMobile = useIsMobile();
  const { isAuthenticated, logout } = useAuthContext();
  const { push } = useRouter();
  const [defaultMDValue, setDefaultMDValue] = useState("");

  const { data, loading } = useFetchWithCache(
    [
      GET_PATHS.GET_PROJECT_DETAIL_OWNERID_ALIAS(
        query.username as string,
        query.alias as string
      ),
    ],
    () =>
      client.getProjectDetailByOwnerIdAndAlias(
        query.username as string,
        query.alias as string
      )
  );

  useEffect(() => {
    if (loading) {
      setDefaultMDValue("");
    }

    setDefaultMDValue(data?.data.project.description || "---");
  }, [data?.data.project.description, loading]);

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

  // const currentAPI = apiReposData.find(
  //   (a) => a.alias === query.alias && a.username === query.username
  // );

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
      render: (value) => (value ? value : 1),
    },
    {
      title: "Input value",
      fixed: "right",
      // eslint-disable-next-line
      render: (value, _record, index) =>
        !value?.size ? (
          <Form>
            <Form.Item
              rules={
                value.type === "object"
                  ? [
                      {
                        pattern: /\\{\s*title.*\\/,
                        message: "Please input accurate object format",
                      },
                    ]
                  : []
              }
              className="!m-0"
            >
              <Input
                type={defineInputType(value.type)}
                id="name-input"
                className="!text-base float-right max-w-[150px] md:max-w-[200px]"
                placeholder={`Input ${value.name}...`}
                onChange={(e) => console.log(value.name, e.target.value)}
              />
            </Form.Item>
          </Form>
        ) : (
          <Form>
            <div className="flex flex-col gap-2">
              {new Array(value.size).fill(1).map((a, i) => (
                <Form.Item
                  key={`${a}${i}`}
                  rules={
                    value.type === "object"
                      ? [
                          {
                            pattern: /\\{\s*title.*\\}/,
                            message: "Please input accurate object format",
                          },
                        ]
                      : []
                  }
                  className="!m-0"
                >
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
    },
  ];

  const dataSource = [
    {
      name: "co2",
      type: "number",
      multipleState: "none",
    },
    {
      name: "o3",
      type: "number",
      multipleState: "array",
      size: 2,
    },
    {
      name: "hasNo3",
      type: "bool",
      multipleState: "none",
    },
    {
      name: "area",
      type: "object",
      multipleState: "none",
    },
  ];

  return (
    <>
      <Head>
        <title>
          {query?.username || "-"}/{data?.data.project.name || "-"} | APIcally
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
                <Col span={24} lg={{ span: 12 }}>
                  <Card className="p-4" shadowSize="sm">
                    <Typography.Title level={3} className="!m-0 !mb-4">
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
                      <Typography.Title level={3} className="!m-0">
                        Output
                      </Typography.Title>
                      <Button
                        label={
                          <CaretRightOutlined className="text-lg absolute top-1.5 left-1.5" />
                        }
                        className="w-[30px] h-[30px] relative block !m-0"
                      />
                    </div>
                    <Card
                      hasShadow={false}
                      className="grow !bg-slate-700 p-4 !h-full"
                    >
                      <code className="text-white">&#123;output&#125;</code>
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
