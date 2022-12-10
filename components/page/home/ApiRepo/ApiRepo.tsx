import {
  BookOutlined,
  UserAddOutlined,
  PlaySquareOutlined,
  KeyOutlined,
} from "@ant-design/icons";
import { Tooltip, Typography } from "antd";
import { apiRepoType } from "../../../../constants/mockData";
import { Card } from "../../../Card";

export const ApiRepo = ({
  data,
  className,
}: {
  data: apiRepoType;
  className?: string;
}) => {
  return (
    <Card shadowSize="md" className={`bg-white p-4 ${className}`}>
      <div className="flex justify-between">
        <Typography.Title level={4} className="!m-0 !mb-2">
          <a className="!text-primary flex items-center">
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
          <Tooltip
            title="Subscribers"
            className="flex flex-col items-center w-6"
          >
            <UserAddOutlined className="text-xl !text-gray-400" />
            <div>{data.statistics.subscribes}</div>
          </Tooltip>

          <Tooltip
            title="Weekly utilizations"
            className="flex flex-col items-center w-6"
          >
            <PlaySquareOutlined className="text-xl !text-gray-400" />
            <div>{data.statistics.weeklyUtils}</div>
          </Tooltip>
        </div>
      </div>
      <hr />
      <Typography.Paragraph>
        <p className="text-gray-500 !m-0 !mt-2">{data.description}</p>
      </Typography.Paragraph>
    </Card>
  );
};
