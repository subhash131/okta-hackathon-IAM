import { AccountSchema } from "@/types/AccountSchema.type";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: Array<AccountSchema>,
};

const userDataSlice = createSlice({
  name: "user data",
  initialState,
  reducers: {
    updateUserData: (state, action) => {
      state.users = action.payload;
    },
  },
});

export default userDataSlice.reducer;
export const { updateUserData } = userDataSlice.actions;
