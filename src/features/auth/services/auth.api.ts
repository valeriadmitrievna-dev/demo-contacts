import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../../../app/api";
import {
  AuthPayloadInterface,
  AuthResponseInterface,
  UserInterface,
} from "./auth.types";
import { setAuth, setUserData } from "./auth.slice";

const authApi = createApi({
  reducerPath: "authApi",
  baseQuery,
  endpoints: (builder) => ({
    signIn: builder.mutation<AuthResponseInterface, AuthPayloadInterface>({
      query: (body) => ({
        url: "/sign-in",
        method: "POST",
        body,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          localStorage.setItem("accesstoken", data.access_token);
          dispatch(setAuth(true));
        } catch (error) {
          return;
        }
      },
    }),
    getUserData: builder.query<UserInterface, void>({
      query: () => "/user",
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setUserData(data));
        } catch (error) {
          return;
        }
      },
    }),
  }),
});

export const { useSignInMutation, useLazyGetUserDataQuery } = authApi;
export default authApi;
