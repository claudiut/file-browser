import React, { useContext, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IconButton, Menu, MenuItem } from '@material-ui/core';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import qs from 'qs';

import { useHistory } from 'react-router-dom';
import { File } from '../types/File';
import { deleteFile, isFileSelected } from './filesSlice/slice';
import { RootOptions } from '../contexts';
import AppDispatch from '../types/AppDispatch';
import { getFilename, getParentPath } from '../helpers/file';

type FileMenuPropTypes = { file: File, onRename: () => void };

const FileMenu = ({ file, onRename }: FileMenuPropTypes): JSX.Element => {
    const { serverApi } = useContext(RootOptions);
    const dispatch: AppDispatch = useDispatch();
    const history = useHistory();
    const [deleting, setDeleting] = useState<boolean>(false);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const isSelected = useSelector(isFileSelected(file));

    const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = async () => {
        setAnchorEl(null);
    };

    const handleDelete = async () => {
        // eslint-disable-next-line no-alert, no-restricted-globals
        if (!confirm(`Are you sure you delete directory "${getFilename(file.path)}"?`)) {
            return;
        }

        setDeleting(true);
        const actionTaken = await dispatch(deleteFile({ file, serverApi }));

        if (actionTaken.type === deleteFile.rejected.toString()) {
            setDeleting(false);
        }

        if (isSelected && actionTaken.type === deleteFile.fulfilled.toString()) {
            history.push(`?${qs.stringify({ path: getParentPath(file.path) })}`);
        }
    };

    const handleRename = () => {
        setAnchorEl(null);
        // pragmatic aproach to autofocus; otherwise should use a ref
        setTimeout(onRename);
    };

    return (
        <>
            <IconButton
                aria-controls="file-menu"
                aria-haspopup="true"
                aria-label="Open"
                onClick={handleOpen}
            >
                <MoreHorizIcon />
            </IconButton>
            <Menu
                id="file-menu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={handleRename} disabled={deleting}>Rename</MenuItem>
                <MenuItem onClick={handleDelete} disabled={deleting}>Delete</MenuItem>
            </Menu>
        </>
    );
};

export default FileMenu;
