/// <reference types="react" />
import { File } from '../types/File';
export declare type OpenFileCallback = (file: File) => void;
declare type FileListItemProps = {
    file: File;
};
declare const FileListItem: ({ file }: FileListItemProps) => JSX.Element;
export default FileListItem;
