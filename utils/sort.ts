import { apiRepoType } from "../pages/explore/search";

// price
export const priceAscSorter = (a: apiRepoType, b: apiRepoType) =>
  (b.statistics?.price || 0) - (a.statistics?.price || 0);

export const priceDescSorter = (a: apiRepoType, b: apiRepoType) =>
  (a.statistics?.price || 0) - (b.statistics?.price || 0);

// stars
export const starsAscSorter = (a: apiRepoType, b: apiRepoType) =>
  (b.statistics?.starGazers || 0) - (a.statistics?.starGazers || 0);

export const starsDescSorter = (a: apiRepoType, b: apiRepoType) =>
  (a.statistics?.starGazers || 0) - (b.statistics?.starGazers || 0);

// subscribers
export const subscribersAscSorter = (a: apiRepoType, b: apiRepoType) =>
  (b.statistics?.subscribes || 0) - (a.statistics?.subscribes || 0);

export const subscribersDescSorter = (a: apiRepoType, b: apiRepoType) =>
  (a.statistics?.subscribes || 0) - (b.statistics?.subscribes || 0);
