import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { type Contact } from '../../types/contactTypes';

// this file takes care of any actions related to contacts

// initial state of ContactList
const initialState: Contact[] = [
  { id: 'testID', firstName: 'firstName', lastName: 'lastName', phones: ['00000000'] },
];

export const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    /* type: 'contacts/contactAdded', payload: ContactCard */
    contactAdded: (state, action: PayloadAction<Contact>) => {
      state.push(action.payload);
    },
    /* type: 'contacts/contactDeleted', payload: ContactCard */
    /* type: 'contacts/contactUpdated', payload: ContactCard */
  },
});

// Export the generated action creators for use in components
export const { contactAdded } = contactsSlice.actions;
// Export the slice reducer for use in the store configuration
export default contactsSlice.reducer;
