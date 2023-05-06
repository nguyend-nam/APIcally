import dayjs from "dayjs";

export function diffTime(unix: number, unit: "seconds" | "days") {
  const now = dayjs();
  const exp = dayjs.unix(unix);
  return exp.diff(now, unit);
}
