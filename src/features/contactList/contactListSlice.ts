import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

// define TS type for data being used
export interface ContactCard {
  firstName: string;
  lastName: string;
}

const initialState: ContactCard[] = [
  {firstName: 'test', lastName: '1'}
];

export const contactListSlice = createSlice({
  name: 'contactList',
  initialState,
  reducers: {
    contactAdded: (state, action: PayloadAction<ContactCard>) => {
      state.contactList.push(action.payload);
    },
  },
});

// Export the generated action creators for use in components
export const { contactAdded } = contactListSlice.actions;
// Export the slice reducer for use in the store configuration
export default contactListSlice.reducer;
