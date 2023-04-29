import { Card as AntCard, Col, Row } from "antd";
import Head from "next/head";
import { useEffect, useState } from "react";
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

export type tabTypes = "owned" | "subscribed";

const UserPage = () => {
  const [searchQuerySubscribed, setSearchQuerySubscribed] =
    useState<string>("");
  const [activeTabKey, setActiveTabKey] = useState<tabTypes>("owned");
  const isMobile = useIsMobile();
  const { replace } = useRouter();
  const { isAuthenticated, logout } = useAuthContext();

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

  const tabList: { tab: any; key: tabTypes }[] = [
    {
      tab: (
        <Text as="h2" className="mb-0">
          Owned APIs
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
  ];

  const tabContentList: Record<tabTypes, any> = {
    owned: (
      <OwnedApiRepoList
        searchQuery={searchQuerySubscribed}
        className="!h-max"
        username="nguyend-nam"
      />
    ),
    subscribed: (
      <SubscribedApiRepoList
        searchQuery={searchQuerySubscribed}
        className="!h-max"
      />
    ),
  };

  return (
    <>
      <Head>
        <title>Profile | APIcally</title>
      </Head>

      {isAuthenticated ? (
        <Layout>
          <Row gutter={[20, 20]}>
            <Col span={24} xl={{ span: 8 }}>
              <GeneralInfo className="block md:sticky top-[96px]" />
            </Col>
            <Col span={24} xl={{ span: 16 }}>
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
            </Col>
          </Row>
        </Layout>
      ) : null}
    </>
  );
};

export default UserPage;
