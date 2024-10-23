import { format } from "date-fns";

export const formatDate = (dt, fns_format) => {
  const _ = new Date(dt * 1000);
  return format(_, fns_format);
};
