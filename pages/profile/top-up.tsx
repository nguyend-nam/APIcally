import { Col, Form, notification, Row } from "antd";
import Head from "next/head";
import { useEffect, useState } from "react";
import { Layout } from "../../components/Layout";
import { GeneralInfo } from "../../components/page/profile/GeneralInfo";
import { Text } from "../../components/Text";
import { APICALLY_KEY, useAuthContext } from "../../context/auth";
import { useRouter } from "next/router";
import { ROUTES } from "../../constants/routes";
import { Card } from "../../components/Card";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { client } from "../../libs/api";

export type stepTypes = "main" | "change-password";

const UserTopUpPage = () => {
  const { replace, push } = useRouter();
  const { isAuthenticated, logout } = useAuthContext();
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const onSubmit = async (values: { amount: number }) => {
    try {
      setIsSubmitting(true);
      const res = await client.topUp(values.amount);
      if (res?.data) {
        notification.success({
          message: "Top up successfully",
        });
        push(ROUTES.PROFILE);
      }
    } catch (error: any) {
      notification.error({
        message: String(error) || "Could not top up",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Head>
        <title>Top up | APIcally</title>
      </Head>

      {isAuthenticated ? (
        <Layout pageTitle="Top up">
          <Row gutter={[20, 20]}>
            <Col span={24} xl={{ span: 8 }}>
              <GeneralInfo className="block md:sticky md:top-[96px]" />
            </Col>
            <Col span={24} xl={{ span: 16 }}>
              <Card
                shadowSize="sm"
                className="p-4 flex flex-col items-center bg-cover bg-right"
                style={{
                  backgroundImage: `url(/img/api-status-bg.png)`,
                }}
              >
                <Text as="h2" className="text-lg text-center !m-0 capitalize">
                  Top up
                </Text>
                <Form
                  className="mt-2 flex flex-col items-center min-w-full md:min-w-[300px]"
                  onFinish={onSubmit}
                >
                  <label
                    htmlFor="amount-input"
                    className="text-lg text-primary w-full"
                  >
                    Amount
                  </label>
                  <div className="flex justify-between gap-2 items-center w-full">
                    <Form.Item
                      name="amount"
                      rules={[{ required: true, message: "Required" }]}
                      className="mt-1 flex-1"
                    >
                      <Input
                        type="number"
                        id="amount-input"
                        fullWidth
                        placeholder="Enter top up amount..."
                        max={100}
                        min={0}
                        step={0.1}
                        className="!ring-2 !ring-info"
                      />
                    </Form.Item>
                    <Text className="text-2xl font-light">$</Text>
                  </div>

                  <Button
                    label="Confirm"
                    className="w-[125px] mt-4"
                    type="submit"
                    isLoading={isSubmitting}
                  />
                </Form>
              </Card>
            </Col>
          </Row>
        </Layout>
      ) : null}
    </>
  );
};

export default UserTopUpPage;
