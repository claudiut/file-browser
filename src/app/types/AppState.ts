import Directory from './Directory';
import { Files } from './File';

export type FilesState = {
    data: Array<Directory>,
    selected: Files,
    currentlyFetching: string | null,
    fetchError: Error | null,
    initialized: boolean,
};

type AppState = {
    files: FilesState,
};

export default AppState;
