/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import qs from 'qs';

import Directory from '../types/Directory';
import AppState, { FilesState } from '../types/AppState';
import { File, Files } from '../types/File';
import QsParsedValue from '../types/QsParsedValue';
import {
    alphaSortFilesOfDir, getDirectoryOfFile, removeFrontDirectories,
} from '../helpers/file';

type FetchDirectoryParams = { fetchUrl: string, path: QsParsedValue, withParents?: boolean };

// async action for fetching remote files
export const fetchDirectory = createAsyncThunk(
    'files/fetchDirectory',
    async (
        { fetchUrl, path, withParents = false }: FetchDirectoryParams,
        thunkAPI: { signal: AbortSignal, getState: () => unknown },
    ) => {
        const { CancelToken } = axios;
        const source = CancelToken.source();
        thunkAPI.signal.addEventListener('abort', () => {
            source.cancel();
        });

        const queryString = qs.stringify({ path, withParents });
        const { data } = await axios.get(`${fetchUrl}?${queryString}`, { cancelToken: source.token });

        return data;
    },
);

const filesSlice = createSlice({
    name: 'files',
    initialState: <FilesState>{
        data: [],
        selected: [],
        isFetching: false,
        fetchError: null,
    },
    reducers: {
        // see what directories are currently selected based on the path
        setSelectedByPath: (state, { payload: { path: currentPath, directories } }) => {
            const parts = currentPath.slice(1).split('/');
            const selectedPaths = parts.map((_: string, i: number) => `/${parts.slice(0, i + 1).join('/')}`);

            if (!directories.length) {
                return;
            }

            const selectedFiles = directories
                .map(({ files }: { files: Files }) => (
                    files.find((file) => selectedPaths.includes(file.path))
                ))
                .filter((file: File | undefined) => file);

            state.selected = selectedFiles;
        },

        // remove selection of files with gte depth and add the newly selected one
        addSelected: (state, { payload: { file } }) => {
            const fileDir = getDirectoryOfFile(file, state.data);
            state.selected = state.selected.slice(0, fileDir.depth).concat([file]);

            state.data = removeFrontDirectories(file, state.data);
        },
    },
    extraReducers: {
        [fetchDirectory.pending.toString()]: (state) => {
            state.isFetching = true;
        },
        [fetchDirectory.fulfilled.toString()]: (state, action) => {
            state.isFetching = false;

            if (Array.isArray(action.payload)) {
                state.data = action.payload.map(alphaSortFilesOfDir);
                return;
            }

            const directory = alphaSortFilesOfDir(action.payload);

            // remove the unnecessary dirs when we chose a parent dir
            state.data = state.data.slice(0, directory.depth);
            state.data.push(directory);
        },
        [fetchDirectory.rejected.toString()]: (state, { payload }) => {
            state.isFetching = false;
            state.fetchError = payload;
        },
    },
});

export default filesSlice.reducer;

export const { setSelectedByPath, addSelected } = filesSlice.actions;

export const selectDirectories = (state: AppState): Array<Directory> => state.files.data;

export const isFileSelected = (file: File) => (state: AppState): boolean => (
    state.files.selected.some((selectedFile: File) => selectedFile.path === file.path)
);

export const selectSelectedFile = (state: AppState): File | null => (
    state.files.selected[state.files.selected.length - 1] || null
);
export const selectFetchError = (state: AppState): Error | null => state.files.fetchError;

export const selectIsFetching = (
    (state: AppState): boolean => state.files.isFetching
);
