import {
  Avatar,
  Col,
  Divider,
  Row,
  Typography,
  Form,
  Tooltip,
  notification,
  Slider,
} from "antd";
import "react-markdown-editor-lite/lib/index.css";
import { Button } from "../../../components/Button";
import { Layout } from "../../../components/Layout";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { Card } from "../../../components/Card";
import { Input } from "../../../components/Input";
import TextArea from "antd/lib/input/TextArea";
import { isAPINameFormatValid } from "../../../utils";
import { ROUTES } from "../../../constants/routes";
import { UserOutlined } from "@ant-design/icons";
import { truncate } from "@dwarvesf/react-utils";
import { client, GetAllProjectsParams } from "../../../libs/api";
import { Alert } from "../../../components/Alert";
import {
  FULL_PRICE_FILTER,
  REQUEST_PRICE_RANGE,
} from "../../../constants/filter";
import { APICALLY_KEY, useAuthContext } from "../../../context/auth";

export const CREATE_API_NAME_KEY = "apically-create-api-name";

const APICreatePage = () => {
  const { push, replace } = useRouter();
  const [subscribeFee, setSubscribeFee] = useState<number>(
    FULL_PRICE_FILTER[0]
  );
  const { user, isAuthenticated, logout } = useAuthContext();
  const [requestFee, setRequestFee] = useState<number>(REQUEST_PRICE_RANGE[0]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

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

  const onSubmit = async (values: GetAllProjectsParams) => {
    if (!isAPINameFormatValid(values.alias)) {
      notification.error({
        message: "API name should not contain special characters",
      });
    } else {
      const transformedValues: GetAllProjectsParams = {
        ...values,
        description:
          !values.description || values.description === ""
            ? "-"
            : values.description,
        documentation: "-",
        input: "-",
        subscribeCost: subscribeFee,
        costPerRequest: requestFee,
      };

      console.log(transformedValues);

      try {
        setIsLoading(true);
        const data = await client.createProject(transformedValues);

        if (data) {
          if (data.code === 200) {
            notification.success({ message: "API created successfully" });
            push(
              ROUTES.API_WORKSPACE_CODE_EDITOR(
                user?.name || "-",
                transformedValues.alias
              )
            );
          }
        }
      } catch (error: any) {
        notification.error({
          message: error.message || "Could not create API",
        });
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <>
      <Head>
        <title>API workspace | APIcally</title>
      </Head>

      {isAuthenticated ? (
        <Layout>
          <Card className="max-w-xl m-auto p-4" shadowSize="md">
            <Typography.Title level={4} className="!text-slate-600">
              Create API
            </Typography.Title>

            <Divider className="!my-4" />
            <Form onFinish={(values: GetAllProjectsParams) => onSubmit(values)}>
              <Row gutter={[24, 0]} className="mb-6">
                <Col span={24} md={{ span: 8 }} className="mb-6">
                  <div>
                    <Typography.Title
                      level={5}
                      className="!text-lg !font-medium !mb-0"
                    >
                      Owner
                    </Typography.Title>
                    <div className="flex items-center gap-2">
                      <Avatar
                        icon={<UserOutlined size={64} />}
                        className="shrink-0 !bg-slate-300"
                      />
                      <div className="text-base !text-slate-500 hidden md:block mr-2 py-1 px-1.5 rounded-md bg-slate-100 whitespace-nowrap">
                        <Tooltip
                          title={user?.name || "nguyend-nam"}
                          placement="bottom"
                        >
                          {user?.name
                            ? truncate(user?.name, 10)
                            : "nguyend-nam"}
                        </Tooltip>
                      </div>
                      <div className="text-base !text-slate-500 block md:hidden mr-0 py-1 px-1.5 rounded-md bg-slate-100 w-screen overflow-auto whitespace-nowrap">
                        {user?.name || "nguyend-nam"}
                      </div>
                      <div className="hidden md:block">/</div>
                    </div>
                  </div>
                </Col>

                <Col span={24} md={{ span: 16 }}>
                  <label
                    className='after:content-["*"] after:ml-1 after:text-red-500 !text-lg font-medium'
                    htmlFor="api-name-input"
                  >
                    API alias
                  </label>
                  <Form.Item
                    name="alias"
                    rules={[{ required: true, message: "Required" }]}
                  >
                    <Input
                      type="text"
                      id="api-name-input"
                      placeholder="Enter API alias..."
                      className="!text-base"
                    />
                  </Form.Item>
                </Col>

                <Col span={24}>
                  <label
                    className='after:content-["*"] after:ml-1 after:text-red-500 !text-lg font-medium'
                    htmlFor="api-display-name-input"
                  >
                    API name
                  </label>
                  <Form.Item
                    name="name"
                    rules={[{ required: true, message: "Required" }]}
                  >
                    <Input
                      type="text"
                      id="api-display-name-input"
                      placeholder="Enter API display name..."
                      className="!text-base"
                    />
                  </Form.Item>
                </Col>

                <Col span={24}>
                  <label
                    className="!text-lg font-medium"
                    htmlFor="api-description-input"
                  >
                    Description
                  </label>
                  <Form.Item name="description">
                    <TextArea
                      id="api-description-input"
                      placeholder="Enter API description..."
                      rows={2}
                      className="!text-base placeholder:!text-gray-400 !bg-slate-100 !border-none !px-2 !py-1 !outline-none !w-full !rounded-r-md !rounded-bl-md"
                    />
                  </Form.Item>
                </Col>

                <Col span={24} md={{ span: 12 }} className="mb-6">
                  <label
                    className="!m-0 !text-lg font-medium"
                    htmlFor="api-price-input"
                  >
                    Subscribe fee (per day)
                  </label>
                  <div className="mb-4">
                    <Slider
                      value={subscribeFee}
                      max={FULL_PRICE_FILTER[1]}
                      min={FULL_PRICE_FILTER[0]}
                      onChange={setSubscribeFee}
                      step={0.05}
                    />
                  </div>

                  <div className="flex gap-2 items-center w-full">
                    <Input
                      id="api-price-input"
                      type="number"
                      step={0.05}
                      min={FULL_PRICE_FILTER[0]}
                      max={FULL_PRICE_FILTER[1]}
                      value={subscribeFee}
                      className="!text-base"
                      fullWidth
                      onChange={(e) => {
                        const newRangeValue = Number(e.target?.value || 0);
                        setSubscribeFee(newRangeValue);
                      }}
                    />
                    <span className="text-base">$</span>
                  </div>
                </Col>

                <Col span={24} md={{ span: 12 }} className="mb-6">
                  <label
                    className="!m-0 !text-lg font-medium"
                    htmlFor="api-request-price-input"
                  >
                    Execute fee (per request)
                  </label>
                  <div className="mb-4">
                    <Slider
                      value={requestFee}
                      min={REQUEST_PRICE_RANGE[0]}
                      max={REQUEST_PRICE_RANGE[1]}
                      onChange={setRequestFee}
                      step={0.05}
                    />
                  </div>

                  <div className="flex gap-2 items-center w-full">
                    <Input
                      id="api-request-price-input"
                      type="number"
                      step={0.05}
                      min={REQUEST_PRICE_RANGE[0]}
                      max={REQUEST_PRICE_RANGE[1]}
                      value={requestFee}
                      className="!text-base"
                      fullWidth
                      onChange={(e) => {
                        const newValue = Number(e.target?.value || 0);
                        setRequestFee(newValue);
                      }}
                    />
                    <span className="text-base">$</span>
                  </div>
                </Col>

                <Col span={24}>
                  <Alert
                    type="info"
                    message={
                      <>
                        Please provide the daily subscribe fee and execute fee
                        in <b>USD</b>, input 0 to let other users subscribe for
                        free. At the moment we only allow the maximum subscribe
                        fee of <b>${FULL_PRICE_FILTER[1]}</b>.
                      </>
                    }
                  />

                  <Alert
                    type="alert"
                    message="Subscribe fee cannot be edited at the moment. Please consider carefully."
                    className="mt-4"
                  />
                </Col>
              </Row>

              <Button isLoading={isLoading} label="Create" type="submit" />
            </Form>
          </Card>
        </Layout>
      ) : null}
    </>
  );
};

export default APICreatePage;
