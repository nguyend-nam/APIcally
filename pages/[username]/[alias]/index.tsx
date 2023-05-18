import {
  Col,
  Divider,
  // Form,
  // Modal,
  notification,
  // Radio,
  Row,
  // Select,
  Spin,
  Tooltip,
  Typography,
} from "antd";
import dynamic from "next/dynamic";
import Head from "next/head";
import { useRouter } from "next/router";
import ReactMarkdown from "react-markdown";
import { Button } from "../../../components/Button";
import { Layout } from "../../../components/Layout";
import { ApiRepo } from "../../../components/page/home/ApiRepo";
import {
  apiReposData,
  apiReposInCart,
  chartData,
} from "../../../constants/mockData";
import { defaultMD } from "../../api-workspace/documentation";
import { Card } from "../../../components/Card";
import { CheckCircleOutlined, InfoCircleOutlined } from "@ant-design/icons";
import { useMemo, useState } from "react";
// import { useDisclosure } from "@dwarvesf/react-hooks";
// import { Input } from "../../../../components/Input";
// import { Text } from "../../../../components/Text";
import { ROUTES } from "../../../constants/routes";
import { apiRepoType } from "../../explore";
import { useAuthContext } from "../../../context/auth";
import { CartesianAxisProps, TooltipProps } from "recharts";
import { LineChart } from "../../../components/LineChart";
import StarRating from "react-svg-star-rating";
import { client } from "../../../libs/api";

const CustomAxisTick = ({
  x,
  y,
  payload,
  dy,
  dx,
}: CartesianAxisProps & {
  payload?: any;
}) => {
  return (
    <g
      transform={`translate(${x},${y})`}
      style={{
        fontWeight: 400,
        fontSize: 13,
      }}
    >
      <text
        role="button"
        x={0}
        y={0}
        dy={dy}
        dx={dx}
        textAnchor="middle"
        fill="#555"
        style={{ fontWeight: 400 }}
      >
        {payload.value}
      </text>
    </g>
  );
};

const CustomTooltip = (record: TooltipProps<any, any>) => {
  if (record.active && record.payload?.length) {
    return (
      <Card shadowSize="md">
        <div className="p-3 pb-2">
          <strong>{record.label}</strong>
        </div>
        <Divider className="!m-0" />
        <div className="p-3 pt-2">
          {record.payload.map((item) => {
            return (
              <span key={item.dataKey}>
                <span>Utilizations count: </span>
                {item.payload.trend === null ? (
                  <strong>{item?.value}</strong>
                ) : (
                  <>
                    <strong>{item?.value}</strong>{" "}
                  </>
                )}
              </span>
            );
          })}
        </div>
      </Card>
    );
  }

  return null;
};

const MdEditor = dynamic(() => import("react-markdown-editor-lite"), {
  ssr: false,
});

