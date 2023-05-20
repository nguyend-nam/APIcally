import { Empty, Spin } from "antd";
// import { apiReposData } from "../../constants/mockData";
import { Text } from "../Text";
import { ApiRepo } from "../page/home/ApiRepo";
import { useMemo } from "react";
import cx from "classnames";
import { apiRepoType } from "../../pages/explore";
import { useFetchWithCache } from "../../hooks/useFetchWithCache";
import { client, GET_PATHS } from "../../libs/api";

interface Props {
  searchQuery?: string;
  className?: string;
  apiList?: apiRepoType[];
  username?: string;
}

export const OwnedApiRepoList = ({
  searchQuery,
  className,
  apiList = [],
  username = "",
}: Props) => {
  const { data, loading } = useFetchWithCache(
    [GET_PATHS.SCAN_OWNED_PROJECTS_BY_USER(username)],
    () => client.scanOnwedProjectsOfUser(username)
  );

  const internalApiRepos = useMemo(() => {
    if (apiList.length) {
      return apiList;
    }

    if (loading || !data || !data?.data) {
      return [];
    }
    return data.data;
  }, [apiList, data, loading]);

  const displayedApiRepos = useMemo(() => {
    return searchQuery
      ? internalApiRepos
          .filter(
            (a) =>
              (a.alias && a.alias.includes(searchQuery)) ||
              (a.name && a.name.includes(searchQuery)) ||
              (a.ownerId && a.ownerId.includes(searchQuery)) ||
              (a.description && a.description.includes(searchQuery))
          )
          .filter((a) => a.ownerId === username)
      : internalApiRepos.filter((a) => a.ownerId === username);
  }, [internalApiRepos, searchQuery, username]);

  if (loading) {
    return (
      <div className={cx("h-[350px] flex flex-col justify-center", className)}>
        <Spin size="large" />
      </div>
    );
  }

  if (!data || (data?.data || []).length === 0) {
    return (
      <div className={cx("h-[350px] flex flex-col justify-center", className)}>
        <Empty
          description={
            <Text as="div" className="text-base">
              No APIs found of user {username}
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
      {displayedApiRepos.map((a) => (
        <ApiRepo
          key={a.id}
          data={a}
          hasShadow={false}
          className="border border-slate-200"
        />
      ))}
    </div>
  );
};
