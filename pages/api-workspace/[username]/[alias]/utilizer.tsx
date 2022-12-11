import { Typography } from "antd";
import Head from "next/head";
import { Layout } from "../../../../components/Layout";

const UtilizerPage = () => {
  return (
    <>
      <Head>
        <title>API workspace | APIcally</title>
      </Head>
      <Layout>
        <Typography.Title level={3}>Utilizer</Typography.Title>
      </Layout>
    </>
  );
};

export default UtilizerPage;
