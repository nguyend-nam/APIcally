import { Tag, Popover } from "antd";
import { apiTags, apiTagTypes } from "../../constants/tagTypes";
import { WithChildren } from "../../types/common";
import { Button } from "../Button";

interface Props {
  tags: apiTagTypes[];
  visibleTagsCount?: number;
}

const CustomTag = (props: WithChildren) => {
  const { children } = props;
  return (
    <Tag className="!rounded-lg !m-0 !text-indigo-400 !bg-gray-50 !border-1.5 !border-indigo-200">
      {children}
    </Tag>
  );
};

export const TagsArray = (props: Props) => {
  const { tags, visibleTagsCount = 3 } = props;

  if (tags.length === 0) {
    return null;
  }

  if (visibleTagsCount >= tags.length) {
    return (
      <div className="flex gap-1">
        {tags.map((t) => (
          <CustomTag key={t}>{apiTags[t]}</CustomTag>
        ))}
      </div>
    );
  }

  const hiddenTagsCount = tags.length - visibleTagsCount;
  const hiddenTags = tags.slice(visibleTagsCount);

  return (
    <div className="flex gap-1 items-center">
      {tags.slice(0, visibleTagsCount).map((t) => (
        <CustomTag key={t}>{apiTags[t]}</CustomTag>
      ))}
      <Popover
        overlayInnerStyle={{ padding: 6, borderRadius: 8 }}
        overlayStyle={{ background: "none", paddingBottom: 4 }}
        showArrow={false}
        content={
          <div className="flex gap-1 bg-none max-w-lg overflow-auto">
            {hiddenTags.map((t) => (
              <CustomTag key={t}>{apiTags[t]}</CustomTag>
            ))}
          </div>
        }
      >
        <Button
          appearance="link"
          className="!text-xs py-0.5 px-1 !rounded-lg !text-slate-500 !bg-indigo-100 !border-1.5 !border-indigo-400"
          label={`+${hiddenTagsCount}`}
        />
      </Popover>
    </div>
  );
};
