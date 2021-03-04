import { containsFile } from '../../helpers/file';
import AppState from '../../types/AppState';
import Directory from '../../types/Directory';
import { File } from '../../types/File';

export const selectDirectories = (state: AppState): Array<Directory> => state.files.data;

export const isFileSelected = (file: File) => (state: AppState): boolean => (
    containsFile(state.files.selected, file)
);

export const selectLatestSelectedFile = (state: AppState): File | null => (
    state.files.selected[state.files.selected.length - 1] || null
);
export const selectFetchError = (state: AppState): Error | null => state.files.fetchError;

export const selectIsFetching = (
    (state: AppState): boolean => state.files.isFetching
);
