import { AnyAction, combineReducers, Reducer } from "redux";
import { AppState } from ".";
import userSlice from "./user";

export const combinedReducer = combineReducers({
  user: userSlice,
});

const rootReducer: Reducer = (state: AppState, action: AnyAction) => combinedReducer(state, action);

export default rootReducer;
