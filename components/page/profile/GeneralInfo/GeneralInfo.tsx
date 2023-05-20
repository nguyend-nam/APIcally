import {
  CheckCircleTwoTone,
  CodeTwoTone,
  StarTwoTone,
  UserOutlined,
} from "@ant-design/icons";
import { Avatar, Col, Divider, Row, Typography } from "antd";
import { useAuthContext } from "../../../../context/auth";
import { Button } from "../../../Button";
import { Card } from "../../../Card";
import cx from "classnames";
import { useRouter } from "next/router";
import { ROUTES } from "../../../../constants/routes";
import { useMemo } from "react";
import { UserInfoData } from "../../../../libs/types";
import { Text } from "../../../Text";
import Link from "next/link";

interface Props {
  showActions?: boolean;
  userData?: UserInfoData;
  className?: string;
}

export const GeneralInfo = ({
  showActions = true,
  userData,
  className,
}: Props) => {
  const { logout, user, isAuthenticated } = useAuthContext();
  const router = useRouter();

  const internalUserInfo = useMemo(() => {
    return userData || user;
  }, [user, userData]);

  const isPersonal = useMemo(() => {
    return isAuthenticated && user && router.pathname.includes(ROUTES.PROFILE);
  }, [isAuthenticated, router.pathname, user]);

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
          {isPersonal
            ? internalUserInfo?.username || "-"
            : router.query?.username || "-"}
        </Typography.Title>

        {isPersonal ? (
          <Button
            appearance="outline"
            label="Top up"
            className="w-full !text-base mt-4"
            onClick={() => router.push(ROUTES.TOP_UP)}
          />
        ) : null}

        <Divider
          className="!my-4 !mt-6 !text-slate-500 !text-sm !font-normal"
          orientation="left"
          orientationMargin={0}
        >
          General
        </Divider>

        <Row gutter={[12, 12]} className="overflow-auto">
          <Col span={24}>
            <div className="flex items-center justify-between gap-3 text-base">
              <div className="flex items-center gap-2 shrink-0">
                <CodeTwoTone twoToneColor="#2D31FA" />
                <Text className="text-sm text-slate-400 !m-0">
                  Created APIs
                </Text>
              </div>
              <span className="!text-sm text-right">
                {internalUserInfo?.owned || 0}
              </span>
            </div>
          </Col>
          <Col span={24}>
            <div className="flex items-center justify-between gap-3 text-base">
              <div className="flex items-center gap-2 shrink-0">
                <CheckCircleTwoTone twoToneColor="#2D31FA" />
                <Text className="text-sm text-slate-400 !m-0">
                  Subscribed APIs
                </Text>
              </div>
              <span className="!text-sm text-right">
                {internalUserInfo?.subscribed || 0}
              </span>
            </div>
          </Col>
          {internalUserInfo?.bestRate && internalUserInfo?.bestRate.alias ? (
            <Col span={24}>
              <div className="flex items-center justify-between gap-3 text-base">
                <div className="flex items-center gap-2 shrink-0">
                  <StarTwoTone twoToneColor="#2D31FA" />
                  <Text className="text-sm text-slate-400 !m-0">
                    Starred APIs
                  </Text>
                </div>
                <Link
                  href={ROUTES.API_WORKSPACE_API_DETAIL(
                    internalUserInfo.username,
                    internalUserInfo?.bestRate.alias
                  )}
                  className="!text-sm text-right"
                >
                  <a>
                    {internalUserInfo.username}/
                    {internalUserInfo?.bestRate.alias}
                  </a>
                </Link>
              </div>
            </Col>
          ) : null}
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
                onClick={() => router.push(ROUTES.SETTINGS)}
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
