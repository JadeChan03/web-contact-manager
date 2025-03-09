import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

// define TS type for data being used
export interface ContactCard {
  id: string;
  firstName: string;
  lastName: string;
}

const initialState: ContactCard[] = [
  {id:'testID', firstName: 'firstName', lastName: 'lastName'}
];

export const contactListSlice = createSlice({
  name: 'contactList',
  initialState,
  reducers: {
    contactAdded: (state, action: PayloadAction<ContactCard>) => {
      state.push(action.payload);
    },
  },
});

// Export the generated action creators for use in components
export const { contactAdded } = contactListSlice.actions;
// Export the slice reducer for use in the store configuration
export default contactListSlice.reducer;
