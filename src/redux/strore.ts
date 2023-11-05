import { combineReducers, configureStore } from "@reduxjs/toolkit";
import UserReducer from "./features/HrUsersData";
import TaskManagmentUserReducer from "./features/taskManagmentUsersData";
import ApplicationsReducer from "./features/applicationsData";

const rootReducer = combineReducers({
  UserReducer,
  TaskManagmentUserReducer,
  ApplicationsReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
