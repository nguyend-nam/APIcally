import { Form, notification } from "antd";
import { Input } from "../../../../components/Input";
import { Button } from "../../../../components/Button";
import { client } from "../../../../libs/api";
import { useState } from "react";

export const ChangePasswordForm = () => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

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
    <div className="w-full p-4 sm:p-8 flex flex-col gap-4 justify-between bg-slate-50/50">
      <Form className="mb-2" onFinish={onSubmit}>
        <label htmlFor="old-password-input" className="text-lg text-primary">
          Old password
        </label>
        <Form.Item
          name="oldPassword"
          rules={[{ required: true, message: "Required" }]}
          className="mt-1 mb-4"
        >
          <Input
            type="text"
            id="old-password-input"
            fullWidth
            placeholder="Enter old password..."
          />
        </Form.Item>

        <label htmlFor="new-password-input" className="text-lg text-primary">
          New password
        </label>
        <Form.Item
          name="newPassword"
          rules={[{ required: true, message: "Required" }]}
          className="mt-1"
        >
          <Input
            type="new-password"
            id="new-password-input"
            fullWidth
            placeholder="Enter new password..."
          />
        </Form.Item>

        <div className="mt-5">
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
