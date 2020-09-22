/// <reference types="react" />
import { File } from '../types/File';
declare const FileIcon: ({ file: { isDir }, isSelected }: {
    file: File;
    isSelected: boolean;
}) => JSX.Element;
export default FileIcon;
