import { AnyAction, createAsyncThunk, ThunkDispatch } from '@reduxjs/toolkit';
import axios from 'axios';
import qs from 'qs';
import { History } from 'history';

import { getDirectoryApiPath, getFileApiPath } from '../../../helpers/file';
import { File } from '../../../types/File';
import AppState from '../../../types/AppState';
import { fetchDirectory, replaceFile } from '../slice';

interface FileUpdates { path: string }
interface UpdateFileParams {
    file: File,
    serverApi: string,
    updates: FileUpdates,
    history: History,
    pathParam: string,
}

// async action for updating file's name/path
export default createAsyncThunk(
    'files/update',
    async (
        {
            file, serverApi, updates, history, pathParam,
        }: UpdateFileParams,
        thunkAPI: { dispatch: ThunkDispatch<AppState, void, AnyAction> },
    ): Promise<File> => {
        const url = file.isDir ? getDirectoryApiPath(serverApi) : getFileApiPath(serverApi);
        const updatedFile = (await axios.put(url, { path: file.path, updates })).data as File;

        thunkAPI.dispatch(replaceFile({ toReplace: file, replacement: updatedFile }));

        // if a selected dir name changed, reconstruct the path and refresh all related files
        const shouldUpdateUrl = !!updates.path && pathParam.startsWith(file.path);
        if (shouldUpdateUrl) {
            // replace first occurrance of the path
            const updatedPathParam = pathParam.replace(file.path, updatedFile.path);
            history.push(`?${qs.stringify({ path: updatedPathParam })}`);

            if (updatedFile.isDir) {
                await thunkAPI.dispatch(
                    fetchDirectory({
                        fetchUrl: getDirectoryApiPath(serverApi),
                        path: updatedPathParam,
                        withParents: true,
                        withParentsTopParent: updatedFile.path,
                        showFetching: false,
                    }),
                );
            }
        }

        return updatedFile;
    },
);
