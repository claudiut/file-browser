/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

import { FilesState } from '../../types/AppState';
// reducers
import setSelectedByPathReducer from './reducers/setSelectedByPath';
import addSelectedReducer from './reducers/addSelected';
import fetchDirectoryFulfilledReducer from './reducers/fetchDirectoryFulfilled';
import deleteFileFulfilledReducer from './reducers/deleteFileFulfilled';
// thunks
import fetchDirectory from './thunks/fetchDirectoryAsync';
import deleteFile from './thunks/deleteFileAsync';

const filesSlice = createSlice({
    name: 'files',
    initialState: <FilesState>{
        data: [],
        selected: [],
        isFetching: false,
        fetchError: null,
    },
    reducers: {
        setSelectedByPath: setSelectedByPathReducer,
        addSelected: addSelectedReducer,
        removeLastSelected: (state) => {
            state.selected = state.selected.slice(0, -1);
        },
    },
    extraReducers: {
        [fetchDirectory.pending.toString()]: (
            state,
            { meta: { arg: { showFetching = true } } },
        ) => {
            if (showFetching) {
                state.isFetching = true;
            }
        },
        [fetchDirectory.fulfilled.toString()]: fetchDirectoryFulfilledReducer,
        [fetchDirectory.rejected.toString()]: (state, { payload }) => {
            state.isFetching = false;
            state.fetchError = payload;
        },

        [deleteFile.fulfilled.toString()]: deleteFileFulfilledReducer,
    },
});

// reducers
export default filesSlice.reducer;
// actions
export const { setSelectedByPath, addSelected, removeLastSelected } = filesSlice.actions;
export { fetchDirectory, deleteFile };
// selectors
export * from './selectors';
