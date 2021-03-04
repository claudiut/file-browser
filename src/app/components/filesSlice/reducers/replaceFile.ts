/* eslint-disable no-param-reassign */
import {
    replaceFileInsideDirectories,
    replaceFileInsideFiles,
} from '../../../helpers/file';
import { FilesState } from '../../../types/AppState';
import { File } from '../../../types/File';

interface Action { payload: { toReplace: File, replacement: File } }

export default (state: FilesState, { payload: { toReplace, replacement } }: Action): void => {
    replaceFileInsideDirectories(toReplace, replacement, state.data);
    replaceFileInsideFiles(toReplace, replacement, state.selected);
};
