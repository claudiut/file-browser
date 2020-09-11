import { File, Files } from '../types/File';
import Directory from '../types/Directory';
export declare const getFilename: (path: string) => string;
export declare const getSelectedFile: (files: Files, path: string) => File | undefined;
export declare const getParentPath: (path: string) => string | null;
export declare const alphaSortFilesOfDir: (dir: Directory) => Directory;
export declare const getDirectoryOfFile: (file: File, directories: Array<Directory>) => Directory;
export declare const removeFrontDirectories: (file: File, directories: Array<Directory>) => Array<Directory>;
