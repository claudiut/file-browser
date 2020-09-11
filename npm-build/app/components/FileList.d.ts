/// <reference types="react" />
import { File } from '../types/File';
interface FileListProps {
    files: Array<File>;
    className?: string;
}
declare const FileList: {
    ({ files, className, }: FileListProps): JSX.Element;
    defaultProps: {
        className: undefined;
    };
};
export default FileList;
