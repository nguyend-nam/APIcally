import { Col, notification, Row, Table, Tag, Tooltip, Typography } from "antd";
import dynamic from "next/dynamic";
import ReactMarkdown from "react-markdown";
import "react-markdown-editor-lite/lib/index.css";
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

const MdEditor = dynamic(() => import("react-markdown-editor-lite"), {
  ssr: false,
});

export const defaultMD = `# API's documentation
---
> Block quote

## Heading 2
- list item 1
- list item 2

\`\`\`
Code snippet
\`\`\`

![](https://picsum.photos/536/354)
`;

export type dataSourceType = {
  name: string;
  type: string;
  multipleState: string;
  size?: number;
};

const DocumentationPage = () => {
  const [dataSource, setDataSource] = useState<dataSourceType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleEditorChange = ({ text }: { text: string }) => {
    console.log(text); // TODO: update content for API project update
  };

  const {
    isOpen: isAddInputDialogOpen,
    onOpen: openAddInputDialog,
    onClose: closeAddInputDialog,
  } = useDisclosure();

  const { push, query, isReady } = useRouter();

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

      <Layout>
        <Typography.Title level={3} className="!text-xl md:!text-2xl">
          Documentation
        </Typography.Title>
        <div className="border-primary border-t-4">
          <MdEditor
            plugins={[
              "header",
              "font-bold",
              "font-italic",
              "list-unordered",
              "block-quote",
              "link",
              "image",
              "block-code-inline",
              "block-code-block",
              "mode-toggle",
            ]}
            style={{ height: 510 }}
            renderHTML={(text) => <ReactMarkdown source={text} />}
            onChange={handleEditorChange}
            defaultValue={defaultMD}
          />
        </div>

        <Row className="mt-8">
          <Col span={24}>
            <div className="flex items-center justify-between w-full mb-4">
              <Typography.Title
                level={3}
                className="!m-0 !text-xl md:!text-2xl"
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
    </>
  );
};

export default DocumentationPage;
