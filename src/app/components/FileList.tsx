import React, { useContext, useState } from 'react';
import List from '@material-ui/core/List';
import Dropzone, { FileWithPath } from 'react-dropzone';

import axios from 'axios';
import { useDispatch } from 'react-redux';
import FileListItem from './FileListItem';
import DirectoryOptions from './DirectoryOptions';
import DirectoryNew from './DirectoryNew';
import Directory from '../types/Directory';
import { File } from '../types/File';
import { getDirectoryApiPath, getFileApiPath } from '../helpers/file';
import { RootOptions } from '../contexts';
import { fetchDirectory } from './filesSlice/slice';

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

    const { serverApi } = useContext(RootOptions);
    const dispatch = useDispatch();

    const onDropFiles = async (droppedFiles: FileWithPath[]) => {
        const formData: FormData = new FormData();

        droppedFiles.forEach((droppedFile) => {
            formData.append('files', droppedFile, droppedFile.name);
        });
        formData.append('path', parentPath);

        const { status } = await axios.post(getFileApiPath(serverApi), formData, {
            // TODO: implement client + server
            onUploadProgress: (progressEvent: ProgressEvent) => {
                console.log(Math.round((progressEvent.loaded / progressEvent.total) * 100), '%');
            },
        });
        if (status === 201) {
            dispatch(fetchDirectory({
                fetchUrl: getDirectoryApiPath(serverApi),
                path: parentPath,
                showFetching: false,
                sliceChildren: false,
            }));
        }
    };

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
                <Dropzone onDrop={onDropFiles} noClick>
                    {({ getRootProps, getInputProps }) => (
                        <div {...getRootProps()}>
                            <input {...getInputProps()} />
                            <List>
                                {files.map(
                                    (file: File) => <FileListItem key={file.path} file={file} />,
                                )}
                            </List>
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
