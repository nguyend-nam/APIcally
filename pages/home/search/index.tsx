import { SearchOutlined } from "@ant-design/icons";
import { Form, Pagination, Input as AntInput } from "antd";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import { Button } from "../../../components/Button";
import { Input } from "../../../components/Input";
import { Layout } from "../../../components/Layout";
import { ApiRepo } from "../../../components/page/home/ApiRepo";
import { apiReposData } from "../../../constants/mockData";

const SearchResultPage = () => {
  const { query, push } = useRouter();
  const [searchQuery, setSearchQuery] = useState<string>("");

  const [filterSubscribed, setFilterSubscribed] = useState<boolean>(false);

  useEffect(() => {
    if (query.status !== undefined) {
      setFilterSubscribed(query.status === "subscribed");
    }
    if (query.query !== undefined && typeof query.query === "string") {
      setSearchQuery(query.query);
    }
  }, [query]);

  const renderAntCheckbox = useMemo(() => {
    return (
      <AntInput
        type="checkbox"
        id="subscribed-checkbox"
        name="subscribed-checkbox"
        className="h-fit !ml-2 text-primary"
        onClick={(e) => {
          setFilterSubscribed((e.target as HTMLInputElement)?.checked);
          if ((e.target as HTMLInputElement)?.checked) {
            push(`/home/search?query=${query.query}&status=subscribed`);
          } else {
            push(`/home/search?query=${query.query}`);
          }
        }}
        defaultChecked={
          query.status !== undefined && query.status === "subscribed"
        }
      />
    );
  }, [push, query]);

  return (
    <>
      <Head>
        <title>Search &quot;{query.query}&quot; | APIcally</title>
      </Head>
      <Layout
        extraLeft={
          <div className="ml-0 md:ml-4 mt-4 md:mt-0">
            <Form className="flex items-center">
              <Input
                borderRadius="bottomLeft"
                type="text"
                id="home-search-input"
                placeholder="Search or jump to..."
                className="!font-normal !placeholder:font-normal"
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button
                borderRadius="right"
                label={<SearchOutlined />}
                className="h-9 flex justify-center items-center text-lg p-2"
                onClick={() => {
                  if (searchQuery) {
                    if (query.status !== undefined && query.status === "subscribed") {
                      push(`/home/search?query=${searchQuery}&status=subscribed`);
                    } else {
                      push(`/home/search?query=${searchQuery}`);
                    }
                  }
                }}
              />
            </Form>
          </div>
        }
      >
        {query.query && (
          <div>Showing 10 results for &quot;{query.query}&quot;</div>
        )}
        <div className="flex flex-col items-center gap-4 mt-4 md:mt-8 w-full md:w-2/3 m-auto">
          <div className="self-end flex items-center">
            <label htmlFor="subscribed-checkbox">Subscribed</label>
            {renderAntCheckbox}
          </div>
          {filterSubscribed
            ? apiReposData
                .filter((a) => a.subscribeStatus)
                .map((a) => (
                  <ApiRepo key={a.alias} data={a} className="w-full" />
                ))
            : apiReposData.map((a) => (
                <ApiRepo key={a.alias} data={a} className="w-full" />
              ))}
          <Pagination className="self-end" />
        </div>
      </Layout>
    </>
  );
};

export default SearchResultPage;
