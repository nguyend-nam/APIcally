import { client } from "../libs/api";
import { useFetchWithCache } from "./useFetchWithCache";

export const BALANCE_LOG_KEY = "GET_BALANCE_LOG_KEY";

export const useFetchTransactionHistory = () => {
  const { data, ...rest } = useFetchWithCache([BALANCE_LOG_KEY], () =>
    client.getBalanceLog()
  );

  return {
    data: data,
    ...rest,
  };
};
