import Head from "next/head";
import { Layout } from "../components/Layout";

const UserPage = () => {
  return (
    <>
      <Head>
        <title>Profile | APIcally</title>
      </Head>
      <Layout>Profile</Layout>;
    </>
  );
};

export default UserPage;
