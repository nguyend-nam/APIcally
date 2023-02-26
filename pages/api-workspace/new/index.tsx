import { Avatar, Col, Divider, Row, Typography, Form, Tooltip } from "antd";
import "react-markdown-editor-lite/lib/index.css";
import { Button } from "../../../components/Button";
import { Layout } from "../../../components/Layout";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { Card } from "../../../components/Card";
import { Input } from "../../../components/Input";
import TextArea from "antd/lib/input/TextArea";
import { checkInvalidFileNameFormat } from "../../../utils";
import { ROUTES } from "../../../constants/routes";
import { UserOutlined } from "@ant-design/icons";
import { truncate } from "@dwarvesf/react-utils";

export const CREATE_API_NAME_KEY = "apically-create-api-name";

const APICreatePage = () => {
  const { push } = useRouter();

  const [APIName, setAPIName] = useState<string>();
  const [APIDescription, setAPIDescription] = useState<string>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSSR, setIsSSR] = useState<boolean>(true);

  useEffect(() => {
    setIsSSR(false);
  }, []);

  return (
    !isSSR && (
      <>
        <Head>
          <title>API workspace | APIcally</title>
        </Head>

        <Layout>
          <Card className="max-w-xl m-auto p-4">
            <Typography.Title level={4} className="!text-slate-600">
              Create API
            </Typography.Title>

            <Divider className="!my-4" />
            <Form>
              <Row gutter={[16, 16]} className="mb-4">
                <Col span={24} md={{ span: 8 }}>
                  <div>
                    <Typography.Title level={5}>Owner</Typography.Title>
                    <div className="flex items-center gap-2">
                      <Avatar
                        icon={<UserOutlined size={64} />}
                        className="shrink-0"
                      />
                      <div className="text-base !text-slate-500 hidden md:block mr-2 py-1 px-1.5 rounded-md bg-slate-100 whitespace-nowrap">
                        <Tooltip title="nguyend-nam" placement="bottom">
                          {truncate("nguyend-nam", 10)}
                        </Tooltip>
                      </div>
                      <div className="text-base !text-slate-500 block md:hidden mr-0 py-1 px-1.5 rounded-md bg-slate-100 w-screen overflow-auto whitespace-nowrap">
                        nguyend-nam
                      </div>
                      <div className="hidden md:block">/</div>
                    </div>
                  </div>
                </Col>

                <Col span={24} md={{ span: 16 }}>
                  <Typography.Title
                    level={5}
                    className='after:content-["*"] after:ml-1 after:text-red-500'
                  >
                    API name
                  </Typography.Title>
                  <Input
                    type="text"
                    id="api-name-input"
                    placeholder="Enter API name..."
                    className="!text-base"
                    onChange={(v) => setAPIName(v.target.value)}
                  />
                  <div className="text-sm mt-1 text-slate-400">
                    API name should not contain special characters
                  </div>
                </Col>

                <Col span={24}>
                  <Typography.Title level={5}>Description</Typography.Title>
                  <TextArea
                    id="api-description-input"
                    placeholder="Enter API description..."
                    rows={2}
                    className="!text-base placeholder:!text-gray-400 !bg-slate-100 !border-none !px-2 !py-1 !outline-none !w-full !rounded-r-md !rounded-bl-md"
                    onChange={(v) => setAPIDescription(v.target.value)}
                  />
                </Col>
              </Row>

              <Button
                disabled={
                  !APIName ||
                  checkInvalidFileNameFormat(APIName) ||
                  APIName.includes(".")
                }
                isLoading={isLoading}
                label="Create"
                onClick={() => {
                  console.log(APIName, APIDescription);
                  if (APIName && window) {
                    window.localStorage.setItem(CREATE_API_NAME_KEY, APIName);
                  }
                  setIsLoading(true);
                  setTimeout(
                    () => push(ROUTES.API_WORKSPACE_CODE_EDITOR),
                    1000
                  );
                }}
              />
            </Form>
          </Card>
        </Layout>
      </>
    )
  );
};

export default APICreatePage;
