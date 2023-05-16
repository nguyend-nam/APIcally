import { apiReposData } from "../../constants/mockData";
import { apiRepoType } from "../../pages/explore";
import {
  priceAscSorter,
  priceDescSorter,
  starsAscSorter,
  starsDescSorter,
  subscribersAscSorter,
  subscribersDescSorter,
} from "../sort";

const emptyApiRepoData: apiRepoType = {
  id: "-",
  subscribeStatus: true,
  name: "-",
  alias: "-",
  author: "-",
  username: "-",
  description: "-",
  tags: ["technology"],
};

// price
test.each([
  [
    [apiReposData[0], apiReposData[1]],
    [apiReposData[1], apiReposData[0]],
  ],
  [
    [emptyApiRepoData, apiReposData[1]],
    [apiReposData[1], emptyApiRepoData],
  ],
  [
    [apiReposData[0], emptyApiRepoData],
    [apiReposData[0], emptyApiRepoData],
  ],
])("priceAscSorter(%s)", (before, expected) => {
  expect(before.sort(priceAscSorter)).toStrictEqual(expected);
});

test.each([
  [
    [apiReposData[11], apiReposData[1]],
    [apiReposData[1], apiReposData[11]],
  ],
  [
    [emptyApiRepoData, apiReposData[1]],
    [emptyApiRepoData, apiReposData[1]],
  ],
  [
    [apiReposData[0], emptyApiRepoData],
    [apiReposData[0], emptyApiRepoData],
  ],
])("priceDescSorter(%s)", (before, expected) => {
  expect(before.sort(priceDescSorter)).toStrictEqual(expected);
});

// stars
test.each([
  [
    [apiReposData[1], apiReposData[0]],
    [apiReposData[0], apiReposData[1]],
  ],
  [
    [emptyApiRepoData, apiReposData[1]],
    [apiReposData[1], emptyApiRepoData],
  ],
  [
    [apiReposData[0], emptyApiRepoData],
    [apiReposData[0], emptyApiRepoData],
  ],
])("starsAscSorter(%s)", (before, expected) => {
  expect(before.sort(starsAscSorter)).toStrictEqual(expected);
});

test.each([
  [
    [apiReposData[11], apiReposData[1]],
    [apiReposData[1], apiReposData[11]],
  ],
  [
    [emptyApiRepoData, apiReposData[1]],
    [emptyApiRepoData, apiReposData[1]],
  ],
  [
    [apiReposData[0], emptyApiRepoData],
    [emptyApiRepoData, apiReposData[0]],
  ],
])("starsDescSorter(%s)", (before, expected) => {
  expect(before.sort(starsDescSorter)).toStrictEqual(expected);
});

// subscribers
test.each([
  [
    [apiReposData[1], apiReposData[0]],
    [apiReposData[0], apiReposData[1]],
  ],
  [
    [emptyApiRepoData, apiReposData[1]],
    [apiReposData[1], emptyApiRepoData],
  ],
  [
    [apiReposData[0], emptyApiRepoData],
    [apiReposData[0], emptyApiRepoData],
  ],
])("subscribersAscSorter(%s)", (before, expected) => {
  expect(before.sort(subscribersAscSorter)).toStrictEqual(expected);
});

test.each([
  [
    [apiReposData[11], apiReposData[1]],
    [apiReposData[1], apiReposData[11]],
  ],
  [
    [emptyApiRepoData, apiReposData[1]],
    [emptyApiRepoData, apiReposData[1]],
  ],
  [
    [apiReposData[0], emptyApiRepoData],
    [emptyApiRepoData, apiReposData[0]],
  ],
])("subscribersDescSorter(%s)", (before, expected) => {
  expect(before.sort(subscribersDescSorter)).toStrictEqual(expected);
});
