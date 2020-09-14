/// <reference types="react" />
import Directory from '../types/Directory';
interface FileListProps {
    directory: Directory;
    className?: string;
}
declare const FileList: {
    ({ directory: { files, parentPath }, className, }: FileListProps): JSX.Element;
    defaultProps: {
        className: undefined;
    };
};
export default FileList;
