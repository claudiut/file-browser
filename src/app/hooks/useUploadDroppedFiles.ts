import { useContext } from 'react';
import { FileWithPath } from 'react-dropzone';
import axios from 'axios';
import { useDispatch } from 'react-redux';

import { getDirectoryApiPath, getFileApiPath } from '../helpers/file';
import { RootOptions } from '../contexts';
import { fetchDirectory } from '../components/filesSlice/slice';

type OnDropFiles = (droppedFiles: FileWithPath[]) => Promise<void>;

const useUploadDroppedFiles = (parentPath: string): OnDropFiles => {
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

    return onDropFiles;
};

export default useUploadDroppedFiles;
