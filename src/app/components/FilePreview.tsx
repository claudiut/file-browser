import React, { useContext } from 'react';
import qs from 'qs';

import { File } from '../types/File';
import { RootOptions } from '../contexts';
import { getFilename, getFileApiPath } from '../helpers/file';

type FilePreviewPropTypes = { file: File };

const FilePreview = ({ file }: FilePreviewPropTypes): JSX.Element => {
    const { serverApi } = useContext(RootOptions);

    const imageType = file.mimeType ? file.mimeType.split('/')[0] : null;
    const serverFilePath = `${getFileApiPath(serverApi)}?${qs.stringify({ path: file.path })}`;

    let previewElement = null;
    if (imageType === 'image') {
        previewElement = <img src={serverFilePath} alt={getFilename(serverFilePath)} />;
    } else if (imageType === 'audio') {
        previewElement = (
            // eslint-disable-next-line jsx-a11y/media-has-caption
            <audio src={serverFilePath}>
                Your browser does not support the HTML5 Audio element.
            </audio>
        );
    } else {
        previewElement = (
            <iframe
                title="File preview"
                src={serverFilePath}
                className="bn"
            />
        );
    }

    return (
        <div className="file-preview">{previewElement}</div>
    );
};

export default FilePreview;
