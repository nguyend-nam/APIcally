import { useMemo, useState } from "react";
import { Text } from "../../../../components/Text";
import { Card } from "../../../../components/Card";
import { RowItem } from "../../../../components/page/profile/RowItem";
import { Button } from "../../../../components/Button";
import { LeftOutlined } from "@ant-design/icons";
import { ChangePasswordForm } from "../../../../components/page/profile/ChangePasswordForm";

export type stepTypes = "main" | "change-password";

export const UserSettings = () => {
  const [step, setStep] = useState<stepTypes>("main");

  const renderStep = useMemo(() => {
    if (step === "main") {
      return (
        <Card hasShadow={false} className="!p-4 md:!p-6 md:!pt-4">
          <Text as="h2" className="text-lg !m-0 !mb-4 md:!mb-6">
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
      <Card hasShadow={false} className="!p-4 md:!p-6 md:!pt-4">
        <div className="flex items-center gap-2 !mb-4 md:!mb-6">
          <Button
            appearance="link"
            className="!p-0 !mb-1.5 !text-base !text-slate-400"
            label={<LeftOutlined />}
            onClick={() => setStep("main")}
          />
          <Text as="h2" className="text-lg !m-0 capitalize">
            Change password
          </Text>
        </div>
        <ChangePasswordForm />
      </Card>
    );
  }, [step]);

  return renderStep;
};
