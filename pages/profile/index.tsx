import { Card as AntCard, Col, Modal, Row } from "antd";
import Head from "next/head";
import { useState } from "react";
import { Input } from "../../components/Input";
import { Layout } from "../../components/Layout";
import { GeneralInfo } from "../../components/page/profile/GeneralInfo";
import { Text } from "../../components/Text";
import { SubscribedApiRepoList } from "../../components/ApiRepoList/SubscribedApiRepoList";
import { OwnedApiRepoList } from "../../components/ApiRepoList/OwnedApiRepoList";
import { Card } from "../../components/Card";
import { useIsMobile } from "../../hooks/useIsMobile";
import { AddedToCartApiRepoList } from "../../components/ApiRepoList/AddedToCartApiRepoList";
import { Button } from "../../components/Button";
import { apiRepoType } from "../explore";
import { useDisclosure } from "@dwarvesf/react-hooks";
import { renderSubscribeListConfirmation } from "../../utils";

export type tabTypes = "owned" | "subscribed";

const UserPage = () => {
  const [searchQuerySubscribed, setSearchQuerySubscribed] =
    useState<string>("");
  const [activeTabKey, setActiveTabKey] = useState<tabTypes>("owned");
  const isMobile = useIsMobile();
  const [selectedApiInCart, setSelectedApiInCart] = useState<apiRepoType[]>([]);
  const [isConfirmSubscribeLoading, setIsConfirmSubscribeLoading] =
    useState(false);

  const {
    isOpen: isSubscribeApisConfirmDialogOpen,
    onOpen: openSubscribeApisConfirmDialog,
    onClose: closeSubscribeApisConfirmDialog,
  } = useDisclosure();

  const onTabChange = (key: string) => {
    setActiveTabKey(key as tabTypes);
  };

  const tabList: { tab: any; key: tabTypes }[] = [
    {
      tab: (
        <Text as="h2" className="mb-0">
          Owned APIs
        </Text>
      ),
      key: "owned",
    },
    {
      tab: (
        <Text as="h2" className="mb-0">
          Subscribed APIs
        </Text>
      ),
      key: "subscribed",
    },
  ];

  const tabContentList: Record<tabTypes, any> = {
    owned: <OwnedApiRepoList searchQuery={searchQuerySubscribed} />,
    subscribed: <SubscribedApiRepoList searchQuery={searchQuerySubscribed} />,
  };

  return (
    <>
      <Head>
        <title>Profile | APIcally</title>
      </Head>

      <Layout hasSearch>
        <Row gutter={[20, 20]}>
          <Col span={24} xl={{ span: 8 }}>
            <GeneralInfo />
          </Col>
          <Col span={24} xl={{ span: 16 }}>
            <AntCard
              className="!border-none shadow !rounded-r-lg !rounded-bl-lg"
              headStyle={{ padding: isMobile ? "0 16px" : "0 24px" }}
              bodyStyle={{ padding: isMobile ? 16 : 24 }}
              tabList={tabList}
              activeTabKey={activeTabKey}
              onTabChange={onTabChange}
            >
              <Input
                type="text"
                id="home-search-input"
                placeholder={`Search ${activeTabKey} APIs...`}
                className="!font-normal !placeholder:font-normal mb-4"
                onChange={(e) => setSearchQuerySubscribed(e.target.value)}
              />
              {tabContentList[activeTabKey]}
            </AntCard>

            <Card shadowSize="sm" className="p-6 mt-5">
              <div className="flex items-center justify-between mb-4">
                <Text as="h2" className="text-lg">
                  APIs in cart
                </Text>
                <Button
                  label="Subscribe"
                  disabled={selectedApiInCart.length === 0}
                  onClick={openSubscribeApisConfirmDialog}
                />
              </div>
              <AddedToCartApiRepoList
                setSelectedApiInCart={setSelectedApiInCart}
              />
            </Card>
          </Col>
        </Row>
      </Layout>

      <Modal
        open={isSubscribeApisConfirmDialogOpen}
        onCancel={closeSubscribeApisConfirmDialog}
        footer={[
          <Button
            key="cancel"
            appearance="outline"
            label="Cancel"
            onClick={closeSubscribeApisConfirmDialog}
            className="mr-2"
          />,
          <Button
            key="subscribe"
            label="Subscribe"
            isLoading={isConfirmSubscribeLoading}
            onClick={() => {
              setIsConfirmSubscribeLoading(true);
              setTimeout(() => {
                closeSubscribeApisConfirmDialog();
                setIsConfirmSubscribeLoading(false);
              }, 1000);
            }}
          />,
        ]}
        centered
      >
        <Text className="text-lg pr-4">
          {renderSubscribeListConfirmation(selectedApiInCart)}
        </Text>
      </Modal>
    </>
  );
};

export default UserPage;
