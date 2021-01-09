import { FilesState } from '../../../types/AppState';
import Directory from '../../../types/Directory';
import { Files, File } from '../../../types/File';

type Action = { payload: { path: string, directories: Directory[] } };

// see what directories are currently selected based on the path
export default (
    (state: FilesState, { payload: { path: currentPath, directories } }: Action): FilesState => {
        const parts = currentPath.slice(1).split('/');
        const selectedPaths = parts.map((_: string, i: number) => `/${parts.slice(0, i + 1).join('/')}`);

        if (!directories.length) {
            return state;
        }

        const selectedFiles = directories
            .map(({ files }: { files: Files }) => (
                files.find((file) => selectedPaths.includes(file.path))
            ))
            .filter((file: File | undefined) => file);

        return { ...state, selected: selectedFiles as Files };
    }
);
