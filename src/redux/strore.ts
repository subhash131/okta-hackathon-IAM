import { combineReducers, configureStore } from "@reduxjs/toolkit";
import UserReducer from "./features/HrUsersData";
import TaskManagmentUserReducer from "./features/taskManagmentUsersData";
import ApplicationsReducer from "./features/applicationsData";
import RoleReducer from "./features/rolesData";

const rootReducer = combineReducers({
  UserReducer,
  TaskManagmentUserReducer,
  ApplicationsReducer,
  RoleReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
