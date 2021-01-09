import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import qs from 'qs';

import { getDirectoryApiPath, getFileApiPath } from '../../../helpers/file';
import { File } from '../../../types/File';

type DeleteFileParams = {file: File, serverApi: string};

// async action for deleting remote files
export default createAsyncThunk(
    'files/delete',
    async ({ file, serverApi }: DeleteFileParams) => {
        const url = file.isDir ? getDirectoryApiPath(serverApi) : getFileApiPath(serverApi);
        await axios.delete(`${url}?${qs.stringify({ path: file.path })}`);
    },
);
