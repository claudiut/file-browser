import React, { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import qs from 'qs';

import Directory from '../types/Directory';
import FileList, { OpenFileCallback } from './FileList';
import useRemoteFiles from '../hooks/useRemoteFiles';

import './FileTree.scss';
import { Files } from '../types/File';
import useSelectFilesBasedOnPath from '../hooks/usePathToSelectedFiles';

interface FileTreeProps {
    serverApi: string,
}

const FileTree = ({ serverApi }: FileTreeProps): JSX.Element => {
    const [selectedFiles, setSelectedFiles] = useState<Files>([]);

    const history = useHistory();
    const { search } = useLocation();
    const { path = '/' } = qs.parse(search.slice(1));

    const [error, directories] = useRemoteFiles(`${serverApi}${path}`, selectedFiles.slice(-1)[0]);

    useSelectFilesBasedOnPath(directories, path as string, setSelectedFiles);

    const handleOpenFile: OpenFileCallback = (selectedFile) => {
        // we save the selected files' paths into state so that the UI is behaving optimistically
        setSelectedFiles((files: Files) => (
            files.includes(selectedFile) ? selectedFiles : [...selectedFiles, selectedFile]
        ));
        history.push(`?${qs.stringify({ path: selectedFile.path })}`);
    };

    if (error) {
        return (
            <div>
                An error has occured while fetching the files:
                {' '}
                {error.message}
            </div>
        );
    }

    return (
        <div id="file-tree" className="flex h-100">
            {directories.map(({ files, parentPath }: Directory) => (
                <FileList
                    className="h-100 w-100 overflow-y-auto"
                    key={parentPath}
                    files={files}
                    openFile={handleOpenFile}
                    selectedFiles={selectedFiles}
                />
            ))}
        </div>
    );
};

export default FileTree;
