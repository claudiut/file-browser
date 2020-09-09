import Directory from './Directory';
import { Files } from './File';

export type FilesState = {
    data: Array<Directory>,
    selected: Files,
    currentlyFetchingPath: string | null,
    fetchError: Error | null,
};

type AppState = {
    files: FilesState,
};

export default AppState;
