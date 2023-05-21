import {
  BookOutlined,
  UserAddOutlined,
  StarOutlined,
  // CheckCircleOutlined,
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
// import { useAuthContext } from "../../../../context/auth";
import { apiTagTypes } from "../../../../constants/tagTypes";
import { ReactNode } from "react";
import { Button } from "../../../Button";

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
  multiplyPrice,
  subscriptionExpireNote,
  showEditButton = false,
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
  multiplyPrice?: number;
  subscriptionExpireNote?: ReactNode;
  showEditButton?: boolean;
}) => {
  const { push } = useRouter();
  const isMobile = useIsMobile();

  return (
    <Card
      shadowSize="sm"
      className={cx("bg-white p-4 relative", className)}
      hasShadow={hasShadow}
    >
      {subscriptionExpireNote ? (
        <div className="mb-2">
          <Typography.Text className="!m-0 inline items-center text-base !text-orange-500">
            {subscriptionExpireNote}
          </Typography.Text>
        </div>
      ) : null}
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
                if (data?.ownerId && data?.alias && isLinkActive) {
                  push(
                    ROUTES.API_WORKSPACE_API_DETAIL(data?.ownerId, data?.alias)
                  );
                }
              }}
            >
              <BookOutlined className="text-base -translate-y-[5px] !text-gray-400 mr-1" />
              {data?.name}
            </a>
            {/* {data?.subscribeStatus && isAuthenticated ? (
              <Tooltip title="Subscribed" className="ml-1">
                <CheckCircleOutlined className="text-base -translate-y-[5px] !text-green-500 mr-1" />
              </Tooltip>
            ) : null} */}
          </Typography.Title>

          <div className="flex gap-4">
            <Tooltip
              placement={isMobile || !isStatsAlignRight ? "right" : "left"}
              title="Subscribers"
              className="flex flex-col items-center w-6 h-max"
            >
              <UserAddOutlined className="text-xl !text-indigo-400" />
              <div className="!text-xs">{data?.subscriber || 0}</div>
            </Tooltip>

            <Tooltip
              placement={isMobile || !isStatsAlignRight ? "right" : "left"}
              title="Stars"
              className="flex flex-col items-center w-6 h-max"
            >
              <StarOutlined className="text-xl !text-amber-300" />
              <div className="!text-xs">{data?.stars || 0}</div>
            </Tooltip>
          </div>
        </div>

        {data?.category ? (
          <TagsArray
            tags={(data?.category?.split(",") as apiTagTypes[]) || []}
            visibleTagsCount={2}
          />
        ) : null}
      </div>

      {showOwner ? (
        <div className="!mt-2 h-6 relative flex items-center">
          <button
            onClick={() =>
              push(ROUTES.PROFILE_OTHER_USER(data?.ownerId as string))
            }
            className="!font-medium absolute !text-sm md:!text-base bg-white pr-2 !text-slate-700"
          >
            {data?.ownerId}
          </button>
          <Divider className="!my-2" />
        </div>
      ) : null}

      {showDescription ? (
        <Typography.Paragraph className="!text-slate-500 !m-0 !my-2">
          <p>
            {isDescriptionTruncated
              ? truncate(data?.description || "", 100)
              : data?.description}
          </p>
        </Typography.Paragraph>
      ) : null}

      {showPrice ? (
        <div
          className={`relative !text-base md:!text-lg font-semibold rounded-l -ml-5 pr-7 md:pr-8 pl-5 py-1 bg-gradient-to-r w-max text-white ${
            data?.subscribeCost
              ? "from-indigo-500 to-sky-400"
              : "from-green-500 to-emerald-300"
          }`}
        >
          {data?.subscribeCost
            ? `${formatCurrency(data?.subscribeCost)}${
                multiplyPrice
                  ? ` x ${multiplyPrice} ${
                      multiplyPrice > 1 ? "days" : "day"
                    } = ${formatCurrency(data?.subscribeCost * multiplyPrice)}`
                  : ""
              }`
            : `Free${
                multiplyPrice
                  ? ` x ${multiplyPrice} ${multiplyPrice > 1 ? "days" : "day"}`
                  : ""
              }`}
          <CaretLeftOutlined className="!text-white text-5xl -translate-y-3 md:-translate-y-2.5 absolute -right-4" />
        </div>
      ) : null}
      {showEditButton ? (
        <Button
          label="Edit API"
          onClick={() => {
            push(ROUTES.API_WORKSPACE_CODE_EDITOR(data.ownerId, data.alias));
          }}
          className="absolute bottom-4 right-4"
        />
      ) : null}
    </Card>
  );
};
