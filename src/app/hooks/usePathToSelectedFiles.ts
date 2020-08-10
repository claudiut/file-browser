import { useEffect, Dispatch, SetStateAction } from 'react';

import Directory from '../types/Directory';
import { Files } from '../types/File';

const useSelectFilesBasedOnPath = (
    directories: Array<Directory>,
    path: string,
    setSelectedFiles: Dispatch<SetStateAction<Files>>,
): void => {
    useEffect(() => {
        const parts = path.slice(1).split('/');
        const paths = parts.map((_: string, i: number) => `/${parts.slice(0, i + 1).join('/')}`);

        const relatedFiles = directories.map(({ files }) => (
            files.find((file) => paths.includes(file.path))
        ));
        setSelectedFiles(relatedFiles as Files);
    }, [directories]);
};

export default useSelectFilesBasedOnPath;
