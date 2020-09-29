import React, { useState, useContext, FormEvent } from 'react';
import { Button, TextField } from '@material-ui/core';
import axios from 'axios';
import qs from 'qs';

import { useDispatch } from 'react-redux';
import { getDirectoryApiPath } from '../helpers/file';
import { RootOptions } from '../contexts';
import { fetchDirectory } from './filesSlice/slice';
import AppDispatch from '../types/AppDispatch';

type Props = { parentPath: string, onCancel: () => void, onCreated: () => void };

const DirectoryNew = ({ parentPath, onCreated, onCancel }: Props): JSX.Element => {
    const [name, setName] = useState('');
    const { serverApi } = useContext(RootOptions);
    const dispatch: AppDispatch = useDispatch();

    const handleCreateDirectory = async (event: FormEvent) => {
        event.preventDefault();

        if (!name) {
            return;
        }

        const directoryApiUrl = getDirectoryApiPath(serverApi);

        const newDirPath = `${parentPath}/${name}`;
        const { status } = await axios.post(
            `${directoryApiUrl}?${qs.stringify({ path: newDirPath })}`,
        );

        if (status === 200) {
            // fetch new dir and all parents
            const actionTaken = await dispatch(
                fetchDirectory({
                    fetchUrl: directoryApiUrl,
                    path: parentPath,
                    showFetching: false,
                    sliceChildren: false,
                }),
            );
            if (actionTaken.type === fetchDirectory.fulfilled.toString()) {
                onCreated();
            }
        }
    };

    return (
        <form className="flex items-center ph2 mv0" onSubmit={handleCreateDirectory}>
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
