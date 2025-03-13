import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import type { RootState } from '../types';
// import type { Contact } from '../../types/contactTypes';

// source: https://redux.js.org/tutorials/fundamentals/part-8-modern-redux#converting-the-todos-reducer
// creates an "adapter" object that contains premade reducer functions
// functions can be used as case reducers inside of createSlice
const contactsAdapter = createEntityAdapter();
const initialState = contactsAdapter.getInitialState();
// getInitialState returns an object that looks like: {ids: [], entities: {}}

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    contactAdded: contactsAdapter.addOne,
    // use an adapter reducer function to remove a contact by ID
    contactDeleted: contactsAdapter.removeOne,
  },
});

// export the generated action creators for use in components
export const { contactAdded, contactDeleted } = contactsSlice.actions;
// export the slice reducer for use in the store configuration
export default contactsSlice.reducer;

// selectors
// getSelectors generates a standard set of selector functions
const { selectAll, selectById } = contactsAdapter.getSelectors<RootState>(
  (state) => state.contacts
);

export const selectAllContacts = selectAll;
export const selectContactById = selectById;

// source: https://redux-toolkit.js.org/api/createEntityAdapter
// source: https://medium.com/@RobertoSilvaZ/what-is-createentityadapter-in-react-toolkit-ec4b99fa74b7
// createEntityAdapter accepts a single options object parameter, with two optional fields inside.
