import { Button } from "../../components/Button";
import { Layout } from "../../components/Layout";
import { Empty, Modal, Typography } from "antd";
import { Card } from "../../components/Card";
import { Input } from "../../components/Input";
import { useRouter } from "next/router";
import Head from "next/head";
import { useState } from "react";
import { Text } from "../../components/Text";
import { ApiRepo } from "../../components/page/home/ApiRepo";
import { apiReposData } from "../../constants/mockData";
import { useDisclosure } from "@dwarvesf/react-hooks";

const CodeEditorPage = () => {
  const { push } = useRouter();
  const [searchQuerySubscribed, setSearchQuerySubscribed] =
    useState<string>("");

  const {
    isOpen: isSearchSubscribedAPIsDialogOpen,
    onOpen: openSearchSubscribedAPIsDialog,
    onClose: closeSearchSubscribedAPIsDialog,
  } = useDisclosure();

  return (
    <>
      <Head>
        <title>API workspace | APIcally</title>
      </Head>
      <Layout>
        <div className="flex flex-col items-center">
          <Typography.Title level={4} className="text-center">
            Select an API to utilize or create your own
          </Typography.Title>
          <div className="flex gap-4 mt-2 lg:mt-4 justify-center flex-wrap lg:flex-nowrap">
            <Card
              shadowSize="md"
              className="bg-white p-8 w-full lg:w-[330px] h-max lg:h-[400px] flex flex-col items-center justify-between gap-10"
              style={{
                backgroundImage: "url(img/api-workspace-create.png)",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center right",
                backgroundSize: "cover",
              }}
            >
              <div className="flex flex-col items-center">
                <Typography.Text className="!text-primary font-semibold text-xl mb-4 text-center">
                  Create your own API
                </Typography.Text>
                <div className="text-lg text-slate-600 text-center">
                  Implement your algorithms in Python, then submit to the server
                  to generate the API.
                </div>
              </div>
              <Button
                label="Start creating"
                className="text-lg py-1 px-2"
                onClick={() => push("/api-workspace/code-editor")}
              />
            </Card>
            <div className="w-full lg:w-[330px]">
              <Card
                shadowSize="md"
                className="bg-white p-8 h-max lg:h-[400px] flex flex-col items-center"
                style={{
                  backgroundImage: "url(img/api-workspace-utilize.png)",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center right",
                  backgroundSize: "cover",
                }}
              >
                <div className="flex flex-col items-center">
                  <Typography.Text className="!text-primary font-semibold text-xl mb-4 text-center">
                    Utilize your subscribed APIs
                  </Typography.Text>
                  <Button
                    className="p-2 py-1 text-lg !bg-slate-100 !text-slate-400"
                    label="Search subscribed APIs..."
                    onClick={openSearchSubscribedAPIsDialog}
                  />
                </div>
                <div className="text-lg text-slate-500 my-2">or</div>
                <Button
                  type="submit"
                  label="View subscribed APIs"
                  className="text-lg py-1 px-2"
                  onClick={() => {
                    push("/profile/apis");
                  }}
                />
              </Card>
            </div>
          </div>
        </div>
      </Layout>
      {isSearchSubscribedAPIsDialogOpen && (
        <Modal
          open={isSearchSubscribedAPIsDialogOpen}
          onCancel={closeSearchSubscribedAPIsDialog}
          footer={null}
        >
          <Text as="h2" className="text-lg">
            Subscribed APIs
          </Text>
          <Input
            type="text"
            id="home-search-input"
            placeholder="Search subscribed APIs..."
            className="!font-normal !placeholder:font-normal mb-4"
            onChange={(e) => setSearchQuerySubscribed(e.target.value)}
          />
          <div className="h-[350px] overflow-auto">
            {searchQuerySubscribed ? (
              apiReposData.filter(
                (a) =>
                  a.subscribeStatus &&
                  (a.alias.includes(searchQuerySubscribed) ||
                    a.name.includes(searchQuerySubscribed) ||
                    a.author.includes(searchQuerySubscribed) ||
                    a.description.includes(searchQuerySubscribed) ||
                    a.username.includes(searchQuerySubscribed))
              ).length ? (
                apiReposData
                  .filter(
                    (a) =>
                      a.subscribeStatus &&
                      (a.alias.includes(searchQuerySubscribed) ||
                        a.name.includes(searchQuerySubscribed) ||
                        a.author.includes(searchQuerySubscribed) ||
                        a.description.includes(searchQuerySubscribed) ||
                        a.username.includes(searchQuerySubscribed))
                  )
                  .map((a) => <ApiRepo key={a.id} data={a} hasShadow={false} />)
              ) : (
                <div className="h-full flex flex-col justify-center">
                  <Empty
                    description={
                      <Text as="div" className="text-base">
                        No subscribed APIs found with keyword &quot;
                        {searchQuerySubscribed}&quot;
                      </Text>
                    }
                  />
                </div>
              )
            ) : (
              apiReposData
                .filter((a) => a.subscribeStatus)
                .map((a) => <ApiRepo key={a.id} data={a} hasShadow={false} />)
            )}
          </div>
        </Modal>
      )}
    </>
  );
};

export default CodeEditorPage;
