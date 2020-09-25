import { configureStore } from '@reduxjs/toolkit';

import filesReducer from './components/filesSlice/slice';

export default configureStore({
    reducer: { files: filesReducer },
    devTools: process.env.NODE_ENV !== 'production',
});
