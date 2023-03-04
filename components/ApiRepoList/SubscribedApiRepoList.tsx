import { Empty } from "antd";
import { apiReposData } from "../../constants/mockData";
import { Text } from "../Text";
import { ApiRepo } from "../page/home/ApiRepo";
import { useMemo } from "react";

interface Props {
  searchQuery?: string;
  className?: string;
}

export const SubscribedApiRepoList = ({ searchQuery, className }: Props) => {
  const displayedApiRepos = useMemo(() => {
    return searchQuery
      ? apiReposData
          .filter(
            (a) =>
              (a.alias && a.alias.includes(searchQuery)) ||
              (a.name && a.name.includes(searchQuery)) ||
              (a.author && a.author.includes(searchQuery)) ||
              (a.description && a.description.includes(searchQuery)) ||
              (a.username && a.username.includes(searchQuery))
          )
          .filter((a) => a.subscribeStatus)
      : apiReposData.filter((a) => a.subscribeStatus);
  }, [searchQuery]);

  if (displayedApiRepos.length === 0) {
    return (
      <div className="h-full flex flex-col justify-center">
        <Empty
          description={
            <Text as="div" className="text-base">
              No subscribed APIs found with keyword &quot;
              {searchQuery}&quot;
            </Text>
          }
        />
      </div>
    );
  }

  return (
    <div className={`h-[350px] overflow-auto space-y-4 p-1 pb-2 ${className}`}>
      {displayedApiRepos
        .filter((a) => a.subscribeStatus)
        .map((a) => (
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
