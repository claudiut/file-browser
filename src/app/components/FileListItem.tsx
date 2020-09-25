import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import qs from 'qs';

import { ListItemAvatar, ListItemSecondaryAction } from '@material-ui/core';
import { File } from '../types/File';
import FileIcon from './FileIcon';
import { getFilename, getDirectoryApiPath } from '../helpers/file';
import {
    isFileSelected, fetchDirectory, addSelected,
} from './filesSlice/slice';
import { RootOptions } from '../contexts';
import FileMenu from './FileMenu';

export type OpenFileCallback = (file: File) => void;

type FileListItemProps = {
    file: File
}

const FileListItem = ({ file }: FileListItemProps): JSX.Element => {
    const selected = useSelector(isFileSelected(file));
    const dispatch = useDispatch();
    const history = useHistory();
    const { serverApi } = useContext(RootOptions);

    return (
        <ListItem
            button
            selected={selected}
            ContainerProps={{ className: 'file-list__item-container' }}
            key={file.path}
            onClick={() => {
                dispatch(addSelected({ file }));
                if (file.isDir) {
                    dispatch(
                        fetchDirectory({
                            fetchUrl: getDirectoryApiPath(serverApi),
                            path: file.path,
                        }),
                    );
                }

                history.push(`?${qs.stringify({ path: file.path })}`);
            }}
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
};

export default FileListItem;
