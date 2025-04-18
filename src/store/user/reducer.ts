import { PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "./type";

export const userReducer = {
  setUser: (state: IUser, action: PayloadAction<IUser>) => {
    state.email = action.payload.email;
    state.token = action.payload.token;
    state.id = action.payload.id;
    state.username = action.payload.username;
    state.email = action.payload.email;
  },
  clearUser: (state: IUser) => {
    state.email = null;
    state.token = null;
    state.id = null;
    state.username = null;
    state.image = null;
  },
};
