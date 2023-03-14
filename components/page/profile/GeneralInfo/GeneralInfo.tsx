import {
  CheckCircleTwoTone,
  CodeTwoTone,
  EnvironmentTwoTone,
  MailTwoTone,
  StarTwoTone,
  UserOutlined,
} from "@ant-design/icons";
import { Avatar, Col, Divider, Row, Tooltip, Typography } from "antd";
import { useAuthContext } from "../../../../context/auth";
import { Button } from "../../../Button";
import { Card } from "../../../Card";
import { GitHubGradient } from "../../../GradientIcons/GitHubGradient";
import { LinkedInGradient } from "../../../GradientIcons/LinkedInGradient";

export const GeneralInfo = () => {
  const { logout } = useAuthContext();

  return (
    <Card className="relative overflow-hidden" shadowSize="sm">
      <div className="h-32 bg-gradient-to-r from-primary to-sky-500" />
      <Card className="p-4 md:p-6">
        <Avatar
          size={92}
          className="!absolute top-10 md:top-[39px] border-4 border-white"
          icon={<UserOutlined size={64} />}
        />
        <Typography.Title level={3} className="!mb-0 !font-medium">
          Nam Nguyen Dinh
        </Typography.Title>
        <Typography.Text className="text-base">nguyend-nam</Typography.Text>
        <Typography.Paragraph className="mt-4 !text-slate-500">
          They say &quot;garbage can&quot;, not &quot;garbage cannot&quot;
        </Typography.Paragraph>

        <Divider
          className="!my-4 !mt-6 !text-slate-400 !text-sm !font-normal"
          orientation="left"
          orientationMargin={0}
        >
          General
        </Divider>

        <Row gutter={[0, 12]} className="overflow-auto">
          <Col span={8}>
            <div className="flex items-center gap-3 text-base">
              <Tooltip title="Owned APIs">
                <CodeTwoTone twoToneColor="#2D31FA" />
              </Tooltip>
              <span className="!text-sm">8</span>
            </div>
          </Col>
          <Col span={8}>
            <div className="flex items-center gap-3 text-base">
              <Tooltip title="Subscribed APIs">
                <CheckCircleTwoTone twoToneColor="#2D31FA" />
              </Tooltip>
              <span className="!text-sm">3</span>
            </div>
          </Col>
          <Col span={8}>
            <div className="flex items-center gap-3 text-base">
              <Tooltip title="Starred APIs">
                <StarTwoTone twoToneColor="#2D31FA" />
              </Tooltip>
              <span className="!text-sm">10</span>
            </div>
          </Col>
          <Col span={24}>
            <div className="flex items-center gap-3 text-base">
              <Tooltip title="Location">
                <EnvironmentTwoTone twoToneColor="#2D31FA" />
              </Tooltip>
              <span className="!text-sm">Ho Chi Minh city, Vietnam</span>
            </div>
          </Col>
          <Col span={24}>
            <div className="flex items-center gap-3 text-base">
              <Tooltip title="Mail">
                <MailTwoTone twoToneColor="#2D31FA" />
              </Tooltip>
              <span className="!text-sm">
                <a
                  className="text-black"
                  href="mailto:nam.nguyen.2003@hcmut.edu.vn"
                >
                  nam.nguyen.2003@hcmut.edu.vn
                </a>
              </span>
            </div>
          </Col>
        </Row>

        <Divider
          className="!my-4 !mt-6 !text-slate-400 !text-sm !font-normal"
          orientation="left"
          orientationMargin={0}
        >
          Links
        </Divider>

        <div className="flex gap-3">
          <a
            href="https://github.com/nguyend-nam"
            target="_blank"
            rel="noreferrer"
          >
            <GitHubGradient height={24} />
          </a>
          <a
            href="https://www.linkedin.com/in/nguyendinhnam0320/"
            target="_blank"
            rel="noreferrer"
          >
            <LinkedInGradient height={24} />
          </a>
        </div>

        <Divider
          className="!my-4 !mt-6 !text-slate-400 !text-sm !font-normal"
          orientation="left"
          orientationMargin={0}
        >
          Actions
        </Divider>

        <div className="flex gap-3 flex-col md:flex-row">
          <Button label="Edit" className="w-full !text-base" />
          <Button
            appearance="outline"
            label="Logout"
            className="w-full !text-base"
            onClick={logout}
          />
        </div>
      </Card>
    </Card>
  );
};
