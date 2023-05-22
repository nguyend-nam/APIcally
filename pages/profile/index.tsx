import {
  Card as AntCard,
  Col,
  Divider,
  Radio,
  Row,
  Spin,
  Tabs,
  TabsProps,
  Typography,
} from "antd";
import Head from "next/head";
import { useEffect, useMemo, useState } from "react";
import { Input } from "../../components/Input";
import { Layout } from "../../components/Layout";
import { GeneralInfo } from "../../components/page/profile/GeneralInfo";
import { Text } from "../../components/Text";
import { SubscribedApiRepoList } from "../../components/ApiRepoList/SubscribedApiRepoList";
import { OwnedApiRepoList } from "../../components/ApiRepoList/OwnedApiRepoList";
import { useIsMobile } from "../../hooks/useIsMobile";
import { APICALLY_KEY, useAuthContext } from "../../context/auth";
import { useRouter } from "next/router";
import { ROUTES } from "../../constants/routes";
import { Card } from "../../components/Card";
import { LineChart } from "../../components/LineChart";
import { CartesianAxisProps, TooltipProps } from "recharts";
import cx from "classnames";
import { useFetchBalanceLog } from "../../hooks/useFetchBalanceLog";
import { formatCurrency } from "../../utils/currency";
import { useFetchTransactionHistory } from "../../hooks/useFetchTransactionHistory";
import dayjs from "dayjs";
import {
  BorderOuterOutlined,
  DollarCircleOutlined,
  FileDoneOutlined,
} from "@ant-design/icons";

export type tabTypes = "owned" | "subscribed";
export type loggingTypes = "day" | "month" | "year";

const CustomXAxisTick = ({
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
const CustomYAxisTick = ({
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
        {`${(payload?.value || 0) < 0 ? "-" : ""}${formatCurrency(
          Math.abs(payload?.value)
        )}`}
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
                <span>Balance fluctuation: </span>
                <strong
                  className={cx({
                    "text-rose-400": (item?.value || 0) < 0,
                    "text-teal-600": (item?.value || 0) >= 0,
                  })}
                >{`${(item?.value || 0) < 0 ? "-" : ""}${formatCurrency(
                  Math.abs(item?.value)
                )}`}</strong>
              </span>
            );
          })}
        </div>
      </Card>
    );
  }

  return null;
};

