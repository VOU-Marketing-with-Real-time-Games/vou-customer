export type IPuzzle = {
  id: number;
  image: string;
  name: string;
  description: string;
  itemNum: number;
};

export type IItem = {
  id: number;
  position: number;
  description: string;
  total: number;
};

export type IFullItem = {
  id: number;
  totalItem: number;
  item: IItem;
};
