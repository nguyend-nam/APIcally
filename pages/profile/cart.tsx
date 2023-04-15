import { Modal, Typography } from "antd";
import Head from "next/head";
import { AddedToCartApiRepoList } from "../../components/ApiRepoList/AddedToCartApiRepoList";
import { Button } from "../../components/Button";
import { Card } from "../../components/Card";
import { Layout } from "../../components/Layout";
import { Text } from "../../components/Text";
import { apiRepoType } from "../explore";
import { useDisclosure } from "@dwarvesf/react-hooks";
import { renderSubscribeListConfirmation } from "../../utils";
import { useEffect, useState } from "react";
import { MinusCircleOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { APICALLY_KEY, useAuthContext } from "../../context/auth";
import { useRouter } from "next/router";
import { ROUTES } from "../../constants/routes";

const CartPage = () => {
  const [selectedApiInCart, setSelectedApiInCart] = useState<apiRepoType[]>([]);
  const [isConfirmSubscribeLoading, setIsConfirmSubscribeLoading] =
    useState(false);
  const [isConfirmRemoveLoading, setIsConfirmRemoveLoading] = useState(false);
  const { isAuthenticated, logout } = useAuthContext();
  const { replace } = useRouter();

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
    isOpen: isSubscribeApisConfirmDialogOpen,
    onOpen: openSubscribeApisConfirmDialog,
    onClose: closeSubscribeApisConfirmDialog,
  } = useDisclosure();

  const {
    isOpen: isRemoveApisConfirmDialogOpen,
    onOpen: openRemoveApisConfirmDialog,
    onClose: closeRemoveApisConfirmDialog,
  } = useDisclosure();

  return (
    <>
      <Head>
        <title>Cart | APIcally</title>
      </Head>

      {isAuthenticated ? (
        <Layout>
          <Typography.Title level={3} className="!text-xl md:!text-2xl !mb-2">
            Cart
          </Typography.Title>
          <div className="mb-4">APIs added to cart</div>
          <Card shadowSize="sm" className="p-4 md:p-6">
            <div className="flex flex-row items-center justify-start md:justify-end mb-4 gap-2">
              <div className="flex items-center justify-between gap-2 flex-wrap">
                <Button
                  label={
                    <div className="flex gap-2 items-center">
                      <PlusCircleOutlined />
                      Subscribe
                    </div>
                  }
                  disabled={selectedApiInCart.length === 0}
                  onClick={openSubscribeApisConfirmDialog}
                />
                <Button
                  appearance="outline"
                  label={
                    <div className="flex gap-2 items-center">
                      <MinusCircleOutlined />
                      Remove
                    </div>
                  }
                  disabled={selectedApiInCart.length === 0}
                  onClick={openRemoveApisConfirmDialog}
                />
              </div>
            </div>
            <AddedToCartApiRepoList
              setSelectedApiInCart={setSelectedApiInCart}
            />
          </Card>
        </Layout>
      ) : null}

      {/* Subscribe modal */}
      {isSubscribeApisConfirmDialogOpen ? (
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
            {renderSubscribeListConfirmation(selectedApiInCart, "subscribe")}
          </Text>
        </Modal>
      ) : null}

      {/* Remove modal */}
      {isRemoveApisConfirmDialogOpen ? (
        <Modal
          open={isRemoveApisConfirmDialogOpen}
          onCancel={closeRemoveApisConfirmDialog}
          footer={[
            <Button
              key="cancel"
              appearance="outline"
              label="Cancel"
              onClick={closeRemoveApisConfirmDialog}
              className="mr-2"
            />,
            <Button
              key="remove"
              label="Remove"
              isLoading={isConfirmRemoveLoading}
              onClick={() => {
                setIsConfirmRemoveLoading(true);
                setTimeout(() => {
                  closeRemoveApisConfirmDialog();
                  setIsConfirmRemoveLoading(false);
                }, 1000);
              }}
            />,
          ]}
          centered
        >
          <Text className="text-lg pr-4">
            {renderSubscribeListConfirmation(selectedApiInCart, "remove")}
          </Text>
        </Modal>
      ) : null}
    </>
  );
};

export default CartPage;
