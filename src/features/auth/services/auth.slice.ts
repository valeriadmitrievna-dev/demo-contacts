import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { UserInterface } from "./auth.types";

export interface Auth extends UserInterface {
  isAuth: boolean;
}

const initialState: Auth = {
  _id: null,
  name: null,
  email: null,
  isAuth: !!localStorage.getItem("accesstoken"),
};

export const auth = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state, { payload }: PayloadAction<boolean>) => {
      state.isAuth = payload;
    },
    setUserData: (state, { payload }: PayloadAction<UserInterface>) => {
      state._id = payload._id;
      state.name = payload.name;
      state.email = payload.email;
    },
  },
});

export const { setAuth, setUserData } = auth.actions;
export default auth.reducer;
