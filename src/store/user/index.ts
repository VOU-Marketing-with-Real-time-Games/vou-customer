import { createSlice } from "@reduxjs/toolkit";
import { IUser } from "./type";
import { Store } from "../name";
import { userReducer } from "./reducer";

const initialState: IUser = {
  email: null,
  token: null,
  id: null,
  username: null,
  image: null,
};

const userSlice = createSlice({
  name: Store.USER,
  initialState,
  reducers: userReducer,
});

const { actions, reducer } = userSlice;

export const { setUser, clearUser } = actions;

export default reducer;
