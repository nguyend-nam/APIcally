import Head from "next/head";
import { useState, useEffect } from "react";
import { Layout } from "../../../components/Layout";

const UserAPIsPage = () => {
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
        <Layout>Profile/APIs</Layout>
      </>
    )
  );
};

export default UserAPIsPage;
