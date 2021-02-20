import { useEffect, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import qs from 'qs';

import AppDispatch from '../types/AppDispatch';
import { fetchDirectory, selectDirectories } from '../components/filesSlice/slice';
import { RootOptions } from '../contexts';
import Directory from '../types/Directory';
import { getDirectoryApiPath } from '../helpers/file';

const useFetchAndSelectFilesFromCurrentPath = (): Array<Directory> => {
    const dispatch: AppDispatch = useDispatch();
    const { serverApi } = useContext(RootOptions);
    const { search } = useLocation();

    useEffect(() => {
        const fetchAndSelectDirs = async () => {
            // ! don't use the path as the source of truth but use the redux state
            const path = (qs.parse(search.slice(1)).path || '/') as string;

            dispatch(
                fetchDirectory({
                    fetchUrl: getDirectoryApiPath(serverApi),
                    path,
                    withParents: true,
                }),
            );
        };

        fetchAndSelectDirs();
    }, []);

    return useSelector(selectDirectories);
};

export default useFetchAndSelectFilesFromCurrentPath;
