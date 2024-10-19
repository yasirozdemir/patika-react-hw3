import { format } from "date-fns";

export const unixToDate = (dt, fns_format) => {
  const _ = new Date(dt * 1000);
  return format(_, fns_format);
};
