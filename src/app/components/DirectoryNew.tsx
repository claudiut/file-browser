import React, { useState, useContext, FormEvent } from 'react';
import { Button, TextField } from '@material-ui/core';
import axios from 'axios';
import qs from 'qs';

import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getDirectoryApiPath } from '../helpers/file';
import { RootOptions } from '../contexts';
import { fetchDirectory, setSelectedByPath, removeLastSelected } from './filesSlice';
import AppDispatch from '../types/AppDispatch';

type Props = { parentPath: string, onCancel: () => void, onCreated: () => void };

const DirectoryNew = ({ parentPath, onCreated, onCancel }: Props): JSX.Element => {
    const [name, setName] = useState('');
    const { serverApi } = useContext(RootOptions);
    const dispatch: AppDispatch = useDispatch();
    const history = useHistory();

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
                    path: newDirPath,
                    withParents: true,
                    showFetching: false,
                }),
            );
            if (actionTaken.type === fetchDirectory.fulfilled.toString()) {
                // select the new dir
                dispatch(setSelectedByPath({ path: newDirPath, directories: actionTaken.payload }));

                history.push(`?${qs.stringify({ path: newDirPath })}`);

                onCreated();
            }
        }
    };

    return (
        <form className="flex items-center ph2" onSubmit={handleCreateDirectory}>
            {/* eslint-disable-next-line jsx-a11y/no-autofocus */}
            <TextField
                className="flex-auto"
                type="text"
                autoFocus
                value={name}
                onChange={({ target: { value } }) => setName(value)}
            />
            <Button className="mh2" onClick={onCancel}>Cancel</Button>
            <Button type="submit" variant="contained" color="primary">Create</Button>
        </form>
    );
};

export default DirectoryNew;
