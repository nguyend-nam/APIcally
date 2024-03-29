import {
  ArrowDownOutlined,
  ArrowUpOutlined,
  CloseOutlined,
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
  // Input as AntInput,
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
// import { apiReposData } from "../../constants/mockData";
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
import cx from "classnames";
import { useAuthContext } from "../../context/auth";
import { useFetchWithCache } from "../../hooks/useFetchWithCache";
import { client, GET_PATHS } from "../../libs/api";
import { CustomTag } from "../../components/TagsArray";
import { ROUTES } from "../../constants/routes";
import { LazyLoad } from "../../components/LazyLoad";
import { Card } from "../../components/Card";

export type Statistic = {
  subscribes?: number;
  starGazers?: number;
  price?: number;
};

export interface apiRepoType {
  isAddedToCart?: boolean;
  expiredDate?: number;
  documentation: string;
  description: string;
  ownerId: string;
  input: string;
  createdAt?: number;
  name: string;
  alias: string;
  id: string;
  subscribeCost: number;
  costPerRequest: number;
  category: string;
  fileNames: string[];
  updatedAt?: number;
  subscriber: number;
  stars: number;
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
  const { query, push } = useRouter();
  const isMobile = useIsMobile();
  const { isAuthenticated } = useAuthContext();

  const { data, loading } = useFetchWithCache(
    isAuthenticated
      ? [GET_PATHS.SCAN_ALL_PROJECTS_WITH_AUTH, "explore"]
      : [GET_PATHS.SCAN_ALL_PROJECTS, "explore"],
    isAuthenticated
      ? () => client.scanAllProjectsWithAuth()
      : () => client.scanAllProjects()
  );

  const [apiRepos, setApiRepos] = useState<apiRepoType[] | []>(
    loading ? [] : (data?.data as apiRepoType[])
  );
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
      setApiRepos(loading ? [] : (data?.data as apiRepoType[]));
    } else {
      const filteredApiRepos = (loading ? [] : (data?.data as apiRepoType[]))
        ?.filter((a) => {
          if (appliedTagFilter.length === 0) {
            return true;
          }

          let has = false;
          (a.category.split(",") || []).forEach((t) => {
            if (appliedTagFilter.includes(t as apiTagTypes)) {
              has = true;
            }
          });
          return has;
        })
        .filter((a) => {
          let has = false;
          if (/*a.statistics != undefined &&*/ a.subscribeCost !== undefined) {
            if (
              a.subscribeCost >= appliedPriceFilter[0] &&
              a.subscribeCost <= appliedPriceFilter[1]
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

          console.log(a);
          let has = false;
          if (a?.expiredDate !== undefined) {
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
    loading,
    data?.data,
  ]);

  const sortsRenderer = useMemo(() => {
    let icon: ReactNode;
    if (sortDirection === "ascending") {
      icon = <ArrowUpOutlined className="mb-1 !text-slate-500" />;
    } else {
      icon = <ArrowDownOutlined className="mb-1 !text-slate-500" />;
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
          appearance="outline"
          className="pt-0 h-[38px] !ring-slate-300"
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
    if (isLoading || loading) {
      return <Spin size="large" />;
    }

    if ((apiRepos || []).length === 0) {
      return <Empty description="No API found" />;
    }

    const currentSorter = `${sortCriteria}-${sortDirection}`;

    return apiRepos
      .sort(sorters[currentSorter as keyof typeof sorters])
      .filter((a) => {
        if (query?.query && typeof query.query === "string") {
          return (
            a.alias.toLowerCase().includes(query.query.toLowerCase()) ||
            a.name.toLowerCase().includes(query.query.toLowerCase()) ||
            a.description.toLowerCase().includes(query.query.toLowerCase()) ||
            a.ownerId.toLowerCase().includes(query.query.toLowerCase())
          );
        }
        return true;
      })
      .reverse()
      .map((a) => (
        <LazyLoad
          key={a.alias}
          className="w-full"
          suspense={
            <Card
              hasShadow={false}
              className="!h-[210px] p-4 !mt-4 flex justify-center items-center"
            >
              <Spin size="large" />
            </Card>
          }
        >
          <ApiRepo
            data={a}
            className="w-full md:w-full max-w-2xl"
            hasShadow={false}
          />
        </LazyLoad>
      ));
  }, [apiRepos, isLoading, loading, query, sortCriteria, sortDirection]);

  return (
    <>
      <Head>
        <title>Explore | APIcally</title>
      </Head>

      <Layout hasSearch contentClassName="!pt-0 !px-0 max-w-[100%]">
        <div className="flex flex-col md:flex-row">
          <div className="bg-white h-full max-h-[calc(100vh-64px)] overflow-auto sticky top-auto md:top-16 w-full md:w-[290px] shrink-0">
            {/* {isFilterOpen ? ( */}
            <div
              className={cx({
                block: isFilterOpen,
                hidden: !isFilterOpen,
              })}
            >
              <Typography.Title
                level={4}
                className="px-4 py-2 md:py-3 !m-0 cursor-pointer flex items-center justify-between !text-base md:!text-lg"
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
                className="px-4 py-2 md:py-3 !m-0 cursor-pointer flex items-center justify-between !text-base md:!text-lg"
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
                  <div className="flex px-4 mb-6 gap-4 items-center">
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

              {/* {isAuthenticated ? (
                <>
                  <Typography.Title
                    level={4}
                    className="px-4 py-2 md:py-3 !m-0 cursor-pointer flex items-center justify-between !text-base md:!text-lg"
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
                </>
              ) : null} */}

              <div className="p-4 flex flex-row md:flex-col gap-2">
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
            {/* ) : null} */}

            {isMobile ? (
              <div
                className={cx(`p-4`, {
                  "-mt-2 pt-0": isFilterOpen,
                })}
              >
                <Button
                  label={isFilterOpen ? "Close filter" : "Open filter"}
                  className="w-full !text-base"
                  onClick={() => setIsFilterOpen(!isFilterOpen)}
                />
              </div>
            ) : null}
          </div>

          <div className="p-4 md:p-8 pb-0 w-full max-w-2xl mx-auto">
            {query?.query && (apiRepos || []).length ? (
              <div className="text-slate-500 text-sm">
                Showing{" "}
                {
                  (apiRepos || []).filter((a) => {
                    if (query?.query && typeof query.query === "string") {
                      return (
                        a.alias.includes(query.query) ||
                        a.description.includes(query.query) ||
                        a.ownerId.includes(query.query)
                      );
                    }
                    return true;
                  }).length
                }{" "}
                results for{" "}
                <Button
                  appearance="link"
                  className="!p-0"
                  onClick={() => push(ROUTES.EXPLORE())}
                  label={
                    <CustomTag>
                      <div className="flex items-center gap-1">
                        &quot;{query.query}&quot;
                        <CloseOutlined />
                      </div>
                    </CustomTag>
                  }
                />
              </div>
            ) : (
              <div className="text-slate-500 text-sm">
                Showing {(apiRepos || []).length} results
              </div>
            )}

            <div className="flex flex-col items-center gap-4 mt-2 w-full">
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
