import { Avatar, Empty, Spin, Tooltip } from "antd";
import { useFetchWithCache } from "../../../../hooks/useFetchWithCache";
import { client, GET_PATHS } from "../../../../libs/api";
import dayjs from "dayjs";
import { Text } from "../../../Text";
import { UserOutlined } from "@ant-design/icons";
import { useIsMobile } from "../../../../hooks/useIsMobile";
import cx from "classnames";
import { useMemo } from "react";

interface Props {
  alias: string;
}

export const ProjectSubscriber = ({ alias }: Props) => {
  const { data, loading } = useFetchWithCache(
    [GET_PATHS.GET_PROJECT_SUBSCRIBERS(alias)],
    () => client.getSubscribersOfProject(alias)
  );

  const isMobile = useIsMobile();

  const contentRenderer = useMemo(() => {
    if (loading) {
      return <Spin size="large" />;
    }
    if ((data?.data || []).length === 0) {
      return (
        <div className="w-full flex justify-center">
          <Empty description="No one has subscribed to this API" />
        </div>
      );
    }
    return (
      <div className="flex gap-4 max-w-full flex-wrap">
        {(data?.data || []).map((subscriber) => {
          return (
            <Tooltip
              key={subscriber.username}
              title={
                <>
                  Subscription expires at{" "}
                  <b>
                    {dayjs(new Date(subscriber.expiredDate)).format(
                      "DD/MMM/YYYY, HH:mm:ss"
                    )}
                  </b>
                </>
              }
            >
              {/* <Button> */}
              <div
                className={cx("flex flex-col items-center gap-2 w-[60px]", {
                  "w-[60px]": !isMobile,
                  "w-[52px]": isMobile,
                })}
              >
                <Avatar
                  size={isMobile ? 44 : 52}
                  icon={<UserOutlined />}
                  className="!bg-slate-300"
                />
                <Text className="w-full truncate !m-0 text-center">
                  {subscriber.username}
                </Text>
              </div>
              {/* </Button> */}
            </Tooltip>
          );
        })}
      </div>
    );
  }, [data?.data, isMobile, loading]);

  return <div>{contentRenderer}</div>;
};
