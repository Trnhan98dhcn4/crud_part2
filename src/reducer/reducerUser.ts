import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import UserFake from "../api/UserFake";
import { IUserFake } from "../model";

const user = createSlice({
  name: "user",
  initialState: UserFake,
  reducers: {
    createUser: (state, action: PayloadAction<IUserFake>) => {
      console.log(action.payload);
      state.push(action.payload);
      localStorage.setItem("user", JSON.stringify(state));
    },
    updateUser: (state, action: PayloadAction<IUserFake>) => {
      const user_ = action.payload;
      console.log(user_);
      const index = state.findIndex((f) => f.id === user_.id);
      state[index] = user_;
      localStorage.setItem("user", JSON.stringify(state));
    },
    deleteUser: (state, action: PayloadAction<IUserFake>) => {
      const user_ = action.payload;
      const index = state.findIndex((f) => f.id === user_.id);
      if (index !== -1) {
        state.splice(index, 1);
      }
      localStorage.setItem("user", JSON.stringify(state));
    },
  },
});

const { reducer, actions } = user;
export const { createUser, updateUser, deleteUser } = actions;
export default reducer;
