import { combineReducers, configureStore } from "@reduxjs/toolkit";
import UserReducer from "./features/userData";

const rootReducer = combineReducers({
  UserReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
