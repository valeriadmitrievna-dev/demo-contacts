import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../../../app/api";
import { AuthPayloadInterface, AuthResponseInterface } from "./auth.types";
import { setAuth } from "./auth.slice";

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
  }),
});

export const { useSignInMutation } = authApi;
export default authApi;
