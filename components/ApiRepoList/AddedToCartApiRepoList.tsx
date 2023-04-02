import { Empty } from "antd";
import { apiReposInCart } from "../../constants/mockData";
import { Text } from "../Text";
import { Dispatch, SetStateAction, useEffect, useMemo, useState } from "react";
import { Button } from "../Button";
import { ROUTES } from "../../constants/routes";
import { useRouter } from "next/router";
import { apiRepoType } from "../../pages/explore";
import { ApiCheckboxGroup } from "../ApiCheckboxGroup";
import cx from "classnames";

interface Props {
  className?: string;
  setSelectedApiInCart: Dispatch<SetStateAction<apiRepoType[]>>;
}

export const AddedToCartApiRepoList = ({
  className,
  setSelectedApiInCart,
}: Props) => {
  const { push } = useRouter();
  const [checkedList, setCheckedList] = useState<Record<string, string[]>>({});

  const allAddedToCartApisRepos = useMemo(() => {
    let arr: apiRepoType[] = [];
    apiReposInCart.forEach((r) => {
      arr = [...arr, ...r.apis];
    });

    return arr;
  }, []);

  const allSelectedApisRepos = useMemo(() => {
    const arr: apiRepoType[] = [];
    Object.values(checkedList).forEach((r) => {
      const apiList = r.map((i) =>
        allAddedToCartApisRepos.find((a) => a.id === i)
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
      {apiReposInCart.map((r) => (
        <ApiCheckboxGroup
          key={r.username}
          username={r.author}
          apis={r.apis}
          getCheckedList={getCheckedList}
        />
      ))}
    </div>
  );
};
