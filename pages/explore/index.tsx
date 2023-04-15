import {
  ArrowDownOutlined,
  ArrowUpOutlined,
  DownOutlined,
  LineOutlined,
  UpOutlined,
} from "@ant-design/icons";
import {
  Typography,
  Divider,
  Checkbox,
  Slider,
  Spin,
  Input as AntInput,
  Empty,
  Select,
} from "antd";
import Head from "next/head";
import { useRouter } from "next/router";
import { ReactNode, useState, useMemo, useEffect } from "react";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { Layout } from "../../components/Layout";
import { apiTags, apiTagTypes } from "../../constants/tagTypes";
import { ApiRepo } from "../../components/page/home/ApiRepo";
import { FULL_PRICE_FILTER } from "../../constants/filter";
import { apiReposData } from "../../constants/mockData";
import { useIsMobile } from "../../hooks/useIsMobile";
import { capitalizeFirstLetter } from "../../utils";
import {
  priceAscSorter,
  priceDescSorter,
  starsAscSorter,
  starsDescSorter,
  subscribersAscSorter,
  subscribersDescSorter,
} from "../../utils/sort";

export type Statistic = {
  subscribes?: number;
  starGazers?: number;
  price?: number;
};

export interface apiRepoType {
  id?: string;
  subscribeStatus?: boolean;
  name?: string;
  alias?: string;
  author?: string;
  username?: string;
  description?: string;
  statistics?: Statistic;
  tags?: apiTagTypes[];
}

const sorterCategories = ["price", "stars", "subscribers"];

const sorters = {
  "price-ascending": priceAscSorter,
  "price-descending": priceDescSorter,
  "stars-ascending": starsAscSorter,
  "stars-descending": starsDescSorter,
  "subscribers-ascending": subscribersAscSorter,
  "subscribers-descending": subscribersDescSorter,
};

