import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { ListItemAvatar, ListItemSecondaryAction } from '@material-ui/core';

import { File } from '../../types/File';
import FileIcon from '../FileIcon';
import { getFilename } from '../../helpers/file';
import FileMenu from '../FileMenu';
import TextFieldForm from '../TextFieldForm';

type Props = {
    file: File,
    selected: boolean,
    editingName: boolean,
    onClick: () => void
    onEditedName: (name: string) => void
    onEditNameCancel: () => void
    onClickRename: () => void
};

const FileListItem = ({
    file,
    onClick,
    onEditedName,
    selected,
    editingName,
    onEditNameCancel,
    onClickRename,
}: Props): JSX.Element => {
    const filename = getFilename(file.path);

    return (
        <ListItem
            button
            selected={selected}
            ContainerProps={{ className: 'file-list__item-container' }}
            key={file.path}
            onClick={onClick}
        >
            <ListItemAvatar>
                <FileIcon file={file} isSelected={selected} />
            </ListItemAvatar>
            <ListItemText>
                {
                    editingName
                        ? (
                            <TextFieldForm
                                value={filename}
                                onSave={onEditedName}
                                onCancel={onEditNameCancel}
                            />
                        )
                        : filename
                }
            </ListItemText>
            <ListItemSecondaryAction className="actions">
                {!editingName && <FileMenu file={file} onRename={onClickRename} />}
            </ListItemSecondaryAction>
        </ListItem>
    );
};

export type FileListItemType = typeof FileListItem;
export default FileListItem;
