import Directory from './Directory';
import { Files } from './File';

export type FilesState = {
    data: Array<Directory>,
    selected: Files,
    isFetching: boolean,
    fetchError: Error | null,
};

type AppState = {
    files: FilesState,
};

export default AppState;
