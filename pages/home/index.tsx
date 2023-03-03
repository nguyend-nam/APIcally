import { Col, Empty, Form, Row } from "antd";
import { useRouter } from "next/router";
import { Button } from "../../components/Button";
import { Card } from "../../components/Card";
import { Layout } from "../../components/Layout";
import { Text } from "../../components/Text";
import { Image } from "antd";
import { useIsMobile } from "../../hooks/useIsMobile";
import { useEffect, useState } from "react";
import { Input } from "../../components/Input";
import Head from "next/head";
import { SearchOutlined } from "@ant-design/icons";
import { apiReposData } from "../../constants/mockData";
import { ApiRepo } from "../../components/page/home/ApiRepo";
import { ROUTES } from "../../constants/routes";

const HomePage = () => {
  const { push } = useRouter();
  const isMobile = useIsMobile();
  const [isSSR, setIsSSR] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchQuerySubscribed, setSearchQuerySubscribed] =
    useState<string>("");

  useEffect(() => {
    setIsSSR(false);
  }, []);

  return (
    !isSSR && (
      <>
        <Head>
          <title>Home | APIcally</title>
        </Head>
        <Layout
          extraLeft={
            <div className="mr-0 md:mr-4 mb-4 md:mb-0">
              <Form className="flex items-center">
                <Input
                  borderRadius="bottomLeft"
                  type="text"
                  id="home-search-input"
                  placeholder="Search or jump to..."
                  className="!font-normal !placeholder:font-normal h-8"
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Button
                  borderRadius="right"
                  label={<SearchOutlined />}
                  className="h-8 flex justify-center items-center !p-2"
                  onClick={() => {
                    if (searchQuery) {
                      push(ROUTES.EXPLORE_SEARCH(searchQuery));
                    }
                  }}
                />
              </Form>
            </div>
          }
        >
          <Row gutter={[20, 20]}>
            <Col span={24} md={{ span: 12 }}>
              <Card shadowSize="md" className="p-4">
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
              <Card shadowSize="md" className="p-4">
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
                <div className="h-[350px] overflow-auto ">
                  {searchQuerySubscribed ? (
                    apiReposData.filter(
                      (a) =>
                        a.subscribeStatus &&
                        ((a.alias && a.alias.includes(searchQuerySubscribed)) ||
                          (a.name && a.name.includes(searchQuerySubscribed)) ||
                          (a.author &&
                            a.author.includes(searchQuerySubscribed)) ||
                          (a.description &&
                            a.description.includes(searchQuerySubscribed)) ||
                          (a.username &&
                            a.username.includes(searchQuerySubscribed)))
                    ).length ? (
                      apiReposData
                        .filter(
                          (a) =>
                            a.subscribeStatus &&
                            ((a.alias &&
                              a.alias.includes(searchQuerySubscribed)) ||
                              (a.name &&
                                a.name.includes(searchQuerySubscribed)) ||
                              (a.author &&
                                a.author.includes(searchQuerySubscribed)) ||
                              (a.description &&
                                a.description.includes(
                                  searchQuerySubscribed
                                )) ||
                              (a.username &&
                                a.username.includes(searchQuerySubscribed)))
                        )
                        .map((a) => (
                          <ApiRepo key={a.id} data={a} hasShadow={false} />
                        ))
                    ) : (
                      <div className="h-full flex flex-col justify-center">
                        <Empty
                          description={
                            <Text as="div" className="text-base">
                              No subscribed APIs found with keyword &quot;
                              {searchQuerySubscribed}&quot;
                            </Text>
                          }
                        />
                      </div>
                    )
                  ) : (
                    apiReposData
                      .filter((a) => a.subscribeStatus)
                      .map((a) => (
                        <ApiRepo key={a.id} data={a} hasShadow={false} />
                      ))
                  )}
                </div>
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
                className="hover:shadow-md"
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
                    src="img/api-art.svg"
                  />
                  <Text className="pt-4 text-lg mb-0">Create APIs</Text>
                </div>
              </Card>
            </Col>
            <Col span={24} md={{ span: 12 }}>
              <Card
                hasShadow={false}
                className="hover:shadow-md"
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
                    src="img/utilize-art.svg"
                  />
                  <Text className="pt-4 text-lg mb-0">Utilize and serve</Text>
                </div>
              </Card>
            </Col>
            <Col span={24} md={{ span: 12 }}>
              <Card
                hasShadow={false}
                className="hover:shadow-md"
                style={{ transition: "0.2s" }}
              >
                <div
                  role="button"
                  className="flex flex-col items-center p-4 hover:text-primary"
                  onClick={() => push(ROUTES.EXPLORE)}
                >
                  <Image
                    height={isMobile ? 150 : 200}
                    width="100%"
                    className="object-contain"
                    preview={false}
                    src="img/feed-art.svg"
                  />
                  <Text className="pt-4 text-lg mb-0">Explore APIs</Text>
                </div>
              </Card>
            </Col>
          </Row>
        </Layout>
      </>
    )
  );
};

export default HomePage;
