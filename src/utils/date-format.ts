import { format } from "date-fns";

export const formatDate = (date: string) => {
  const dateObj = new Date(date);
  return format(dateObj, "dd/MM/yyyy HH:mm:ss");
};

export const formatDateToRFC = (date: string): string => {
  const dateObj = new Date(date);
  return format(dateObj, "EEE, dd MMM yyyy HH:mm:ss");
};
