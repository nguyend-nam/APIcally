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
import { useState } from "react";

const CartPage = () => {
  const [selectedApiInCart, setSelectedApiInCart] = useState<apiRepoType[]>([]);
  const [isConfirmSubscribeLoading, setIsConfirmSubscribeLoading] =
    useState(false);
  const [isConfirmRemoveLoading, setIsConfirmRemoveLoading] = useState(false);

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

      <Layout>
        <Typography.Title level={3} className="!text-xl md:!text-2xl !mb-2">
          Cart
        </Typography.Title>
        <div className="mb-4">APIs added to cart</div>
        <Card shadowSize="sm" className="p-4 md:p-6">
          <div className="flex flex-row items-center justify-start md:justify-end mb-4 gap-2">
            <div className="flex items-center justify-between gap-2 flex-wrap">
              <Button
                label="Subscribe"
                disabled={selectedApiInCart.length === 0}
                onClick={openSubscribeApisConfirmDialog}
              />
              <Button
                appearance="outline"
                label="Remove from cart"
                disabled={selectedApiInCart.length === 0}
                onClick={openRemoveApisConfirmDialog}
              />
            </div>
          </div>
          <AddedToCartApiRepoList setSelectedApiInCart={setSelectedApiInCart} />
        </Card>
      </Layout>

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
