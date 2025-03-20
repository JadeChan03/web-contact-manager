import {
  createSlice,
  createEntityAdapter,
  createSelector,
  // EntityAdapter,
  // EntityId,
} from '@reduxjs/toolkit';
import { type RootState } from '../types';
import { type Contact } from '../../types/contactTypes';
// import { nanoid } from 'nanoid';
// import { type CountryCode  } from 'libphonenumber-js';

// creates an "adapter" object that contains premade reducer functions
const contactsAdapter = createEntityAdapter<Contact>();

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: contactsAdapter.getInitialState(), // returns {ids: [], entities: {}}
  reducers: {
    contactAdded: contactsAdapter.addOne,
      
    contactUpdated: contactsAdapter.updateOne,
    
    contactDeleted: contactsAdapter.removeOne, // TODO - removeMany
  },
});

// export the generated action creators for use in components
export const { contactAdded, contactDeleted, contactUpdated } =
  contactsSlice.actions;
// export the slice reducer for use in the store configuration
export default contactsSlice.reducer;

/* SELECTORS */
const contactsSelectors = contactsAdapter.getSelectors<RootState>(
  (state) => state.contacts
);
export const { selectAll: selectContacts, selectById: selectContactById } =
  contactsSelectors;

export const selectTodoIds = createSelector(
  selectContacts,
  // "output selector" that receives all the input results as arguments
  // and returns a final result value
  (contacts) => contacts.map((contact) => contact.id)
);

// source: https://redux.js.org/tutorials/fundamentals/part-8-modern-redux#converting-the-todos-reducer