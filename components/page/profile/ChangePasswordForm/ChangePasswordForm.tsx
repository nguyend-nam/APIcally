import { Form, notification } from "antd";
import { Input } from "../../../../components/Input";
import { Button } from "../../../../components/Button";
import { client } from "../../../../libs/api";
import { useState } from "react";
import { useAuthContext } from "../../../../context/auth";
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";

export const ChangePasswordForm = () => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [showOldPassword, setShowOldPassword] = useState<boolean>(false);
  const [showNewPassword, setShowNewPassword] = useState<boolean>(false);
  const { logout } = useAuthContext();

  const onSubmit = async (values: {
    oldPassword: string;
    newPassword: string;
  }) => {
    try {
      setIsSubmitting(true);
      const res = await client.changePassword(
        values.oldPassword,
        values.newPassword
      );
      if (res?.data) {
        notification.success({
          message: "Password changed successfully",
        });
        logout();
      }
    } catch (error: any) {
      notification.error({
        message: String(error) || "Could not change password",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full p-4 flex flex-col gap-4 justify-between bg-slate-50/50">
      <Form className="mb-2" onFinish={onSubmit}>
        <label htmlFor="old-password-input" className="text-lg text-primary">
          Old password
        </label>
        <div className="flex justify-between gap-2 items-center">
          <Form.Item
            name="oldPassword"
            rules={[{ required: true, message: "Required" }]}
            className="mt-1 mb-2 flex-1"
          >
            <Input
              type={showOldPassword ? "text" : "password"}
              id="old-password-input"
              fullWidth
              placeholder="Enter old password..."
            />
          </Form.Item>
          <Button
            type="button"
            appearance="link"
            className="!px-0 !py-0 mb-8"
            label={showOldPassword ? <EyeInvisibleOutlined /> : <EyeOutlined />}
            onClick={() => setShowOldPassword(!showOldPassword)}
          />
        </div>

        <label htmlFor="new-password-input" className="text-lg text-primary">
          New password
        </label>
        <div className="flex justify-between gap-2 items-center">
          <Form.Item
            name="newPassword"
            rules={[{ required: true, message: "Required" }]}
            className="flex-1"
          >
            <Input
              type={showNewPassword ? "text" : "password"}
              id="new-password-input"
              fullWidth
              placeholder="Enter new password..."
            />
          </Form.Item>
          <Button
            type="button"
            appearance="link"
            className="!px-0 !py-0 mb-8"
            label={showNewPassword ? <EyeInvisibleOutlined /> : <EyeOutlined />}
            onClick={() => setShowNewPassword(!showNewPassword)}
          />
        </div>

        <div className="mt-2">
          <Button
            label="Confirm"
            className="w-[125px]"
            type="submit"
            isLoading={isSubmitting}
          />
        </div>
      </Form>
    </div>
  );
};
