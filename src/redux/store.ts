import { configureStore } from '@reduxjs/toolkit';
import contactsReducer from './slices/contactsSlice';

export const store = configureStore({
  reducer: {
    contacts: contactsReducer,
  },
});

// Infer the type of `store`
export type AppStore = typeof store;
// Infer the `AppDispatch` type from the store itself
export type AppDispatch = typeof store.dispatch;
// Same for the `RootState` type
export type RootState = ReturnType<typeof store.getState>;
