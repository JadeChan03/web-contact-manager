import { EntityId } from '@reduxjs/toolkit';
import { type Contact } from '../types/contactTypes';

import { store } from './store';
// import { Contact } from '../types/contactTypes';
// Infer the type of `store`
export type AppStore = typeof store;
// Infer the `AppDispatch` type from the store itself
export type AppDispatch = typeof store.dispatch;
// Same for the `RootState` type
export type RootState = ReturnType<typeof store.getState>;

export type contactsState = {
	ids: EntityId[],
	entities: {EntityId: Contact}
}