const ExplorePage = () => {
  const { query } = useRouter();
  const isMobile = useIsMobile();

  const [apiRepos, setApiRepos] = useState<apiRepoType[]>(apiReposData);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // filter states
  const [priceFilter, setPriceFilter] =
    useState<[number, number]>(FULL_PRICE_FILTER);
  const [tagFilter, setTagFilter] = useState<apiTagTypes[]>([]);
  const [subscribedFilter, setSubscribedFilter] = useState<boolean>(false);

  // filter collapse
  const [isPriceFilterOpen, setIsPriceFilterOpen] = useState<boolean>(
    isMobile ? false : true
  );
  const [isTagFilterOpen, setIsTagFilterOpen] = useState<boolean>(
    isMobile ? false : true
  );
  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(
    isMobile ? false : true
  );

  // filter applied
  const [appliedPriceFilter, setAppliedPriceFilter] =
    useState<[number, number]>(FULL_PRICE_FILTER);
  const [appliedTagFilter, setAppliedTagFilter] = useState<apiTagTypes[]>([]);
  const [appliedSubscribedFilter, setAppliedSubscribedFilter] =
    useState<boolean>(false);

  // sorter
  const [sortCriteria, setSortCriteria] = useState<
    "price" | "stars" | "subscribers"
  >("subscribers");
  const [sortDirection, setSortDirection] = useState<
    "ascending" | "descending"
  >("descending");

  const onFilterApply = async () => {
    setIsLoading(true);

    await setTimeout(() => {
      setAppliedTagFilter(tagFilter);
      setAppliedPriceFilter(priceFilter);
      setAppliedSubscribedFilter(subscribedFilter);
      setIsLoading(false);
    }, 1000);
  };

  const onFilterReset = () => {
    setAppliedTagFilter([]);
    setTagFilter([]);
    setAppliedPriceFilter(FULL_PRICE_FILTER);
    setPriceFilter(FULL_PRICE_FILTER);
    setAppliedSubscribedFilter(false);
    setSubscribedFilter(false);
  };

  useEffect(() => {
    if (query.category) {
      if (typeof query.category === "string") {
        setAppliedTagFilter([query.category] as apiTagTypes[]);
        setTagFilter([query.category] as apiTagTypes[]);
      } else {
        setAppliedTagFilter(query.category as apiTagTypes[]);
        setTagFilter(query.category as apiTagTypes[]);
      }
    }
  }, [query.category]);

  useEffect(() => {
    if (
      appliedTagFilter.length === 0 &&
      appliedPriceFilter[0] === FULL_PRICE_FILTER[0] &&
      appliedPriceFilter[1] === FULL_PRICE_FILTER[1] &&
      !appliedSubscribedFilter
    ) {
      setApiRepos(apiReposData);
    } else {
      const filteredApiRepos = apiReposData
        .filter((a) => {
          if (appliedTagFilter.length === 0) {
            return true;
          }

          let has = false;
          (a.tags || []).forEach((t: apiTagTypes) => {
            if (appliedTagFilter.includes(t)) {
              has = true;
            }
          });
          return has;
        })
        .filter((a) => {
          let has = false;
          if (a.statistics != undefined && a.statistics.price !== undefined) {
            if (
              a.statistics.price >= appliedPriceFilter[0] &&
              a.statistics.price <= appliedPriceFilter[1]
            ) {
              has = true;
            }
          }
          return has;
        })
        .filter((a) => {
          if (!appliedSubscribedFilter) {
            return true;
          }

          let has = false;
          if (a.subscribeStatus) {
            has = true;
          }
          return has;
        });

      setApiRepos(filteredApiRepos);
    }
  }, [
    appliedTagFilter,
    appliedPriceFilter,
    appliedSubscribedFilter,
    setApiRepos,
  ]);

  const sortsRenderer = useMemo(() => {
    let icon: ReactNode;
    if (sortDirection === "ascending") {
      icon = <ArrowUpOutlined className="mb-1" />;
    } else {
      icon = <ArrowDownOutlined className="mb-1" />;
    }

    return (
      <div className="w-full md:w-full max-w-2xl flex justify-end gap-2">
        <Select
          value={sortCriteria}
          onChange={setSortCriteria}
          className="white-bg small-text"
          style={{ width: 140 }}
          options={sorterCategories.map((k) => ({
            value: k,
            label: capitalizeFirstLetter(k),
          }))}
        />
        <Button
          borderRadius="full"
          className="pt-0 h-[38px]"
          label={icon}
          onClick={() => {
            if (sortDirection === "descending") {
              setSortDirection("ascending");
            } else {
              setSortDirection("descending");
            }
          }}
        />
      </div>
    );
  }, [sortCriteria, sortDirection, setSortDirection, setSortCriteria]);

  const apiListRenderer = useMemo(() => {
    if (isLoading) {
      return <Spin size="large" />;
    }

    if ((apiRepos || []).length === 0) {
      return <Empty description="No API found" />;
    }

    const currentSorter = `${sortCriteria}-${sortDirection}`;

    return apiRepos
      .sort(sorters[currentSorter as keyof typeof sorters])
      .reverse()
      .map((a) => (
        <ApiRepo
          key={a.alias}
          data={a}
          className="w-full md:w-full max-w-2xl"
        />
      ));
  }, [apiRepos, isLoading, sortCriteria, sortDirection]);

  return (
    <>
      <Head>
        <title>Explore | APIcally</title>
      </Head>

      <Layout hasSearch contentClassName="!pt-0 !px-0 max-w-[100%]">
        <div className="flex flex-col md:flex-row">
          <div className="bg-white h-full max-h-[calc(100vh-64px)] overflow-auto sticky top-auto md:top-16 w-full md:w-[290px] shrink-0">
            {isFilterOpen ? (
              <div>
                <Typography.Title
                  level={4}
                  className="px-4 py-2 md:py-3 !m-0 cursor-pointer flex items-center justify-between !text-lg md:!text-xl"
                  onClick={() => setIsTagFilterOpen(!isTagFilterOpen)}
                >
                  Category
                  {isTagFilterOpen ? (
                    <UpOutlined className="text-[10px]" />
                  ) : (
                    <DownOutlined className="text-[10px]" />
                  )}
                </Typography.Title>
                <Divider className="!my-0" />

                {isTagFilterOpen ? (
                  <div className="bg-gray-50 mb-6">
                    <div className="px-4 py-4 md:max-h-[170px] overflow-auto">
                      <Checkbox.Group
                        className="p-4 !flex flex-wrap !gap-1.5"
                        value={tagFilter}
                        onChange={(val) => setTagFilter(val as apiTagTypes[])}
                      >
                        {Object.keys(apiTags).map((t) => (
                          <Checkbox
                            key={t}
                            value={t}
                            className="!ml-0 filter-tag"
                          >
                            {apiTags[t as apiTagTypes]}
                          </Checkbox>
                        ))}
                      </Checkbox.Group>
                    </div>
                  </div>
                ) : null}

                <Typography.Title
                  level={4}
                  className="px-4 py-2 md:py-3 !m-0 cursor-pointer flex items-center justify-between !text-lg md:!text-xl"
                  onClick={() => setIsPriceFilterOpen(!isPriceFilterOpen)}
                >
                  <span>
                    Price range{" "}
                    <span className="font-normal text-sm text-slate-500">
                      (usd)
                    </span>
                  </span>
                  {isPriceFilterOpen ? (
                    <UpOutlined className="text-[10px]" />
                  ) : (
                    <DownOutlined className="text-[10px]" />
                  )}
                </Typography.Title>
                <Divider className="!my-0" />

                {isPriceFilterOpen ? (
                  <>
                    <div className="px-4 my-4">
                      <Slider
                        range
                        value={priceFilter}
                        min={FULL_PRICE_FILTER[0]}
                        max={FULL_PRICE_FILTER[1]}
                        onChange={setPriceFilter}
                        trackStyle={[{ backgroundColor: "#2D31FA" }]}
                      />
                    </div>
                    <div className="flex px-4 mb-8 gap-4 items-center">
                      <Input
                        step={0.05}
                        fullWidth
                        type="number"
                        min={FULL_PRICE_FILTER[0]}
                        max={FULL_PRICE_FILTER[1]}
                        value={priceFilter[0]}
                        className="!text-sm py-2"
                        onChange={(e) => {
                          const newRangeValue: [number, number] = [
                            Number(e.target?.value || 0),
                            priceFilter[1],
                          ];
                          setPriceFilter(newRangeValue);
                        }}
                      />
                      <div className="flex items-center text-slate-400">
                        <LineOutlined />
                      </div>
                      <Input
                        step={0.05}
                        fullWidth
                        type="number"
                        max={FULL_PRICE_FILTER[1]}
                        min={FULL_PRICE_FILTER[0]}
                        value={priceFilter[1]}
                        className="!text-sm py-2"
                        onChange={(e) => {
                          const newRangeValue: [number, number] = [
                            priceFilter[0],
                            Number(e.target?.value || 0),
                          ];
                          setPriceFilter(newRangeValue);
                        }}
                      />
                    </div>
                  </>
                ) : null}

                <Typography.Title
                  level={4}
                  className="px-4 py-2 md:py-3 !m-0 cursor-pointer flex items-center justify-between !text-lg md:!text-xl"
                  onClick={() => setSubscribedFilter(!subscribedFilter)}
                >
                  Subscribed
                  <AntInput
                    type="checkbox"
                    className="!w-min"
                    checked={subscribedFilter}
                  />
                </Typography.Title>
                <Divider className="!my-0" />

                <div className="p-4 flex flex-row md:flex-col gap-4">
                  <Button
                    appearance="outline"
                    label="Reset"
                    className="w-full !text-base"
                    onClick={onFilterReset}
                  />
                  <Button
                    label="Apply"
                    className="w-full !text-base"
                    onClick={onFilterApply}
                    isLoading={isLoading}
                  />
                </div>
              </div>
            ) : null}

            {isMobile ? (
              <div className={`p-4 ${isFilterOpen ? "pt-0" : ""}`}>
                <Button
                  label={isFilterOpen ? "Close filter" : "Open filter"}
                  className="w-full !text-base"
                  onClick={() => setIsFilterOpen(!isFilterOpen)}
                />
              </div>
            ) : null}
          </div>

          <div className="p-4 md:p-8 pb-0 w-full max-w-2xl m-auto">
            {query.query && apiRepos.length ? (
              <div>
                Showing {apiRepos.length} results for &quot;
                {query.query}
                &quot;
              </div>
            ) : (
              <div>Showing {apiRepos.length} results</div>
            )}

            <div className="flex flex-col items-center gap-6 mt-2 md:mt-4 w-full">
              {sortsRenderer}
              {apiListRenderer}
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default ExplorePage;
