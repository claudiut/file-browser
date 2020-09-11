import Directory from './Directory';
import { Files } from './File';
export declare type FilesState = {
    data: Array<Directory>;
    selected: Files;
    isFetching: boolean;
    fetchError: Error | null;
};
declare type AppState = {
    files: FilesState;
};
export default AppState;
