import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../../../app/api";
import { ContactInterface, ContactsResponse } from "./contacts.types";

const contactsApi = createApi({
  reducerPath: "contactsApi",
  baseQuery,
  endpoints: (builder) => ({
    getContacts: builder.query<ContactInterface[], void>({
      query: () => ({
        url: "/contacts",
        params: {
          limit: 0,
        },
      }),
      transformResponse: (data: ContactsResponse) => data.items,
    }),
    getContact: builder.query<ContactInterface, string>({
      query: (id) => "/contacts/" + id,
    }),
  }),
});

export const { useGetContactsQuery, useGetContactQuery } = contactsApi;
export default contactsApi;
