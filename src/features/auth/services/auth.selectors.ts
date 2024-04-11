import { RootState } from "../../../app/store";

export const selectIsAuth = (state: RootState) => state.auth.isAuth;
export const selectUserData = (state: RootState) => ({
  _id: state.auth._id,
  name: state.auth.name,
  email: state.auth.email,
});
