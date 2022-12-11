import { Col, Empty, Form, Row } from "antd";
import { useRouter } from "next/router";
import { Button } from "../../components/Button";
import { Card } from "../../components/Card";
import { Layout } from "../../components/Layout";
import { Text } from "../../components/Text";
import { Image } from "antd";
import { useIsMobile } from "../../hooks/mobile";
import { useEffect, useState } from "react";
import { Input } from "../../components/Input";
import Head from "next/head";
import { SearchOutlined } from "@ant-design/icons";
import { apiReposData } from "../../constants/mockData";
import { ApiRepo } from "../../components/page/home/ApiRepo";

const HomePage = () => {
  const { push } = useRouter();
  const isMobile = useIsMobile();
  const [isSSR, setIsSSR] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>("");

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
            <div className="ml-0 md:ml-4 mt-4 md:mt-0">
              <Form className="flex items-center">
                <Input
                  borderRadius="bottomLeft"
                  type="text"
                  id="home-search-input"
                  placeholder="Search or jump to..."
                  className="!font-normal !placeholder:font-normal"
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Button
                  borderRadius="right"
                  label={<SearchOutlined />}
                  className="h-9 flex justify-center items-center text-lg p-2"
                  onClick={() => {
                    if (searchQuery) {
                      push(`/home/search?query=${searchQuery}`);
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
                        className="p-2 m-3 text-base"
                        onClick={() => push("/api-workspace")}
                      />
                    </>
                  }
                />
              </Card>
            </Col>
            <Col span={24} md={{ span: 12 }}>
              <Card shadowSize="md" className="p-4">
                <Text as="h2" className="text-lg">
                  Explore APIs
                </Text>
                <div>
                  {apiReposData.slice(0, 2).map((a) => (
                    <ApiRepo key={a.id} data={a} hasShadow={false} />
                  ))}
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
                  onClick={() => push("/api-workspace")}
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
                  onClick={() => push("/api-workspace")}
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
                  onClick={() => push("/explore")}
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
