import { Card as AntCard, Col, Row } from "antd";
import Head from "next/head";
import { useEffect, useMemo, useState } from "react";
import { Input } from "../../../components/Input";
import { Layout } from "../../../components/Layout";
import { GeneralInfo } from "../../../components/page/profile/GeneralInfo";
import { Text } from "../../../components/Text";
import { OwnedApiRepoList } from "../../../components/ApiRepoList/OwnedApiRepoList";
import { useIsMobile } from "../../../hooks/useIsMobile";
import { apiReposData } from "../../../constants/mockData";
import { useRouter } from "next/router";
import { ROUTES } from "../../../constants/routes";
import { useAuthContext } from "../../../context/auth";

export type tabTypes = "owned";

const OtherUserPage = () => {
  const [searchQuerySubscribed, setSearchQuerySubscribed] =
    useState<string>("");
  const [activeTabKey, setActiveTabKey] = useState<tabTypes>("owned");
  const isMobile = useIsMobile();
  const { query, replace } = useRouter();
  const { isAuthenticated } = useAuthContext();

  useEffect(() => {
    if (isAuthenticated && query.username && query.username === "nguyend-nam") {
      replace(ROUTES.PROFILE);
    }
  }, [replace, query.username, isAuthenticated]);

  const ownedAPIsByUser = apiReposData.filter(
    (a) => a.username === query.username
  );

  const userData = useMemo(() => {
    if (ownedAPIsByUser.length) {
      return {
        username: ownedAPIsByUser[0].username,
        fullname: ownedAPIsByUser[0].author,
      };
    }
    return {
      username: "nguyend-nam",
      fullname: "Dinh Nam Nguyen",
    };
  }, [ownedAPIsByUser]);

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
  ];

  const tabContentList: Record<tabTypes, any> = {
    owned: (
      <OwnedApiRepoList
        searchQuery={searchQuerySubscribed}
        className="!h-max !max-h-[350px]"
        apiList={ownedAPIsByUser}
        username={query.username as string}
      />
    ),
  };

  return (
    <>
      <Head>
        <title>{userData?.fullname || "-"} | APIcally</title>
      </Head>

      <Layout pageTitle={userData?.fullname}>
        <Row gutter={[20, 20]}>
          <Col span={24} xl={{ span: 8 }}>
            <GeneralInfo
              username={userData?.username}
              fullname={userData?.fullname}
              showActions={false}
            />
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
    </>
  );
};

export default OtherUserPage;
