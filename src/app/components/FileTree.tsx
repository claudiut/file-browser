import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import qs from 'qs';
import { isEqual } from 'lodash';

import Directory from '../types/Directory';
import FileList from './FileList';

import './FileTree.scss';
import {
    fetchDirectory,
    setSelectedByPath,
    selectDirectories,
    selectFetchError,
} from './filesSlice';
import AppDispatch from '../types/AppDispatch';
import usePrevious from '../hooks/usePrevious';

type FileTreeProps = {
    serverApi: string,
}

const FileTree = ({ serverApi }: FileTreeProps): JSX.Element | null => {
    const { search } = useLocation();
    const { path = '/' } = qs.parse(search.slice(1));

    const directories = useSelector(selectDirectories);
    const prevDirectories = usePrevious(directories);
    const fetchError = useSelector(selectFetchError);

    const dispatch: AppDispatch = useDispatch();

    useEffect(() => {
        const fetchPromise = dispatch(fetchDirectory({ fetchUrl: `${serverApi}/files`, path }));
        return () => { fetchPromise.abort(); };
    }, [path]);

    useEffect(() => {
        if (!isEqual(directories, prevDirectories)) {
            dispatch(setSelectedByPath({ path, directories }));
        }
    }, [path, directories]);

    return (
        <div id="file-tree" className="flex h-100">
            {directories.map(({ files, parentPath }: Directory) => (
                <FileList
                    className="h-100 w-100 overflow-y-auto"
                    key={parentPath}
                    files={files}
                />
            ))}
            {fetchError && <div className="h-100 w-100">{fetchError.message}</div>}
        </div>
    );
};

export default FileTree;
