import { format, parseISO } from "date-fns";

export const formatDate = (date: string) => {
  const dateObj = new Date(date);
  return format(dateObj, "dd/MM/yyyy HH:mm:ss");
};

export const formatDateToRFC = (date: string): string => {
  const dateObj = new Date(date);
  return format(dateObj, "EEE, dd MMM yyyy HH:mm:ss");
};

export function formatDateTimeNotify(dateString: string) {
  // Parse chuỗi ngày tháng thành đối tượng Date
  const date = parseISO(dateString);

  // Format theo yêu cầu
  return format(date, "MMM d, yyyy 'at' h:mma");
}
