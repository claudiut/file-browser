import React, { useState } from 'react';
import { Button, TextField } from '@material-ui/core';

import useCreateDirectoryHandler from '../hooks/useCreateDirectoryHandler';

type Props = { parentPath: string, onCancel: () => void, onCreated: () => void };

const DirectoryNew = ({ parentPath, onCreated, onCancel }: Props): JSX.Element => {
    const [name, setName] = useState('');
    const handleCreateDirectory = useCreateDirectoryHandler(name, parentPath, onCreated);

    return (
        <form className="flex items-center ph2" onSubmit={(e) => { e.preventDefault(); handleCreateDirectory(); }}>
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
