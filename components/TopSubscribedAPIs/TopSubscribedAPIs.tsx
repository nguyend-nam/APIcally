import { apiReposData } from "../../constants/mockData";
import { subscribersAscSorter } from "../../utils/sort";
import { Card } from "../Card";
import { ApiRepo } from "../page/home/ApiRepo";

export const rankColor = [
  { bg: "#FFD93D" },
  { bg: "#C9EEFF" },
  { bg: "#F94A29", text: "#F5F5F5" },
  { bg: "#FFF" },
  { bg: "#FFF" },
];

const RankRender = ({ rank }: { rank: number }) => {
  return (
    <Card
      borderRadius="bottom"
      className="p-1 px-2 text-2xl font-medium text-slate-700 absolute right-0"
      shadowSize="sm"
      style={{
        backgroundColor: rankColor[rank - 1]?.bg,
        color: rankColor[rank - 1]?.text
          ? rankColor[rank - 1]?.text
          : undefined,
      }}
    >
      {rank}
    </Card>
  );
};

export const TopSubscribedAPIs = () => {
  return (
    <div className="w-full overflow-auto pb-4">
      <div className="flex gap-2 md:gap-4">
        {apiReposData
          .sort(subscribersAscSorter)
          .slice(0, 5)
          .map((d, i) => (
            <div className="relative" key={d.id}>
              <RankRender rank={i + 1} />
              <ApiRepo
                data={d}
                className="!min-w-[300px] md:!min-w-[360px]"
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
