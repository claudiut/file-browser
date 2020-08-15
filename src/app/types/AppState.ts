import Directory from './Directory';
import FetchStatus from '../enums/FetchStatus';
import { Files } from './File';

export type FilesState = {
    data: Array<Directory>,
    selected: Files,
    fetchStatus: FetchStatus,
    fetchError: Error | null,
};

type AppState = {
    files: FilesState,
};

export default AppState;
