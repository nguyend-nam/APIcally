import {
  CheckCircleTwoTone,
  CodeTwoTone,
  // EnvironmentTwoTone,
  // MailTwoTone,
  StarTwoTone,
  UserOutlined,
} from "@ant-design/icons";
import { Avatar, Col, Divider, Row, Tooltip, Typography } from "antd";
import { useAuthContext } from "../../../../context/auth";
import { Button } from "../../../Button";
import { Card } from "../../../Card";
import cx from "classnames";
import { useRouter } from "next/router";
import { ROUTES } from "../../../../constants/routes";
// import { GitHubGradient } from "../../../GradientIcons/GitHubGradient";
// import { LinkedInGradient } from "../../../GradientIcons/LinkedInGradient";

interface Props {
  username?: string;
  fullname?: string;
  showActions?: boolean;
  className?: string;
}

export const GeneralInfo = ({
  username,
  fullname,
  showActions = true,
  className,
}: Props) => {
  const { logout, user, isAuthenticated } = useAuthContext();
  const { push } = useRouter();

  return (
    <Card className={cx("relative overflow-hidden", className)} shadowSize="sm">
      <div
        className="h-32 bg-cover bg-right"
        style={{ backgroundImage: `url(/img/cart-checkbox-all-bg.png)` }}
      />
      <Card className="p-4 md:p-6">
        <Avatar
          size={92}
          className="!absolute top-10 md:top-[39px] border-4 border-white !bg-slate-300"
          icon={<UserOutlined size={64} />}
        />
        <Typography.Title level={3} className="!mb-0 !font-medium">
          {fullname || user?.username || "-"}
        </Typography.Title>
        <Typography.Text className="text-base">
          {username || user?.username || "-"}
        </Typography.Text>

        {isAuthenticated ? (
          <Button
            appearance="outline"
            label="Top up"
            className="w-full !text-base mt-4"
            onClick={() => push(ROUTES.TOP_UP)}
          />
        ) : null}

        <Divider
          className="!my-4 !mt-6 !text-slate-500 !text-sm !font-normal"
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
          {/* <Col span={24}>
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
          </Col> */}
        </Row>

        {/* <Divider
          className="!my-4 !mt-6 !text-slate-500 !text-sm !font-normal"
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
        </div> */}

        {showActions ? (
          <>
            <Divider
              className="!my-4 !mt-6 !text-slate-500 !text-sm !font-normal"
              orientation="left"
              orientationMargin={0}
            >
              Actions
            </Divider>

            <div className="flex gap-3 flex-col md:flex-row">
              <Button
                label="Settings"
                className="w-full !text-base"
                onClick={() => push(ROUTES.SETTINGS)}
              />
              <Button
                appearance="outline"
                label="Logout"
                className="w-full !text-base"
                onClick={logout}
              />
            </div>
          </>
        ) : null}
      </Card>
    </Card>
  );
};
