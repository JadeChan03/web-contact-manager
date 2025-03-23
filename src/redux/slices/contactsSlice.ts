import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import { type RootState } from '../types';
import { type Contact } from '../../types/contactTypes';

const contactsAdapter = createEntityAdapter<Contact>();

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: contactsAdapter.getInitialState(),
  reducers: {
    contactAdded: contactsAdapter.addOne,
    contactUpdated: contactsAdapter.updateOne,
    contactDeleted: contactsAdapter.removeOne,
    contactsImported: contactsAdapter.upsertMany,
  },
});

export const {
  contactAdded,
  contactDeleted,
  contactUpdated,
  contactsImported,
} = contactsSlice.actions;

export default contactsSlice.reducer;

// selectors
export const { selectAll: selectContacts, selectById: selectContactById } =
  contactsAdapter.getSelectors((state: RootState) => state.contacts);

// note: moved formatToE164 util out of redux to simplify slice
// purpose: manage contacts efficiently, manage VCard import/export actions with clarity
