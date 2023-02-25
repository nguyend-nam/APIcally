// @ts-ignore
import qs from "qs";

export const ROUTES = {
  HOME: "/home",
  LOGIN: "/login",
  EXPLORE: "/explore",
  EXPLORE_SEARCH: (keyword?: string, filterQueries?: any) => {
    if (filterQueries) {
      // @ts-ignore
      const filterQueriesString = qs.stringify(filterQueries);
      return `/explore/search?query=${keyword}&${filterQueriesString}`;
    }
    return `/explore/search?query=${keyword}`;
  },
  API_WORKSPACE: "/api-workspace",
  API_WORKSPACE_API_DETAIL: (username: string, alias: string) =>
    `/api-workspace/${username}/${alias}`,
  API_WORKSPACE_API_DETAIL_UTILIZER: (username: string, alias: string) =>
    `/api-workspace/${username}/${alias}/utilizer`,
  API_WORKSPACE_CREATE: "/api-workspace/new",
  API_WORKSPACE_CODE_EDITOR: "/api-workspace/code-editor",
  API_WORKSPACE_DOCUMENTATION: "/api-workspace/documentation",
  PROFILE: "/profile",
  PROFILE_APIS: "/profile/apis",
};
