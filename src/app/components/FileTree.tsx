import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';
import sortBy from 'lodash/sortBy';

import { Files } from '../types/File';
import FileList, { OpenFileCallback } from './FileList';
import { getFilename } from '../helpers/file';

import { ServerApi } from '../types/props';

import './FileTree.scss';

interface FileTreeProps {
    serverApi: ServerApi,
};

interface Directory {
    files: Files,
    parentPath: string,
    depth: number,
};

const FileTree = ({ serverApi }: FileTreeProps): JSX.Element => {
    const { 0: path } = useParams();
    const history = useHistory();

    const [selectedFilePaths, setSelectedFilePaths] = useState<Array<string>>([]);
    const [directories, setDirectories] = useState<Array<Directory>>([]);

    useEffect(() => {
        const fetchFiles = () => {
            const CancelToken = axios.CancelToken;
            const source = CancelToken.source();

            const requestPath = `${serverApi as string}${path}`;

            // request directory data
            axios.get(requestPath, { cancelToken: source.token })
                .then(({ data }: { data: Array<Directory> }) => {
                    const dirs = data.map((dir): Directory => ({
                        ...dir,
                        files: sortBy(dir.files, ({ path }) => getFilename(path).toLowerCase())
                    }));
                    setDirectories(dirs);
                })
                .catch((err) => {
                    console.log(`Error for ${requestPath}`, err);
                })

            return source;
        };

        const { cancel } = fetchFiles();

        return cancel;
    }, [serverApi, path]);

    useEffect(() => {
        const parts = path.slice(1).split('/');
        const selectedFilePaths = parts.map((_: string, i: number) => `/${parts.slice(0, i + 1).join('/')}`);
        setSelectedFilePaths(selectedFilePaths);
    }, [path]);

    const handleOpenFile: OpenFileCallback = (selectedFile) => {
        setSelectedFilePaths((paths: Array<string>) => (
            paths.includes(selectedFile.path)
                ? paths
                : [...paths, selectedFile.path]
        ));
        history.push(selectedFile.path);
    }

    return (
        <div id="file-tree" className="flex h-100">
            {directories.map(({ files, parentPath, depth }: Directory) => (
                <FileList
                    className="h-100 w-100 overflow-y-auto"
                    key={parentPath}
                    files={files}
                    openFile={handleOpenFile}
                    selectedFilePaths={selectedFilePaths}
                />
            )
            )}
        </div>
    );
};

export default FileTree;