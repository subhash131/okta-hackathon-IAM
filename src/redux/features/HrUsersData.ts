import { AccountSchema } from "@/types/AccountSchema.type";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  hrUsers: Array<AccountSchema>,
};

const userDataSlice = createSlice({
  name: "HR user data",
  initialState,
  reducers: {
    updateHrUsersData: (state, action) => {
      state.hrUsers = action.payload;
    },
  },
});

export default userDataSlice.reducer;
export const { updateHrUsersData } = userDataSlice.actions;
