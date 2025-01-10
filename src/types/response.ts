export type IPagination<T> = {
  content: T[];
  totalElements: number;
  totalPages: number;
  last: boolean;
  first: boolean;
  size: number;
  number: number;
  empty: false;
  numberOfElements: number;
};
