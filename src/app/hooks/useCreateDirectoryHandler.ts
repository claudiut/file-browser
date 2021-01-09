import { useDispatch } from 'react-redux';
import axios from 'axios';
import { useContext } from 'react';
import qs from 'qs';

import { RootOptions } from '../contexts';
import { getDirectoryApiPath } from '../helpers/file';
import AppDispatch from '../types/AppDispatch';
import { fetchDirectory } from '../components/filesSlice/slice';

type VoidFunction = () => void;

const useCreateDirectoryHandler = (
    (name: string, parentPath: string, onCreated: VoidFunction): VoidFunction => {
        const dispatch: AppDispatch = useDispatch();
        const { serverApi } = useContext(RootOptions);

        return async () => {
            if (!name) {
                return;
            }

            const directoryApiUrl = getDirectoryApiPath(serverApi);

            const newDirPath = `${parentPath}/${name}`;
            const { status } = await axios.post(
                `${directoryApiUrl}?${qs.stringify({ path: newDirPath })}`,
            );

            if (status === 200) {
            // fetch new dir and all parents
                const actionTaken = await dispatch(
                    fetchDirectory({
                        fetchUrl: directoryApiUrl,
                        path: parentPath,
                        showFetching: false,
                        sliceChildren: false,
                    }),
                );
                if (actionTaken.type === fetchDirectory.fulfilled.toString()) {
                    onCreated();
                }
            }
        };
    }
);

export default useCreateDirectoryHandler;
