import { apiReposData } from "../../constants/mockData";
import { subscribersAscSorter } from "../../utils/sort";
import { Card } from "../Card";
import { ApiRepo } from "../page/home/ApiRepo";
import cx from "classnames";

export const rankColor = [
  { bg: "bg-[#FFD93D]" },
  { bg: "bg-[#C9EEFF]" },
  { bg: "bg-[#F94A29]", text: "text-[#F5F5F5]" },
  { bg: "bg-[#F8F8F8]" },
  { bg: "bg-[#F8F8F8]" },
];

const RankRender = ({ rank }: { rank: number }) => {
  return (
    <Card
      borderRadius="bottom"
      className={cx(
        "p-1 px-2 text-3xl font-semibold text-slate-700 absolute top-0 !ml-[255px] md:!ml-[315px]",
        rankColor[rank - 1]?.bg,
        rankColor[rank - 1]?.text
      )}
      shadowSize="sm"
    >
      {rank}
    </Card>
  );
};

export const TopSubscribedAPIs = () => {
  return (
    <div className="w-full overflow-auto">
      <div className="flex gap-4 items-stretch">
        {apiReposData
          .sort(subscribersAscSorter)
          .slice(0, 5)
          .map((d, i) => (
            <div
              className={cx("relative p-2 flex", rankColor[i]?.bg)}
              key={d.id}
            >
              <RankRender rank={i + 1} />
              <ApiRepo
                data={d}
                className="!min-w-[290px] md:!min-w-[350px] bg-white"
                isStatsAlignRight={false}
                showDescription={false}
                showPrice={false}
              />
            </div>
          ))}
      </div>
    </div>
  );
};
