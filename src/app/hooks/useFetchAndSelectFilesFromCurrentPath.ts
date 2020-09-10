import { useEffect, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import qs from 'qs';

import AppDispatch from '../types/AppDispatch';
import { fetchDirectory, setSelectedByPath, selectDirectories } from '../components/filesSlice';
import { RootOptions } from '../contexts';
import Directory from '../types/Directory';

const useFetchAndSelectFilesFromCurrentPath = (): Array<Directory> => {
    const { search } = useLocation();
    // don't use the path as the source of truth but use the redux state
    const path = (qs.parse(search.slice(1)).path || '/') as string;

    const { serverApi } = useContext(RootOptions);
    const dispatch: AppDispatch = useDispatch();

    useEffect(() => {
        const fetchAndSelectDirs = async () => {
            const actionTaken = await dispatch(
                fetchDirectory({ fetchUrl: serverApi, path, withParents: true }),
            );
            if (actionTaken.type === fetchDirectory.fulfilled.toString()) {
                dispatch(setSelectedByPath({ path, directories: actionTaken.payload }));
            }
        };

        fetchAndSelectDirs();
    }, []);

    return useSelector(selectDirectories);
};

export default useFetchAndSelectFilesFromCurrentPath;
