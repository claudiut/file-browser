import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import sortBy from 'lodash/sortBy';

import { getFilename } from '../helpers/file';
import Directory from '../types/Directory';
import FetchStatus from '../enums/FetchStatus';
import AppState, { FilesState } from '../types/AppState';
import { File, Files } from '../types/File';

// async action for fetching remote files
export const fetchDirectory = createAsyncThunk('files/fetchDirectory', async (fetchUrl: string, thunkAPI: { signal: AbortSignal }) => {
    const { CancelToken } = axios;
    const source = CancelToken.source();
    thunkAPI.signal.addEventListener('abort', () => {
        source.cancel();
    });

    const { data } = await axios.get(fetchUrl, { cancelToken: source.token });
    return data;
});

const alphaSortFilesOfDir = (dir: Directory): Directory => ({
    ...dir,
    files: sortBy(dir.files, ({ path }) => getFilename(path).toLowerCase()),
});

const filesSlice = createSlice({
    name: 'files',
    initialState: <FilesState>{
        data: [], selected: [], fetchStatus: FetchStatus.pending, fetchError: null,
    },
    reducers: {
        setSelected: (state, { payload: currentPath }) => {
            const parts = currentPath.slice(1).split('/');
            const selectedPaths = parts.map((_: string, i: number) => `/${parts.slice(0, i + 1).join('/')}`);

            const selectedFiles = <Files>state.data
                .map(({ files }) => (
                    files.find((file) => selectedPaths.includes(file.path))
                ))
                .filter((file: File | undefined) => file);
            // eslint-disable-next-line no-param-reassign
            state.selected = selectedFiles;
        },
    },
    extraReducers: {
        [fetchDirectory.pending.toString()]: (state) => {
            // eslint-disable-next-line no-param-reassign
            state.fetchStatus = FetchStatus.pending;
        },
        [fetchDirectory.fulfilled.toString()]: (state, action) => {
            // eslint-disable-next-line no-param-reassign
            state.fetchStatus = FetchStatus.success;

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
            state.fetchStatus = FetchStatus.failed;
            // eslint-disable-next-line no-param-reassign
            state.fetchError = payload;
        },
    },
});

export default filesSlice.reducer;

export const { setSelected } = filesSlice.actions;

export const selectDirectories = (state: AppState): Array<Directory> => state.files.data;

export const selectSelectedFiles = (state: AppState): Files => state.files.selected;

export const selectFetchStatus = (state: AppState): FetchStatus => state.files.fetchStatus;

export const selectFetchError = (state: AppState): Error | null => state.files.fetchError;
