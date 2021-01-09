import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import qs from 'qs';

import QsParsedValue from '../../../types/QsParsedValue';

type FetchDirectoryParams = {
    fetchUrl: string,
    path: QsParsedValue,
    withParents?: boolean,
    showFetching?: boolean,
    sliceChildren?: boolean,
};
// async action for fetching remote directory
export default createAsyncThunk(
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
