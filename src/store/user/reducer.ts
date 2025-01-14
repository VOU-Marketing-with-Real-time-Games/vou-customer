import { PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "./type";

export const userReducer = {
  setUser: (state: IUser, action: PayloadAction<IUser>) => {
    state.email = action.payload.email;
    state.token = action.payload.token;
    state.userId = action.payload.userId;
    state.username = action.payload.username;
  },
  clearUser: (state: IUser) => {
    state.email = null;
    state.token = null;
    state.userId = null;
    state.username = null;
  },
};
