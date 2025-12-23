import { createApi } from '@reduxjs/toolkit/query/react';
import { Path } from '@/shared/path';
import { defaultBaseQuery } from '@/shared/api';
import { Contact, ContactRequest } from '@/features/contacts/types';

export const contactsApiSlice = createApi({
  reducerPath: 'contactsApi',
  baseQuery: defaultBaseQuery(),
  endpoints: (builder) => ({
    getContacts: builder.query<Contact[], { main?: string } | void>({
      query: (body) => ({
        url: Path.Contacts.fetchAll(body?.main),
        method: 'GET',
      }),
    }),

    getContact: builder.query<Contact, string>({
      query: (id: string) => ({
        url: Path.Contacts.get(id),
        method: 'GET',
      }),
      keepUnusedDataFor: 0,
    }),

    createContact: builder.mutation<Contact, ContactRequest>({
      query: (body) => ({
        url: Path.Contacts.create,
        method: 'POST',
        body,
      }),
    }),

    updateContact: builder.mutation<Contact, ContactRequest & { id: string }>({
      query: ({ id, ...body }) => ({
        url: Path.Contacts.update(id),
        method: 'PUT',
        body,
      }),
    }),

    deleteContact: builder.mutation<void, string>({
      query: (id: string) => ({
        url: Path.Contacts.delete(id),
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetContactsQuery,
  useGetContactQuery,
  useCreateContactMutation,
  useUpdateContactMutation,
  useDeleteContactMutation,
} = contactsApiSlice;
