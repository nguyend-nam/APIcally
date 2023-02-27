import {
  DownOutlined,
  LineOutlined,
  SearchOutlined,
  UpOutlined,
} from "@ant-design/icons";
import {
  Form,
  Typography,
  Divider,
  Checkbox,
  Slider,
  Spin,
  Input as AntInput,
  Empty,
} from "antd";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import { Button } from "../../../components/Button";
import { Input } from "../../../components/Input";
import { Layout } from "../../../components/Layout";
import { ApiRepo } from "../../../components/page/home/ApiRepo";
import { FULL_PRICE_FILTER } from "../../../constants/filter";
import { apiReposData } from "../../../constants/mockData";
import { ROUTES } from "../../../constants/routes";
import { apiTags, apiTagTypes } from "../../../constants/tagTypes";
import { useIsMobile } from "../../../hooks/mobile";

const SearchResultPage = () => {
  const { query, push } = useRouter();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const isMobile = useIsMobile();

  const [apiRepos, setApiRepos] = useState(apiReposData);
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
          (a.tags || []).forEach((t) => {
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

  const apiListRenderer = useMemo(() => {
    if (isLoading) {
      return <Spin size="large" />;
    }

    if ((apiRepos || []).length === 0) {
      return <Empty description="No API found" />;
    }

    return apiRepos.map((a) => (
      <ApiRepo key={a.alias} data={a} className="w-full md:w-full max-w-2xl" />
    ));
  }, [apiRepos, isLoading]);

  useEffect(() => {
    // if (query.status !== undefined) {
    //   setFilterSubscribed(query.status === "subscribed");
    // }
    if (query.query !== undefined && typeof query.query === "string") {
      setSearchQuery(query.query);
    }
  }, [query]);

  // const renderAntCheckbox = useMemo(() => {
  //   return (
  //     <AntInput
  //       type="checkbox"
  //       id="subscribed-checkbox"
  //       name="subscribed-checkbox"
  //       className="h-fit !ml-2 text-primary"
  //       onClick={(e) => {
  //         setFilterSubscribed((e.target as HTMLInputElement)?.checked);
  //         if ((e.target as HTMLInputElement)?.checked) {
  //           push(
  //             ROUTES.EXPLORE_SEARCH(query.query as string, {
  //               status: "subscribed",
  //             })
  //           );
  //         } else {
  //           push(ROUTES.EXPLORE_SEARCH(query.query as string));
  //         }
  //       }}
  //       checked={query.status !== undefined && query.status === "subscribed"}
  //     />
  //   );
  // }, [push, query]);

  const [isSSR, setIsSSR] = useState<boolean>(true);

  useEffect(() => {
    setIsSSR(false);
  }, []);

  return (
    !isSSR && (
      <>
        <Head>
          <title>Search &quot;{query.query}&quot; | APIcally</title>
        </Head>

        <Layout
          extraLeft={
            <div className="mr-0 md:mr-4 mb-4 md:mb-0">
              <Form className="flex items-center">
                <Input
                  borderRadius="bottomLeft"
                  type="text"
                  id="home-search-input"
                  placeholder="Search or jump to..."
                  className="!font-normal !placeholder:font-normal h-8"
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Button
                  borderRadius="right"
                  label={<SearchOutlined />}
                  className="h-8 flex justify-center items-center !p-2"
                  onClick={() => {
                    if (searchQuery) {
                      if (
                        query.status !== undefined &&
                        query.status === "subscribed"
                      ) {
                        push(
                          ROUTES.EXPLORE_SEARCH(searchQuery, {
                            status: "subscribed",
                          })
                        );
                      } else {
                        push(ROUTES.EXPLORE_SEARCH(searchQuery));
                      }
                    }
                  }}
                />
              </Form>
            </div>
          }
          contentClassName="!pt-0 !px-0"
        >
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
                    <div className="px-4 my-4 max-h-[160px] overflow-auto">
                      <Checkbox.Group
                        className="p-4 !flex flex-wrap !gap-1.5"
                        value={tagFilter}
                        onChange={(val) => setTagFilter(val as apiTagTypes[])}
                      >
                        {Object.keys(apiTags).map((t) => (
                          <Checkbox key={t} value={t} className="!ml-0">
                            {apiTags[t as apiTagTypes]}
                          </Checkbox>
                        ))}
                      </Checkbox.Group>
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
                        (vnd)
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
                          max={1000000}
                          onChange={setPriceFilter}
                          trackStyle={[{ backgroundColor: "#2D31FA" }]}
                        />
                      </div>
                      <div className="flex px-4 mb-8 gap-4 items-center">
                        <Input
                          type="number"
                          max={1000000}
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
                          type="number"
                          max={1000000}
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

            <div className="p-4 md:p-8 pb-0 w-full">
              {query.query && apiRepos.length ? (
                <div>
                  Showing {apiRepos.length} results for &quot;
                  {query.query}
                  &quot;
                </div>
              ) : null}

              <div className="flex flex-col items-center gap-4 mt-2 md:mt-4 w-full">
                {/* <div className="self-end flex items-center">
                  <label htmlFor="subscribed-checkbox">Subscribed</label>
                  {renderAntCheckbox}
                </div> */}
                {apiListRenderer}
              </div>
            </div>
          </div>
        </Layout>
      </>
    )
  );
};

export default SearchResultPage;