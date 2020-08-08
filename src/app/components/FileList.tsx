import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import { File } from '../types/File';
import FileIcon from './FileIcon';
import { getFilename } from '../helpers/file';

export type OpenFileCallback = (file: File) => void;

interface FileListProps {
    files: Array<File>,
    openFile: OpenFileCallback,
    selectedFilePaths: Array<string>,
    className?: string,
};

const FileList = ({ files, openFile, selectedFilePaths, className }: FileListProps): JSX.Element => {
    return (
        <List className={`file-list ${className}`}>
            {files.map((file) => {
                const selected = selectedFilePaths.includes(file.path);
                return (
                    <ListItem
                        button
                        selected={selected}
                        className="file-list__item"
                        key={file.path}
                        onClick={() => openFile(file)}
                    >
                        <ListItemIcon>
                            <FileIcon file={file} isOpen={selected} />
                        </ListItemIcon>
                        <ListItemText primary={getFilename(file.path)} />
                    </ListItem>
                );
            })}
        </List>
    );
};

export default FileList;