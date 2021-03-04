import React, { memo, useState } from 'react';
import MuiList from '@material-ui/core/List';
import Dropzone from 'react-dropzone';

import FileListItem from './FileListItem';
import DirectoryOptions from './DirectoryOptions';
import DirectoryNew from './DirectoryNew';
import Directory from '../types/Directory';
import { File } from '../types/File';
import useUploadDroppedFiles from '../hooks/useUploadDroppedFiles';

interface ListProps { files: File[] }
const List = memo(
    ({ files }: ListProps): JSX.Element => (
        <MuiList>
            {files.map(
                (file: File) => <FileListItem key={file.path} file={file} />,
            )}
        </MuiList>
    ),
);

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

    const onDropFiles = useUploadDroppedFiles(parentPath);

    const [dragging, setDragging] = useState(false);
    const highlightUploadZone = () => setDragging(true);
    const unhighlightUploadZone = () => setDragging(false);

    return (
        <div className={`file-list flex flex-column ${className}`}>
            <div>
                <DirectoryOptions onCreateDirectory={() => setCreateDirectoryOpen(true)} />
            </div>

            <div>
                {open && (
                    <DirectoryNew
                        parentPath={parentPath}
                        onCreated={hideDirectoryNew}
                        onCancel={hideDirectoryNew}
                    />
                )}
            </div>

            <div className="flex-auto uploader-dropzone">
                <Dropzone
                    onDrop={onDropFiles}
                    onDragEnter={highlightUploadZone}
                    onDragLeave={unhighlightUploadZone}
                    onDropAccepted={unhighlightUploadZone}
                    noClick
                >
                    {({ getRootProps, getInputProps }) => (
                        <div {...getRootProps()} className={`${dragging ? 'dragging' : ''}`}>
                            <input {...getInputProps()} />
                            <List files={files} />
                        </div>
                    )}
                </Dropzone>
            </div>

        </div>
    );
};

FileList.defaultProps = {
    className: undefined,
};

export default FileList;
