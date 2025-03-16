import {
  createSlice,
  createEntityAdapter,
  createSelector,
  // EntityAdapter,
  EntityId,
} from '@reduxjs/toolkit';
import { type RootState } from '../types';
// import { type Contact } from '../../types/contactTypes';

// source: https://redux.js.org/tutorials/fundamentals/part-8-modern-redux#converting-the-todos-reducer
// creates an "adapter" object that contains premade reducer functions
// functions can be used as case reducers inside of createSlice
const contactsAdapter = createEntityAdapter();
const initialState = contactsAdapter.getInitialState({
  ids: [] as EntityId[],
  entities: {},
});
// getInitialState returns an object that looks like: {ids: [], entities: {}}

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    contactAdded: contactsAdapter.addOne,
    // use an adapter reducer function to remove a contact by ID
    contactDeleted: contactsAdapter.removeOne,
    contactUpdated: contactsAdapter.updateOne
    // contactUpdated: (state, action) => {
    //   console.log('INCOMING CONTACT', action.payload); // debug log
    //   const { id, changes } = action.payload;
    //   contactsAdapter.updateOne(state, { id, changes }); // taking in params, not destructuring
    //   console.log(' UPDATED STATE.entities HERE ', state.entities);
    // },
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
