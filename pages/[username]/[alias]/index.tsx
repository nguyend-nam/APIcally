import {
  Col,
  // Form,
  Modal,
  notification,
  Radio,
  Row,
  // Select,
  Spin,
  Tooltip,
  Typography,
} from "antd";
import dynamic from "next/dynamic";
import Head from "next/head";
import { useRouter } from "next/router";
import { Button } from "../../../components/Button";
import { Layout } from "../../../components/Layout";
import { ApiRepo } from "../../../components/page/home/ApiRepo";
import { Card } from "../../../components/Card";
import { CheckCircleOutlined, InfoCircleOutlined } from "@ant-design/icons";
import { useEffect, useMemo, useState } from "react";
import { useDisclosure } from "@dwarvesf/react-hooks";
// import { Input } from "../../../../components/Input";
import { Text } from "../../../components/Text";
import { ROUTES } from "../../../constants/routes";
import { apiRepoType } from "../../explore";
import { useAuthContext } from "../../../context/auth";
import StarRating from "react-svg-star-rating";
import { client, GET_PATHS } from "../../../libs/api";
import { useFetchWithCache } from "../../../hooks/useFetchWithCache";
import { ReactQuillProps } from "react-quill";
import { editorModules } from "../../../constants/editor";
import { subscriptionPlans } from "../../../constants/subscription";
import cx from "classnames";
import dayjs from "dayjs";
import { ProjectSubscriber } from "../../../components/page/api-workspace/ProjectSubscriber";

const ReactQuill = dynamic<ReactQuillProps>(
  () => import("react-quill").then((mod) => mod),
  { ssr: false }
);

