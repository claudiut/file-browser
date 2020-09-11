import React, { useContext } from 'react';
import qs from 'qs';

import { File } from '../types/File';
import { RootOptions } from '../contexts';
import { getFilename } from '../helpers/file';

type FilePreviewPropTypes = { file: File };

const FilePreview = ({ file }: FilePreviewPropTypes): JSX.Element => {
    const { serverApi } = useContext(RootOptions);

    const imageType = file.mimeType ? file.mimeType.split('/')[0] : null;
    const serverFilePath = `${serverApi}?${qs.stringify({ path: file.path })}`;

    let PreviewElement = null;
    if (imageType === 'image') {
        PreviewElement = <img src={serverFilePath} alt={getFilename(serverFilePath)} />;
    } else if (imageType === 'audio') {
        PreviewElement = (
            // eslint-disable-next-line jsx-a11y/media-has-caption
            <audio src={serverFilePath}>
                Your browser does not support the HTML5 Audio element.
            </audio>
        );
    } else {
        PreviewElement = (
            <iframe
                title="File preview"
                src={serverFilePath}
            />
        );
    }

    return (
        <div className="file-preview">{PreviewElement}</div>
    );
};

export default FilePreview;