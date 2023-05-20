import { Checkbox } from "antd";
import { CheckboxValueType } from "antd/lib/checkbox/Group";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useFetchWithCache } from "../../hooks/useFetchWithCache";
import { client, GET_PATHS } from "../../libs/api";
import { ProjectInCartItem } from "../../libs/types";
import { apiRepoType } from "../../pages/explore";
import { ApiRepo } from "../page/home/ApiRepo";

interface Props {
  username: string;
  apis: ProjectInCartItem[];
  getCheckedList: (username: string, checkedList: string[]) => void;
}

export const ApiCheckboxGroup = (props: Props) => {
  const { username, apis, getCheckedList } = props;
  const options = apis.map((a) => a?.apiId || "");

  const [checkedList, setCheckedList] = useState<string[]>([]);
  const [indeterminate, setIndeterminate] = useState(false);

  const onChange = useCallback(
    (list: any[]) => {
      setCheckedList(list);
      setIndeterminate(!!list.length && list.length < options.length);
    },
    [options.length]
  );

  const onCheckAllChange = () => {
    setCheckedList(checkedList.length === options.length ? [] : options);
    setIndeterminate(false);
  };

  useEffect(() => {
    getCheckedList(username, checkedList);
    // eslint-disable-next-line
  }, [checkedList]);

  const renderCheckboxGroup = useMemo(() => {
    return (
      <Checkbox.Group
        onChange={onChange}
        value={checkedList as CheckboxValueType[]}
        className="!flex !flex-col space-x-0"
      >
        {apis.map((a) => {
          return (
            <CheckBoxItem
              key={a.apiId}
              apiId={a.apiId}
              username={a.apiId.split("/")?.[0] || ""}
              alias={a.apiId.split("/")?.[1] || ""}
              checkedList={checkedList}
            />
          );
        })}
      </Checkbox.Group>
    );
  }, [apis, checkedList, onChange]);

  return (
    <div className="pb-3 md:pb-4 rounded-r-md rounded-b-md bg-slate-50">
      <Checkbox
        indeterminate={indeterminate}
        onChange={onCheckAllChange}
        checked={checkedList.length === options.length}
        className="bg-gradient-to-r from-orange-300 to-rose-300 !p-2 md:!p-3 !w-full font-medium !text-lg sticky top-0 z-20 rounded-tr-md !items-baseline checkall bg-cover bg-left"
      >
        {username}
      </Checkbox>
      {renderCheckboxGroup}
    </div>
  );
};

const CheckBoxItem = (props: {
  username: string;
  alias: string;
  checkedList: CheckboxValueType[];
  apiId: string;
}) => {
  const { username, alias, checkedList, apiId } = props;

  const { data, loading } = useFetchWithCache(
    [GET_PATHS.GET_PROJECT_DETAIL_OWNERID_ALIAS(username, alias)],
    () => client.getProjectDetailByOwnerIdAndAlias(username, alias)
  );

  if (loading) {
    return null;
  }
  return (
    <Checkbox
      value={apiId}
      checked={checkedList.includes(alias)}
      className="cart md:!mt-4 !mt-3 md:!pl-3 md:!pr-2 !pl-2 !pr-1 !items-start"
    >
      <ApiRepo
        data={data?.data.project as apiRepoType}
        hasShadow={false}
        className="border border-slate-200"
        showOwner={false}
      />
    </Checkbox>
  );
};
