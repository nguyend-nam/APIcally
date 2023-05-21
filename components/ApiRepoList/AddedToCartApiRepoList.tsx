import { Empty, Spin } from "antd";
// import { apiReposInCart } from "../../constants/mockData";
import { Text } from "../Text";
import { Dispatch, SetStateAction, useEffect, useMemo, useState } from "react";
import { Button } from "../Button";
import { ROUTES } from "../../constants/routes";
import { useRouter } from "next/router";
import { ApiCheckboxGroup } from "../ApiCheckboxGroup";
import cx from "classnames";
import { GetProjectsInCartResponse, ProjectInCartItem } from "../../libs/types";

interface Props {
  data?: GetProjectsInCartResponse;
  loading: boolean;
  className?: string;
  setSelectedApiInCart: Dispatch<SetStateAction<ProjectInCartItem[]>>;
}

export const AddedToCartApiRepoList = ({
  data,
  loading,
  className,
  setSelectedApiInCart,
}: Props) => {
  const { push } = useRouter();
  const [checkedList, setCheckedList] = useState<Record<string, string[]>>({});

  const allAddedToCartApisRepos = useMemo(() => {
    if (loading) {
      return [];
    }
    let arr: ProjectInCartItem[] = [];
    (data?.data || []).forEach((r) => {
      arr = [...arr, r];
    });

    return arr;
  }, [data?.data, loading]);

  const allSelectedApisRepos = useMemo(() => {
    const arr: ProjectInCartItem[] = [];

    Object.values(checkedList).forEach((r) => {
      const apiList = r.map((i) =>
        allAddedToCartApisRepos.find((a) => (a.apiId || "") === i)
      );

      apiList.forEach((a) => {
        if (a) {
          arr.push(a);
        }
      });
    });

    return arr;
  }, [allAddedToCartApisRepos, checkedList]);

  useEffect(() => {
    setSelectedApiInCart(allSelectedApisRepos);
  }, [allSelectedApisRepos, setSelectedApiInCart]);

  const getCheckedList = (username: string, checkedListByOwner: string[]) => {
    setCheckedList({ ...checkedList, [username]: checkedListByOwner });
  };

  if (loading) {
    return (
      <div className="h-full flex flex-col justify-center">
        <Spin size="large" />
      </div>
    );
  }

  if (allAddedToCartApisRepos.length === 0) {
    return (
      <div className="h-full flex flex-col justify-center">
        <Empty
          description={
            <>
              <Text as="div" className="text-base">
                Your cart is currently empty
              </Text>
              <Button
                label="Explore now"
                className="m-3"
                onClick={() => push(ROUTES.EXPLORE())}
              />
            </>
          }
        />
      </div>
    );
  }

  return (
    <div className={cx("h-[600px] overflow-auto space-y-4 pb-2", className)}>
      {groupProjectsInCartByUsername(data?.data || []).map((r) => (
        <ApiCheckboxGroup
          key={r.username}
          username={r.username}
          apis={r.projects}
          getCheckedList={getCheckedList}
        />
      ))}
    </div>
  );
};

const groupProjectsInCartByUsername = (
  projects: ProjectInCartItem[]
): { username: string; projects: ProjectInCartItem[] }[] => {
  const groupedItems: { [username: string]: ProjectInCartItem[] } = {};

  for (const item of projects) {
    const { apiId } = item;
    const username = apiId.split("/")?.[0];
    if (username) {
      if (groupedItems[username]) {
        groupedItems[username].push(item);
      } else {
        groupedItems[username] = [item];
      }
    }
  }

  return Object.keys(groupedItems).map((username) => ({
    username,
    projects: groupedItems[username],
  }));
};
