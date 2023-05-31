import {
  Col,
  notification,
  Row,
  Spin,
  Table,
  Tag,
  Tooltip,
  Typography,
} from "antd";
import dynamic from "next/dynamic";
import { Button } from "../../../components/Button";
import { Layout } from "../../../components/Layout";
import { useDisclosure } from "@dwarvesf/react-hooks";
import { ColumnsType } from "antd/lib/table";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "antd/lib/form/Form";
import { DefineInput } from "../../../components/page/api-workspace/DefineInput";
import { DeleteFilled } from "@ant-design/icons";
import { variableTypes } from "../../../constants/python";
import { useRouter } from "next/router";
import Head from "next/head";
import { Card } from "../../../components/Card";
import { ROUTES } from "../../../constants/routes";
// import { CREATE_API_NAME_KEY } from "../new";
// import { isAPINameFormatValid } from "../../../utils";
import { useFetchWithCache } from "../../../hooks/useFetchWithCache";
import { client, GET_PATHS } from "../../../libs/api";
import { APICALLY_KEY, useAuthContext } from "../../../context/auth";
import { ReactQuillProps } from "react-quill";
import { editorModules } from "../../../constants/editor";
import { CreateProjectRequest } from "../../../libs/types";

const ReactQuill = dynamic<ReactQuillProps>(
  () => import("react-quill").then((mod) => mod),
  { ssr: false }
);

export const defaultMD =
  "<h1>API's documentation</h1><blockquote>Block quote</blockquote><p><br></p><h2>Heading 2</h2><ul><li>list item 1</li><li>list item 2</li></ul><p><br></p><p><pre class='ql-syntax' spellcheck='false'>Code snippet</pre></p><p><img src='https://picsum.photos/536/354'/></p>";

export type dataSourceType = {
  name: string;
  type: string;
};

const DocumentationPage = () => {
  const [dataSource, setDataSource] = useState<dataSourceType[]>([]);
  const [dataSourceStr, setDataSourceStr] = useState<string>("");
  const [mDValue, setMDValue] = useState(defaultMD);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    isOpen: isAddInputDialogOpen,
    onOpen: openAddInputDialog,
    onClose: closeAddInputDialog,
  } = useDisclosure();

  const { push, query, replace } = useRouter();
  const { isAuthenticated, logout, user } = useAuthContext();

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

  useEffect(() => {
    if (!loading) {
      if (data?.data?.project?.input && data?.data?.project?.input !== "-") {
        const parsed = JSON.parse(data?.data?.project?.input);

        const dataSourceValue: dataSourceType[] = [];

        Object.entries(parsed).map((value) => {
          dataSourceValue.push({
            name: value[0] as string,
            type: value[1] as string,
          } as dataSourceType);
        });

        setDataSource(dataSourceValue);
      }
    }
  }, [data?.data?.project?.input, loading]);

  useEffect(() => {
    if (!loading) {
      if (
        data?.data?.project?.documentation &&
        data?.data?.project?.documentation !== "-"
      ) {
        setMDValue(data?.data?.project?.documentation);
      }
    }
  }, [data?.data?.project?.documentation, loading]);

  useEffect(() => {
    if (dataSource.length) {
      const checkedValuesObj: Record<string, string> = {};
      dataSource.forEach((data) => {
        checkedValuesObj[data.name] = data.type;
      });

      setDataSourceStr(JSON.stringify(checkedValuesObj));
    }
  }, [dataSource]);

  const [form] = useForm();

  const onSubmit = async (alias: string) => {
    try {
      setIsLoading(true);

      const transformedValues: Partial<CreateProjectRequest> = {
        documentation: mDValue,
        input: dataSourceStr,
      };

      const res = await client.updateProject(alias, transformedValues);

      if (res?.data) {
        notification.success({ message: "API updated successfully" });
        await mutate();
        push(ROUTES.API_WORKSPACE_API_DETAIL(user?.username || "-", alias));
      } else {
        notification.error({
          message: res?.message || "Could update create API",
        });
      }
    } catch (error: any) {
      notification.error({
        message: error.message || "Could update create API",
      });
    } finally {
      setIsLoading(false);
    }
  };

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
    // {
    //   title: "Multiple state",
    //   key: "multipleState",
    //   dataIndex: "multipleState",
    //   render: (type: keyof typeof multipleStates) => (
    //     <Tag>{multipleStates[type]}</Tag>
    //   ),
    // },
    // {
    //   title: "Size",
    //   key: "size",
    //   dataIndex: "size",
    // },
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

  if (loading) {
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
              onSubmit(query.alias as string);
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
