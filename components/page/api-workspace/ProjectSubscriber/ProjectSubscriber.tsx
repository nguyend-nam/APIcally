import { Avatar, Spin, Tooltip } from "antd";
import { useFetchWithCache } from "../../../../hooks/useFetchWithCache";
import { client, GET_PATHS } from "../../../../libs/api";
import dayjs from "dayjs";
import { Text } from "../../../Text";
import { UserOutlined } from "@ant-design/icons";
import { useIsMobile } from "../../../../hooks/useIsMobile";
import cx from "classnames";

interface Props {
  alias: string;
}

export const ProjectSubscriber = ({ alias }: Props) => {
  const { data, loading } = useFetchWithCache(
    [GET_PATHS.GET_PROJECT_SUBSCRIBERS(alias)],
    () => client.getSubscribersOfProject(alias)
  );

  const isMobile = useIsMobile();

  return (
    <div>
      {loading ? (
        <Spin size="large" />
      ) : (
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
      )}
    </div>
  );
};
