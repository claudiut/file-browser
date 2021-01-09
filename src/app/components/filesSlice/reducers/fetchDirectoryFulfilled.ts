/* eslint-disable no-param-reassign */
import { alphaSortFilesOfDir } from '../../../helpers/file';
import { FilesState } from '../../../types/AppState';
import Directory from '../../../types/Directory';

type Action = { payload: Directory[]|Directory, meta: { arg: { sliceChildren: boolean } } };

export default (
    (state: FilesState, action: Action): void => {
        state.isFetching = false;

        if (Array.isArray(action.payload)) {
            state.data = action.payload.map(alphaSortFilesOfDir);
            return;
        }

        const directory = alphaSortFilesOfDir(action.payload);

        if (action.meta.arg.sliceChildren !== false) {
            // remove the unnecessary dirs when we chose a parent dir
            state.data = state.data.slice(0, directory.depth);
            state.data.push(directory);
            return;
        }

        const dirIndex = state.data.findIndex(
            ({ parentPath }: Directory) => parentPath === directory.parentPath,
        );
        if (dirIndex !== -1) {
            state.data[dirIndex] = directory;
        }
    }
);
