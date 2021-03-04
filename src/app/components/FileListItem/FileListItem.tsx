import React, { useContext, useState } from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { useDispatch } from 'react-redux';
import { ListItemAvatar, ListItemSecondaryAction } from '@material-ui/core';
import { useHistory, useLocation } from 'react-router-dom';

import { File } from '../../types/File';
import FileIcon from '../FileIcon';
import { getFilename } from '../../helpers/file';
import FileMenu from '../FileMenu';
import TextFieldForm from '../TextFieldForm';
import { updateFile } from '../filesSlice/slice';
import { RootOptions } from '../../contexts';
import usePathQueryStringParam from '../../hooks/usePathQueryStringParam';

type Props = {
    file: File,
    selected: boolean,
    handleClick: () => void
};

const FileListItem = ({ file, handleClick, selected }: Props): JSX.Element => {
    const filename = getFilename(file.path);

    const [editingName, setEditingName] = useState<boolean>(false);
    const dispatch = useDispatch();
    const { serverApi } = useContext(RootOptions);
    const history = useHistory();
    const pathParam = usePathQueryStringParam();

    const handleEditName = (newName: string) => {
        const sep = '/';
        const pathParts = file.path.split(sep);
        const newPath = pathParts.slice(0, -1).join(sep) + sep + newName;
        dispatch(
            updateFile({
                file,
                serverApi,
                updates: { path: newPath },
                history,
                pathParam,
            }),
        );
    };

    return (
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
            <ListItemText>
                {
                    editingName
                        ? (
                            <TextFieldForm
                                value={filename}
                                onSave={handleEditName}
                                onCancel={() => setEditingName(false)}
                            />
                        )
                        : filename
                }
            </ListItemText>
            <ListItemSecondaryAction className="actions">
                {!editingName && <FileMenu file={file} onRename={() => setEditingName(true)} />}
            </ListItemSecondaryAction>
        </ListItem>
    );
};

export type FileListItemType = typeof FileListItem;
export default FileListItem;
