import { File, Files } from "../types/File";

export const getFilename = (path: string): string => {
    const parts = path.split('/');
    return parts[parts.length - 1];
};

export const getSelectedFile = (files: Files, path: string): File | undefined => (
    files.find(file => file.path === path || path.indexOf(`${file.path}/`) === 0)
);