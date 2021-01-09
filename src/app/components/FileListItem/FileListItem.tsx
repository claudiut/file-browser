import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import { ListItemAvatar, ListItemSecondaryAction } from '@material-ui/core';
import { File } from '../../types/File';
import FileIcon from '../FileIcon';
import { getFilename } from '../../helpers/file';
import FileMenu from '../FileMenu';

type Props = {
    file: File,
    selected: boolean,
    handleClick: () => void
};

const FileListItem = ({ file, handleClick, selected }: Props): JSX.Element => (
    <ListItem
        button
        selected={selected}
        ContainerProps={{ className: 'file-list__item-container' }}
        key={file.path}
        onClick={handleClick}
    >
        <ListItemAvatar>
            <FileIcon file={file} isSelected={selected} />
        </ListItemAvatar>
        <ListItemText>{getFilename(file.path)}</ListItemText>
        <ListItemSecondaryAction className="actions">
            <FileMenu file={file} />
        </ListItemSecondaryAction>
    </ListItem>
);

export type FileListItemType = typeof FileListItem;
export default FileListItem;
