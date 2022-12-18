import { Typography } from "antd";
import Head from "next/head";
import { useState, useEffect } from "react";
import { Layout } from "../../components/Layout";

const UserPage = () => {
  const [isSSR, setIsSSR] = useState<boolean>(true);

  useEffect(() => {
    setIsSSR(false);
  }, []);

  return (
    !isSSR && (
      <>
        <Head>
          <title>Profile | APIcally</title>
        </Head>
        <Layout>
          <Typography.Title level={3}>Profile</Typography.Title>
        </Layout>
      </>
    )
  );
};

export default UserPage;
