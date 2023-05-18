import { APIProjectItem } from "../libs/types";
import { apiRepoType } from "../pages/explore";

// price
export const priceAscSorter = (
  a: apiRepoType | APIProjectItem,
  b: apiRepoType | APIProjectItem
) => (b.subscribeCost || 0) - (a.subscribeCost || 0);

export const priceDescSorter = (
  a: apiRepoType | APIProjectItem,
  b: apiRepoType | APIProjectItem
) => (a.subscribeCost || 0) - (b.subscribeCost || 0);

// stars
export const starsAscSorter = (
  a: apiRepoType | APIProjectItem,
  b: apiRepoType | APIProjectItem
) => (b.stars || 0) - (a.stars || 0);

export const starsDescSorter = (
  a: apiRepoType | APIProjectItem,
  b: apiRepoType | APIProjectItem
) => (a.stars || 0) - (b.stars || 0);

// subscribers
export const subscribersAscSorter = (
  a: apiRepoType | APIProjectItem,
  b: apiRepoType | APIProjectItem
) => (b.subscriber || 0) - (a.subscriber || 0);

export const subscribersDescSorter = (
  a: apiRepoType | APIProjectItem,
  b: apiRepoType | APIProjectItem
) => (a.subscriber || 0) - (b.subscriber || 0);
