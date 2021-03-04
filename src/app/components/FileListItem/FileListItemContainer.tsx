import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import qs from 'qs';

import { File } from '../../types/File';
import { getDirectoryApiPath } from '../../helpers/file';
import {
    isFileSelected, fetchDirectory, addSelected,
} from '../filesSlice/slice';
import { RootOptions } from '../../contexts';
import { FileListItemType } from './FileListItem';
import usePathQueryStringParam from '../../hooks/usePathQueryStringParam';
import updateFile from '../filesSlice/thunks/updateFileAsync';

type Props = {file: File};

const FileListItemContainer = (FileListItem: FileListItemType) => (
    ({ file }: Props): JSX.Element => {
        const selected = useSelector(isFileSelected(file));
        const [editingName, setEditingName] = useState<boolean>(false);
        const dispatch = useDispatch();
        const history = useHistory();
        const { serverApi } = useContext(RootOptions);
        const pathParam = usePathQueryStringParam();

        const handleEditName = (newName: string) => {
            const sep = '/';
            const newPath = file.path.split(sep).slice(0, -1).join(sep) + sep + newName;
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

        const handleClick = () => {
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
        };

        return (
            <FileListItem
                file={file}
                selected={selected}
                editingName={editingName}
                onClick={handleClick}
                onClickRename={() => setEditingName(true)}
                onEditNameCancel={() => setEditingName(false)}
                onEditedName={handleEditName}
            />
        );
    }
);

export default FileListItemContainer;
