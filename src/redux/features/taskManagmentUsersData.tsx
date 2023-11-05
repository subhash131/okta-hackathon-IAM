import { AccountSchema } from "@/types/AccountSchema.type";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tmUsers: Array<AccountSchema>,
};

const userDataSlice = createSlice({
  name: "HR user data",
  initialState,
  reducers: {
    updateTaskManagmentUserData: (state, action) => {
      state.tmUsers = action.payload;
    },
  },
});

export default userDataSlice.reducer;
export const { updateTaskManagmentUserData } = userDataSlice.actions;
