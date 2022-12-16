import { Typography } from "antd";
import Head from "next/head";
import { Layout } from "../../components/Layout";

const UserPage = () => {
  return (
    <>
      <Head>
        <title>Profile | APIcally</title>
      </Head>
      <Layout>
        <Typography.Title level={3}>Profile</Typography.Title>
      </Layout>
    </>
  );
};

export default UserPage;
