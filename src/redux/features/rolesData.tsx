import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  roles: [],
};

const roleSlice = createSlice({
  name: "Role data",
  initialState,
  reducers: {
    setRoles: (state, action) => {
      state.roles = action.payload;
    },
  },
});

export default roleSlice.reducer;
export const { setRoles } = roleSlice.actions;
