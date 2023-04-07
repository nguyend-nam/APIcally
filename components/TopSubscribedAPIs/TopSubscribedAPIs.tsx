import { apiReposData } from "../../constants/mockData";
import { subscribersAscSorter } from "../../utils/sort";
import { Card } from "../Card";
import { ApiRepo } from "../page/home/ApiRepo";
import cx from "classnames";

export const rankColor = [
  { bg: "bg-[#FFD93D]", border: "border-[#FFD93D]" },
  { bg: "bg-[#C9EEFF]", border: "border-[#C9EEFF]" },
  { bg: "bg-[#F94A29]", border: "border-[#F94A29]", text: "text-[#F5F5F5]" },
  { bg: "bg-[#F8F8F8]", border: "border-[#F8F8F8]" },
  { bg: "bg-[#F8F8F8]", border: "border-[#F8F8F8]" },
];

const RankRender = ({ rank }: { rank: number }) => {
  return (
    <>
      <Card
        borderRadius="none"
        className={cx(
          "pt-2 text-center text-2xl !h-10 !w-10 font-semibold absolute top-0 !ml-[250px] md:!ml-[310px] border-x-[3px] border-primary border-double",
          rankColor[rank - 1]?.bg,
          {
            [rankColor[rank - 1].text!]: rankColor[rank - 1]?.text,
            "text-indigo-900": !rankColor[rank - 1]?.text,
          }
        )}
        hasShadow={false}
      >
        {rank}
      </Card>
      <div
        className={cx(
          "border-[20px] border-b-transparent border-x-transparent absolute !top-10 !ml-[250px] md:!ml-[310px]",
          rankColor[rank - 1]?.border
        )}
      />
    </>
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
              className={cx("relative p-1 flex", rankColor[i]?.bg)}
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