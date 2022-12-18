import { Typography } from "antd";
import Head from "next/head";
import { useState, useEffect } from "react";
import { Layout } from "../components/Layout";

const ExplorePage = () => {
  const [isSSR, setIsSSR] = useState<boolean>(true);

  useEffect(() => {
    setIsSSR(false);
  }, []);
  return (
    !isSSR && (
      <>
        <Head>
          <title>Explore | APIcally</title>
        </Head>
        <Layout>
          <Typography.Title level={3}>Explore</Typography.Title>
        </Layout>
      </>
    )
  );
};

export default ExplorePage;
