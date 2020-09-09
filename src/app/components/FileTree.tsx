import React, { useEffect, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import qs from 'qs';

import Directory from '../types/Directory';
import FileList from './FileList';

import './FileTree.scss';
import {
    fetchDirectory,
    setSelectedByPath,
    selectDirectories,
    selectFetchError,
    selectCurrentlyFetchingPath,
    selectSelectedFile,
} from './filesSlice';
import AppDispatch from '../types/AppDispatch';
import { getParentPath } from '../helpers/file';
import { RootOptions } from '../contexts';
import FilePreview from './FilePreview';

const FileTree = (): JSX.Element | null => {
    const { search } = useLocation();
    // don't use the path as the source of truth but use the redux state
    const { path: qsPath = '/' } = qs.parse(search.slice(1));
    const path = qsPath as string;

    const directories = useSelector(selectDirectories);
    const selectedFile = useSelector(selectSelectedFile);
    const fetchError = useSelector(selectFetchError);
    const currentlyFetchingPath = useSelector(selectCurrentlyFetchingPath);
    const { serverApi } = useContext(RootOptions);

    const dispatch: AppDispatch = useDispatch();

    useEffect(() => {
        const fetchAndSelectDirs = async () => {
            const actionTaken = await dispatch(fetchDirectory({ fetchUrl: serverApi, path, withParents: true }));
            if (actionTaken.type === fetchDirectory.fulfilled.toString()) {
                dispatch(setSelectedByPath({ path, directories: actionTaken.payload }));
            }
        };

        fetchAndSelectDirs();
    }, []);

    const listContainerClasses = 'h-100 w-100 overflow-y-auto bn';

    const isLoadingDir = selectedFile && selectedFile.isDir && currentlyFetchingPath;
    let parentOfLoadingDir;
    if (isLoadingDir) {
        const parentOfLoadingPath = getParentPath(currentlyFetchingPath as string);
        parentOfLoadingDir = directories.find(
            ({ parentPath }) => parentPath === parentOfLoadingPath,
        );
    }
    const dirsToRender = isLoadingDir && parentOfLoadingDir
        ? directories.slice(0, parentOfLoadingDir.depth + 1)
        : directories;

    return (
        <div id="file-tree" className="flex h-100">
            {dirsToRender.map(({ files, parentPath }: Directory) => (
                <FileList
                    className={listContainerClasses}
                    key={parentPath}
                    files={files}
                />
            ))}

            {isLoadingDir && <div className={listContainerClasses} />}

            {selectedFile && !selectedFile.isDir && (
                <div className={listContainerClasses}>
                    <FilePreview file={selectedFile} />
                </div>
            )}

            {fetchError && <div className="h-100 w-100">{fetchError.message}</div>}
        </div>
    );
};

export default FileTree;
