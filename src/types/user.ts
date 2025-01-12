export type IUser = {
  email: string;
  fullName: string;
  phoneNumber: string;
  userName: string;
  avatar?: string;
  role: string;
};

export type IFullUser = IUser & {
  id: number;
};

export type ILoginRes = {
  token: string;
};
