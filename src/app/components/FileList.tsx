import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import { File, Files } from '../types/File';
import FileIcon from './FileIcon';
import { getFilename } from '../helpers/file';

export type OpenFileCallback = (file: File) => void;

interface FileListProps {
    files: Array<File>,
    openFile: OpenFileCallback,
    selectedFiles: Files,
    className?: string,
}

const FileList = ({
    files,
    openFile,
    selectedFiles,
    className,
}: FileListProps): JSX.Element => (
    <List className={`file-list ${className}`}>
        {files.map((file: File) => {
            const selected = selectedFiles.includes(file);

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

FileList.defaultProps = {
    className: undefined,
};

export default FileList;
