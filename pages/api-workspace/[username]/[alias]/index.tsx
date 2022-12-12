import { Col, Row, Spin, Tooltip, Typography } from "antd";
import dynamic from "next/dynamic";
import Head from "next/head";
import { useRouter } from "next/router";
import ReactMarkdown from "react-markdown";
import { Button } from "../../../../components/Button";
import { Layout } from "../../../../components/Layout";
import { ApiRepo } from "../../../../components/page/home/ApiRepo";
import { apiReposData } from "../../../../constants/mockData";
import { defaultMD } from "../../documentation";
import { Card } from "../../../../components/Card";
import { CheckCircleOutlined, InfoCircleOutlined } from "@ant-design/icons";
import { useState } from "react";

const MdEditor = dynamic(() => import("react-markdown-editor-lite"), {
  ssr: false,
});

const APIDetailPage = () => {
  const { query, push } = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const currentAPI = apiReposData.find(
    (a) => a.alias === query.alias && a.username === query.username
  );

  return (
    <>
      <Head>
        <title>API workspace | APIcally</title>
      </Head>
      <Layout>
        {currentAPI === undefined ? (
          <Typography.Title level={3}>API not found</Typography.Title>
        ) : (
          <>
            <Typography.Title level={2}>
              <span className="font-normal text-2xl md:text-3xl">
                {currentAPI?.author}/
              </span>
              <span className="text-primary text-2xl md:text-3xl">
                {currentAPI?.name}
              </span>
            </Typography.Title>

            <Row className="my-8" gutter={[16, 16]}>
              <Col span={24} md={{ span: 16 }}>
                <ApiRepo data={currentAPI} />
              </Col>
              {currentAPI.subscribeStatus ? (
                <Col span={24} md={{ span: 8 }}>
                  <Card className="p-4 h-full" shadowSize="md">
                    <Spin spinning={isLoading}>
                      <div className="flex items-center">
                        <CheckCircleOutlined className="!text-success text-lg mr-1" />
                        <Typography.Text className="text-lg !m-0 !text-gray-600">
                          You already subscribed to this API
                        </Typography.Text>
                      </div>
                      <div className="mt-4">
                        <Button
                          appearance="outline"
                          label="Unsubscribe"
                          className="text-base md:text-lg p-2 py-1 mr-2"
                        />
                        <Button
                          label="Start using"
                          onClick={() => {
                            setIsLoading(!isLoading);
                            setTimeout(
                              () =>
                                push(
                                  `/api-workspace/${currentAPI.username}/${currentAPI.alias}/utilizer`
                                ),
                              1000
                            );
                          }}
                          className="text-base md:text-lg p-2 py-1"
                        />
                      </div>
                    </Spin>
                  </Card>
                </Col>
              ) : (
                <Col span={24} md={{ span: 8 }}>
                  <Card
                    className="p-4 h-full flex flex-col justify-between"
                    shadowSize="md"
                  >
                    <div className="flex justify-between">
                      <Typography.Text className="text-lg !m-0 !text-gray-600">
                        You haven&rsquo;t subscribed to this API yet
                      </Typography.Text>
                      <Button
                        appearance="link"
                        label={
                          <Tooltip
                            title="You must subscribe to the API to use it"
                            placement="left"
                          >
                            <InfoCircleOutlined />
                          </Tooltip>
                        }
                        className="h-max"
                      />
                    </div>
                    <div className="mt-4">
                      <Button
                        label="Subscribe"
                        className="text-base md:text-lg p-2 py-1"
                      />
                    </div>
                  </Card>
                </Col>
              )}
            </Row>

            <Typography.Title level={3}>Documentation</Typography.Title>
            <div className="border-primary border-t-4">
              <MdEditor
                readOnly
                view={{ menu: false, md: false, html: true }}
                style={{ height: 510 }}
                renderHTML={(text) => <ReactMarkdown source={text} />}
                defaultValue={defaultMD}
              />
            </div>
          </>
        )}
      </Layout>
    </>
  );
};

export default APIDetailPage;
