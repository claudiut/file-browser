/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import qs from 'qs';

import Directory from '../../types/Directory';
import AppState, { FilesState } from '../../types/AppState';
import { File, Files } from '../../types/File';
import QsParsedValue from '../../types/QsParsedValue';
import {
    alphaSortFilesOfDir,
    getDirectoryApiPath,
    getDirectoryOfFile,
    getFileApiPath,
    containsFile,
} from '../../helpers/file';

// TODO: reorganize file. Too big.
// TODO: create

type FetchDirectoryParams = {
    fetchUrl: string,
    path: QsParsedValue,
    withParents?: boolean,
    showFetching?: boolean,
    sliceChildren?: boolean,
};
// async action for fetching remote directory
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

type DeleteFileParams = {file: File, serverApi: string};
// async action for deleting remote files
export const deleteFile = createAsyncThunk(
    'files/delete',
    async ({ file, serverApi }: DeleteFileParams) => {
        const url = file.isDir ? getDirectoryApiPath(serverApi) : getFileApiPath(serverApi);
        await axios.delete(`${url}?${qs.stringify({ path: file.path })}`);
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
            state.data = state.data.slice(0, fileDir.depth + 1);
        },

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
        [fetchDirectory.fulfilled.toString()]: (state, action) => {
            state.isFetching = false;

            if (Array.isArray(action.payload)) {
                state.data = action.payload.map(alphaSortFilesOfDir);
                return;
            }

            const directory = alphaSortFilesOfDir(action.payload);

            // TODO: refactor
            if (action.meta.arg.sliceChildren !== false) {
                // remove the unnecessary dirs when we chose a parent dir
                state.data = state.data.slice(0, directory.depth);
                state.data.push(directory);
                return;
            }

            const dirIndex = state.data.findIndex(
                ({ parentPath }: Directory) => parentPath === directory.parentPath,
            );
            if (dirIndex !== -1) {
                state.data[dirIndex] = directory;
            }
        },
        [fetchDirectory.rejected.toString()]: (state, { payload }) => {
            state.isFetching = false;
            state.fetchError = payload;
        },

        [deleteFile.fulfilled.toString()]: (state, { meta: { arg: { file } } }) => {
            // remove obsolete/deleted selections and directories
            if (containsFile(state.selected, file)) {
                state.selected = state.selected.filter(({ path }: File) => path !== file.path);

                const newDirs = [];
                for (const dir of state.data) {
                    newDirs.push(dir);
                    if (containsFile(dir.files, file)) {
                        break;
                    }
                }
                state.data = newDirs;
            }

            // remove the file itself
            state.data = state.data.map((dir) => ({
                ...dir,
                files: dir.files.filter(({ path }) => path !== file.path),
            }));
        },
    },
});

export default filesSlice.reducer;

export const {
    setSelectedByPath,
    addSelected,
    removeLastSelected,
} = filesSlice.actions;

export const selectDirectories = (state: AppState): Array<Directory> => state.files.data;

export const isFileSelected = (file: File) => (state: AppState): boolean => (
    containsFile(state.files.selected, file)
);

export const selectSelectedFile = (state: AppState): File | null => (
    state.files.selected[state.files.selected.length - 1] || null
);
export const selectFetchError = (state: AppState): Error | null => state.files.fetchError;

export const selectIsFetching = (
    (state: AppState): boolean => state.files.isFetching
);
