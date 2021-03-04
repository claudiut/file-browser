import { useDispatch } from 'react-redux';
import { useContext } from 'react';

import { RootOptions } from '../contexts';
import { getDirectoryApiPath } from '../helpers/file';
import AppDispatch from '../types/AppDispatch';
import { fetchDirectory } from '../components/filesSlice/slice';

type VoidFunction = () => void;

const useRefreshDirOnCallbackTrue = (
    (
        asyncCallback: () => Promise<boolean>,
        path: string,
        onRefreshed: VoidFunction,
    ): VoidFunction => {
        const dispatch: AppDispatch = useDispatch();
        const { serverApi } = useContext(RootOptions);

        return async () => {
            const shouldRefresh = await asyncCallback();

            if (shouldRefresh) {
                const actionTaken = await dispatch(
                    fetchDirectory({
                        fetchUrl: getDirectoryApiPath(serverApi),
                        path,
                        showFetching: false,
                        sliceChildren: false,
                    }),
                );

                if (actionTaken.type.endsWith('/fulfilled')) {
                    onRefreshed();
                }
            }
        };
    }
);

export default useRefreshDirOnCallbackTrue;
