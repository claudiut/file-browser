import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import sortBy from 'lodash/sortBy';
import qs from 'qs';

import { getFilename } from '../helpers/file';
import Directory from '../types/Directory';
import AppState, { FilesState } from '../types/AppState';
import { File, Files } from '../types/File';
import QsParsedValue from '../types/QsParsedValue';

type FetchDirectoryParams = { fetchUrl: string, path: QsParsedValue };

// async action for fetching remote files
export const fetchDirectory = createAsyncThunk(
    'files/fetchDirectory',
    async (
        { fetchUrl, path }: FetchDirectoryParams,
        thunkAPI: { signal: AbortSignal, getState: () => unknown },
    ) => {
        const { CancelToken } = axios;
        const source = CancelToken.source();
        thunkAPI.signal.addEventListener('abort', () => {
            source.cancel();
        });

        const queryParams = { path, withParents: false };
        if (!(thunkAPI.getState() as AppState).files.initialized) {
            queryParams.withParents = true;
        }
        const queryString = qs.stringify(queryParams);

        const { data } = await axios.get(`${fetchUrl}?${queryString}`, { cancelToken: source.token });

        return data;
    },
);

const alphaSortFilesOfDir = (dir: Directory): Directory => ({
    ...dir,
    files: sortBy(dir.files, ({ path }) => getFilename(path).toLowerCase()),
});

const filesSlice = createSlice({
    name: 'files',
    initialState: <FilesState>{
        data: [],
        selected: [],
        currentlyFetching: null,
        fetchError: null,
        initialized: false,
    },
    reducers: {
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

            // eslint-disable-next-line no-param-reassign
            state.selected = selectedFiles;
        },
        selectFile: (state, { payload }: { payload: File }) => {
            // eslint-disable-next-line no-param-reassign
            // state.selected = state.selected.slice(0, payload.depth);
            state.selected.push(payload);
        },
    },
    extraReducers: {
        [fetchDirectory.pending.toString()]: (state, { meta: { arg: { path } } }) => {
            // eslint-disable-next-line no-param-reassign
            state.currentlyFetching = path;
        },
        [fetchDirectory.fulfilled.toString()]: (state, action) => {
            // eslint-disable-next-line no-param-reassign
            state.initialized = true;

            // eslint-disable-next-line no-param-reassign
            state.currentlyFetching = null;

            if (Array.isArray(action.payload)) {
                // eslint-disable-next-line no-param-reassign
                state.data = action.payload.map(alphaSortFilesOfDir);
                return;
            }

            const directory = alphaSortFilesOfDir(action.payload);

            // remove the unnecessary dirs when we chose a parent dir
            // eslint-disable-next-line no-param-reassign
            state.data = state.data.slice(0, directory.depth);
            // eslint-disable-next-line no-param-reassign
            state.data.push(directory);
        },
        [fetchDirectory.rejected.toString()]: (state, { payload }) => {
            // eslint-disable-next-line no-param-reassign
            state.currentlyFetching = null;
            // eslint-disable-next-line no-param-reassign
            state.fetchError = payload;
        },
    },
});

export default filesSlice.reducer;

export const { setSelectedByPath, selectFile } = filesSlice.actions;

export const selectDirectories = (state: AppState): Array<Directory> => state.files.data;

export const selectSelectedFiles = (state: AppState): Files => state.files.selected;

export const isCurrenlyFetching = (file: File) => (
    (state: AppState): boolean => state.files.currentlyFetching === file.path
);

export const isFileSelected = (file: File) => (state: AppState): boolean => (
    state.files.selected.some((selectedFile: File) => selectedFile.path === file.path)
);
export const selectFetchError = (state: AppState): Error | null => state.files.fetchError;
