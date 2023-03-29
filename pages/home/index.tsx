import { Col, Empty, Row } from "antd";
import { useRouter } from "next/router";
import { Button } from "../../components/Button";
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

const HomePage = () => {
  const { push } = useRouter();
  const isMobile = useIsMobile();
  const [searchQuerySubscribed, setSearchQuerySubscribed] =
    useState<string>("");

  return (
    <>
      <Head>
        <title>Home | APIcally</title>
      </Head>

      <Layout hasSearch>
        <Row gutter={[20, 20]}>
          <Col span={24} md={{ span: 12 }}>
            <Card shadowSize="sm" className="p-4">
              <Text as="h2" className="text-lg">
                Recently created
              </Text>
              <Empty
                description={
                  <>
                    <Text as="div" className="text-base">
                      You haven&rsquo;t created any APIs yet
                    </Text>
                    <Button
                      label="Create now"
                      className="m-3"
                      onClick={() => push(ROUTES.API_WORKSPACE_CREATE)}
                    />
                  </>
                }
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
                id="home-search-input"
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
