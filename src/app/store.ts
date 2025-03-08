import { configureStore } from '@reduxjs/toolkit'
import contactCardReducer from '../features/contactCard/contactCardSlice'

export default configureStore({
  reducer: {
	contactCard: contactCardReducer,
  },
})