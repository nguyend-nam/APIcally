// @ts-ignore
import qs from "qs";

export const ROUTES = {
  LANDING_PAGE: "/",
  HOME: "/home",
  LOGIN: "/login",
  REGISTER: "/register",
  EXPLORE: (keyword?: string, filterQueries?: any) => {
    if (!keyword && !filterQueries) {
      return "/explore";
    }
    if (filterQueries) {
      // @ts-ignore
      const filterQueriesString = qs.stringify(filterQueries);
      return `/explore?query=${keyword}&${filterQueriesString}`;
    }
    return `/explore?query=${keyword}`;
  },
  API_WORKSPACE: "/api-workspace",
  API_WORKSPACE_API_DETAIL: (username: string, alias: string) =>
    `/${username}/${alias}`,
  API_WORKSPACE_API_DETAIL_UTILIZER: (username: string, alias: string) =>
    `/${username}/${alias}/utilizer`,
  API_WORKSPACE_CREATE: "/api-workspace/new",
  API_WORKSPACE_CODE_EDITOR: (username: string, alias: string) =>
    `/api-workspace/code-editor?username=${username}&alias=${alias}`,
  API_WORKSPACE_DOCUMENTATION: (username: string, alias: string) =>
    `/api-workspace/documentation?username=${username}&alias=${alias}`,
  PROFILE: "/profile",
  PROFILE_OTHER_USER: (alias: string) => `/${alias}`,
  CART: "/profile/cart",
  SETTINGS: "/profile/settings",
};
