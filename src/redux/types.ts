/* REDUX TYPES */

import { EntityId } from '@reduxjs/toolkit';
import { type Contact } from '../types/contactTypes';
import { store } from './store';

// infer the type of `store`
export type AppStore = typeof store;
// infer the `AppDispatch` type from the store itself
export type AppDispatch = typeof store.dispatch;
// infer the `RootState` type
export type RootState = ReturnType<typeof store.getState>;

export type ContactsState = {
  ids: EntityId[];
  entities: { EntityId: Contact };
};
