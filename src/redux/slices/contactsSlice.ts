import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { type ContactCard } from '../../types/contactTypes';

// this file takes care of any actions related to contacts

// initial state of ContactList
const initialState: ContactCard[] = [
  {id:'testID', firstName: 'firstName', lastName: 'lastName'}
];

export const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    /* 'contacts/contactAdded' */
    contactAdded: (state, action: PayloadAction<ContactCard>) => {
      state.push(action.payload);
    },
    /* 'contacts/contactDeleted' */
    /* 'contacts/contactUpdated' */
  },
});

// Export the generated action creators for use in components
export const { contactAdded } = contactsSlice.actions;
// Export the slice reducer for use in the store configuration
export default contactsSlice.reducer;
