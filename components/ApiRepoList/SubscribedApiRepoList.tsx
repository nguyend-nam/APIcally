import dayjs from "dayjs";
import { Empty, Spin } from "antd";
// import { apiReposData } from "../../constants/mockData";
import { Text } from "../Text";
import { ApiRepo } from "../page/home/ApiRepo";
import { useMemo } from "react";
import cx from "classnames";
import { useFetchWithCache } from "../../hooks/useFetchWithCache";
import { client, GET_PATHS } from "../../libs/api";
import { useAuthContext } from "../../context/auth";

interface Props {
  searchQuery?: string;
  className?: string;
  showSummary?: boolean;
  showOwnedAPIs?: boolean;
}

export const SubscribedApiRepoList = ({
  searchQuery,
  className,
  showSummary = true,
  showOwnedAPIs = false,
}: Props) => {
  const { data, loading } = useFetchWithCache(
    [GET_PATHS.GET_SUBSCRIBED_PROJECTS],
    () => client.getSubscribedProjects()
  );
  const { user } = useAuthContext();

  const displayedApiRepos = useMemo(() => {
    if (loading) {
      return [];
    }

    return searchQuery
      ? (data?.data || []).filter(
          (a) =>
            (a.alias && a.alias.includes(searchQuery)) ||
            (a.name && a.name.includes(searchQuery)) ||
            (a.ownerId && a.ownerId.includes(searchQuery)) ||
            (a.description && a.description.includes(searchQuery))
        )
      : data?.data || [];
  }, [data?.data, loading, searchQuery]);

  if (loading) {
    return (
      <div className={cx("h-[350px] flex flex-col justify-center", className)}>
        <Spin size="large" />
      </div>
    );
  }

  if (!data || (displayedApiRepos || []).length === 0) {
    return (
      <div className={cx("h-[350px] flex flex-col justify-center", className)}>
        <Empty
          description={
            <Text as="div" className="text-base">
              No subscribed APIs found
              {searchQuery
                ? `with keyword "
              ${searchQuery}"`
                : ""}
            </Text>
          }
        />
      </div>
    );
  }

  return (
    <div
      className={cx("h-[350px] overflow-auto space-y-4 p-1 pb-2", className)}
    >
      {showOwnedAPIs && user
        ? displayedApiRepos.map((a) => (
            <ApiRepo
              key={a.id}
              data={a}
              hasShadow={false}
              className="border border-slate-200"
              showPrice={showSummary}
              showDescription={showSummary}
              subscriptionExpireNote={
                a.expiredDate ? (
                  <>
                    Subscription expires at{" "}
                    <b>
                      {dayjs(new Date(a.expiredDate)).format(
                        "DD/MMM/YYYY, HH:mm:ss"
                      )}
                    </b>
                  </>
                ) : undefined
              }
            />
          ))
        : displayedApiRepos
            .filter((a) => a.ownerId !== user?.username)
            .map((a) => (
              <ApiRepo
                key={a.id}
                data={a}
                hasShadow={false}
                className="border border-slate-200"
                showPrice={showSummary}
                showDescription={showSummary}
                subscriptionExpireNote={
                  a.expiredDate ? (
                    <>
                      Subscription expires at{" "}
                      <b>
                        {dayjs(new Date(a.expiredDate)).format(
                          "DD/MMM/YYYY, HH:mm:ss"
                        )}
                      </b>
                    </>
                  ) : undefined
                }
              />
            ))}
    </div>
  );
};
