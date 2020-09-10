import React from 'react';
import { useSelector } from 'react-redux';

import Directory from '../types/Directory';
import FileList from './FileList';

import './FileTree.scss';
import {
    selectFetchError,
    selectIsFetching,
    selectSelectedFile,
} from './filesSlice';
import FilePreview from './FilePreview';
import useFetchAndSelectFilesFromCurrentPath from '../hooks/useFetchAndSelectFilesFromCurrentPath';

const FileTree = (): JSX.Element | null => {
    const directories = useFetchAndSelectFilesFromCurrentPath();
    const selectedFile = useSelector(selectSelectedFile);
    const isFetching = useSelector(selectIsFetching);
    const fetchError = useSelector(selectFetchError);

    const isFetchingDir = selectedFile && selectedFile.isDir && isFetching;
    const listContainerClasses = 'h-100 w-100 overflow-y-auto bn';

    return (
        <div id="file-tree" className="flex h-100">
            {directories.map(({ files, parentPath }: Directory) => (
                <FileList
                    className={listContainerClasses}
                    key={parentPath}
                    files={files}
                />
            ))}

            {
                isFetchingDir
                    ? <div className={listContainerClasses} />
                    : selectedFile && !selectedFile.isDir && (
                        <div className={listContainerClasses}>
                            <FilePreview file={selectedFile} />
                        </div>
                    )
            }

            {fetchError && <div className="h-100 w-100">{fetchError.message}</div>}
        </div>
    );
};

export default FileTree;
