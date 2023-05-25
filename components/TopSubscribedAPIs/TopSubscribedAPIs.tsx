// import { apiReposData } from "../../constants/mockData";
import { subscribersAscSorter } from "../../utils/sort";
import { Card } from "../Card";
import { Text } from "../Text";
import { ApiRepo } from "../page/home/ApiRepo";
import cx from "classnames";
import { useFetchWithCache } from "../../hooks/useFetchWithCache";
import { client, GET_PATHS } from "../../libs/api";
import { Empty, Spin } from "antd";
import { apiRepoType } from "../../pages/explore";

export const rankColor = [
  {
    bg: "bg-[#FFD93D]",
    bgGradient: "bg-gradient-to-t to-[#FFD93D] from-[#DFB91D]",
    border: "border-[#FFD93D]",
  },
  {
    bg: "bg-[#C9EEFF]",
    bgGradient: "bg-gradient-to-t to-[#C9EEFF] from-[#A9CEDF]",
    border: "border-[#C9EEFF]",
  },
  {
    bg: "bg-[#F94A29]",
    bgGradient: "bg-gradient-to-t to-[#F94A29] from-[#D92A09]",
    border: "border-[#F94A29]",
    text: "text-[#F5F5F5]",
  },
  {
    bg: "bg-[#F0F0F8]",
    bgGradient: "bg-gradient-to-t to-[#F0F0F8] from-[#D0D0D8]",
    border: "border-[#F0F0F8]",
  },
  {
    bg: "bg-[#F0F0F8]",
    bgGradient: "bg-gradient-to-t to-[#F0F0F8] from-[#D0D0D8]",
    border: "border-[#F0F0F8]",
  },
];

const RankRender = ({ rank }: { rank: number }) => {
  return (
    <>
      <Card
        borderRadius="none"
        className={cx(
          "pt-1.5 text-center text-xl !h-8 !w-8 z-20 font-semibold absolute top-0 !ml-[250px] md:!ml-[310px] border-x-[3px] border-primary border-double",
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
          "border-[16px] border-b-transparent border-x-transparent z-20 absolute !top-8 !ml-[250px] md:!ml-[310px]",
          rankColor[rank - 1]?.border
        )}
      />
    </>
  );
};

export const TopSubscribedAPIs = () => {
  const { data, loading } = useFetchWithCache(
    [GET_PATHS.SCAN_ALL_PROJECTS],
    () => client.scanAllProjects()
  );

  if (loading) {
    return (
      <div className="w-full h-36 !bg-info">
        <div className="flex items-center justify-center text-white">
          <Spin size="large" />
        </div>
      </div>
    );
  }

  if ((data?.data || []).length === 0) {
    return (
      <div className="w-full h-36 !bg-info relative">
        <div className="flex items-center justify-center text-white">
          <Empty
            description={
              <Text as="div" className="text-base">
                No API found
              </Text>
            }
          />
        </div>
      </div>
    );
  }

  return (
    <div className="w-full overflow-auto">
      <div className="flex gap-2 md:gap-4 items-stretch">
        {data?.data
          .sort(subscribersAscSorter)
          .slice(0, 5)
          .map((d, i) => (
            <div
              className={cx("relative p-[3px] flex", rankColor[i]?.bgGradient)}
              key={d.id}
            >
              <RankRender rank={i + 1} />
              <ApiRepo
                data={d as apiRepoType}
                className="!min-w-[290px] md:!min-w-[350px] bg-white flex flex-col justify-between"
                isStatsAlignRight={false}
                showDescription={false}
                showPrice={false}
                hasShadow={false}
              />
            </div>
          ))}
      </div>
    </div>
  );
};