const APIDetailPage = () => {
  const { query, push } = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  const [currRating, setCurrRating] = useState(0);
  const [isRateSubmitting, setIsRateSubmitting] = useState(false);

  const [isSubscribed] = useState(false);
  const { isAuthenticated } = useAuthContext();

  const currentAPI = apiReposData.find(
    (a) => a.alias === query.alias && a.ownerId === query.username
  );

  const allAddedToCartApisRepos = useMemo(() => {
    let arr: apiRepoType[] = [];
    apiReposInCart.forEach((r) => {
      arr = [...arr, ...r.apis];
    });

    return arr;
  }, []);

  const allAddedToCartApisId = useMemo(() => {
    return allAddedToCartApisRepos.map((a) => a.id);
  }, [allAddedToCartApisRepos]);

  // const {
  //   isOpen: isSubscribeDialogOpen,
  //   onOpen: openSubscribeDialog,
  //   onClose: closeSubscribeDialog,
  // } = useDisclosure();

  const onRatingSubmit = async () => {
    try {
      setIsRateSubmitting(true);
      const res = await client.rateProject(
        query.ownerId as string,
        query.alias as string,
        { stars: currRating }
      );
      if (res?.data) {
        notification.success({
          message: "Rating submitted successfully",
        });
      }
    } catch (error: any) {
      notification.error({
        message: String(error) || "Could not submit rating",
      });
    } finally {
      setIsRateSubmitting(false);
    }
  };

  const onAddToCart = () => {
    setIsAddingToCart(true);
    setTimeout(() => {
      notification.success({ message: "API added to cart!" });
      setIsAddingToCart(false);
    }, 1000);
  };

  return (
    <>
      <Head>
        <title>
          {currentAPI?.ownerId}/{currentAPI?.name} | APIcally
        </title>
      </Head>

      <Layout hasSearch pageTitle={currentAPI?.ownerId || "-"}>
        {currentAPI === undefined ? (
          <Typography.Title level={3}>API not found</Typography.Title>
        ) : (
          <>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <Typography.Title level={2} className="!m-0 shrink-0">
                <button
                  onClick={() => {
                    if (currentAPI.ownerId) {
                      push(ROUTES.PROFILE_OTHER_USER(currentAPI.ownerId));
                    }
                  }}
                  className="font-normal text-2xl no-underline !text-black"
                >
                  {currentAPI?.ownerId}/
                </button>
                <span className="text-primary text-2xl !font-semibold">
                  {currentAPI?.name}
                </span>
              </Typography.Title>

              {isAuthenticated ? (
                <div className="w-full flex items-center gap-2">
                  <div className="relative w-full">
                    <div className="!m-0 w-[120px] h-max -rotate-90 flex justify-center items-center absolute !right-0 !-bottom-[60px]">
                      <StarRating
                        handleOnClick={(rating) => setCurrRating(rating)}
                        starClassName="rotate-90"
                        size={24}
                      />
                    </div>
                  </div>
                  <Button
                    disabled={currRating === 0 || isRateSubmitting}
                    className="!p-0 !text-sm !ring-none !bg-transparent !text-slate-700"
                    label={
                      <Card className="flex items-center" shadowSize="sm">
                        <div className="border-l px-2 py-1">Submit</div>
                      </Card>
                    }
                    onClick={onRatingSubmit}
                  />
                </div>
              ) : null}
            </div>
            <Row className="my-6 md:my-8" gutter={[16, 16]}>
              <Col span={24} md={{ span: 16 }}>
                <ApiRepo
                  data={currentAPI}
                  isLinkActive={false}
                  isDescriptionTruncated={false}
                />
              </Col>
              {isAuthenticated ? (
                <Col span={24} md={{ span: 8 }}>
                  <Card
                    className="p-4 h-full bg-cover bg-right"
                    shadowSize="sm"
                    style={{
                      backgroundImage: `url(/img/api-status-bg.png)`,
                    }}
                  >
                    {/* {currentAPI?.subscribeStatus ? ( */}
                    {isSubscribed ? (
                      <Spin spinning={isLoading}>
                        <div className="flex justify-between !items-start">
                          <Typography.Text className="text-lg !m-0 !text-gray-600">
                            You{" "}
                            {currentAPI.ownerId === "nguyend-nam"
                              ? "owned"
                              : "already subscribed to"}{" "}
                            this API
                          </Typography.Text>
                          <CheckCircleOutlined className="!text-success text-lg mr-1 mt-[5px]" />
                        </div>
                        <div className="flex gap-2 flex-wrap mt-4">
                          <Button
                            label="Start using"
                            onClick={() => {
                              setIsLoading(!isLoading);
                              setTimeout(() => {
                                if (currentAPI.ownerId && currentAPI.alias)
                                  push(
                                    ROUTES.API_WORKSPACE_API_DETAIL_UTILIZER(
                                      currentAPI.ownerId,
                                      currentAPI.alias
                                    )
                                  );
                              }, 1000);
                            }}
                          />
                        </div>
                      </Spin>
                    ) : (
                      <div className="h-full flex flex-col justify-between">
                        <div className="flex justify-between !items-start">
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
                            className="mt-1.5 flex flex-col justify-center !p-0"
                          />
                        </div>
                        <div className="mt-4">
                          <Button
                            label={
                              allAddedToCartApisId.includes(currentAPI.id)
                                ? "API added to cart"
                                : "Add to cart"
                            }
                            isLoading={isAddingToCart}
                            onClick={() => {
                              if (
                                allAddedToCartApisId.includes(currentAPI.id)
                              ) {
                                push(ROUTES.CART);
                              } else {
                                onAddToCart();
                              }
                            }}
                          />
                        </div>
                      </div>
                    )}
                  </Card>
                </Col>
              ) : (
                <Col span={24} md={{ span: 8 }}>
                  <Card
                    className="p-4 h-full bg-cover bg-right"
                    shadowSize="sm"
                    style={{
                      backgroundImage: `url(/img/api-status-bg.png)`,
                    }}
                  >
                    <div className="h-full flex flex-col justify-between">
                      <div className="flex justify-between !items-start">
                        <Typography.Text className="text-lg !m-0 !text-gray-600">
                          Please login first to be able to subscribe to this API
                        </Typography.Text>
                      </div>
                      <div className="mt-4">
                        <Button
                          label="Login"
                          isLoading={isAddingToCart}
                          onClick={() => {
                            push(ROUTES.LOGIN);
                          }}
                        />
                      </div>
                    </div>
                  </Card>
                </Col>
              )}
            </Row>

            <Typography.Title level={3}>Utilizations Count</Typography.Title>
            <Card
              className="px-2 py-4 md:px-4 md:py-6 mb-6 md:mb-8 overflow-auto"
              shadowSize="sm"
            >
              <LineChart
                width="100%"
                height={200}
                minWidth={600}
                dataset={chartData}
                lineDataKeys="usage"
                xAxisDataKey="date"
                xAxisTick={<CustomAxisTick dy={16} />}
                yAxisTick={<CustomAxisTick dy={5} dx={-5} />}
                customToolTip={<CustomTooltip />}
              />
            </Card>

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
      {/* {isSubscribeDialogOpen && (
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
              <label htmlFor="card-input" className="text-lg text-primary mr-4">
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
              <label htmlFor="city-input" className="text-lg text-primary mr-4">
                City
              </label>
            </Col>

            <Col span={12}>
              <label htmlFor="code-input" className="text-lg text-primary mr-4">
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
              <label htmlFor="bank-input" className="text-lg text-primary mr-4">
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
      )} */}
    </>
  );
};

export default APIDetailPage;
