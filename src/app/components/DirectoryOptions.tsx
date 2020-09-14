import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import CreateNewFolderOutlined from '@material-ui/icons/CreateNewFolderOutlined';

type Props = { onCreateDirectory: () => void };
const DirectoryOptions = ({ onCreateDirectory }: Props): JSX.Element => (
    <div className="flex justify-end">
        <IconButton aria-label="create directory" title="Create Directory" onClick={onCreateDirectory}>
            <CreateNewFolderOutlined />
        </IconButton>
    </div>
);

export default DirectoryOptions;
