import { Col, Row } from "antd";
import Head from "next/head";
import { useEffect, useMemo, useState } from "react";
import { Layout } from "../../components/Layout";
import { GeneralInfo } from "../../components/page/profile/GeneralInfo";
import { Text } from "../../components/Text";
import { APICALLY_KEY, useAuthContext } from "../../context/auth";
import { useRouter } from "next/router";
import { ROUTES } from "../../constants/routes";
import { Card } from "../../components/Card";
import { RowItem } from "../../components/page/profile/RowItem";
import { Button } from "../../components/Button";
import { LeftOutlined } from "@ant-design/icons";
import { ChangePasswordForm } from "../../components/page/profile/ChangePasswordForm";

export type stepTypes = "main" | "change-password";

const UserSettingsPage = () => {
  const { replace } = useRouter();
  const { isAuthenticated, logout } = useAuthContext();
  const [step, setStep] = useState<stepTypes>("main");

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

  const renderStep = useMemo(() => {
    if (step === "main") {
      return (
        <Card shadowSize="sm" className="p-4">
          <Text as="h2" className="text-lg">
            General
          </Text>
          <RowItem
            title="Change password"
            onClick={() => setStep("change-password")}
          />
        </Card>
      );
    }
    return (
      <Card shadowSize="sm" className="p-4">
        <div className="flex items-center gap-2 mb-2">
          <Button
            appearance="link"
            className="!p-0 !mb-1.5 !text-base !text-slate-400"
            label={<LeftOutlined />}
            onClick={() => setStep("main")}
          />
          <Text as="h2" className="text-lg !m-0">
            Change password
          </Text>
        </div>
        <ChangePasswordForm />
      </Card>
    );
  }, [step]);

  return (
    <>
      <Head>
        <title>Settings | APIcally</title>
      </Head>

      {isAuthenticated ? (
        <Layout pageTitle="Settings">
          <Row gutter={[20, 20]}>
            <Col span={24} xl={{ span: 8 }}>
              <GeneralInfo
                className="block md:sticky md:top-[96px]"
                showActions={false}
              />
            </Col>
            <Col span={24} xl={{ span: 16 }}>
              {renderStep}
            </Col>
          </Row>
        </Layout>
      ) : null}
    </>
  );
};

export default UserSettingsPage;
