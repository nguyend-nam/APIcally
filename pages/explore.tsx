import { Typography } from "antd";
import Head from "next/head";
import { Layout } from "../components/Layout";

const ExplorePage = () => {
  return (
    <>
      <Head>
        <title>Explore | APIcally</title>
      </Head>
      <Layout>
        <Typography.Title level={3}>Explore</Typography.Title>
      </Layout>
    </>
  );
};

export default ExplorePage;
