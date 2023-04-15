import {
  BookOutlined,
  UserAddOutlined,
  StarOutlined,
  CheckCircleOutlined,
  CaretLeftOutlined,
} from "@ant-design/icons";
import { truncate } from "@dwarvesf/react-utils";
import { Divider, Tooltip, Typography } from "antd";
import { useRouter } from "next/router";
import { apiRepoType } from "../../../../pages/explore";
import { ROUTES } from "../../../../constants/routes";
import { formatCurrency } from "../../../../utils/currency";
import { Card } from "../../../Card";
import { TagsArray } from "../../../TagsArray";
import { useIsMobile } from "../../../../hooks/useIsMobile";
import cx from "classnames";

export const ApiRepo = ({
  data,
  className,
  hasShadow = true,
  showPrice = true,
  showDescription = true,
  showOwner = true,
  isLinkActive = true,
  isDescriptionTruncated = true,
  isStatsAlignRight = true,
}: {
  data: apiRepoType;
  className?: string;
  hasShadow?: boolean;
  showPrice?: boolean;
  showDescription?: boolean;
  showOwner?: boolean;
  isLinkActive?: boolean;
  isDescriptionTruncated?: boolean;
  isStatsAlignRight?: boolean;
}) => {
  const { push } = useRouter();
  const isMobile = useIsMobile();

  return (
    <Card
      shadowSize="sm"
      className={cx("bg-white p-4", className)}
      hasShadow={hasShadow}
    >
      <div>
        <div
          className={cx(
            "flex justify-between !mb-2 gap-2 flex-col md:flex-row",
            isStatsAlignRight ? "" : "md:!flex-col"
          )}
        >
          <Typography.Title
            level={4}
            className="!m-0 inline items-center !text-lg md:!text-xl"
          >
            <a
              className="!text-primary inline items-center"
              onClick={() => {
                if (data?.username && data?.alias && isLinkActive) {
                  push(
                    ROUTES.API_WORKSPACE_API_DETAIL(data.username, data.alias)
                  );
                }
              }}
            >
              <BookOutlined className="text-base -translate-y-[5px] !text-gray-400 mr-1" />
              {data.name}
            </a>
            {data.subscribeStatus && (
              <Tooltip title="Subscribed" className="ml-1">
                <CheckCircleOutlined className="text-base -translate-y-[5px] !text-green-500 mr-1" />
              </Tooltip>
            )}
          </Typography.Title>

          <div className="flex gap-4">
            {data.statistics?.subscribes ? (
              <Tooltip
                placement={isMobile || !isStatsAlignRight ? "right" : "left"}
                title="Subscribers"
                className="flex flex-col items-center w-6 h-max"
              >
                <UserAddOutlined className="text-xl !text-indigo-400" />
                <div className="!text-xs">{data.statistics.subscribes}</div>
              </Tooltip>
            ) : null}

            {data.statistics?.starGazers ? (
              <Tooltip
                placement={isMobile || !isStatsAlignRight ? "right" : "left"}
                title="Stars"
                className="flex flex-col items-center w-6 h-max"
              >
                <StarOutlined className="text-xl !text-amber-300" />
                <div className="!text-xs">{data.statistics.starGazers}</div>
              </Tooltip>
            ) : null}
          </div>
        </div>

        <TagsArray tags={data.tags || []} visibleTagsCount={2} />
      </div>

      {showOwner ? (
        <div className="!mt-2 h-6 relative flex items-center">
          <button
            onClick={() =>
              push(ROUTES.PROFILE_OTHER_USER(data.username as string))
            }
            className="!font-medium absolute !text-sm md:!text-base bg-white pr-2 !text-slate-700"
          >
            {data.author}
          </button>
          <Divider className="!my-2" />
        </div>
      ) : null}

      {showDescription ? (
        <Typography.Paragraph className="!text-slate-500 !m-0 !my-2">
          <p>
            {isDescriptionTruncated
              ? truncate(data.description || "", 100)
              : data.description}
          </p>
        </Typography.Paragraph>
      ) : null}

      {showPrice ? (
        <div
          className={`relative !text-base md:!text-lg font-semibold rounded-l -ml-5 pr-7 md:pr-8 pl-5 py-1 bg-gradient-to-r w-max text-white ${
            data.statistics?.price
              ? "from-indigo-500 to-sky-400"
              : "from-green-500 to-emerald-300"
          }`}
        >
          {data.statistics?.price
            ? formatCurrency(data.statistics?.price)
            : "Free"}
          <CaretLeftOutlined className="!text-white text-5xl -translate-y-3 md:-translate-y-2.5 absolute -right-4" />
        </div>
      ) : null}
    </Card>
  );
};
