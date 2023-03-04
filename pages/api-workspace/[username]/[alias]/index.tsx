import {
  Col,
  Form,
  Modal,
  Radio,
  Row,
  Select,
  Spin,
  Tooltip,
  Typography,
} from "antd";
import dynamic from "next/dynamic";
import Head from "next/head";
import { useRouter } from "next/router";
import ReactMarkdown from "react-markdown";
import { Button } from "../../../../components/Button";
import { Layout } from "../../../../components/Layout";
import { ApiRepo } from "../../../../components/page/home/ApiRepo";
import { apiReposData } from "../../../../constants/mockData";
import { defaultMD } from "../../documentation";
import { Card } from "../../../../components/Card";
import {
  CheckCircleOutlined,
  InfoCircleOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useDisclosure } from "@dwarvesf/react-hooks";
import { Input } from "../../../../components/Input";
import { Text } from "../../../../components/Text";
import { ROUTES } from "../../../../constants/routes";

const MdEditor = dynamic(() => import("react-markdown-editor-lite"), {
  ssr: false,
});

const APIDetailPage = () => {
  const { query, push } = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const currentAPI = apiReposData.find(
    (a) => a.alias === query.alias && a.username === query.username
  );

  const {
    isOpen: isSubscribeDialogOpen,
    onOpen: openSubscribeDialog,
    onClose: closeSubscribeDialog,
  } = useDisclosure();

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
                <Col span={24} md={{ span: 16 }}>
                  <ApiRepo data={currentAPI} />
                </Col>
                {currentAPI.subscribeStatus ? (
                  <Col span={24} md={{ span: 8 }}>
                    <Card className="p-4 h-full" shadowSize="md">
                      <Spin spinning={isLoading}>
                        <div className="flex items-center">
                          <CheckCircleOutlined className="!text-success text-lg mr-1" />
                          <Typography.Text className="text-lg !m-0 !text-gray-600">
                            You already subscribed to this API
                          </Typography.Text>
                        </div>
                        <div className="flex gap-2 flex-wrap">
                          <Button appearance="outline" label="Unsubscribe" />
                          <Button
                            label="Start using"
                            onClick={() => {
                              setIsLoading(!isLoading);
                              setTimeout(() => {
                                if (currentAPI.username && currentAPI.alias)
                                  push(
                                    ROUTES.API_WORKSPACE_API_DETAIL_UTILIZER(
                                      currentAPI.username,
                                      currentAPI.alias
                                    )
                                  );
                              }, 1000);
                            }}
                          />
                        </div>
                      </Spin>
                    </Card>
                  </Col>
                ) : (
                  <Col span={24} md={{ span: 8 }}>
                    <Card
                      className="p-4 h-full flex flex-col justify-between"
                      shadowSize="md"
                    >
                      <div className="flex justify-between align-middle">
                        <Typography.Text className="text-lg !m-0 !text-gray-600">
                          You haven&rsquo;t subscribed to this API yet
                        </Typography.Text>
                        <Button
                          appearance="link"
                          label={
                            <Tooltip
                              title="You must subscribe to the API to use it"
                              placement="left"
                            >
                              <InfoCircleOutlined />
                            </Tooltip>
                          }
                          className="h-full flex flex-col justify-center !p-0"
                        />
                      </div>
                      <div className="mt-4">
                        <Button
                          label="Subscribe"
                          onClick={openSubscribeDialog}
                        />
                      </div>
                    </Card>
                  </Col>
                )}
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
        {isSubscribeDialogOpen && (
          <Modal
            open={isSubscribeDialogOpen}
            onCancel={closeSubscribeDialog}
            footer={[
              <Button
                key="cancel"
                appearance="outline"
                label="Cancel"
                onClick={closeSubscribeDialog}
                className="mr-2"
              />,
              <Button
                key="subscribe"
                label="Subscribe"
                onClick={() => undefined}
              />,
            ]}
            centered
          >
            <Text as="h2" className="text-lg">
              Enter payment detail
            </Text>
            <Row className="flex items-center" gutter={[12, 0]}>
              <Col span={24}>
                <label
                  htmlFor="card-input"
                  className="text-lg text-primary mr-4"
                >
                  Card number
                </label>
              </Col>
              <Col span={24}>
                <Form.Item name="card" className="!m-0">
                  <Input
                    type="text"
                    id="card-input"
                    placeholder="Enter card number..."
                    className="mt-1 mb-4"
                  />
                </Form.Item>
              </Col>

              <Col span={24}>
                <label
                  htmlFor="address-input"
                  className="text-lg text-primary mr-4"
                >
                  Address
                </label>
              </Col>
              <Col span={24}>
                <Form.Item name="address" className="!m-0">
                  <Input
                    type="text"
                    id="address-input"
                    placeholder="Enter address..."
                    className="mb-4"
                  />
                </Form.Item>
              </Col>

              <Col span={24}>
                <label
                  htmlFor="country-input"
                  className="text-lg text-primary mr-4"
                >
                  Country
                </label>
              </Col>
              <Col span={24}>
                <Form.Item name="country" className="!m-0 !mb-4">
                  <Select
                    style={{ width: "100%" }}
                    placeholder="Select country..."
                    defaultValue="vietnam"
                    options={[
                      { value: "vietnam", label: "Vietnam" },
                      { value: "us", label: "United State" },
                    ]}
                  />
                </Form.Item>
              </Col>

              <Col span={12}>
                <label
                  htmlFor="city-input"
                  className="text-lg text-primary mr-4"
                >
                  City
                </label>
              </Col>

              <Col span={12}>
                <label
                  htmlFor="code-input"
                  className="text-lg text-primary mr-4"
                >
                  Zip code
                </label>
              </Col>

              <Col span={12}>
                <Form.Item name="city" className="!m-0 !mb-4">
                  <Select
                    style={{ width: "100%" }}
                    placeholder="Select city..."
                    options={[]}
                  />
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item name="code" className="!m-0 !mb-4">
                  <Input
                    type="text"
                    id="code-input"
                    placeholder="Enter zip code..."
                  />
                </Form.Item>
              </Col>

              <Col span={24}>
                <label
                  htmlFor="bank-input"
                  className="text-lg text-primary mr-4"
                >
                  Bank
                </label>
              </Col>

              <Col span={24}>
                <Form.Item name="bank" className="!m-0">
                  <Select
                    style={{ width: "100%" }}
                    placeholder="Select bank..."
                    options={[]}
                  />
                </Form.Item>
              </Col>
            </Row>

            <Text as="h2" className="text-lg mt-4">
              Choose plan
            </Text>
            <Radio.Group value="annually">
              <Radio value="annually" className="!text-lg">
                Annually
              </Radio>
              <Radio value="monthly" className="!text-lg">
                Monthly
              </Radio>
            </Radio.Group>
          </Modal>
        )}
      </>
    )
  );
};

export default APIDetailPage;
