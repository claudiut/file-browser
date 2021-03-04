import React, { FormEvent, useContext, useState } from 'react';
import { Button, TextField } from '@material-ui/core';

import axios from 'axios';
import qs from 'qs';

import useRefreshDirOnCallbackTrue from '../hooks/useRefreshDirOnCallbackTrue';
import { RootOptions } from '../contexts';
import { getDirectoryApiPath } from '../helpers/file';

interface Props { parentPath: string, onCancel: () => void, onCreated: () => void }

const useDirectoryCreator = (name: string, dirPath: string) => {
    const { serverApi } = useContext(RootOptions);

    return async (): Promise<boolean> => {
        if (!name) {
            return false;
        }

        const directoryApiUrl = getDirectoryApiPath(serverApi);
        const newDirPath = `${dirPath}/${name}`;
        const { status } = await axios.post(
            `${directoryApiUrl}?${qs.stringify({ path: newDirPath })}`,
        );

        return status === 200;
    };
};

const DirectoryNew = ({ parentPath, onCreated, onCancel }: Props): JSX.Element => {
    const [name, setName] = useState('');
    const createDirectory = useDirectoryCreator(name, parentPath);
    const createDirectoryAndRefreshParent = useRefreshDirOnCallbackTrue(
        createDirectory,
        parentPath,
        onCreated,
    );

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        createDirectoryAndRefreshParent();
    };

    return (
        <form className="flex items-center ph2" onSubmit={handleSubmit}>
            {/* eslint-disable-next-line jsx-a11y/no-autofocus */}
            <TextField
                className="flex-auto"
                type="text"
                autoFocus
                value={name}
                onChange={({ target: { value } }) => setName(value)}
            />
            <div className="mh2">
                <Button onClick={onCancel}>Cancel</Button>
            </div>
            <Button type="submit" variant="contained" color="primary">Create</Button>
        </form>
    );
};

export default DirectoryNew;
