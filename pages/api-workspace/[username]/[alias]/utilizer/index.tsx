import { Col, Form, Row, Table, Tag, Typography } from "antd";
import dynamic from "next/dynamic";
import Head from "next/head";
import { useRouter } from "next/router";
import ReactMarkdown from "react-markdown";
import { Layout } from "../../../../../components/Layout";
import { apiReposData } from "../../../../../constants/mockData";
import { defaultMD } from "../../../documentation";
import { Card } from "../../../../../components/Card";
import { multipleStates, variableTypes } from "../../../../../constants/python";
import { Input } from "../../../../../components/Input";
import { ColumnsType } from "antd/lib/table";
import { useIsMobile } from "../../../../../hooks/useIsMobile";
import { Button } from "../../../../../components/Button";
import { CaretRightOutlined, SearchOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";
import { ROUTES } from "../../../../../constants/routes";

const MdEditor = dynamic(() => import("react-markdown-editor-lite"), {
  ssr: false,
});

const defineInputType = (type: keyof typeof variableTypes) => {
  if (type === "number") return "number";
  if (type === "bool") return "checkbox";
  if (type === "string" || type === "object") return "text";
};

const UtilizerPage = () => {
  const { query, push } = useRouter();
  const isMobile = useIsMobile();

  const currentAPI = apiReposData.find(
    (a) => a.alias === query.alias && a.username === query.username
  );

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

  const [isSSR, setIsSSR] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    setIsSSR(false);
  }, []);

  return (
    !isSSR && (
      <>
        <Head>
          <title>API workspace | APIcally</title>
        </Head>
        <Layout
          extraLeft={
            <div className="mr-0 md:mr-4 mb-4 md:mb-0">
              <Form className="flex items-center">
                <Input
                  borderRadius="bottomLeft"
                  type="text"
                  id="home-search-input"
                  placeholder="Search or jump to..."
                  className="!font-normal !placeholder:font-normal h-8"
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Button
                  borderRadius="right"
                  label={<SearchOutlined />}
                  className="h-8 flex justify-center items-center !p-2"
                  onClick={() => {
                    if (searchQuery) {
                      if (
                        query.status !== undefined &&
                        query.status === "subscribed"
                      ) {
                        push(
                          ROUTES.EXPLORE(searchQuery, {
                            status: "subscribed",
                          })
                        );
                      } else {
                        push(ROUTES.EXPLORE(searchQuery));
                      }
                    }
                  }}
                />
              </Form>
            </div>
          }
        >
          {currentAPI === undefined ? (
            <Typography.Title level={3}>API not found</Typography.Title>
          ) : (
            <>
              <Typography.Title level={2}>
                <span className="font-normal text-2xl md:text-3xl">
                  {currentAPI?.author}/
                </span>
                <span className="text-primary text-2xl md:text-3xl">
                  {currentAPI?.name}
                </span>
              </Typography.Title>

              <Row className="my-8" gutter={[16, 16]}>
                <Col span={24} lg={{ span: 12 }}>
                  <Card className="p-4" shadowSize="md">
                    <Typography.Title level={3} className="!m-0 !mb-4">
                      Provide inputs
                    </Typography.Title>
                    <Card hasShadow={false}>
                      <Table
                        rowKey="name"
                        columns={columns}
                        dataSource={dataSource}
                        scroll={{ x: "max-content" }}
                        pagination={{ hideOnSinglePage: true }}
                      />
                    </Card>
                  </Card>
                </Col>
                <Col span={24} lg={{ span: 12 }}>
                  <Card
                    className="p-4 min-h-[200px] flex flex-col"
                    shadowSize="md"
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
                <MdEditor
                  readOnly
                  view={{ menu: false, md: false, html: true }}
                  style={{ height: 510 }}
                  renderHTML={(text) => <ReactMarkdown source={text} />}
                  defaultValue={defaultMD}
                />
              </div>
            </>
          )}
        </Layout>
      </>
    )
  );
};

export default UtilizerPage;
