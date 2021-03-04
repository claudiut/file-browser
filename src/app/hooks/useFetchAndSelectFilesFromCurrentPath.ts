import { useEffect, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { Action } from 'history';
import AppDispatch from '../types/AppDispatch';
import { fetchDirectory, selectDirectories } from '../components/filesSlice/slice';
import { RootOptions } from '../contexts';
import Directory from '../types/Directory';
import { getDirectoryApiPath } from '../helpers/file';
import usePathQueryStringParam from './usePathQueryStringParam';

const useFetchAndSelectFilesFromCurrentPath = (): Array<Directory> => {
    const dispatch: AppDispatch = useDispatch();
    const { serverApi } = useContext(RootOptions);
    const pathUrlParam = usePathQueryStringParam();
    const history = useHistory();

    useEffect(() => {
        // Fetch all dirs for current path but only on POP action
        // POP is triggered: initially, on go and go back/forward code and browser buttons
        // https://github.com/ReactTraining/history/issues/575#issuecomment-377439137
        if (history.action === Action.Pop) {
            const fetchAndSelectDirs = async () => {
                dispatch(
                    fetchDirectory({
                        fetchUrl: getDirectoryApiPath(serverApi),
                        path: pathUrlParam,
                        withParents: true,
                    }),
                );
            };
            fetchAndSelectDirs();
        }
    }, [pathUrlParam]);

    return useSelector(selectDirectories);
};

export default useFetchAndSelectFilesFromCurrentPath;
