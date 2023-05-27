import { Col, Row, Typography } from "antd";
import { useRouter } from "next/router";
import { Card } from "../../components/Card";
import { Layout } from "../../components/Layout";
import { Text } from "../../components/Text";
import { Image } from "antd";
import { useIsMobile } from "../../hooks/useIsMobile";
import { useState } from "react";
import { Input } from "../../components/Input";
import Head from "next/head";
import { ROUTES } from "../../constants/routes";
import { SubscribedApiRepoList } from "../../components/ApiRepoList/SubscribedApiRepoList";
import { OwnedApiRepoList } from "../../components/ApiRepoList/OwnedApiRepoList";
import { CategoryCollection } from "../../components/CategoryCollection";
import { TopSubscribedAPIs } from "../../components/TopSubscribedAPIs";
import { useAuthContext } from "../../context/auth";
import { CheckCircleFilled, CodeFilled } from "@ant-design/icons";

const HomePage = () => {
  const { push } = useRouter();
  const isMobile = useIsMobile();
  const [searchQuerySubscribed, setSearchQuerySubscribed] =
    useState<string>("");
  const [searchQueryCreated, setSearchQueryCreated] = useState<string>("");
  const { isAuthenticated, user } = useAuthContext();

  return (
    <>
      <Head>
        <title>Home | APIcally</title>
      </Head>

      <Layout hasSearch>
        <Typography.Title level={3} className="!text-lg md:!text-xl !mb-1">
          Categories
        </Typography.Title>
        <div className="mb-4 text-sm font-normal">
          From AI to e-commerce, from healthcare to economics and many more...
        </div>
        <div className="mb-8">
          <CategoryCollection />
        </div>

        <Card
          hasShadow={false}
          borderRadius="none"
          className="mb-8 p-4 relative -mx-4 md:-mx-0"
        >
          <div
            className="w-full h-full bg-cover top-0 right-0 pointer-events-none absolute bg-right bg-primary"
            // style={{ backgroundImage: `url(/img/top-apis-bg.png)` }}
          />
          <Typography.Title
            level={3}
            className="!text-lg md:!text-xl relative !text-white !mb-1"
          >
            Top Subscribed APIs
          </Typography.Title>
          <div className="mb-4 relative text-white text-sm font-normal">
            Top 5 most subscribed APIs of all time
          </div>
          <TopSubscribedAPIs />
        </Card>

        {isAuthenticated ? (
          <>
            <Typography.Title level={3} className="!text-lg md:!text-xl !mb-1">
              Personal
            </Typography.Title>
            <div className="mb-4 text-sm font-normal">
              APIs that you have created or subscribed to
            </div>
            <Row gutter={[20, 20]}>
              <Col span={24} md={{ span: 12 }}>
                <Card hasShadow={false} className="p-4">
                  <div className="flex gap-2 items-center mb-2">
                    <CodeFilled className="!text-primary" />
                    <Text className="!text-base md:!text-lg font-medium !m-0">
                      Recently created
                    </Text>
                  </div>
                  <Input
                    type="text"
                    id="home-owned-search-input"
                    placeholder="Search created APIs..."
                    className="!font-normal !placeholder:font-normal mb-4"
                    onChange={(e) => setSearchQueryCreated(e.target.value)}
                  />
                  <OwnedApiRepoList
                    searchQuery={searchQueryCreated}
                    username={user?.username}
                  />
                </Card>
              </Col>
              <Col span={24} md={{ span: 12 }}>
                <Card hasShadow={false} className="p-4">
                  <div className="flex gap-2 items-center mb-2">
                    <CheckCircleFilled className="!text-primary" />
                    <Text className="!text-base md:!text-lg font-medium !m-0">
                      Subscribed APIs
                    </Text>
                  </div>
                  <Input
                    type="text"
                    id="home-subscribed-search-input"
                    placeholder="Search subscribed APIs..."
                    className="!font-normal !placeholder:font-normal mb-4"
                    onChange={(e) => setSearchQuerySubscribed(e.target.value)}
                  />
                  <SubscribedApiRepoList
                    searchQuery={searchQuerySubscribed}
                    showSummary={false}
                  />
                </Card>
              </Col>
            </Row>
          </>
        ) : null}

        <Text
          as="h2"
          className="mt-8 mb-4 text-xl md:text-2xl font-semibold text-primary"
        >
          Work with APIcally
        </Text>
        <Row gutter={[2, 2]}>
          <Col span={24} md={{ span: 12 }}>
            <Card
              hasShadow={false}
              className="hover:shadow"
              style={{ transition: "0.2s" }}
              borderRadius="none"
            >
              <div
                role="button"
                className="flex flex-col items-center p-4 hover:text-primary"
                onClick={() => push(ROUTES.API_WORKSPACE)}
              >
                <Image
                  height={isMobile ? 150 : 200}
                  width="100%"
                  className="object-contain"
                  preview={false}
                  src="img/developer-art.png"
                />
                <Text className="pt-4 text-base mb-0">Create APIs</Text>
              </div>
            </Card>
          </Col>
          <Col span={24} md={{ span: 12 }}>
            <Card
              hasShadow={false}
              className="hover:shadow"
              style={{ transition: "0.2s" }}
              borderRadius="none"
            >
              <div
                role="button"
                className="flex flex-col items-center p-4 hover:text-primary"
                onClick={() => push(ROUTES.EXPLORE())}
              >
                <Image
                  height={isMobile ? 150 : 200}
                  width="100%"
                  className="object-contain"
                  preview={false}
                  src="img/explore-art.png"
                />
                <Text className="pt-4 text-base mb-0">Explore APIs</Text>
              </div>
            </Card>
          </Col>
          <Col span={24} md={{ span: 12 }}>
            <Card
              hasShadow={false}
              className="hover:shadow"
              style={{ transition: "0.2s" }}
              borderRadius="none"
            >
              <div
                role="button"
                className="flex flex-col items-center p-4 hover:text-primary"
                onClick={() => push(ROUTES.API_WORKSPACE)}
              >
                <Image
                  height={isMobile ? 150 : 200}
                  width="100%"
                  className="object-contain"
                  preview={false}
                  src="img/utilize-art.png"
                />
                <Text className="pt-4 text-base mb-0">
                  Subscribe and utilize
                </Text>
              </div>
            </Card>
          </Col>
        </Row>
      </Layout>
    </>
  );
};

export default HomePage;
