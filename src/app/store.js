// store.js
import { configureStore } from '@reduxjs/toolkit';
import beneficiariesReducer from './features/beneficiariesSlice'


export const store = configureStore({
  reducer: {
    beneficiaries: beneficiariesReducer,
  },
});
