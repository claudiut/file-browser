import React, { useState } from 'react';
import List from '@material-ui/core/List';

import { File } from '../types/File';
import FileListItem from './FileListItem';
import DirectoryOptions from './DirectoryOptions';
import DirectoryNew from './DirectoryNew';
import Directory from '../types/Directory';

interface FileListProps {
    directory: Directory,
    className?: string,
}

const FileList = ({
    directory: { files, parentPath },
    className,
}: FileListProps): JSX.Element => {
    const [open, setCreateDirectoryOpen] = useState(false);
    const hideDirectoryNew = () => setCreateDirectoryOpen(false);

    return (
        <div className={`file-list ${className}`}>
            <DirectoryOptions onCreateDirectory={() => setCreateDirectoryOpen(true)} />
            <List>
                {files.map((file: File) => <FileListItem key={file.path} file={file} />)}
            </List>

            {open && (
                <DirectoryNew
                    parentPath={parentPath}
                    onCreated={hideDirectoryNew}
                    onCancel={hideDirectoryNew}
                />
            )}
        </div>
    );
};

FileList.defaultProps = {
    className: undefined,
};

export default FileList;
