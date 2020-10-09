import Directory from '../../types/Directory';
import AppState, { FilesState } from '../../types/AppState';
import { File } from '../../types/File';
import QsParsedValue from '../../types/QsParsedValue';
declare type FetchDirectoryParams = {
    fetchUrl: string;
    path: QsParsedValue;
    withParents?: boolean;
    showFetching?: boolean;
    sliceChildren?: boolean;
};
export declare const fetchDirectory: import("@reduxjs/toolkit").AsyncThunk<any, FetchDirectoryParams, {}>;
declare type DeleteFileParams = {
    file: File;
    serverApi: string;
};
export declare const deleteFile: import("@reduxjs/toolkit").AsyncThunk<void, DeleteFileParams, {}>;
declare const _default: import("redux").Reducer<FilesState, import("redux").AnyAction>;
export default _default;
export declare const setSelectedByPath: import("@reduxjs/toolkit").ActionCreatorWithPayload<any, string>, addSelected: import("@reduxjs/toolkit").ActionCreatorWithPayload<any, string>, removeLastSelected: import("@reduxjs/toolkit").ActionCreatorWithoutPayload<string>;
export declare const selectDirectories: (state: AppState) => Array<Directory>;
export declare const isFileSelected: (file: File) => (state: AppState) => boolean;
export declare const selectSelectedFile: (state: AppState) => File | null;
export declare const selectFetchError: (state: AppState) => Error | null;
export declare const selectIsFetching: (state: AppState) => boolean;
