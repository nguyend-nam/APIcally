import { client } from "../libs/api";
import { loggingTypes } from "../pages/profile";
import { useFetchWithCache } from "./useFetchWithCache";

export const HISTORY_LOG_KEY = "GET_HISTORY_LOG_KEY";

export const useFetchBalanceLog = (period: loggingTypes) => {
  const { data, ...rest } = useFetchWithCache([HISTORY_LOG_KEY, period], () =>
    client.getBalanceLog(period)
  );

  return {
    data: data,
    ...rest,
  };
};