const UserPage = () => {
  const [searchQuerySubscribed, setSearchQuerySubscribed] =
    useState<string>("");
  const [activeTabKey, setActiveTabKey] = useState<tabTypes>("owned");
  const [activeLoggingKey, setActiveLoggingKey] =
    useState<loggingTypes>("month");
  const isMobile = useIsMobile();
  const { replace } = useRouter();
  const { isAuthenticated, logout, user } = useAuthContext();

  const { data: balanceLogData, loading: balanceLogLoading } =
    useFetchBalanceLog(activeLoggingKey);
  const { data: historyData, loading: historyLoading } =
    useFetchTransactionHistory();

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

  const onTabChange = (key: string) => {
    setActiveTabKey(key as tabTypes);
  };

  const tabList: { tab: any; key: tabTypes }[] = useMemo(
    () => [
      {
        tab: (
          <Text as="h2" className="mb-0">
            Created APIs
          </Text>
        ),
        key: "owned",
      },
      {
        tab: (
          <Text as="h2" className="mb-0">
            Subscribed APIs
          </Text>
        ),
        key: "subscribed",
      },
    ],
    []
  );

  const tabContentList: Record<tabTypes, any> = useMemo(
    () => ({
      owned: (
        <OwnedApiRepoList
          searchQuery={searchQuerySubscribed}
          className="!h-max"
          username={user?.username}
        />
      ),
      subscribed: (
        <SubscribedApiRepoList
          searchQuery={searchQuerySubscribed}
          className="!h-max"
        />
      ),
    }),
    [searchQuerySubscribed, user?.username]
  );

  const apisTabContent = useMemo(() => {
    return (
      <AntCard
        className="!border-none shadow !rounded-r-lg !rounded-bl-lg"
        headStyle={{ padding: isMobile ? "0 16px" : "0 24px" }}
        bodyStyle={{ padding: isMobile ? 16 : 24 }}
        tabList={tabList}
        activeTabKey={activeTabKey}
        onTabChange={onTabChange}
      >
        <Input
          type="text"
          id="home-search-input"
          placeholder={`Search ${activeTabKey} APIs...`}
          className="!font-normal !placeholder:font-normal mb-4"
          onChange={(e) => setSearchQuerySubscribed(e.target.value)}
        />
        {tabContentList[activeTabKey]}
      </AntCard>
    );
  }, [activeTabKey, isMobile, tabContentList, tabList]);

  const generalTabContent = useMemo(() => {
    return (
      <>
        <Card
          className="px-2 py-4 md:px-4 md:py-6 overflow-auto"
          hasShadow={false}
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2 mb-4">
            <Typography.Title level={3} className="!m-0 !text-lg md:!text-xl">
              Balance log
            </Typography.Title>
            <div className="flex justify-center">
              <Radio.Group
                defaultValue={activeLoggingKey}
                className="!flex !h-max flex-row items-center"
                buttonStyle="solid"
                onChange={(e) => setActiveLoggingKey(e.target.value)}
              >
                {["day", "month", "year"].map((log) => {
                  return (
                    <Radio.Button
                      key={log}
                      value={log}
                      className="flex-1 !h-full !flex flex-col items-center !p-2 md:!p-4"
                    >
                      <Text
                        className={cx(
                          "!text-sm !m-0 !-my-1 md:!-my-2 font-medium",
                          {
                            "text-slate-600": activeLoggingKey !== log,
                            "text-white": activeLoggingKey === log,
                          }
                        )}
                      >
                        {`${log[0].toUpperCase()}${log.slice(1)}`}
                      </Text>
                    </Radio.Button>
                  );
                })}
              </Radio.Group>
            </div>
          </div>
          {balanceLogLoading ? (
            <div className="h-[240px] w-full flex justify-center items-center">
              <Spin size="large" />
            </div>
          ) : (
            <LineChart
              width="100%"
              height={240}
              minWidth={600}
              dataset={balanceLogData}
              lineDataKeys="amount"
              xAxisDataKey="time"
              xAxisTick={<CustomXAxisTick dy={16} />}
              yAxisTick={<CustomYAxisTick dy={5} dx={-10} />}
              customToolTip={<CustomTooltip />}
            />
          )}
        </Card>

        <Divider className="!my-6 md:!my-8" />

        <Typography.Title level={3} className="!m-0 !text-lg md:!text-xl !mb-4">
          History
        </Typography.Title>
        <Card className="p-3 md:p-6 !bg-slate-50" hasShadow={false}>
          {historyLoading ? (
            <div className="h-[200px] w-full flex justify-center items-center">
              <Spin size="large" />
            </div>
          ) : (
            <div className="flex flex-col gap-6 md:gap-8">
              {historyData?.map((h) => {
                return (
                  <div
                    key={h.id}
                    className="flex justify-center items-start gap-3"
                  >
                    <Card
                      className="px-2 py-4 md:px-4 md:py-6"
                      hasShadow={false}
                    >
                      {getHistoryIcon(h?.message || "")}
                    </Card>
                    <Card className="p-4 md:p-6 flex-1" shadowSize="sm">
                      <div>
                        {dayjs(h?.date ? new Date(h?.date) : new Date()).format(
                          "DD/MMM/YYYY, HH:mm:ss"
                        )}
                      </div>
                      <div className="text-[16px]">{h.message}</div>
                    </Card>
                  </div>
                );
              })}
            </div>
          )}
        </Card>
      </>
    );
  }, [
    activeLoggingKey,
    balanceLogData,
    balanceLogLoading,
    historyData,
    historyLoading,
  ]);

  const generalItems: TabsProps["items"] = [
    {
      key: "general",
      label: <Text className="!m-0 !-mt-2 text-base">General</Text>,
      children: generalTabContent,
    },
    {
      key: "apis",
      label: <Text className="!m-0 !-mt-2 text-base">APIs</Text>,
      children: apisTabContent,
    },
  ];

  return (
    <>
      <Head>
        <title>Profile | APIcally</title>
      </Head>

      {isAuthenticated ? (
        <Layout>
          <Row gutter={[20, 20]}>
            <Col span={24} xl={{ span: 8 }}>
              <GeneralInfo className="block md:sticky md:top-[96px]" />
            </Col>
            <Col span={24} xl={{ span: 16 }}>
              <Tabs
                defaultActiveKey="general"
                tabBarStyle={{ borderBottom: "1px solid #DDD" }}
                items={generalItems}
              />
            </Col>
          </Row>
        </Layout>
      ) : null}
    </>
  );
};

export default UserPage;

const getHistoryIcon = (message: string) => {
  if (message.includes("deposited")) {
    return <DollarCircleOutlined className="text-[26px] !text-emerald-600" />;
  }

  if (message.includes("subscribe")) {
    return <FileDoneOutlined className="text-[26px] !text-indigo-500" />;
  }
  return <BorderOuterOutlined className="text-[26px] !text-gray-500" />;
};
