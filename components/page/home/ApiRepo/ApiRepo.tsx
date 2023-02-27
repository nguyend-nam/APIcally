import {
  BookOutlined,
  UserAddOutlined,
  StarOutlined,
  KeyOutlined,
} from "@ant-design/icons";
import { truncate } from "@dwarvesf/react-utils";
import { Divider, Tooltip, Typography } from "antd";
import { useRouter } from "next/router";
import { apiRepoType } from "../../../../constants/mockData";
import { ROUTES } from "../../../../constants/routes";
import { formatCurrency } from "../../../../utils/currency";
import { Card } from "../../../Card";
import { TagsArray } from "../../../TagsArray";

export const ApiRepo = ({
  data,
  className,
  hasShadow = true,
}: {
  data: apiRepoType;
  className?: string;
  hasShadow?: boolean;
}) => {
  const { push } = useRouter();

  return (
    <Card
      shadowSize="md"
      className={`bg-white p-4 ${className}`}
      hasShadow={hasShadow}
    >
      <div className="flex justify-between gap-8">
        <Typography.Title
          level={4}
          className="!m-0 !mb-2 flex items-center !text-lg md:!text-xl"
        >
          <a
            className="!text-primary flex items-center"
            onClick={() => {
              if (data?.username && data?.alias) {
                push(
                  ROUTES.API_WORKSPACE_API_DETAIL(data.username, data.alias)
                );
              }
            }}
          >
            <BookOutlined className="text-base !text-gray-400 mr-1" />
            {data.name}
          </a>
          {data.subscribeStatus && (
            <Tooltip title="Subscribed" className="ml-1">
              <KeyOutlined className="text-base !text-green-500 mr-1" />
            </Tooltip>
          )}
        </Typography.Title>

        <div className="flex gap-4">
          {data.statistics?.subscribes ? (
            <Tooltip
              placement="left"
              title="Subscribers"
              className="flex flex-col items-center w-6 h-max"
            >
              <UserAddOutlined className="text-xl !text-indigo-400" />
              <div>{data.statistics.subscribes}</div>
            </Tooltip>
          ) : null}

          {data.statistics?.starGazers ? (
            <Tooltip
              placement="left"
              title="Stars"
              className="flex flex-col items-center w-6 h-max"
            >
              <StarOutlined className="text-xl !text-amber-300" />
              <div>{data.statistics.starGazers}</div>
            </Tooltip>
          ) : null}
        </div>
      </div>

      <TagsArray tags={data.tags || []} visibleTagsCount={2} />

      <div className="!mt-2 h-6 relative flex items-center">
        <a className="!font-normal absolute !text-sm md:!text-base bg-white pr-2 !text-slate-600">
          {data.author}
        </a>
        <Divider className="!my-2" />
      </div>

      <Typography.Paragraph className="!text-slate-500 !m-0 !my-2">
        <p>{truncate(data.description || "", 100)}</p>
      </Typography.Paragraph>

      <div className="!text-base md:!text-lg font-semibold text-white rounded-r-xl rounded-l -ml-5 pr-3 pl-5 py-1 bg-gradient-to-r from-indigo-500 to-sky-400 w-max">
        {data.statistics?.price
          ? formatCurrency(data.statistics?.price)
          : "Free"}
      </div>
    </Card>
  );
};