const APIDetailPage = () => {
  const { query, push } = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  const [currRating, setCurrRating] = useState(0);
  const [isRateSubmitting, setIsRateSubmitting] = useState(false);

  const [subsPlan, setSubsPlan] = useState(1);

  const { isAuthenticated, user } = useAuthContext();
  const [defaultMDValue, setDefaultMDValue] = useState("");

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
    if (loading) {
      setDefaultMDValue("");
    }

    setDefaultMDValue(data?.data.project.documentation || "---");
  }, [data?.data.project.documentation, loading]);

  const {
    isOpen: isSubscribeDialogOpen,
    onOpen: openSubscribeDialog,
    onClose: closeSubscribeDialog,
  } = useDisclosure();

  const onRatingSubmit = async () => {
    try {
      setIsRateSubmitting(true);
      const res = await client.rateProject(
        query.username as string,
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
      setCurrRating(0);
      await mutate();
      setIsRateSubmitting(false);
    }
  };

  const onAddToCart = async () => {
    try {
      setIsAddingToCart(true);
      const res = await client.addProjectToCart(
        query.username as string,
        query.alias as string,
        subsPlan
      );
      if (res?.data) {
        await mutate();
        notification.success({
          message: "API added to cart!",
        });
        closeSubscribeDialog();
      }
      // await login(values.username, values.password);
    } catch (error) {
      notification.error({
        message: "Could not add API to cart",
      });
    } finally {
      setIsAddingToCart(false);
    }
  };

  const isSubscriptionExpired = useMemo(() => {
    if (!isAuthenticated || loading) {
      return false;
    }

    const subsExpiry = new Date(data?.data?.expiredDate || "");
    const today = new Date();

    return subsExpiry < today;
  }, [data?.data?.expiredDate, isAuthenticated, loading]);

  const renderAuthMessage = useMemo(() => {
    if (!isAuthenticated || loading) {
      return "";
    }
    if (data?.data.project.ownerId === user?.username) {
      return "You owned this API";
    }
    if (data?.data?.expiredDate) {
      if (isSubscriptionExpired) {
        return "Your subscription expired";
      }
      return "You already subscribed to this API";
    }
  }, [
    data?.data?.expiredDate,
    data?.data.project.ownerId,
    isAuthenticated,
    isSubscriptionExpired,
    loading,
    user?.username,
  ]);

  const renderAuthActions = useMemo(() => {
    const startUsingBtn = (
      <Button
        label="Start using"
        onClick={() => {
          setIsLoading(!isLoading);
          setTimeout(() => {
            if (data?.data.project.ownerId && data?.data.project.alias)
              push(
                ROUTES.API_WORKSPACE_API_DETAIL_UTILIZER(
                  data?.data.project.ownerId,
                  data?.data.project.alias
                )
              );
          }, 1000);
        }}
      />
    );

    const extendSubsBtn = (
      <Button
        label="Extend subscription"
        appearance="outline"
        onClick={openSubscribeDialog}
      />
    );
    if (!isAuthenticated || loading) {
      return null;
    }
    if (data?.data.project.ownerId === user?.username) {
      return startUsingBtn;
    }
    if (data?.data?.expiredDate) {
      if (isSubscriptionExpired) {
        return extendSubsBtn;
      }
      return (
        <>
          {startUsingBtn}
          {extendSubsBtn}
        </>
      );
    }
  }, [
    data?.data?.expiredDate,
    data?.data.project.alias,
    data?.data.project.ownerId,
    isAuthenticated,
    isLoading,
    isSubscriptionExpired,
    loading,
    openSubscribeDialog,
    push,
    user?.username,
  ]);

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

      <Layout hasSearch pageTitle={(query?.username as string) || "-"}>
        {data?.data === undefined ? (
          <Typography.Title level={3}>API not found</Typography.Title>
        ) : (
          <>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <Typography.Title level={2} className="!m-0 shrink-0">
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

              {isAuthenticated &&
              user?.username &&
              user?.username !== data?.data?.project?.ownerId &&
              data?.data?.expiredDate ? (
                <div className="w-full flex items-center gap-2">
                  <div className="relative w-full">
                    <div className="!m-0 w-[120px] h-max -rotate-90 flex justify-center items-center absolute !right-0 !-bottom-[60px]">
                      <StarRating
                        handleOnClick={(rating) => setCurrRating(rating)}
                        starClassName="rotate-90"
                        size={24}
                        initialRating={data.data.yourRate || 0}
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
            <Row className="my-4 md:my-6" gutter={[16, 16]}>
              <Col span={24} md={{ span: 16 }}>
                <ApiRepo
                  data={
                    {
                      ...data?.data.project,
                      stars: data?.data?.stars || 0,
                      subscriber: data?.data?.subscriber || 0,
                    } as apiRepoType
                  }
                  isLinkActive={false}
                  isDescriptionTruncated={false}
                  subscriptionExpireNote={
                    data?.data?.expiredDate ? (
                      <>
                        Subscription{" "}
                        {isSubscriptionExpired ? "expired" : "expires"} at{" "}
                        <b>
                          {dayjs(new Date(data.data.expiredDate)).format(
                            "DD/MMM/YYYY, HH:mm:ss"
                          )}
                        </b>
                      </>
                    ) : undefined
                  }
                  showEditButton={
                    user?.username === data?.data?.project?.ownerId
                  }
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
                    {data?.data?.expiredDate ||
                    data?.data.project.ownerId === user?.username ? (
                      <Spin spinning={isLoading}>
                        <div className="flex justify-between !items-start">
                          <Typography.Text className="text-lg !m-0 !text-gray-600">
                            {renderAuthMessage}
                          </Typography.Text>
                          <CheckCircleOutlined className="!text-success text-lg mr-1 mt-[5px]" />
                        </div>
                        <div className="flex gap-2 flex-wrap mt-4">
                          {renderAuthActions}
                        </div>
                      </Spin>
                    ) : (
                      <div className="h-full flex flex-col justify-between">
                        <div className="flex justify-between !items-start">
                          <Typography.Text className="text-lg !m-0 !text-gray-600">
                            {data?.data?.isAddedToCart
                              ? "API is already added to cart"
                              : "You haven't subscribed to this API yet"}
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
                              data?.data?.isAddedToCart
                                ? "Go to cart"
                                : "Add to cart"
                            }
                            onClick={() => {
                              if (data?.data?.isAddedToCart) {
                                push(ROUTES.CART);
                              } else {
                                openSubscribeDialog();
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

            <Typography.Title level={3} className="!text-lg md:!text-xl">
              Documentation
            </Typography.Title>
            <div className="border-primary border-t-4">
              <ReactQuill
                theme="snow"
                value={defaultMDValue}
                modules={editorModules}
                readOnly
              />
            </div>

            {!loading &&
            isAuthenticated &&
            user &&
            data?.data.project.ownerId === user?.username ? (
              <>
                <Typography.Title level={3} className="mt-6 md:mt-8">
                  Subscribers
                </Typography.Title>
                <ProjectSubscriber alias={query.alias as string} />
              </>
            ) : null}
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
              label="Add to cart"
              isLoading={isAddingToCart}
              onClick={onAddToCart}
            />,
          ]}
          centered
        >
          <Text as="h2" className="text-md md:text-lg">
            Please choose subscription plan for this project
          </Text>

          <div className="w-full flex justify-center">
            <Radio.Group
              defaultValue={subsPlan}
              className="!flex w-full flex-col md:flex-row items-center"
              buttonStyle="solid"
              onChange={(e) => setSubsPlan(e.target.value)}
            >
              {subscriptionPlans.map((plan) => {
                return (
                  <Radio.Button
                    key={plan.label}
                    value={plan.days}
                    className="flex-1 !h-full !w-full !flex flex-col items-center !p-2 md:!p-4"
                  >
                    <Text
                      className={cx("text-lg md:text-2xl font-semibold !mb-2", {
                        "text-slate-600": subsPlan !== plan.days,
                        "text-white": subsPlan === plan.days,
                      })}
                    >
                      {plan.label}
                    </Text>
                    <div className="text-center text-sm md:text-base">
                      ({plan.days} {plan.days > 1 ? "days" : "day"})
                    </div>
                  </Radio.Button>
                );
              })}
            </Radio.Group>
          </div>
        </Modal>
      )}
    </>
  );
};

export default APIDetailPage;
