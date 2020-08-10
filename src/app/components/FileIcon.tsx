import React from 'react';
import MuiFolderIcon from '@material-ui/icons/Folder';
import MuiFolderOpenIcon from '@material-ui/icons/FolderOpen';
import MuiInsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
import MuiInsertDriveFileOutlinedIcon from '@material-ui/icons/InsertDriveFileOutlined';

import { File } from '../types/File';

const folderStyle = { color: '#CAB869' };
const fileFontSize = 'small';

const FileIcon = ({ file: { isDir }, isOpen }: { file: File, isOpen: boolean }): JSX.Element => {
    if (isDir) {
        return (
            isOpen
                ? <MuiFolderOpenIcon style={folderStyle} />
                : <MuiFolderIcon style={folderStyle} />
        );
    }

    return isOpen
        ? <MuiInsertDriveFileOutlinedIcon fontSize={fileFontSize} />
        : <MuiInsertDriveFileIcon fontSize={fileFontSize} />;
};

export default FileIcon;
