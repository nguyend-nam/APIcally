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
        <Typography.Title level={3} className="!text-xl md:!text-2xl !mb-2">
          Categories
        </Typography.Title>
        <div className="mb-4">
          From AI to e-commerce, from healthcare to economics and many more...
        </div>
        <div className="mb-6">
          <CategoryCollection />
        </div>

        <Card
          hasShadow={false}
          borderRadius="none"
          className="mb-6 p-4 md:p-8 relative -mx-4 md:-mx-0"
        >
          <div
            className="w-full h-full bg-cover top-0 right-0 pointer-events-none absolute bg-right bg-primary"
            style={{ backgroundImage: `url(/img/top-apis-bg.png)` }}
          />
          <Typography.Title
            level={3}
            className="!text-xl md:!text-2xl relative !text-white !mb-2"
          >
            Top Subscribed APIs
          </Typography.Title>
          <div className="mb-4 relative text-white">
            Top 5 most subscribed APIs of all time
          </div>
          <TopSubscribedAPIs />
        </Card>

        {isAuthenticated ? (
          <>
            <Typography.Title
              level={3}
              className="!text-xl md:!text-2xl !mb-2 !font-semibold"
            >
              Personal
            </Typography.Title>
            <div className="mb-4">
              APIs that you have created or subscribed to
            </div>
            <Row gutter={[20, 20]}>
              <Col span={24} md={{ span: 12 }}>
                <Card shadowSize="sm" className="p-4">
                  <Text as="h2" className="text-lg">
                    Recently created
                  </Text>
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
                <Card shadowSize="sm" className="p-4">
                  <Text as="h2" className="text-lg">
                    Subscribed APIs
                  </Text>
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
          className="mt-8 md:mt-12 mb-4 text-2xl md:text-3xl font-semibold text-primary"
        >
          Work with APIcally
        </Text>
        <Row gutter={[20, 20]}>
          <Col span={24} md={{ span: 12 }}>
            <Card
              hasShadow={false}
              className="hover:shadow"
              style={{ transition: "0.2s" }}
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
                <Text className="pt-4 text-lg mb-0">Create APIs</Text>
              </div>
            </Card>
          </Col>
          <Col span={24} md={{ span: 12 }}>
            <Card
              hasShadow={false}
              className="hover:shadow"
              style={{ transition: "0.2s" }}
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
                <Text className="pt-4 text-lg mb-0">Explore APIs</Text>
              </div>
            </Card>
          </Col>
          <Col span={24} md={{ span: 12 }}>
            <Card
              hasShadow={false}
              className="hover:shadow"
              style={{ transition: "0.2s" }}
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
                <Text className="pt-4 text-lg mb-0">Subscribe and utilize</Text>
              </div>
            </Card>
          </Col>
        </Row>
      </Layout>
    </>
  );
};

export default HomePage;
