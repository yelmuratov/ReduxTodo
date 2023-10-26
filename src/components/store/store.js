import { configureStore } from '@reduxjs/toolkit';
import addCategorySlice from '../reducer/addCategorySlice';

export default configureStore({
  reducer: {
    addCategory: addCategorySlice,
  },
  devTools: process.env.NODE_ENV !== 'production',
})