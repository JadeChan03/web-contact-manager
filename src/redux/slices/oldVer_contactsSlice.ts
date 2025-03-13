// NOT IN USE, use refactored file in ./contactsSlice

// import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// import type { RootState } from '../types';
// import { type Contact } from '../../types/contactTypes';
// type ContactField = keyof Contact;

// // this file takes care of any actions related to contacts

// // initial state of ContactList
// const initialState: Contact[] = [
//   { id: 'testID', firstName: 'firstName', lastName: 'lastName', phones: ['12341234'], emails: ['name@email.com'], addresses:['test-address'], categories: [], organisation: '', webUrl: '', notes: '', tags: [] },
// ];

// export const contactsSlice = createSlice({
//   name: 'contacts',
//   initialState,
//   reducers: {
//     /* type: 'contacts/contactAdded', payload: ContactCard */
//     contactAdded: 
//     (state, action: PayloadAction<Contact>) => {
//       state.push(action.payload);
//     },
//     /* type: 'contacts/contactDeleted', payload: ContactCard */
//     contactDeleted: (state, action: PayloadAction<ContactField>) => {
//      state = state.filter(contact => contact.id !== action.payload);
//     }
//   },
// });

// // export the generated action creators for use in components
// export const { contactAdded, contactDeleted } = contactsSlice.actions;
// // export the slice reducer for use in the store configuration
// export default contactsSlice.reducer;

// // export selector functions
// export const selectAllContacts = (state: RootState) => state.contacts
// export const selectContactById = (state: RootState, contactId: ContactField | string) =>
//   state.contacts.entities[contactId]
