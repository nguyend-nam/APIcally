import { Card as AntCard, Col, Empty, Row } from "antd";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { Layout } from "../../components/Layout";
import { GeneralInfo } from "../../components/page/profile/GeneralInfo";
import { ROUTES } from "../../constants/routes";
import { Text } from "../../components/Text";
import { SubscribedApiRepoList } from "../../components/ApiRepoList/SubscribedApiRepoList";
import { OwnedApiRepoList } from "../../components/ApiRepoList/OwnedApiRepoList";
import { Card } from "../../components/Card";
import { useIsMobile } from "../../hooks/useIsMobile";

export type tabTypes = "owned" | "subscribed";

const UserPage = () => {
  const [searchQuerySubscribed, setSearchQuerySubscribed] =
    useState<string>("");
  const [activeTabKey, setActiveTabKey] = useState<tabTypes>("owned");
  const isMobile = useIsMobile();

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
    owned: <OwnedApiRepoList searchQuery={searchQuerySubscribed} />,
    subscribed: <SubscribedApiRepoList searchQuery={searchQuerySubscribed} />,
  };

  const { push } = useRouter();

  return (
    <>
      <Head>
        <title>Profile | APIcally</title>
      </Head>

      <Layout hasSearch>
        <Row gutter={[20, 20]}>
          <Col span={24} xl={{ span: 8 }}>
            <GeneralInfo />
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

            <Card shadowSize="sm" className="p-6 mt-5">
              <Text as="h2" className="text-lg">
                APIs in cart
              </Text>
              <Empty
                description={
                  <>
                    <Text as="div" className="text-base">
                      Your cart is currently empty
                    </Text>
                    <Button
                      label="Explore now"
                      className="m-3"
                      onClick={() => push(ROUTES.EXPLORE())}
                    />
                  </>
                }
              />
            </Card>
          </Col>
        </Row>
      </Layout>
    </>
  );
};

export default UserPage;
