export type IUser = {
  email: string;
  fullName: string;
  phoneNumber: string;
  userName?: string;
  username?: string;
  avatar?: string;
  role: string;
};

export type IFullUser = IUser & {
  id: number;
  image: string;
};

export type ILoginRes = {
  token: string;
};

export type IIncreasePlayTurnReq = {
  userID: number;
  quantity: number;
  method: string;
};
