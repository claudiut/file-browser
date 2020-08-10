import { useState, useEffect } from 'react';
import axios from 'axios';
import sortBy from 'lodash/sortBy';

import { getFilename } from '../helpers/file';
import Directory from '../types/Directory';
import { File } from '../types/File';

type ReturnType = [Error | null, Array<Directory>];

const useRemoteFiles = (requestPath: string, lastSelectedFile?: File): ReturnType => {
    const [directories, setDirectories] = useState<Array<Directory>>([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchFiles = () => {
            const { CancelToken } = axios;
            const source = CancelToken.source();

            // request directory data
            axios.get(requestPath, { cancelToken: source.token })
                .then(({ data }: { data: Array<Directory> }) => {
                    const dirs = data.map((dir): Directory => ({
                        ...dir,
                        files: sortBy(dir.files, ({ path }) => getFilename(path).toLowerCase()),
                    }));
                    setDirectories(dirs);
                })
                .catch((err) => {
                    setError(err);
                });

            return source;
        };

        const { cancel } = fetchFiles();

        return cancel;
    }, [requestPath]);

    return [error, directories];
};

export default useRemoteFiles;
