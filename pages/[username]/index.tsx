import { Card as AntCard, Col, Row, Spin } from "antd";
import Head from "next/head";
import { useEffect, useState } from "react";
import { Input } from "../../components/Input";
import { Layout } from "../../components/Layout";
import { GeneralInfo } from "../../components/page/profile/GeneralInfo";
import { Text } from "../../components/Text";
import { OwnedApiRepoList } from "../../components/ApiRepoList/OwnedApiRepoList";
import { useIsMobile } from "../../hooks/useIsMobile";
import { useRouter } from "next/router";
import { ROUTES } from "../../constants/routes";
import { useAuthContext } from "../../context/auth";
import { useFetchWithCache } from "../../hooks/useFetchWithCache";
import { client, GET_PATHS } from "../../libs/api";

export type tabTypes = "owned";

const OtherUserPage = () => {
  const [searchQuerySubscribed, setSearchQuerySubscribed] =
    useState<string>("");
  const [activeTabKey, setActiveTabKey] = useState<tabTypes>("owned");
  const isMobile = useIsMobile();
  const { query, replace } = useRouter();
  const { isAuthenticated, user } = useAuthContext();

  useEffect(() => {
    if (
      isAuthenticated &&
      query?.username &&
      user?.username &&
      query.username === user.username
    ) {
      replace(ROUTES.PROFILE);
    }
  }, [replace, query.username, isAuthenticated, user?.username]);

  const { data, loading } = useFetchWithCache(
    [GET_PATHS.GET_USER_INFO(query.username as string)],
    () => client.getUserInfo(query.username as string)
  );

  if (
    loading ||
    !data ||
    !query?.username ||
    typeof query?.username !== "string"
  ) {
    return (
      <>
        <Head>
          <title>User profile | APIcally</title>
        </Head>

        <Layout hasSearch pageTitle="User profile">
          <div className="text-center">
            <Spin size="large" />
          </div>
        </Layout>
      </>
    );
  }

  console.log(data);

  const onTabChange = (key: string) => {
    setActiveTabKey(key as tabTypes);
  };

  const tabList: { tab: any; key: tabTypes }[] = [
    {
      tab: (
        <Text as="h2" className="mb-0">
          Created APIs
        </Text>
      ),
      key: "owned",
    },
  ];

  const tabContentList: Record<tabTypes, any> = {
    owned: (
      <OwnedApiRepoList
        searchQuery={searchQuerySubscribed}
        className="!h-max"
        username={query.username as string}
      />
    ),
  };

  return isAuthenticated &&
    query?.username &&
    user?.username &&
    query.username === user.username ? null : (
    <>
      <Head>
        <title>
          {data?.data?.username ? `${data?.data?.username}'s profile` : "-"} |
          APIcally
        </title>
      </Head>

      <Layout
        hasSearch
        pageTitle={
          data?.data?.username ? `${data?.data?.username}'s profile` : "-"
        }
        contentClassName="!max-w-[1050px]"
      >
        <Row gutter={[32, 20]}>
          <Col span={24} xl={{ span: 8 }}>
            <GeneralInfo
              showActions={false}
              className="block md: sticky top-[96px]"
              userData={data?.data}
            />
          </Col>
          <Col span={24} xl={{ span: 16 }}>
            <AntCard
              className="!border-none !rounded-r-lg !rounded-bl-lg"
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
          </Col>
        </Row>
      </Layout>
    </>
  );
};

export default OtherUserPage;
