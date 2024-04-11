import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../../../app/api";
import { ContactInterface, ContactsResponse } from "./contacts.types";

const contactsApi = createApi({
  reducerPath: "contactsApi",
  tagTypes: ["Contacts"],
  baseQuery,
  endpoints: (builder) => ({
    getContacts: builder.query<ContactInterface[], void>({
      query: () => ({
        url: "/contacts",
        params: {
          limit: 0,
        },
      }),
      providesTags: ["Contacts"],
      transformResponse: (data: ContactsResponse) => data.items,
    }),
    getContact: builder.query<ContactInterface, string>({
      query: (id) => "/contacts/" + id,
      providesTags: ["Contacts"],
    }),
    updateContact: builder.mutation<ContactInterface, ContactInterface>({
      query: (body) => ({
        url: "/contacts/" + body._id,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Contacts"],
    }),
  }),
});

export const {
  useGetContactsQuery,
  useGetContactQuery,
  useUpdateContactMutation,
} = contactsApi;
export default contactsApi;
