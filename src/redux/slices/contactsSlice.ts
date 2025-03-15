import {
  createSlice,
  createEntityAdapter,
  createSelector,
  // EntityAdapter,
  // EntityId,
} from '@reduxjs/toolkit';
import { type RootState } from '../types';
import { type Contact } from '../../types/contactTypes';

// source: https://redux.js.org/tutorials/fundamentals/part-8-modern-redux#converting-the-todos-reducer
// creates an "adapter" object that contains premade reducer functions
// functions can be used as case reducers inside of createSlice
const contactsAdapter = createEntityAdapter<Contact>();
const initialState = contactsAdapter.getInitialState({
  id: [] as string[],
  entities: {} as { EntityId: Contact },
});
// getInitialState returns an object that looks like: {ids: [], entities: {}}

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    contactAdded: contactsAdapter.addOne,
    // use an adapter reducer function to remove a contact by ID
    contactDeleted: contactsAdapter.removeOne,
    contactUpdated: (contactsState, action) => {
      console.log('updating contact:', action.payload); // debug log
      const { id, changes } = action.payload;
      contactsAdapter.updateOne(contactsState, { id, changes });
    },
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
