import React from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import qs from 'qs';

import { File } from '../types/File';
import FileIcon from './FileIcon';
import { getFilename } from '../helpers/file';
import { isFileSelected, selectFile } from './filesSlice';

export type OpenFileCallback = (file: File) => void;

type FileListItemProps = {
    file: File
}

const FileListItem = ({ file }: FileListItemProps): JSX.Element => {
    const selected = useSelector(isFileSelected(file));
    const history = useHistory();

    return (
        <ListItem
            button
            selected={selected}
            className="file-list__item"
            key={file.path}
            onClick={() => {
                selectFile(file);
                history.push(`?${qs.stringify({ path: file.path })}`);
            }}
        >
            <ListItemIcon>
                <FileIcon file={file} isOpen={selected} />
            </ListItemIcon>
            <ListItemText primary={getFilename(file.path)} />
        </ListItem>
    );
};

export default FileListItem;
