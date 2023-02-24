import { SearchOutlined } from "@ant-design/icons";
import { Form } from "antd";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { Layout } from "../../components/Layout";
import { ROUTES } from "../../constants/routes";

const ExplorePage = () => {
  const [isSSR, setIsSSR] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const { push } = useRouter();

  useEffect(() => {
    setIsSSR(false);
  }, []);
  return (
    !isSSR && (
      <>
        <Head>
          <title>Explore | APIcally</title>
        </Head>
        <Layout
          extraLeft={
            <div className="mr-0 md:mr-4 mb-4 md:mb-0">
              <Form className="flex items-center">
                <Input
                  borderRadius="bottomLeft"
                  type="text"
                  id="home-search-input"
                  placeholder="Search or jump to..."
                  className="!font-normal !placeholder:font-normal h-8"
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Button
                  borderRadius="right"
                  label={<SearchOutlined />}
                  className="h-8 flex justify-center items-center !p-2"
                  onClick={() => {
                    if (searchQuery) {
                      push(ROUTES.EXPLORE_SEARCH(searchQuery));
                    }
                  }}
                />
              </Form>
            </div>
          }
        >
          Explore
        </Layout>
      </>
    )
  );
};

export default ExplorePage;
