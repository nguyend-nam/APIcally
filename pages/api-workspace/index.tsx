import { Button } from "../../components/Button";
import { Layout } from "../../components/Layout";
import { Modal, Typography } from "antd";
import { Card } from "../../components/Card";
import { Input } from "../../components/Input";
import { useRouter } from "next/router";
import Head from "next/head";
import { useEffect, useState } from "react";
import { Text } from "../../components/Text";
import { useDisclosure } from "@dwarvesf/react-hooks";
import { ROUTES } from "../../constants/routes";
import { SubscribedApiRepoList } from "../../components/ApiRepoList/SubscribedApiRepoList";
import { APICALLY_KEY, useAuthContext } from "../../context/auth";

const CodeEditorPage = () => {
  const { push, replace } = useRouter();
  const [searchQuerySubscribed, setSearchQuerySubscribed] =
    useState<string>("");
  const { isAuthenticated, logout } = useAuthContext();

  useEffect(() => {
    if (!isAuthenticated) {
      replace(ROUTES.LOGIN);
    }
  }, [isAuthenticated, replace]);

  useEffect(() => {
    const value =
      typeof window !== "undefined"
        ? window.localStorage.getItem(APICALLY_KEY)
        : undefined;

    if (!value) {
      logout();
    }
  }, [logout]);

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

      {isAuthenticated ? (
        <Layout hasSearch>
          <div className="flex flex-col items-center">
            <Typography.Title
              level={5}
              className="text-center !text-lg !font-normal"
            >
              Select an API to utilize or create your own
            </Typography.Title>
            <div className="flex gap-5 mt-2 lg:mt-4 justify-center flex-wrap lg:flex-nowrap">
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
                    Implement your algorithms in Python, then submit to the
                    server to generate the API.
                  </div>
                </div>
                <Button
                  label="Start creating"
                  onClick={() => push(ROUTES.API_WORKSPACE_CREATE)}
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
                      className="!bg-slate-100 !text-slate-400"
                      label="Search subscribed APIs..."
                      onClick={openSearchSubscribedAPIsDialog}
                    />
                  </div>
                  <div className="text-lg text-slate-500 my-2">or</div>
                  <Button
                    type="submit"
                    label="View subscribed APIs"
                    onClick={() => {
                      push(ROUTES.PROFILE);
                    }}
                  />
                </Card>
              </div>
            </div>
          </div>
        </Layout>
      ) : null}

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
          <SubscribedApiRepoList
            searchQuery={searchQuerySubscribed}
            showSummary={false}
            showOwnedAPIs
          />
        </Modal>
      )}
    </>
  );
};

export default CodeEditorPage;
