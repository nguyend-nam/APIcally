import { notification, Table, Tag, Tooltip, Typography } from "antd";
import dynamic from "next/dynamic";
import ReactMarkdown from "react-markdown";
import "react-markdown-editor-lite/lib/index.css";
import { Button } from "../../../components/Button";
import { Layout } from "../../../components/Layout";
import { useDisclosure } from "@dwarvesf/react-hooks";
import { ColumnsType } from "antd/lib/table";
import { useMemo, useState } from "react";
import { useForm } from "antd/lib/form/Form";
import { DefineInput } from "../../../components/page/api-workspace/DefineInput";
import { DeleteFilled } from "@ant-design/icons";
import { multipleStates, variableTypes } from "../../../constants/python";
import { useRouter } from "next/router";
import Head from "next/head";
import { Card } from "../../../components/Card";

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
Code snipet
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
    console.log(text);
  };

  const {
    isOpen: isAddInputDialogOpen,
    onOpen: openAddInputDialog,
    onClose: closeAddInputDialog,
  } = useDisclosure();

  const { push } = useRouter();

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
    console.log();
    return (
      <Card className="p-4" shadowSize="md">
        <Table
          rowKey="name"
          columns={columns}
          dataSource={dataSource}
          scroll={{ x: "max-content" }}
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
        <Typography.Title level={3}>Documentation</Typography.Title>
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
              "full-screen",
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

        <div className="mt-8">
          <div className="flex items-center justify-between w-full mb-4">
            <Typography.Title level={3} className="!m-0">
              Define inputs
            </Typography.Title>

            <Button
              label="Add input"
              className="text-lg py-1 px-2"
              onClick={openAddInputDialog}
            />
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
        </div>

        <Button
          label="Submit"
          onClick={() => {
            setIsLoading(true);
            setTimeout(() => {
              notification.success({
                message: "Algorithm successfully submitted!",
              });
              push("/profile");
            }, 1000);
          }}
          className="text-lg py-1 px-2 mt-8"
          isLoading={isLoading}
        />
      </Layout>
    </>
  );
};

export default DocumentationPage;
