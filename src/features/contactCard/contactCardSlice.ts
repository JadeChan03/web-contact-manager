import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface contactCard {
  firstName: string;
  lastName: string;
}

export const contactCardSlice = createSlice({
  name: 'contactCard',
  initialState: {
    firstName: '',
    lastName: '',
  },
  reducers: {
    update: (state, action: PayloadAction<object>) => {
      const newContact: object = action.payload;
      state = newContact;
    },
  },
});

export const { update } = contactCardSlice.actions;

export default contactCardSlice.reducer;
