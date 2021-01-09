/* eslint-disable no-param-reassign */
import { getDirectoryOfFile } from '../../../helpers/file';
import { FilesState } from '../../../types/AppState';
import { File } from '../../../types/File';

type Action = { payload: { file: File } };

// remove selection of files with gte depth and add the newly selected one
export default (
    (state: FilesState, { payload: { file } }: Action): void => {
        const fileDir = getDirectoryOfFile(file, state.data);
        state.selected = state.selected.slice(0, fileDir.depth).concat([file]);
        state.data = state.data.slice(0, fileDir.depth + 1);
    }
);
