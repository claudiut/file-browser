import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import qs from 'qs';

import { File } from '../types/File';
import FileIcon from './FileIcon';
import { getFilename } from '../helpers/file';
import {
    isFileSelected, fetchDirectory, addSelected, removeFrontDirectories,
} from './filesSlice';
import { RootOptions } from '../contexts';

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
            className="file-list__item"
            key={file.path}
            onClick={() => {
                dispatch(addSelected({ file }));

                if (file.isDir) {
                    dispatch(fetchDirectory({ fetchUrl: serverApi, path: file.path }));
                } else {
                    dispatch(removeFrontDirectories({ file }));
                }

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
