import { Col, Empty, Row } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";
import { Button } from "../components/Button";
import { Card } from "../components/Card";
import { Layout } from "../components/Layout";
import { Text } from "../components/Text";
import { Image } from "antd";
import { useIsMobile } from "../hooks/mobile";
import { useEffect, useState } from "react";

const HomePage = () => {
  const { push } = useRouter();
  const isMobile = useIsMobile();
  const [isSSR, setIsSSR] = useState<boolean>(true);

  useEffect(() => {
    setIsSSR(false);
  }, []);

  return (
    !isSSR && (
      <Layout>
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
                      onClick={() => push("/api-playground")}
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
                <Link href="">
                  <a className="text-primary hover:text-primary/70 text-base">
                    Weather API
                  </a>
                </Link>
                <br />
                <Link href="">
                  <a className="text-primary hover:text-primary/70 text-base">
                    Face recognization API
                  </a>
                </Link>
                <br />
                <Link href="">
                  <a className="text-primary hover:text-primary/70 text-base">
                    Prime number API
                  </a>
                </Link>
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
                onClick={() => push("/api-playground")}
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
                onClick={() => push("/api-playground")}
              >
                <Image
                  height={isMobile ? 150 : 200}
                  width="100%"
                  className="object-contain"
                  preview={false}
                  src="img/utilize-art.svg"
                />
                <Text className="pt-4 text-lg mb-0">Utilize and share</Text>
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
                onClick={() => push("/feed")}
              >
                <Image
                  height={isMobile ? 150 : 200}
                  width="100%"
                  className="object-contain"
                  preview={false}
                  src="img/feed-art.svg"
                />
                <Text className="pt-4 text-lg mb-0">Observe data</Text>
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
                onClick={() => push("/dashboard")}
              >
                <Image
                  height={isMobile ? 150 : 200}
                  width="100%"
                  className="object-contain"
                  preview={false}
                  src="img/dashboard-art.svg"
                />
                <Text className="pt-4 text-lg mb-0">Visualize data</Text>
              </div>
            </Card>
          </Col>
        </Row>
      </Layout>
    )
  );
};

export default HomePage;
