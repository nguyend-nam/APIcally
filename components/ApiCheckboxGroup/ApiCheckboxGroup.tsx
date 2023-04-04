import { Checkbox } from "antd";
import { CheckboxValueType } from "antd/lib/checkbox/Group";
import { useCallback, useEffect, useMemo, useState } from "react";
import { apiRepoType } from "../../pages/explore";
import { ApiRepo } from "../page/home/ApiRepo";

interface Props {
  username: string;
  apis: apiRepoType[];
  getCheckedList: (username: string, checkedList: string[]) => void;
}

export const ApiCheckboxGroup = (props: Props) => {
  const { username, apis, getCheckedList } = props;
  const options = apis.map((a) => a.id!);

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
            <Checkbox
              key={a.id}
              value={a.id}
              checked={checkedList.includes(a.id!)}
              className="cart md:!mt-4 !mt-3 md:!pl-3 md:!pr-2 !pl-2 !pr-1 !items-start"
            >
              <ApiRepo
                data={a}
                hasShadow={false}
                className="border border-slate-200"
                showOwner={false}
              />
            </Checkbox>
          );
        })}
      </Checkbox.Group>
    );
  }, [apis, checkedList, onChange]);

  return (
    <div className="border-b border-x border-slate-200 pb-3 md:pb-4 rounded-r-md rounded-b-md">
      <Checkbox
        indeterminate={indeterminate}
        onChange={onCheckAllChange}
        checked={checkedList.length === options.length}
        className="bg-slate-200 !p-2 md:!p-3 !w-full !text-slate-700 font-medium !text-lg sticky top-0 z-20 rounded-tr-md !items-baseline checkall"
      >
        {username}
      </Checkbox>
      {renderCheckboxGroup}
    </div>
  );
};
