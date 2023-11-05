import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  applications: [
    {
      id: "1234",
      name: "HR Source",
      description: "Source for all identities",
      SourceType: "Delimited File",
      connectionType: "Flat file",
      status: "Healthy",
    },
    {
      id: "2334",
      name: "Task Management",
      description: "Identities can request for access",
      SourceType: "Auth0",
      connectionType: "Direct Connection",
      status: "Healthy",
    },
  ],
  selectedApp: {
    id: "",
    name: "",
    description: "",
    SourceType: "",
    connectionType: "",
    status: "",
  },
};

const userDataSlice = createSlice({
  name: "HR user data",
  initialState,
  reducers: {
    updateApplicationsData: (state, action) => {
      state.applications = action.payload;
    },
    selectApplication: (state, action) => {
      state.selectedApp = state.applications.filter(
        (app) => app.id === action.payload
      )[0];
    },
  },
});

export default userDataSlice.reducer;
export const { updateApplicationsData, selectApplication } =
  userDataSlice.actions;
