import React from 'react';
import List from '@material-ui/core/List';

import { File } from '../types/File';
import FileListItem from './FileListItem';

interface FileListProps {
    files: Array<File>,
    className?: string,
}

const FileList = ({
    files,
    className,
}: FileListProps): JSX.Element => (
    <List className={`file-list ${className}`}>
        {files.map((file: File) => <FileListItem key={file.path} file={file} />)}
    </List>
);

FileList.defaultProps = {
    className: undefined,
};

export default FileList;
