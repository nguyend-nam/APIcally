import { Modal, notification, Typography } from "antd";
import Head from "next/head";
import { AddedToCartApiRepoList } from "../../components/ApiRepoList/AddedToCartApiRepoList";
import { Button } from "../../components/Button";
import { Card } from "../../components/Card";
import { Layout } from "../../components/Layout";
import { Text } from "../../components/Text";
// import { apiRepoType } from "../explore";
import { useDisclosure } from "@dwarvesf/react-hooks";
import { useEffect, useState } from "react";
import { MinusCircleOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { APICALLY_KEY, useAuthContext } from "../../context/auth";
import { useRouter } from "next/router";
import { ROUTES } from "../../constants/routes";
import { ProjectInCartItem } from "../../libs/types";
import { client, GET_PATHS } from "../../libs/api";
import { useFetchWithCache } from "../../hooks/useFetchWithCache";

const CartPage = () => {
  const [selectedApiInCart, setSelectedApiInCart] = useState<
    ProjectInCartItem[]
  >([]);
  const [isConfirmSubscribeLoading, setIsConfirmSubscribeLoading] =
    useState(false);
  const [isConfirmRemoveLoading, setIsConfirmRemoveLoading] = useState(false);
  const { isAuthenticated, logout, user, mutateData } = useAuthContext();
  const { replace } = useRouter();

  const { data, loading, mutate } = useFetchWithCache(
    [GET_PATHS.GET_PROJECTS_IN_CART],
    () => client.getProjectsInCart()
  );

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

  useEffect(() => {
    if (!(selectedApiInCart || []).length) {
      closeSubscribeApisConfirmDialog();
      closeRemoveApisConfirmDialog();
    }
  }, [
    closeRemoveApisConfirmDialog,
    closeSubscribeApisConfirmDialog,
    selectedApiInCart,
  ]);

  const subscribeToProjectsSubmit = async () => {
    let totalPrice = 0;
    selectedApiInCart.forEach((a) => {
      totalPrice += a.price * a.days;
    });

    if (user?.balance !== undefined && user?.balance < totalPrice) {
      notification.error({
        message: "Your balance is not enough",
      });
      return;
    } else {
      setIsConfirmSubscribeLoading(true);
      (selectedApiInCart || []).forEach(async (api, index) => {
        try {
          const res = await client.subscribeToAProject(
            api.apiId.split("/")?.[0] || "-",
            api.apiId.split("/")?.[1] || "-",
            api.days
          );

          if (!res?.data) {
            notification.error({
              message: `Could not subscribe to ${
                (selectedApiInCart || []).length > 1 ? "APIs" : "API"
              }`,
            });
          }
        } catch (error) {
          notification.error({
            message:
              (error as any) ||
              `Could not subscribe to ${
                (selectedApiInCart || []).length > 1 ? "APIs" : "API"
              }`,
          });
          console.error(error);
        }

        if (index === (selectedApiInCart || []).length - 1) {
          setIsConfirmSubscribeLoading(false);
          await mutate();
          await mutateData();
        }
      });
    }
  };

  const removeProjectsFromCartSubmit = async () => {
    setIsConfirmRemoveLoading(true);
    (selectedApiInCart || []).forEach(async (api, index) => {
      try {
        const res = await client.removeProjectFromCart(
          api.apiId.split("/")?.[0] || "-",
          api.apiId.split("/")?.[1] || "-"
        );

        if (!res?.data) {
          notification.error({
            message: `Could not remove ${
              (selectedApiInCart || []).length > 1 ? "APIs" : "API"
            }`,
          });
        }
      } catch (error) {
        notification.error({
          message:
            (error as any) ||
            `Could not remove ${
              (selectedApiInCart || []).length > 1 ? "APIs" : "API"
            }`,
        });
        console.error(error);
      }

      if (index === (selectedApiInCart || []).length - 1) {
        setIsConfirmRemoveLoading(false);
        await mutate();
      }
    });
  };

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
              data={data}
              loading={loading}
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
              onClick={subscribeToProjectsSubmit}
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
              onClick={removeProjectsFromCartSubmit}
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

export const renderSubscribeListConfirmation = (
  apiList: ProjectInCartItem[],
  func: "subscribe" | "remove"
) => {
  if (apiList.length === 0) return;
  if (apiList.length === 1) {
    return (
      <>
        Are you sure you want to{" "}
        {func === "subscribe" ? "subscribe to" : "remove"}{" "}
        <b>{apiList[0]?.apiId || "-"}</b>.
      </>
    );
  }

  const nameList = apiList.map((a) => a?.apiId || "-");

  return (
    <>
      Are you sure you want to{" "}
      {func === "subscribe" ? "subscribe to" : "remove"}{" "}
      {nameList.slice(0, apiList.length - 1).map((n, i) => (
        <>
          <b key={n}>{n}</b>
          {i < nameList.length - 2 ? ", " : ""}
        </>
      ))}{" "}
      and <b>{apiList[apiList.length - 1]?.apiId || "-"}</b>.
    </>
  );
};

export default CartPage;
