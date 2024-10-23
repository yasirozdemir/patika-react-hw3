import { format } from "date-fns";

export const formatDate = (dt, fns_format) => {
  const _ = new Date(dt * 1000);
  return format(_, fns_format);
};

export const formatIsoDate = (isoDateString) => {
  const date = new Date(isoDateString);
  return {
    month_day: format(date, "MMMM, do"),
    weekday: format(date, "EEEE"),
  };
};
