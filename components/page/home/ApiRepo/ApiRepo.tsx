import {
  BookOutlined,
  UserAddOutlined,
  PlaySquareOutlined,
  KeyOutlined,
} from "@ant-design/icons";
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
        <Typography.Title level={4} className="!m-0 !mb-2">
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
            {data.subscribeStatus && (
              <Tooltip title="Subscribed" className="ml-1">
                <KeyOutlined className="text-base !text-green-500 mr-1" />
              </Tooltip>
            )}
          </a>
          <a className="!font-normal !text-base !text-gray-600">
            {data.author}
          </a>
        </Typography.Title>

        <div className="flex gap-4">
          {data.statistics?.subscribes ? (
            <Tooltip
              placement="left"
              title="Subscribers"
              className="flex flex-col items-center w-6 h-max"
            >
              <UserAddOutlined className="text-xl !text-gray-400" />
              <div>{data.statistics.subscribes}</div>
            </Tooltip>
          ) : null}

          {data.statistics?.weeklyUtils ? (
            <Tooltip
              placement="left"
              title="Weekly utilizations"
              className="flex flex-col items-center w-6 h-max"
            >
              <PlaySquareOutlined className="text-xl !text-gray-400" />
              <div>{data.statistics.weeklyUtils}</div>
            </Tooltip>
          ) : null}
        </div>
      </div>

      <div className="flex justify-between items-center">
        <TagsArray tags={data.tags || []} visibleTagsCount={2} />
        <div className="!text-sm">
          {data.statistics?.price
            ? formatCurrency(data.statistics?.price)
            : "Free"}
        </div>
      </div>

      <Divider className="!my-1 !mt-3" />

      <Typography.Paragraph>
        <p className="text-gray-500 !m-0 !mt-2">{data.description}</p>
      </Typography.Paragraph>
    </Card>
  );
};
