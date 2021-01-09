import React, { useContext } from 'react';
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

type Props = {file: File};

const FileListItemContainer = (FileListItem: FileListItemType) => (
    ({ file }: Props): JSX.Element => {
        const selected = useSelector(isFileSelected(file));
        const dispatch = useDispatch();
        const history = useHistory();
        const { serverApi } = useContext(RootOptions);

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

        return <FileListItem file={file} selected={selected} handleClick={handleClick} />;
    }
);

export default FileListItemContainer;
