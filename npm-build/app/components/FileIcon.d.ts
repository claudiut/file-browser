/// <reference types="react" />
import { File } from '../types/File';
declare const FileIcon: ({ file: { isDir }, isOpen }: {
    file: File;
    isOpen: boolean;
}) => JSX.Element;
export default FileIcon;
